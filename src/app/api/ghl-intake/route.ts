// src/app/api/ghl-intake/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { calculateFitScore } from "@/lib/scorp-advantage/calculator";
import { getEnv } from "@/lib/config/env";
import { createApiHandler, getClientIp, parseJsonBody, logRedacted } from "@/lib/observability/api-handler";
import { incrementCounter, withLatencyAsync } from "@/lib/observability/request-metrics";

const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

const EntityTypeEnum = z.enum(["SOLE_PROP", "LLC", "LLC_MULTI", "S_CORP", "C_CORP", "UNKNOWN"]);
const NicheVerticalEnum = z.enum(["CONSTRUCTION", "REAL_ESTATE", "RESTAURANT", "ECOMMERCE", "INSURANCE", "SERVICE", "OTHER"]);
const AnnualRevenueBandEnum = z.enum(["UNDER_50K", "50K_100K", "100K_250K", "250K_500K", "500K_1M", "OVER_1M"]);
const PrimaryPainPointEnum = z.enum(["OVERPAYING_TAXES", "WRONG_STRUCTURE", "YEAR_ROUND_PLANNING", "BOOKKEEPING_VISIBILITY", "EXPLORING"]);
const UrgencyLevelEnum = z.enum(["HIGH", "MEDIUM", "LOW"]);

const IntakePayloadSchema = z.object({
  version: z.literal("1.0").default("1.0"),
  eventType: z.string().min(1).default("SCORP_ESTIMATOR_SUBMITTED"),
  sourcePage: z.string().min(1).default("scorp-estimator"),
  leadMagnetType: z.string().min(1).default("SCORP_ESTIMATOR"),
  submittedAt: z.string().datetime().optional(),
  _hpt: z.string().optional(),
  contact: z.object({
    firstName: z.string().trim().min(1, "First name is required"),
    lastName: z.string().trim().min(1, "Last name is required"),
    email: z.string().trim().email("A valid email address is required"),
    phone: z.string().trim().optional(),
  }),
  business: z.object({
    businessName: z.string().trim().optional(),
    websiteUrl: z.string().trim().optional(),
    nicheVertical: NicheVerticalEnum.optional(),
    annualRevenueBand: AnnualRevenueBandEnum.optional(),
    annualRevenueband: AnnualRevenueBandEnum.optional(),
    employeeCountBand: z.string().trim().optional(),
    entityType: EntityTypeEnum.optional(),
    stateLocation: z.string().trim().optional(),
    estimatedNetProfit: z.number().min(0).max(1000000).optional(),
  }).optional(),
  intent: z.object({
    primaryServiceInterest: z.string().trim().optional(),
    primaryPainPoint: PrimaryPainPointEnum.optional(),
    consultationType: z.string().trim().optional(),
    urgencyLevel: UrgencyLevelEnum.optional(),
  }).optional(),
  results: z.object({
    scorpEstimatedSavings: z.number().min(0).optional(),
    suggestedSalary: z.number().min(0).optional(),
    distributions: z.number().min(0).optional(),
    highIntentFlag: z.boolean().optional(),
    fitScore: z.number().min(0).max(100).optional(),
  }).optional(),
  tracking: z.object({
    utmSource: z.string().trim().optional(),
    utmMedium: z.string().trim().optional(),
    utmCampaign: z.string().trim().optional(),
    referrerUrl: z.string().trim().optional(),
    clientTimestamp: z.string().trim().optional(),
  }).optional(),
  meta: z.object({
    locale: z.string().trim().optional(),
    userAgent: z.string().trim().optional(),
  }).optional(),
});

function normalizePhone(phone?: string): string | undefined {
  if (!phone) return undefined;

  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  if (phone.trim().startsWith("+") && digits.length >= 10) return `+${digits}`;

  return phone.trim();
}

async function forwardToGhl(payload: unknown, traceId: string): Promise<Response> {
  const webhookUrl = getEnv("GHL_WEBHOOK_URL");

  if (!webhookUrl) {
    throw new Error("GHL_WEBHOOK_URL is not configured");
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Trace-Id": traceId,
    },
    body: JSON.stringify(payload),
  });

  return response;
}

export async function POST(request: Request) {
  const handler = createApiHandler(request, {
    module: "ghl-intake",
    rateLimitMax: RATE_LIMIT_MAX,
    rateLimitWindowMs: RATE_LIMIT_WINDOW_MS,
  });

  const ip = getClientIp(request);

  const { checkRateLimit } = await import("@/lib/observability/api-handler");
  const rateLimit = checkRateLimit(ip, undefined, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS);

  if (rateLimit.limited) {
    handler.log.warn("Rate limit exceeded", { ip });
    incrementCounter("ghl_intake_rate_limited", { source: "ghl-intake" });
    return handler.json(
      { success: false, error: "Too many requests" },
      {
        status: 429,
        headers: handler.rateLimitHeaders(rateLimit.remaining, rateLimit.resetAt),
      }
    );
  }

  const parsed = await parseJsonBody(request, handler.log);

  if (parsed.error) {
    return parsed.error;
  }

  const rawBody = parsed.raw as { _hpt?: unknown; event_type?: unknown; source_page?: unknown };

  if (typeof rawBody._hpt === "string" && rawBody._hpt.trim().length > 0) {
    handler.log.info("Honeypot field submitted — treating as success");
    return handler.json({ success: true });
  }

  const validation = IntakePayloadSchema.safeParse(parsed.data);

  if (!validation.success) {
    handler.log.warn("Validation failed", { issues: validation.error.issues });
    incrementCounter("ghl_intake_validation_failed", { source: "ghl-intake" });
    return handler.json(
      {
        success: false,
        error: "Validation failed",
        details: validation.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 }
    );
  }

  const input = validation.data;
  const estimatedNetProfit = input.business?.estimatedNetProfit || 0;
  const fitScore = input.results?.fitScore ?? calculateFitScore({
    estimatedNetProfit,
    urgencyLevel: input.intent?.urgencyLevel,
    entityType: input.business?.entityType,
    primaryPainPoint: input.intent?.primaryPainPoint,
  });
  const highIntentFlag =
    input.results?.highIntentFlag ?? (input.intent?.urgencyLevel === "HIGH" || fitScore >= 70);

  const payload = {
    version: "1.0",
    eventType: input.eventType,
    sourcePage: input.sourcePage,
    leadMagnetType: input.leadMagnetType,
    submittedAt: input.submittedAt || new Date().toISOString(),
    contact: {
      firstName: input.contact.firstName,
      lastName: input.contact.lastName,
      email: input.contact.email.toLowerCase(),
      phone: normalizePhone(input.contact.phone),
    },
    business: {
      ...input.business,
      annualRevenueBand: input.business?.annualRevenueBand || input.business?.annualRevenueband,
    },
    intent: {
      primaryServiceInterest: "SCORP_STRATEGY",
      consultationType: "SCORP_REVIEW",
      ...input.intent,
    },
    results: {
      ...input.results,
      fitScore,
      highIntentFlag,
    },
    tracking: input.tracking || {},
    meta: {
      locale: input.meta?.locale || "en",
      userAgent: input.meta?.userAgent || request.headers.get("user-agent") || undefined,
    },
  };

  logRedacted(handler.log, "GHL intake payload prepared", payload as Record<string, unknown>);

  try {
    const ghlResponse = await withLatencyAsync("ghl_intake_forward_ms", async () => {
      return forwardToGhl(payload, handler.traceId);
    }, { source: "ghl-intake" });

    if (!ghlResponse.ok) {
      handler.log.error("GHL forwarding failed", undefined, {
        status: ghlResponse.status,
        body: await ghlResponse.text().catch(() => "unavailable"),
      });
      incrementCounter("ghl_intake_forward_failed", { source: "ghl-intake" });
      return handler.json(
        { success: false, error: "CRM forwarding failed" },
        { status: 502 }
      );
    }

    logRedacted(handler.log, "GHL intake success", payload as Record<string, unknown>);
    incrementCounter("ghl_intake_success", { source: "ghl-intake" });
    return handler.json({ success: true });
  } catch (err) {
    handler.error("GHL intake error", err);
    incrementCounter("ghl_intake_error", { source: "ghl-intake" });
    return handler.json(
      { success: false, error: "CRM forwarding failed" },
      { status: 502 }
    );
  }
}
// src/app/api/ghl-intake/route.ts
import { z } from "zod";
import { calculateFitScore, calculateSCorpSavings, isHighIntent } from "@/lib/scorp-advantage/calculator";
import { getEnv } from "@/lib/config/env";
import { createApiHandler } from "@/lib/observability/api-handler";
import { incrementCounter, withLatencyAsync } from "@/lib/observability/request-metrics";
import { readLeadJson, normalizePhone, forwardToGhl, leadFailureStatus } from "@/lib/intake/shared";
import { checkLeadIngress, checkLeadContact } from "@/lib/security/lead-ingress";

const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

const EntityTypeEnum = z.enum(["SOLE_PROP", "LLC", "LLC_MULTI", "S_CORP", "C_CORP", "UNKNOWN"]);
const NicheVerticalEnum = z.enum(["CONSTRUCTION", "REAL_ESTATE", "RESTAURANT", "ECOMMERCE", "INSURANCE", "SERVICE", "OTHER"]);
const AnnualRevenueBandEnum = z.enum(["UNDER_50K", "50K_100K", "100K_250K", "250K_500K", "500K_1M", "OVER_1M"]);
const PrimaryPainPointEnum = z.enum(["OVERPAYING_TAXES", "WRONG_STRUCTURE", "YEAR_ROUND_PLANNING", "BOOKKEEPING_VISIBILITY", "EXPLORING"]);
const UrgencyLevelEnum = z.enum(["HIGH", "MEDIUM", "LOW"]);

const IntakePayloadSchema = z.object({
  version: z.literal("1.0").default("1.0"),
  eventType: z.string().min(1).max(100).default("SCORP_ESTIMATOR_SUBMITTED"),
  sourcePage: z.string().min(1).max(200).default("scorp-estimator"),
  leadMagnetType: z.literal("SCORP_ESTIMATOR").default("SCORP_ESTIMATOR"),
  submittedAt: z.string().datetime().optional(),
  _hpt: z.string().max(200).optional(),
  contact: z.object({
    firstName: z.string().trim().min(1, "First name is required").max(100),
    lastName: z.string().trim().min(1, "Last name is required").max(100),
    email: z.string().trim().email("A valid email address is required").max(254),
    phone: z.string().trim().max(30).optional(),
  }),
  business: z.object({
    businessName: z.string().trim().max(200).optional(),
    websiteUrl: z.string().trim().max(1000).optional(),
    nicheVertical: NicheVerticalEnum.optional(),
    annualRevenueBand: AnnualRevenueBandEnum.optional(),
    annualRevenueband: AnnualRevenueBandEnum.optional(),
    employeeCountBand: z.string().trim().max(200).optional(),
    entityType: EntityTypeEnum.optional(),
    stateLocation: z.string().trim().max(200).optional(),
    estimatedNetProfit: z.number().min(0).max(1000000).optional(),
  }).optional(),
  intent: z.object({
    primaryServiceInterest: z.string().trim().max(200).optional(),
    primaryPainPoint: PrimaryPainPointEnum.optional(),
    consultationType: z.string().trim().max(200).optional(),
    urgencyLevel: UrgencyLevelEnum.optional(),
  }).optional(),
  results: z.object({
    scorpEstimatedSavings: z.number().min(0).max(1_000_000).optional(),
    suggestedSalary: z.number().min(0).max(1_000_000).optional(),
    distributions: z.number().min(0).max(1_000_000).optional(),
    highIntentFlag: z.boolean().optional(),
    fitScore: z.number().min(0).max(100).optional(),
  }).optional(),
  tracking: z.object({
    utmSource: z.string().trim().max(200).optional(),
    utmMedium: z.string().trim().max(200).optional(),
    utmCampaign: z.string().trim().max(200).optional(),
    referrerUrl: z.string().trim().max(1000).optional(),
    clientTimestamp: z.string().trim().max(200).optional(),
  }).optional(),
  meta: z.object({
    locale: z.enum(["en", "es"]).optional(),
    userAgent: z.string().trim().max(500).optional(),
    submissionId: z.string().uuid().optional(),
  }).optional(),
});

export async function POST(request: Request) {
  const handler = createApiHandler(request, {
    module: "ghl-intake",
    rateLimitMax: RATE_LIMIT_MAX,
    rateLimitWindowMs: RATE_LIMIT_WINDOW_MS,
  });

  const ingress = await checkLeadIngress(request);
  if (!ingress.ok) return handler.json({ success: false, error: ingress.error }, { status: ingress.status, headers: ingress.retryAfter ? { "Retry-After": ingress.retryAfter } : undefined });
  const parsed = await readLeadJson(request);
  if (!parsed.ok) return handler.json({ success: false, error: parsed.error }, { status: parsed.status });
  const rawBody = parsed.value as { _hpt?: unknown; event_type?: unknown; source_page?: unknown } | null;

  if (rawBody && typeof rawBody._hpt === "string" && rawBody._hpt.trim().length > 0) {
    handler.log.info("Honeypot field submitted — treating as success");
    return handler.json({ success: true });
  }

  const validation = IntakePayloadSchema.safeParse(parsed.value);

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
  const rateLimit = await checkLeadContact(input.contact.email, RATE_LIMIT_MAX);
  if (!rateLimit.ok) {
    handler.log.warn("Rate limit exceeded");
    incrementCounter("ghl_intake_rate_limited", { source: "ghl-intake" });
    return handler.json({ success: false, error: "Too many requests" }, {
      status: rateLimit.status,
      headers: rateLimit.retryAfter ? { "Retry-After": rateLimit.retryAfter } : undefined,
    });
  }
  const estimatedNetProfit = input.business?.estimatedNetProfit || 0;
  const fitScore = calculateFitScore({
    estimatedNetProfit,
    urgencyLevel: input.intent?.urgencyLevel,
    entityType: input.business?.entityType,
    primaryPainPoint: input.intent?.primaryPainPoint,
  });
  const highIntentFlag = isHighIntent({
    estimatedNetProfit,
    urgencyLevel: input.intent?.urgencyLevel,
    entityType: input.business?.entityType,
    primaryPainPoint: input.intent?.primaryPainPoint,
  });
  const savings = calculateSCorpSavings(estimatedNetProfit, input.business?.entityType);
  const { annualRevenueband: legacyRevenueBand, ...validatedBusiness } = input.business ?? {};

  const payload = {
    version: "1.0",
    eventType: "SCORP_ESTIMATOR_SUBMITTED",
    sourcePage: "scorp-estimator",
    leadMagnetType: "SCORP_ESTIMATOR",
    submittedAt: new Date().toISOString(),
    contact: {
      firstName: input.contact.firstName,
      lastName: input.contact.lastName,
      email: input.contact.email.toLowerCase(),
      phone: normalizePhone(input.contact.phone),
    },
    business: {
      ...validatedBusiness,
      annualRevenueBand: validatedBusiness.annualRevenueBand || legacyRevenueBand,
    },
    intent: {
      ...input.intent,
      primaryServiceInterest: "SCORP_STRATEGY",
      consultationType: "SCORP_REVIEW",
    },
    results: {
      scorpEstimatedSavings: savings.estimatedSavings,
      suggestedSalary: savings.suggestedSalary,
      distributions: savings.distributions,
      fitScore,
      highIntentFlag,
    },
    tracking: input.tracking || {},
    meta: {
      locale: input.meta?.locale || "en",
      userAgent: (request.headers.get("user-agent") || input.meta?.userAgent)?.slice(0, 500),
      submissionId: input.meta?.submissionId,
    },
  };

  handler.log.info("GHL intake payload prepared", { eventType: payload.eventType, sourcePage: payload.sourcePage });

  if (!getEnv("GHL_WEBHOOK_URL")) {
    return handler.json({ success: false, error: "CRM forwarding unavailable" }, { status: 503 });
  }

  try {
    const ghlResponse = await withLatencyAsync("ghl_intake_forward_ms", async () => {
      return forwardToGhl(payload, undefined, input.meta?.submissionId, handler.traceId);
    }, { source: "ghl-intake" });

    if (!ghlResponse.ok) {
      handler.log.error("GHL forwarding failed", undefined, {
        status: ghlResponse.status,
      });
      incrementCounter("ghl_intake_forward_failed", { source: "ghl-intake" });
      return handler.json(
        { success: false, error: "CRM forwarding failed" },
        { status: 502 }
      );
    }

    handler.log.info("GHL intake accepted", { eventType: payload.eventType, sourcePage: payload.sourcePage });
    incrementCounter("ghl_intake_success", { source: "ghl-intake" });
    return handler.json({ success: true });
  } catch (err) {
    handler.error("GHL intake error", err);
    incrementCounter("ghl_intake_error", { source: "ghl-intake" });
    return handler.json(
      { success: false, error: "CRM forwarding failed" },
      { status: leadFailureStatus(err) }
    );
  }
}

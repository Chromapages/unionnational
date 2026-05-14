import { NextRequest } from "next/server";
import { getEnv } from "@/lib/config/env";
import { getTraceId, logger } from "@/lib/observability/logger";
import { z } from "zod";

export type RateEntry = {
    count: number;
    resetAt: number;
};

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 10;
const rateLimitStore = new Map<string, RateEntry>();

export const IntakePayloadSchema = z.object({
    version: z.literal("1.0").default("1.0"),
    eventType: z.string().min(1).default("INTAKE_SUBMITTED"),
    sourcePage: z.string().min(1).default("unknown"),
    leadMagnetType: z.string().min(1).default("GENERAL"),
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
        nicheVertical: z.string().trim().optional(),
        annualRevenueBand: z.string().trim().optional(),
        employeeCountBand: z.string().trim().optional(),
        entityType: z.string().trim().optional(),
        stateLocation: z.string().trim().optional(),
        estimatedNetProfit: z.number().min(0).max(1000000).optional(),
    }).optional(),
    intent: z.object({
        primaryServiceInterest: z.string().trim().optional(),
        primaryPainPoint: z.string().trim().optional(),
        consultationType: z.string().trim().optional(),
        urgencyLevel: z.enum(["HIGH", "MEDIUM", "LOW"]).optional(),
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

export type IntakePayload = z.infer<typeof IntakePayloadSchema>;

export function getClientIp(request: Request): string {
    const forwardedFor = request.headers.get("x-forwarded-for");
    return forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

export function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitStore.get(ip);

    if (!entry || entry.resetAt <= now) {
        rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    entry.count += 1;
    return entry.count > RATE_LIMIT_MAX;
}

export function normalizePhone(phone?: string): string | undefined {
    if (!phone) return undefined;

    const digits = phone.replace(/\D/g, "");
    if (digits.length === 10) return `+1${digits}`;
    if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
    if (phone.trim().startsWith("+") && digits.length >= 10) return `+${digits}`;

    return phone.trim();
}

export function logIntake(eventType: string, sourcePage: string, success: boolean, traceId?: string) {
    logger.info("GHL intake event", {
        eventType,
        sourcePage,
        success,
        ...(traceId ? { traceId } : {}),
    });
}

export async function forwardToGhl(payload: unknown, webhookUrl?: string): Promise<Response> {
    const url = webhookUrl ?? getEnv("GHL_WEBHOOK_URL");

    if (!url) {
        throw new Error("GHL_WEBHOOK_URL is not configured");
    }

    return fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
}

export function buildIntakePayload(
    rawBody: unknown,
    overrides?: Partial<IntakePayload>
): IntakePayload | null {
    const body = rawBody as { _hpt?: unknown };

    if (typeof body._hpt === "string" && body._hpt.trim().length > 0) {
        return null;
    }

    const validation = IntakePayloadSchema.safeParse(rawBody);
    if (!validation.success) {
        return null;
    }

    return {
        ...validation.data,
        ...overrides,
    };
}

export function isHoneypotSet(body: unknown): boolean {
    const b = body as { _hpt?: unknown };
    return typeof b._hpt === "string" && b._hpt.trim().length > 0;
}

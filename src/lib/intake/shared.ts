import { getEnv } from "@/lib/config/env";
import { logger } from "@/lib/observability/logger";
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

export const ApplicationSchema = z.object({
    firstName: z.string().trim().min(1).max(100),
    lastName: z.string().trim().min(1).max(100),
    email: z.string().trim().email().max(254),
    phone: z.string().trim().min(10).max(30),
    companyName: z.string().trim().min(1).max(200),
    revenue: z.enum(["UNDER_100K", "100K_500K", "500K_1M", "1M_3M", "3M_5M", "5M_PLUS"]),
    locale: z.enum(["en", "es"]).default("en"),
    submissionId: z.string().uuid().optional(),
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

export async function readLeadJson(request: Request): Promise<
    { ok: true; value: unknown } | { ok: false; status: 400 | 413; error: string }
> {
    const reader = request.body?.getReader();
    if (!reader) return { ok: false, status: 400, error: "Invalid JSON body" };
    const decoder = new TextDecoder();
    let body = "";
    let bytes = 0;
    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            bytes += value.byteLength;
            if (bytes > 32_768) {
                await reader.cancel();
                return { ok: false, status: 413, error: "Request is too large" };
            }
            body += decoder.decode(value, { stream: true });
        }
        return { ok: true, value: JSON.parse(body + decoder.decode()) };
    } catch {
        return { ok: false, status: 400, error: "Invalid JSON body" };
    }
}

export async function forwardToGhl(payload: unknown, webhookUrl?: string, submissionId?: string): Promise<Response> {
    const url = webhookUrl ?? getEnv("GHL_WEBHOOK_URL");

    if (!url) {
        throw new Error("GHL_WEBHOOK_URL is not configured");
    }

    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(submissionId ? { "X-Submission-Id": submissionId } : {}),
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8_000),
    });
}

export function isLeadTimeout(error: unknown): boolean {
    return !!error && typeof error === "object" && "name" in error && error.name === "TimeoutError";
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

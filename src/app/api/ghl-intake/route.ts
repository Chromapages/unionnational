// src/app/api/ghl-intake/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { calculateFitScore } from "@/lib/scorp-advantage/calculator";

type RateEntry = {
    count: number;
    resetAt: number;
};

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 10;
const rateLimitStore = new Map<string, RateEntry>();

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

function getClientIp(request: Request): string {
    const forwardedFor = request.headers.get("x-forwarded-for");
    return forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitStore.get(ip);

    if (!entry || entry.resetAt <= now) {
        rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    entry.count += 1;
    return entry.count > RATE_LIMIT_MAX;
}

function normalizePhone(phone?: string): string | undefined {
    if (!phone) return undefined;

    const digits = phone.replace(/\D/g, "");
    if (digits.length === 10) return `+1${digits}`;
    if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
    if (phone.trim().startsWith("+") && digits.length >= 10) return `+${digits}`;

    return phone.trim();
}

function logIntake(eventType: string, sourcePage: string, success: boolean) {
    console.log(JSON.stringify({
        timestamp: new Date().toISOString(),
        eventType,
        sourcePage,
        success,
    }));
}

async function forwardToGhl(payload: unknown) {
    const webhookUrl = process.env.GHL_WEBHOOK_URL;

    if (!webhookUrl) {
        throw new Error("GHL_WEBHOOK_URL is not configured");
    }

    return fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
}

export async function POST(request: Request) {
    const ip = getClientIp(request);

    if (isRateLimited(ip)) {
        logIntake("RATE_LIMITED", "unknown", false);
        return NextResponse.json({ success: false, error: "Too many requests" }, { status: 429 });
    }

    let rawBody: unknown;

    try {
        rawBody = await request.json();
    } catch {
        logIntake("INVALID_JSON", "unknown", false);
        return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
    }

    const body = rawBody as { _hpt?: unknown; event_type?: unknown; source_page?: unknown };

    if (typeof body._hpt === "string" && body._hpt.trim().length > 0) {
        logIntake("HONEYPOT_REJECTED", "scorp-estimator", true);
        return NextResponse.json({ success: true });
    }

    const validation = IntakePayloadSchema.safeParse(rawBody);

    if (!validation.success) {
        logIntake("VALIDATION_FAILED", "scorp-estimator", false);
        return NextResponse.json({
            success: false,
            error: "Validation failed",
            details: validation.error.issues.map((issue) => ({
                path: issue.path.join("."),
                message: issue.message,
            })),
        }, { status: 400 });
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

    /*
     * GHL workflow routing notes:
     * - If leadMagnetType === "SCORP_ESTIMATOR" -> apply tags: LMSCorp, InterestSCorp
     * - If intent.urgencyLevel === "HIGH" or results.highIntentFlag === true -> tag: QualifiedHighIntent
     * - If business.nicheVertical === "CONSTRUCTION" -> tag: NicheConstruction
     * - If business.nicheVertical === "RESTAURANT" -> tag: NicheRestaurant
     * - If results.scorpEstimatedSavings > 15000 -> tag: QualifiedHighRevenue
     */

    try {
        const ghlResponse = await forwardToGhl(payload);

        if (!ghlResponse.ok) {
            logIntake(input.eventType, input.sourcePage, false);
            return NextResponse.json({ success: false, error: "CRM forwarding failed" }, { status: 502 });
        }

        logIntake(input.eventType, input.sourcePage, true);
        return NextResponse.json({ success: true });
    } catch {
        logIntake(input.eventType, input.sourcePage, false);
        return NextResponse.json({ success: false, error: "CRM forwarding failed" }, { status: 502 });
    }
}

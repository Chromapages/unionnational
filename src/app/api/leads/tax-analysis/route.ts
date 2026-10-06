import { NextResponse } from "next/server";
import { z } from "zod";
import { checkLeadIngress, checkLeadContact } from "@/lib/security/lead-ingress";
import { getEnv } from "@/lib/config/env";
import { getTraceId, logger } from "@/lib/observability/logger";
import { normalizeRevenue } from "@/lib/ghl/contract";
import { forwardToGhl, leadFailureStatus, readLeadJson } from "@/lib/intake/shared";

const TaxLead = z.object({
    name: z.string().trim().min(1).max(200),
    email: z.string().trim().email().max(254),
    phone: z.string().trim().min(10).max(30),
    businessType: z.string().trim().min(1).max(100),
    revenueRange: z.string().trim().min(1).max(50),
    source: z.string().trim().max(100).optional(),
    locale: z.enum(["en", "es"]).default("en"),
    submission_id: z.string().uuid().optional(),
});

export async function POST(request: Request) {
    const traceId = getTraceId(request.headers);
    const ingress = await checkLeadIngress(request);
    if (!ingress.ok) return NextResponse.json({ success: false, error: ingress.error }, { status: ingress.status, headers: ingress.retryAfter ? { "Retry-After": ingress.retryAfter } : undefined });
    const parsed = await readLeadJson(request);
    if (!parsed.ok) return NextResponse.json({ success: false, error: parsed.error }, { status: parsed.status });
    const validation = TaxLead.safeParse(parsed.value);
    if (!validation.success) return NextResponse.json({ success: false, error: "Invalid tax-analysis request" }, { status: 400 });
    const data = validation.data;
    let annualRevenueBand;
    try { annualRevenueBand = normalizeRevenue(data.revenueRange); }
    catch { return NextResponse.json({ success: false, error: "Ambiguous revenue range" }, { status: 400 }); }
    const rateLimitResult = await checkLeadContact(data.email);

    if (!rateLimitResult.ok) {
        return NextResponse.json(
            { error: "Too many requests. Please try again later." },
            {
                status: rateLimitResult.status,
                headers: {
                    "Retry-After": rateLimitResult.retryAfter || "1",
                },
            }
        );
    }

    const ghlPayload = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            business_type: data.businessType,
            revenue_range: data.revenueRange,
            annual_revenue_band: annualRevenueBand,
            source: data.source || "unt-tax-analysis",
            locale: data.locale,
            submission_id: data.submission_id,
            timestamp: new Date().toISOString(),
        };

    const ghlWebhookUrl = getEnv("GHL_TAX_ANALYSIS_WEBHOOK_URL");
    if (!ghlWebhookUrl) return NextResponse.json({ success: false, error: "Lead capture unavailable" }, { status: 503 });

    try {
        const response = await forwardToGhl(ghlPayload, ghlWebhookUrl, data.submission_id);
        if (!response.ok) {
            logger.warn("Tax analysis webhook rejected", { traceId, status: response.status });
            return NextResponse.json({ success: false, error: "Lead delivery failed" }, { status: 502 });
        }
        logger.info("Tax analysis lead accepted", { traceId });
        return NextResponse.json({ success: true });
    } catch (error) {
        logger.error("Tax analysis lead delivery unavailable", undefined, { traceId, reason: error instanceof Error ? error.name : "unknown" });
        return NextResponse.json({ success: false, error: "Lead delivery unavailable" }, { status: leadFailureStatus(error) });
    }
}

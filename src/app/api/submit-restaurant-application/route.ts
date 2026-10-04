import { NextResponse } from "next/server";
import { checkRateLimit, contactRateLimitKey } from "@/lib/security/rate-limiter";
import { getEnv } from "@/lib/config/env";
import { getTraceId, logger } from "@/lib/observability/logger";
import { ApplicationSchema, forwardToGhl, isLeadTimeout, readLeadJson } from "@/lib/intake/shared";

export async function POST(request: Request) {
    const traceId = getTraceId(request.headers);
    const parsed = await readLeadJson(request);
    if (!parsed.ok) return NextResponse.json({ success: false, error: parsed.error }, { status: parsed.status });
    const validation = ApplicationSchema.safeParse(parsed.value);
    if (!validation.success) return NextResponse.json({ success: false, error: "Invalid application" }, { status: 400 });
    const data = validation.data;
    const rateLimitResult = await checkRateLimit(contactRateLimitKey(data.email), 5, 60_000);

    if (!rateLimitResult.success) {
        return NextResponse.json(
            { error: "Too many requests. Please try again later." },
            {
                status: 429,
                headers: {
                    "Retry-After": String(
                        Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
                    ),
                },
            }
        );
    }

    const ghlWebhookUrl = getEnv("GHL_RESTAURANT_APPLICATION_WEBHOOK_URL");
    if (!ghlWebhookUrl) return NextResponse.json({ success: false, error: "Application capture unavailable" }, { status: 503 });

    try {
        const response = await forwardToGhl({ ...data, source_page: `/${data.locale}/restaurants/apply`, annual_revenue_band: data.revenue }, ghlWebhookUrl, data.submissionId);
        if (!response.ok) {
            logger.warn("Restaurant application webhook rejected", { traceId, status: response.status });
            return NextResponse.json({ success: false, error: "Application delivery failed" }, { status: 502 });
        }
        logger.info("Restaurant application accepted", { traceId });
        return NextResponse.json({ success: true });
    } catch (error) {
        logger.error("Restaurant application delivery unavailable", undefined, { traceId, reason: error instanceof Error ? error.name : "unknown" });
        return NextResponse.json({ success: false, error: "Application delivery unavailable" }, { status: isLeadTimeout(error) ? 504 : 502 });
    }
}

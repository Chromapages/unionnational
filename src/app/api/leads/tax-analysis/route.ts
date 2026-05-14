import { NextResponse } from "next/server";
import { checkRateLimit, getClientIdentifier } from "@/lib/security/rate-limiter";
import { getEnv } from "@/lib/config/env";
import { getTraceId, logger } from "@/lib/observability/logger";

export async function POST(request: Request) {
    const traceId = getTraceId();
    const identifier = getClientIdentifier(request);
    const rateLimitResult = await checkRateLimit(identifier);

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

    try {
        const data = await request.json();

        const requiredFields = ["name", "email", "phone", "businessType", "revenueRange"];
        for (const field of requiredFields) {
            if (!data[field]) {
                return NextResponse.json(
                    { error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return NextResponse.json(
                { error: "Invalid email address" },
                { status: 400 }
            );
        }

        logger.info("Tax analysis lead captured", {
            traceId,
            businessType: data.businessType,
            revenueRange: data.revenueRange,
            source: data.source ?? "unt-tax-analysis",
        });

        const ghlPayload = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            business_type: data.businessType,
            revenue_range: data.revenueRange,
            source: data.source || "unt-tax-analysis",
            timestamp: new Date().toISOString(),
        };

        const ghlWebhookUrl = getEnv("GHL_TAX_ANALYSIS_WEBHOOK_URL");

        if (ghlWebhookUrl) {
            try {
                const ghlResponse = await fetch(ghlWebhookUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(ghlPayload),
                });

                if (!ghlResponse.ok) {
                    logger.error("GHL webhook error", {
                        traceId,
                        status: ghlResponse.status,
                        statusText: ghlResponse.statusText,
                    });
                } else {
                    logger.info("GHL webhook success", { traceId });
                }
            } catch (webhookError) {
                logger.error("GHL webhook failed", {
                    traceId,
                    error: webhookError instanceof Error ? webhookError.message : "Unknown error",
                });
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        logger.error("Tax analysis lead error", {
            traceId,
            error: error instanceof Error ? error.message : "Unknown error",
        });
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
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

        const ghlWebhookUrl = getEnv("GHL_APPLICATION_WEBHOOK_URL");

        if (ghlWebhookUrl) {
            const response = await fetch(ghlWebhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                logger.error("GHL webhook error", {
                    traceId,
                    status: response.status,
                    statusText: response.statusText,
                });
                throw new Error("Failed to sync with CRM");
            }

            logger.info("Application submitted", { traceId });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        logger.error("Application submission error", {
            traceId,
            error: error instanceof Error ? error.message : "Unknown error",
        });
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
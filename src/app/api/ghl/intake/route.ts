import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { GhlPayloadSchema } from "@/lib/ghl/contract";
import { getEnv } from "@/lib/config/env";
import { getTraceId, logger } from "@/lib/observability/logger";

export async function POST(request: Request) {
    const traceId = getTraceId();

    try {
        const body = await request.json();
        const headerList = await headers();

        const enrichedBody = {
            ...body,
            meta: {
                version: body.meta?.version || "1.0",
                locale: body.meta?.locale || "en",
                submitted_at: body.meta?.submitted_at || new Date().toISOString(),
                user_agent: headerList.get("user-agent") || "unknown",
                ip_hash: headerList.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1",
            },
        };

        const validation = GhlPayloadSchema.safeParse(enrichedBody);

        if (!validation.success) {
            logger.warn("GHL validation failed", {
                traceId,
                issues: validation.error.issues.map((e) => `${e.path.join(".")}: ${e.message}`),
            });
            return NextResponse.json(
                {
                    success: false,
                    error: "GHL Validation Failed",
                    details: validation.error.issues.map((e) => `${e.path.join(".")}: ${e.message}`),
                },
                { status: 400 }
            );
        }

        const payload = validation.data;

        logger.info("Validated lead", {
            traceId,
            eventType: payload.event_type,
            email: payload.contact.email,
        });

        const ghlWebhookUrl =
            payload.intent.lead_magnet_type === "CONSTRUCTION_PROFIT_LEAK_CHECKLIST"
                ? "https://services.leadconnectorhq.com/hooks/N5KQjySifAxlxhrrvY8g/webhook-trigger/2307d607-729b-48ab-9a3b-0bb2305c0d2f"
                : getEnv(
                      payload.intent.lead_magnet_type === "SCORP_ESTIMATOR"
                          ? "GHL_SCORP_ESTIMATOR_WEBHOOK_URL"
                          : "GHL_WEBHOOK_URL"
                  );

        if (ghlWebhookUrl) {
            const ghlResponse = await fetch(ghlWebhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!ghlResponse.ok) {
                throw new Error(`GHL Webhook failed with status: ${ghlResponse.status}`);
            }
        }

        return NextResponse.json({ success: true, message: "Lead successfully synchronized with CRM" });
    } catch (error) {
        logger.error("GHL intake error", {
            traceId,
            error: error instanceof Error ? error.message : "Unknown error",
        });
        return NextResponse.json(
            { success: false, message: "Failed to process lead intake" },
            { status: 500 }
        );
    }
}
import { NextResponse } from "next/server";
import { GhlPayloadSchema } from "@/lib/ghl/contract";
import { getEnv } from "@/lib/config/env";
import { getTraceId, logger } from "@/lib/observability/logger";
import { checkRateLimit, contactRateLimitKey } from "@/lib/security/rate-limiter";
import { forwardToGhl, isLeadTimeout, readLeadJson } from "@/lib/intake/shared";

export async function POST(request: Request) {
    const traceId = getTraceId(request.headers);

    try {
        const parsed = await readLeadJson(request);
        if (!parsed.ok) return NextResponse.json({ success: false, error: parsed.error }, { status: parsed.status });
        if (!parsed.value || typeof parsed.value !== "object" || Array.isArray(parsed.value)) {
            return NextResponse.json({ success: false, error: "Invalid lead payload" }, { status: 400 });
        }
        const body = parsed.value as Record<string, unknown>;
        const meta = body.meta && typeof body.meta === "object" && !Array.isArray(body.meta)
            ? body.meta as Record<string, unknown>
            : {};

        const enrichedBody = {
            ...body,
            meta: {
                ...meta,
                version: meta.version || "1.0",
                locale: meta.locale || "en",
                submitted_at: meta.submitted_at || new Date().toISOString(),
                user_agent: request.headers.get("user-agent") || "unknown",
                // ip_hash is omitted until the receiver's hashing and retention contract is approved.
                ip_hash: undefined,
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
        const rateLimit = await checkRateLimit(contactRateLimitKey(payload.contact.email), 10, 60_000);
        if (!rateLimit.success) {
            return NextResponse.json(
                { success: false, error: "Too many requests. Please try again later." },
                { status: 429, headers: { "Retry-After": String(Math.max(1, Math.ceil((rateLimit.resetTime - Date.now()) / 1000))) } },
            );
        }

        logger.info("Validated lead", {
            traceId,
            eventType: payload.event_type,
        });

        const ghlWebhookUrl =
            payload.intent.lead_magnet_type === "CONSTRUCTION_PROFIT_LEAK_CHECKLIST"
                ? "https://services.leadconnectorhq.com/hooks/N5KQjySifAxlxhrrvY8g/webhook-trigger/d23b0447-6fb5-4a12-98e4-bffbf7aafafe"
                : payload.intent.lead_magnet_type === "CONSTRUCTION_PROFITABILITY_ASSESSMENT"
                ? "https://services.leadconnectorhq.com/hooks/N5KQjySifAxlxhrrvY8g/webhook-trigger/b15f618f-d4ec-4cf3-b1d4-01ba9e87b271"
                : payload.intent.lead_magnet_type === "BLUEPRINT_MORE_INFO"
                ? "https://services.leadconnectorhq.com/hooks/N5KQjySifAxlxhrrvY8g/webhook-trigger/f1e87470-26e7-45fd-9b04-99d46ba991c5"
                : getEnv(
                      payload.intent.lead_magnet_type === "SCORP_ESTIMATOR"
                          ? "GHL_SCORP_ESTIMATOR_WEBHOOK_URL"
                          : "GHL_WEBHOOK_URL"
                  );

        if (!ghlWebhookUrl) {
            return NextResponse.json(
                { success: false, error: "Lead capture is temporarily unavailable" },
                { status: 503 }
            );
        }

        const ghlResponse = await forwardToGhl(payload, ghlWebhookUrl, payload.meta.submission_id);

        if (!ghlResponse.ok) {
            logger.warn("GHL webhook rejected lead", { traceId, status: ghlResponse.status });
            return NextResponse.json({ success: false, error: "Lead delivery failed" }, { status: 502 });
        }

        return NextResponse.json({ success: true, message: "Lead accepted by CRM" });
    } catch (error) {
        logger.error("GHL intake error", undefined, { traceId, reason: error instanceof Error ? error.name : "unknown" });
        return NextResponse.json(
            { success: false, error: "Lead delivery unavailable" },
            { status: isLeadTimeout(error) ? 504 : 502 }
        );
    }
}

import { NextResponse } from "next/server";
import { GhlPayloadSchema, type GhlPayload } from "@/lib/ghl/contract";
import { getTraceId, logger } from "@/lib/observability/logger";
import { checkLeadIngress, checkLeadContact } from "@/lib/security/lead-ingress";
import { canonicalLead, canonicalReceiver } from "@/lib/leads/canonical";
import { LeadDeliveryError } from "@/lib/leads/delivery";
import { forwardToGhl, leadFailureStatus, readLeadJson } from "@/lib/intake/shared";

export async function POST(request: Request) {
    const traceId = getTraceId(request.headers);
    const ingress = await checkLeadIngress(request);
    if (!ingress.ok) return NextResponse.json({ success: false, error: ingress.error }, { status: ingress.status, headers: ingress.retryAfter ? { "Retry-After": ingress.retryAfter } : undefined });

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
                user_agent: (request.headers.get("user-agent") || "unknown").slice(0, 500),
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

        const rateLimit = await checkLeadContact(validation.data.contact.email, 10);
        if (!rateLimit.ok) {
            return NextResponse.json({ success: false, error: rateLimit.error }, { status: rateLimit.status, headers: { "Retry-After": rateLimit.retryAfter || "1" } });
        }
        let payload: GhlPayload;
        try { payload = await canonicalLead(validation.data); }
        catch (error) {
            return NextResponse.json({ success: false, error: error instanceof LeadDeliveryError ? "Lead configuration unavailable" : "Invalid lead answers" }, { status: error instanceof LeadDeliveryError ? error.status : 400 });
        }

        logger.info("Validated lead", {
            traceId,
            eventType: payload.event_type,
        });

        const ghlWebhookUrl = canonicalReceiver(payload.intent.lead_magnet_type);

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
            { status: leadFailureStatus(error) }
        );
    }
}

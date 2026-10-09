import { createHash } from "node:crypto";
import { NextRequest } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getEnv } from "@/lib/config/env";
import { createApiHandler } from "@/lib/observability/api-handler";
import { withLatencyAsync } from "@/lib/observability/request-metrics";
import { getPaymentStorage } from "@/lib/shop/payment-storage";
import { isCheckoutSessionId, purchaseReference, readWebhookBody } from "@/lib/shop/payment-security";
import { fulfillmentConfiguration, fulfillmentSignature, validOrderMetadataSignature, verifiedOrderItems } from "@/lib/shop/fulfillment";
import { checkRateLimit } from "@/lib/security/rate-limiter";
import { leadRequesterKey } from "@/lib/security/lead-ingress";

const STALE_MS = 10 * 60 * 1000;
type Status = "pending" | "processing" | "processed" | "failed" | "pending_manual" | "pending_review";
type OrderRecord = { _id: string; _rev: string; status: Status; updatedAt: string; attempt?: number };
async function setStatus(storage: ReturnType<typeof getPaymentStorage>, record: OrderRecord, status: Status, extra: Record<string, string | number> = {}) {
    return storage.patch(record._id).ifRevisionId(record._rev).set({
        status, updatedAt: new Date().toISOString(), ...extra,
    }).commit() as Promise<OrderRecord>;
}

export async function POST(req: NextRequest) {
    const handler = createApiHandler(req, { module: "shop-webhook" });
    const endpointSecret = getEnv("STRIPE_WEBHOOK_SECRET");
    const signature = req.headers.get("stripe-signature");
    if (!signature || !endpointSecret) return handler.jsonError("Missing Stripe signature or secret", 400);
    try {
        const identity = leadRequesterKey(req);
        const requester = identity === "anonymous" ? undefined : await checkRateLimit(`shop-webhook:ingress:${identity}`, 240, 60_000);
        const quota = requester && !requester.success ? requester : await checkRateLimit("shop-webhook:ingress:global", 480, 60_000);
        if (!quota.success) return handler.jsonError("Webhook quota exceeded", 429);
    } catch { return handler.jsonError("Webhook ingress unavailable", 503); }

    let stripe: ReturnType<typeof getStripe>;
    try { stripe = getStripe(); } catch { return handler.jsonError("Payment service unavailable", 503); }
    let event: Stripe.Event;
    let body: Buffer;
    try { body = await readWebhookBody(req); } catch (error) {
        const code = error instanceof Error ? error.message : "INVALID_BODY";
        return handler.jsonError("Invalid webhook body", code === "REQUEST_TOO_LARGE" ? 413 : code === "BODY_TIMEOUT" ? 408 : 400);
    }
    try {
        event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    } catch {
        handler.log.warn("Invalid Stripe signature");
        return handler.jsonError("Invalid Stripe signature", 400);
    }
    // A signature header alone must never spend the authenticated provider budget.
    try {
        const quota = await checkRateLimit("shop-webhook:authenticated", 480, 60_000);
        if (!quota.success) return handler.jsonError("Webhook processing quota exceeded", 429);
    } catch { return handler.jsonError("Webhook processing unavailable", 503); }
    if (event.type !== "checkout.session.completed" && event.type !== "checkout.session.async_payment_succeeded") {
        return handler.json({ received: true, ignored: true });
    }

    const eventSession = event.data.object as Stripe.Checkout.Session;
    if (!isCheckoutSessionId(eventSession.id)) return handler.jsonError("Invalid checkout session", 400);
    let session: Stripe.Checkout.Session;
    try {
        session = await stripe.checkout.sessions.retrieve(eventSession.id);
    } catch (error) {
        handler.error("Checkout session retrieval failed", error, { orderReference: purchaseReference(eventSession.id, endpointSecret) });
        return handler.jsonError("Checkout session unavailable", 503);
    }
    if (session.id !== eventSession.id) return handler.jsonError("Invalid checkout session", 400);
    if (session.payment_status !== "paid") return handler.json({ received: true, pendingPayment: true });
    if (session.metadata?.order_source !== "unt_bookstore") return handler.json({ received: true, ignored: true });
    let storage: ReturnType<typeof getPaymentStorage>;
    try { storage = getPaymentStorage(); } catch { return handler.jsonError("Private order storage unavailable", 503); }

    let record: OrderRecord;
    try {
        const id = "stripeWebhookIdempotency." + createHash("sha256").update(session.id).digest("hex");
        record = await storage.createIfNotExists({
            _id: id, _type: "stripeWebhookIdempotency", stripeEventId: event.id,
            status: "pending", attempt: 0, updatedAt: new Date().toISOString(),
        }) as OrderRecord;
    } catch (error) {
        handler.error("Paid order reservation failed", error, { orderReference: purchaseReference(session.id, endpointSecret) });
        return handler.jsonError("Order storage unavailable", 503);
    }
    if (record.status === "processed") {
        if (session.metadata?.fulfillment_status !== "fulfilled") {
            try {
                await stripe.checkout.sessions.update(session.id, {
                    metadata: { ...(session.metadata ?? {}), fulfillment_status: "fulfilled" },
                });
            } catch (error) {
                handler.error("Delivered order Stripe metadata recovery failed", error, { orderReference: purchaseReference(session.id, endpointSecret) });
                return handler.jsonError("Order metadata unavailable", 503);
            }
        }
        return handler.json({ received: true, idempotent: true });
    }
    if (record.status === "pending_review") return handler.json({ received: true, pendingReview: true });
    if (record.status === "processing") {
        if (Date.now() - new Date(record.updatedAt).getTime() >= STALE_MS) {
            try {
                await setStatus(storage, record, "pending_review", { lastError: "stale_processing", lastErrorAt: new Date().toISOString() });
                handler.log.warn("Stale paid order needs review", { orderReference: purchaseReference(session.id, endpointSecret) });
                return handler.json({ received: true, pendingReview: true });
            } catch (error) {
                handler.error("Stale order status update failed", error, { orderReference: purchaseReference(session.id, endpointSecret) });
            }
        }
        return handler.jsonError("Order processing in progress", 503);
    }
    // Old deployments had no deterministic record; Stripe metadata prevents replay of known deliveries.
    if (session.metadata?.fulfillment_status === "fulfilled") {
        try {
            await setStatus(storage, record, "processed", { processedAt: new Date().toISOString() });
            return handler.json({ received: true, idempotent: true });
        } catch (error) {
            handler.error("Prior delivery record update failed", error, { orderReference: purchaseReference(session.id, endpointSecret) });
            return handler.jsonError("Order storage unavailable", 503);
        }
    }
    if (record.status === "pending" && !record.attempt) {
        try {
            const legacy = await storage.fetch<{ _id: string } | null>(
                '*[_type == "stripeWebhookIdempotency" && stripeEventId == $eventId && _id != $id][0]{_id}',
                { eventId: event.id, id: record._id },
            );
            if (legacy) {
                await setStatus(storage, record, "pending_review", {
                    lastError: "legacy_delivery_uncertain", lastErrorAt: new Date().toISOString(),
                });
                return handler.json({ received: true, pendingReview: true });
            }
        } catch (error) {
            handler.error("Legacy order check failed", error, { orderReference: purchaseReference(session.id, endpointSecret) });
            return handler.jsonError("Order storage unavailable", 503);
        }
    }

    try {
        record = await setStatus(storage, record, "processing", {
            stripeEventId: event.id, attempt: (record.attempt ?? 0) + 1,
        });
    } catch (error) {
        handler.error("Paid order claim failed", error, { orderReference: purchaseReference(session.id, endpointSecret) });
        return handler.jsonError("Order claim unavailable", 503);
    }

    let receiver: ReturnType<typeof fulfillmentConfiguration>;
    try { receiver = fulfillmentConfiguration(getEnv("GHL_SHOP_PURCHASE_WEBHOOK_URL")); } catch {
        try {
            await setStatus(storage, record, "pending_manual", {
                lastError: "missing_fulfillment_configuration", lastErrorAt: new Date().toISOString(),
            });
            await stripe.checkout.sessions.update(session.id, {
                metadata: { ...(session.metadata ?? {}), fulfillment_status: "pending_manual" },
            });
        } catch (error) {
            handler.error("Manual fulfillment status update failed", error, { orderReference: purchaseReference(session.id, endpointSecret) });
        }
        return handler.jsonError("Fulfillment is not configured", 503);
    }

    let lines: Stripe.ApiList<Stripe.LineItem>;
    try { lines = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 }); } catch {
        try { await setStatus(storage, record, "failed", { lastError: "line_items_unavailable", lastErrorAt: new Date().toISOString() }); } catch { /* A stale claim remains visible for reconciliation. */ }
        return handler.jsonError("Verified order items unavailable", 503);
    }
    const items = validOrderMetadataSignature(session.metadata, endpointSecret) ? verifiedOrderItems(session.metadata, lines, session.currency) : null;
    if (!items) {
        try {
            await setStatus(storage, record, "pending_review", {
                lastError: "invalid_order_items", lastErrorAt: new Date().toISOString(),
            });
            return handler.json({ received: true, pendingReview: true });
        } catch (error) {
            handler.error("Missing-items status update failed", error, { orderReference: purchaseReference(session.id, endpointSecret) });
            return handler.jsonError("Order storage unavailable", 503);
        }
    }
    const shippingDetails = session.collected_information?.shipping_details;
    const hasPhysical = items.some(item => item.sh === true || ["physical", "bundle"].includes(item.t || ""));
    if (hasPhysical && (!shippingDetails?.address.line1 || !shippingDetails.address.country)) {
        try {
            await setStatus(storage, record, "pending_review", { lastError: "missing_shipping_details", lastErrorAt: new Date().toISOString() });
        } catch (error) {
            handler.error("Missing shipping status update failed", error, { orderReference: purchaseReference(session.id, endpointSecret) });
            return handler.jsonError("Order storage unavailable", 503);
        }
        return handler.json({ received: true, pendingReview: true });
    }

    const payload = JSON.stringify({
        version: "1", event: "shop_purchase_completed", email: session.customer_details?.email,
        name: session.customer_details?.name, items, shippingDetails: shippingDetails ?? null,
        hasDigital: items.some(item => ["digital", "audio", "bundle"].includes(item.t || "")), hasPhysical,
        total: session.amount_total, currency: session.currency, sessionId: session.id,
    });
    const timestamp = String(Math.floor(Date.now() / 1000));
    let response: Response;
    try {
        response = await withLatencyAsync("shop_webhook_fulfill_ms", () => fetch(receiver.url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", "X-Trace-Id": handler.traceId,
                "X-Idempotency-Key": session.id,
                "X-UNT-Timestamp": timestamp,
                "X-UNT-Signature": fulfillmentSignature(payload, timestamp, receiver.secret),
            },
            redirect: "error",
            signal: AbortSignal.timeout(8000),
            body: payload,
        }), { event_type: event.type });
    } catch {
        // The receiver may have accepted the request before a network error. Inspect it before replay.
        try {
            await setStatus(storage, record, "pending_review", {
                lastError: "delivery_uncertain", lastErrorAt: new Date().toISOString(),
            });
        } catch (storageError) {
            handler.error("Uncertain delivery status update failed", storageError, { orderReference: purchaseReference(session.id, endpointSecret) });
            return handler.jsonError("Order storage unavailable", 503);
        }
        handler.log.warn("Shop fulfillment delivery uncertain", { orderReference: purchaseReference(session.id, endpointSecret) });
        return handler.json({ received: true, pendingReview: true });
    }
    if (!response.ok || response.headers.get("X-UNT-Acknowledgement") !== "durably-accepted-v1") {
        try {
            await setStatus(storage, record, "pending_review", {
                lastError: response.ok ? "missing_durable_acknowledgement" : `fulfillment_http_${response.status}`, lastErrorAt: new Date().toISOString(),
            });
        } catch (error) {
            handler.error("Rejected fulfillment status update failed", error, { orderReference: purchaseReference(session.id, endpointSecret) });
            return handler.jsonError("Order storage unavailable", 503);
        }
        try {
            await stripe.checkout.sessions.update(session.id, {
                metadata: { ...(session.metadata ?? {}), fulfillment_status: "pending_review" },
            });
        } catch (error) {
            handler.error("Rejected fulfillment Stripe metadata update failed", error, { orderReference: purchaseReference(session.id, endpointSecret) });
        }
        return handler.json({ received: true, pendingReview: true });
    }

    try {
        await setStatus(storage, record, "processed", { processedAt: new Date().toISOString() });
    } catch (error) {
        handler.error("Delivered order record update failed", error, { orderReference: purchaseReference(session.id, endpointSecret) });
        return handler.jsonError("Order storage unavailable", 503);
    }
    try {
        await stripe.checkout.sessions.update(session.id, {
            metadata: { ...(session.metadata ?? {}), fulfillment_status: "fulfilled", fulfilled_at: new Date().toISOString() },
        });
    } catch (error) {
        handler.error("Delivered order Stripe metadata update failed", error, { orderReference: purchaseReference(session.id, endpointSecret) });
        return handler.jsonError("Order metadata unavailable", 503);
    }
    handler.log.info("Shop order delivered", { orderReference: purchaseReference(session.id, endpointSecret) });
    return handler.json({ received: true });
}

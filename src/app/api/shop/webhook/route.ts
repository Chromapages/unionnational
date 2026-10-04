import { createHash } from "node:crypto";
import { NextRequest } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getEnv } from "@/lib/config/env";
import { createApiHandler } from "@/lib/observability/api-handler";
import { withLatencyAsync } from "@/lib/observability/request-metrics";
import { writeClient } from "@/sanity/lib/client";
import { parseCheckoutItemsMetadata } from "@/lib/shop/order-metadata";

const endpointSecret = getEnv("STRIPE_WEBHOOK_SECRET");
const STALE_MS = 10 * 60 * 1000;
type Status = "pending" | "processing" | "processed" | "failed" | "pending_manual" | "pending_review";
type OrderRecord = { _id: string; _rev: string; status: Status; updatedAt: string; attempt?: number };
type OrderItem = { t?: string; sh?: boolean; [key: string]: unknown };

function orderItems(metadata: Stripe.Metadata | null): OrderItem[] {
    try {
        const items = parseCheckoutItemsMetadata(metadata);
        return Array.isArray(items) && items.every((item) =>
            item && typeof item === "object" && typeof item.t === "string" &&
            typeof item.q === "number" && Number.isInteger(item.q) && item.q > 0
        ) ? items : [];
    } catch {
        return [];
    }
}

async function setStatus(record: OrderRecord, status: Status, extra: Record<string, string | number> = {}) {
    return writeClient.patch(record._id).ifRevisionId(record._rev).set({
        status, updatedAt: new Date().toISOString(), ...extra,
    }).commit() as Promise<OrderRecord>;
}

export async function POST(req: NextRequest) {
    const handler = createApiHandler(req, { module: "shop-webhook" });
    const signature = req.headers.get("stripe-signature");
    if (!signature || !endpointSecret) return handler.jsonError("Missing Stripe signature or secret", 400);

    const stripe = getStripe();
    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(await req.text(), signature, endpointSecret);
    } catch {
        handler.log.warn("Invalid Stripe signature");
        return handler.jsonError("Invalid Stripe signature", 400);
    }
    if (event.type !== "checkout.session.completed" && event.type !== "checkout.session.async_payment_succeeded") {
        return handler.json({ received: true, ignored: true });
    }

    const eventSession = event.data.object as Stripe.Checkout.Session;
    if (!eventSession.id) return handler.jsonError("Missing checkout session", 400);
    let session: Stripe.Checkout.Session;
    try {
        session = await stripe.checkout.sessions.retrieve(eventSession.id);
    } catch (error) {
        handler.error("Checkout session retrieval failed", error, { sessionId: eventSession.id });
        return handler.jsonError("Checkout session unavailable", 503);
    }
    if (session.payment_status !== "paid") return handler.json({ received: true, pendingPayment: true });
    if (session.metadata?.order_source !== "unt_bookstore") return handler.json({ received: true, ignored: true });

    let record: OrderRecord;
    try {
        const id = "stripeWebhookIdempotency." + createHash("sha256").update(session.id).digest("hex");
        record = await writeClient.createIfNotExists({
            _id: id, _type: "stripeWebhookIdempotency", stripeEventId: event.id,
            status: "pending", attempt: 0, updatedAt: new Date().toISOString(),
        }) as OrderRecord;
    } catch (error) {
        handler.error("Paid order reservation failed", error, { sessionId: session.id });
        return handler.jsonError("Order storage unavailable", 503);
    }
    if (record.status === "processed") {
        if (session.metadata?.fulfillment_status !== "fulfilled") {
            try {
                await stripe.checkout.sessions.update(session.id, {
                    metadata: { ...(session.metadata ?? {}), fulfillment_status: "fulfilled" },
                });
            } catch (error) {
                handler.error("Delivered order Stripe metadata recovery failed", error, { sessionId: session.id });
                return handler.jsonError("Order metadata unavailable", 503);
            }
        }
        return handler.json({ received: true, idempotent: true });
    }
    if (record.status === "pending_review") return handler.json({ received: true, pendingReview: true });
    if (record.status === "processing") {
        if (Date.now() - new Date(record.updatedAt).getTime() >= STALE_MS) {
            try {
                await setStatus(record, "pending_review", { lastError: "stale_processing", lastErrorAt: new Date().toISOString() });
                handler.log.warn("Stale paid order needs review", { sessionId: session.id });
                return handler.json({ received: true, pendingReview: true });
            } catch (error) {
                handler.error("Stale order status update failed", error, { sessionId: session.id });
            }
        }
        return handler.jsonError("Order processing in progress", 503);
    }
    // Old deployments had no deterministic record; Stripe metadata prevents replay of known deliveries.
    if (session.metadata?.fulfillment_status === "fulfilled") {
        try {
            await setStatus(record, "processed", { processedAt: new Date().toISOString() });
            return handler.json({ received: true, idempotent: true });
        } catch (error) {
            handler.error("Prior delivery record update failed", error, { sessionId: session.id });
            return handler.jsonError("Order storage unavailable", 503);
        }
    }
    if (record.status === "pending" && !record.attempt) {
        try {
            const legacy = await writeClient.fetch<{ _id: string } | null>(
                '*[_type == "stripeWebhookIdempotency" && stripeEventId == $eventId && _id != $id][0]{_id}',
                { eventId: event.id, id: record._id },
            );
            if (legacy) {
                await setStatus(record, "pending_review", {
                    lastError: "legacy_delivery_uncertain", lastErrorAt: new Date().toISOString(),
                });
                return handler.json({ received: true, pendingReview: true });
            }
        } catch (error) {
            handler.error("Legacy order check failed", error, { sessionId: session.id });
            return handler.jsonError("Order storage unavailable", 503);
        }
    }

    try {
        record = await setStatus(record, "processing", {
            stripeEventId: event.id, attempt: (record.attempt ?? 0) + 1,
        });
    } catch (error) {
        handler.error("Paid order claim failed", error, { sessionId: session.id });
        return handler.jsonError("Order claim unavailable", 503);
    }

    const ghlUrl = getEnv("GHL_SHOP_PURCHASE_WEBHOOK_URL");
    if (!ghlUrl) {
        try {
            await setStatus(record, "pending_manual", {
                lastError: "missing_fulfillment_configuration", lastErrorAt: new Date().toISOString(),
            });
            await stripe.checkout.sessions.update(session.id, {
                metadata: { ...(session.metadata ?? {}), fulfillment_status: "pending_manual" },
            });
        } catch (error) {
            handler.error("Manual fulfillment status update failed", error, { sessionId: session.id });
        }
        return handler.jsonError("Fulfillment is not configured", 503);
    }

    const items = orderItems(session.metadata);
    if (items.length === 0) {
        try {
            await setStatus(record, "pending_review", {
                lastError: "missing_order_items", lastErrorAt: new Date().toISOString(),
            });
            return handler.json({ received: true, pendingReview: true });
        } catch (error) {
            handler.error("Missing-items status update failed", error, { sessionId: session.id });
            return handler.jsonError("Order storage unavailable", 503);
        }
    }
    const shippingDetails = session.collected_information?.shipping_details;
    const hasPhysical = items.some(item => item.sh === true || ["physical", "bundle"].includes(item.t || ""));
    if (hasPhysical && (!shippingDetails?.address.line1 || !shippingDetails.address.country)) {
        try {
            await setStatus(record, "pending_review", { lastError: "missing_shipping_details", lastErrorAt: new Date().toISOString() });
        } catch (error) {
            handler.error("Missing shipping status update failed", error, { sessionId: session.id });
            return handler.jsonError("Order storage unavailable", 503);
        }
        return handler.json({ received: true, pendingReview: true });
    }

    let response: Response;
    try {
        response = await withLatencyAsync("shop_webhook_fulfill_ms", () => fetch(ghlUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", "X-Trace-Id": handler.traceId,
                "X-Idempotency-Key": session.id,
            },
            signal: AbortSignal.timeout(8000),
            body: JSON.stringify({
                event: "shop_purchase_completed", email: session.customer_details?.email,
                name: session.customer_details?.name, items,
                shippingDetails: shippingDetails ?? null,
                hasDigital: items.some((item) => ["digital", "audio", "bundle"].includes(item.t || "")),
                hasPhysical,
                total: session.amount_total, currency: session.currency, sessionId: session.id,
            }),
        }), { event_type: event.type });
    } catch {
        // The receiver may have accepted the request before a network error. Inspect it before replay.
        try {
            await setStatus(record, "pending_review", {
                lastError: "delivery_uncertain", lastErrorAt: new Date().toISOString(),
            });
        } catch (storageError) {
            handler.error("Uncertain delivery status update failed", storageError, { sessionId: session.id });
            return handler.jsonError("Order storage unavailable", 503);
        }
        handler.log.warn("Shop fulfillment delivery uncertain", { sessionId: session.id });
        return handler.json({ received: true, pendingReview: true });
    }
    if (!response.ok) {
        try {
            await setStatus(record, "pending_review", {
                lastError: `fulfillment_http_${response.status}`, lastErrorAt: new Date().toISOString(),
            });
        } catch (error) {
            handler.error("Rejected fulfillment status update failed", error, { sessionId: session.id });
            return handler.jsonError("Order storage unavailable", 503);
        }
        try {
            await stripe.checkout.sessions.update(session.id, {
                metadata: { ...(session.metadata ?? {}), fulfillment_status: "pending_review" },
            });
        } catch (error) {
            handler.error("Rejected fulfillment Stripe metadata update failed", error, { sessionId: session.id });
        }
        return handler.json({ received: true, pendingReview: true });
    }

    try {
        await setStatus(record, "processed", { processedAt: new Date().toISOString() });
    } catch (error) {
        handler.error("Delivered order record update failed", error, { sessionId: session.id });
        return handler.jsonError("Order storage unavailable", 503);
    }
    try {
        await stripe.checkout.sessions.update(session.id, {
            metadata: { ...(session.metadata ?? {}), fulfillment_status: "fulfilled", fulfilled_at: new Date().toISOString() },
        });
    } catch (error) {
        handler.error("Delivered order Stripe metadata update failed", error, { sessionId: session.id });
        return handler.jsonError("Order metadata unavailable", 503);
    }
    handler.log.info("Shop order delivered", { sessionId: session.id });
    return handler.json({ received: true });
}

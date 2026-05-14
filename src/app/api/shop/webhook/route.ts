import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getEnv } from "@/lib/config/env";
import { createApiHandler, getClientIp } from "@/lib/observability/api-handler";
import { incrementCounter, withLatencyAsync } from "@/lib/observability/request-metrics";
import { logger } from "@/lib/observability/logger";
import Stripe from "stripe";

const endpointSecret = getEnv("STRIPE_WEBHOOK_SECRET");

interface OrderMetadataItem {
    p?: string;
    s?: string;
    e?: string;
    n?: string;
    f?: string;
    t?: string;
    sh?: boolean;
    pr?: string;
    q?: number;
}

function parseOrderItems(metadata: Stripe.Metadata | null): OrderMetadataItem[] {
    if (!metadata?.items) return [];

    try {
        const parsed = JSON.parse(metadata.items);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        logger.error("Unable to parse shop order metadata items", error);
        return [];
    }
}

export async function POST(req: NextRequest) {
    const handler = createApiHandler(req, { module: "shop-webhook" });
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    if (!sig || !endpointSecret) {
        handler.error("Missing stripe-signature or STRIPE_WEBHOOK_SECRET");
        return handler.jsonError("Webhook Error: Missing signature or secret", 400);
    }

    const stripe = getStripe();
    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
        handler.error("Webhook signature verification failed", err);
        return handler.jsonError("Webhook Error: Invalid signature", 400);
    }

    const eventId = event.id;
    const existingRecord = await checkIdempotency(eventId);

    if (existingRecord && existingRecord.status === "processed") {
        handler.log.info("Stripe webhook already processed", { eventId });
        return handler.json({ received: true, idempotent: true });
    }

    await writeIdempotencyRecord(eventId, "processing");

    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;

            handler.log.info("Payment received", {
                sessionId: session.id,
                amount: session.amount_total,
            });

            try {
                await withLatencyAsync("shop_webhook_fulfill_ms", async () => {
                    await fulfillOrder(stripe, session, handler.traceId);
                }, { event_type: event.type });
            } catch (fulfillmentError) {
                handler.error("Fulfillment error", fulfillmentError, { sessionId: session.id });
            }
            break;
        }
        default:
            handler.log.info("Unhandled Stripe webhook event", { eventType: event.type });
    }

    await writeIdempotencyRecord(eventId, "processed");
    return handler.json({ received: true });
}

async function checkIdempotency(eventId: string): Promise<{ status: string } | null> {
    try {
        const { writeClient } = await import("@/sanity/lib/client");
        const result = await writeClient.fetch<{ _id: string; status: string } | null>(
            `*[_type == "stripeWebhookIdempotency" && stripeEventId == $eventId][0]{ _id, status }`,
            { eventId },
            { cache: "no-cache" }
        );
        return result;
    } catch {
        return null;
    }
}

async function writeIdempotencyRecord(eventId: string, status: string): Promise<void> {
    try {
        const { writeClient } = await import("@/sanity/lib/client");
        await writeClient.create({
            _type: "stripeWebhookIdempotency",
            stripeEventId: eventId,
            processedAt: new Date().toISOString(),
            status,
        });
    } catch {
        // noop
    }
}

async function fulfillOrder(stripe: Stripe, session: Stripe.Checkout.Session, traceId: string) {
    const metadata = session.metadata || {};
    const items = parseOrderItems(metadata);
    const email = session.customer_details?.email;

    if (metadata.fulfillment_status === "fulfilled") {
        logger.info("Order fulfillment already complete", { sessionId: session.id });
        return;
    }

    await stripe.checkout.sessions.update(session.id, {
        metadata: {
            ...metadata,
            fulfillment_status: "processing",
        },
    });

    const ghlShopPurchaseWebhook = getEnv("GHL_SHOP_PURCHASE_WEBHOOK_URL");
    const hasDigital = items.some((item) => item.t === "digital" || item.t === "audio" || item.t === "bundle");
    const hasPhysical = items.some((item) => item.sh === true || item.t === "physical" || item.t === "bundle");

    if (ghlShopPurchaseWebhook) {
        const response = await fetch(ghlShopPurchaseWebhook, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Trace-Id": traceId,
            },
            body: JSON.stringify({
                event: "shop_purchase_completed",
                email,
                name: session.customer_details?.name,
                items,
                hasDigital,
                hasPhysical,
                total: session.amount_total,
                currency: session.currency,
                sessionId: session.id
            })
        });

        if (!response.ok) {
            throw new Error(`Shop fulfillment webhook failed with ${response.status}`);
        }

        await stripe.checkout.sessions.update(session.id, {
            metadata: {
                ...metadata,
                fulfillment_status: "fulfilled",
                fulfilled_at: new Date().toISOString(),
            },
        });
    } else {
        await stripe.checkout.sessions.update(session.id, {
            metadata: {
                ...metadata,
                fulfillment_status: "pending_manual",
            },
        });
        logger.warn("No GHL_SHOP_PURCHASE_WEBHOOK_URL configured. Manual fulfillment required", { sessionId: session.id });
    }

    logger.info("Order fulfillment triggered", { sessionId: session.id, userId: email || "anonymous" });
}

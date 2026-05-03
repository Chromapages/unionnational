import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import Stripe from "stripe";

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

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
        console.error("Unable to parse shop order metadata items:", error);
        return [];
    }
}

export async function POST(req: NextRequest) {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    const stripe = getStripe();
    let event: Stripe.Event;

    try {
        if (!sig || !endpointSecret) {
            console.error("Missing stripe-signature or STRIPE_WEBHOOK_SECRET");
            return NextResponse.json({ error: "Webhook Error: Missing signature or secret" }, { status: 400 });
        }
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error(`❌ Webhook signature verification failed.`, message);
        return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
        case "checkout.session.completed":
            const session = event.data.object as Stripe.Checkout.Session;
            
            // ─── FULFILLMENT LOGIC ───────────────────────────────────────
            // 1. Get customer info
            const customerEmail = session.customer_details?.email;
            const metadata = session.metadata;
            
            console.log(`🔔 Payment received for ${customerEmail}!`, {
                sessionId: session.id,
                metadata,
                amount: session.amount_total
            });

            // 2. Trigger GHL or Email Fulfillment
            // In a real production environment, you would call your fulfillment 
            // service here (e.g., GHL webhook, Postmark email, etc.)
            try {
                await fulfillOrder(stripe, session);
            } catch (fulfillmentError) {
                console.error("Fulfillment Error:", fulfillmentError);
                // Note: We don't necessarily want to return a 400 here because 
                // the payment was successful, but we should log it for manual retry.
            }

            break;
            
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
}

async function fulfillOrder(stripe: Stripe, session: Stripe.Checkout.Session) {
    const metadata = session.metadata || {};
    const items = parseOrderItems(metadata);
    const email = session.customer_details?.email;

    if (metadata.fulfillment_status === "fulfilled") {
        console.log(`Order fulfillment already ${metadata.fulfillment_status} for ${session.id}`);
        return;
    }

    await stripe.checkout.sessions.update(session.id, {
        metadata: {
            ...metadata,
            fulfillment_status: "processing",
        },
    });
    
    // Forward the normalized paid order to the configured fulfillment automation.
    const GHL_SHOP_PURCHASE_WEBHOOK = process.env.GHL_SHOP_PURCHASE_WEBHOOK_URL;
    const hasDigital = items.some((item) => item.t === "digital" || item.t === "audio" || item.t === "bundle");
    const hasPhysical = items.some((item) => item.sh === true || item.t === "physical" || item.t === "bundle");
    
    if (GHL_SHOP_PURCHASE_WEBHOOK) {
        const response = await fetch(GHL_SHOP_PURCHASE_WEBHOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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
        console.warn(`No GHL_SHOP_PURCHASE_WEBHOOK_URL configured. Manual fulfillment required for ${session.id}.`);
    }
    
    // Log success
    console.log(`✅ Order fulfillment triggered for ${email}`);
}

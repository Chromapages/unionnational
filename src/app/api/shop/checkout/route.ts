import { NextRequest } from "next/server";
import { client } from "@/sanity/lib/client";
import { getStripe } from "@/lib/stripe";
import { getEnv, publicEnv } from "@/lib/config/env";
import { createApiHandler } from "@/lib/observability/api-handler";
import { checkRateLimit as checkRequestRateLimit } from "@/lib/security/rate-limiter";
import { leadRequesterKey } from "@/lib/security/lead-ingress";
import { incrementCounter, withLatencyAsync } from "@/lib/observability/request-metrics";
import { readLeadJson } from "@/lib/intake/shared";
import { buildCheckoutItemsMetadata } from "@/lib/shop/order-metadata";
import { getPaymentStorage } from "@/lib/shop/payment-storage";
import { issueReceiptCookie, oldReceiptCookieNames, purchaseReference, receiptCookieName, RECEIPT_TTL_SECONDS } from "@/lib/shop/payment-security";
import { orderMetadataSignature, fulfillmentConfiguration } from "@/lib/shop/fulfillment";
import {
    CHECKOUT_PRODUCTS_QUERY,
    resolveCheckoutItem,
    validateCartItem,
    type CheckoutCartItemPayload,
    type ProductCheckoutRecord,
    type ResolvedCheckoutItem,
} from "@/lib/shop/checkout";

const CHECKOUT_RATE_LIMIT_MAX = 30;
const CHECKOUT_RATE_LIMIT_WINDOW_MS = 60 * 1000;

export async function POST(request: NextRequest) {
    const handler = createApiHandler(request, {
        module: "shop-checkout",
        rateLimitMax: CHECKOUT_RATE_LIMIT_MAX,
        rateLimitWindowMs: CHECKOUT_RATE_LIMIT_WINDOW_MS,
    });

    let quota;
    try {
        const global = await checkRequestRateLimit("shop-checkout:global", 120, CHECKOUT_RATE_LIMIT_WINDOW_MS);
        quota = global.success ? await checkRequestRateLimit(`shop-checkout:${leadRequesterKey(request)}`, CHECKOUT_RATE_LIMIT_MAX, CHECKOUT_RATE_LIMIT_WINDOW_MS) : global;
    } catch (error) {
        handler.error("Checkout quota unavailable", error, { module: "shop-checkout" });
        return handler.json({ ok: false, code: "CHECKOUT_UNAVAILABLE", message: "Checkout is temporarily unavailable. Please try again shortly." }, { status: 503 });
    }
    const rateLimit = { limited: !quota.success, remaining: quota.remaining, resetAt: quota.resetTime };

    if (rateLimit.limited) {
        handler.log.warn("Checkout rate limit exceeded");
        incrementCounter("shop_checkout_rate_limited");
        return handler.json(
            { ok: false, code: "RATE_LIMITED", message: "Too many requests" },
            {
                status: 429,
                headers: handler.rateLimitHeaders(rateLimit.remaining, rateLimit.resetAt),
            }
        );
    }

    try {
        const json = await readLeadJson(request);
        if (!json.ok) return handler.json({ ok: false, code: json.status === 413 ? "REQUEST_TOO_LARGE" : "INVALID_JSON", message: json.error }, { status: json.status });
        const parsed: unknown = json.value;
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
            return handler.json({ ok: false, code: "INVALID_CART", message: "Invalid cart." }, { status: 400 });
        }
        const body = parsed as { items?: CheckoutCartItemPayload[]; locale?: string; returnUrl?: string };
        if ((body.locale !== undefined && body.locale !== "en" && body.locale !== "es") || body.returnUrl !== undefined) {
            return handler.json(
                { ok: false, code: "INVALID_RETURN_TARGET", message: "Invalid checkout return target." },
                { status: 400 }
            );
        }
        const locale = body.locale ?? "en";
        const items = body.items ?? [];

        if (!Array.isArray(items) || items.length === 0) {
            incrementCounter("shop_checkout_empty_cart");
            return handler.json(
                { ok: false, code: "EMPTY_CART", message: "Your cart is empty." },
                { status: 400, headers: handler.rateLimitHeaders(rateLimit.remaining, rateLimit.resetAt) }
            );
        }

        if (items.length > 100) return handler.json({ ok: false, code: "CART_TOO_LARGE", message: "Please check out with fewer distinct resources at a time." }, { status: 400 });

        for (const item of items) {
            if (!validateCartItem(item) || !item.slug.trim() || !item.productId.trim()
                || (item.editionId !== undefined && (typeof item.editionId !== "string" || !item.editionId.trim()))) {
                incrementCounter("shop_checkout_invalid_item");
                return handler.json(
                    { ok: false, code: "INVALID_CART_ITEM", message: "One or more cart items are invalid." },
                    { status: 400, headers: handler.rateLimitHeaders(rateLimit.remaining, rateLimit.resetAt) }
                );
            }
        }

        const quantities = new Map<string, number>();
        let totalQuantity = 0;
        for (const item of items) {
            if (item.productId.length > 200 || item.slug.length > 200 || (item.editionId?.length ?? 0) > 200) return handler.json({ ok: false, code: "INVALID_CART_ITEM", message: "Invalid cart item." }, { status: 400 });
            totalQuantity += item.quantity;
        }
        if (totalQuantity > 200) return handler.json({ ok: false, code: "CART_TOO_LARGE", message: "Please reduce the quantities in your cart." }, { status: 400 });
        const slugs = [...new Set(items.map((item) => item.slug))];

        const products = await withLatencyAsync("shop_checkout_fetch_products_ms", async () => {
            return client.fetch<ProductCheckoutRecord[]>(CHECKOUT_PRODUCTS_QUERY, { slugs });
        });

        const productMap = new Map(products.map((product) => [product.slug, product]));

        const lineItems: { price: string; quantity: number }[] = [];
        const resolvedItems: ResolvedCheckoutItem[] = [];

        for (const item of items) {
            const product = productMap.get(item.slug);

            if (!product || product._id !== item.productId) {
                incrementCounter("shop_checkout_product_not_found");
                return handler.json(
                    { ok: false, code: "PRODUCT_NOT_FOUND", message: `Product ${item.slug} is no longer available.` },
                    { status: 404, headers: handler.rateLimitHeaders(rateLimit.remaining, rateLimit.resetAt) }
                );
            }

            const resolvedItem = resolveCheckoutItem(product, item);

            if (!resolvedItem) {
                const externalDefault = !product.editions?.length && (item.editionId === undefined || item.editionId === `${product._id}-default`);
                if (items.length === 1 && externalDefault && product.buyLink && /^https?:\/\//i.test(product.buyLink)) {
                    incrementCounter("shop_checkout_redirect_external");
                    return handler.json(
                        { ok: true, redirectUrl: product.buyLink, code: "REDIRECT_TO_EXTERNAL_CHECKOUT" },
                        { headers: handler.rateLimitHeaders(rateLimit.remaining, rateLimit.resetAt) }
                    );
                }

                incrementCounter("shop_checkout_price_missing");
                return handler.json(
                    {
                        ok: false,
                        code: "STRIPE_PRICE_MISSING",
                        message: `Checkout is currently unavailable for ${item.slug}.`,
                    },
                    { status: 409, headers: handler.rateLimitHeaders(rateLimit.remaining, rateLimit.resetAt) }
                );
            }

            const canonicalKey = `${resolvedItem.productId}:${resolvedItem.editionId}`;
            const quantity = (quantities.get(canonicalKey) ?? 0) + item.quantity;
            if (quantity > 99 || resolvedItem.fulfillmentType === "unknown") return handler.json({ ok: false, code: "INVALID_CART_ITEM", message: "This quantity or offer is unavailable." }, { status: 400 });
            quantities.set(canonicalKey, quantity);
            lineItems.push({ price: resolvedItem.stripePriceId, quantity: item.quantity });
            resolvedItems.push(resolvedItem);
        }

        const baseUrl = publicEnv.baseUrl;
        const requiresShipping = resolvedItems.some((item) => item.requiresShipping);

        const receiptSecret = getEnv("STRIPE_WEBHOOK_SECRET");
        try {
            if (!receiptSecret) throw new Error("Receipt configuration unavailable");
            getPaymentStorage();
            fulfillmentConfiguration(getEnv("GHL_SHOP_PURCHASE_WEBHOOK_URL"));
        } catch {
            return handler.json({ ok: false, code: "CHECKOUT_UNAVAILABLE", message: "Checkout is temporarily unavailable. Please contact us." }, { status: 503 });
        }
        const metadataItems = resolvedItems.map((item, index) => ({
            p: item.productId,
            s: item.slug,
            e: item.editionId,
            ce: items[index].editionId ?? null,
            n: item.editionName?.slice(0, 200),
            f: item.format?.slice(0, 200),
            t: item.fulfillmentType,
            sh: item.requiresShipping,
            pr: item.stripePriceId,
            q: item.quantity,
        }));
        const orderItemsMetadata = buildCheckoutItemsMetadata(metadataItems);

        if (!orderItemsMetadata) {
            incrementCounter("shop_checkout_cart_too_large");
            return handler.json(
                { ok: false, code: "CART_TOO_LARGE", message: "Please check out with fewer distinct resources at a time." },
                { status: 400, headers: handler.rateLimitHeaders(rateLimit.remaining, rateLimit.resetAt) }
            );
        }

        if (!getEnv("STRIPE_SECRET_KEY")) {
            handler.log.error("Stripe checkout is not configured", {
                module: "shop-checkout",
                reason: "missing_STRIPE_SECRET_KEY",
            });
            incrementCounter("shop_checkout_not_configured");
            return handler.json(
                {
                    ok: false,
                    code: "CHECKOUT_NOT_CONFIGURED",
                    message: "Checkout is not configured yet. Please contact us to complete this purchase.",
                    traceId: handler.traceId,
                },
                { status: 503, headers: handler.rateLimitHeaders(rateLimit.remaining, rateLimit.resetAt) }
            );
        }

        const stripe = getStripe();
        const prices = new Map(await Promise.all([...new Set(resolvedItems.map(item => item.stripePriceId))].map(async id => [id, await stripe.prices.retrieve(id)] as const)));
        for (const item of resolvedItems) {
            const price = prices.get(item.stripePriceId)!;
            if (!price.active || price.type !== "one_time" || price.currency !== "usd" || !Number.isSafeInteger(item.expectedAmount)
                || price.unit_amount !== item.expectedAmount || (item.stripeProductId && (typeof price.product === "string" ? price.product : price.product.id) !== item.stripeProductId)) {
                return handler.json({ ok: false, code: "OFFER_UNAVAILABLE", message: "This offer is temporarily unavailable. Please contact us." }, { status: 409 });
            }
        }

        const session = await withLatencyAsync("shop_checkout_create_session_ms", async () => {
            return stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: lineItems,
                mode: "payment",
                success_url: `${baseUrl}/${locale}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${baseUrl}/${locale}/shop/cart?checkout=cancelled`,
                ...(requiresShipping ? {
                    shipping_address_collection: {
                        allowed_countries: ["US", "CA"],
                    },
                } : {}),
                metadata: {
                    order_source: "unt_bookstore",
                    fulfillment_status: "pending",
                    has_physical: String(requiresShipping),
                    has_digital: String(resolvedItems.some((item) => item.fulfillmentType === "digital" || item.fulfillmentType === "audio" || item.fulfillmentType === "bundle")),
                    item_count: String(resolvedItems.reduce((count, item) => count + item.quantity, 0)),
                    ...orderItemsMetadata,
                    items_signature: orderMetadataSignature(metadataItems, receiptSecret!),
                },
            });
        }, { module: "shop-checkout" });

        incrementCounter("shop_checkout_session_created");
        const response = handler.json(
            {
                ok: true,
                redirectUrl: session.url,
                code: "STRIPE_CHECKOUT_SESSION_CREATED",
                message: "Redirecting to secure checkout.",
            },
            { headers: handler.rateLimitHeaders(rateLimit.remaining, rateLimit.resetAt) }
        );
        const name = receiptCookieName(purchaseReference(session.id, receiptSecret!))!;
        const cookie = issueReceiptCookie(session.id, receiptSecret!);
        for (const stale of oldReceiptCookieNames(request.headers.get("cookie"), name)) response.headers.append("Set-Cookie", `${stale}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`);
        response.headers.append("Set-Cookie", `${name}=${cookie}; Path=/; Max-Age=${RECEIPT_TTL_SECONDS}; HttpOnly; Secure; SameSite=Lax`);
        response.headers.set("Cache-Control", "private, no-store");
        return response;
    } catch (error: unknown) {
        handler.error("Stripe checkout error", error, { module: "shop-checkout" });
        incrementCounter("shop_checkout_error");
        return handler.json(
            { ok: false, code: "CHECKOUT_ERROR", message: "An error occurred during checkout.", traceId: handler.traceId },
            { status: 500, headers: handler.rateLimitHeaders(rateLimit.remaining, rateLimit.resetAt) }
        );
    }
}

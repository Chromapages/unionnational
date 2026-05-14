import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { getStripe } from "@/lib/stripe";
import { publicEnv } from "@/lib/config/env";
import { createApiHandler, getClientIp } from "@/lib/observability/api-handler";
import { incrementCounter, withLatencyAsync } from "@/lib/observability/request-metrics";
import { requiresShippingForFulfillment } from "@/lib/shop/commerce";
import type { FulfillmentType } from "@/lib/shop/types";
import {
    CHECKOUT_PRODUCTS_QUERY,
    resolveCheckoutItem,
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

    const ip = getClientIp(request);
    const { checkRateLimit } = await import("@/lib/observability/api-handler");
    const rateLimit = checkRateLimit(
        ip,
        undefined,
        CHECKOUT_RATE_LIMIT_MAX,
        CHECKOUT_RATE_LIMIT_WINDOW_MS
    );

    if (rateLimit.limited) {
        handler.log.warn("Checkout rate limit exceeded", { ip });
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
        const body = (await request.json()) as { items?: CheckoutCartItemPayload[] };
        const items = body.items ?? [];

        if (!Array.isArray(items) || items.length === 0) {
            incrementCounter("shop_checkout_empty_cart");
            return handler.json(
                { ok: false, code: "EMPTY_CART", message: "Your cart is empty." },
                { status: 400, headers: handler.rateLimitHeaders(rateLimit.remaining, rateLimit.resetAt) }
            );
        }

        for (const item of items) {
            if (!item.slug || !item.productId || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99) {
                incrementCounter("shop_checkout_invalid_item");
                return handler.json(
                    { ok: false, code: "INVALID_CART_ITEM", message: "One or more cart items are invalid." },
                    { status: 400, headers: handler.rateLimitHeaders(rateLimit.remaining, rateLimit.resetAt) }
                );
            }
        }

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
                if (items.length === 1 && product.buyLink) {
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

            lineItems.push({ price: resolvedItem.stripePriceId, quantity: item.quantity });
            resolvedItems.push(resolvedItem);
        }

        const baseUrl = publicEnv.baseUrl;
        const requiresShipping = resolvedItems.some((item) => item.requiresShipping);

        const orderItemsMetadata = JSON.stringify(resolvedItems.map((item) => ({
            p: item.productId,
            s: item.slug,
            e: item.editionId,
            n: item.editionName,
            f: item.format,
            t: item.fulfillmentType,
            sh: item.requiresShipping,
            pr: item.stripePriceId,
            q: item.quantity,
        })));

        if (orderItemsMetadata.length > 500) {
            incrementCounter("shop_checkout_cart_too_large");
            return handler.json(
                { ok: false, code: "CART_TOO_LARGE", message: "Please check out with fewer distinct resources at a time." },
                { status: 400, headers: handler.rateLimitHeaders(rateLimit.remaining, rateLimit.resetAt) }
            );
        }

        const stripe = getStripe();

        const session = await withLatencyAsync("shop_checkout_create_session_ms", async () => {
            return stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: lineItems,
                mode: "payment",
                success_url: `${baseUrl}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${baseUrl}/shop/cart?checkout=cancelled`,
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
                    items: orderItemsMetadata,
                },
            });
        }, { module: "shop-checkout" });

        incrementCounter("shop_checkout_session_created");
        return handler.json(
            {
                ok: true,
                redirectUrl: session.url,
                code: "STRIPE_CHECKOUT_SESSION_CREATED",
                message: "Redirecting to secure checkout.",
            },
            { headers: handler.rateLimitHeaders(rateLimit.remaining, rateLimit.resetAt) }
        );
    } catch (error: unknown) {
        handler.error("Stripe checkout error", error, { module: "shop-checkout" });
        incrementCounter("shop_checkout_error");
        return handler.json(
            { ok: false, code: "CHECKOUT_ERROR", message: "An error occurred during checkout.", traceId: handler.traceId },
            { status: 500, headers: handler.rateLimitHeaders(rateLimit.remaining, rateLimit.resetAt) }
        );
    }
}

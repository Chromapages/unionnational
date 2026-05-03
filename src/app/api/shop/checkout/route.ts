import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { getStripe } from "@/lib/stripe";
import { classifyFulfillment, requiresShippingForFulfillment } from "@/lib/shop/commerce";
import type { FulfillmentType } from "@/lib/shop/types";
import { STRIPE_PRICE_MAP } from "@/lib/shop/stripe-price-map";

interface CheckoutCartItemPayload {
    productId: string;
    editionId?: string;
    editionName?: string;
    slug: string;
    quantity: number;
    stripePriceId?: string;
    format?: string;
    fulfillmentType?: FulfillmentType;
    requiresShipping?: boolean;
}

interface ProductCheckoutRecord {
    _id: string;
    title: string;
    slug: string;
    buyLink?: string;
    price: number;
    stripePriceId?: string;
    editions?: Array<{
        _key?: string;
        name: string;
        price: number;
        format?: string;
        stripePriceId?: string;
    }>;
}

interface ResolvedCheckoutItem {
    productId: string;
    slug: string;
    title: string;
    editionId?: string;
    editionName?: string;
    format?: string;
    fulfillmentType: FulfillmentType;
    requiresShipping: boolean;
    stripePriceId: string;
    quantity: number;
}

const CHECKOUT_PRODUCTS_QUERY = `
  *[_type == "product" && slug.current in $slugs]{
    _id,
    "title": coalesce(title.en, title["en"], title),
    "slug": slug.current,
    buyLink,
    price,
    stripePriceId,
    editions[]{
      _key,
      name,
      price,
      format,
      stripePriceId
    }
  }
`;

function findMatchingEdition(product: ProductCheckoutRecord, item: CheckoutCartItemPayload) {
    if (!item.editionId || !product.editions?.length) return null;

    return product.editions.find((edition) => {
        const normalizedName = edition.name.toLowerCase().replace(/\s+/g, "-");
        return edition._key === item.editionId || normalizedName === item.editionId || `${product._id}-${normalizedName}` === item.editionId;
    }) || null;
}

function getStripePriceId(product: ProductCheckoutRecord, item: CheckoutCartItemPayload, matchingEdition = findMatchingEdition(product, item)) {
    const titleWithoutLeadingThe = product.title.replace(/^The\s+/i, "");
    const findMappedPrice = (keys: string[]) => {
        for (const key of keys) {
            if (STRIPE_PRICE_MAP[key]) {
                return STRIPE_PRICE_MAP[key];
            }
        }

        return null;
    };

    // 1. Check if edition has stripePriceId in Sanity
    if (item.editionId && product.editions?.length) {
        if (matchingEdition?.stripePriceId) {
            return matchingEdition.stripePriceId;
        }

        // 2. Fallback to static map using edition name or product title + edition name
        if (matchingEdition?.name) {
            const editionName = matchingEdition.name;
            const editionFormat = matchingEdition.format || "";
            const editionSearchText = `${editionName} ${editionFormat}`.toLowerCase();
            const isDigitalEdition = editionSearchText.includes("digital") || editionSearchText.includes("pdf");
            const isHardcoverEdition = editionSearchText.includes("hardcover") || editionSearchText.includes("physical") || editionSearchText.includes("print");
            const keysToTry = [
                `${product.title} - ${editionName}`,
                `${titleWithoutLeadingThe} - ${editionName}`,
                ...(isDigitalEdition ? [
                    `${product.title} - Digital PDF`,
                    `${titleWithoutLeadingThe} - Digital PDF`,
                    `${product.title} - Digital PDF Copy`,
                    `${titleWithoutLeadingThe} - Digital PDF Copy`,
                ] : []),
                ...(isHardcoverEdition ? [
                    `${product.title} + Shipping & Handling`,
                    `${titleWithoutLeadingThe} + Shipping & Handling`,
                    `${product.title} - Hardcover`,
                    `${titleWithoutLeadingThe} - Hardcover`,
                    `${editionName} + Shipping & Handling`,
                ] : []),
                `${product.title} + Shipping & Handling`,
                `${titleWithoutLeadingThe} + Shipping & Handling`,
                editionName,
                `${editionName} + Shipping & Handling`,
            ];

            const mappedPriceId = findMappedPrice(keysToTry);

            if (mappedPriceId) {
                return mappedPriceId;
            }
        }
    }

    // 3. Generated fallback editions still encode the intended format in their ID.
    // Prefer those product-specific Stripe prices before falling back to a top-level price.
    if (item.editionId) {
        const normalizedEditionId = item.editionId.toLowerCase();
        const isDigitalEdition = normalizedEditionId.includes("digital") || normalizedEditionId.includes("pdf");
        const isHardcoverEdition = normalizedEditionId.includes("hardcover") || normalizedEditionId.includes("physical") || normalizedEditionId.includes("print");
        const fallbackEditionPriceId = findMappedPrice([
            ...(isDigitalEdition ? [
                `${product.title} - Digital PDF`,
                `${titleWithoutLeadingThe} - Digital PDF`,
                `${product.title} - Digital PDF Copy`,
                `${titleWithoutLeadingThe} - Digital PDF Copy`,
            ] : []),
            ...(isHardcoverEdition ? [
                `${product.title} + Shipping & Handling`,
                `${titleWithoutLeadingThe} + Shipping & Handling`,
                `${product.title} - Hardcover`,
                `${titleWithoutLeadingThe} - Hardcover`,
            ] : []),
        ]);

        if (fallbackEditionPriceId) {
            return fallbackEditionPriceId;
        }
    }

    // 4. Check if top-level product has stripePriceId in Sanity
    if (product.stripePriceId) {
        return product.stripePriceId;
    }

    // 5. Final Fallbacks: try product title variants directly in the map
    const productTitleKeys = [
        product.title,
        titleWithoutLeadingThe,
        `${product.title} + Shipping & Handling`,
        `${titleWithoutLeadingThe} + Shipping & Handling`,
    ];

    const mappedProductPriceId = findMappedPrice(productTitleKeys);

    return mappedProductPriceId;
}

function resolveCheckoutItem(product: ProductCheckoutRecord, item: CheckoutCartItemPayload): ResolvedCheckoutItem | null {
    const matchingEdition = findMatchingEdition(product, item);
    const priceId = getStripePriceId(product, item, matchingEdition);

    if (!priceId) {
        return null;
    }

    const editionName = matchingEdition?.name || item.editionName;
    const format = matchingEdition?.format || item.format;
    const fulfillmentType = item.fulfillmentType && item.fulfillmentType !== "unknown"
        ? item.fulfillmentType
        : classifyFulfillment(format, editionName);
    const requiresShipping = item.requiresShipping ?? requiresShippingForFulfillment(fulfillmentType);

    return {
        productId: product._id,
        slug: product.slug,
        title: product.title,
        editionId: item.editionId,
        editionName,
        format,
        fulfillmentType,
        requiresShipping,
        stripePriceId: priceId,
        quantity: item.quantity,
    };
}

export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as { items?: CheckoutCartItemPayload[] };
        const items = body.items ?? [];

        if (!Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                { ok: false, code: "EMPTY_CART", message: "Your cart is empty." },
                { status: 400 }
            );
        }

        for (const item of items) {
            if (!item.slug || !item.productId || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99) {
                return NextResponse.json(
                    { ok: false, code: "INVALID_CART_ITEM", message: "One or more cart items are invalid." },
                    { status: 400 }
                );
            }
        }

        const slugs = [...new Set(items.map((item) => item.slug))];
        const products = await client.fetch<ProductCheckoutRecord[]>(CHECKOUT_PRODUCTS_QUERY, { slugs });
        const productMap = new Map(products.map((product) => [product.slug, product]));

        const lineItems: { price: string; quantity: number }[] = [];
        const resolvedItems: ResolvedCheckoutItem[] = [];

        for (const item of items) {
            const product = productMap.get(item.slug);

            if (!product || product._id !== item.productId) {
                return NextResponse.json(
                    { ok: false, code: "PRODUCT_NOT_FOUND", message: `Product ${item.slug} is no longer available.` },
                    { status: 404 }
                );
            }

            const resolvedItem = resolveCheckoutItem(product, item);

            if (!resolvedItem) {
                // If no stripe price found, fallback to buyLink if it exists (legacy support)
                if (items.length === 1 && product.buyLink) {
                    return NextResponse.json({
                        ok: true,
                        redirectUrl: product.buyLink,
                        code: "REDIRECT_TO_EXTERNAL_CHECKOUT",
                    });
                }

                return NextResponse.json(
                    {
                        ok: false,
                        code: "STRIPE_PRICE_MISSING",
                        message: `Checkout is currently unavailable for ${item.slug}.`,
                    },
                    { status: 409 }
                );
            }

            lineItems.push({
                price: resolvedItem.stripePriceId,
                quantity: item.quantity,
            });
            resolvedItems.push(resolvedItem);
        }

        // Create Stripe Checkout Session
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://unionnationaltax.com";
        const stripe = getStripe();
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
            return NextResponse.json(
                {
                    ok: false,
                    code: "CART_TOO_LARGE",
                    message: "Please check out with fewer distinct resources at a time.",
                },
                { status: 400 }
            );
        }

        const requiresShipping = resolvedItems.some((item) => item.requiresShipping);
        const session = await stripe.checkout.sessions.create({
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
            // Metadata for post-purchase automation (e.g. email delivery)
            metadata: {
                order_source: "unt_bookstore",
                fulfillment_status: "pending",
                has_physical: String(requiresShipping),
                has_digital: String(resolvedItems.some((item) => item.fulfillmentType === "digital" || item.fulfillmentType === "audio" || item.fulfillmentType === "bundle")),
                item_count: String(resolvedItems.reduce((count, item) => count + item.quantity, 0)),
                items: orderItemsMetadata,
            },
        });

        return NextResponse.json({
            ok: true,
            redirectUrl: session.url,
            code: "STRIPE_CHECKOUT_SESSION_CREATED",
            message: "Redirecting to secure checkout.",
        });

    } catch (error: unknown) {
        console.error("Stripe Checkout Error:", error);
        const message = error instanceof Error ? error.message : "An error occurred during checkout.";
        return NextResponse.json(
            { ok: false, code: "CHECKOUT_ERROR", message },
            { status: 500 }
        );
    }
}

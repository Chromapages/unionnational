import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { getStripe } from "@/lib/stripe";
import { STRIPE_PRICE_MAP } from "@/lib/shop/stripe-price-map";

interface CheckoutCartItemPayload {
    productId: string;
    editionId?: string;
    slug: string;
    quantity: number;
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

function getStripePriceId(product: ProductCheckoutRecord, item: CheckoutCartItemPayload) {
    // 1. Check if edition has stripePriceId in Sanity
    if (item.editionId && product.editions?.length) {
        const matchingEdition = product.editions.find((edition) => {
            const normalizedName = edition.name.toLowerCase().replace(/\s+/g, "-");
            return edition._key === item.editionId || normalizedName === item.editionId || `${product._id}-${normalizedName}` === item.editionId;
        });

        if (matchingEdition?.stripePriceId) {
            return matchingEdition.stripePriceId;
        }

        // 2. Fallback to static map using edition name or product title + edition name
        if (matchingEdition?.name) {
            if (STRIPE_PRICE_MAP[matchingEdition.name]) {
                return STRIPE_PRICE_MAP[matchingEdition.name];
            }
            
            // Try matching with product title prefix if edition name is short (e.g. "Digital PDF")
            const fullName = `${product.title} - ${matchingEdition.name}`;
            if (STRIPE_PRICE_MAP[fullName]) {
                return STRIPE_PRICE_MAP[fullName];
            }

            // Try matching with " + Shipping & Handling" suffix for physical/bundles
            const withShipping = `${matchingEdition.name} + Shipping & Handling`;
            if (STRIPE_PRICE_MAP[withShipping]) {
                return STRIPE_PRICE_MAP[withShipping];
            }
        }
    }

    // 3. Check if top-level product has stripePriceId in Sanity
    if (product.stripePriceId) {
        return product.stripePriceId;
    }

    return null;
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

        const slugs = [...new Set(items.map((item) => item.slug))];
        const products = await client.fetch<ProductCheckoutRecord[]>(CHECKOUT_PRODUCTS_QUERY, { slugs });
        const productMap = new Map(products.map((product) => [product.slug, product]));

        const lineItems = [];

        for (const item of items) {
            const product = productMap.get(item.slug);

            if (!product || product._id !== item.productId) {
                return NextResponse.json(
                    { ok: false, code: "PRODUCT_NOT_FOUND", message: `Product ${item.slug} is no longer available.` },
                    { status: 404 }
                );
            }

            const priceId = getStripePriceId(product, item);

            if (!priceId) {
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
                price: priceId,
                quantity: item.quantity,
            });
        }

        // Create Stripe Checkout Session
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://unionnationaltax.com";
        const stripe = getStripe();
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${baseUrl}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}/shop/cart`,
            shipping_address_collection: {
                allowed_countries: ["US", "CA"], // Adjust as needed
            },
            // Metadata for post-purchase automation (e.g. email delivery)
            metadata: {
                order_source: "unt_bookstore",
                items: JSON.stringify(items.map(i => ({ slug: i.slug, edition: i.editionId }))),
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

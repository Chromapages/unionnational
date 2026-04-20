import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

interface CheckoutCartItemPayload {
    productId: string;
    editionId?: string;
    slug: string;
    quantity: number;
}

interface ProductCheckoutRecord {
    _id: string;
    slug: string;
    buyLink?: string;
    price: number;
    editions?: Array<{
        _key?: string;
        name: string;
        price: number;
        format?: string;
    }>;
}

const CHECKOUT_PRODUCTS_QUERY = `
  *[_type == "product" && slug.current in $slugs]{
    _id,
    "slug": slug.current,
    buyLink,
    price,
    editions[]{
      _key,
      name,
      price,
      format
    }
  }
`;

function getCanonicalLinePrice(product: ProductCheckoutRecord, editionId?: string) {
    if (!editionId || editionId === "default" || !product.editions?.length) {
        return product.price;
    }

    const matchingEdition = product.editions.find((edition) => {
        const normalizedName = edition.name.toLowerCase().replace(/\s+/g, "-");
        return edition._key === editionId || normalizedName === editionId || `${product._id}-${normalizedName}` === editionId;
    });

    return matchingEdition?.price ?? product.price;
}

export async function POST(request: NextRequest) {
    const body = (await request.json()) as { items?: CheckoutCartItemPayload[] };
    const items = body.items ?? [];

    if (!Array.isArray(items) || items.length === 0) {
        return NextResponse.json(
            { ok: false, code: "EMPTY_CART", message: "Your cart is empty." },
            { status: 400 }
        );
    }

    const invalidQuantity = items.find((item) => !item.slug || item.quantity < 1);
    if (invalidQuantity) {
        return NextResponse.json(
            { ok: false, code: "INVALID_CART", message: "One or more cart items are invalid." },
            { status: 400 }
        );
    }

    const slugs = [...new Set(items.map((item) => item.slug))];
    const products = await client.fetch<ProductCheckoutRecord[]>(CHECKOUT_PRODUCTS_QUERY, { slugs });
    const productMap = new Map(products.map((product) => [product.slug, product]));

    for (const item of items) {
        const product = productMap.get(item.slug);

        if (!product || product._id !== item.productId) {
            return NextResponse.json(
                { ok: false, code: "PRODUCT_NOT_FOUND", message: "A cart item is no longer available." },
                { status: 404 }
            );
        }

        if (!product.buyLink) {
            return NextResponse.json(
                {
                    ok: false,
                    code: "CHECKOUT_UNAVAILABLE",
                    message: "This product does not have a checkout link configured yet.",
                },
                { status: 409 }
            );
        }
    }

    if (items.length > 1) {
        return NextResponse.json(
            {
                ok: false,
                code: "MULTI_ITEM_CHECKOUT_UNAVAILABLE",
                message: "Multi-item checkout is not configured yet. Please purchase one resource at a time.",
            },
            { status: 409 }
        );
    }

    const [item] = items;
    const product = productMap.get(item.slug)!;
    const unitPrice = getCanonicalLinePrice(product, item.editionId);

    if (item.quantity !== 1) {
        return NextResponse.json(
            {
                ok: false,
                code: "QUANTITY_UNAVAILABLE",
                message: "Please purchase one copy at a time for this resource.",
            },
            { status: 409 }
        );
    }

    return NextResponse.json({
        ok: true,
        redirectUrl: product.buyLink,
        code: "REDIRECT_TO_EXTERNAL_CHECKOUT",
        message: "Redirecting to secure checkout.",
        value: unitPrice,
    });
}

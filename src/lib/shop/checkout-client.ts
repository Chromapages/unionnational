import type { CartLineItem, CheckoutCartItemPayload } from "@/lib/shop/types";

export interface CheckoutResult {
    ok: boolean;
    redirectUrl?: string;
    message?: string;
    code?: string;
}

export async function beginCheckout(items: CartLineItem[]): Promise<CheckoutResult> {
    if (items.length === 0) {
        return {
            ok: false,
            code: "EMPTY_CART",
            message: "Your cart is empty.",
        };
    }

    const payload: CheckoutCartItemPayload[] = items.map((item) => ({
        productId: item.productId,
        editionId: item.editionId,
        editionName: item.editionName,
        slug: item.slug,
        quantity: item.quantity,
        stripePriceId: item.stripePriceId,
        format: item.format,
        fulfillmentType: item.fulfillmentType,
        requiresShipping: item.requiresShipping,
    }));

    const response = await fetch("/api/shop/checkout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: payload }),
    });

    const data = (await response.json()) as CheckoutResult;
    return data;
}

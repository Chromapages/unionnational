export interface ProductEdition {
    id?: string;
    name: string;
    price: number;
    format: string;
    description?: string;
    stripePriceId?: string;
}

export type FulfillmentType = "digital" | "physical" | "audio" | "bundle" | "unknown";

export interface CartLineItem {
    id: string;
    productId: string;
    editionId?: string;
    editionName?: string;
    slug: string;
    title: string;
    price: number;
    image: string;
    format: string;
    fulfillmentType?: FulfillmentType;
    requiresShipping?: boolean;
    quantity: number;
    buyLink?: string;
    stripeProductId?: string;
    stripePriceId?: string;
}

export interface CheckoutCartItemPayload {
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

export function buildCartItemKey(productId: string, editionId?: string) {
    return `${productId}::${editionId || "default"}`;
}

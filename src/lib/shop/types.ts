export interface ProductEdition {
    id?: string;
    name: string;
    price: number;
    format: string;
    description?: string;
}

export interface CartLineItem {
    id: string;
    productId: string;
    editionId?: string;
    slug: string;
    title: string;
    price: number;
    image: string;
    format: string;
    quantity: number;
    buyLink?: string;
}

export interface CheckoutCartItemPayload {
    productId: string;
    editionId?: string;
    slug: string;
    quantity: number;
}

export function buildCartItemKey(productId: string, editionId?: string) {
    return `${productId}::${editionId || "default"}`;
}

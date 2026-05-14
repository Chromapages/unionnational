import type { FulfillmentType, ProductEdition } from "@/lib/shop/types";

export interface CommerceEditionLike {
    id?: string;
    _key?: string;
    name?: string;
    format?: string;
    price?: number;
    stripePriceId?: string;
}

export function normalizeEditionId(productId: string, edition: CommerceEditionLike) {
    if (edition._key) return edition._key;
    if (edition.id) return edition.id;

    const normalizedName = (edition.name || edition.format || "default")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    return `${productId}-${normalizedName || "default"}`;
}

export function classifyFulfillment(format?: string, name?: string): FulfillmentType {
    const text = `${format || ""} ${name || ""}`.toLowerCase();
    const hasDigital = text.includes("digital") || text.includes("pdf") || text.includes("ebook") || text.includes("e-book");
    const hasAudio = text.includes("audio");
    const hasPhysical = text.includes("hardcover") || text.includes("physical") || text.includes("print") || text.includes("shipping");

    if ((hasDigital || hasAudio) && hasPhysical) return "bundle";
    if (hasPhysical) return "physical";
    if (hasAudio) return "audio";
    if (hasDigital) return "digital";

    return "unknown";
}

export function requiresShippingForFulfillment(fulfillmentType: FulfillmentType) {
    return fulfillmentType === "physical" || fulfillmentType === "bundle";
}

export function normalizeProductEdition(productId: string, edition: ProductEdition): ProductEdition & {
    id: string;
    fulfillmentType: FulfillmentType;
    requiresShipping: boolean;
} {
    const fulfillmentType = classifyFulfillment(edition.format, edition.name);

    return {
        ...edition,
        id: normalizeEditionId(productId, edition),
        fulfillmentType,
        requiresShipping: requiresShippingForFulfillment(fulfillmentType),
    };
}

export function compactJson(value: unknown, maxLength = 500) {
    const json = JSON.stringify(value);
    return json.length > maxLength ? json.slice(0, maxLength) : json;
}

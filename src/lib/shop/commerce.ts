import type { FulfillmentType, ProductEdition } from "@/lib/shop/types";
import { extractString } from "@/lib/utils";

export interface CommerceEditionLike {
    id?: string;
    _key?: string;
    name?: unknown;
    format?: unknown;
    price?: number;
    stripePriceId?: string;
}

const safeLower = (value: unknown): string => {
    if (typeof value === "string") return value.toLowerCase().trim();
    if (value && typeof value === "object" && !Array.isArray(value)) {
        return extractString(value, "en", "").toLowerCase().trim();
    }
    return "";
};

function normalizeText(value: unknown) {
    return safeLower(value);
}

export function normalizeEditionId(productId: string, edition: CommerceEditionLike) {
    if (edition._key) return edition._key;
    if (edition.id) return edition.id;

    const normalizedName = (normalizeText(edition.name) || normalizeText(edition.format) || "default")
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    return `${productId}-${normalizedName || "default"}`;
}

export function classifyFulfillment(format?: unknown, name?: unknown): FulfillmentType {
    const nameText = safeLower(name);
    const formatText = safeLower(format);
    const text = `${formatText} ${nameText}`;

    if (nameText.includes("bundle")) return "bundle";
    if (nameText.includes("audio")) return "audio";
    if (nameText.includes("digital") || nameText.includes("pdf") || nameText.includes("ebook") || nameText.includes("e-book")) return "digital";
    if (nameText.includes("hardcover") || nameText.includes("physical") || nameText.includes("print")) return "physical";

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

export function isServiceFulfillment(fulfillmentType?: FulfillmentType) {
    return fulfillmentType === "service";
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

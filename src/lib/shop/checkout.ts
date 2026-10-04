/**
 * Checkout price resolution and cart item processing.
 * Extracted from src/app/api/shop/checkout/route.ts
 * All functions are pure and independently testable.
 */
import type { FulfillmentType } from "@/lib/shop/types";
import { STRIPE_PRICE_MAP } from "@/lib/shop/stripe-price-map";
import { classifyFulfillment, normalizeEditionId, requiresShippingForFulfillment } from "@/lib/shop/commerce";
import { extractString } from "@/lib/utils";

const safeLower = (value: unknown): string => {
    if (typeof value === "string") return value.toLowerCase().trim();
    if (value && typeof value === "object") {
        return extractString(value, "en", "").toLowerCase().trim();
    }
    return "";
};

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

export interface ProductCheckoutRecord {
    _id: string;
    title: string;
    slug: string;
    buyLink?: string;
    price: number;
    format?: string;
    stripePriceId?: string;
    editions?: Array<{
        _key?: string;
        name: string;
        price: number;
        format?: string;
        language?: string;
        stripePriceId?: string;
    }>;
    orderBump?: {
        _key?: string;
        name?: string | Record<string, string>;
        price?: number;
        format?: string;
        stripePriceId?: string;
        stripeProductId?: string;
    };
}

export interface ResolvedCheckoutItem {
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

export const CHECKOUT_PRODUCTS_QUERY = `
  *[_type == "product" && slug.current in $slugs]{
    _id,
    "title": coalesce(title.en, title["en"], title),
    "slug": slug.current,
    buyLink,
    price,
    format,
    stripePriceId,
    editions[]{
      _key,
      name,
      price,
      format,
      language,
      stripePriceId
    },
    orderBump {
      _key,
      name,
      price,
      format,
      stripePriceId,
      stripeProductId
    }
  }
`;

type CatalogEdition = NonNullable<ProductCheckoutRecord["editions"]>[number];

export function findMatchingEdition(product: ProductCheckoutRecord, item: CheckoutCartItemPayload) {
    const editions = product.editions ?? [];
    if (item.editionId === undefined) return editions.length === 1 ? editions[0] : null;
    if (typeof item.editionId !== "string" || !item.editionId) return null;

    const matches = editions.filter((edition) => {
        const legacyName = safeLower(edition.name).replace(/\s+/g, "-");
        return [edition._key, normalizeEditionId(product._id, edition), legacyName, `${product._id}-${legacyName}`]
            .includes(item.editionId);
    });
    // Generated aliases must not select between multiple catalog editions.
    return matches.length === 1 ? matches[0] : null;
}

function validPriceId(priceId?: string): priceId is string {
    return typeof priceId === "string" && /^price_[A-Za-z0-9]+$/.test(priceId);
}

function findMappedPrice(keys: string[]): string | null {
    for (const key of keys) {
        const price = STRIPE_PRICE_MAP[key];
        if (validPriceId(price)) return price;
    }
    return null;
}

function mappedEditionPrice(product: ProductCheckoutRecord, edition: CatalogEdition): string | null {
    // Static mappings describe English offers; another language needs its own CMS price.
    const language = safeLower(edition.language);
    if (language && language.split("-")[0] !== "en") return null;
    const name = extractString(edition.name, "en");
    const title = extractString(product.title, "en");
    const shortTitle = title.replace(/^The\s+/i, "");
    const fulfillment = classifyFulfillment(edition.format, edition.name);
    const keys = [`${title} - ${name}`, `${shortTitle} - ${name}`];

    if (fulfillment === "digital") {
        keys.push(`${product.slug} - digital`, `${product.slug} - pdf`);
        for (const prefix of [title, shortTitle]) keys.push(`${prefix} - Digital PDF`, `${prefix} - Digital PDF Copy`);
    } else if (fulfillment === "physical") {
        keys.push(`${product.slug} - physical`, `${product.slug} - hardcover`);
        for (const prefix of [title, shortTitle]) keys.push(`${prefix} + Shipping & Handling`, `${prefix} - Hardcover`);
    } else if (fulfillment === "audio") {
        keys.push(`${product.slug} - audio`, `${title} - Audio`, `${shortTitle} - Audio`);
    } else if (fulfillment === "bundle") {
        keys.push(`${product.slug} - bundle`, `${title} Bundles + Shipping & Handling`, `${shortTitle} Bundles + Shipping & Handling`);
    }
    // Never fall back to generic names like "Digital PDF" or another edition's top-level price.
    return findMappedPrice(keys);
}

function isOrderBump(product: ProductCheckoutRecord, item: CheckoutCartItemPayload): boolean {
    return !!product.orderBump && typeof item.editionId === "string" &&
        (item.editionId === "strategy-call" || item.editionId === product.orderBump._key);
}

function selectedEdition(product: ProductCheckoutRecord, item: CheckoutCartItemPayload): CatalogEdition | null {
    if (product.editions?.length) return findMatchingEdition(product, item);
    // ProductHero's legacy default ID denotes the server's top-level offer, never a client-defined format.
    if (item.editionId !== undefined && item.editionId !== `${product._id}-default`) return null;
    const format = extractString(product.format, "en");
    if (classifyFulfillment(format, format) === "unknown") return null;
    return { _key: `${product._id}-default`, name: format, format, price: product.price, stripePriceId: product.stripePriceId };
}

export function getStripePriceId(product: ProductCheckoutRecord, item: CheckoutCartItemPayload): string | null {
    if (isOrderBump(product, item)) {
        const price = product.orderBump?.stripePriceId;
        return validPriceId(price) ? price : null;
    }
    const edition = selectedEdition(product, item);
    if (!edition) return null;
    return validPriceId(edition.stripePriceId) ? edition.stripePriceId : mappedEditionPrice(product, edition);
}

export function resolveCheckoutItem(product: ProductCheckoutRecord, item: CheckoutCartItemPayload): ResolvedCheckoutItem | null {
    if (isOrderBump(product, item)) {
        const bump = product.orderBump!;
        if (!validPriceId(bump.stripePriceId)) return null;
        return {
            productId: product._id, slug: product.slug, title: product.title,
            editionId: bump._key || "strategy-call",
            editionName: extractString(bump.name, "en", "30-Min Tax Strategy Call with Jason"),
            format: extractString(bump.format, "en", "service"),
            fulfillmentType: "service", requiresShipping: false,
            stripePriceId: bump.stripePriceId, quantity: item.quantity,
        };
    }

    const edition = selectedEdition(product, item);
    if (!edition) return null;
    const stripePriceId = validPriceId(edition.stripePriceId) ? edition.stripePriceId : mappedEditionPrice(product, edition);
    if (!stripePriceId) return null;
    const fulfillmentType = classifyFulfillment(edition.format, edition.name);
    return {
        productId: product._id, slug: product.slug, title: product.title,
        editionId: normalizeEditionId(product._id, edition),
        editionName: extractString(edition.name, "en"), format: extractString(edition.format, "en"),
        fulfillmentType, requiresShipping: requiresShippingForFulfillment(fulfillmentType),
        stripePriceId, quantity: item.quantity,
    };
}

export function validateCartItem(
    item: unknown
): item is CheckoutCartItemPayload {
    if (!item || typeof item !== "object") return false;
    const i = item as Record<string, unknown>;
    return (
        typeof i.slug === "string" &&
        typeof i.productId === "string" &&
        Number.isInteger(i.quantity) &&
        (i.quantity as number) >= 1 &&
        (i.quantity as number) <= 99
    );
}

export function validateCartItems(
    items: unknown
): items is CheckoutCartItemPayload[] {
    return Array.isArray(items) && items.every(validateCartItem);
}

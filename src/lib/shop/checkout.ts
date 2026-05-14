/**
 * Checkout price resolution and cart item processing.
 * Extracted from src/app/api/shop/checkout/route.ts
 * All functions are pure and independently testable.
 */
import type { FulfillmentType } from "@/lib/shop/types";
import { STRIPE_PRICE_MAP } from "@/lib/shop/stripe-price-map";
import { classifyFulfillment, requiresShippingForFulfillment } from "@/lib/shop/commerce";

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
    stripePriceId?: string;
    editions?: Array<{
        _key?: string;
        name: string;
        price: number;
        format?: string;
        stripePriceId?: string;
    }>;
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

export function findMatchingEdition(
    product: ProductCheckoutRecord,
    item: CheckoutCartItemPayload
) {
    if (!item.editionId || !product.editions?.length) return null;

    return (
        product.editions.find((edition) => {
            const normalizedName = edition.name.toLowerCase().replace(/\s+/g, "-");
            return (
                edition._key === item.editionId ||
                normalizedName === item.editionId ||
                `${product._id}-${normalizedName}` === item.editionId
            );
        }) ?? null
    );
}

function findMappedPrice(keys: string[]): string | null {
    for (const key of keys) {
        if (STRIPE_PRICE_MAP[key]) {
            return STRIPE_PRICE_MAP[key];
        }
    }
    return null;
}

export function getStripePriceId(
    product: ProductCheckoutRecord,
    item: CheckoutCartItemPayload,
    matchingEdition = findMatchingEdition(product, item)
): string | null {
    const titleWithoutLeadingThe = product.title.replace(/^The\s+/i, "");

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
            const isDigitalEdition =
                editionSearchText.includes("digital") ||
                editionSearchText.includes("pdf");
            const isHardcoverEdition =
                editionSearchText.includes("hardcover") ||
                editionSearchText.includes("physical") ||
                editionSearchText.includes("print");
            const keysToTry = [
                `${product.title} - ${editionName}`,
                `${titleWithoutLeadingThe} - ${editionName}`,
                ...(isDigitalEdition
                    ? [
                          `${product.title} - Digital PDF`,
                          `${titleWithoutLeadingThe} - Digital PDF`,
                          `${product.title} - Digital PDF Copy`,
                          `${titleWithoutLeadingThe} - Digital PDF Copy`,
                      ]
                    : []),
                ...(isHardcoverEdition
                    ? [
                          `${product.title} + Shipping & Handling`,
                          `${titleWithoutLeadingThe} + Shipping & Handling`,
                          `${product.title} - Hardcover`,
                          `${titleWithoutLeadingThe} - Hardcover`,
                          `${editionName} + Shipping & Handling`,
                      ]
                    : []),
                `${product.title} + Shipping & Handling`,
                `${titleWithoutLeadingThe} + Shipping & Handling`,
                editionName,
                `${editionName} + Shipping & Handling`,
            ];

            const mappedPriceId = findMappedPrice(keysToTry);
            if (mappedPriceId) return mappedPriceId;
        }
    }

    // 3. Generated fallback editions still encode the intended format in their ID.
    if (item.editionId) {
        const normalizedEditionId = item.editionId.toLowerCase();
        const isDigitalEdition =
            normalizedEditionId.includes("digital") ||
            normalizedEditionId.includes("pdf");
        const isHardcoverEdition =
            normalizedEditionId.includes("hardcover") ||
            normalizedEditionId.includes("physical") ||
            normalizedEditionId.includes("print");
        const fallbackEditionPriceId = findMappedPrice([
            ...(isDigitalEdition
                ? [
                      `${product.title} - Digital PDF`,
                      `${titleWithoutLeadingThe} - Digital PDF`,
                      `${product.title} - Digital PDF Copy`,
                      `${titleWithoutLeadingThe} - Digital PDF Copy`,
                  ]
                : []),
            ...(isHardcoverEdition
                ? [
                      `${product.title} + Shipping & Handling`,
                      `${titleWithoutLeadingThe} + Shipping & Handling`,
                      `${product.title} - Hardcover`,
                      `${titleWithoutLeadingThe} - Hardcover`,
                  ]
                : []),
        ]);

        if (fallbackEditionPriceId) return fallbackEditionPriceId;
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

    return findMappedPrice(productTitleKeys);
}

export function resolveCheckoutItem(
    product: ProductCheckoutRecord,
    item: CheckoutCartItemPayload
): ResolvedCheckoutItem | null {
    const matchingEdition = findMatchingEdition(product, item);
    const priceId = getStripePriceId(product, item, matchingEdition);

    if (!priceId) return null;

    const editionName = matchingEdition?.name || item.editionName;
    const format = matchingEdition?.format || item.format;
    const fulfillmentType =
        item.fulfillmentType && item.fulfillmentType !== "unknown"
            ? item.fulfillmentType
            : classifyFulfillment(format, editionName);
    const requiresShipping =
        item.requiresShipping ?? requiresShippingForFulfillment(fulfillmentType);

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
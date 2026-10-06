import { createHmac, timingSafeEqual } from "node:crypto";
import type Stripe from "stripe";
import { parseCheckoutItemsMetadata, type CheckoutMetadataItem } from "./order-metadata";
import { fulfillmentConfigurationGaps } from "./payment-configuration";

export function verifiedOrderItems(metadata: Stripe.Metadata | null, lines: Stripe.ApiList<Stripe.LineItem>, currency: string | null): CheckoutMetadataItem[] | null {
    if (metadata?.items_version !== "1" || !currency || !/^[a-z]{3}$/.test(currency) || lines.has_more || !lines.data.length) return null;
    const items = parseCheckoutItemsMetadata(metadata);
    if (!items.length || items.length > 100) return null;
    const allowed = new Set(["p", "s", "e", "ce", "n", "f", "t", "sh", "pr", "q"]);
    const expected = new Map<string, number>();
    const editions = new Map<string, number>();
    let quantity = 0;
    for (const item of items) {
        if (Object.keys(item).some(key => !allowed.has(key))
            || ![item.p, item.s, item.e].every(value => typeof value === "string" && value.length > 0 && value.length <= 200)
            || typeof item.pr !== "string" || !/^price_[A-Za-z0-9]+$/.test(item.pr)
            || !["digital", "physical", "audio", "bundle", "service"].includes(item.t ?? "")
            || typeof item.sh !== "boolean" || item.sh !== ["physical", "bundle"].includes(item.t ?? "")
            || typeof item.q !== "number" || !Number.isInteger(item.q) || item.q < 1 || item.q > 99
            || [item.n, item.f, item.ce].some(value => value !== undefined && value !== null && (typeof value !== "string" || value.length > 200))) return null;
        quantity += item.q;
        expected.set(item.pr, (expected.get(item.pr) ?? 0) + item.q);
        const edition = `${item.p}:${item.e}`;
        editions.set(edition, (editions.get(edition) ?? 0) + item.q);
    }
    if (quantity > 200 || [...editions.values()].some(count => count > 99)) return null;
    const actual = new Map<string, number>();
    for (const line of lines.data) {
        if (!line.price || line.currency !== currency || !line.quantity || !Number.isInteger(line.quantity) || line.quantity < 1) return null;
        actual.set(line.price.id, (actual.get(line.price.id) ?? 0) + line.quantity);
    }
    return actual.size === expected.size && [...expected].every(([id, count]) => actual.get(id) === count) ? items : null;
}

export function orderMetadataSignature(items: CheckoutMetadataItem[], secret: string) {
    return createHmac("sha256", secret).update(`unt-order-metadata:v1:${JSON.stringify(items)}`).digest("hex");
}

export function validOrderMetadataSignature(metadata: Stripe.Metadata | null, secret: string) {
    const signature = metadata?.items_signature;
    if (!signature || !/^[a-f0-9]{64}$/.test(signature) || metadata?.items_version !== "1") return false;
    return timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(orderMetadataSignature(parseCheckoutItemsMetadata(metadata), secret), "hex"));
}

export function fulfillmentConfiguration(url: string | undefined) {
    const secret = process.env.GHL_SHOP_FULFILLMENT_SECRET;
    if (fulfillmentConfigurationGaps(url).length) throw new Error("Fulfillment contract unavailable");
    return { url: new URL(url!).toString(), secret: secret! };
}

export function fulfillmentSignature(body: string, timestamp: string, secret: string) {
    return createHmac("sha256", secret).update(`unt-fulfillment:v1:${timestamp}:${body}`).digest("hex");
}

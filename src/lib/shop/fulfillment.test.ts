import type Stripe from "stripe";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fulfillmentConfiguration, fulfillmentSignature, orderMetadataSignature, validOrderMetadataSignature, verifiedOrderItems } from "./fulfillment";
import { buildCheckoutItemsMetadata } from "./order-metadata";

const secret = "fixture-order-secret";
const items = [{ p: "book", s: "book", e: "pdf", t: "digital", sh: false, pr: "price_fixture", q: 2 }];
const metadata = () => ({ ...buildCheckoutItemsMetadata(items), items_signature: orderMetadataSignature(items, secret) });
const lines = () => ({ data: [{ currency: "usd", price: { id: "price_fixture" }, quantity: 2 }], has_more: false } as Stripe.ApiList<Stripe.LineItem>);
describe("fulfillment order integrity", () => {
    it("preserves the canonical quantity policy when distinct offers share a Stripe price", () => {
        const shared = [{ ...items[0], p: "first", q: 60 }, { ...items[0], p: "second", q: 60 }];
        const paidLines = { ...lines(), data: [{ ...lines().data[0], quantity: 120 }] };
        expect(verifiedOrderItems(buildCheckoutItemsMetadata(shared), paidLines, "usd")).toEqual(shared);
        expect(verifiedOrderItems(buildCheckoutItemsMetadata([{ ...shared[0], q: 60 }, { ...shared[0], q: 60 }]), paidLines, "usd")).toBeNull();
    });
    it("accepts only signed current metadata matching verified price, quantity and currency", () => {
        expect(validOrderMetadataSignature(metadata(), secret)).toBe(true);
        expect(verifiedOrderItems(metadata(), lines(), "usd")).toEqual(items);
        const altered = { ...metadata(), items: JSON.stringify([{ ...items[0], q: 3 }]) };
        expect(validOrderMetadataSignature(altered, secret)).toBe(false);
        expect(verifiedOrderItems(altered, lines(), "usd")).toBeNull();
        expect(verifiedOrderItems(metadata(), { ...lines(), has_more: true }, "usd")).toBeNull();
        expect(verifiedOrderItems(metadata(), lines(), "cad")).toBeNull();
        expect(verifiedOrderItems({ items: JSON.stringify(items) }, lines(), "usd")).toBeNull();
    });
    it.each([{ ...items[0], t: "unknown" }, { ...items[0], q: 100 }, { ...items[0], p: undefined }, { ...items[0], injected: true }, { ...items[0], sh: true }])("rejects malformed canonical items %j", item => {
        expect(verifiedOrderItems(buildCheckoutItemsMetadata([item]), lines(), "usd")).toBeNull();
    });
});
describe("approved authenticated fulfillment destination", () => {
    beforeEach(() => {
        vi.stubEnv("GHL_SHOP_FULFILLMENT_SECRET", "fixture-only-32-character-minimum-secret");
        vi.stubEnv("GHL_SHOP_FULFILLMENT_ALLOWED_HOSTS", "receiver.example.test");
        vi.stubEnv("GHL_SHOP_FULFILLMENT_CONTRACT_CONFIRMED", "true");
    });
    afterEach(() => vi.unstubAllEnvs());
    it("requires an approved HTTPS destination and a confirmed contract", () => {
        expect(fulfillmentConfiguration("https://receiver.example.test/order").url).toBe("https://receiver.example.test/order");
        for (const url of ["http://receiver.example.test/order", "https://other.example.test/order", "https://user:pass@receiver.example.test/order", "https://receiver.example.test:444/order"]) expect(() => fulfillmentConfiguration(url)).toThrow();
        vi.stubEnv("GHL_SHOP_FULFILLMENT_CONTRACT_CONFIRMED", "false");
        expect(() => fulfillmentConfiguration("https://receiver.example.test/order")).toThrow();
    });
    it("binds message bytes and timestamp into the receiver MAC", () => {
        const signature = fulfillmentSignature("{}", "100", secret);
        expect(signature).not.toBe(fulfillmentSignature('{"changed":true}', "100", secret));
        expect(signature).not.toBe(fulfillmentSignature("{}", "101", secret));
    });
});

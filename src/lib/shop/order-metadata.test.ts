import { describe, expect, it } from "vitest";
import { buildCheckoutItemsMetadata, parseCheckoutItemsMetadata } from "./order-metadata";

describe("checkout order metadata", () => {
    it("reads existing paid orders without changing their item fields", () => {
        const items = [{ p: "book-1", e: "pdf", q: 2, t: "digital", sh: false }];
        expect(parseCheckoutItemsMetadata({ items: JSON.stringify(items) })).toEqual(items);
    });

    it("preserves validated original cart identities alongside canonical fulfillment editions", () => {
        const items = [{ p: "book", e: "pdf", ce: "book-digital-pdf", q: 1 }, { p: "single-edition-book", e: "pdf", ce: null, q: 1 }];
        expect(parseCheckoutItemsMetadata(buildCheckoutItemsMetadata(items))).toEqual(items);
    });

    it("keeps multi-edition orders intact within each Stripe metadata value limit", () => {
        const items = ["physical", "digital", "audio"].map(e => ({ p: "product-construction-book", e, s: "construction-profit-blueprint", n: e.repeat(35), f: e, t: e, sh: e === "physical", pr: "price_test", q: 1 }));
        const metadata = buildCheckoutItemsMetadata(items)!;
        expect(metadata.items_parts).toBeDefined();
        expect(Object.values(metadata).every(value => value.length <= 500)).toBe(true);
        expect(Object.keys(metadata).length).toBeLessThanOrEqual(41);
        expect(parseCheckoutItemsMetadata(metadata)).toEqual(items);
    });

    it("preserves Unicode across split boundaries", () => {
        const items = [{ p: "book", n: "📘".repeat(450), q: 1, t: "digital" }];
        const metadata = buildCheckoutItemsMetadata(items)!;
        expect(Object.values(metadata).every(value => value.length <= 500)).toBe(true);
        expect(parseCheckoutItemsMetadata(metadata)).toEqual(items);
    });

    it.each([{ items: "[", items_parts: "2" }, { items: "[]", items_parts: "999" }, { items: "[null]" }, { items: "{}" }])("fails safely for incomplete or invalid metadata %j", metadata => {
        expect(parseCheckoutItemsMetadata(metadata)).toEqual([]);
    });

    it("refuses records that exceed the bounded metadata budget", () => {
        expect(buildCheckoutItemsMetadata([{ n: "x".repeat(20_001) }])).toBeNull();
    });
});

import { describe, expect, it } from "vitest";
import { findMatchingEdition, getStripePriceId, resolveCheckoutItem, type CheckoutCartItemPayload, type ProductCheckoutRecord } from "./checkout";
import { STRIPE_PRICE_MAP } from "./stripe-price-map";

const product: ProductCheckoutRecord = {
    _id: "construction-book", title: "The Money-Making Blueprint for Construction Companies",
    slug: "the-money-making-blueprint-for-construction-companies", price: 39,
    stripePriceId: "price_topLevel",
    editions: [
        { _key: "print", name: "Hardcover", format: "physical", price: 39, stripePriceId: "price_catalogPrint" },
        { _key: "pdf", name: "Digital PDF", format: "digital", price: 29, stripePriceId: "price_catalogPdf" },
    ],
};
const item = (overrides: Partial<CheckoutCartItemPayload> = {}): CheckoutCartItemPayload => ({
    productId: product._id, slug: product.slug, editionId: "print", quantity: 1, ...overrides,
});

describe("checkout catalog trust boundary", () => {
    it("uses the catalog edition price and fulfillment despite malicious client hints", () => {
        const resolved = resolveCheckoutItem(product, item({
            editionName: "Digital PDF", format: "digital", stripePriceId: "price_attacker",
            fulfillmentType: "bundle", requiresShipping: false,
        }));
        expect(resolved).toMatchObject({
            editionId: "print", editionName: "Hardcover", format: "physical",
            stripePriceId: "price_catalogPrint", fulfillmentType: "physical", requiresShipping: true,
        });
        expect(getStripePriceId(product, item({ editionName: "Digital PDF" }))).toBe("price_catalogPrint");
    });

    it("does not grant physical fulfillment to a digital purchase", () => {
        expect(resolveCheckoutItem(product, item({
            editionId: "pdf", fulfillmentType: "physical", requiresShipping: true,
        }))).toMatchObject({ stripePriceId: "price_catalogPdf", fulfillmentType: "digital", requiresShipping: false });
    });

    it("ignores translated display hints while preserving the canonical edition", () => {
        expect(resolveCheckoutItem(product, item({ editionId: "pdf", editionName: "PDF Digital", format: "digital" })))
            .toMatchObject({ editionId: "pdf", editionName: "Digital PDF", stripePriceId: "price_catalogPdf" });
    });

    it.each(["forged-digital", "construction-book-digital", "", undefined])("rejects an unknown or ambiguous edition ID %s", (editionId) => {
        expect(resolveCheckoutItem(product, item({ editionId }))).toBeNull();
        expect(getStripePriceId(product, item({ editionId }))).toBeNull();
    });

    it("accepts documented generated name aliases and emits the catalog key", () => {
        expect(resolveCheckoutItem(product, item({ editionId: "construction-book-digital-pdf" })))
            .toMatchObject({ editionId: "pdf", stripePriceId: "price_catalogPdf" });
    });

    it("accepts the current punctuation-normalized generated ID", () => {
        const catalog = { ...product, editions: [{ name: "Digital PDF (Spanish)", format: "digital", price: 29, stripePriceId: "price_spanish" }] };
        expect(resolveCheckoutItem(catalog, item({ editionId: "construction-book-digital-pdf-spanish" })))
            .toMatchObject({ stripePriceId: "price_spanish", fulfillmentType: "digital" });
    });

    it("rejects aliases that collide across catalog editions", () => {
        const catalog = { ...product, editions: [product.editions![0], { ...product.editions![1], _key: "hardcover" }] };
        expect(findMatchingEdition(catalog, item({ editionId: "hardcover" }))).toBeNull();
        expect(resolveCheckoutItem(catalog, item({ editionId: "hardcover" }))).toBeNull();
    });

    it("uses only product-specific mappings for a catalog edition without a valid price", () => {
        const catalog = { ...product, editions: [{ _key: "pdf", name: "Digital PDF", format: "digital", price: 29, stripePriceId: "price_STRATEGY_STRATEGY" }] };
        expect(resolveCheckoutItem(catalog, item({ editionId: "pdf" })))
            .toMatchObject({ stripePriceId: STRIPE_PRICE_MAP[`${product.slug} - digital`], fulfillmentType: "digital" });
        expect(resolveCheckoutItem({ ...catalog, title: "Unmapped book", slug: "unmapped-book" }, item({ editionId: "pdf" }))).toBeNull();
    });

    it.each(["es", "es-MX", "fr"])("never substitutes an English price for a %s edition without its own price", (language) => {
        const edition = { _key: "pdf-localized", name: "Digital PDF", format: "digital", price: 29, language };
        for (const stripePriceId of [undefined, "price_STRATEGY_STRATEGY"]) {
            const catalog = { ...product, editions: [{ ...edition, stripePriceId }] };
            const payload = item({ editionId: edition._key, stripePriceId: "price_attacker" });
            expect(getStripePriceId(catalog, payload)).toBeNull();
            expect(resolveCheckoutItem(catalog, payload)).toBeNull();
            expect(resolveCheckoutItem(catalog, item({ editionId: "construction-book-digital-pdf" }))).toBeNull();
        }
    });

    it("preserves explicit Spanish catalog pricing through safe generated aliases", () => {
        const catalog = { ...product, editions: [{
            name: "Digital PDF (Spanish)", format: "digital", language: "es", price: 29, stripePriceId: "price_spanish",
        }] };
        expect(resolveCheckoutItem(catalog, item({ editionId: "construction-book-digital-pdf-spanish", editionName: "Digital PDF" })))
            .toMatchObject({ stripePriceId: "price_spanish", fulfillmentType: "digital" });
    });

    it.each(["en", "en-US"])("preserves English static mappings for a %s catalog edition", (language) => {
        const catalog = { ...product, editions: [{ _key: "pdf", name: "Digital PDF", format: "digital", language, price: 29 }] };
        expect(getStripePriceId(catalog, item({ editionId: "pdf" }))).toBe(STRIPE_PRICE_MAP[`${product.slug} - digital`]);
    });

    it("preserves the generated top-level default only using server format", () => {
        const catalog = { ...product, editions: [], format: "physical" };
        expect(resolveCheckoutItem(catalog, item({ editionId: "construction-book-default", format: "digital", requiresShipping: false })))
            .toMatchObject({ stripePriceId: "price_topLevel", fulfillmentType: "physical", requiresShipping: true });
        expect(resolveCheckoutItem(catalog, item({ editionId: "made-up-pdf" }))).toBeNull();
        expect(resolveCheckoutItem({ ...catalog, format: undefined }, item({ editionId: "construction-book-default", format: "digital" }))).toBeNull();
        expect(resolveCheckoutItem({ ...catalog, stripePriceId: "price_STRATEGY_STRATEGY" }, item({ editionId: "construction-book-default" })))
            .toMatchObject({ stripePriceId: STRIPE_PRICE_MAP[`${product.slug} - physical`], fulfillmentType: "physical" });
    });

    it("rejects unspecified multi-edition selection and permits a sole server edition", () => {
        expect(resolveCheckoutItem(product, item({ editionId: undefined }))).toBeNull();
        expect(resolveCheckoutItem({ ...product, editions: [product.editions![1]] }, item({ editionId: undefined })))
            .toMatchObject({ editionId: "pdf", stripePriceId: "price_catalogPdf" });
    });

    it("requires a configured server order bump and ignores all client claims", () => {
        const catalog = { ...product, orderBump: { _key: "consultation", name: "Strategy Call", stripePriceId: "price_call" } };
        expect(resolveCheckoutItem(catalog, item({ editionId: "strategy-call", fulfillmentType: "bundle", requiresShipping: true })))
            .toMatchObject({ editionId: "consultation", stripePriceId: "price_call", fulfillmentType: "service", requiresShipping: false });
        expect(resolveCheckoutItem({ ...catalog, orderBump: { stripePriceId: "price_STRATEGY_STRATEGY" } }, item({ editionId: "strategy-call" }))).toBeNull();
        expect(resolveCheckoutItem(product, item({ editionId: "strategy-call" }))).toBeNull();
    });
});

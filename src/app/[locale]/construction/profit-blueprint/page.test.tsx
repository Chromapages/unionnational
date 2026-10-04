import { renderToStaticMarkup } from "react-dom/server";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ fetch: vi.fn(), sales: vi.fn() }));
vi.mock("@/sanity/lib/live", () => ({ sanityFetch: mocks.fetch }));
vi.mock("@/sanity/lib/queries", () => ({ PRODUCT_DETAIL_QUERY: "localized-detail" }));
vi.mock("next-intl/server", () => ({ getTranslations: async () => (key: string) => key }));
vi.mock("@/i18n/navigation", () => ({ Link: ({ href, children }: { href: string; children: ReactNode }) => <a href={href}>{children}</a> }));
vi.mock("@/components/construction/profit-blueprint/ConstructionBookSalesSection", () => ({ ConstructionBookSalesSection: ({ product }: { product: unknown }) => { mocks.sales(product); return <p>Configured offers</p>; } }));
vi.mock("@/components/layout/Footer", () => ({ Footer: () => null }));
vi.mock("@/components/layout/LocaleSwitcher", () => ({ LocaleSwitcher: () => null }));
vi.mock("@/components/ui/RevealOnScroll", () => ({ RevealOnScroll: ({ children }: { children: ReactNode }) => children }));
vi.mock("@/components/shop/CartSidebar", () => ({ CartSidebar: () => null }));
vi.mock("@/components/construction/profit-blueprint/BlueprintFAQ", () => ({ BlueprintFAQ: () => null }));
vi.mock("@/components/construction/profit-blueprint/ExitIntentChecklist", () => ({ ExitIntentChecklist: () => null }));
vi.mock("@/components/construction/profit-blueprint/BlueprintMoreInfoForm", () => ({ BlueprintMoreInfoForm: () => null }));
vi.mock("@/components/construction/profit-blueprint/MobileStickyCta", () => ({ MobileStickyCta: () => null }));
vi.mock("@/components/construction/profit-blueprint/MathSection", () => ({ MathSection: () => null }));
vi.mock("@/components/construction/profit-blueprint/BlueprintServicesAlternative", () => ({ BlueprintServicesAlternative: () => null }));
vi.mock("@/components/construction/profit-blueprint/HeroVideoEmbed", () => ({ default: () => null }));
vi.mock("@/components/construction/profit-blueprint/BlueprintAuthorBio", () => ({ BlueprintAuthorBio: () => null }));
vi.mock("@/components/seo/ServiceViewContent", () => ({ ServiceViewContent: () => null }));

const product = {
    _id: "construction", title: "The Money-Making Blueprint for Construction Companies",
    slug: "the-money-making-blueprint-for-construction-companies", price: 31, format: "digital",
    editions: [{ _key: "digital-es-live", name: "Digital PDF (Spanish)", format: "digital", language: "es", price: 31, stripePriceId: "price_SpanishLive" }],
};
const page = async (locale = "es") => {
    const { default: ProfitBlueprintPage } = await import("./page");
    return renderToStaticMarkup(await ProfitBlueprintPage({ params: Promise.resolve({ locale }) }));
};

describe("construction catalog offers", () => {
    beforeEach(() => { vi.clearAllMocks(); mocks.fetch.mockResolvedValue({ data: null }); });

    it("preserves configured Spanish catalog editions and their prices", async () => {
        mocks.fetch.mockImplementation(async ({ query }: { query: string }) => ({ data: query === "localized-detail" ? product : [product] }));
        await page();
        expect(mocks.sales.mock.calls[0][0].editions).toEqual([expect.objectContaining({ _key: "digital-es-live", language: "es", price: 31, stripePriceId: "price_SpanishLive" })]);
        expect(mocks.sales.mock.calls[0][0].price).toBe(31);
    });

    it("does not invent purchase editions when catalog data is absent", async () => {
        const html = await page();
        expect(mocks.sales).not.toHaveBeenCalled();
        expect(html).toContain("purchaseUnavailable");
        expect(html).not.toContain("$27");
    });

    it("does not offer an unconfigured Spanish edition through the English fallback map", async () => {
        const unconfigured = { ...product, editions: [{ ...product.editions[0], stripePriceId: "price_DIGITAL_ES_PLACEHOLDER" }] };
        mocks.fetch.mockImplementation(async ({ query }: { query: string }) => ({ data: query === "localized-detail" ? unconfigured : [unconfigured] }));
        expect(await page()).toContain("purchaseUnavailable");
        expect(mocks.sales).not.toHaveBeenCalled();
    });

    it("does not imply a Spanish purchase when only English content is configured", async () => {
        const english = { ...product, editions: [{ ...product.editions[0], language: "en" }] };
        mocks.fetch.mockImplementation(async ({ query }: { query: string }) => ({ data: query === "localized-detail" ? english : [english] }));
        expect(await page()).toContain("purchaseUnavailable");
        expect(mocks.sales).not.toHaveBeenCalled();
    });
});

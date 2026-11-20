import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ALL_PRODUCTS_QUERY, HEADER_SETTINGS_QUERY, SHOP_PAGE_QUERY } from "@/sanity/lib/queries";
import ShopPage from "./page";
import ShopLayout from "./layout";
import ShopCartPage from "./cart/page";

const mocks = vi.hoisted(() => ({ catalog: vi.fn(), header: vi.fn(), headerLayout: vi.fn(), cart: vi.fn(), sanityFetch: vi.fn() }));
vi.mock("@/sanity/lib/live", () => ({ sanityFetch: mocks.sanityFetch }));
vi.mock("@/components/layout/HeaderWrapper", () => ({ HeaderWrapper: (props: unknown) => { mocks.header(props); return null; } }));
vi.mock("@/components/layout/HeaderLayout", () => ({ HeaderLayout: (props: unknown) => { mocks.headerLayout(props); return null; } }));
vi.mock("@/components/layout/Footer", () => ({ Footer: () => null, getCachedLegalPages: async () => [] }));
vi.mock("@/components/seo/JsonLd", () => ({ JsonLd: () => null }));
vi.mock("@/components/shop/ShopDesktopExperience", () => ({ ShopDesktopExperience: (props: unknown) => { mocks.catalog(props); return null; } }));
vi.mock("@/components/shop/CartPageClient", () => ({ CartPageClient: (props: unknown) => { mocks.cart(props); return null; } }));
vi.mock("@/components/shop/CartSidebar", () => ({ CartSidebar: () => <aside>Cart sidebar</aside> }));
vi.mock("@/components/ui/CartIcon", () => ({ CartIcon: () => <button type="button">Open cart</button> }));
vi.mock("next-intl/server", () => ({ getLocale: async () => "es", getMessages: async () => ({}), getTranslations: async () => (key: string) => key }));
vi.mock("next/navigation", () => ({ redirect: (href: string) => { throw new Error(`REDIRECT ${href}`); } }));

const buyLink = "https://provider.example.test/payment";
const headerSettings = { companyName: "Union National Tax", ctaButtonTextLocalized: "Buy this book", ctaButtonUrl: buyLink };
const product = {
    _id: "book", slug: "fixture-book", title: "Fixture Book", shortDescription: "Published description", format: "physical", price: 49,
    buyLink, stripeProductId: "prod_fixture", stripePriceId: "price_main",
    editions: [{ name: "Hardcover", format: "physical", price: 49, stripePriceId: "price_edition" }],
};
const params = (locale = "en") => ({ params: Promise.resolve({ locale }) });

beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("SHOP_PAYMENTS_ENABLED", undefined);
    mocks.sanityFetch.mockImplementation(async ({ query }: { query: string }) => ({
        data: query === ALL_PRODUCTS_QUERY ? [product]
            : query === SHOP_PAGE_QUERY ? { featuredProduct: product, recoveryCTA: { buttonUrl: buyLink } }
                : query === HEADER_SETTINGS_QUERY ? headerSettings : null,
    }));
});
afterEach(() => vi.unstubAllEnvs());

describe("booking-only storefront boundaries", () => {
    it("passes catalog data without buy links or processor IDs and removes order FAQs", async () => {
        renderToStaticMarkup(await ShopPage(params("es")));
        expect(mocks.header).toHaveBeenCalledWith({ bookingCta: true });
        const props = mocks.catalog.mock.calls[0][0];
        expect(props).toMatchObject({ paymentsEnabled: false, products: [{ title: product.title }], featuredProduct: { title: product.title } });
        expect(props.faqItems).toHaveLength(3);
        expect(JSON.stringify(props)).not.toMatch(/buyLink|stripePriceId|stripeProductId|provider\.example/);
    });

    it("does not serialize a CMS purchase CTA into the disabled shop header", async () => {
        const { HeaderWrapper } = await vi.importActual<typeof import("@/components/layout/HeaderWrapper")>("@/components/layout/HeaderWrapper");
        renderToStaticMarkup(await HeaderWrapper({ bookingCta: true }));
        const props = mocks.headerLayout.mock.calls[0][0];
        expect(props.siteSettings.companyName).toBe(headerSettings.companyName);
        expect(JSON.stringify(props)).not.toMatch(/provider\.example|Buy this book/);
        renderToStaticMarkup(await HeaderWrapper({ bookingCta: false }));
        expect(mocks.headerLayout).toHaveBeenLastCalledWith(expect.objectContaining({ siteSettings: headerSettings }));
    });

    it.each(["en", "es"])("redirects the %s cart before fetching CMS recovery links", async (locale) => {
        await expect(ShopCartPage(params(locale))).rejects.toThrow(`REDIRECT /${locale}/contact`);
        expect(mocks.sanityFetch).not.toHaveBeenCalled();
        expect(mocks.cart).not.toHaveBeenCalled();
    });

    it("does not mount cart chrome by default", () => {
        const html = renderToStaticMarkup(<ShopLayout>Catalog</ShopLayout>);
        expect(html).toContain("Catalog");
        expect(html).not.toMatch(/Open cart|Cart sidebar/);
    });

    it("retains cart chrome, recovery settings and purchase FAQ with explicit opt-in", async () => {
        vi.stubEnv("SHOP_PAYMENTS_ENABLED", "true");
        const html = renderToStaticMarkup(<ShopLayout>Catalog</ShopLayout>);
        expect(html).toContain("Open cart");
        expect(html).toContain("Cart sidebar");
        renderToStaticMarkup(await ShopCartPage(params()));
        expect(mocks.cart).toHaveBeenCalledWith({ recoveryCta: { buttonUrl: buyLink } });
        renderToStaticMarkup(await ShopPage(params()));
        expect(mocks.header).toHaveBeenLastCalledWith({ bookingCta: false });
        const props = mocks.catalog.mock.calls[0][0];
        expect(props).toMatchObject({ paymentsEnabled: true, products: [{ editions: [{ stripePriceId: "price_edition" }] }] });
        expect(props.faqItems).toHaveLength(5);
    });
});

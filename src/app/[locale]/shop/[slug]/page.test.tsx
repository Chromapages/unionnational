import { beforeEach, describe, expect, it, vi } from "vitest";
import { generateMetadata } from "./page";
import sitemap from "@/app/sitemap";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";

vi.mock("@/sanity/lib/client", () => ({ client: { fetch: vi.fn() } }));
vi.mock("@/sanity/lib/live", () => ({ sanityFetch: vi.fn() }));
vi.mock("@/sanity/lib/image", () => ({ urlFor: vi.fn() }));
vi.mock("next-intl/server", () => ({ getTranslations: async () => (key: string) => key }));
vi.mock("@/components/layout/HeaderWrapper", () => ({ HeaderWrapper: () => null }));
vi.mock("@/components/layout/Footer", () => ({ Footer: () => null }));
vi.mock("@/components/shop/ProductCard", () => ({ ProductCard: () => null }));
vi.mock("@/components/shop/ProductHero", () => ({ ProductHero: () => null }));
vi.mock("@/components/shop/BookOverview", () => ({ BookOverview: () => null }));
vi.mock("@/components/seo/ShopViewContent", () => ({ ShopViewContent: () => null }));
vi.mock("@/i18n/navigation", () => ({ Link: () => null }));

describe("product metadata locale eligibility", () => {
    beforeEach(() => vi.clearAllMocks());

    it.each([
        { locale: "en", shopDescriptions: { en: "Published guide", es: "" } },
        { locale: "es", shopDescriptions: { en: "Coming soon", es: "Guia publicada" } },
        { locale: "en", shopDescriptions: { en: "Published guide", es: "Guia publicada" } },
    ] as const)("uses the same eligible alternates as the sitemap for $locale", async ({ locale, shopDescriptions }) => {
        const slug = "guide";
        vi.mocked(sanityFetch).mockResolvedValue({ data: { title: "Published Guide", shortDescription: shopDescriptions[locale], shopDescriptions } } as never);
        vi.mocked(client.fetch).mockResolvedValue({ products: [{ slug, shopDescriptions }] } as never);

        const metadata = await generateMetadata({ params: Promise.resolve({ locale, slug }) });
        const entries = await sitemap();
        const canonical = `https://unionnationaltax.com/${locale}/shop/${slug}`;
        expect(metadata.alternates?.canonical).toBe(canonical);
        expect(metadata.alternates?.languages).toEqual(entries.find((entry) => entry.url === canonical)?.alternates?.languages);
        expect(metadata.title).toBe("Published Guide");
        expect(sanityFetch).toHaveBeenCalledOnce();
    });

    it("keeps an ineligible requested locale noindexed without advertising alternates", async () => {
        vi.mocked(sanityFetch).mockResolvedValue({ data: { shortDescription: "", shopDescriptions: { en: "Published guide", es: "" } } } as never);

        const metadata = await generateMetadata({ params: Promise.resolve({ locale: "es", slug: "guide" }) });
        expect(metadata.robots).toEqual({ index: false, follow: false });
        expect(metadata.alternates).toBeUndefined();
    });
});

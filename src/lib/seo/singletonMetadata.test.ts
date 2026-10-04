import { beforeEach, describe, expect, it, vi } from "vitest";
import { generateMetadata as homeMetadata } from "@/app/[locale]/page";
import { generateMetadata as aboutMetadata } from "@/app/[locale]/about/page";
import { generateMetadata as resourcesMetadata } from "@/app/[locale]/resources/page";
import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_PAGE_QUERY, HOME_PAGE_QUERY, RESOURCES_PAGE_QUERY } from "@/sanity/lib/queries";

vi.mock("@/sanity/lib/live", () => ({ sanityFetch: vi.fn() }));
vi.mock("next-intl/server", () => ({ getTranslations: async () => (key: string) => key }));
vi.mock("@/components/layout/HeaderWrapper", () => ({ HeaderWrapper: () => null }));
vi.mock("@/components/layout/Footer", () => ({ Footer: () => null }));
vi.mock("@/components/home/ConsumerHome", () => ({ ConsumerHome: () => null }));
vi.mock("@/components/seo/JsonLd", () => ({ JsonLd: () => null }));
vi.mock("@/components/ui/ErrorBoundary", () => ({ default: () => null }));
vi.mock("@/components/about/AboutDesktopExperience", () => ({ AboutDesktopExperience: () => null }));
vi.mock("@/components/resources/ResourcesDesktopExperience", () => ({ ResourcesDesktopExperience: () => null }));

const pages = [
    { path: "", generateMetadata: homeMetadata, query: HOME_PAGE_QUERY, title: "title" },
    { path: "/about", generateMetadata: aboutMetadata, query: ABOUT_PAGE_QUERY, title: "title" },
    { path: "/resources", generateMetadata: resourcesMetadata, query: RESOURCES_PAGE_QUERY, title: "Resources Hub | Union National Tax" },
];

describe.each(pages)("singleton indexing at $path", ({ path, generateMetadata, query, title }) => {
    beforeEach(() => vi.mocked(sanityFetch).mockReset());

    it("honors CMS noindex without replacing the approved title or canonical", async () => {
        vi.mocked(sanityFetch).mockResolvedValue({ data: { seo: { noIndex: true, metaTitle: "Unapproved CMS title" } } } as never);

        const metadata = await generateMetadata({ params: Promise.resolve({ locale: "es" }) });
        expect(metadata.robots).toEqual({ index: false, follow: false });
        expect(metadata.title).toBe(title);
        expect(metadata.alternates?.canonical).toBe(`https://unionnationaltax.com/es${path}`);
        expect(sanityFetch).toHaveBeenCalledWith({ query, params: { locale: "es" } });
    });

    it("retains inherited indexing for an explicitly indexable record", async () => {
        vi.mocked(sanityFetch).mockResolvedValue({ data: { seo: { noIndex: false } } } as never);

        const metadata = await generateMetadata({ params: Promise.resolve({ locale: "en" }) });
        expect(metadata.robots).toBeUndefined();
    });

    it("retains current metadata when optional CMS content is missing or unavailable", async () => {
        vi.mocked(sanityFetch).mockRejectedValue(new Error("CMS unavailable"));
        const unavailable = await generateMetadata({ params: Promise.resolve({ locale: "en" }) });
        expect(unavailable.title).toBe(title);
        expect(unavailable.robots).toBeUndefined();

        vi.mocked(sanityFetch).mockResolvedValue({ data: null } as never);
        const missing = await generateMetadata({ params: Promise.resolve({ locale: "en" }) });
        expect(missing.title).toBe(title);
        expect(missing.robots).toBeUndefined();
    });
});

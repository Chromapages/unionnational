import { beforeEach, describe, expect, it, vi } from "vitest";
import { createTranslator } from "next-intl";
import type { Metadata } from "next";
import type * as NextMetadataResolver from "next/dist/lib/metadata/resolve-metadata";
import { createRequire, Module } from "node:module";
import { generateMetadata as homeMetadata } from "@/app/[locale]/page";
import { generateMetadata as aboutMetadata } from "@/app/[locale]/about/page";
import { generateMetadata as resourcesMetadata } from "@/app/[locale]/resources/page";
import { sanityFetch } from "@/sanity/lib/live";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

// Match Next server compilation while using its installed metadata resolver.
const nativeRequire = createRequire(import.meta.url);
const markerPath = nativeRequire.resolve("server-only");
const previousMarker = nativeRequire.cache[markerPath];
const marker = new Module(markerPath);
marker.exports = {};
nativeRequire.cache[markerPath] = marker;
let accumulateMetadata: typeof NextMetadataResolver.accumulateMetadata;
try {
    ({ accumulateMetadata } = nativeRequire("next/dist/lib/metadata/resolve-metadata"));
} finally {
    if (previousMarker) nativeRequire.cache[markerPath] = previousMarker;
    else delete nativeRequire.cache[markerPath];
}

type Locale = "en" | "es";
const catalogs = { en, es };
vi.mock("@/sanity/lib/live", () => ({ sanityFetch: vi.fn() }));
vi.mock("next-intl/server", () => ({
    getTranslations: async ({ locale, namespace }: { locale: Locale; namespace: "ConsumerHome.seo" | "AboutPage.metadata" }) =>
        createTranslator({ locale, messages: catalogs[locale], namespace }),
}));
vi.mock("@/components/layout/HeaderWrapper", () => ({ HeaderWrapper: () => null }));
vi.mock("@/components/layout/Footer", () => ({ Footer: () => null }));
vi.mock("@/components/home/ConsumerHome", () => ({ ConsumerHome: () => null }));
vi.mock("@/components/seo/JsonLd", () => ({ JsonLd: () => null }));
vi.mock("@/components/ui/ErrorBoundary", () => ({ default: () => null }));
vi.mock("@/components/about/AboutDesktopExperience", () => ({ AboutDesktopExperience: () => null }));
vi.mock("@/components/resources/ResourcesDesktopExperience", () => ({ ResourcesDesktopExperience: () => null }));

const pages = [
    { path: "", generateMetadata: homeMetadata, approvedTitle: (locale: Locale) => catalogs[locale].ConsumerHome.seo.title },
    { path: "/about", generateMetadata: aboutMetadata, approvedTitle: (locale: Locale) => catalogs[locale].AboutPage.metadata.title },
    { path: "/resources", generateMetadata: resourcesMetadata, approvedTitle: () => "Resources Hub | Union National Tax" },
];

describe.each(pages)("singleton indexing at $path", ({ path, generateMetadata, approvedTitle }) => {
    beforeEach(() => {
        vi.mocked(sanityFetch).mockReset();
    });

    async function resolvePage(locale: Locale, parentIndex: boolean) {
        const parent: Metadata = {
            metadataBase: new URL("https://unionnationaltax.com"),
            robots: { index: parentIndex, follow: parentIndex, googleBot: { index: parentIndex, follow: parentIndex, "max-image-preview": "none" } },
        };
        const metadata = await generateMetadata({ params: Promise.resolve({ locale }) });
        return accumulateMetadata(`/[locale]${path}`, [[parent, null], [metadata, null]], Promise.resolve(`/${locale}${path}`), { trailingSlash: false, isStaticMetadataRouteFile: false });
    }

    it.each(["en", "es"] as const)("keeps approved %s source and canonical while honoring CMS noindex", async locale => {
        vi.mocked(sanityFetch).mockResolvedValue({ data: { seo: { noIndex: true, metaTitle: "Unapproved CMS title" } } } as never);

        const resolved = await resolvePage(locale, true);
        expect(resolved.robots?.basic).toBe("noindex, nofollow");
        expect(resolved.title?.absolute).toBe(approvedTitle(locale));
        expect(resolved.alternates?.canonical?.url.toString()).toBe(`https://unionnationaltax.com/${locale}${path}`);
    });

    it("preserves restrictive and indexable parent controls when the record has no restriction", async () => {
        vi.mocked(sanityFetch).mockResolvedValue({ data: { seo: { noIndex: false } } } as never);

        const restrictive = await resolvePage("en", false);
        expect(restrictive.robots?.basic).toBe("noindex, nofollow");
        expect(restrictive.robots?.googleBot).toContain("noindex, nofollow");
        expect(restrictive.robots?.googleBot).toContain("max-image-preview:none");
        const indexable = await resolvePage("en", true);
        expect(indexable.robots?.basic).toBe("index, follow");
        expect(indexable.robots?.googleBot).toContain("index, follow");
        expect(indexable.robots?.googleBot).toContain("max-image-preview:none");
    });

    it.each(["missing", "unavailable"] as const)("retains approved metadata and parent restrictions when CMS is %s", async state => {
        if (state === "unavailable") vi.mocked(sanityFetch).mockRejectedValue(new Error("CMS unavailable"));
        else vi.mocked(sanityFetch).mockResolvedValue({ data: null } as never);

        const resolved = await resolvePage("es", false);
        expect(resolved.title?.absolute).toBe(approvedTitle("es"));
        expect(resolved.alternates?.canonical?.url.toString()).toBe(`https://unionnationaltax.com/es${path}`);
        expect(resolved.robots?.basic).toBe("noindex, nofollow");
        expect(resolved.robots?.googleBot).toContain("noindex, nofollow");
        expect(resolved.robots?.googleBot).toContain("max-image-preview:none");
    });
});

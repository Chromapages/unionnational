import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import ServicesPage, { generateMetadata } from "./page";

const fetchMock = vi.hoisted(() => vi.fn());
const previewMock = vi.hoisted(() => vi.fn(() => false));
vi.mock("@/sanity/lib/live", () => ({ sanityFetch: fetchMock }));
vi.mock("@/sanity/lib/queries", () => ({ SERVICES_QUERY: "services" }));
vi.mock("@/lib/pricing/data", () => ({
    isPricingDraftPreview: previewMock,
    getPricingContent: async () => ({ page: null, tiers: [], preview: false }),
    applyPreviewServiceOffers: (services: unknown[]) => services,
}));
vi.mock("@/components/pricing/PricingDraftNotice", () => ({ PricingDraftNotice: () => null }));
vi.mock("next-intl/server", () => ({ getTranslations: () => Promise.resolve(Object.assign(() => "", { raw: () => [] })) }));
vi.mock("@/components/layout/HeaderWrapper", () => ({ HeaderWrapper: () => null }));
vi.mock("@/components/layout/Footer", () => ({ Footer: () => null }));
vi.mock("@/components/services/ServicesDesktopExperience", () => ({ ServicesDesktopExperience: () => null }));

describe("services catalog JSON-LD", () => {
    it("marks the local fixture preview as noindex without changing canonical paths", async () => {
        previewMock.mockReturnValue(true);
        const metadata = await generateMetadata({ params: Promise.resolve({ locale: "es" }) });
        expect(metadata.robots).toEqual({ index: false, follow: false });
        expect(metadata.alternates?.canonical).toContain("/es/services");
        previewMock.mockReturnValue(false);
    });
    it("keeps hostile published service text inside one parseable script", async () => {
        const title = '</script><script>alert("service")</script>';
        const shortDescription = '</script><img src=x onerror="alert(1)">';
        fetchMock.mockImplementation(({ query }: { query: string }) => Promise.resolve({
            data: query === "services" ? [{ title, shortDescription }] : [],
        }));
        const html = renderToStaticMarkup(await ServicesPage({ params: Promise.resolve({ locale: "en" }) }));
        const content = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];

        expect(html.match(/<\/script>/g)).toHaveLength(1);
        expect(content).toBeDefined();
        expect(JSON.parse(content!)).toMatchObject({
            hasOfferCatalog: { itemListElement: [{ itemOffered: { name: title, description: shortDescription } }] },
        });
    });
});

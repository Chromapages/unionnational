import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import ServicesPage from "./page";

const fetchMock = vi.hoisted(() => vi.fn());
vi.mock("@/sanity/lib/live", () => ({ sanityFetch: fetchMock }));
vi.mock("@/sanity/lib/queries", () => ({ SERVICES_QUERY: "services", PRICING_TIERS_QUERY: "pricing" }));
vi.mock("next-intl/server", () => ({ getTranslations: () => Promise.resolve(Object.assign(() => "", { raw: () => [] })) }));
vi.mock("@/components/layout/HeaderWrapper", () => ({ HeaderWrapper: () => null }));
vi.mock("@/components/layout/Footer", () => ({ Footer: () => null }));
vi.mock("@/components/services/ServicesDesktopExperience", () => ({ ServicesDesktopExperience: () => null }));

describe("services catalog JSON-LD", () => {
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

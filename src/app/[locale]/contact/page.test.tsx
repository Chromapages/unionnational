import { beforeEach, describe, expect, it, vi } from "vitest";
import { generateMetadata } from "./page";

const fetchMock = vi.hoisted(() => vi.fn());
vi.mock("@/sanity/lib/live", () => ({ sanityFetch: fetchMock }));
vi.mock("@/sanity/lib/queries", () => ({ CONTACT_SETTINGS_QUERY: "contact", FAQ_QUERY: "faq", SITE_SETTINGS_QUERY: "settings", TESTIMONIALS_QUERY: "testimonials" }));
vi.mock("@/sanity/lib/image", () => ({ urlFor: () => ({ width: () => ({ height: () => ({ url: () => "https://example.com/contact.jpg" }) }) }) }));
vi.mock("next-intl/server", () => ({ getTranslations: () => Promise.resolve((key: string) => key) }));
vi.mock("@/components/layout/HeaderWrapper", () => ({ HeaderWrapper: () => null }));
vi.mock("@/components/layout/Footer", () => ({ Footer: () => null }));
vi.mock("@/components/contact/ContactHero", () => ({ ContactHero: () => null }));
vi.mock("@/components/contact/AlternativeCTA", () => ({ AlternativeCTA: () => null }));
vi.mock("@/components/contact/MobileContactBar", () => ({ MobileContactBar: () => null }));
vi.mock("@/components/home/FAQSection", () => ({ FAQSection: () => null }));
vi.mock("@/components/seo/JsonLd", () => ({ JsonLd: () => null }));

describe("contact metadata indexing", () => {
    beforeEach(() => fetchMock.mockReset());

    it("honors CMS noindex while keeping the localized canonical and title", async () => {
        fetchMock.mockResolvedValue({ data: { seo: { metaTitle: "Contact the team", noIndex: true } } });

        const metadata = await generateMetadata({ params: Promise.resolve({ locale: "es" }) });
        expect(metadata.robots).toEqual({ index: false, follow: false });
        expect(metadata.title).toBe("Contact the team");
        expect(metadata.alternates?.canonical).toBe("https://unionnationaltax.com/es/contact");
    });

    it.each([false, undefined])("preserves inherited indexing when noindex is %s", async (noIndex) => {
        fetchMock.mockResolvedValue({ data: { seo: { noIndex } } });

        const metadata = await generateMetadata({ params: Promise.resolve({ locale: "en" }) });
        expect(metadata.robots).toBeUndefined();
    });
});

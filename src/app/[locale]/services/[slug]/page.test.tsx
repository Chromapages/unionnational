import { beforeEach, describe, expect, it, vi } from "vitest";
import ServicePage, { generateMetadata } from "./page";

const redirectMock = vi.hoisted(() => vi.fn(() => { throw new Error("NEXT_REDIRECT"); }));
const metadataMock = vi.hoisted(() => vi.fn(() => Promise.resolve({ title: "Service metadata" })));
vi.mock("next/navigation", () => ({ permanentRedirect: redirectMock }));
vi.mock("@/components/services/CmsServicePage", () => ({ CmsServicePage: () => null, getCmsServiceMetadata: metadataMock }));
vi.mock("@/sanity/lib/queries", () => ({ SERVICE_PAGE_SLUGS_QUERY: "slugs" }));
vi.mock("@/sanity/lib/client", () => ({ client: { fetch: vi.fn() } }));

describe("canonical service redirects", () => {
    beforeEach(() => vi.clearAllMocks());

    it.each([
        ["en", "tax-filing-and-preparation-services", "/en/tax-preparation-and-filing"],
        ["es", "tax-filing-preparation", "/es/tax-preparation-and-filing"],
        ["en", "s-corp-tax-advantage-program", "/en/s-corp-tax-advantage"],
        ["es", "tax-planning-consulting", "/es/tax-planning"],
    ])("permanently redirects %s/%s to its final canonical URL", async (locale, slug, destination) => {
        await expect(ServicePage({ params: Promise.resolve({ locale, slug }) })).rejects.toThrow("NEXT_REDIRECT");
        expect(redirectMock).toHaveBeenCalledWith(destination);
    });

    it("preserves custom service rendering and metadata", async () => {
        const props = { params: Promise.resolve({ locale: "es", slug: "custom-advisory" }) };
        const page = await ServicePage(props);
        expect(page.props).toMatchObject({ cmsSlug: "custom-advisory", locale: "es", canonicalPath: "/services/custom-advisory" });
        expect(redirectMock).not.toHaveBeenCalled();
        await generateMetadata(props);
        expect(metadataMock).toHaveBeenCalledWith({ cmsSlug: "custom-advisory", locale: "es", canonicalPath: "/services/custom-advisory" });
    });
});

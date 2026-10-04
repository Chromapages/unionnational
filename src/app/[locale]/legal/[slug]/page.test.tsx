import { beforeEach, describe, expect, it, vi } from "vitest";
import LegalPage, { generateMetadata } from "./page";

const fetchMock = vi.hoisted(() => vi.fn());
const notFoundMock = vi.hoisted(() => vi.fn(() => { throw new Error("NEXT_NOT_FOUND"); }));
vi.mock("@/sanity/lib/live", () => ({ sanityFetch: fetchMock }));
vi.mock("@/sanity/lib/queries", () => ({ LEGAL_PAGE_QUERY: "legal" }));
vi.mock("@/sanity/lib/client", () => ({ client: { fetch: vi.fn() } }));
vi.mock("next/navigation", () => ({ notFound: notFoundMock }));
vi.mock("@/components/layout/HeaderWrapper", () => ({ HeaderWrapper: () => null }));
vi.mock("@/components/layout/Footer", () => ({ Footer: () => null }));
vi.mock("@/components/ui/RevealOnScroll", () => ({ RevealOnScroll: () => null }));
vi.mock("@/components/legal/LegalContentClient", () => ({ LegalContentClient: () => null }));

const props = (slug: string) => ({ params: Promise.resolve({ locale: "en", slug }) });

describe("legal CMS availability", () => {
    beforeEach(() => vi.clearAllMocks());

    it("propagates a temporary CMS error through both metadata and page rendering", async () => {
        const error = new Error("CMS temporarily unavailable");
        fetchMock.mockRejectedValue(error);

        await expect(generateMetadata(props("terms-of-service"))).rejects.toBe(error);
        await expect(LegalPage(props("terms-of-service"))).rejects.toBe(error);
        expect(notFoundMock).not.toHaveBeenCalled();
    });

    it("returns not-found only after a successful empty content lookup", async () => {
        fetchMock.mockResolvedValue({ data: null });

        await expect(LegalPage(props("missing"))).rejects.toThrow("NEXT_NOT_FOUND");
        expect(notFoundMock).toHaveBeenCalledOnce();
    });

    it.each(["missing", "outage"])("retains the privacy policy fallback during a CMS %s", async (condition) => {
        if (condition === "outage") fetchMock.mockRejectedValue(new Error("CMS unavailable"));
        else fetchMock.mockResolvedValue({ data: null });

        const metadata = await generateMetadata(props("privacy-policy"));
        expect(metadata.title).toBe("Privacy Policy | Union National Tax");
        expect(metadata.alternates?.canonical).toBe("https://unionnationaltax.com/en/legal/privacy-policy");
        expect(await LegalPage(props("privacy-policy"))).toBeTruthy();
        expect(notFoundMock).not.toHaveBeenCalled();
    });

    it("preserves published legal metadata and indexing controls", async () => {
        fetchMock.mockResolvedValue({ data: { title: "Terms", body: [], seo: { noIndex: true } } });

        const metadata = await generateMetadata(props("terms-of-service"));
        expect(metadata.title).toBe("Terms | Union National Tax");
        expect(metadata.robots).toEqual({ index: false, follow: false });
    });
});

import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { fetchWithLocale } from "@/sanity/lib/client";
import { Footer } from "./Footer";

vi.mock("next/cache", () => ({ unstable_cache: (callback: () => unknown) => callback }));
vi.mock("next-intl/server", () => ({
    getLocale: async () => "es",
    getTranslations: async () => (key: string) => key,
}));
vi.mock("@/sanity/lib/client", () => ({ fetchWithLocale: vi.fn() }));
vi.mock("@/i18n/navigation", () => ({
    Link: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}));
vi.mock("next/image", () => ({ default: () => null }));
vi.mock("@/components/layout/FooterAnalytics", () => ({ FooterAnalytics: () => null }));
vi.mock("@/components/layout/FooterDisclaimerModal", () => ({ FooterDisclaimerModal: () => null }));

describe("Footer CMS recovery", () => {
    it("keeps navigation visible when site settings reject", async () => {
        vi.mocked(fetchWithLocale).mockRejectedValue(new Error("CMS unavailable"));
        const html = renderToStaticMarkup(await Footer());
        expect(html).toContain("/legal/privacy-policy");
        expect(html).toContain("/services");
    });

    it("keeps navigation visible with null settings", async () => {
        vi.mocked(fetchWithLocale).mockResolvedValue(null);
        const html = renderToStaticMarkup(await Footer());
        expect(html).toContain("Union National Tax");
    });

    it("uses the published Terms slug when one is available", async () => {
        vi.mocked(fetchWithLocale).mockImplementation(async (query) =>
            query.includes('legalPage') ? [{ pageType: "terms", slug: "approved-terms" }] : null,
        );
        const html = renderToStaticMarkup(await Footer());
        expect(html).toContain('/legal/approved-terms');
        expect(html).not.toContain('/legal/terms-of-service');
    });
    it("keeps published legal destinations and contact while removing the directory in compact mode", async () => {
        vi.mocked(fetchWithLocale).mockImplementation(async query => query.includes('legalPage') ? [{ pageType: "terms", slug: "approved-terms" }] : null);
        const html = renderToStaticMarkup(await Footer({ compact: true }));
        expect(html).toContain('/legal/disclaimer');
        expect(html).toContain('/legal/privacy-policy');
        expect(html).toContain('/legal/approved-terms');
        expect(html).toContain('/contact');
        expect(html).not.toContain('/services');
        expect(html).not.toContain('/shop');
    });
});

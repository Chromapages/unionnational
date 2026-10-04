import { describe, expect, it, vi } from "vitest";
import { client } from "@/sanity/lib/client";
import sitemap, { revalidate } from "./sitemap";

vi.mock("@/sanity/lib/client", () => ({ client: { fetch: vi.fn() } }));

describe("sitemap", () => {
    it("includes public route families for both locales and omits noindex records", async () => {
        vi.mocked(client.fetch).mockResolvedValue({
            services: [{ slug: "custom-advisory", _updatedAt: "2026-09-30T00:00:00Z" }],
            posts: [{ slug: "tax-update", _updatedAt: "2026-09-30T00:00:00Z" }],
            products: [
                { slug: "guide", shopDescriptions: { en: "A published guide", es: "Una guia publicada" }, _updatedAt: "2026-09-30T00:00:00Z" },
                { slug: "private-guide", noIndex: true, _updatedAt: "2026-09-30T00:00:00Z" },
            ],
            legals: [{ slug: "privacy-policy", _updatedAt: "2026-09-30T00:00:00Z" }],
            industries: [{ slug: "contractors", _updatedAt: "2026-09-30T00:00:00Z" }],
            playbooks: [{ slug: "field-guide", _updatedAt: "2026-09-30T00:00:00Z" }],
        } as never);

        const result = await sitemap();
        const urls = result.map((entry) => entry.url);
        for (const path of ["/", "/services", "/blog/tax-update", "/services/custom-advisory", "/shop/guide", "/books/guide", "/legal/privacy-policy", "/hub/industries/contractors", "/hub/playbooks/field-guide"]) {
            for (const locale of ["en", "es"]) {
                expect(urls).toContain(`https://unionnationaltax.com/${locale}${path === "/" ? "" : path}`);
            }
        }
        expect(urls.some((url) => url.includes("private-guide"))).toBe(false);
        expect(urls.some((url) => url.includes("/shop/cart") || url.includes("/shop/success"))).toBe(false);
        expect(urls.length).toBe(new Set(urls).size);
        expect(vi.mocked(client.fetch).mock.calls[0]?.[0]).toContain('_type == "servicePage"');
        expect(vi.mocked(client.fetch).mock.calls[0]?.[0]).toContain('_type == "blogPost"');
    });

    it("propagates temporary CMS failures instead of publishing a reduced sitemap", async () => {
        vi.mocked(client.fetch).mockRejectedValue(new Error("CMS unavailable"));
        await expect(sitemap()).rejects.toThrow("CMS unavailable");
        expect(revalidate).toBeGreaterThan(0);
        expect(revalidate).toBeLessThanOrEqual(3600);
    });

    it("includes attached public chapters and privacy fallback but excludes gated and missing chapters", async () => {
        vi.mocked(client.fetch).mockResolvedValue({
            playbooks: [
                { slug: "field-guide", chapters: [
                    { slug: "deductions", _updatedAt: "2026-09-29T00:00:00Z" },
                    { slug: "private", isGated: true }, null, { slug: "" },
                ] },
                { slug: "s-corp-playbook", chapters: [{ slug: "compensation" }] },
            ],
        } as never);
        const result = await sitemap();
        const urls = result.map((entry) => entry.url);

        for (const locale of ["en", "es"]) {
            expect(urls).toContain(`https://unionnationaltax.com/${locale}/hub/playbooks/field-guide/deductions`);
            expect(urls).toContain(`https://unionnationaltax.com/${locale}/hub/s-corp-playbook/compensation`);
            expect(urls).toContain(`https://unionnationaltax.com/${locale}/legal/privacy-policy`);
        }
        expect(urls.some((url) => url.includes("/private"))).toBe(false);
        expect(result.find((entry) => entry.url.endsWith("/field-guide/deductions"))?.lastModified).toEqual(new Date("2026-09-29T00:00:00Z"));
    });

    it("advertises only shop locales with a published description while retaining book landing pages", async () => {
        vi.mocked(client.fetch).mockResolvedValue({ products: [
            { slug: "placeholder", shopDescriptions: { en: "Description coming soon", es: "Coming soon" } },
            { slug: "partial", shopDescriptions: { en: "Published guide", es: "" } },
        ] } as never);
        const result = await sitemap();
        const urls = result.map((entry) => entry.url);

        expect(urls).not.toContain("https://unionnationaltax.com/en/shop/placeholder");
        expect(urls).not.toContain("https://unionnationaltax.com/es/shop/partial");
        expect(urls).toContain("https://unionnationaltax.com/en/shop/partial");
        expect(urls).toContain("https://unionnationaltax.com/en/books/placeholder");
        expect(result.find((entry) => entry.url.endsWith("/en/shop/partial"))?.alternates?.languages).toEqual({ en: "https://unionnationaltax.com/en/shop/partial" });
    });

    it("does not revive an explicitly noindexed privacy policy through the fallback", async () => {
        vi.mocked(client.fetch).mockResolvedValue({
            legals: [{ slug: "privacy-policy", noIndex: true }],
        } as never);

        const urls = (await sitemap()).map((entry) => entry.url);
        expect(urls.some((url) => url.endsWith("/legal/privacy-policy"))).toBe(false);
    });

    it("omits noindexed singleton and canonical CMS service paths in both locales", async () => {
        vi.mocked(client.fetch).mockResolvedValue({
            singletons: [
                { path: "", noIndex: true },
                { path: "/about", noIndex: true },
                { path: "/resources", noIndex: true },
                { path: "/contact", noIndex: true },
            ],
            services: [
                { slug: "tax-planning", noIndex: true },
                { slug: "fractional-cfo", noIndex: false },
                { slug: "custom-advisory", noIndex: true },
                { slug: "tax-planning-consulting", noIndex: true },
            ],
        } as never);
        const urls = (await sitemap()).map((entry) => entry.url);

        for (const locale of ["en", "es"]) {
            for (const path of ["", "/about", "/resources", "/contact", "/tax-planning", "/services/custom-advisory"]) {
                expect(urls).not.toContain(`https://unionnationaltax.com/${locale}${path}`);
            }
            expect(urls).toContain(`https://unionnationaltax.com/${locale}/fractional-cfo`);
            expect(urls).toContain(`https://unionnationaltax.com/${locale}/services`);
        }
    });

    it("does not infer noindex from absent singleton records or a noindexed service alias", async () => {
        vi.mocked(client.fetch).mockResolvedValue({
            singletons: [{ path: "/about", noIndex: false }, { path: "/resources", noIndex: null }],
            services: [{ slug: "tax-filing-preparation", noIndex: true }],
        } as never);
        const urls = (await sitemap()).map((entry) => entry.url);

        expect(urls).toContain("https://unionnationaltax.com/en");
        expect(urls).toContain("https://unionnationaltax.com/es/about");
        expect(urls).toContain("https://unionnationaltax.com/en/resources");
        expect(urls).toContain("https://unionnationaltax.com/en/tax-preparation-and-filing");
    });

    it("advertises no URLs when the global site settings flag explicitly disables indexing", async () => {
        vi.mocked(client.fetch).mockResolvedValue({
            globalNoIndex: true,
            posts: [{ slug: "published-post" }],
            products: [{ slug: "published-book", shopDescriptions: { en: "Published guide" } }],
        } as never);

        expect(await sitemap()).toEqual([]);
    });

    it.each([false, undefined, null])("does not infer a global noindex flag from %s", async (globalNoIndex) => {
        vi.mocked(client.fetch).mockResolvedValue({ globalNoIndex } as never);

        const urls = (await sitemap()).map((entry) => entry.url);
        expect(urls).toContain("https://unionnationaltax.com/en");
        expect(urls).toContain("https://unionnationaltax.com/es");
    });

    it("excludes the noindexed shop index without changing independently eligible product routes", async () => {
        vi.mocked(client.fetch).mockResolvedValue({
            singletons: [{ path: "/shop", noIndex: true }],
            products: [{ slug: "guide", shopDescriptions: { en: "Published guide", es: "Guia publicada" } }],
        } as never);
        const urls = (await sitemap()).map((entry) => entry.url);

        for (const locale of ["en", "es"]) {
            expect(urls).not.toContain(`https://unionnationaltax.com/${locale}/shop`);
            expect(urls).toContain(`https://unionnationaltax.com/${locale}/shop/guide`);
            expect(urls).toContain(`https://unionnationaltax.com/${locale}/books/guide`);
        }
    });

    it("keeps valid nongated chapters discoverable when only the parent landing page is noindexed", async () => {
        vi.mocked(client.fetch).mockResolvedValue({
            playbooks: [
                { slug: "field-guide", noIndex: true, chapters: [{ slug: "public-chapter" }, { slug: "gated-chapter", isGated: true }] },
                { slug: "s-corp-playbook", noIndex: true, chapters: [{ slug: "compensation" }] },
            ],
        } as never);
        const urls = (await sitemap()).map((entry) => entry.url);

        for (const locale of ["en", "es"]) {
            expect(urls).not.toContain(`https://unionnationaltax.com/${locale}/hub/playbooks/field-guide`);
            expect(urls).not.toContain(`https://unionnationaltax.com/${locale}/hub/s-corp-playbook`);
            expect(urls).toContain(`https://unionnationaltax.com/${locale}/hub/playbooks/field-guide/public-chapter`);
            expect(urls).toContain(`https://unionnationaltax.com/${locale}/hub/s-corp-playbook/compensation`);
        }
        expect(urls.some((url) => url.endsWith("/gated-chapter"))).toBe(false);
    });
});

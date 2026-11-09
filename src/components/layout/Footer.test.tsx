import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createTranslator } from "next-intl";
import en from "@/messages/en.json";
import es from "@/messages/es.json";
import { fetchWithLocale } from "@/sanity/lib/client";
import { Footer } from "./Footer";

const fixture = vi.hoisted(() => ({ locale: "en" as "en" | "es" }));
vi.mock("next/cache", () => ({ unstable_cache: (callback: () => unknown) => callback }));
vi.mock("next-intl/server", () => ({
    getLocale: async () => fixture.locale,
    getTranslations: async ({ namespace }: { namespace: "Footer" | "Header" }) =>
        createTranslator({ locale: fixture.locale, messages: fixture.locale === "es" ? es : en, namespace }),
}));
vi.mock("@/sanity/lib/client", () => ({ fetchWithLocale: vi.fn() }));
vi.mock("@/i18n/navigation", () => ({
    Link: ({ children, href, ...props }: React.ComponentPropsWithoutRef<"a"> & { href: string }) => <a {...props} href={`/${fixture.locale}${href}`}>{children}</a>,
}));
vi.mock("@/components/layout/FooterAnalytics", () => ({ FooterAnalytics: () => null }));

beforeEach(() => {
    fixture.locale = "en";
    vi.mocked(fetchWithLocale).mockReset();
});
afterEach(cleanup);
describe("Footer CMS recovery", () => {
    it("keeps navigation visible when site settings reject", async () => {
        vi.mocked(fetchWithLocale).mockRejectedValue(new Error("CMS unavailable"));
        const html = renderToStaticMarkup(await Footer());
        expect(html).toContain("/legal/privacy-policy");
        expect(html).toContain("/services");
    });

    it("keeps contact and legal navigation with null settings", async () => {
        vi.mocked(fetchWithLocale).mockResolvedValue(null);
        const html = renderToStaticMarkup(await Footer());
        expect(html).toContain("/contact");
        expect(html).toContain("/legal/privacy-policy");
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

    it.each([
        { name: "non-array collection", legal: { error: "invalid" } },
        { name: "null record before a valid destination", legal: [null, { pageType: "terms", slug: "approved-terms" }] },
        { name: "malformed slug before a valid destination", legal: [{ pageType: "terms", slug: { current: "invalid" } }, { pageType: "terms", slug: "approved-terms" }] },
    ])("recovers from a fulfilled $name without losing valid legal links", async ({ legal }) => {
        vi.mocked(fetchWithLocale).mockImplementation(async query => query.includes("legalPage") ? legal : null);
        const { container } = render(await Footer());
        expect(container.querySelector('a[href="/en/legal/privacy-policy"]')).not.toBeNull();
        expect(container.querySelector('a[href="/en/contact"]')).not.toBeNull();
        expect(container.querySelector('a[href="/en/legal/[object Object]"]')).toBeNull();
        if (Array.isArray(legal)) expect(container.querySelector('a[href="/en/legal/approved-terms"]')).not.toBeNull();
    });

    it.each([
        { name: "copyright", settings: { copyrightText: { text: "invalid" } } },
        { name: "company name", settings: { companyName: { text: "invalid" } } },
    ])("keeps the footer usable with a malformed $name", async ({ settings }) => {
        vi.mocked(fetchWithLocale).mockImplementation(async query => query.includes("legalPage") ? [] : settings);
        const { container } = render(await Footer());
        expect(container.querySelector('a[href="/en/contact"]')).not.toBeNull();
        expect(screen.getByRole("button", { name: "Privacy preferences" })).toBeInTheDocument();
        expect(container.textContent).not.toContain("[object Object]");
    });

    it("opens the existing disclaimer fallback when the CMS summary is malformed", async () => {
        vi.mocked(fetchWithLocale).mockImplementation(async query => query.includes("legalPage") ? [] : { footerDisclaimerSummary: { text: "invalid" } });
        render(await Footer());
        fireEvent.click(screen.getByRole("button", { name: en.Footer.readDisclaimer }));
        expect(screen.getByText(en.Footer.disclaimerBody)).toBeInTheDocument();
    });

    it.each(["en", "es"] as const)("preserves %s contact, booking, compact legal and privacy access", async locale => {
        fixture.locale = locale;
        vi.mocked(fetchWithLocale).mockImplementation(async query => query.includes("legalPage") ? [{ pageType: "terms", slug: "approved-terms" }] : null);
        for (const props of [{}, { bookingCta: true }, { compact: true }]) {
            const { container, unmount } = render(await Footer(props));
            const destination = "bookingCta" in props ? "book" : "contact";
            expect(container.querySelector(`a[href="/${locale}/${destination}"]`)).not.toBeNull();
            expect(container.querySelector(`a[href="/${locale}/legal/approved-terms"]`)).not.toBeNull();
            expect(screen.getByRole("button", { name: locale === "es" ? "Preferencias de privacidad" : "Privacy preferences" })).toBeInTheDocument();
            expect(container.querySelector('a[href^="tel:"]')).toBeNull();
            unmount();
        }
    });
});

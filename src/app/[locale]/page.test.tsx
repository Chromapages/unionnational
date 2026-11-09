import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createTranslator } from "next-intl";
import type { ReactNode } from "react";
import type * as NextIntl from "next-intl";
import en from "@/messages/en.json";
import es from "@/messages/es.json";
import { ClientLogoStrip, type ClientLogo } from "@/components/contact/ClientLogoStrip";
import Home, { generateMetadata } from "./page";

const fixture = vi.hoisted(() => ({
    locale: "en" as "en" | "es",
    home: undefined as unknown,
    settings: undefined as unknown,
    rejectReads: false,
    missingSeo: false,
    rejectSeo: false,
}));
vi.mock("@/sanity/lib/live", () => ({ sanityFetch: vi.fn(async ({ query }: { query: string }) => {
    if (fixture.rejectReads) throw new Error("CMS unavailable");
    return query.includes('homePage') ? fixture.home : fixture.settings;
}) }));
vi.mock("next-intl/server", () => ({
    getTranslations: async () => {
        if (fixture.rejectSeo) throw new Error("Translation read unavailable");
        return createTranslator({ locale: fixture.locale, messages: fixture.missingSeo ? { ConsumerHome: { seo: {} } } : (fixture.locale === "es" ? es : en), namespace: "ConsumerHome.seo" });
    },
}));
vi.mock("next-intl", async importOriginal => ({
    ...await importOriginal<typeof NextIntl>(),
    useTranslations: () => createTranslator({ locale: fixture.locale, messages: fixture.locale === "es" ? es : en, namespace: "ConsumerHome.logos" }),
}));
vi.mock("next/navigation", () => ({ redirect: (url: string) => { throw new Error(`redirect:${url}`); } }));
vi.mock("framer-motion", () => ({ useReducedMotion: () => true }));
vi.mock("@/components/layout/HeaderWrapper", () => ({ HeaderWrapper: () => null }));
vi.mock("@/components/layout/Footer", () => ({ Footer: () => null }));
// Keep the actual logo consumer and schema; omit unrelated homepage sections and actions.
vi.mock("@/components/home/ConsumerHome", () => ({ ConsumerHome: ({ clientLogos }: { clientLogos: ClientLogo[] }) => <ClientLogoStrip logos={clientLogos} /> }));
vi.mock("@/components/ui/ErrorBoundary", () => ({ default: ({ children }: { children: ReactNode }) => children }));

beforeEach(() => {
    fixture.locale = "en";
    fixture.home = { data: null };
    fixture.settings = { data: null };
    fixture.rejectReads = false;
    fixture.missingSeo = false;
    fixture.rejectSeo = false;
});
afterEach(cleanup);
const params = (locale = fixture.locale) => ({ params: Promise.resolve({ locale }) });

describe("Home source boundaries", () => {
    it.each(["en", "es"] as const)("keeps %s catalog metadata and canonical after a rejected CMS read", async locale => {
        fixture.locale = locale;
        fixture.rejectReads = true;
        const metadata = await generateMetadata(params());
        const copy = locale === "es" ? es.ConsumerHome.seo : en.ConsumerHome.seo;
        expect(metadata.title).toBe(copy.title);
        expect(metadata.description).toBe(copy.description);
        expect(metadata.alternates).toEqual({ canonical: `https://unionnationaltax.com/${locale}`, languages: { en: "https://unionnationaltax.com/en", es: "https://unionnationaltax.com/es" } });
        expect(metadata).not.toHaveProperty("robots");
    });

    it("keeps catalog metadata when a fulfilled CMS result has no envelope", async () => {
        fixture.home = null;
        const metadata = await generateMetadata(params());
        expect(metadata.title).toBe(en.ConsumerHome.seo.title);
        expect(metadata.alternates?.canonical).toBe("https://unionnationaltax.com/en");
    });

    it.each(["en", "es"] as const)("recovers approved %s metadata from missing or rejected translations", async locale => {
        fixture.locale = locale;
        const copy = locale === "es" ? es.ConsumerHome.seo : en.ConsumerHome.seo;
        for (const failure of ["missingSeo", "rejectSeo"] as const) {
            fixture[failure] = true;
            const metadata = await generateMetadata(params());
            expect(metadata.title).toBe(copy.title);
            expect(metadata.description).toBe(copy.description);
            fixture[failure] = false;
        }
    });

    it("only honors an explicit boolean CMS noIndex without adding a permissive robots override", async () => {
        fixture.home = { data: { seo: { noIndex: "false" } } };
        expect(await generateMetadata(params())).not.toHaveProperty("robots");
        fixture.home = { data: { seo: { noIndex: true } } };
        expect((await generateMetadata(params())).robots).toEqual({ index: false, follow: false });
    });

    it.each([
        { name: "non-array logos", logos: { error: "invalid" } },
        { name: "invalid logo records", logos: [null, { asset: { url: "/valid-logo.png" }, alt: { text: "invalid" } }] },
    ])("omits $name without exposing broken logo UI", async ({ logos }) => {
        fixture.home = { data: { trustLogos: logos } };
        const { container } = render(await Home(params()));
        expect(container.querySelector("main#main-content")).not.toBeNull();
        expect(screen.queryByRole("region")).toBeNull();
        expect(screen.queryByRole("img")).toBeNull();
    });

    it("retains a valid client logo beside malformed records", async () => {
        fixture.home = { data: { trustLogos: [null, { alt: "Approved client", asset: { url: "/valid-logo.png" } }, { alt: 42, asset: { url: "/invalid.png" } }] } };
        render(await Home(params()));
        expect(screen.getByRole("img", { name: "Approved client" })).toBeInTheDocument();
        expect(screen.queryByRole("img", { name: "42" })).toBeNull();
    });

    it("retains valid organization data while omitting malformed optional schema collections", async () => {
        fixture.settings = { data: { companyName: "Fixture organization", sameAs: { error: "invalid" } } };
        const { container } = render(await Home(params()));
        const schema = JSON.parse(container.querySelector('script[type="application/ld+json"]')!.textContent!);
        expect(schema.name).toBe("Fixture organization");
        expect(schema).not.toHaveProperty("sameAs");
    });
});

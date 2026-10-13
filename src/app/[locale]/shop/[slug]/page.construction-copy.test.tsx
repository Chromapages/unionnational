import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { NextIntlClientProvider } from "next-intl";
import { beforeEach, describe, expect, it, vi } from "vitest";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

const mocks = vi.hoisted(() => ({ live: vi.fn(), hero: vi.fn(), card: vi.fn() }));
vi.mock("@/sanity/lib/live", () => ({ sanityFetch: mocks.live }));
vi.mock("@/sanity/lib/client", () => ({ client: { fetch: vi.fn() } }));
vi.mock("@/sanity/lib/image", () => ({ urlFor: vi.fn() }));
vi.mock("next/navigation", () => ({ notFound: () => { throw new Error("NOT_FOUND"); } }));
vi.mock("next-intl/server", () => ({
    getTranslations: async ({ locale, namespace }: { locale: string; namespace: string }) => {
        const messages = locale === "es" ? es : en;
        const raw = (key: string) => `${namespace}.${key}`.split(".").reduce<unknown>((value, part) => (value as Record<string, unknown>)[part], messages);
        return Object.assign((key: string) => raw(key), { raw });
    },
}));
vi.mock("@/components/layout/HeaderWrapper", () => ({ HeaderWrapper: () => <header /> }));
vi.mock("@/components/layout/Footer", () => ({ Footer: () => <footer /> }));
vi.mock("@/components/shop/ProductHero", () => ({ ProductHero: (props: { title: string; subtitle: string }) => {
    mocks.hero(props); return <><h1>{props.title}</h1><p>{props.subtitle}</p></>;
} }));
vi.mock("@/components/shop/ProductCard", () => ({ ProductCard: (props: { shortDescription: string }) => {
    mocks.card(props); return <p>{props.shortDescription}</p>;
} }));
vi.mock("@/components/seo/ShopViewContent", () => ({ ShopViewContent: () => null }));
vi.mock("@/i18n/navigation", () => ({ Link: ({ children, ...props }: React.ComponentProps<"a">) => <a {...props}>{children}</a> }));

import Page, { generateMetadata } from "./page";

const slug = "the-money-making-blueprint-for-construction-companies";
const product = {
    _id: "construction-fixture", slug, title: "The Money-Making Blueprint for Construction Companies",
    shortDescription: "Published old tax positioning", price: 27, format: "digital", imageUrl: "https://cdn.example.test/cover.png",
    author: { name: "Jason Astwood" }, stripeProductId: "prod_fixture", stripePriceId: "price_fixture",
    features: ["Section 179 equipment depreciation"],
    learningObjectives: [{ title: "Old tax planning", description: "Old 1099 positioning" }],
    editions: [
        { id: "pdf", name: "PDF", format: "digital", price: 27, stripePriceId: "price_pdf" },
        { id: "audio", name: "Audio", format: "audio", price: 27, stripePriceId: "price_audio" },
        { id: "hardcover", name: "Hardcover", format: "physical", price: 39, stripePriceId: "price_hardcover" },
        { id: "bundle", name: "Bundle", format: "bundle", price: 59, stripePriceId: "price_bundle" },
    ],
    shopDescriptions: { en: "Published", es: "Publicado" },
};

beforeEach(() => { vi.clearAllMocks(); mocks.live.mockResolvedValue({ data: structuredClone(product) }); });

describe.each(["en", "es"] as const)("construction manuscript copy (%s)", locale => {
    const messages = locale === "es" ? es : en;
    const props = (bookSlug = slug) => ({ params: Promise.resolve({ locale, slug: bookSlug }) });
    const renderPage = async (bookSlug = slug) => renderToStaticMarkup(
        <NextIntlClientProvider locale={locale} timeZone="America/Denver" messages={messages}>
            {await Page(props(bookSlug))}
        </NextIntlClientProvider>,
    );

    it("replaces stale CMS topic cards and both accordions while preserving all commerce props", async () => {
        const html = await renderPage();
        const description = messages.Shop.Desktop.books.construction.description;
        const overview = messages.Shop.ProductPage.constructionOverview;
        expect(html).toContain(description);
        const cards = html.match(/<ul data-book-summary[\s\S]*?<\/ul>/)?.[0] || "";
        expect((cards.match(/<li\b/g) || []).length).toBe(3);
        for (const feature of overview.features.slice(0, 3)) expect(cards).toContain(feature);
        const takeaways = html.match(/<ul data-publisher-takeaways[\s\S]*?<\/ul>/)?.[0] || "";
        for (const feature of overview.features.slice(3)) expect(takeaways).toContain(feature);
        for (const objective of overview.learningObjectives) {
            expect(html).toContain(objective.title);
            expect(html).toContain(objective.description);
        }
        expect(html).not.toMatch(/Section 179|1099|Old tax planning/);
        expect(mocks.hero).toHaveBeenCalledWith(expect.objectContaining({
            id: product._id, slug, title: product.title, subtitle: description,
            image: product.imageUrl, author: product.author, defaultPrice: product.price,
            editions: product.editions, stripeProductId: product.stripeProductId, stripePriceId: product.stripePriceId,
        }));
        await expect(mocks.live.mock.results[0].value).resolves.toEqual({ data: product });
    });

    it("agrees across hero, social metadata and schema while retaining the original offers", async () => {
        const metadata = await generateMetadata(props());
        const description = messages.Shop.Desktop.books.construction.description;
        expect(metadata).toMatchObject({ title: product.title, description, openGraph: { description }, twitter: { description } });
        expect(metadata.alternates?.canonical).toBe(`https://unionnationaltax.com/${locale}/shop/${slug}`);
        const html = await renderPage();
        const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)![1]);
        expect(schema).toMatchObject({ name: product.title, description, image: product.imageUrl, sku: product._id });
        expect(schema.offers.map((offer: { price: number }) => offer.price)).toEqual([27, 27, 39, 59]);
        expect(schema.offers.every((offer: { url: string }) => offer.url === `https://unionnationaltax.com/${locale}/shop/${slug}`)).toBe(true);
    });

    it("keeps other books on CMS overview copy and uses the construction description in related cards", async () => {
        mocks.live.mockResolvedValue({ data: { ...structuredClone(product), slug: "another-book", relatedProducts: [{ ...product, _id: "related-construction" }] } });
        const html = await renderPage("another-book");
        expect(html).toContain("Section 179 equipment depreciation");
        expect(html).toContain("Old tax planning");
        expect(mocks.card).toHaveBeenCalledWith(expect.objectContaining({
            shortDescription: messages.Shop.Desktop.books.construction.description, price: 27,
        }));
    });
});

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ fetch: vi.fn(), live: vi.fn(), hero: vi.fn(), cards: vi.fn(), view: vi.fn(), overview: vi.fn(), image: vi.fn(), copy: "Approved translated description" }));
vi.mock("@/sanity/lib/client", () => ({ client: { fetch: mocks.fetch } }));
vi.mock("@/sanity/lib/live", () => ({ sanityFetch: mocks.live }));
vi.mock("@/sanity/lib/image", () => ({ urlFor: (...args: unknown[]) => { mocks.image(...args); const image = { width: () => image, height: () => image, url: () => "https://cdn.example.test/social.png" }; return image; } }));
vi.mock("next/navigation", () => ({ notFound: () => { throw new Error("NOT_FOUND"); } }));
vi.mock("next-intl/server", () => ({ getTranslations: async ({ namespace }: { namespace: string }) => (key: string) => namespace === "Shop.Desktop" && key.endsWith(".description") ? mocks.copy : `${namespace}.${key}` }));
vi.mock("@/components/layout/HeaderWrapper", () => ({ HeaderWrapper: () => <header /> }));
vi.mock("@/components/layout/Footer", () => ({ Footer: () => <footer /> }));
vi.mock("@/components/shop/ProductHero", () => ({ ProductHero: (props: unknown) => { mocks.hero(props); return <h1>Hero</h1>; } }));
vi.mock("@/components/shop/ProductCard", () => ({ ProductCard: (props: { title: string }) => { mocks.cards(props); return <h3>{props.title}</h3>; } }));
vi.mock("@/components/shop/BookOverview", () => ({ BookOverview: (props: unknown) => { mocks.overview(props); return <section />; } }));
vi.mock("@/components/seo/ShopViewContent", () => ({ ShopViewContent: (props: unknown) => { mocks.view(props); return null; } }));
vi.mock("@/i18n/navigation", () => ({ Link: ({ children, ...props }: React.ComponentProps<"a">) => <a {...props}>{children}</a> }));
import Page, { generateMetadata, generateStaticParams } from "./page";
const params = (slug = "other-book", locale = "en") => ({ params: Promise.resolve({ slug, locale }) });
const product = { _id: "fixture-book", title: "Published fixture", slug: "other-book", shortDescription: "Approved CMS description", price: 49, format: "physical", shopDescriptions: { en: "Approved", es: "Guía publicada" } };
beforeEach(() => { vi.clearAllMocks(); mocks.copy = "Approved translated description"; mocks.live.mockResolvedValue({ data: product }); });

describe("published product route contracts", () => {
    it("generates locale-specific static entries from published slugs", async () => {
        mocks.fetch.mockResolvedValue([{ slug: "first" }, { slug: "second" }]);
        expect(await generateStaticParams()).toEqual([{ locale: "en", slug: "first" }, { locale: "es", slug: "first" }, { locale: "en", slug: "second" }, { locale: "es", slug: "second" }]);
    });
    it.each([null, { ...product, shortDescription: "Coming soon" }, { ...product, shortDescription: "" }])("rejects unavailable requested products %j", async data => {
        mocks.live.mockResolvedValue({ data });
        expect(await generateMetadata(params())).toEqual({ robots: { index: false, follow: false } });
        await expect(Page(params())).rejects.toThrow("NOT_FOUND");
    });
    it("uses requested locale, approved social assets and explicit noindex metadata", async () => {
        mocks.live.mockResolvedValue({ data: { ...product, seo: { noIndex: true, openGraphImage: { _ref: "fixture-image" } }, shopDescriptions: { en: "Coming soon", es: "Guía publicada" } } });
        const metadata = await generateMetadata(params("other-book", "es"));
        expect(metadata.robots).toEqual({ index: false, follow: false });
        expect(metadata.alternates?.languages).toEqual({ es: "https://unionnationaltax.com/es/shop/other-book" });
        expect(metadata.openGraph).toMatchObject({ description: product.shortDescription, images: ["https://cdn.example.test/social.png"] });
        expect(mocks.image).toHaveBeenCalledWith({ _ref: "fixture-image" });
        expect(mocks.live).toHaveBeenCalledWith(expect.objectContaining({ params: { slug: "other-book", locale: "es" } }));
    });
    it("falls back to approved CMS copy when known-book translation is unavailable", async () => {
        mocks.copy = "Coming soon";
        mocks.live.mockResolvedValue({ data: { ...product, imageUrl: "https://cdn.example.test/book.png" } });
        const metadata = await generateMetadata(params("the-s-corp-playbook"));
        expect(metadata.description).toBe(product.shortDescription);
        expect(metadata.twitter).toMatchObject({ images: ["https://cdn.example.test/book.png"] });
        const html = renderToStaticMarkup(await Page(params("the-s-corp-playbook")));
        expect(html).toContain("Shop.ProductPage.applyHelp");
        expect(mocks.hero).toHaveBeenCalledWith(expect.objectContaining({ subtitle: product.shortDescription, samplePages: [] }));
    });
    it("uses approved translated known-book copy without fabricating an image", async () => {
        const metadata = await generateMetadata(params("the-s-corp-playbook"));
        expect(metadata.description).toBe(mocks.copy);
        expect(metadata.openGraph).toMatchObject({ images: undefined });
        renderToStaticMarkup(await Page(params("the-s-corp-playbook")));
        expect(mocks.hero).toHaveBeenCalledWith(expect.objectContaining({ category: "Shop.Desktop.books.scorp.category", subtitle: mocks.copy }));
    });
    it("filters, deduplicates and caps valid related books while retaining their canonical edition prices", async () => {
        const related = { _id: "related", title: "Valid related", slug: "the-s-corp-playbook", shortDescription: "Valid related description", price: 49, format: "physical", editions: [{ name: "Digital PDF", price: 29, format: "digital" }] };
        mocks.live.mockResolvedValue({ data: { ...product, relatedProducts: [null, { ...related, _id: product._id }, { ...related, _id: "badslug", slug: "undefined" }, { ...related, _id: "badprice", price: NaN }, { ...related, _id: "badcopy", shortDescription: "Coming soon" }, { ...related, _id: "invalidslug", slug: "/outside" }, related, related, { ...related, _id: "second", title: "Second related", slug: "other-related", editions: undefined }, { ...related, _id: "third" }] } });
        const html = renderToStaticMarkup(await Page(params()));
        expect(html).toContain("Valid related");
        expect(html).toContain("Second related");
        expect(mocks.cards).toHaveBeenCalledTimes(2);
        expect(mocks.cards.mock.calls[0][0]).toMatchObject({ price: 29, format: "Digital PDF", layout: "related", category: "Shop.Desktop.books.scorp.category" });
        expect(mocks.cards.mock.calls[1][0]).toMatchObject({ price: 49, format: "physical", shortDescription: "Valid related description" });
    });
    it("preserves valid offers and escapes structured-data markup for a growth book", async () => {
        const editions = [{ name: "Hardcover", format: "physical", price: 49 }, { name: "Digital PDF", format: "digital", price: 29 }, { name: "Invalid", format: "digital", price: NaN }, { name: "Negative", format: "digital", price: -1 }];
        mocks.live.mockResolvedValue({ data: { ...product, title: "Safe </script> title", editions, samplePages: [{ url: "/fixture.png" }], videoUrl: "https://video.example.test/watch", author: { name: "Approved author" } } });
        const html = renderToStaticMarkup(await Page(params("the-3m-s-to-freedom", "es")));
        const json = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
        expect(json).not.toContain("</script>");
        const data = JSON.parse(json!);
        expect(data.offers).toHaveLength(2);
        expect(data.offers[0].url).toBe("https://unionnationaltax.com/es/shop/the-3m-s-to-freedom");
        expect(mocks.view).toHaveBeenCalledWith(expect.objectContaining({ price: 29 }));
        expect(mocks.overview).toHaveBeenCalledWith(expect.objectContaining({ growthGuide: true, summaryBullets: ["Shop.ProductPage.growthBullets.0", "Shop.ProductPage.growthBullets.1", "Shop.ProductPage.growthBullets.2"] }));
        expect(mocks.hero).toHaveBeenCalledWith(expect.objectContaining({ editions, author: { name: "Approved author" }, videoUrl: "https://video.example.test/watch" }));
    });
});

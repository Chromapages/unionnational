import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { ShopDesktopExperience, type ShopDesktopProduct } from "./ShopDesktopExperience";

vi.mock("next-intl", () => ({ useLocale: () => "en", useTranslations: (namespace: string) => (key: string) => `${namespace}.${key}` }));
vi.mock("@/i18n/navigation", () => ({
    Link: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
    usePathname: () => "/shop",
}));
vi.mock("next/image", () => ({ default: () => null }));

describe("ShopDesktopExperience proof", () => {
    it("does not invent a resource rating, testimonial, or Terms destination", () => {
        const html = renderToStaticMarkup(<ShopDesktopExperience products={[]} />);
        expect(html).not.toContain("4.9");
        expect(html).not.toContain("hero.proof.2");
        expect(html).not.toContain("social.fallbackQuote");
        expect(html).not.toContain("terms-of-service");
    });

    it("retains an approved Terms destination without unrelated testimonials", () => {
        const html = renderToStaticMarkup(<ShopDesktopExperience products={[]} termsHref="/legal/approved-terms" />);
        expect(html).toContain("/legal/approved-terms");
    });

    it("shows seven unique books with one action each and no invented formats", () => {
        const products: ShopDesktopProduct[] = Array.from({ length: 7 }, (_, index) => ({
            _id: `book-${index}`, title: `Book ${index}`, slug: `book-${index}`,
            price: 29, shortDescription: "Existing description", format: "bundle",
            editions: index === 6 ? [] : [{ name: "Digital PDF", format: "digital", price: 29, stripePriceId: "configured-price" }],
        }));
        const html = renderToStaticMarkup(<ShopDesktopExperience products={[...products, products[0], products[1]]} featuredProduct={products[0]} />);
        expect((html.match(/<article\b/g) || []).length).toBe(7);
        expect((html.match(/actions.viewBook/g) || []).length).toBe(7);
        expect((html.match(/formats.pending/g) || []).length).toBe(1);
        expect(html).not.toContain("type=\"search\"");
        expect(html).not.toContain("<select");
        expect(html).not.toContain("library.showAll");
        expect(html).not.toContain("topics.templates");
    });
});

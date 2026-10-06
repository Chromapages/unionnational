import { renderToStaticMarkup } from "react-dom/server";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ShopDesktopExperience, type ShopDesktopProduct } from "./ShopDesktopExperience";

vi.mock("next-intl", () => ({ useLocale: () => "en", useTranslations: (namespace: string) => (key: string) => `${namespace}.${key}` }));
vi.mock("@/i18n/navigation", () => ({
    Link: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
    usePathname: () => "/shop",
}));
vi.mock("next/image", () => ({ default: () => null }));

describe("ShopDesktopExperience proof", () => {
    const product = (id: string, slug: string, extra: Partial<ShopDesktopProduct> = {}): ShopDesktopProduct => ({ _id: id, title: `Book ${id}`, slug, price: 49, shortDescription: "Approved description", format: "physical", ...extra });
    it("filters real goal collections, toggles a selected goal and resets the catalog", () => {
        const products = [product("featured", "other-book", { isFeatured: true }), product("tax", "the-s-corp-playbook"), product("profit", "the-restaurant-profit-blueprint"), product("finance", "the-proactive-cfo-solution"), product("growth", "the-3m-s-to-freedom")];
        const { container } = render(<ShopDesktopExperience products={products} />);
        const grid = () => container.querySelector("#shop-book-grid")!;
        expect(grid().querySelectorAll("article")).toHaveLength(4);
        const tax = screen.getByRole("button", { name: "Shop.Desktop.goals.items.0.title" });
        fireEvent.click(tax);
        expect(tax).toHaveAttribute("aria-pressed", "true");
        expect(grid()).toHaveTextContent("Book tax");
        expect(grid()).not.toHaveTextContent("Book profit");
        expect(grid().querySelectorAll("article")).toHaveLength(1);
        fireEvent.click(tax);
        expect(grid().querySelectorAll("article")).toHaveLength(4);
        for (const [index, expected] of [[1, ["profit", "growth"]], [2, ["finance", "growth"]], [3, ["profit", "growth"]]] as const) {
            fireEvent.click(screen.getByRole("button", { name: `Shop.Desktop.goals.items.${index}.title` }));
            expect(grid().querySelectorAll("article")).toHaveLength(expected.length);
            for (const id of expected) expect(grid()).toHaveTextContent(`Book ${id}`);
        }
        fireEvent.click(screen.getByRole("button", { name: "Shop.Desktop.library.allBooks" }));
        expect(grid().querySelectorAll("article")).toHaveLength(4);
    });
    it("disables absent goals and excludes unpublished resources from collection decisions", () => {
        const { container } = render(<ShopDesktopExperience products={[product("first", "other-book"), product("hidden", "the-s-corp-playbook", { shortDescription: "Coming soon" })]} featuredProduct={product("invalid-feature", "not-published", { shortDescription: "" })} />);
        expect(screen.getByRole("heading", { name: "Book first" })).toBeInTheDocument();
        expect(container.querySelector("#shop-book-grid article")).toBeNull();
        expect(screen.getByRole("button", { name: "Shop.Desktop.goals.items.0.title" })).toBeDisabled();
        expect(screen.queryByRole("heading", { name: "Book hidden" })).toBeNull();
    });
    it("renders only configured edition formats, actual selected price and approved footer destinations", () => {
        const editions = [{ name: "Digital PDF", format: "digital", price: 29, stripePriceId: "price_pdf" }, { name: "Audiobook", format: "audio", price: 27, stripePriceId: "price_audio" }, { name: "Hardcover", format: "physical", price: 49, stripePriceId: "price_print" }, { name: "Bundle", format: "bundle", price: 59, stripePriceId: "price_bundle" }, { name: "Not offered", format: "course", price: 0, stripePriceId: "price_unknown" }, { name: "Unconfigured", format: "audio", price: 0 }];
        const featured = product("scorp", "the-s-corp-playbook", { imageUrl: "/images/fixture.png", editions });
        const html = renderToStaticMarkup(<ShopDesktopExperience products={[featured, product("unknown", "new-book", { imageUrl: "/images/second.png", editions: [{ name: "Invalid", format: "audio", price: NaN, stripePriceId: "price_unavailable" }] })]} featuredProduct={featured} logoUrl="/images/logo.png" termsHref="/legal/approved" socialLinks={{ linkedin: "https://social.example.test/in/approved", youtube: "https://social.example.test/watch" }} />);
        expect(html).toContain("Shop.Desktop.formats.digital");
        expect(html).toContain("Shop.Desktop.formats.audio");
        expect(html).toContain("Shop.Desktop.formats.physical");
        expect(html).toContain("Shop.Desktop.formats.bundle");
        expect(html).not.toContain("Shop.Desktop.formats.unknown");
        expect(html).toContain("$29");
        expect(html).toContain("/legal/approved");
        expect(html).toContain("https://social.example.test/in/approved");
        expect(html).not.toContain('aria-label="instagram"');
        expect(html).toContain("featured.topics.3.title");
    });
    it("sorts canonical books before unknown books and deduplicates public identities", () => {
        const { container } = render(<ShopDesktopExperience products={[product("featured", "not-canonical", { isFeatured: true }), product("unknown", "new-book"), product("cfo", "the-proactive-cfo-solution"), product("scorp", "the-s-corp-playbook"), product("cfo", "the-proactive-cfo-solution")]} />);
        const headings = [...container.querySelectorAll("#shop-book-grid h3")].map(node => node.textContent);
        expect(headings).toEqual(["Book scorp", "Book cfo", "Book unknown"]);
    });
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

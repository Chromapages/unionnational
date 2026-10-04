import { renderToStaticMarkup } from "react-dom/server";
import { NextIntlClientProvider } from "next-intl";
import { expect, it, vi } from "vitest";
import messages from "@/messages/en.json";
import { ProductHero } from "./ProductHero";

vi.mock("next/image", () => ({ default: () => null }));
vi.mock("@/components/ui/VideoEmbed", () => ({ default: () => null }));
vi.mock("@/components/ui/StickyBuyBar", () => ({ StickyBuyBar: () => null }));
vi.mock("./ProductOfferSelector", () => ({ ProductOfferSelector: () => null }));
vi.mock("@/components/seo/MetaPixel", () => ({ trackMetaEvent: vi.fn() }));
vi.mock("@/i18n/navigation", () => ({ Link: ({ children }: { children: React.ReactNode }) => <>{children}</> }));
vi.mock("@/store/useCartStore", () => ({ useCartStore: (select: (state: object) => unknown) => select({ addItem: vi.fn(), setIsOpen: vi.fn() }) }));

it("shows three relevant highlights on every book, with a safe fallback", () => {
    const cases = {
        "the-3m-s-to-freedom": "Growth framework",
        "the-s-corp-playbook": "Entity structure",
        "the-proactive-cfo-solution": "Cash flow",
        "the-retirement-crisis-in-america": "Retirement income",
        "the-money-making-blueprint-for-construction-companies": "Job costing",
        "the-restaurant-profit-blueprint": "Operations",
        "why-the-rich-dont-pay-taxes": "Book overview",
        "another-published-book": "Book overview",
    };
    for (const [slug, expected] of Object.entries(cases)) {
        const html = renderToStaticMarkup(<NextIntlClientProvider locale="en" timeZone="America/Denver" messages={messages}>
            <ProductHero id="book" slug={slug} title="Existing book" subtitle="Existing description" image="" defaultPrice={29} format="digital" editions={null} samplePages={null} />
        </NextIntlClientProvider>);
        const strip = html.match(/<ul data-book-highlights[\s\S]*?<\/ul>/)?.[0] || "";
        expect((strip.match(/<li\b/g) || []).length).toBe(3);
        expect(strip).toContain(expected);
        if (slug !== "the-3m-s-to-freedom") expect(strip).not.toContain("Growth framework");
    }
});

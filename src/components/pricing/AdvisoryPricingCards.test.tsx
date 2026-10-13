import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { PricingTier } from "@/types/sanity";
import { AdvisoryPricingCards } from "./AdvisoryPricingCards";
import { PricingSection } from "./PricingSection";
import { getDraftPricingPage } from "@/lib/pricing/fixtures";

const offer = (name: string, overrides: Partial<PricingTier> = {}): PricingTier => ({
    _id: name,
    name,
    slug: { current: name.toLowerCase().replaceAll(" ", "-") },
    category: "advisory",
    ...overrides,
});

describe("CMS offer rendering", () => {
    it("renders all ten draft offers with exact ledger prices and independent credit rules", () => {
        render(<AdvisoryPricingCards tiers={getDraftPricingPage("en").offers!} />);
        const cards = screen.getAllByRole("article");
        expect(cards).toHaveLength(10);
        const prices = [
            "From $2,500/month", "From $595/month", "From $250/month", "From $1,495", "From $1,795",
            "From $595", "From $3,500/year", "$495", "$750", "Custom flat-fee quote",
        ];
        cards.forEach((card, index) => expect(within(card).getByText(prices[index])).toBeInTheDocument());
        expect(cards[2]).toHaveTextContent("Up to 10 employees");
        expect(cards[2]).toHaveTextContent("amount pending");
        [cards[3], cards[4], cards[5]].forEach(card => expect(card).toHaveTextContent("Federal and Utah"));
        expect(cards[7]).toHaveTextContent("within 30 days");
        expect(cards[8]).toHaveTextContent("Review fee credited toward resolution");
        expect(cards[8]).not.toHaveTextContent("30 days");
        expect(cards[8]).toHaveTextContent("Does not purchase resolution or guarantee an IRS outcome");
        [cards[7], cards[8]].forEach(card => expect(within(card).getByRole("link").getAttribute("href")).toBe("/en/contact"));
    });

    it("preserves editorial order and supports one offer without automatic fees or recommendations", () => {
        const { rerender } = render(<AdvisoryPricingCards tiers={[
            offer("Executive", { price: "From $2,500", billingPeriod: "monthly" }),
            offer("Foundation", { price: "$495", billingPeriod: "one-time" }),
        ]} />);
        expect(screen.getAllByRole("heading").map(heading => heading.textContent)).toEqual(["Executive", "Foundation"]);
        expect(screen.getByText("From $2,500/month")).toBeInTheDocument();
        expect(screen.getByText("$495")).toBeInTheDocument();
        expect(screen.queryByText(/implementation fee|recommended/i)).not.toBeInTheDocument();
        rerender(<AdvisoryPricingCards tiers={[offer("One offer")]} />);
        expect(screen.getAllByRole("article")).toHaveLength(1);
    });

    it("renders supplied Spanish scope and credit notes with localized cadence and URLs", () => {
        render(<AdvisoryPricingCards locale="es" tiers={[offer("Plan fiscal", {
            price: "Desde $3,500", billingPeriod: "annually",
            features: ["Proyecciones fiscales"],
            includes: "Declaraciones federales y de Utah.",
            priceNote: "La revisión del IRS se acredita a la resolución.",
            ctaText: "Consultar",
            ctaUrl: "/contact?service=tax-planning",
        })]} />);
        expect(screen.getByText("Desde $3,500/año")).toBeInTheDocument();
        expect(screen.getByText("Proyecciones fiscales")).toBeInTheDocument();
        expect(screen.getByText("Declaraciones federales y de Utah.")).toBeInTheDocument();
        expect(screen.getByText("La revisión del IRS se acredita a la resolución.")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Consultar" })).toHaveAttribute("href", "/es/contact?service=tax-planning");
    });

    it("renders custom quote without cadence and fails safely for an unsafe CTA", () => {
        render(<AdvisoryPricingCards tiers={[offer("Cleanup", {
            price: "Custom flat-fee quote", billingPeriod: "monthly", ctaUrl: "javascript:alert(1)",
        })]} />);
        expect(screen.getByText("Custom flat-fee quote")).toBeInTheDocument();
        expect(screen.getByRole("link")).toHaveAttribute("href", "/en/contact");
    });

    it("uses neutral missing data rather than legacy fallback pricing", () => {
        render(<PricingSection tiers={[]} locale="es" />);
        expect(screen.getByRole("link")).toHaveTextContent("Contáctanos para conocer los precios.");
        expect(screen.queryByRole("article")).not.toBeInTheDocument();
        expect(screen.queryByText(/3,500|6,500|10,000/)).not.toBeInTheDocument();
    });
});

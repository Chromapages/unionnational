import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { ServiceCard } from "@/lib/services/coreServiceCards";
import { ServicesSection } from "./ServicesSection";

vi.mock("next-intl/server", () => ({
    getTranslations: async () => (key: string) => {
        const messages: Record<string, string> = {
            eyebrow: "What we help you achieve",
            title: "Four outcomes. One connected financial strategy.",
            subtitle: "Start with the pressure point that matters now.",
            notSurePrompt: "Not sure where to start?",
            listLabel: "Financial outcomes and the services that support them",
            viewAllCta: "Compare all services",
            recommendedBadge: "Recommended",
        };

        return messages[key] || key;
    },
}));

vi.mock("@/i18n/navigation", () => ({
    Link: ({ href, children, ...props }: React.ComponentPropsWithoutRef<"a"> & { href: string }) => (
        <a href={href} {...props}>{children}</a>
    ),
}));

const createCards = (count: number, flagshipIndex?: number): ServiceCard[] =>
    Array.from({ length: count }, (_, index) => ({
        id: `service-${index + 1}`,
        order: index + 1,
        categoryLabel: `Service ${index + 1}`,
        icon: "BadgeDollarSign",
        heading: `Outcome ${index + 1}`,
        description: `Description ${index + 1}`,
        exploreLinkLabel: `Explore service ${index + 1}`,
        exploreLinkHref: `/service-${index + 1}`,
        isFlagship: flagshipIndex === index,
    }));

describe("ServicesSection", () => {
    it.each([2, 4, 6])("renders a mobile swipe carousel and desktop grid for %i configured services", async (count) => {
        const jsx = await (ServicesSection as unknown as (props: { cards: ServiceCard[] }) => Promise<React.JSX.Element>)({
            cards: createCards(count),
        });
        render(jsx);

        const grid = screen.getByRole("list", { name: "Financial outcomes and the services that support them" });
        expect(grid).toHaveClass("flex", "snap-x", "snap-mandatory", "overflow-x-auto", "touch-pan-x");
        expect(grid).toHaveClass("md:grid-cols-[repeat(auto-fit,minmax(min(100%,22.5rem),1fr))]");
        expect(grid).not.toHaveClass("md:grid-cols-2");
        expect(screen.getAllByRole("listitem")).toHaveLength(count);
        screen.getAllByRole("listitem").forEach((card) => {
            expect(card).toHaveClass("w-[85vw]", "max-w-[340px]", "shrink-0", "snap-center");
        });
    });

    it("uses one real analytics-enabled link per card", async () => {
        const jsx = await (ServicesSection as unknown as (props: { cards: ServiceCard[] }) => Promise<React.JSX.Element>)({
            cards: createCards(2),
        });
        render(jsx);

        const firstLink = screen.getByRole("link", { name: "Explore service 1" });
        expect(firstLink).toHaveAttribute("href", "/service-1");
        expect(firstLink).toHaveAttribute("data-analytics", "services_section_card_click");
        expect(firstLink).toHaveAttribute("data-service-id", "service-1");
        expect(firstLink).toHaveAttribute("data-service-position", "1");
        expect(firstLink.closest("article")).not.toHaveAttribute("onclick");
        expect(firstLink.closest("article")?.querySelectorAll("a")).toHaveLength(1);
    });

    it("does not render a flagship badge when no configured card is flagged", async () => {
        const jsx = await (ServicesSection as unknown as (props: { cards: ServiceCard[] }) => Promise<React.JSX.Element>)({
            cards: createCards(4),
        });
        render(jsx);

        expect(screen.queryByText("Recommended")).not.toBeInTheDocument();
    });

    it("renders the CMS-configured flagship badge and comparison telemetry", async () => {
        const jsx = await (ServicesSection as unknown as (props: { cards: ServiceCard[] }) => Promise<React.JSX.Element>)({
            cards: createCards(4, 1),
        });
        render(jsx);

        expect(screen.getByText("Recommended")).toBeInTheDocument();
        const compareLink = screen.getByTestId("services-section-compare-all");
        expect(compareLink).toHaveAttribute("href", "/services");
        expect(compareLink).toHaveAttribute("data-analytics", "services_section_compare_all_click");
    });

    it("keeps keyboard navigation to one descriptive link per card followed by Compare all services", async () => {
        const user = userEvent.setup();
        const jsx = await (ServicesSection as unknown as (props: { cards: ServiceCard[] }) => Promise<React.JSX.Element>)({
            cards: createCards(4),
        });
        render(jsx);

        const expectedLinkNames = [
            "Explore service 1",
            "Explore service 2",
            "Explore service 3",
            "Explore service 4",
            "Compare all services",
        ];

        for (const linkName of expectedLinkNames) {
            await user.tab();
            expect(screen.getByRole("link", { name: linkName })).toHaveFocus();
        }
    });

    it("uses a visible 3px focus ring on every card link", async () => {
        const jsx = await (ServicesSection as unknown as (props: { cards: ServiceCard[] }) => Promise<React.JSX.Element>)({
            cards: createCards(2),
        });
        render(jsx);

        screen.getAllByRole("link", { name: /Explore service/i }).forEach((link) => {
            expect(link).toHaveClass("focus-visible:ring-[3px]");
            expect(link).toHaveClass("focus-visible:ring-brand-900");
        });
    });
});

import { render, screen, within } from "@testing-library/react";
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
            "rightHeader.eyebrow": "A unified approach",
            "rightHeader.title": "Different challenges. A unified approach.",
            "rightHeader.description": "Whether you're looking to reduce taxes, get clearer numbers, make bigger decisions, or build a stronger foundation — every service fits into one connected strategy.",
            "centerHub.eyebrow": "One connected",
            "centerHub.title": "Financial picture",
            "centerHub.subtitle1": "Integrated services.",
            "centerHub.subtitle2": "Stronger outcomes.",
            "learnMore": "Learn more",
            "blocks.01.number": "01",
            "blocks.01.eyebrow": "Lower your tax burden",
            "blocks.01.title": "Keep more of what you earn.",
            "blocks.01.subtitle": "Stop overpaying and keep more of what you earn.",
            "blocks.02.number": "02",
            "blocks.02.eyebrow": "Know your numbers",
            "blocks.02.title": "Make confident decisions.",
            "blocks.02.subtitle": "Financial visibility that drives smarter decisions.",
            "blocks.03.number": "03",
            "blocks.03.eyebrow": "Lead with clarity",
            "blocks.03.title": "Make bigger moves with confidence.",
            "blocks.03.subtitle": "Executive-level guidance to scale your business.",
            "blocks.04.number": "04",
            "blocks.04.eyebrow": "Build a stronger foundation",
            "blocks.04.title": "Set your business up for what's next.",
            "blocks.04.subtitle": "Get your business organized from day one.",
            "comparisonBanner.eyebrow": "Not sure which service fits?",
            "comparisonBanner.title": "Compare services and find the right fit.",
            "comparisonBanner.subtitle": "Explore our interactive comparison tool to see how each service aligns with your business stage and goals.",
            "comparisonBanner.cta": "Compare All Services",
            "comparisonBanner.benefits.0": "Clearer decision-making",
            "comparisonBanner.benefits.1": "A more efficient business",
            "comparisonBanner.benefits.2": "A stronger financial future",
            "footer.tagline": "Strategy creates options",
            "footer.subtagline": "A more confident tomorrow",
            "outcomes.scorp.title": "Lower your tax burden",
            "outcomes.scorp.service": "S-Corp Tax Advantage",
            "outcomes.scorp.description": "Evaluate whether an S-Corp election and coordinated payroll strategy could reduce avoidable self-employment tax.",
            "outcomes.scorp.link": "Explore S-Corp Tax Advantage",
            "outcomes.taxPlanning.title": "Plan before deadlines",
            "outcomes.taxPlanning.service": "Proactive Tax Planning",
            "outcomes.taxPlanning.description": "Plan entity, deduction, retirement, and timing decisions while there is still time to act.",
            "outcomes.taxPlanning.link": "Explore Proactive Tax Planning",
            "outcomes.bookkeeping.title": "Know your numbers",
            "outcomes.bookkeeping.service": "Strategic Bookkeeping",
            "outcomes.bookkeeping.description": "Maintain current, decision-ready books that support tax planning, pricing, cash-flow visibility, and compliance.",
            "outcomes.bookkeeping.link": "Explore Strategic Bookkeeping",
            "outcomes.fractionalCfo.title": "Lead with clarity",
            "outcomes.fractionalCfo.service": "Fractional CFO",
            "outcomes.fractionalCfo.description": "Use forecasting, financial modeling, and leadership-level guidance to make larger business decisions.",
            "outcomes.fractionalCfo.link": "Explore Fractional CFO Services",
            "outcomes.formation.title": "Start structured",
            "outcomes.formation.service": "New Business Formation",
            "outcomes.formation.description": "Choose and establish the business entity, registrations, and operating foundation your next stage requires.",
            "outcomes.formation.link": "Explore New Business Formation",
            "outcomes.payroll.title": "Pay people accurately",
            "outcomes.payroll.service": "Payroll Services",
            "outcomes.payroll.description": "Run dependable payroll, filings, and compliance processes without adding administrative drag to your business.",
            "outcomes.payroll.link": "Explore Payroll Services",
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

    it("renders default 4-outcome blocks, split header, comparison banner, and footer tag", async () => {
        const jsx = await ServicesSection();
        render(jsx);

        expect(screen.getByText("What we help you achieve")).toBeInTheDocument();
        expect(screen.getByText("Different challenges. A unified approach.")).toBeInTheDocument();
        const mobileCards = screen.getAllByRole("article");
        expect(mobileCards).toHaveLength(4);
        [
            ["01", "Keep more of what you earn."],
            ["02", "Make confident decisions."],
            ["03", "Make bigger moves with confidence."],
            ["04", "Set your business up for what's next."],
        ].forEach(([number, title], index) => {
            expect(within(mobileCards[index]).getByText(number)).toBeInTheDocument();
            expect(within(mobileCards[index]).getByRole("heading", { level: 3, name: title })).toBeInTheDocument();
        });
        const desktopChoices = within(screen.getByRole("group", { name: "Financial outcomes and the services that support them" })).getAllByRole("button");
        expect(desktopChoices).toHaveLength(4);
        expect(desktopChoices[0]).toHaveAttribute("aria-pressed", "true");
        expect(desktopChoices[0]).toHaveTextContent("Keep more of what you earn.");
        expect(screen.getAllByText(/Financial picture/i)[0]).toBeInTheDocument();
        expect(screen.getByText("Compare services and find the right fit.")).toBeInTheDocument();
        expect(screen.getByText("Clearer decision-making")).toBeInTheDocument();
        expect(screen.getAllByText("Strategy creates options")).not.toHaveLength(0);
    });
});

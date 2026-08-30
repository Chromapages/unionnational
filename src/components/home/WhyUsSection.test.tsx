import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { WhyUsSection } from "./WhyUsSection";

vi.mock("next-intl/server", () => ({
  getTranslations: async () => (key: string) => {
    const messages: Record<string, string> = {
      eyebrow: "Proactive by design",
      title: "The tax return records what happened. Strategy happens earlier.",
      subtitle: "Year-round planning gives you time to evaluate options before deadlines close them.",
      caption: "How tax support changes when planning starts before the deadline.",
      dimensionLabel: "What changes",
      traditionalLabel: "Traditional tax support",
      proactiveLabel: "Proactive tax strategy",
      "rows.timing.dimension": "Timing",
      "rows.timing.traditional": "Files after the year closes",
      "rows.timing.proactive": "Plans while decisions are still open",
      "rows.scope.dimension": "Scope",
      "rows.scope.traditional": "Confirms compliance",
      "rows.scope.proactive": "Evaluates entity and deduction opportunities before deadlines",
      "rows.cadence.dimension": "Cadence",
      "rows.cadence.traditional": "Contact is mostly seasonal",
      "rows.cadence.proactive": "Schedules planning checkpoints throughout the year",
      "rows.decisionSupport.dimension": "Decision support",
      "rows.decisionSupport.traditional": "Reports what happened",
      "rows.decisionSupport.proactive": "Uses current numbers to guide decisions",
      conclusion: "More time to plan means fewer decisions made under deadline pressure.",
      primaryCta: "See how proactive tax planning works",
      secondaryCta: "Check your S-Corp fit",
      recommendedBadge: "Recommended",
      emptyFallback: "Comparison details are being updated.",
      "evidence.eyebrow": "What happens next",
      "evidence.heading": "Turn proactive insight into a working plan",
      "evidence.step1.label": "Review current position",
      "evidence.step1.body": "Examine entity structure, current revenue, and tax baseline before the year closes.",
      "evidence.step2.label": "Identify decisions before deadlines",
      "evidence.step2.body": "Surface deductions, retirement contributions, and S-Corp distribution strategies in advance.",
      "evidence.step3.label": "Plan and revisit throughout the year",
      "evidence.step3.body": "Maintain regular checkpoints to adjust strategy as operations and tax regulations evolve.",
      "evidence.disclaimer": "Informational planning workflow. Individual tax outcomes depend on verified entity structure and timely implementation.",
    };
    return messages[key] || key;
  },
}));

vi.mock("@/i18n/navigation", () => ({
  Link: ({
    href,
    children,
    ...props
  }: React.ComponentPropsWithoutRef<"a"> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("WhyUsSection", () => {
  it("renders with semantic section landmark and h2 heading", async () => {
    const jsx = await WhyUsSection();
    render(jsx);

    const section = screen.getByRole("region", {
      name: /The tax return records what happened. Strategy happens earlier./i,
    });
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("id", "proactive-by-design");

    const heading = screen.getByRole("heading", {
      level: 2,
      name: /The tax return records what happened. Strategy happens earlier./i,
    });
    expect(heading).toHaveAttribute("id", "why-us-heading");
  });

  it("renders a semantic table on desktop with proper th scope and caption", async () => {
    const jsx = await WhyUsSection();
    render(jsx);

    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();

    const columnHeaders = screen.getAllByRole("columnheader");
    expect(columnHeaders).toHaveLength(3);
    expect(columnHeaders[0]).toHaveTextContent("What changes");
    expect(columnHeaders[1]).toHaveTextContent("Traditional tax support");
    expect(columnHeaders[2]).toHaveTextContent(/Proactive tax strategy/);

    const rowHeaders = screen.getAllByRole("rowheader");
    expect(rowHeaders).toHaveLength(4);
    expect(rowHeaders[0]).toHaveTextContent("Timing");
    expect(rowHeaders[1]).toHaveTextContent("Scope");
    expect(rowHeaders[2]).toHaveTextContent("Cadence");
    expect(rowHeaders[3]).toHaveTextContent("Decision support");
  });

  it("renders semantic mobile card list with role='list'", async () => {
    const jsx = await WhyUsSection();
    render(jsx);

    const mobileList = screen.getByRole("list", {
      name: "How tax support changes when planning starts before the deadline.",
    });
    expect(mobileList).toBeInTheDocument();
    expect(mobileList).toHaveClass("md:hidden");
  });

  it("renders explicit recommended badge in proactive header and mobile cards", async () => {
    const jsx = await WhyUsSection();
    render(jsx);

    const badges = screen.getAllByText("Recommended");
    expect(badges.length).toBeGreaterThanOrEqual(2);
  });

  it("visually de-emphasizes repeated mobile card labels without removing their semantic context", async () => {
    const jsx = await WhyUsSection();
    render(jsx);

    const mobileList = screen.getByRole("list", {
      name: "How tax support changes when planning starts before the deadline.",
    });
    const cards = mobileList.querySelectorAll("li");

    expect(cards).toHaveLength(4);
    expect(cards[0].querySelectorAll("dt")[0]).toHaveClass("text-xs");
    expect(cards[1].querySelectorAll("dt")[0]).toHaveClass("text-[11px]", "text-slate-700");
    expect(cards[1]).toHaveTextContent("Traditional tax support");
    expect(cards[1]).toHaveTextContent("Proactive tax strategy");
    expect(cards[1]).toHaveTextContent("Recommended");
  });

  it("uses one outer-card border while keeping both mobile comparison states borderless", async () => {
    const jsx = await WhyUsSection();
    render(jsx);

    const mobileList = screen.getByRole("list", {
      name: "How tax support changes when planning starts before the deadline.",
    });
    const cards = mobileList.querySelectorAll("li");

    cards.forEach((card) => {
      expect(card).toHaveClass("rounded-xl", "border", "border-slate-200");
      expect(card.querySelector(".bg-slate-100")).not.toHaveClass("border");
      expect(card.querySelector(".bg-gold-50\\/70")).not.toHaveClass("border");
    });
  });

  it("uses the mobile 8px spacing rhythm throughout the comparison and process handoff", async () => {
    const jsx = await WhyUsSection();
    render(jsx);

    const section = screen.getByRole("region", {
      name: "The tax return records what happened. Strategy happens earlier.",
    });
    const mobileList = screen.getByRole("list", {
      name: "How tax support changes when planning starts before the deadline.",
    });
    const firstCard = mobileList.querySelector("li");
    const process = screen.getByTestId("why-us-evidence-module");

    expect(section.querySelector(".grid.grid-cols-1.gap-6")).toBeInTheDocument();
    expect(mobileList).toHaveClass("flex", "snap-x", "snap-mandatory", "gap-6", "overflow-x-auto", "touch-pan-x");
    expect(mobileList).toHaveAttribute("id", "why-us-mobile-comparison-carousel");
    expect(firstCard).toHaveClass("p-4");
    expect(firstCard?.querySelector("dl")).toHaveClass("mt-4", "space-y-4");
    expect(firstCard?.querySelector(".bg-slate-100")).toHaveClass("p-4");
    expect(firstCard?.querySelector(".bg-gold-50\\/70")).toHaveClass("p-4");
    expect(process).toHaveClass("pt-6");
    expect(process).not.toHaveClass("-mt-2");
  });

  it("renders mobile comparison cards as a swipeable scroll-snap carousel", async () => {
    const jsx = await WhyUsSection();
    render(jsx);

    const mobileList = screen.getByRole("list", {
      name: "How tax support changes when planning starts before the deadline.",
    });
    const cards = mobileList.querySelectorAll("li");

    expect(cards).toHaveLength(4);
    cards.forEach((card) => {
      expect(card).toHaveClass("w-[85vw]", "max-w-[340px]", "shrink-0", "snap-center");
      expect(card).toHaveAttribute("data-carousel-item");
    });
    expect(screen.getByLabelText("Comparison card pagination")).toBeInTheDocument();
  });

  it("renders fallback notification when customRows is empty array", async () => {
    const jsx = await WhyUsSection({ customRows: [] });
    render(jsx);

    expect(screen.getByText("Comparison details are being updated.")).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("supports custom empty fallback message", async () => {
    const jsx = await WhyUsSection({
      customRows: [],
      emptyFallbackMessage: "Custom maintenance message.",
    });
    render(jsx);

    expect(screen.getByText("Custom maintenance message.")).toBeInTheDocument();
  });

  it("sorts customRows by priority properly", async () => {
    const jsx = await WhyUsSection({
      customRows: [
        {
          id: "second",
          label: "Second Dimension",
          traditionalText: "Traditional 2",
          proactiveText: "Proactive 2",
          priority: 2,
        },
        {
          id: "first",
          label: "First Dimension",
          traditionalText: "Traditional 1",
          proactiveText: "Proactive 1",
          priority: 1,
        },
      ],
    });
    render(jsx);

    const rowHeaders = screen.getAllByRole("rowheader");
    expect(rowHeaders[0]).toHaveTextContent("First Dimension");
    expect(rowHeaders[1]).toHaveTextContent("Second Dimension");
  });

  it("handles extreme copy length safely without throwing", async () => {
    const veryLongText = "A".repeat(800);
    const jsx = await WhyUsSection({
      customRows: [
        {
          id: "extreme",
          label: "Short",
          traditionalText: veryLongText,
          proactiveText: veryLongText,
        },
      ],
    });
    render(jsx);

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getAllByText(veryLongText).length).toBeGreaterThan(0);
  });

  it("renders default Priority 1 evidence module with 3 planning steps", async () => {
    const jsx = await WhyUsSection();
    render(jsx);

    expect(screen.getByTestId("why-us-evidence-module")).toBeInTheDocument();
    expect(screen.getByText("Review current position")).toBeInTheDocument();
    expect(screen.getByText("Identify decisions before deadlines")).toBeInTheDocument();
    expect(screen.getByText("Plan and revisit throughout the year")).toBeInTheDocument();
    expect(screen.getByRole("heading", {
      level: 2,
      name: "Turn proactive insight into a working plan",
    })).toBeInTheDocument();
  });

  it("keeps the lower conversion cluster out of the mobile flow", async () => {
    const jsx = await WhyUsSection();
    render(jsx);

    const primaryCta = screen.getByRole("link", { name: "See how proactive tax planning works" });
    expect(primaryCta.closest(".hidden")).toHaveClass("hidden", "md:contents");
  });

  it("safely hides evidence module when evidenceModule={null} or enabled: false", async () => {
    const jsx = await WhyUsSection({ evidenceModule: null });
    render(jsx);

    expect(screen.queryByTestId("why-us-evidence-module")).not.toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HowItWorksSection } from "./HowItWorksSection";

vi.mock("next-intl/server", () => ({
  getTranslations: async () => (key: string) => {
    const messages: Record<string, string> = {
      eyebrow: "A clear path forward",
      title: "From your current setup to a year-round tax plan",
      subtitle: "See what happens first, what we evaluate, and the concrete plan you leave with.",
      listLabel: "How our strategy process works",
      "stepLabel": "Step {number} of {total}",
      outcomeLabel: "Outcome",
      cta: "Start with a Strategy Call",
      ctaSupport: "30-minute discovery call • No preparation required • Direct with an Enrolled Agent",
      "steps.start.title": "Start with a strategy call",
      "steps.start.description": "Share how the business is structured and how income flows.",
      "steps.start.outcome": "Documented diagnosis of entity structure and tax baseline",
      "steps.opportunities.title": "See the opportunities worth evaluating",
      "steps.opportunities.description": "We assess S-Corp eligibility and proactive planning opportunities.",
      "steps.opportunities.outcome": "Prioritized strategy roadmap with quantified potential tax savings",
      "steps.plan.title": "Put your yearly plan into motion",
      "steps.plan.description": "Receive documented decisions and checkpoints.",
      "steps.plan.outcome": "Year-round implementation schedule with quarterly review milestones",
      cadenceLoop: "Ongoing Cadence: We revisit your numbers every quarter to adapt your strategy as revenue and tax laws evolve.",
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

describe("HowItWorksSection", () => {
  it("renders with semantic section landmark and h2 heading", async () => {
    const jsx = await HowItWorksSection();
    render(jsx);

    const section = screen.getByRole("region", {
      name: /From your current setup to a year-round tax plan/i,
    });
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("id", "how-it-works");

    const heading = screen.getByRole("heading", {
      level: 2,
      name: /From your current setup to a year-round tax plan/i,
    });
    expect(heading).toHaveAttribute("id", "how-it-works-heading");
  });

  it("renders an ordered list containing 3 timeline step cards", async () => {
    const jsx = await HowItWorksSection();
    render(jsx);

    const list = screen.getByRole("list", { name: "How our strategy process works" });
    expect(list).toBeInTheDocument();

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);

    expect(screen.getAllByText("01").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("02").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("03").length).toBeGreaterThanOrEqual(1);
  });

  it("anchors badges and cards with swipeable mobile carousel layout classes", async () => {
    const jsx = await HowItWorksSection();
    render(jsx);

    const list = screen.getByRole("list", { name: "How our strategy process works" });
    expect(list).toHaveClass("snap-x");
    expect(list).toHaveClass("snap-mandatory");
    expect(list).toHaveClass("overflow-x-auto");

    const items = screen.getAllByRole("listitem");
    items.forEach((item) => {
      expect(item).toHaveClass("flex");
      expect(item).toHaveClass("snap-center");
      expect(item).toHaveClass("sm:gap-8");
      expect(item).toHaveClass("sm:pb-8");
    });
  });

  it("renders outcome deliverables using semantic definition list (dl/dt/dd)", async () => {
    const jsx = await HowItWorksSection();
    render(jsx);

    const outcomeLabels = screen.getAllByText(/Outcome:/i);
    expect(outcomeLabels).toHaveLength(3);

    // Assert that outcome label is rendered within a <dt>
    outcomeLabels.forEach((label) => {
      expect(label.tagName.toLowerCase()).toBe("dt");
    });

    expect(screen.getByText("Documented diagnosis of entity structure and tax baseline")).toBeInTheDocument();
    expect(screen.getByText("Prioritized strategy roadmap with quantified potential tax savings")).toBeInTheDocument();
    expect(screen.getByText("Year-round implementation schedule with quarterly review milestones")).toBeInTheDocument();
  });

  it("renders closing cadence loop element reinforcing year-round planning", async () => {
    const jsx = await HowItWorksSection();
    render(jsx);

    expect(
      screen.getByText(/Ongoing Cadence: We revisit your numbers every quarter/i)
    ).toBeInTheDocument();
  });

  it("renders custom 2-step sequence with dynamic numbering and attributes", async () => {
    const customTwoSteps = [
      {
        id: 1,
        title: "Initial Diagnostic",
        description: "Review current year tax liability and structure.",
        outcomeLabel: "Outcome",
        outcomeValue: "Tax health score report",
      },
      {
        id: 2,
        title: "Execute Strategy",
        description: "Implement S-Corp distributions and deductions.",
        outcomeLabel: "Outcome",
        outcomeValue: "Optimized tax filing",
      },
    ];

    const jsx = await HowItWorksSection({ steps: customTwoSteps });
    render(jsx);

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);

    expect(screen.getAllByText("01").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("02").length).toBeGreaterThanOrEqual(1);
    expect(screen.queryByText("03")).not.toBeInTheDocument();
    expect(screen.getByText("Tax health score report")).toBeInTheDocument();
    expect(screen.getByText("Optimized tax filing")).toBeInTheDocument();
  });

  it("renders custom 5-step sequence with dynamic numbering", async () => {
    const customFiveSteps = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      title: `Step Title ${i + 1}`,
      description: `Description for step ${i + 1}`,
      outcomeLabel: "Outcome",
      outcomeValue: `Deliverable ${i + 1}`,
    }));

    const jsx = await HowItWorksSection({ steps: customFiveSteps });
    render(jsx);

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(5);

    expect(screen.getAllByText("01").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("02").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("03").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("04").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("05").length).toBeGreaterThanOrEqual(1);
  });

  it("handles variable content lengths without breaking markup", async () => {
    const variableLengthSteps = [
      {
        id: 1,
        title: "Short Step",
        description: "Single line.",
        outcomeLabel: "Outcome",
        outcomeValue: "Short deliverable",
      },
      {
        id: 2,
        title: "A Much Longer Multi-Line Comprehensive Advisory Milestone",
        description:
          "This is an extensive four-line description designed to test boundary text wrapping and container height resilience when client accounts have complex multi-state entity structures and variable distribution flows across multiple jurisdictions.",
        outcomeLabel: "Outcome",
        outcomeValue:
          "A comprehensive 15-word multi-page binding roadmap detailing exact quarterly deadlines, payroll adjustments, retirement thresholds, and compliance checkpoints",
      },
    ];

    const jsx = await HowItWorksSection({ steps: variableLengthSteps });
    render(jsx);

    expect(
      screen.getByText(/This is an extensive four-line description/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/A comprehensive 15-word multi-page binding roadmap/i)
    ).toBeInTheDocument();
  });

  it("renders primary CTA with real anchor href and telemetry data attributes", async () => {
    const jsx = await HowItWorksSection();
    render(jsx);

    const section = screen.getByRole("region", {
      name: /From your current setup to a year-round tax plan/i,
    });
    expect(section).toHaveAttribute("data-analytics", "how_it_works_section");

    const link = screen.getByRole("link", { name: /Start with a Strategy Call/i });
    expect(link).toHaveAttribute("href", "/book");
    expect(link).toHaveAttribute("data-analytics", "how_it_works_cta_click");
    expect(link).toHaveAttribute("data-cta-placement", "how_it_works_section");
  });
});

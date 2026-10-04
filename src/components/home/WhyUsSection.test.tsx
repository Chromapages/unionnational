import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { WhyUsSection } from "./WhyUsSection";

vi.mock("next-intl/server", () => ({
  getTranslations: async () => (key: string) => {
    const messages: Record<string, string> = {
      eyebrow: "Proactive by design",
      title: "The tax return records what happened. Strategy happens earlier.",
      subtitle: "Year-round planning gives you time to evaluate options before deadlines close them.",
      headerInsightEyebrow1: "More insight",
      headerInsightEyebrow2: "A stronger tomorrow",
      headerInsightBody: "Proactive planning turns today's numbers into tomorrow's opportunities.",
      advantageEyebrow: "The proactive advantage",
      advantageTagline: "Same facts, a more strategic approach.",
      caption: "How tax support changes when planning starts before the deadline.",
      dimensionLabel: "What changes",
      traditionalLabel: "Traditional tax support",
      traditionalSubtitle: "Reactive. After the fact.",
      proactiveLabel: "Proactive tax strategy",
      proactiveSubtitle: "Strategic. Ongoing. Focused on what's next.",
      "rows.timing.dimension": "Timing",
      "rows.timing.traditional": "Files after the year closes",
      "rows.timing.traditionalDetail": "Decisions are no longer available.",
      "rows.timing.proactive": "Plans while decisions are still open",
      "rows.timing.proactiveDesktop": "Plans while decisions are still open",
      "rows.timing.proactiveDetail": "Helps you act before deadlines.",
      "rows.scope.dimension": "Scope",
      "rows.scope.traditional": "Confirms compliance",
      "rows.scope.traditionalDetail": "Focused on meeting requirements.",
      "rows.scope.proactive": "Evaluates entity, deduction, retirement, and S-Corp opportunities before deadlines",
      "rows.scope.proactiveDesktop": "Evaluates opportunities",
      "rows.scope.proactiveDetail": "Entity, deduction, retirement, and S-Corp strategies.",
      "rows.cadence.dimension": "Cadence",
      "rows.cadence.traditional": "Contact is mostly seasonal",
      "rows.cadence.traditionalDetail": "Typically once a year.",
      "rows.cadence.proactive": "Schedules planning checkpoints throughout the year",
      "rows.cadence.proactiveDesktop": "Year-round planning checkpoints",
      "rows.cadence.proactiveDetail": "Regular touchpoints keep you on track.",
      "rows.decisionSupport.dimension": "Decision support",
      "rows.decisionSupport.traditional": "Reports what happened",
      "rows.decisionSupport.traditionalDetail": "Looks backward at results.",
      "rows.decisionSupport.proactive": "Uses current numbers to guide tax and business decisions",
      "rows.decisionSupport.proactiveDesktop": "Uses current numbers to guide decisions",
      "rows.decisionSupport.proactiveDetail": "Looks forward to what's possible.",
      conclusion: "More time to plan means fewer decisions made under deadline pressure.",
      primaryCta: "Explore proactive tax planning",
      secondaryCta: "Check your S-Corp fit",
      recommendedBadge: "Recommended",
      emptyFallback: "Comparison details are being updated.",
      bannerEyebrow: "Plan further ahead",
      bannerSubtitle: "Turn today's insight into tomorrow's opportunity with proactive tax strategy designed around your goals.",
      "bannerPillars.strategy": "Strategy",
      "bannerPillars.clarity": "Clarity",
      "bannerPillars.opportunity": "Opportunity",
      "evidence.eyebrow": "How proactive planning works",
      "evidence.tagline": "A clearer path to a stronger future",
      "evidence.heading": "Turn proactive insight into a working plan",
      "evidence.step1.eyebrow": "Assess",
      "evidence.step1.label": "Review your current position",
      "evidence.step1.body": "Examine your entity structure, current revenue, and tax baseline.",
      "evidence.step2.eyebrow": "Plan",
      "evidence.step2.label": "Identify decisions before deadlines",
      "evidence.step2.body": "Surface deductions, retirement contributions, and S-Corp opportunities in advance.",
      "evidence.step3.eyebrow": "Adjust",
      "evidence.step3.label": "Plan and revisit throughout the year",
      "evidence.step3.body": "Maintain regular checkpoints as your business and tax situation evolve.",
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

  it("retains the mobile insight callout and advantage eyebrow bar", async () => {
    const jsx = await WhyUsSection();
    render(jsx);

    expect(screen.getByText("More insight")).toBeInTheDocument();
    expect(screen.getByText("A stronger tomorrow")).toBeInTheDocument();
    expect(screen.getByText("Proactive planning turns today's numbers into tomorrow's opportunities.")).toBeInTheDocument();
    expect(screen.getByText("The proactive advantage")).toBeInTheDocument();
    expect(screen.getByText("Same facts, a more strategic approach.")).toBeInTheDocument();
  });

  it("renders two distinct comparison cards with traditional and proactive details", async () => {
    const jsx = await WhyUsSection();
    render(jsx);

    const traditionalCard = screen.getByTestId("traditional-tax-card");
    const proactiveCard = screen.getByTestId("proactive-tax-card");

    expect(traditionalCard).toBeInTheDocument();
    expect(proactiveCard).toBeInTheDocument();

    expect(traditionalCard).toHaveTextContent("Traditional tax support");
    expect(traditionalCard).toHaveTextContent("Reactive. After the fact.");
    expect(traditionalCard).toHaveTextContent("Files after the year closes");

    expect(proactiveCard).toHaveTextContent("Proactive tax strategy");
    expect(proactiveCard).toHaveTextContent("Strategic. Ongoing. Focused on what's next.");
    expect(proactiveCard).toHaveTextContent("Plans while decisions are still open");

    expect(screen.getAllByText("Timing")).toHaveLength(2);
    expect(screen.getAllByText("Scope")).toHaveLength(2);
    expect(screen.getAllByText("Cadence")).toHaveLength(2);
    expect(screen.getAllByText("Decision support")).toHaveLength(2);
  });

  it("renders explicit recommended badge in proactive card header", async () => {
    const jsx = await WhyUsSection();
    render(jsx);

    const badge = screen.getByText("Recommended");
    expect(badge).toBeInTheDocument();
    expect(badge.closest("span")).toHaveAttribute(
      "aria-label",
      "Proactive tax strategy (Recommended)"
    );
  });

  it("renders comparison cards within a responsive grid container", async () => {
    const jsx = await WhyUsSection();
    render(jsx);

    const region = screen.getByRole("region", {
      name: "How tax support changes when planning starts before the deadline.",
    });
    expect(region).toBeInTheDocument();
    expect(region).toHaveClass("grid", "grid-cols-1", "md:grid-cols-2");
  });

  it("renders fallback notification when customRows is empty array", async () => {
    const jsx = await WhyUsSection({ customRows: [] });
    render(jsx);

    expect(screen.getByText("Comparison details are being updated.")).toBeInTheDocument();
    expect(screen.queryByTestId("traditional-tax-card")).not.toBeInTheDocument();
    expect(screen.queryByTestId("proactive-tax-card")).not.toBeInTheDocument();
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

    const traditionalCard = screen.getByTestId("traditional-tax-card");
    const dts = traditionalCard.querySelectorAll("dt");
    expect(dts[0]).toHaveTextContent("First Dimension");
    expect(dts[1]).toHaveTextContent("Second Dimension");
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

    expect(screen.getByTestId("traditional-tax-card")).toBeInTheDocument();
    expect(screen.getAllByText(veryLongText).length).toBeGreaterThan(0);
  });

  it("renders default Priority 1 evidence module with 3 planning steps", async () => {
    const jsx = await WhyUsSection();
    render(jsx);

    expect(screen.getByTestId("why-us-evidence-module")).toBeInTheDocument();
    expect(screen.getByText("Review your current position")).toBeInTheDocument();
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

    const primaryCta = screen.getByRole("link", { name: "Explore proactive tax planning" });
    expect(primaryCta.closest(".hidden")).toHaveClass("hidden", "md:contents");
  });

  it("safely hides evidence module when evidenceModule={null} or enabled: false", async () => {
    const jsx = await WhyUsSection({ evidenceModule: null });
    render(jsx);

    expect(screen.queryByTestId("why-us-evidence-module")).not.toBeInTheDocument();
  });
});

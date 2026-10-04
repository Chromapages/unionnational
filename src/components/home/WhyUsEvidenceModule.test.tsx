import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { WhyUsEvidenceModule } from "./WhyUsEvidenceModule";

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

describe("WhyUsEvidenceModule", () => {
  const sampleItems = [
    {
      id: "step-1",
      label: "Review current position",
      body: "Analyze current financials and entity structure before year-end.",
      optionalApprovedLink: {
        href: "/services/tax-planning",
        label: "Learn about review phase",
      },
    },
    {
      id: "step-2",
      label: "Identify decisions before deadlines",
      body: "Surface deductions and retirement contributions in advance.",
    },
    {
      id: "step-3",
      label: "Plan and revisit throughout the year",
      body: "Schedule quarterly checkpoints to adjust strategy.",
    },
  ];

  it("renders 3 process steps with numbers and descriptions", () => {
    render(
      <WhyUsEvidenceModule
        enabled={true}
        variant="process_strip"
        items={sampleItems}
        legalDisclaimer="Informational planning workflow disclaimer."
      />
    );

    const evidenceModule = screen.getByTestId("why-us-evidence-module");
    expect(evidenceModule).toBeInTheDocument();
    expect(evidenceModule).toHaveAttribute("data-evidence-variant", "process_strip");

    expect(screen.getByText("Review current position")).toBeInTheDocument();
    expect(screen.getByText("Identify decisions before deadlines")).toBeInTheDocument();
    expect(screen.getByText("Plan and revisit throughout the year")).toBeInTheDocument();

    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Review current position" })).toBeInTheDocument();
    expect(screen.getByRole("list").tagName).toBe("OL");

    expect(
      screen.getByText("Informational planning workflow disclaimer.")
    ).toBeInTheDocument();

    const link = screen.getByRole("link", { name: "Learn about review phase" });
    expect(link).toHaveAttribute("href", "/services/tax-planning");
  });

  it("renders nothing when enabled is false", () => {
    const { container } = render(
      <WhyUsEvidenceModule enabled={false} items={sampleItems} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders nothing when items array is empty", () => {
    const { container } = render(
      <WhyUsEvidenceModule enabled={true} items={[]} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders loading skeleton state when isLoading is true", () => {
    render(<WhyUsEvidenceModule enabled={true} isLoading={true} items={sampleItems} />);
    expect(screen.getByTestId("evidence-loading-state")).toBeInTheDocument();
    expect(screen.queryByTestId("why-us-evidence-module")).not.toBeInTheDocument();
  });

  it("renders error state when hasError is true", () => {
    render(
      <WhyUsEvidenceModule
        enabled={true}
        hasError={true}
        errorMessage="Custom error message"
      />
    );
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent("Custom error message");
  });

  it("caps rendering to maximum of 3 items even if more are supplied", () => {
    const fourItems = [
      ...sampleItems,
      {
        id: "step-4",
        label: "Fourth Step",
        body: "Should not be displayed.",
      },
    ];

    render(<WhyUsEvidenceModule enabled={true} items={fourItems} />);
    expect(screen.queryByText("Fourth Step")).not.toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });
});

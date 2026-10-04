import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { EstimatorResultsClient } from "./EstimatorResultsClient";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: React.ComponentPropsWithoutRef<"a"> & { href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock("./SavingsResultCard", () => ({
  SavingsResultCard: ({ estimatedSavings }: { estimatedSavings: number }) => <p>Saved estimate: {estimatedSavings}</p>,
}));

describe("EstimatorResultsClient", () => {
  afterEach(() => { cleanup(); sessionStorage.clear(); });

  it("offers a restart when no session estimate is available", async () => {
    render(<EstimatorResultsClient />);

    expect(await screen.findByRole("heading", { name: "Start your S-Corp estimate" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Start the assessment" })).toHaveAttribute("href", "/scorp-estimator");
  });

  it("recomputes the current illustration from session input instead of stale estimates or URL parameters", async () => {
    sessionStorage.setItem("scorp-estimator-result", JSON.stringify({
      firstName: "Jane",
      businessName: "Smith Consulting",
      estimatedNetProfit: 100000,
      estimatedSavings: 6120,
      suggestedSalary: 60000,
      distributions: 40000,
    }));

    render(<EstimatorResultsClient />);

    await waitFor(() => expect(screen.getByText("Saved estimate: 4950")).toBeInTheDocument());
  });

  it.each(["S_CORP", "C_CORP"])("shows a structure review without new-election numbers for %s", async (entityType) => {
    sessionStorage.setItem("scorp-estimator-result", JSON.stringify({
      firstName: "Jane", entityType, businessName: "Company", estimatedNetProfit: 200000,
      estimatedSavings: 15229, suggestedSalary: 85000, distributions: 115000,
    }));
    render(<EstimatorResultsClient />);
    expect(await screen.findByRole("heading", { name: "Your corporation calls for a structure review." })).toBeInTheDocument();
    expect(screen.queryByText(/Saved estimate:/)).not.toBeInTheDocument();
  });
});

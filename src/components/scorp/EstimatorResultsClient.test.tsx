import { render, screen, waitFor } from "@testing-library/react";
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
  afterEach(() => sessionStorage.clear());

  it("offers a restart when no session estimate is available", async () => {
    render(<EstimatorResultsClient />);

    expect(await screen.findByRole("heading", { name: "Start your S-Corp estimate" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Start the assessment" })).toHaveAttribute("href", "/scorp-estimator");
  });

  it("reads the submitted result from session storage instead of URL parameters", async () => {
    sessionStorage.setItem("scorp-estimator-result", JSON.stringify({
      firstName: "Jane",
      businessName: "Smith Consulting",
      estimatedNetProfit: 100000,
      estimatedSavings: 6120,
      suggestedSalary: 60000,
      distributions: 40000,
    }));

    render(<EstimatorResultsClient />);

    await waitFor(() => expect(screen.getByText("Saved estimate: 6120")).toBeInTheDocument());
  });
});

import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { EstimatorResultsClient } from "./EstimatorResultsClient";
import { calculateSCorpSavings } from "@/lib/scorp-advantage/calculator";
import { clearEstimatorResult, saveEstimatorResult } from "@/lib/scorp-advantage/result-storage";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: React.ComponentPropsWithoutRef<"a"> & { href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock("./SavingsResultCard", () => ({
  SavingsResultCard: ({ estimatedSavings }: { estimatedSavings: number }) => <p>Saved estimate: {estimatedSavings}</p>,
}));

describe("EstimatorResultsClient", () => {
  afterEach(() => { cleanup(); clearEstimatorResult(); });

  it("offers a restart when no session estimate is available", async () => {
    render(<EstimatorResultsClient />);

    expect(await screen.findByRole("heading", { name: "Start your S-Corp estimate" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Start the assessment" })).toHaveAttribute("href", "/scorp-estimator");
  });

  it("validates the current illustration from a minimal result summary", async () => {
    saveEstimatorResult(calculateSCorpSavings(100000));

    render(<EstimatorResultsClient />);

    await waitFor(() => expect(screen.getByText("Saved estimate: 4950")).toBeInTheDocument());
  });

  it.each(["S_CORP", "C_CORP"])("shows a structure review without new-election numbers for %s", async (entityType) => {
    saveEstimatorResult(calculateSCorpSavings(200000, entityType));
    render(<EstimatorResultsClient />);
    expect(await screen.findByRole("heading", { name: "Your corporation calls for a structure review." })).toBeInTheDocument();
    expect(screen.queryByText(/Saved estimate:/)).not.toBeInTheDocument();
  });
});

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SavingsEstimatorForm } from "./SavingsEstimatorForm";
afterEach(cleanup);

describe("SavingsEstimatorForm", () => {
  it("collects assessment inputs before required contact details", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<SavingsEstimatorForm onSubmit={onSubmit} isLoading={false} />);

    expect(screen.getByText("Business Structure")).toBeInTheDocument();
    expect(screen.queryByLabelText("First name")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Continue" }));
    expect(screen.getByText("Revenue & Profit")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Continue" }));
    expect(screen.getByText("Pain Point & Intent")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Continue" }));
    expect(screen.getByText("Assessment delivery")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone (optional)")).toBeInTheDocument();
    expect(screen.getByLabelText("Business name (optional)")).toBeInTheDocument();

    await user.type(screen.getByLabelText("First name"), "Jane");
    await user.type(screen.getByLabelText("Last name"), "Smith");
    await user.type(screen.getByLabelText("Email"), "jane@example.com");
    await user.click(screen.getByRole("button", { name: "See My Estimate" }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("keeps an out-of-range profit on the financial step with an actionable error", () => {
    render(<SavingsEstimatorForm onSubmit={vi.fn()} isLoading={false} />);
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    fireEvent.change(screen.getByLabelText("Estimated annual net profit as a number"), { target: { value: "1000001" } });
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    expect(screen.getByText("Revenue & Profit")).toBeInTheDocument();
    expect(screen.getByText(/between \$0 and \$1,000,000/)).toBeInTheDocument();
  });
});

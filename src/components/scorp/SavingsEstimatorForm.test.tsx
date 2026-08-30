import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SavingsEstimatorForm } from "./SavingsEstimatorForm";

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
});

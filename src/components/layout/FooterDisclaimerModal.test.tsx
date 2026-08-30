import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { FooterDisclaimerModal } from "./FooterDisclaimerModal";

describe("FooterDisclaimerModal", () => {
  it("opens the full approved content and restores focus after Escape", async () => {
    const user = userEvent.setup();
    render(<FooterDisclaimerModal label="Read Disclaimer" closeLabel="Close disclaimer" content="Approved legal copy." />);

    const trigger = screen.getByRole("button", { name: "Read Disclaimer" });
    await user.click(trigger);

    expect(screen.getByRole("dialog", { name: "Read Disclaimer" })).toBeInTheDocument();
    expect(screen.getByText("Approved legal copy.")).toBeInTheDocument();
    expect(screen.getByTestId("footer-disclaimer-close")).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});

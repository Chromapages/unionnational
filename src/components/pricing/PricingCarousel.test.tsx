import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { PricingCarousel } from "./PricingCarousel";

it("moves focus and selection with keyboard and labels the active panel", () => {
    render(<PricingCarousel advisoryView={<p>Advisory content</p>} taxPrepView={<p>Tax content</p>} comparisonView={<p>Comparison</p>} />);
    const advisory = screen.getByRole("tab", { name: "Advisory Plans" });
    const tax = screen.getByRole("tab", { name: "Tax Preparation" });
    advisory.focus();
    fireEvent.keyDown(advisory, { key: "ArrowRight" });
    expect(tax).toHaveFocus();
    expect(tax).toHaveAttribute("aria-selected", "true");
    expect(advisory).toHaveAttribute("tabindex", "-1");
    expect(screen.getByRole("tabpanel", { name: "Tax Preparation" })).toHaveTextContent("Tax content");
    fireEvent.keyDown(tax, { key: "Home" });
    expect(advisory).toHaveFocus();
});

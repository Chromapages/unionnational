import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { PricingCarousel } from "./PricingCarousel";

it("moves focus and selection with keyboard and labels the active panel", () => {
    render(<PricingCarousel advisoryView={<p>Advisory content</p>} taxPrepView={<p>Tax content</p>} />);
    const advisory = screen.getByRole("tab", { name: "All offers" });
    const tax = screen.getByRole("tab", { name: "Tax returns" });
    advisory.focus();
    fireEvent.keyDown(advisory, { key: "ArrowRight" });
    expect(tax).toHaveFocus();
    expect(tax).toHaveAttribute("aria-selected", "true");
    expect(advisory).toHaveAttribute("tabindex", "-1");
    expect(screen.getByRole("tabpanel", { name: "Tax returns" })).toHaveTextContent("Tax content");
    fireEvent.keyDown(tax, { key: "Home" });
    expect(advisory).toHaveFocus();
});

it("localizes tab and panel names without an unsupported comparison", () => {
    render(<PricingCarousel locale="es" advisoryView={<p>Servicios</p>} taxPrepView={<p>Impuestos</p>} />);
    expect(screen.getByRole("tablist", { name: "Categorías de precios" })).toBeInTheDocument();
    const tax = screen.getByRole("tab", { name: "Declaraciones" });
    fireEvent.click(tax);
    expect(screen.getByRole("tabpanel", { name: "Declaraciones" })).toHaveTextContent("Impuestos");
    expect(screen.queryByText("Compare all plans")).not.toBeInTheDocument();
});

it("renders one offer view without redundant tabs", () => {
    render(<PricingCarousel hideTaxPrep advisoryView={<p>One offer</p>} taxPrepView={null} />);
    expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
    expect(screen.getByText("One offer")).toBeInTheDocument();
});

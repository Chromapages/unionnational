import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { FAQAccordion } from "./FAQAccordion";

it("keeps other callers collapsed and lets the Shop open and switch answers", () => {
    const items = [
        { _id: "formats", question: "Formats?", answer: "Confirmed formats.", category: "FAQ" },
        { _id: "delivery", question: "Delivery?", answer: "Confirmed delivery guidance.", category: "FAQ" },
    ];
    const standard = render(<FAQAccordion items={items} />);
    expect(screen.getByRole("button", { name: "Formats?" })).toHaveAttribute("aria-expanded", "false");
    standard.unmount();

    render(<FAQAccordion items={items} variant="soft" initialOpenId="formats" />);
    expect(screen.getByRole("button", { name: "Formats?" })).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(screen.getByRole("button", { name: "Delivery?" }));
    expect(screen.getByRole("button", { name: "Formats?" })).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("button", { name: "Delivery?" })).toHaveAttribute("aria-expanded", "true");
    expect(document.getElementById("faq-answer-delivery")).toHaveTextContent("Confirmed delivery guidance.");
});

it("falls back to an available category after items change", () => {
    const view = render(<FAQAccordion items={[{ _id: "tax", question: "Tax?", answer: "Tax answer", category: "Tax" }]} />);
    view.rerender(<FAQAccordion items={[{ _id: "payroll", question: "Payroll?", answer: "Payroll answer", category: "Payroll" }]} />);
    expect(screen.getByRole("button", { name: "Payroll?" })).toBeInTheDocument();
});

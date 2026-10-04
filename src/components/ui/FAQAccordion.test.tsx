import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { FAQAccordion } from "./FAQAccordion";

it("exposes expanded state and hides collapsed answers", () => {
    render(<FAQAccordion items={[{ question: "Question?", answer: "Answer." }]} />);
    const trigger = screen.getByRole("button", { name: "Question?" });
    const panel = document.getElementById(trigger.getAttribute("aria-controls")!);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(panel).toHaveAttribute("hidden");
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(panel).not.toHaveAttribute("hidden");
});

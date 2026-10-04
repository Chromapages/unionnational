import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { FAQList } from "./FAQList";

const localeState = vi.hoisted(() => ({ locale: "en" }));
vi.mock("next-intl", () => ({ useLocale: () => localeState.locale }));
vi.mock("@/components/ui/RevealOnScroll", () => ({ RevealOnScroll: ({ children }: { children: ReactNode }) => <div>{children}</div> }));

describe("FAQList filtering", () => {
    beforeEach(() => { localeState.locale = "en"; });
    const items = [
        { _id: "tax", question: "Tax planning?", answer: "Tax guidance.", category: "Taxes" },
        { _id: "payroll", question: "Payroll help?", answer: [{ _type: "block" as const, _key: "answer", children: [{ _type: "span" as const, _key: "span", text: "Payroll compliance guidance." }] }], category: "Payroll" },
    ];

    it("shows answers from a newly selected outer category", () => {
        render(<FAQList items={items} />);
        fireEvent.click(screen.getByRole("button", { name: "Payroll" }));
        expect(screen.getByRole("button", { name: "Payroll help?" })).toBeInTheDocument();
        expect(screen.queryByRole("button", { name: "Tax planning?" })).toBeNull();
    });

    it("searches rich-text answers and exposes a named clear action", () => {
        render(<FAQList items={items} />);
        fireEvent.change(screen.getByRole("searchbox", { name: "Search answers" }), { target: { value: "compliance" } });
        expect(screen.getByRole("button", { name: "Payroll help?" })).toBeInTheDocument();
        fireEvent.click(screen.getByRole("button", { name: "Clear search" }));
        expect(screen.getByRole("searchbox")).toHaveValue("");
        expect(screen.getByRole("searchbox")).toHaveFocus();
    });

    it("renders and searches CMS localized answers in Spanish", () => {
        localeState.locale = "es";
        render(<FAQList items={[{
            _id: "localized", question: { en: "Payroll?", es: "¿Nómina?" }, category: "Payroll",
            answer: { _type: "localizedBlock", en: items[1].answer, es: [{ _type: "block", _key: "spanish", children: [{ _type: "span", _key: "text", text: "Cumplimiento de nómina." }] }] },
        }, { _id: "null", question: "Missing answer?", category: "General", answer: null }]} />);
        fireEvent.change(screen.getByRole("searchbox", { name: "Buscar respuestas" }), { target: { value: "cumplimiento" } });
        const question = screen.getByRole("button", { name: "¿Nómina?" });
        fireEvent.click(question);
        expect(screen.getByText("Cumplimiento de nómina.")).toBeInTheDocument();
        expect(screen.queryByRole("button", { name: "Missing answer?" })).toBeNull();
    });

    it("searches English content when the CMS returns a localized object", () => {
        render(<FAQList items={[{ _id: "localized", question: "Payroll?", category: "Payroll", answer: { en: items[1].answer, es: [] } },
            { _id: "broken", question: "Broken?", category: "General", answer: { unexpected: 42 } }]} />);
        fireEvent.change(screen.getByRole("searchbox"), { target: { value: "compliance" } });
        fireEvent.click(screen.getByRole("button", { name: "Payroll?" }));
        expect(screen.getByText("Payroll compliance guidance.")).toBeInTheDocument();
    });
});

import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FAQAccordion } from "./FAQAccordion";
import { FAQSection } from "./FAQSection";
import { reviewedScorpService } from "@/lib/scorp/service-content";
import type { ServicePage } from "@/types/sanity";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

const state = vi.hoisted(() => ({ reduceMotion: true, locale: "en" as "en" | "es", fetch: vi.fn() }));
vi.mock("framer-motion", async (importOriginal) => ({
    ...await importOriginal<typeof import("framer-motion")>(),
    useReducedMotion: () => state.reduceMotion,
}));
vi.mock("@/sanity/lib/live", () => ({ sanityFetch: state.fetch }));
vi.mock("next-intl/server", () => ({
    getLocale: async () => state.locale,
    getTranslations: async () => {
        const messages = state.locale === "es" ? es.ContactPage.FAQSection : en.ContactPage.FAQSection;
        return (key: keyof typeof messages) => messages[key];
    },
}));
beforeEach(() => { state.reduceMotion = true; state.locale = "en"; state.fetch.mockReset(); });
afterEach(cleanup);

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

describe("FAQ visitor interactions", () => {
    const items = [
        { _id: "tax-one", question: "How does the review start?", answer: "Start with the entity review.", category: "Tax" },
        { _id: "tax-two", question: "What should I prepare?", answer: "Prepare current books.", category: "Tax" },
        { _id: "tax-three", question: "How are recommendations made?", answer: "Use documented business facts.", category: "Tax" },
        { _id: "pay-one", question: "How does payroll start?", answer: "Review payroll requirements.", category: "Payroll" },
        { _id: "pay-two", question: "When are payroll records reviewed?", answer: "Review them each pay period.", category: "Payroll" },
        { _id: "pay-three", question: "Who coordinates payroll?", answer: "The assigned payroll team.", category: "Payroll" },
    ];

    it("resets the open answer and expanded question limit when categories change", async () => {
        const user = userEvent.setup();
        render(<FAQAccordion items={items} initialLimit={1} />);
        expect(screen.getByRole("button", { name: "Tax" })).toHaveAttribute("aria-pressed", "true");
        expect(screen.queryByRole("button", { name: "What should I prepare?" })).not.toBeInTheDocument();
        await user.click(screen.getByRole("button", { name: "How does the review start?" }));
        expect(screen.getByText("Start with the entity review.")).toBeInTheDocument();
        await user.click(screen.getByRole("button", { name: "View all 3 questions" }));
        await user.click(screen.getByRole("button", { name: "What should I prepare?" }));
        expect(screen.getByRole("button", { name: "How does the review start?" })).toHaveAttribute("aria-expanded", "false");
        expect(screen.getByRole("button", { name: "What should I prepare?" })).toHaveAttribute("aria-expanded", "true");
        await user.click(screen.getByRole("button", { name: "Show fewer questions" }));
        expect(screen.queryByRole("button", { name: "What should I prepare?" })).not.toBeInTheDocument();
        await user.click(screen.getByRole("button", { name: "Payroll" }));
        expect(screen.getByRole("button", { name: "Payroll" })).toHaveAttribute("aria-pressed", "true");
        expect(screen.getByRole("button", { name: "Tax" })).toHaveAttribute("aria-pressed", "false");
        expect(screen.getByRole("button", { name: "How does payroll start?" })).toHaveAttribute("aria-expanded", "false");
        expect(screen.queryByRole("button", { name: "When are payroll records reviewed?" })).not.toBeInTheDocument();
        expect(screen.queryByText("Prepare current books.")).not.toBeInTheDocument();
    });

    it("lets keyboard users open and close answers without category filters or a question limit", async () => {
        const user = userEvent.setup();
        state.reduceMotion = false;
        render(<FAQAccordion items={items.slice(0, 2)} variant="dark" showCategoryFilters={false} initialLimit={0} />);
        expect(screen.queryByRole("button", { name: "Tax" })).not.toBeInTheDocument();
        expect(screen.queryByRole("button", { name: /View all/ })).not.toBeInTheDocument();
        await user.tab();
        const trigger = screen.getByRole("button", { name: "How does the review start?" });
        expect(trigger).toHaveFocus();
        await user.keyboard("{Enter}");
        expect(trigger).toHaveAttribute("aria-expanded", "true");
        expect(document.getElementById(trigger.getAttribute("aria-controls")!)).toHaveTextContent("Start with the entity review.");
        await user.keyboard(" ");
        expect(trigger).toHaveAttribute("aria-expanded", "false");
        await waitFor(() => expect(document.getElementById(trigger.getAttribute("aria-controls")!)).not.toBeInTheDocument());
    });

    it("shows localized rich answers with emphasis/lists while preserving safe destinations and rejecting executable links", () => {
        const span = (text: string, marks: string[] = []) => ({ _type: "span", _key: text, text, marks });
        const answer = [
            { _type: "block", _key: "intro", style: "normal", children: [span("Revisión documentada", ["strong"]), span(" y seguimiento", ["em"])], markDefs: [] },
            { _type: "block", _key: "bullet", style: "normal", listItem: "bullet", level: 1, children: [span("Revise la entidad")], markDefs: [] },
            { _type: "block", _key: "number", style: "normal", listItem: "number", level: 1, children: [span("Prepare los registros")], markDefs: [] },
            { _type: "block", _key: "links", style: "normal", children: [span("Read guidance", ["external"]), span("Book review", ["internal"]), span("Send a question", ["contact"]), span("Unsafe destination", ["unsafe"])], markDefs: [
                { _key: "external", _type: "link", href: "https://guidance.example.test/review" },
                { _key: "internal", _type: "link", href: "/book" },
                { _key: "contact", _type: "link", href: "mailto:review@example.test" },
                { _key: "unsafe", _type: "link", href: "javascript:alert(1)" },
            ] },
        ];
        render(<FAQAccordion items={[{ _id: "localized", question: "¿Cómo funciona?", answer: { en: "English fallback should stay hidden.", es: answer }, category: "General" }]} variant="soft" locale="es" initialOpenId="localized" />);
        const panel = document.getElementById("faq-answer-localized")!;
        expect(within(panel).getByText("Revisión documentada").tagName).toBe("STRONG");
        expect(within(panel).getByText("y seguimiento").tagName).toBe("EM");
        expect(within(panel).getAllByRole("list").map((list) => list.tagName)).toEqual(["UL", "OL"]);
        expect(within(panel).getAllByRole("listitem")).toHaveLength(2);
        expect(within(panel).getByRole("link", { name: "Read guidance" })).toHaveAttribute("rel", "noreferrer noopener");
        expect(within(panel).getByRole("link", { name: "Book review" })).toHaveAttribute("href", "/book");
        expect(within(panel).getByRole("link", { name: "Book review" })).not.toHaveAttribute("rel");
        expect(within(panel).getByRole("link", { name: "Send a question" })).toHaveAttribute("href", "mailto:review@example.test");
        expect(within(panel).getByText("Unsafe destination")).toBeInTheDocument();
        expect(within(panel).queryByRole("link", { name: "Unsafe destination" })).not.toBeInTheDocument();
        expect(screen.queryByText("English fallback should stay hidden.")).not.toBeInTheDocument();
    });

    it("uses an available approved answer when a localized field is empty and handles an empty CMS list", () => {
        const view = render(<FAQAccordion items={[{ _id: "fallback", question: "¿Qué sigue?", answer: { es: [], en: "Review the agreed scope before proceeding." }, category: "General" }]} locale="es" initialOpenId="fallback" />);
        expect(screen.getByText("Review the agreed scope before proceeding.")).toBeInTheDocument();
        view.rerender(<FAQAccordion items={[]} initialLimit={2} />);
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
        expect(screen.queryByText("Review the agreed scope before proceeding.")).not.toBeInTheDocument();
    });

    it("renders approved S-Corp FAQ answers while withholding numeric savings and bypass claims from the reviewed CMS journey", async () => {
        const user = userEvent.setup();
        const page: ServicePage = {
            _id: "reviewed-journey", _type: "servicePage", _rev: "fixture", _createdAt: "2026-10-05T00:00:00Z", _updatedAt: "2026-10-05T00:00:00Z",
            title: "S-Corp", slug: { current: "s-corp-tax-advantage" }, canonicalPath: "/s-corp-tax-advantage",
            hero: { eyebrow: "Evaluation", headline: "Review first", subheadline: "A scoped decision.", primaryCta: { label: "Review", href: "/book" } },
            comparison: { heading: "Review", description: "Evaluate the requirements.", pairs: [] }, process: { heading: "Process", steps: [] },
            included: { heading: "Included", items: [] }, closing: { heading: "Next step", label: "Review", href: "/book" },
            faqSection: { heading: "Questions", items: [
                { question: "How does the evaluation start?", answer: "Review profit, compensation, and payroll obligations." },
                { question: "Is a fixed saving promised?", answer: "Save $12000 guaranteed." },
                { question: "Is a percentage guaranteed?", answer: "Save 25% every year." },
                { question: "Can obligations be bypassed?", answer: "Bypass payroll obligations." },
                { question: " ", answer: "An empty question is not approved content." },
                { question: "Is an empty draft ready?", answer: " " },
            ] },
        };
        const reviewed = reviewedScorpService(page, "es");
        render(<FAQAccordion items={reviewed.faqSection.items.map((item, index) => ({ ...item, _id: `reviewed-${index}`, category: "Evaluation" }))} variant="soft" />);
        expect(screen.getAllByRole("button")).toHaveLength(1);
        await user.click(screen.getByRole("button", { name: "How does the evaluation start?" }));
        expect(screen.getByText("Review profit, compensation, and payroll obligations.")).toBeInTheDocument();
        expect(screen.queryByRole("button", { name: "Is a fixed saving promised?" })).not.toBeInTheDocument();
        expect(screen.queryByRole("button", { name: "Is a percentage guaranteed?" })).not.toBeInTheDocument();
        expect(screen.queryByRole("button", { name: "Can obligations be bypassed?" })).not.toBeInTheDocument();
    });
});

describe("actual CMS FAQ section", () => {
    it.each([null, []])("withholds the section when CMS has no published questions (%j)", async (data) => {
        state.fetch.mockResolvedValue({ data });
        expect(await FAQSection({})).toBeNull();
    });

    it("requests the active locale and lets visitors expand the loaded published questions", async () => {
        const user = userEvent.setup();
        state.locale = "es";
        state.fetch.mockResolvedValue({ data: [
            { _id: "start", question: "¿Cómo empezamos?", answer: "Revisamos la entidad y sus registros.", category: "General" },
            { _id: "records", question: "¿Qué registros preparo?", answer: "Prepare los libros actuales.", category: "General" },
        ] });
        render(await FAQSection({ variant: "dark", initialLimit: 1 }));
        expect(state.fetch).toHaveBeenCalledWith(expect.objectContaining({ params: { locale: "es" } }));
        expect(screen.getByRole("heading", { name: es.ContactPage.FAQSection.title })).toBeInTheDocument();
        expect(screen.queryByRole("button", { name: "¿Qué registros preparo?" })).not.toBeInTheDocument();
        await user.click(screen.getByRole("button", { name: "¿Cómo empezamos?" }));
        expect(screen.getByText("Revisamos la entidad y sus registros.")).toBeInTheDocument();
        await user.click(screen.getByRole("button", { name: "View all 2 questions" }));
        await user.click(screen.getByRole("button", { name: "¿Qué registros preparo?" }));
        expect(screen.getByText("Prepare los libros actuales.")).toBeInTheDocument();
    });
});

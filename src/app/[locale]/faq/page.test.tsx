import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import en from "@/messages/en.json";
import es from "@/messages/es.json";
import FAQPage from "./page";

const currentLocale = vi.hoisted(() => ({ value: "en", overrideItems: false, items: undefined as unknown, reject: false }));
vi.mock("next-intl", () => ({ useLocale: () => currentLocale.value }));
vi.mock("next-intl/server", () => ({
    getLocale: async () => currentLocale.value,
    getTranslations: async ({ locale }: { locale: string }) => {
        if (currentLocale.reject) throw new Error("Translations unavailable");
        const copy = locale === "es" ? es.ServicesPage.FAQ : en.ServicesPage.FAQ;
        return Object.assign((key: "eyebrow") => copy[key], {
            has: () => true,
            raw: (key: "items") => currentLocale.overrideItems ? currentLocale.items : copy[key],
        });
    },
}));
vi.mock("@/components/layout/HeaderWrapper", () => ({ HeaderWrapper: () => null }));
vi.mock("@/components/layout/Footer", () => ({ Footer: () => null }));
vi.mock("@/components/ui/RevealOnScroll", () => ({ RevealOnScroll: ({ children }: { children: ReactNode }) => <div>{children}</div> }));
vi.mock("next/link", () => ({ default: ({ children, ...props }: ComponentPropsWithoutRef<"a">) => <a {...props}>{children}</a> }));
vi.mock("@/i18n/navigation", () => ({
    Link: ({ href, children, ...props }: ComponentPropsWithoutRef<"a"> & { href: string }) => <a {...props} href={`/${currentLocale.value}${href}`}>{children}</a>,
}));

beforeEach(() => {
    currentLocale.value = "en";
    currentLocale.overrideItems = false;
    currentLocale.items = undefined;
    currentLocale.reject = false;
});
afterEach(cleanup);

it.each(["en", "es"])("keeps the FAQ booking CTA in the %s booking journey", async locale => {
    currentLocale.value = locale;
    const page = await FAQPage({ params: Promise.resolve({ locale }) });
    render(page);
    expect(screen.getByRole("link", { name: "Book Free Strategy Call" })).toHaveAttribute("href", `/${locale}/book`);
    expect(screen.getByRole("link", { name: "Email Our Team" })).toHaveAttribute("href", "mailto:support@unionnationaltax.com");
});

it.each(["en", "es"])("renders approved %s catalog FAQs with matching visible answers and structured data", async locale => {
    currentLocale.value = locale;
    const copy = locale === "es" ? es.ServicesPage.FAQ : en.ServicesPage.FAQ;
    const { container } = render(await FAQPage({ params: Promise.resolve({ locale }) }));
    for (const item of copy.items) {
        const question = screen.getByRole("button", { name: item.question });
        fireEvent.click(question);
        expect(await screen.findByText(item.answer)).toBeInTheDocument();
    }
    const structuredData = JSON.parse(container.querySelector('script[type="application/ld+json"]')!.textContent!);
    expect(structuredData.mainEntity).toEqual(copy.items.map(item => ({
        "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer },
    })));
    const search = screen.getByRole("searchbox");
    fireEvent.change(search, { target: { value: copy.items[1].question } });
    expect(screen.getByRole("button", { name: copy.items[1].question })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: copy.items[0].question })).toBeNull();
});

it.each([
    { name: "missing items", items: undefined },
    { name: "translation-key fallback", items: "ServicesPage.FAQ.items" },
    { name: "malformed collection", items: { error: "invalid" } },
])("keeps contact access and the existing empty state for $name", async ({ items }) => {
    currentLocale.value = "es";
    currentLocale.overrideItems = true;
    currentLocale.items = items;
    const { container } = render(await FAQPage({ params: Promise.resolve({ locale: "es" }) }));
    expect(screen.getByRole("heading", { name: "No se encontraron respuestas" })).toBeInTheDocument();
    expect(container.querySelector('a[href="/es/book"]')).not.toBeNull();
    expect(container.querySelector('script[type="application/ld+json"]')).toBeNull();
});

it("keeps the FAQ empty state and contact path after a rejected translation read", async () => {
    currentLocale.reject = true;
    const { container } = render(await FAQPage({ params: Promise.resolve({ locale: "en" }) }));
    expect(screen.getByRole("heading", { name: "No answers found" })).toBeInTheDocument();
    expect(container.querySelector('a[href="/en/book"]')).not.toBeNull();
    expect(container.querySelector('script[type="application/ld+json"]')).toBeNull();
});

it("keeps valid answers while excluding malformed rows from both the UI and schema", async () => {
    currentLocale.overrideItems = true;
    currentLocale.items = [null, { question: "Incomplete" }, { question: { text: "Not catalog text" }, answer: "Invalid" }, { question: "   ", answer: "Empty question" }, { question: "Valid question", answer: "Approved answer" }];
    const { container } = render(await FAQPage({ params: Promise.resolve({ locale: "en" }) }));
    fireEvent.click(screen.getByRole("button", { name: "Valid question" }));
    expect(screen.getByText("Approved answer")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Incomplete" })).toBeNull();
    const schema = JSON.parse(container.querySelector('script[type="application/ld+json"]')!.textContent!);
    expect(schema.mainEntity).toEqual([{ "@type": "Question", name: "Valid question", acceptedAnswer: { "@type": "Answer", text: "Approved answer" } }]);
});

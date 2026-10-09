import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it, vi } from "vitest";
import en from "@/messages/en.json";
import es from "@/messages/es.json";
import { ClientInsightSection } from "./ClientInsightSection";

vi.mock("@/i18n/navigation", () => ({
    Link: (props: React.ComponentPropsWithoutRef<"a">) => <a {...props} />,
}));

describe("Compact client insight", () => {
    it.each([
        { locale: "en", messages: en, label: "Explore construction support" },
        { locale: "es", messages: es, label: "Explore el apoyo para construcción" },
    ])("labels its construction destination accurately in $locale", ({ locale, messages, label }) => {
        render(<NextIntlClientProvider locale={locale} messages={messages}><ClientInsightSection compact /></NextIntlClientProvider>);
        expect(screen.getByRole("link", { name: label })).toHaveAttribute("href", "/industries/construction");
        expect(screen.queryByRole("link", { name: messages.ClientInsight.summary.readStory })).toBeNull();
        expect(screen.getByText(`“${messages.HomePage.TestimonialsSection.featured.perspectiveQuote}”`)).toBeVisible();
    });
});

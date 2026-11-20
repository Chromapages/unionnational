import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { NextIntlClientProvider } from "next-intl";
import en from "@/messages/en.json";
import es from "@/messages/es.json";
import { PricingSection } from "./PricingSection";
import { PricingCarousel } from "./PricingCarousel";

it("moves focus and selection with keyboard and labels the active panel", () => {
    render(
        <NextIntlClientProvider locale="en" messages={en}>
            <PricingCarousel advisoryView={<p>Advisory content</p>} taxPrepView={<p>Tax content</p>} comparisonView={<p>Comparison</p>} />
        </NextIntlClientProvider>,
    );
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

it.each([
    { locale: "en", messages: en, contact: "Contact us for pricing.", tax: "Tax Preparation" },
    { locale: "es", messages: es, contact: "Contáctanos para conocer los precios.", tax: "Preparación de impuestos" },
])("shows a local contact link and keeps tax preparation separate without advisory tiers ($locale)", ({ locale, messages, contact, tax }) => {
    render(<NextIntlClientProvider locale={locale} messages={messages}><PricingSection tiers={[]} hasAdvisoryTiers={false} /></NextIntlClientProvider>);

    expect(screen.getByRole("link", { name: contact })).toHaveAttribute("href", `/${locale}/contact`);
    expect(screen.queryByText("Compare all plans")).not.toBeInTheDocument();
    expect(screen.queryByText("3-Year Audit Protection")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: tax }));
    expect(screen.getByRole("tabpanel", { name: tax })).toHaveTextContent("$595+");
    expect(screen.getByText("3-Year Audit Protection")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: contact })).not.toBeInTheDocument();
});

it("retains the populated advisory cards and comparison", () => {
    const tier = { _id: "fixture", name: "Foundation", slug: { current: "foundation" }, category: "advisory" };
    render(<NextIntlClientProvider locale="en" messages={en}><PricingSection tiers={[tier]} hasAdvisoryTiers /></NextIntlClientProvider>);

    expect(screen.getByRole("heading", { name: "Foundation" })).toBeInTheDocument();
    expect(screen.getByText("Compare all plans")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Contact us for pricing." })).not.toBeInTheDocument();
});

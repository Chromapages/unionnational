import { render, screen, within } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it, vi } from "vitest";
import en from "@/messages/en.json";
import es from "@/messages/es.json";
import { TaxResolutionSection } from "./TaxResolutionSection";

vi.mock("@/i18n/navigation", () => ({
    Link: (props: React.ComponentPropsWithoutRef<"a">) => <a {...props} />,
}));

describe("Back Taxes & IRS Tax Resolution", () => {
    it.each(["en", "es"] as const)("offers one detail-page path without adding claims or sensitive fields in %s", locale => {
        const messages = locale === "es" ? es : en;
        render(<NextIntlClientProvider locale={locale} messages={messages}><TaxResolutionSection /></NextIntlClientProvider>);
        const section = screen.getByRole("region", { name: "Back Taxes & IRS Tax Resolution" });
        expect(within(section).getByRole("heading", { level: 2 })).toHaveTextContent("Back Taxes & IRS Tax Resolution");
        expect(within(section).getByText(messages.TaxResolution.intro)).toBeVisible();
        expect(within(section).getAllByRole("heading", { level: 3 }).map(heading => heading.textContent)).toEqual([
            messages.TaxResolution.filings.title, messages.TaxResolution.balance.title,
        ]);
        expect(within(section).getAllByRole("link")).toHaveLength(1);
        expect(within(section).getByRole("link", { name: messages.TaxResolution.detailLink })).toHaveAttribute("href", "/back-taxes-irs-tax-resolution");
        expect(section.querySelector("form,input,textarea,select")).toBeNull();
        expect(section.textContent).not.toMatch(/\$|\d+%|guarantee|pennies|free consultation|offer in compromise|penalty abatement|installment agreement|audit representation/i);
    });
});

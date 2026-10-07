import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { ComponentPropsWithoutRef } from "react";
import en from "@/messages/en.json";
import es from "@/messages/es.json";
import { HomeTaxResolutionSection } from "./HomeTaxResolutionSection";

const locale = vi.hoisted(() => ({ value: "en" }));
vi.mock("next-intl/server", () => ({ getTranslations: async () => {
    const copy = (locale.value === "es" ? es : en).ConsumerHome.taxResolution;
    return (key: keyof typeof copy) => copy[key];
} }));
vi.mock("@/i18n/navigation", () => ({ Link: (props: ComponentPropsWithoutRef<"a">) => <a {...props} /> }));

describe("homepage tax-resolution presentation", () => {
    it.each(["en", "es"])("keeps one detail link, two needs and a safe next step in %s", async language => {
        locale.value = language;
        const copy = (language === "es" ? es : en).ConsumerHome.taxResolution;
        render(await HomeTaxResolutionSection());
        const section = screen.getByRole("region", { name: copy.serviceTitle });
        expect(within(section).getByRole("heading", { level: 2 })).toHaveTextContent(`${copy.titleLead} ${copy.titleNext}`);
        expect(within(section).getAllByRole("listitem")).toHaveLength(2);
        expect(within(section).getByText(copy.nextDescription)).toBeVisible();
        expect(within(section).getByText(copy.privacyNote)).toBeVisible();
        expect(within(section).getAllByRole("link")).toHaveLength(1);
        expect(within(section).getByRole("link", { name: copy.cta })).toHaveAttribute("href", "/back-taxes-irs-tax-resolution");
        expect(section.querySelector("form,input,textarea,select,h1")).toBeNull();
        expect(section.textContent).not.toMatch(/\$|\d+%|guarantee|pennies|free consultation|offer in compromise|penalty abatement|installment agreement|audit representation/i);
    });
});

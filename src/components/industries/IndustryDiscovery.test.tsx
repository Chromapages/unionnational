import { render, screen, within } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it, vi } from "vitest";
import { IndustryDiscovery } from "./IndustryDiscovery";

vi.mock("@/i18n/navigation", () => ({
    Link: (props: React.ComponentPropsWithoutRef<"a">) => <a {...props} />,
}));

describe("Industry discovery", () => {
    it.each([
        { locale: "en", heading: "Specialized services for restaurants and construction.", actions: ["Explore restaurant services", "Explore construction services"] },
        { locale: "es", heading: "Servicios especializados para restaurantes y construcción.", actions: ["Explorar servicios para restaurantes", "Explorar servicios para construcción"] },
    ])("highlights the two original services without unsupported claims in $locale", ({ locale, heading, actions }) => {
        render(<NextIntlClientProvider locale={locale} messages={{}}><IndustryDiscovery /></NextIntlClientProvider>);
        const section = screen.getByRole("region", { name: heading });
        const links = within(section).getAllByRole("link");
        expect(links).toHaveLength(2);
        expect(links.map(link => link.getAttribute("href"))).toEqual(["/industries/restaurants", "/industries/construction"]);
        expect(links[0].className).toBe(links[1].className);
        actions.forEach(action => expect(within(section).getByRole("link", { name: new RegExp(action) })).toBeVisible());
        expect(within(section).getAllByRole("heading", { level: 3 })).toHaveLength(2);
        expect(section.querySelector("form,input,textarea,select,img")).toBeNull();
        expect(section.textContent).toMatch(/CFO/);
        expect(section.textContent).not.toMatch(/COO|guarantee|\$|\d+%|Torres|audit protection/i);
    });
});

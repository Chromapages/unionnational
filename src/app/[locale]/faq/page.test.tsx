import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import FAQPage from "./page";

const currentLocale = vi.hoisted(() => ({ value: "en" }));
vi.mock("@/sanity/lib/live", () => ({ sanityFetch: async () => ({ data: [] }) }));
vi.mock("@/sanity/lib/queries", () => ({ FAQ_QUERY: "faq" }));
vi.mock("next-intl/server", () => ({ getLocale: async () => currentLocale.value }));
vi.mock("@/components/seo/FAQPageSchema", () => ({ FAQPageSchema: () => null }));
vi.mock("@/components/layout/HeaderWrapper", () => ({ HeaderWrapper: () => null }));
vi.mock("@/components/layout/Footer", () => ({ Footer: () => null }));
vi.mock("@/components/faq/FAQList", () => ({ FAQList: () => null }));
vi.mock("@/components/ui/RevealOnScroll", () => ({ RevealOnScroll: ({ children }: { children: ReactNode }) => <div>{children}</div> }));
vi.mock("next/link", () => ({ default: ({ children, ...props }: ComponentPropsWithoutRef<"a">) => <a {...props}>{children}</a> }));
vi.mock("@/i18n/navigation", () => ({
    Link: ({ href, children, ...props }: ComponentPropsWithoutRef<"a"> & { href: string }) => <a {...props} href={`/${currentLocale.value}${href}`}>{children}</a>,
}));

it.each(["en", "es"])("keeps the FAQ booking CTA in the %s booking journey", async locale => {
    currentLocale.value = locale;
    const page = await FAQPage({ params: Promise.resolve({ locale }) });
    render(page);
    expect(screen.getByRole("link", { name: "Book Free Strategy Call" })).toHaveAttribute("href", `/${locale}/book`);
    expect(screen.getByRole("link", { name: "Email Our Team" })).toHaveAttribute("href", "mailto:support@unionnationaltax.com");
});

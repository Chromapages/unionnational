import { existsSync } from "node:fs";
import { join } from "node:path";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { ComponentPropsWithoutRef } from "react";
import { IndustryServiceExperience } from "./IndustryServiceExperience";
import { getIndustryServiceContent } from "@/lib/industries/service-content";
import { generateMetadata as restaurantMetadata } from "@/app/[locale]/industries/restaurants/page";
import { generateMetadata as constructionMetadata } from "@/app/[locale]/industries/construction/page";

vi.mock("@/i18n/navigation", () => ({ Link: (props: ComponentPropsWithoutRef<"a">) => <a {...props} /> }));
vi.mock("@/components/contact/MultiStepContactForm", () => ({ MultiStepContactForm: ({ industry }: { industry: string }) => <div data-testid="industry-form" data-industry={industry} /> }));
vi.mock("@/components/layout/HeaderWrapper", () => ({ HeaderWrapper: () => null }));
vi.mock("@/components/layout/Footer", () => ({ Footer: () => null }));

describe("rebuilt industry service experiences", () => {
    it.each(["restaurants", "construction"] as const)("uses truthful localized %s content and the correct embedded inquiry", async industry => {
        for (const locale of ["en", "es"]) {
            const copy = getIndustryServiceContent(industry, locale);
            const view = render(<IndustryServiceExperience industry={industry} locale={locale} />);
            expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
            expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(copy.title);
            expect(screen.getByRole("link", { name: copy.cta })).toHaveAttribute("href", "#consultation-form");
            expect(screen.getByTestId("industry-form")).toHaveAttribute("data-industry", industry);
            expect(screen.getByRole("img", { name: copy.imageAlt })).toBeInTheDocument();
            expect(existsSync(join(process.cwd(), "public", copy.image))).toBe(true);
            expect(view.container.querySelectorAll("details")).toHaveLength(3);
            expect(view.container.querySelectorAll("summary")).toHaveLength(3);
            expect(view.container.textContent).toMatch(/CFO/);
            expect(copy.topics.some(topic => topic.description.endsWith("?"))).toBe(false);
            expect(view.container.textContent).not.toMatch(/\$|\d+%|COO|Section 45B|3-year|free audit|spots limited|guaranteed|IRS resolution/i);
            const inquiry = view.container.querySelector("#consultation-form")! as HTMLElement;
            expect(within(inquiry).getByText(copy.privacy)).toBeVisible();
            const metadata = await (industry === "restaurants" ? restaurantMetadata : constructionMetadata)({ params: Promise.resolve({ locale }) });
            expect(metadata.title).toBe(copy.metadataTitle);
            expect(metadata.description).toBe(copy.metadataDescription);
            expect(metadata.alternates?.canonical).toBe(`https://unionnationaltax.com/${locale}/industries/${industry}`);
            view.unmount();
        }
    });
    it("keeps restaurant and construction narratives specific to their decisions", () => {
        const restaurant = getIndustryServiceContent("restaurants", "en");
        const construction = getIndustryServiceContent("construction", "en");
        expect(restaurant.topics.map(topic => topic.title)).toContain("Menu economics");
        expect(construction.topics.map(topic => topic.title)).toContain("Work-in-progress reporting");
        expect(restaurant.title).toBe("Restaurant CFO Partnership");
        expect(construction.title).toBe("Construction CFO Partnership");
        expect(restaurant.title).not.toBe(construction.title);
        expect(restaurant.image).not.toBe(construction.image);
    });
});

import { act, cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { ComponentPropsWithoutRef } from "react";
import en from "@/messages/en.json";
import es from "@/messages/es.json";
import { HomeOutcomeTabs } from "./HomeOutcomeTabs";
import { CTASection } from "./CTASection";
import { WhyUsEvidenceModule } from "./WhyUsEvidenceModule";

vi.mock("@/i18n/navigation", () => ({
    Link: ({ href, children, ...props }: ComponentPropsWithoutRef<"a">) => <a href={href} {...props}>{children}</a>,
}));
// Navigation progress is covered by BookingCtaLink's own tests. These tests keep
// the actual CTA section's content/destination decisions visible at its boundary.
vi.mock("./BookingCtaLink", () => ({
    BookingCtaLink: ({ href, label, descriptionId }: { href: string; label: string; descriptionId?: string }) =>
        <a href={href} aria-describedby={descriptionId}>{label}</a>,
}));

afterEach(cleanup);

function renderWithLocale(children: React.ReactNode, locale: "en" | "es" = "en") {
    return render(<NextIntlClientProvider locale={locale} messages={locale === "es" ? es : en}>{children}</NextIntlClientProvider>);
}

describe("homepage outcome journeys", () => {
    it("exposes a single reachable selected panel and the matching service destinations", () => {
        renderWithLocale(<HomeOutcomeTabs />);
        const tabs = screen.getAllByRole("tab");
        expect(tabs).toHaveLength(3);
        expect(tabs[0]).toHaveAttribute("aria-selected", "true");
        expect(tabs[0]).toHaveAttribute("tabindex", "0");
        for (const tab of tabs.slice(1)) {
            expect(tab).toHaveAttribute("aria-selected", "false");
            expect(tab).toHaveAttribute("tabindex", "-1");
        }
        const panel = screen.getByRole("tabpanel");
        expect(panel.id).toBe(tabs[0].getAttribute("aria-controls"));
        expect(panel).toHaveAttribute("aria-labelledby", tabs[0].id);
        expect(within(panel).getByRole("link", { name: en.ConsumerHome.outcomes.items["1"].link })).toHaveAttribute("href", "/tax-planning");
        expect(within(panel).getByRole("link", { name: en.ConsumerHome.outcomes.items["2"].service })).toHaveAttribute("href", "/strategic-bookkeeping");
        expect(within(panel).getByRole("link", { name: en.ConsumerHome.outcomes.items["3"].service })).toHaveAttribute("href", "/fractional-cfo");
        expect(within(panel).getAllByRole("listitem")).toHaveLength(4);
        for (const inactive of screen.getAllByRole("tabpanel", { hidden: true }).filter((item) => item !== panel)) {
            expect(inactive).toHaveAttribute("inert");
            expect(inactive).toHaveAttribute("aria-hidden", "true");
            expect(inactive).toHaveAttribute("tabindex", "-1");
        }
    });

    it("switches the visible journey and primary destination on each tab click", async () => {
        const user = userEvent.setup();
        renderWithLocale(<HomeOutcomeTabs />);
        for (const [index, href] of [[1, "/strategic-bookkeeping"], [2, "/fractional-cfo"], [0, "/tax-planning"]] as const) {
            const tab = screen.getAllByRole("tab")[index];
            await user.click(tab);
            const panel = screen.getByRole("tabpanel");
            expect(tab).toHaveFocus();
            expect(tab).toHaveAttribute("aria-selected", "true");
            expect(panel.id).toBe(tab.getAttribute("aria-controls"));
            const key = String(index + 1) as "1" | "2" | "3";
            expect(within(panel).getByRole("heading", { name: en.ConsumerHome.outcomes.items[key].title })).toBeInTheDocument();
            expect(within(panel).getByRole("link", { name: en.ConsumerHome.outcomes.items[key].link })).toHaveAttribute("href", href);
        }
    });

    it("supports roving focus, wraparound, Home/End, and ordinary keyboard input", async () => {
        const user = userEvent.setup();
        renderWithLocale(<HomeOutcomeTabs />);
        const tabs = screen.getAllByRole("tab");
        await user.tab();
        expect(tabs[0]).toHaveFocus();
        for (const [key, index] of [["{ArrowLeft}", 2], ["{ArrowRight}", 0], ["{ArrowRight}", 1], ["{End}", 2], ["{Home}", 0]] as const) {
            await user.keyboard(key);
            expect(tabs[index]).toHaveFocus();
            expect(tabs[index]).toHaveAttribute("aria-selected", "true");
            expect(screen.getByRole("tabpanel").id).toBe(tabs[index].getAttribute("aria-controls"));
        }
        await user.keyboard("a");
        expect(tabs[0]).toHaveFocus();
        expect(tabs[0]).toHaveAttribute("aria-selected", "true");
        act(() => tabs[2].focus());
        expect(tabs[2]).toHaveAttribute("aria-selected", "true");
    });

    it("keeps Spanish journey copy and destinations together", async () => {
        const user = userEvent.setup();
        renderWithLocale(<HomeOutcomeTabs />, "es");
        await user.click(screen.getByRole("tab", { name: es.ConsumerHome.outcomes.items["2"].tabLabel }));
        const panel = screen.getByRole("tabpanel");
        expect(within(panel).getByRole("heading", { name: es.ConsumerHome.outcomes.items["2"].title })).toBeInTheDocument();
        expect(within(panel).getByRole("link", { name: es.ConsumerHome.outcomes.items["2"].link })).toHaveAttribute("href", "/strategic-bookkeeping");
        expect(within(panel).queryByText(en.ConsumerHome.outcomes.items["2"].title)).not.toBeInTheDocument();
    });
});

describe("homepage CTA and evidence boundaries", () => {
    it("uses locale fallback copy and the on-site booking destination for absent or executable CMS targets", () => {
        const view = renderWithLocale(<CTASection />, "es");
        expect(screen.getByRole("heading", { name: es.HomePage.CTASection.fallbackTitle })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: es.HomePage.CTASection.fallbackButtonText })).toHaveAttribute("href", "/book");
        expect(screen.getByText(es.HomePage.CTASection.homepageSchedulingNote)).toBeInTheDocument();
        view.unmount();
        renderWithLocale(<CTASection data={{ ctaTitle: "Approved review invitation", ctaSubtitle: "Review your next step.", ctaButtonText: "Schedule review", ctaButtonUrl: "javascript:alert(1)" }} />);
        expect(screen.getByRole("heading", { name: "Approved review invitation" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Schedule review" })).toHaveAttribute("href", "/book");
        expect(screen.getByText(en.HomePage.CTASection.trustDurationTitle)).toBeInTheDocument();
    });

    it("retains an approved external CMS scheduling destination with its external scheduling note", () => {
        renderWithLocale(<CTASection data={{ ctaTitle: "Approved invitation", ctaSubtitle: "A scoped planning review.", ctaButtonText: "Open scheduling", ctaButtonUrl: "https://scheduling.example.test/review" }} />);
        const link = screen.getByRole("link", { name: "Open scheduling" });
        expect(link).toHaveAttribute("href", "https://scheduling.example.test/review");
        expect(link).toHaveAttribute("aria-describedby", "sitewide-scheduling-note");
        expect(screen.getByText(en.HomePage.CTASection.externalBookingNote)).toBeInTheDocument();
        expect(screen.queryByText(en.HomePage.CTASection.fallbackTitle)).not.toBeInTheDocument();
    });

    it("withholds evidence links while disabled, loading, or errored and exposes the approved action after recovery", async () => {
        const user = userEvent.setup();
        const items = [{ id: "review", label: "Review the entity", body: "Evaluate implementation requirements.", optionalApprovedLink: { href: "/tax-planning", label: "Read the planning process" } }];
        const view = render(<WhyUsEvidenceModule enabled={false} items={items} />);
        expect(screen.queryByRole("link")).not.toBeInTheDocument();
        view.rerender(<WhyUsEvidenceModule items={items} isLoading />);
        expect(screen.getByLabelText("Loading evidence details")).toBeInTheDocument();
        expect(screen.queryByRole("link")).not.toBeInTheDocument();
        view.rerender(<WhyUsEvidenceModule items={items} isLoading hasError errorMessage="Review details are unavailable." />);
        expect(screen.getByRole("alert")).toHaveTextContent("Review details are unavailable.");
        expect(screen.queryByLabelText("Loading evidence details")).not.toBeInTheDocument();
        expect(screen.queryByRole("link")).not.toBeInTheDocument();
        view.rerender(<WhyUsEvidenceModule items={items} heading="Approved planning process" />);
        const action = screen.getByRole("link", { name: "Read the planning process" });
        expect(action).toHaveAttribute("href", "/tax-planning");
        await user.tab();
        expect(action).toHaveFocus();
    });
});

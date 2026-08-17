import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ServicesDropdown } from "./ServicesDropdown";

const navigationState = vi.hoisted(() => ({ pathname: "/" }));

vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, children, ref, ...props }: React.ComponentPropsWithoutRef<"a"> & {
    href: string;
    ref?: React.Ref<HTMLAnchorElement>;
  }) => (
    <a ref={ref} href={href} {...props}>
      {children}
    </a>
  ),
  usePathname: () => navigationState.pathname,
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const messages: Record<string, string> = {
      services: "Services",
      servicesDropdownHeading: "What do you need help with?",
      servicesDropdownSubheading: "Start with the outcome that matters most to your business.",
      servicesDropdownViewAll: "Find the right service",
      servicesDropdownPrimaryLabel: "Recommended starting point",
      servicesGroupTax: "Plan & save on taxes",
      servicesGroupTaxDescription: "Reduce surprises.",
      servicesGroupNumbers: "Know & control the numbers",
      servicesGroupNumbersDescription: "Build reliable books.",
      servicesGroupCompliance: "Additional business support",
      servicesGroupComplianceDescription: "Keep the essentials handled correctly.",
      servicesGroupOther: "More services",
      servicesGroupOtherDescription: "Explore more support.",
      "serviceLabels.taxPlanning": "Tax Planning",
      "serviceLabels.sCorp": "S-Corp Tax Advantage",
      "serviceLabels.bookkeeping": "Strategic Bookkeeping",
      "serviceLabels.fractionalCfo": "Fractional CFO",
      "serviceLabels.formation": "New Business Formation",
      "serviceLabels.payroll": "Payroll Services",
      "serviceLabels.taxPreparation": "Tax Preparation & Filing",
      servicesDropdownFallbackServiceTitle: "Service",
    };

    return messages[key] || key;
  },
}));

describe("ServicesDropdown", () => {
  beforeEach(() => {
    navigationState.pathname = "/";
  });

  it("opens from a pointer click even after hover opened it", async () => {
    const user = userEvent.setup();
    render(<ServicesDropdown />);

    const trigger = screen.getByRole("button", { name: "Services" });
    fireEvent.pointerEnter(trigger.parentElement!, { pointerType: "mouse" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("region", { name: "Services" })).toBeInTheDocument();
  });

  it("opens with the keyboard, closes with Escape, and restores trigger focus", async () => {
    const user = userEvent.setup();
    render(<ServicesDropdown />);

    const trigger = screen.getByRole("button", { name: "Services" });
    trigger.focus();
    await user.keyboard("{ArrowDown}");

    expect(screen.getByRole("link", { name: /S-Corp Tax Advantage/ })).toHaveFocus();

    await user.keyboard("{Escape}");

    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("keeps current-page semantics on links instead of the disclosure button", async () => {
    navigationState.pathname = "/services";
    const user = userEvent.setup();
    render(<ServicesDropdown isActive />);

    const trigger = screen.getByRole("button", { name: "Services" });
    expect(trigger).not.toHaveAttribute("aria-current");

    await user.click(trigger);

    expect(screen.getByRole("link", { name: "Find the right service" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("leads with the recommended advisory path before supporting services", async () => {
    const user = userEvent.setup();
    render(<ServicesDropdown />);

    await user.click(screen.getByRole("button", { name: "Services" }));

    const sCorp = screen.getByRole("link", { name: /S-Corp Tax Advantage/ });
    const taxPlanning = screen.getByRole("link", { name: "Tax Planning" });
    const fractionalCfo = screen.getByRole("link", { name: "Fractional CFO" });
    const bookkeeping = screen.getByRole("link", { name: "Strategic Bookkeeping" });

    expect(sCorp.compareDocumentPosition(taxPlanning) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(fractionalCfo.compareDocumentPosition(bookkeeping) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByText("Additional business support")).toBeInTheDocument();
  });

  it("keeps canonical advisory paths available when CMS data is partial", async () => {
    const user = userEvent.setup();
    render(
      <ServicesDropdown
        services={[
          {
            _id: "cms-cfo",
            title: "CFO Leadership",
            slug: { current: "fractional-cfo" },
          },
        ]}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Services" }));

    expect(screen.getByRole("link", { name: /S-Corp Tax Advantage/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Tax Planning" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Fractional CFO" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Strategic Bookkeeping" })).toBeInTheDocument();
  });
});

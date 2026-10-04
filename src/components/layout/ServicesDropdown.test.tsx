import { act, fireEvent, render, screen } from "@testing-library/react";
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
      servicesDropdownViewAll: "View All Services",
      servicesDropdownCompare: "Compare Services",
      servicesGroupAdvisory: "Advisory",
      servicesGroupImplementation: "Implementation",
      servicesGroupOther: "More services",
      "serviceLabels.taxPlanning": "Tax Planning",
      "serviceLabels.sCorp": "S-Corp Tax Advantage",
      "serviceLabels.bookkeeping": "Strategic Bookkeeping",
      "serviceLabels.fractionalCfo": "Fractional CFO",
      "serviceLabels.formation": "New Business Formation",
      "serviceLabels.payroll": "Payroll Services",
      "serviceLabels.taxPreparation": "Tax Filing & Preparation",
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
    expect(trigger).toHaveAttribute("aria-haspopup", "true");
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

    expect(screen.getByRole("link", { name: "View All Services" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("groups advisory routes before implementation routes", async () => {
    const user = userEvent.setup();
    render(<ServicesDropdown />);

    await user.click(screen.getByRole("button", { name: "Services" }));

    const sCorp = screen.getByRole("link", { name: /S-Corp Tax Advantage/ });
    const taxPlanning = screen.getByRole("link", { name: "Tax Planning" });
    const fractionalCfo = screen.getByRole("link", { name: "Fractional CFO" });
    const bookkeeping = screen.getByRole("link", { name: "Strategic Bookkeeping" });

    expect(sCorp.compareDocumentPosition(taxPlanning) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(bookkeeping.compareDocumentPosition(fractionalCfo) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByText("Advisory")).toBeInTheDocument();
    expect(screen.getByText("Implementation")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Compare Services" })).toHaveAttribute("href", "/services#services");
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

  it("remains open during hover grace delay when mouse leaves container", async () => {
    vi.useFakeTimers();
    render(<ServicesDropdown />);

    const trigger = screen.getByRole("button", { name: "Services" });
    fireEvent.pointerEnter(trigger.parentElement!, { pointerType: "mouse" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    fireEvent.pointerLeave(trigger.parentElement!, { pointerType: "mouse" });
    // Still open immediately during grace delay
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    await act(async () => {
      vi.advanceTimersByTime(250);
    });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    vi.useRealTimers();
  });
});

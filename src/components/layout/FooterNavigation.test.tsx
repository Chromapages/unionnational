import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { FooterNavigation } from "./FooterNavigation";

vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, children, ...props }: React.ComponentPropsWithoutRef<"a"> & { href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

const groups = [
  {
    title: "Advisory",
    links: [
      { label: "Tax Planning", href: "/tax-planning" },
      { label: "All Services", href: "/services", emphasized: true },
    ],
  },
  {
    title: "Company",
    links: [{ label: "About", href: "/about" }],
  },
];

function mockMedia({ reducedMotion = false } = {}) {
  vi.stubGlobal("matchMedia", vi.fn((query: string) => ({
    matches: query.includes("prefers-reduced-motion") ? reducedMotion : false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })));
}

describe("FooterNavigation", () => {
  beforeEach(() => mockMedia());

  it("renders collapsed mobile groups with associated semantic controls", () => {
    render(<FooterNavigation groups={groups} navigationLabel="Footer navigation" />);

    const trigger = screen.getByRole("button", { name: "Advisory" });
    const panelId = trigger.getAttribute("aria-controls");
    const panel = document.getElementById(panelId || "");

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(panel).toHaveAttribute("aria-labelledby", trigger.id);
    expect(panel).toHaveAttribute("hidden");
    expect(trigger.className).toContain("min-h-11");
  });

  it("opens with Enter, exposes existing links, and keeps focus on the trigger", async () => {
    const user = userEvent.setup();
    render(<FooterNavigation groups={groups} navigationLabel="Footer navigation" />);

    const trigger = screen.getByRole("button", { name: "Advisory" });
    trigger.focus();
    await user.keyboard("{Enter}");

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveFocus();
    expect(screen.getByRole("link", { name: "Tax Planning" })).toHaveAttribute("href", "/tax-planning");
  });

  it("hides a closed panel immediately when reduced motion is requested", async () => {
    mockMedia({ reducedMotion: true });
    const user = userEvent.setup();
    render(<FooterNavigation groups={groups} navigationLabel="Footer navigation" />);

    const trigger = screen.getByRole("button", { name: "Company" });
    await user.click(trigger);
    await user.click(trigger);

    expect(document.getElementById(trigger.getAttribute("aria-controls") || "")).toHaveAttribute("hidden");
  });

  it("server-renders the established md desktop grid with every link expanded", () => {
    render(<FooterNavigation groups={groups} navigationLabel="Footer navigation" />);

    const desktopNavigation = screen.getByTestId("footer-desktop-navigation");
    expect(desktopNavigation).toHaveClass("md:grid");
    expect(desktopNavigation).toHaveTextContent("Tax Planning");
    expect(desktopNavigation.querySelector("button")).not.toBeInTheDocument();
  });

  it("cancels pending disclosure animation work when rapidly closed", async () => {
    vi.spyOn(window, "requestAnimationFrame").mockImplementation(() => 42);
    const cancelAnimationFrame = vi.spyOn(window, "cancelAnimationFrame");
    const user = userEvent.setup();
    render(<FooterNavigation groups={groups} navigationLabel="Footer navigation" />);

    const trigger = screen.getByRole("button", { name: "Advisory" });
    await user.click(trigger);
    await user.click(trigger);

    expect(cancelAnimationFrame).toHaveBeenCalled();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("finishes the closing animation without leaving links reachable", async () => {
    const user = userEvent.setup();
    render(<FooterNavigation groups={groups} navigationLabel="Footer navigation" />);

    const trigger = screen.getByRole("button", { name: "Advisory" });
    await user.click(trigger);
    await user.click(trigger);
    const panel = document.getElementById(trigger.getAttribute("aria-controls") || "") as HTMLElement;
    fireEvent.transitionEnd(panel, { propertyName: "grid-template-rows" });

    expect(panel).toHaveAttribute("hidden");
  });
});

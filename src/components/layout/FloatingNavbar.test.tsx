import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createElement, useRef, useState } from "react";
import { VaultNavbar } from "./FloatingNavbar";
import { MobileSidebar } from "@/components/ui/MobileSidebar";

const fixture = vi.hoisted(() => ({ locale: "en", pathname: "/", navigation: [] as string[], language: vi.fn(), resize: [] as Array<() => void>, intersection: [] as Array<(entries: IntersectionObserverEntry[]) => void>, media: [] as Array<{ matches: boolean; listeners: Set<() => void> }> }));
vi.mock("next-intl", async () => {
  const en = (await import("@/messages/en.json")).default.Header;
  const es = (await import("@/messages/es.json")).default.Header;
  return { useLocale: () => fixture.locale, useTranslations: () => (key: string, values?: Record<string, unknown>) => {
    const value = key.split(".").reduce<unknown>((current, part) => current && typeof current === "object" ? (current as Record<string, unknown>)[part] : undefined, fixture.locale === "es" ? es : en);
    return typeof value === "string" ? value.replace(/\{(\w+)\}/g, (_, name: string) => String(values?.[name] ?? name)) : key;
  } };
});
vi.mock("@/i18n/navigation", () => ({ usePathname: () => fixture.pathname, Link: ({ href, children, onClick, ...props }: React.ComponentPropsWithoutRef<"a">) => <a {...props} href={href} onClick={event => { onClick?.(event); if (!event.defaultPrevented && href) fixture.navigation.push(href); event.preventDefault(); }}>{children}</a> }));
vi.mock("@/i18n/use-synchronized-locale", () => ({ useSynchronizedLocale: () => ({ locale: fixture.locale, isPending: false, syncLocale: fixture.language }) }));
vi.mock("next/image", () => ({ default: ({ src, alt, onError }: React.ComponentPropsWithoutRef<"img">) => createElement("img", { src, alt, onError }) }));
vi.mock("framer-motion", async () => {
  const { createElement, forwardRef } = await import("react");
  const element = (tag: string) => forwardRef<Element, Record<string, unknown>>(({ children, variants, initial, animate, exit, transition, whileTap, ...props }, ref) => { void variants; void initial; void animate; void exit; void transition; void whileTap; return createElement(tag, { ...props, ref }, children as React.ReactNode); });
  return { motion: { div: element("div"), aside: element("aside"), li: element("li") }, AnimatePresence: ({ children }: React.PropsWithChildren) => children };
});

beforeEach(() => {
  fixture.locale = "en"; fixture.pathname = "/"; fixture.navigation.length = 0; fixture.language.mockReset();
  fixture.resize.length = 0; fixture.intersection.length = 0; fixture.media.length = 0;
  vi.stubGlobal("ResizeObserver", class { constructor(callback: () => void) { fixture.resize.push(callback); } observe() {} disconnect() {} });
  vi.stubGlobal("IntersectionObserver", class { constructor(callback: (entries: IntersectionObserverEntry[]) => void) { fixture.intersection.push(callback); } observe() {} disconnect() {} });
  vi.spyOn(window, "matchMedia").mockImplementation(query => {
    const media = { matches: false, listeners: new Set<() => void>() }; fixture.media.push(media);
    return { media: query, get matches() { return media.matches; }, onchange: null, addEventListener: (_name: string, listener: unknown) => { if (typeof listener === "function") media.listeners.add(listener as () => void); }, removeEventListener: (_name: string, listener: unknown) => { if (typeof listener === "function") media.listeners.delete(listener as () => void); }, addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: () => true };
  });
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); vi.useRealTimers(); document.body.style.overflow = ""; document.documentElement.style.removeProperty("--header-height"); });

function DrawerHarness({ initiallyInert = false }: { initiallyInert?: boolean }) {
  const [open, setOpen] = useState(false);
  const returnFocusRef = useRef<HTMLButtonElement>(null);
  return <><header><button ref={returnFocusRef} onClick={() => setOpen(true)}>Open test drawer</button></header><main>Background page</main><footer {...(initiallyInert ? { inert: true } : {})}>Existing footer</footer><MobileSidebar isOpen={open} onClose={() => setOpen(false)} returnFocusRef={returnFocusRef} /></>;
}

describe("navbar navigation and responsive controls", () => {
  it("opens the mobile drawer from its accessible trigger and restores focus on Escape", async () => {
    const user = userEvent.setup();
    render(<VaultNavbar />);
    const opener = screen.getByRole("button", { name: "Open menu" });
    await user.click(opener);
    expect(opener).toHaveAttribute("aria-expanded", "true");
    const dialog = screen.getByRole("dialog", { name: "Mobile navigation" });
    await waitFor(() => expect(within(dialog).getByRole("button", { name: "Close menu" })).toHaveFocus());
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(opener).toHaveAttribute("aria-expanded", "false");
    await waitFor(() => expect(opener).toHaveFocus());
  });

  it("keeps desktop menus exclusive and closes overflow when the wide layout becomes available", async () => {
    const user = userEvent.setup();
    render(<VaultNavbar />);
    const services = screen.getByRole("button", { name: "Services" });
    const more = screen.getByRole("button", { name: "More Options" });
    await user.click(services);
    expect(services).toHaveAttribute("aria-expanded", "true");
    await user.click(more);
    expect(more).toHaveAttribute("aria-expanded", "true");
    expect(services).toHaveAttribute("aria-expanded", "false");
    act(() => { fixture.media.forEach(media => { media.matches = true; media.listeners.forEach(listener => listener()); }); });
    expect(more).toHaveAttribute("aria-expanded", "false");
  });

  it("preserves current-section indication and prioritizes the S-Corp booking action in Spanish", () => {
    fixture.locale = "es"; fixture.pathname = "/s-corp-tax-advantage";
    render(<VaultNavbar siteSettings={{ companyName: "Approved company", ctaButtonUrl: "/custom-booking", ctaButtonTextLocalized: "Custom CTA" }} />);
    expect(screen.getByRole("link", { name: "Reservar una evaluación S-Corp" })).toHaveAttribute("href", "/book");
    expect(screen.queryByRole("link", { name: "Custom CTA" })).toBeNull();
    expect(screen.getByRole("button", { name: /Abrir/ })).toHaveAttribute("aria-controls", "mobile-navigation");
  });

  it("marks the parent industry navigation active for an industry detail page", () => {
    fixture.pathname = "/industries/construction";
    render(<VaultNavbar />);
    expect(screen.getByRole("link", { name: "Who We Help" })).toHaveAttribute("aria-current", "page");
  });

  it("shows a readable company fallback after image failure and retries a replacement CMS logo", () => {
    const { rerender } = render(<VaultNavbar siteSettings={{ companyName: "Approved company", logo: { asset: { url: "https://cdn.example.test/logo-one.png" } } }} />);
    fireEvent.error(screen.getByRole("img", { name: "Approved company" }));
    expect(screen.queryByRole("img")).toBeNull();
    expect(screen.getByText("Approved company")).toBeInTheDocument();
    rerender(<VaultNavbar siteSettings={{ companyName: "Approved company", logoAlt: { asset: { url: "https://cdn.example.test/logo-two.png" } } }} />);
    expect(screen.getByRole("img", { name: "Approved company" })).toHaveAttribute("src", "https://cdn.example.test/logo-two.png");
  });

  it("allows a configured approved CTA on generic pages and prevents rapid duplicate booking navigation", () => {
    vi.useFakeTimers();
    render(<VaultNavbar siteSettings={{ ctaButtonTextLocalized: "Discuss my plan", ctaButtonUrl: "/book#details" }} />);
    const cta = screen.getByRole("link", { name: "Discuss my plan" });
    fireEvent.click(cta); fireEvent.click(cta);
    expect(fixture.navigation).toEqual(["/book#details"]);
    act(() => vi.advanceTimersByTime(751));
    fireEvent.click(cta);
    expect(fixture.navigation).toEqual(["/book#details", "/book#details"]);
  });

  it("updates the layout offset and compact state when header geometry/scroll visibility changes", () => {
    let height = 64;
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(() => ({ height, width: 100, x: 0, y: 0, top: 0, right: 100, bottom: height, left: 0, toJSON: () => ({}) }));
    render(<VaultNavbar />);
    expect(document.documentElement.style.getPropertyValue("--header-height")).toBe("64px");
    height = 80; act(() => fixture.resize.forEach(callback => callback()));
    expect(document.documentElement.style.getPropertyValue("--header-height")).toBe("80px");
    act(() => fixture.intersection.forEach(callback => callback([{ isIntersecting: false } as IntersectionObserverEntry])));
    expect(document.querySelector("header")).toHaveAttribute("data-compact", "true");
  });
});

describe("mobile drawer focus and locale behavior", () => {
  it("isolates the background, contains Tab/Shift-Tab, and restores pre-existing inert/scroll state", async () => {
    const user = userEvent.setup();
    document.body.style.overflow = "auto";
    render(<DrawerHarness initiallyInert />);
    const opener = screen.getByRole("button", { name: "Open test drawer" });
    await user.click(opener);
    const dialog = screen.getByRole("dialog");
    const first = within(dialog).getByRole("button", { name: "Close menu" });
    await waitFor(() => expect(first).toHaveFocus());
    expect(document.querySelector("main")).toHaveAttribute("inert");
    expect(document.body.style.overflow).toBe("hidden");
    const focusable = Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
    const last = focusable[focusable.length - 1];
    last.focus(); await user.tab(); expect(first).toHaveFocus();
    await user.tab({ shift: true }); expect(last).toHaveFocus();
    await user.keyboard("{Escape}");
    await waitFor(() => expect(opener).toHaveFocus());
    expect(document.querySelector("main")).not.toHaveAttribute("inert");
    expect(document.querySelector("footer")).toHaveAttribute("inert");
    expect(document.body.style.overflow).toBe("auto");
  });

  it("closes after a real navigation link and gives the correct active route", async () => {
    fixture.pathname = "/resources";
    const user = userEvent.setup();
    render(<DrawerHarness />);
    await user.click(screen.getByRole("button", { name: "Open test drawer" }));
    const resources = within(screen.getByRole("dialog")).getByRole("link", { name: "Guides & Tools" });
    expect(resources).toHaveAttribute("aria-current", "page");
    await user.click(resources);
    expect(fixture.navigation).toEqual(["/resources"]);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("closes a drawer when a route changes outside its link handlers", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<DrawerHarness />);
    await user.click(screen.getByRole("button", { name: "Open test drawer" }));
    fixture.pathname = "/shop"; rerender(<DrawerHarness />);
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("uses one localized unified booking action on the S-Corp route and closes when language changes", async () => {
    fixture.pathname = "/s-corp-tax-advantage"; fixture.locale = "es";
    const user = userEvent.setup();
    render(<DrawerHarness />);
    await user.click(screen.getByRole("button", { name: "Open test drawer" }));
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByRole("link", { name: "Reservar una evaluación S-Corp" })).toHaveAttribute("href", "/book");
    expect(within(dialog).queryByRole("link", { name: "Contacto" })).toBeNull();
    await user.click(within(dialog).getByRole("button", { name: /Cambiar a inglés/ }));
    expect(fixture.language).toHaveBeenCalledWith("en");
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("closes from the overlay without trapping subsequent page input", async () => {
    const user = userEvent.setup();
    render(<DrawerHarness />);
    await user.click(screen.getByRole("button", { name: "Open test drawer" }));
    const overlay = Array.from(document.body.children).find(element => element.getAttribute("aria-hidden") === "true");
    expect(overlay).toBeDefined();
    fireEvent.click(overlay!);
    expect(screen.queryByRole("dialog")).toBeNull();
    await waitFor(() => expect(screen.getByRole("button", { name: "Open test drawer" })).toHaveFocus());
  });
});

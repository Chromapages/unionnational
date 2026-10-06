import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LocaleSwitcher } from "./LocaleSwitcher";

const fixture = vi.hoisted(() => ({ locale: "en", pending: false, sync: vi.fn() }));
vi.mock("@/i18n/use-synchronized-locale", () => ({ useSynchronizedLocale: () => ({ locale: fixture.locale, isPending: fixture.pending, syncLocale: fixture.sync }) }));
vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => ({ language: "Language", switchToSpanish: "Switch to Spanish", switchToEnglish: "Switch to English" })[key as "language"] || key }));
beforeEach(() => { fixture.locale = "en"; fixture.pending = false; fixture.sync.mockReset(); });

describe("language switcher controls", () => {
  it("opens keyboard-reachable dock choices and changes only a different selected language", async () => {
    const user = userEvent.setup();
    const changed = vi.fn();
    render(<LocaleSwitcher dock onLocaleChange={changed} />);
    const trigger = screen.getByRole("button", { name: "Language: EN" });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: "English" })).toHaveAttribute("aria-pressed", "true");
    await user.click(screen.getByRole("button", { name: "English" }));
    expect(fixture.sync).not.toHaveBeenCalled();
    expect(changed).not.toHaveBeenCalled();
    await user.click(trigger);
    const spanish = screen.getByRole("button", { name: "Español" });
    spanish.focus();
    await user.keyboard("{Enter}");
    expect(fixture.sync).toHaveBeenCalledWith("es");
    expect(changed).toHaveBeenCalledOnce();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("closes on Escape and restores keyboard focus to its trigger", async () => {
    const user = userEvent.setup();
    render(<LocaleSwitcher dock />);
    const trigger = screen.getByRole("button", { name: "Language: EN" });
    await user.click(trigger);
    screen.getByRole("button", { name: "Español" }).focus();
    await user.keyboard("{Escape}");
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("closes only for pointer/focus movement outside the dock", async () => {
    const user = userEvent.setup();
    render(<><LocaleSwitcher dock /><button>Other action</button></>);
    const trigger = screen.getByRole("button", { name: "Language: EN" });
    await user.click(trigger);
    fireEvent.mouseDown(screen.getByRole("button", { name: "English" }));
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    fireEvent.touchStart(document.body);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    fireEvent.blur(trigger, { relatedTarget: screen.getByRole("button", { name: "Other action" }) });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("uses the Spanish current-language label and changes a mobile selection to English", async () => {
    fixture.locale = "es";
    const changed = vi.fn();
    const user = userEvent.setup();
    render(<LocaleSwitcher mobileDrawer onLocaleChange={changed} />);
    const button = screen.getByRole("button", { name: "ES — Switch to English" });
    expect(within(button).getByText("Español")).toBeInTheDocument();
    await user.click(button);
    expect(changed).toHaveBeenCalledOnce();
    expect(fixture.sync).toHaveBeenCalledWith("en");
  });

  it("blocks additional language selections while navigation is pending", async () => {
    fixture.pending = true;
    const user = userEvent.setup();
    render(<LocaleSwitcher />);
    const button = screen.getByRole("button", { name: "EN — Switch to Spanish" });
    expect(button).toBeDisabled();
    await user.click(button);
    expect(fixture.sync).not.toHaveBeenCalled();
  });
});

import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ClientLogoStrip } from "./ClientLogoStrip";

vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => ({ label: "Featured client logos", pause: "Pause logo scrolling", resume: "Resume logo scrolling" })[key as "label"] }));
vi.mock("next/image", () => ({ default: ({ src, alt }: React.ComponentPropsWithoutRef<"img">) => createElement("img", { src, alt }) }));
afterEach(() => { vi.restoreAllMocks(); });

describe("client logo accessibility and motion controls", () => {
  it.each([undefined, [], [{ alt: "Missing asset" }], [{ asset: { url: "https://cdn.example.test/logo.png" }, alt: "   " }], [{ asset: { url: "https://cdn.example.test/logo.png" } }]])("omits incomplete logos instead of exposing broken unlabeled imagery", logos => {
    render(<ClientLogoStrip logos={logos} />);
    expect(screen.queryByRole("region")).toBeNull();
    expect(screen.queryByRole("img")).toBeNull();
  });

  it("announces each approved logo once and supports keyboard pause/resume", async () => {
    const user = userEvent.setup();
    render(<ClientLogoStrip logos={[{ alt: "Approved client one", asset: { url: "https://cdn.example.test/one.png" } }, { alt: "Approved client two", asset: { url: "https://cdn.example.test/two.png" } }, { alt: "Incomplete" }]} />);
    expect(screen.getAllByRole("img")).toHaveLength(2);
    const button = screen.getByRole("button", { name: "Pause logo scrolling" });
    expect(button).toHaveAttribute("aria-pressed", "false");
    button.focus(); await user.keyboard(" ");
    expect(screen.getByRole("button", { name: "Resume logo scrolling" })).toHaveAttribute("aria-pressed", "true");
    await user.keyboard("{Enter}");
    expect(screen.getByRole("button", { name: "Pause logo scrolling" })).toHaveAttribute("aria-pressed", "false");
    expect(button).toHaveAccessibleDescription("Approved client one, Approved client two");
  });

  it("hydrates the server-rendered control and follows reduced-motion changes", async () => {
    const media = Object.assign(new EventTarget(), {
      media: "(prefers-reduced-motion: reduce)", matches: false, onchange: null,
      addListener: vi.fn(), removeListener: vi.fn(),
    });
    vi.spyOn(window, "matchMedia").mockReturnValue(media);
    const container = document.createElement("div");
    document.body.append(container);
    const strip = <ClientLogoStrip logos={[{ alt: "Approved client", asset: { url: "https://cdn.example.test/logo.png" } }]} />;
    container.innerHTML = renderToString(strip);

    const setReducedMotion = (matches: boolean) => act(() => {
      media.matches = matches;
      media.dispatchEvent(new Event("change"));
    });
    setReducedMotion(true);
    const error = vi.spyOn(console, "error");
    try {
      render(strip, { container, hydrate: true });
      const button = screen.getByRole("button", { name: "Featured client logos" });
      expect(button).toBeDisabled();
      expect(button).not.toHaveAttribute("aria-pressed");
      expect(error).not.toHaveBeenCalled();

      setReducedMotion(false);
      expect(screen.getByRole("button", { name: "Pause logo scrolling" })).toBeEnabled();
      button.focus();
      await userEvent.setup().keyboard(" ");
      expect(button).toHaveAccessibleName("Resume logo scrolling");

      setReducedMotion(true);
      expect(button).toBeDisabled();
      setReducedMotion(false);
      expect(button).toBeEnabled();
      expect(button).toHaveAccessibleName("Resume logo scrolling");
    } finally {
      container.remove();
    }
  });

  it("keeps larger approved logo sets accessible without duplicate announcements", () => {
    render(<ClientLogoStrip logos={Array.from({ length: 7 }, (_, index) => ({ alt: `Approved client ${index + 1}`, asset: { url: `https://cdn.example.test/${index}.png` } }))} />);
    expect(screen.getAllByRole("img")).toHaveLength(7);
  });
});

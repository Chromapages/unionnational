import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createElement } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ClientLogoStrip } from "./ClientLogoStrip";

const fixture = vi.hoisted(() => ({ reducedMotion: false }));
vi.mock("framer-motion", () => ({ useReducedMotion: () => fixture.reducedMotion }));
vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => ({ label: "Featured client logos", pause: "Pause logo scrolling", resume: "Resume logo scrolling" })[key as "label"] }));
vi.mock("next/image", () => ({ default: ({ src, alt }: React.ComponentPropsWithoutRef<"img">) => createElement("img", { src, alt }) }));
beforeEach(() => { fixture.reducedMotion = false; });

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

  it("respects reduced-motion preference and does not offer a misleading active pause control", async () => {
    fixture.reducedMotion = true;
    const user = userEvent.setup();
    render(<ClientLogoStrip logos={[{ alt: "Approved client", asset: { url: "https://cdn.example.test/logo.png" } }]} />);
    const button = screen.getByRole("button", { name: "Featured client logos" });
    expect(button).toBeDisabled();
    expect(button).not.toHaveAttribute("aria-pressed");
    await user.click(button);
    expect(button).toBeDisabled();
    expect(screen.queryByRole("button", { name: "Resume logo scrolling" })).toBeNull();
  });

  it("keeps larger approved logo sets accessible without duplicate announcements", () => {
    render(<ClientLogoStrip logos={Array.from({ length: 7 }, (_, index) => ({ alt: `Approved client ${index + 1}`, asset: { url: `https://cdn.example.test/${index}.png` } }))} />);
    expect(screen.getAllByRole("img")).toHaveLength(7);
  });
});

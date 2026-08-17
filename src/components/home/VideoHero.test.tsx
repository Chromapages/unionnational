import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { VideoHero } from "./VideoHero";

vi.mock("next/image", () => ({
  default: ({ alt, ...props }: React.ComponentPropsWithoutRef<"img">) => <img alt={alt} {...props} />,
}));

vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, children, ...props }: React.ComponentPropsWithoutRef<"a"> & { href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string) => {
    const messages: Record<string, string> = {
      title: "Stop overpaying the IRS. Build a smarter business.",
      subtitle: "Reduce tax surprises with proactive S-Corp planning and year-round guidance.",
      primaryCta: "See If an S-Corp Could Save You Money",
      videoLabel: "See how Union National Tax works",
      unavailable: "Video unavailable. Start the assessment to find your next step.",
    };
    return messages[key] || key;
  },
}));

vi.mock("./HeroVideoPlayer", () => ({
  HeroVideoPlayer: ({ ariaLabel, onPlay }: { ariaLabel: string; onPlay?: () => void }) => (
    <button type="button" aria-label={ariaLabel} onClick={onPlay}>Play video</button>
  ),
}));

describe("VideoHero", () => {
  beforeEach(() => {
    (window as unknown as { dataLayer?: Record<string, unknown>[] }).dataLayer = [];
  });

  it("uses exact-locale CMS copy with one dominant assessment action", () => {
    render(
      <VideoHero
        data={{
          heroTitleLocalized: "CMS strategy headline",
          heroSubtitleLocalized: "CMS localized supporting message.",
          heroCtaTextLocalized: "Check My S-Corp Savings",
          heroPlayerVideoUrl: "https://cdn.example/video.mp4",
        }}
      />,
    );

    expect(screen.getByRole("heading", { level: 1, name: "CMS strategy headline" })).toBeInTheDocument();
    expect(screen.getByText("CMS localized supporting message.")).toBeInTheDocument();

    const primary = screen.getByRole("link", { name: /Check My S-Corp Savings/ });
    expect(primary).toHaveAttribute("href", "/scorp-estimator");
    expect(primary).toHaveClass("bg-gold-500");
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.queryByText("Avg. Annual Savings $23,420")).not.toBeInTheDocument();
    expect(screen.queryByRole("list", { name: "Firm credentials" })).not.toBeInTheDocument();
  });

  it("uses same-locale message fallbacks when localized CMS copy is absent", () => {
    render(<VideoHero />);

    expect(screen.getByRole("heading", { name: "Stop overpaying the IRS. Build a smarter business." })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /See If an S-Corp Could Save You Money/ })).toBeInTheDocument();
  });

  it("tracks the primary action and only one foreground video start", async () => {
    render(<VideoHero data={{ heroPlayerVideoUrl: "https://cdn.example/video.mp4" }} />);

    fireEvent.click(screen.getByRole("link", { name: /See If an S-Corp Could Save You Money/ }));
    fireEvent.click(screen.getByRole("button", { name: "See how Union National Tax works" }));
    fireEvent.click(screen.getByRole("button", { name: "See how Union National Tax works" }));

    await waitFor(() => {
      const events = (window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer;
      expect(events.map((event) => event.event)).toEqual([
        "hero_primary_cta_click",
        "hero_video_start",
      ]);
      expect(events[0]).toMatchObject({ destination: "/en/scorp-estimator", locale: "en" });
    });
  });
});

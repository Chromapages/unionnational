import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { VideoHero } from "./VideoHero";
import { setTrackingChoice } from "@/lib/analytics/privacy";

const viewport = vi.hoisted(() => ({ isDesktop: true }));

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
      secondaryCta: "Explore Services",
      videoLabel: "See how Union National Tax works",
      unavailable: "Video unavailable. Start the assessment to find your next step.",
    };
    return messages[key] || key;
  },
}));

vi.mock("@/hooks/use-media-query", () => ({
  useMediaQuery: () => viewport.isDesktop,
}));

vi.mock("./HeroVideoPlayer", () => ({
  HeroVideoPlayer: ({ ariaLabel, onPlay }: { ariaLabel: string; onPlay?: () => void }) => (
    <button type="button" data-testid="hero-video-player" aria-label={ariaLabel} onClick={onPlay}>Play video</button>
  ),
}));

describe("VideoHero", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/en");
    setTrackingChoice(true);
    (window as unknown as { dataLayer?: Record<string, unknown>[] }).dataLayer = [];
    viewport.isDesktop = true;
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

    const secondary = screen.getByRole("link", { name: /Explore Services/i });
    expect(secondary).toHaveAttribute("href", "#services");

    expect(screen.getAllByRole("link")).toHaveLength(2);
    expect(screen.queryByText("Avg. Annual Savings $23,420")).not.toBeInTheDocument();
    expect(screen.getByRole("list", { name: "Firm credentials" })).toBeInTheDocument();
  });

  it("uses same-locale message fallbacks when localized CMS copy is absent", () => {
    render(<VideoHero />);

    expect(screen.getByRole("heading", { name: "Stop overpaying the IRS. Build a smarter business." })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /See If an S-Corp Could Save You Money/ })).toBeInTheDocument();
  });

  it("keeps the mobile hero content-led with compact, safe-area-aware spacing", () => {
    const { container } = render(<VideoHero />);

    const section = container.querySelector("section[aria-labelledby='hero-heading']");
    const heading = screen.getByRole("heading", { level: 1 });
    const supportingCopy = heading.nextElementSibling;
    const actions = supportingCopy?.nextElementSibling;

    expect(section).toHaveClass("pt-8", "pb-[max(2rem,env(safe-area-inset-bottom))]");
    expect(section).not.toHaveClass("min-h-[650px]");
    expect(heading).toHaveClass("font-bold", "leading-[1.02]", "tracking-[-0.04em]");
    expect(supportingCopy).toHaveClass("mt-4", "max-w-[34ch]", "leading-7");
    expect(actions).toHaveClass("mt-6", "gap-3");
    expect(screen.getByRole("link", { name: /Explore Services/i })).toHaveClass("min-h-12", "px-2", "active:opacity-75");
  });

  it("eagerly loads a responsive background poster when the CMS provides one", () => {
    const { container } = render(
      <VideoHero data={{ heroBackgroundPosterUrl: "https://cdn.example/hero-poster.jpg" }} />,
    );

    const poster = container.querySelector('img[src="https://cdn.example/hero-poster.jpg"]');
    expect(poster).toHaveAttribute("loading", "eager");
    expect(poster).toHaveAttribute("sizes", "100vw");
    expect(poster).toHaveAttribute("width", "1600");
    expect(poster).toHaveAttribute("height", "900");

    fireEvent.load(poster as HTMLImageElement);
    expect(poster).toHaveClass("opacity-100");
  });

  it("falls back to the brand treatment when a hero poster fails", () => {
    const { container } = render(
      <VideoHero data={{ heroBackgroundPosterUrl: "https://cdn.example/missing-poster.jpg" }} />,
    );

    const poster = container.querySelector('img[src="https://cdn.example/missing-poster.jpg"]');
    fireEvent.error(poster as HTMLImageElement);

    expect(container.querySelector('img[src="https://cdn.example/missing-poster.jpg"]')).not.toBeInTheDocument();
  });

  it("defers mobile overview media until the visitor requests it", async () => {
    const user = userEvent.setup();
    render(<VideoHero data={{ heroPlayerVideoUrl: "https://cdn.example/video.mp4" }} />);

    const trigger = screen.getByTestId("mobile-hero-video-trigger");
    await user.click(trigger);
    expect(screen.queryByTestId("mobile-hero-video-trigger")).not.toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "See how Union National Tax works" })).toHaveLength(2);
  });

  it("does not mount decorative poster or background video media on mobile", () => {
    viewport.isDesktop = false;
    const { container } = render(
      <VideoHero
        data={{
          heroBackgroundPosterUrl: "https://cdn.example/hero-poster.jpg",
          heroVideoUrl: "https://cdn.example/hero-background.mp4",
          heroPlayerVideoUrl: "https://cdn.example/hero-player.mp4",
        }}
      />,
    );

    expect(container.querySelector('img[src="https://cdn.example/hero-poster.jpg"]')).not.toBeInTheDocument();
    expect(container.querySelector('video[src="https://cdn.example/hero-background.mp4"]')).not.toBeInTheDocument();
  });

  it("tracks the primary action and only one foreground video start", async () => {
    render(<VideoHero data={{ heroPlayerVideoUrl: "https://cdn.example/video.mp4" }} />);

    fireEvent.click(screen.getByRole("link", { name: /See If an S-Corp Could Save You Money/ }));
    fireEvent.click(screen.getByRole("link", { name: /See If an S-Corp Could Save You Money/ }));
    fireEvent.click(screen.getByTestId("hero-video-player"));
    fireEvent.click(screen.getByTestId("hero-video-player"));

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

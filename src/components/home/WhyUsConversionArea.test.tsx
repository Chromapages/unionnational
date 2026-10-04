import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { WhyUsConversionArea } from "./WhyUsConversionArea";

vi.mock("@/i18n/navigation", () => ({
  Link: ({
    href,
    children,
    onClick,
    ...props
  }: React.ComponentPropsWithoutRef<"a"> & { href: string }) => (
    <a href={href} onClick={onClick} {...props}>
      {children}
    </a>
  ),
}));

describe("WhyUsConversionArea", () => {
  beforeEach(() => {
    (window as unknown as { dataLayer?: Record<string, unknown>[] }).dataLayer = [];
    vi.clearAllMocks();
  });

  it("renders semantically correct links with native href attributes", () => {
    render(
      <WhyUsConversionArea
        conclusion="More time to plan means fewer decisions made under pressure."
        primaryCtaText="See how proactive tax planning works"
        secondaryCtaText="Check your S-Corp fit"
      />
    );

    const primaryLink = screen.getByRole("link", {
      name: /See how proactive tax planning works/i,
    });
    const secondaryLink = screen.getByRole("link", {
      name: /Check your S-Corp fit/i,
    });

    expect(primaryLink).toBeInTheDocument();
    expect(primaryLink).toHaveAttribute("href", "/tax-planning");
    expect(primaryLink.tagName).toBe("A");

    expect(secondaryLink).toBeInTheDocument();
    expect(secondaryLink).toHaveAttribute("href", "/scorp-estimator");
    expect(secondaryLink.tagName).toBe("A");
  });

  it("enforces touch target sizes and visual hierarchy", () => {
    render(
      <WhyUsConversionArea
        conclusion="Conclusion text"
        primaryCtaText="Primary Action"
        secondaryCtaText="Secondary Action"
      />
    );

    const primaryLink = screen.getByRole("link", { name: /Primary Action/i });
    const secondaryLink = screen.getByRole("link", { name: /Secondary Action/i });

    // Primary has filled style and min-h-[48px] (>= 44px)
    expect(primaryLink.className).toContain("min-h-[48px]");
    expect(primaryLink.className).toContain("bg-gold-500");
    expect(primaryLink.className).toContain("text-brand-950");

    // Secondary has min-h-[44px] and underline decoration
    expect(secondaryLink.className).toContain("min-h-[44px]");
    expect(secondaryLink.className).toContain("underline");
  });

  it("marks the arrow icon as decorative with aria-hidden", () => {
    const { container } = render(
      <WhyUsConversionArea
        conclusion="Conclusion text"
        primaryCtaText="Primary Action"
      />
    );

    const svgIcon = container.querySelector("svg");
    expect(svgIcon).toBeInTheDocument();
    expect(svgIcon).toHaveAttribute("aria-hidden", "true");
  });

  it("dispatches primary_cta_click tracking payload on click without blocking navigation", () => {
    render(
      <WhyUsConversionArea
        conclusion="Conclusion text"
        primaryCtaText="See how proactive tax planning works"
        secondaryCtaText="Check your S-Corp fit"
      />
    );

    const primaryLink = screen.getByRole("link", {
      name: /See how proactive tax planning works/i,
    });

    fireEvent.click(primaryLink);

    const dataLayer = (window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer;
    const clickEvent = dataLayer.find((e) => e.event === "primary_cta_click");

    expect(clickEvent).toBeDefined();
    expect(clickEvent).toEqual({
      event: "primary_cta_click",
      cta_id: "why_us_primary_cta",
      placement: "why_us_section",
      destination: "/tax-planning",
    });
  });

  it("dispatches secondary_cta_click tracking payload on click without blocking navigation", () => {
    render(
      <WhyUsConversionArea
        conclusion="Conclusion text"
        primaryCtaText="See how proactive tax planning works"
        secondaryCtaText="Check your S-Corp fit"
      />
    );

    const secondaryLink = screen.getByRole("link", {
      name: /Check your S-Corp fit/i,
    });

    fireEvent.click(secondaryLink);

    const dataLayer = (window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer;
    const clickEvent = dataLayer.find((e) => e.event === "secondary_cta_click");

    expect(clickEvent).toBeDefined();
    expect(clickEvent).toEqual({
      event: "secondary_cta_click",
      cta_id: "why_us_secondary_cta",
      placement: "why_us_section",
      destination: "/scorp-estimator",
    });
  });

  it("renders single primary CTA when secondary CTA is omitted", () => {
    render(
      <WhyUsConversionArea
        conclusion="Single action test"
        primaryCtaText="Primary Action Only"
      />
    );

    expect(screen.getByRole("link", { name: /Primary Action Only/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Check your S-Corp fit/i })).not.toBeInTheDocument();
  });
});

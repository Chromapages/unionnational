import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { UnifiedVSLTemplate } from "@/components/vsl/UnifiedVSLTemplate";
import RestaurantVSLClient from "./RestaurantVSLClient";

vi.mock("next/link", () => ({ default: (props: React.ComponentPropsWithoutRef<"a">) => <a {...props} /> }));
vi.mock("@/components/ui/LuxuryTravelIncentive", () => ({ LuxuryTravelIncentive: () => null }));
vi.mock("@/components/ui/VideoEmbed", () => ({ default: () => null }));
vi.mock("@/components/vsl/VSLMetricsBar", () => ({ VSLMetricsBar: () => null }));
vi.mock("@/components/vsl/VSLProblemStatement", () => ({ VSLProblemStatement: () => null }));
vi.mock("@/components/vsl/VSLHowItWorks", () => ({ VSLHowItWorks: () => null }));
vi.mock("@/components/vsl/VSLClientResults", () => ({ VSLClientResults: () => null }));
vi.mock("@/components/vsl/VSLTestimonial", () => ({ VSLTestimonial: () => null }));
vi.mock("@/components/vsl/VSLFaq", () => ({ VSLFaq: () => null }));

afterEach(cleanup);

describe("legacy restaurant primary action", () => {
  it.each(["/en/vsl/construction", "/vsl", "/apply"])("ignores CMS destination %s in both languages", (heroCtaUrl) => {
    for (const locale of ["en", "es", undefined]) {
      render(<RestaurantVSLClient locale={locale} data={{
        heroCtaUrl,
        heroCtaText: "Apply now",
        heroHeadline: "Legacy restaurant headline",
        ctaHeadline: "Legacy final headline",
        urgencyText: "Legacy final subtext",
      }} />);

      const label = locale === "es" ? "Hablemos de su restaurante" : "Discuss restaurant support";
      const links = screen.getAllByRole("link", { name: label });
      expect(links).toHaveLength(3);
      for (const link of links) {
        expect(link).toHaveAttribute("href", `/${locale === "es" ? "es" : "en"}/industries/restaurants#consultation-form`);
      }
      expect(screen.queryByRole("link", { name: "Apply now" })).not.toBeInTheDocument();
      expect(screen.getByRole("heading", { name: "Legacy restaurant headline" })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: "Legacy final headline" })).toBeInTheDocument();
      expect(screen.getByText("Legacy final subtext")).toBeInTheDocument();
      cleanup();
    }
  });

  it("uses the restaurant action without CMS data", () => {
    render(<RestaurantVSLClient locale="es" />);
    const links = screen.getAllByRole("link", { name: "Hablemos de su restaurante" });
    expect(links).toHaveLength(3);
    for (const link of links) {
      expect(link).toHaveAttribute("href", "/es/industries/restaurants#consultation-form");
    }
  });
});

describe("shared VSL compatibility", () => {
  it.each(["construction", "real-estate", "tax-resolution"] as const)("preserves %s CMS actions and defaults without an override", (industry) => {
    const { rerender } = render(<UnifiedVSLTemplate industry={industry} data={{ heroCtaUrl: "/existing-campaign", heroCtaText: "Existing action" }} />);
    expect(screen.getAllByRole("link", { name: "Existing action" })).toHaveLength(2);
    for (const link of screen.getAllByRole("link", { name: "Existing action" })) {
      expect(link).toHaveAttribute("href", "/existing-campaign");
    }
    expect(screen.getByRole("link", { name: "Book Your Free Strategy Call" })).toHaveAttribute("href", "/apply");

    rerender(<UnifiedVSLTemplate industry={industry} data={{}} />);
    expect(screen.getByRole("link", { name: "Book Strategy Call" })).toHaveAttribute("href", "#cta");
    expect(screen.getByRole("link", { name: "Get Started" })).toHaveAttribute("href", "/apply");
    expect(screen.getByRole("link", { name: "Book Your Free Strategy Call" })).toHaveAttribute("href", "/apply");
  });
});

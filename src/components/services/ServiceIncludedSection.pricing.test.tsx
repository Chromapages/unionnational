import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ServiceIncludedSection } from "./ServiceIncludedSection";
import { getDraftPricingPage } from "@/lib/pricing/fixtures";

describe("service detail shared pricing", () => {
  it.each(["en", "es"])("shows each filing offer, federal/Utah limits and exclusions in %s", locale => {
    const offers = getDraftPricingPage(locale).offers!.filter(offer => offer.category === "business" || offer.category === "individual");
    const html = renderToStaticMarkup(<ServiceIncludedSection id="included" locale={locale} scopeLabel="Scope" included={{ heading: "Included", items: ["Reviewed scope"], pricingOffers: offers, pricing: { headline: "$1,800", detail: "obsolete" } }} />);
    expect(html).toContain("$1,495"); expect(html).toContain("$1,795"); expect(html).toContain("$595");
    expect(html).toContain(locale === "es" ? "Desde" : "From");
    expect(html).toContain("Utah");
    expect(html).toContain(locale === "es" ? "alquileres" : "rentals");
    expect(html).not.toContain("/year"); expect(html).not.toContain("$1,800"); expect(html).not.toContain("obsolete");
  });
  it("keeps IRS review credit distinct from the strategy session and shows missing setup amount without inventing it", () => {
    const offers = getDraftPricingPage("en").offers!;
    for (const slug of ["irs-case-review", "strategy-session", "payroll"]) {
      const offer = offers.find(item => item.slug.current === slug)!;
      const html = renderToStaticMarkup(<ServiceIncludedSection id="included" scopeLabel="Scope" included={{ heading: "Included", items: [], pricingOffers: [offer] }} />);
      expect(html).toContain(offer.price!);
      if (slug === "irs-case-review") { expect(html).toContain("credited toward resolution"); expect(html).not.toContain("30 days"); expect(html).toContain("guarantee an IRS outcome"); }
      if (slug === "strategy-session") expect(html).toContain("30 days");
      if (slug === "payroll") { expect(html).toContain("setup fee applies; amount pending"); expect(html).toContain("Up to 10 employees"); expect(html).not.toContain("$15"); }
    }
  });
});

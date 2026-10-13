import { describe, expect, it } from "vitest";
import { formatOfferPrice, getOfferHref, pricingOffersSchema } from "./offers";
import type { PricingTier } from "@/types/sanity";

const offer: PricingTier = { _id: "fixture:offer", name: "Offer", slug: { current: "offer" }, category: "optional", price: "From $595" };

describe("shared offer display", () => {
  it.each([
    ["monthly", "en", "From $595/month"], ["monthly", "es", "From $595/mes"],
    ["annually", "en", "From $595/year"], ["annually", "es", "From $595/año"],
    ["quarterly", "es", "From $595/trimestre"], ["one-time", "en", "From $595"],
    [undefined, "en", "From $595"], ["unsupported", "en", "From $595"],
  ])("respects %s billing in %s", (billingPeriod, locale, expected) => {
    expect(formatOfferPrice({ ...offer, billingPeriod }, locale)).toBe(expected);
  });
  it("keeps custom quotes unpriced and avoids a second suffix on legacy display strings", () => {
    expect(formatOfferPrice({ ...offer, price: "Custom flat-fee quote", billingPeriod: "monthly" }, "en")).toBe("Custom flat-fee quote");
    expect(formatOfferPrice({ ...offer, price: "Desde $595/mes", billingPeriod: "monthly" }, "es")).toBe("Desde $595/mes");
  });
  it("fails safely when a price is absent", () => {
    expect(formatOfferPrice({ ...offer, price: " " }, "es")).toBe("Consulte los precios");
    expect(formatOfferPrice({ ...offer, price: undefined }, "en")).toBe("Contact us for pricing");
  });
  it("preserves CMS destinations and locale without permitting executable or protocol-relative URLs", () => {
    expect(getOfferHref({ ...offer, ctaUrl: "/contact?service=paid-review" }, "es")).toBe("/es/contact?service=paid-review");
    expect(getOfferHref({ ...offer, ctaUrl: "/en/book" }, "es")).toBe("/es/book");
    expect(getOfferHref({ ...offer, ctaUrl: "https://example.com/inquiry" }, "en")).toBe("https://example.com/inquiry");
    for (const ctaUrl of ["javascript:alert(1)", "//example.com", "/\\example.com", "https://user:password@example.com"]) {
      expect(getOfferHref({ ...offer, ctaUrl }, "es")).toBe("/es/contact");
    }
  });
  it("removes malformed references without discarding valid CMS scope, translated features or source order", () => {
    expect(pricingOffersSchema.parse([null, offer, { ...offer, _id: "second", name: "Oferta", price: {}, priceNote: "Límite aprobado", features: ["Texto CMS", null, ""] }])).toEqual([
      offer, { ...offer, _id: "second", name: "Oferta", price: undefined, priceNote: "Límite aprobado", features: ["Texto CMS"] },
    ]);
    expect(pricingOffersSchema.parse(null)).toEqual([]);
  });
});

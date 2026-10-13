import { z } from "zod";
import { safeHref } from "@/lib/security/content-urls";
import type { PricingTier } from "@/types/sanity";

const optionalText = z.string().trim().min(1).optional().catch(undefined);
export const pricingOfferSchema = z.object({
  _id: z.string().min(1), name: z.string().trim().min(1),
  slug: z.object({ current: z.string() }).catch({ current: "" }),
  category: z.string().catch("optional"),
  price: optionalText, priceNote: optionalText, tagline: optionalText,
  billingPeriod: optionalText, includes: optionalText, bestFor: optionalText,
  features: z.array(z.string().trim().min(1).optional().catch(undefined)).optional().catch([]).transform(items => items?.filter((item): item is string => item !== undefined)),
  displayOrder: z.number().optional().catch(undefined),
  isFeatured: z.boolean().optional().catch(undefined), ctaText: optionalText, ctaUrl: optionalText,
  relatedService: z.object({ _id: optionalText, title: z.string().catch(""), slug: z.object({ current: z.string() }) }).optional().catch(undefined),
});
export const pricingOffersSchema = z.array(pricingOfferSchema.optional().catch(undefined)).catch([])
  .transform(items => items.filter(item => item !== undefined));

export function formatOfferPrice(offer: Pick<PricingTier, "price" | "billingPeriod">, locale: string): string {
  const price = offer.price?.trim();
  if (!price) return locale === "es" ? "Consulte los precios" : "Contact us for pricing";
  if (!/\d/.test(price) || /\/\s*(?:month|mo|mes|year|yr|año|quarter|trimestre)\b/i.test(price)) return price;
  const labels: Record<string, string> = locale === "es"
    ? { monthly: "/mes", quarterly: "/trimestre", annually: "/año" }
    : { monthly: "/month", quarterly: "/quarter", annually: "/year" };
  return price + (labels[offer.billingPeriod || ""] || "");
}

export function localePricingHref(value: unknown, locale: string, fallback = "/contact"): string {
  const href = safeHref(value) || safeHref(fallback) || "/contact";
  if (!href.startsWith("/")) return href;
  return `/${locale === "es" ? "es" : "en"}${href.replace(/^\/(?:en|es)(?=\/|\?|#|$)/, "")}`;
}

export function getOfferHref(offer: Pick<PricingTier, "ctaUrl">, locale: string): string {
  return localePricingHref(offer.ctaUrl, locale);
}

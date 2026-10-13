import "server-only";
import { z } from "zod";
import { sanityFetch } from "@/sanity/lib/live";
import { PRICING_PAGE_QUERY } from "@/sanity/lib/queries";
import { getServiceHref } from "@/components/layout/navigationData";
import { getDraftPricingPage } from "./fixtures";
import { pricingOfferSchema, pricingOffersSchema } from "./offers";
import type { PricingPageContent, PricingTier } from "@/types/sanity";
import type { ServicePageContent } from "@/components/services/ServicePageTemplate";

const optionalText = z.string().optional().catch(undefined);
const seoImage = z.object({
  _type: z.literal("image").default("image"),
  asset: z.object({ _type: z.literal("reference").default("reference"), _ref: z.string().regex(/^image-[a-z0-9]+-[1-9]\d*x[1-9]\d*-[a-z0-9]+$/i) }),
}).passthrough().optional().catch(undefined);
const pricingPageSchema = z.object({
  _id: optionalText,
  hero: z.object({ heading: optionalText, description: optionalText }).optional().catch(undefined),
  offers: pricingOffersSchema,
  irsReviewOffer: pricingOfferSchema.optional().catch(undefined),
  faq: z.object({ heading: optionalText, items: z.array(z.object({ question: z.string().trim().min(1), answer: z.string().trim().min(1) }).optional().catch(undefined)).catch([]).transform(items => items.filter(item => item !== undefined)) }).optional().catch(undefined),
  closing: z.object({ heading: optionalText, description: optionalText, label: optionalText, href: optionalText }).optional().catch(undefined),
  seo: z.object({ metaTitle: optionalText, metaDescription: optionalText, noIndex: z.boolean().optional().catch(undefined), openGraphImage: seoImage, keywords: z.array(z.string()).optional().catch(undefined) }).optional().catch(undefined),
});

export function isPricingDraftPreview(): boolean {
  return process.env.NODE_ENV === "development" && process.env.UNT_PRICING_PREVIEW === "1";
}

export async function getPricingContent(locale: string): Promise<{ page: PricingPageContent | null; tiers: PricingTier[]; preview: boolean }> {
  if (isPricingDraftPreview()) {
    const page = getDraftPricingPage(locale);
    return { page, tiers: page.offers || [], preview: true };
  }
  try {
    const { data } = await sanityFetch({ query: PRICING_PAGE_QUERY, params: { locale } });
    const parsed = pricingPageSchema.safeParse(data);
    const page = parsed.success ? parsed.data : null;
    return { page, tiers: page?.offers || [], preview: false };
  } catch {
    console.error("Pricing content unavailable; showing neutral inquiry content.");
    return { page: null, tiers: [], preview: false };
  }
}

function offersForService(tiers: PricingTier[], slug: string): PricingTier[] {
  const path = getServiceHref({ slug: { current: slug } });
  return tiers.filter(offer => offer.relatedService && getServiceHref(offer.relatedService) === path);
}

export async function getServicePricingOffers(slug: string, locale: string): Promise<PricingTier[]> {
  const { page, tiers } = await getPricingContent(locale);
  if (slug === "back-taxes-irs-tax-resolution") return tiers.filter(offer => offer._id === page?.irsReviewOffer?._id);
  return offersForService(tiers, slug);
}

export function applyPreviewServiceOffers<T extends { slug: { current: string }; pricingOffers?: PricingTier[] }>(services: T[], locale: string): Array<T & { pricingOffers?: PricingTier[] }> {
  if (!isPricingDraftPreview()) return services;
  const tiers = getDraftPricingPage(locale).offers || [];
  return services.map(service => ({ ...service, pricingOffers: offersForService(tiers, service.slug.current) }));
}

export async function applyServicePricing<T extends ServicePageContent>(page: T, locale: string): Promise<T> {
  if (!["fractional-cfo", "strategic-bookkeeping", "payroll-services", "tax-planning", "tax-preparation-and-filing", "back-taxes-irs-tax-resolution"].includes(page.slug.current)) return page;
  const preview = isPricingDraftPreview();
  const offers = preview
    ? await getServicePricingOffers(page.slug.current, locale)
    : pricingOffersSchema.parse(page.included.pricingOffers);
  const previewScope = preview && page.slug.current !== "back-taxes-irs-tax-resolution";
  return {
    ...page,
    ...(previewScope && page.slug.current === "tax-preparation-and-filing" ? { hero: { ...page.hero,
      subheadline: locale === "es" ? "Declaraciones federales y de Utah. Los estados adicionales, ingresos empresariales y alquileres se cotizan por separado." : "Federal and Utah returns. Additional states, business income and rentals are quoted separately.",
    } } : {}),
    ...(previewScope && ["tax-planning", "fractional-cfo"].includes(page.slug.current) ? {
      process: { ...page.process, steps: page.process.steps.filter(step => !/quarterly|trimestral/i.test([step.title, step.duration, step.description].join(" "))) },
    } : {}),
    ...(previewScope ? { faqSection: {
      heading: locale === "es" ? "Preguntas sobre el alcance en borrador" : "Draft scope questions",
      items: offers.map(offer => ({
        question: locale === "es" ? `¿Qué incluye ${offer.name}?` : `What does ${offer.name} include?`,
        answer: [offer.includes, offer.priceNote].filter(Boolean).join(" "),
      })),
    } } : {}),
    included: {
      ...page.included, pricingOffers: offers,
      ...(previewScope ? {
        heading: locale === "es" ? "Alcance y precios en borrador" : "Draft scope and pricing",
        description: locale === "es" ? "El alcance comercial mostrado corresponde al borrador del 12 de octubre y está pendiente de aprobación." : "The commercial scope below comes from the October 12 draft and is pending approval.",
        items: [],
      } : {}),
      pricing: offers.length ? undefined : { headline: locale === "es" ? "Consulte los precios" : "Contact us for pricing" },
    },
  };
}

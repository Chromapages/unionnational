import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { applyPreviewServiceOffers, applyServicePricing, getPricingContent, getServicePricingOffers, isPricingDraftPreview } from "./data";
import { getDraftPricingPage } from "./fixtures";
import { getTaxResolutionContent } from "@/lib/services/tax-resolution-content";

const fetchMock = vi.hoisted(() => vi.fn());
vi.mock("@/sanity/lib/live", () => ({ sanityFetch: fetchMock }));

describe("bounded pricing source", () => {
  beforeEach(() => { fetchMock.mockReset(); vi.stubEnv("UNT_PRICING_PREVIEW", ""); vi.stubEnv("NODE_ENV", "test"); });
  afterEach(() => vi.unstubAllEnvs());

  it("requires explicit development opt-in and never enables fixtures in production", async () => {
    vi.stubEnv("UNT_PRICING_PREVIEW", "1");
    expect(isPricingDraftPreview()).toBe(false);
    vi.stubEnv("NODE_ENV", "production");
    expect(isPricingDraftPreview()).toBe(false);
    vi.stubEnv("NODE_ENV", "development");
    expect(isPricingDraftPreview()).toBe(true);
    const result = await getPricingContent("es");
    expect(result.preview).toBe(true);
    expect(result.tiers).toHaveLength(10);
    expect(result.page?.seo?.noIndex).toBe(true);
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it("does not restore unselected legacy tiers or superseded prices when pricingPage is missing", async () => {
    fetchMock.mockResolvedValue({ data: null });
    expect(await getPricingContent("en")).toEqual({ page: null, tiers: [], preview: false });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
  it("retains CMS reference order and filters invalid optional data", async () => {
    const page = getDraftPricingPage("es");
    fetchMock.mockResolvedValue({ data: { ...page, offers: [null, page.offers?.[6], page.offers?.[0]], faq: { items: [null, { question: "Pregunta", answer: "Respuesta" }] } } });
    const result = await getPricingContent("es");
    expect(result.tiers.map(tier => tier.slug.current)).toEqual(["tax-planning", "cpob"]);
    expect(result.page?.faq?.items).toEqual([{ question: "Pregunta", answer: "Respuesta" }]);
  });
  it("handles CMS failures with neutral content", async () => {
    fetchMock.mockRejectedValue(new Error("CMS unavailable"));
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(await getPricingContent("en")).toEqual({ page: null, tiers: [], preview: false });
    expect(log).toHaveBeenCalled();
    log.mockRestore();
  });
  it("omits malformed optional SEO assets and keyword values while retaining editorial metadata", async () => {
    fetchMock.mockResolvedValue({ data: { offers: [], seo: { metaTitle: "CMS title", openGraphImage: { asset: "invalid" }, keywords: [null, {}] } } });
    const result = await getPricingContent("en");
    expect(result.page?.seo).toEqual({ metaTitle: "CMS title", openGraphImage: undefined, keywords: undefined });
    fetchMock.mockResolvedValue({ data: { offers: [], seo: { openGraphImage: { _type: "image", asset: { _type: "reference", _ref: "image-a1b2-1200x630-jpg" } }, keywords: ["Tax pricing"] } } });
    const valid = await getPricingContent("en");
    expect(valid.page?.seo?.openGraphImage?.asset._ref).toBe("image-a1b2-1200x630-jpg");
    expect(valid.page?.seo?.keywords).toEqual(["Tax pricing"]);
  });
  it("bridges IRS pricing through actual related-service routes, without a CMS ID or a 30-day credit", async () => {
    fetchMock.mockResolvedValue({ data: getDraftPricingPage("en") });
    const offers = await getServicePricingOffers("back-taxes-irs-tax-resolution", "en");
    expect(offers).toHaveLength(1);
    expect(offers[0].price).toBe("$750");
    expect(offers[0].priceNote).not.toMatch(/30/);
    expect(await getServicePricingOffers("s-corp-tax-advantage", "en")).toEqual([]);
  });
  it("changes fixture service references only during local preview and keeps unrelated service data", () => {
    const services = [{ _id: "real-service", slug: { current: "fractional-cfo" }, startingPrice: "old", title: "Keep title" }];
    expect(applyPreviewServiceOffers(services, "en")).toBe(services);
    vi.stubEnv("NODE_ENV", "development"); vi.stubEnv("UNT_PRICING_PREVIEW", "1");
    const preview = applyPreviewServiceOffers(services, "en");
    expect(preview[0].pricingOffers?.[0].price).toBe("From $2,500");
    expect(preview[0].title).toBe("Keep title");
    expect(services[0]).not.toHaveProperty("pricingOffers");
  });

  it("never guesses the IRS CMS offer from an English name, fabricated service ID or unselected record", async () => {
    const page = getDraftPricingPage("en");
    fetchMock.mockResolvedValue({ data: { ...page, irsReviewOffer: undefined } });
    expect(await getServicePricingOffers("back-taxes-irs-tax-resolution", "en")).toEqual([]);
    fetchMock.mockResolvedValue({ data: { ...page, irsReviewOffer: { ...page.irsReviewOffer, _id: "unselected" } } });
    expect(await getServicePricingOffers("back-taxes-irs-tax-resolution", "en")).toEqual([]);
  });

  it("removes affected legacy detail prices while retaining reviewed narrative and explicitly linked offers", async () => {
    const { page } = getTaxResolutionContent("es");
    const draft = getDraftPricingPage("es");
    const existing = { ...page, included: { ...page.included, pricing: { headline: "$350-$1,200/year", detail: "obsolete" } } };
    const neutral = await applyServicePricing(existing, "es");
    expect(neutral.included.pricing).toEqual({ headline: "Consulte los precios" });
    expect(neutral.faqSection).toBe(page.faqSection);
    expect(neutral.closing).toBe(page.closing);
    const shared = await applyServicePricing({ ...existing, included: { ...existing.included, pricingOffers: [draft.irsReviewOffer!] } }, "es");
    expect(shared.included.pricing).toBeUndefined();
    expect(shared.included.pricingOffers?.[0].price).toBe("$750");
    vi.stubEnv("NODE_ENV", "development"); vi.stubEnv("UNT_PRICING_PREVIEW", "1");
    expect((await applyServicePricing(existing, "es")).included.pricingOffers?.[0].price).toBe("$750");
  });

  it("preserves unrelated offers including the separate S-corp advisory program", async () => {
    const { page } = getTaxResolutionContent("en");
    const unrelated = { ...page, slug: { current: "s-corp-tax-advantage" }, included: { ...page.included, pricing: { headline: "Custom advisory scope" } } };
    expect(await applyServicePricing(unrelated, "en")).toBe(unrelated);
  });

  it("does not attach new starting prices to the old unapproved scope, meeting cadence or audit guarantees in preview", async () => {
    vi.stubEnv("NODE_ENV", "development"); vi.stubEnv("UNT_PRICING_PREVIEW", "1");
    const { page } = getTaxResolutionContent("en");
    const planning = { ...page, slug: { current: "tax-planning" }, included: { ...page.included, items: ["Quarterly meetings included", "Free audit defense"] }, faqSection: { heading: "Old scope", items: [{ question: "Audit protection?", answer: "Included at no additional cost" }] } };
    const draft = await applyServicePricing(planning, "en");
    expect(draft.included.items).toEqual([]);
    expect(draft.included.pricingOffers?.[0].price).toBe("From $3,500");
    expect(JSON.stringify(draft.faqSection)).not.toMatch(/Free audit defense|at no additional cost|Quarterly meetings included/);
    expect(draft.hero).toBe(page.hero);
    const filing = await applyServicePricing({ ...planning, slug: { current: "tax-preparation-and-filing" }, hero: { ...page.hero, subheadline: "Automated audit protection" } }, "en");
    expect(filing.hero.subheadline).toContain("Federal and Utah");
    expect(filing.hero.subheadline).not.toMatch(/audit protection/i);
    const cadence = await applyServicePricing({ ...planning, process: { heading: "Process", steps: [{ title: "Quarterly review", description: "Included meetings" }, { title: "Scope review", description: "Review needs" }] } }, "en");
    expect(cadence.process.steps).toHaveLength(1);
    expect(cadence.process.steps[0].title).toBe("Scope review");
    const irs = await applyServicePricing(page, "en");
    expect(irs.included.items).toBe(page.included.items);
    expect(irs.faqSection).toBe(page.faqSection);
    expect(irs.closing).toBe(page.closing);
  });
});

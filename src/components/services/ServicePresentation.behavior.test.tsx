import { act, cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Children, cloneElement, isValidElement } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import english from "@/messages/en.json";
import spanish from "@/messages/es.json";
import { ServicePageTemplate, renderHeroHeadline, bookingHref } from "./ServicePageTemplate";
import { QualificationCheckpoint } from "./QualificationCheckpoint";
import { ServiceProcessSection } from "./ServiceProcessSection";
import { ServiceIncludedSection } from "./ServiceIncludedSection";
import { ServiceHero } from "./ServiceHero";
import { CmsServicePage, fetchCmsService, getCmsServiceMetadata } from "./CmsServicePage";
import type { ServicePage } from "@/types/sanity";

type Observer = { targets: Set<Element>; callback: IntersectionObserverCallback; disconnect: ReturnType<typeof vi.fn> };
const fixture = vi.hoisted(() => ({ locale: "en", fetch: vi.fn(), missing: vi.fn(() => { throw new Error("NEXT_NOT_FOUND"); }), observers: [] as Observer[], navigations: [] as string[] }));
function translated(namespace: string, locale = fixture.locale) {
  const messages = locale === "es" ? spanish : english;
  const read = (key: string) => `${namespace}.${key}`.split(".").reduce<unknown>((value, part) => value && typeof value === "object" ? (value as Record<string, unknown>)[part] : undefined, messages);
  return Object.assign((key: string) => typeof read(key) === "string" ? read(key) as string : key, { raw: read });
}
vi.mock("next-intl", () => ({ useLocale: () => fixture.locale, useTranslations: (namespace: string) => translated(namespace) }));
vi.mock("next-intl/server", () => ({ getTranslations: async ({ namespace, locale }: { namespace: string; locale?: string }) => translated(namespace, locale) }));
vi.mock("@/i18n/navigation", () => ({ usePathname: () => "/services/custom-advisory", Link: ({ href, children, onClick, ...props }: React.ComponentPropsWithoutRef<"a">) => <a {...props} href={href} onClick={event => { onClick?.(event); if (!event.defaultPrevented && href) fixture.navigations.push(href); event.preventDefault(); }}>{children}</a> }));
vi.mock("@/sanity/lib/live", () => ({ sanityFetch: fixture.fetch }));
vi.mock("@/sanity/lib/queries", () => ({ SERVICE_PAGE_QUERY: "service-fixture" }));
vi.mock("@/sanity/lib/image", () => ({ urlFor: () => ({ width: () => ({ height: () => ({ url: () => "https://cdn.example.test/service.png" }) }) }) }));
vi.mock("next/navigation", () => ({ notFound: fixture.missing }));
vi.mock("@/components/layout/HeaderWrapper", () => ({ HeaderWrapper: () => null }));
vi.mock("@/components/layout/Footer", () => ({ Footer: () => <footer id="site-footer">Site footer</footer> }));
vi.mock("framer-motion", async () => {
  const { createElement, forwardRef } = await import("react");
  const element = (tag: string) => forwardRef<Element, Record<string, unknown>>(({ children, initial, animate, exit, transition, variants, ...props }, ref) => { void initial; void animate; void exit; void transition; void variants; return createElement(tag, { ...props, ref }, children as React.ReactNode); });
  return { motion: { div: element("div") }, AnimatePresence: ({ children }: React.PropsWithChildren) => children, useReducedMotion: () => true };
});

function service(overrides: Partial<ServicePage> = {}): ServicePage {
  return {
    _id: "synthetic-service", _type: "servicePage", _rev: "synthetic-revision", _createdAt: "2026-01-01", _updatedAt: "2026-01-01",
    title: "Approved Advisory", slug: { current: "custom-advisory" }, canonicalPath: "/services/custom-advisory",
    hero: { eyebrow: "Service introduction", headline: "A clear plan for your business", highlight: "clear plan", subheadline: "Discuss the support your business needs.", primaryCta: { label: "Book a review", href: "/contact" }, secondaryCta: { label: "Review included support", href: "#scope" } },
    eligibility: { heading: "Is this service a fit?", items: ["An approved business criterion"], cta: { label: "Discuss eligibility", href: "/contact", microcopy: "Bring your questions." } },
    comparison: { heading: "Review the options", description: "A documented comparison.", conclusion: "Make a considered decision", pairs: [] },
    process: { heading: "How the review works", steps: [{ title: "First review", duration: "One week", description: "Review the submitted information." }] },
    included: { heading: "Included scope", items: ["Approved scope item"] },
    faqSection: { heading: "Approved service questions", items: [{ question: "What is included?", answer: "The approved scope is described above." }] },
    closing: { heading: "Next step", label: "Book a review", href: "/book", disclaimer: "Scope is confirmed before work begins." },
    ...overrides,
  };
}

async function serverTree(node: React.ReactNode): Promise<React.ReactNode> {
  if (!isValidElement(node)) return node;
  if (typeof node.type === "function" && node.type.constructor.name === "AsyncFunction") return serverTree(await (node.type as (props: unknown) => Promise<React.ReactNode>)(node.props));
  const props = node.props as { children?: React.ReactNode };
  if (!props.children) return node;
  const children = await Promise.all(Children.toArray(props.children).map(serverTree));
  return cloneElement(node as React.ReactElement<{ children?: React.ReactNode }>, { children });
}

function intersects(id: string, isIntersecting: boolean) {
  const target = document.getElementById(id)!;
  const bounds = target.getBoundingClientRect();
  const entry: IntersectionObserverEntry = { target, isIntersecting, boundingClientRect: bounds, intersectionRect: bounds, intersectionRatio: isIntersecting ? 1 : 0, rootBounds: null, time: performance.now() };
  act(() => fixture.observers.filter(observer => observer.targets.has(target)).forEach(observer => observer.callback([entry], {} as IntersectionObserver)));
}

beforeEach(() => {
  fixture.locale = "en"; fixture.fetch.mockReset(); fixture.missing.mockClear(); fixture.observers.length = 0; fixture.navigations.length = 0;
  window.history.replaceState({}, "", "/en/services/custom-advisory");
  vi.stubGlobal("IntersectionObserver", class {
    targets = new Set<Element>(); disconnect = vi.fn(() => this.targets.clear());
    constructor(public callback: IntersectionObserverCallback) { fixture.observers.push(this); }
    observe(target: Element) { this.targets.add(target); } unobserve(target: Element) { this.targets.delete(target); }
  });
  const css = document.createElement("style"); css.dataset.serviceTestStyle = "true"; css.textContent = "[data-mobile-sticky-cta].hidden{display:none}"; document.head.append(css);
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); document.querySelector("style[data-service-test-style]")?.remove(); });

describe("real service page presentation", () => {
  it("keeps section destinations coherent, exposes actual FAQ answers and books through approved routes", async () => {
    const user = userEvent.setup();
    render(await ServicePageTemplate({ page: service(), locale: "en" }));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("A clear plan for your business");
    expect(screen.getByRole("link", { name: "Review included support" })).toHaveAttribute("href", "#scope");
    expect(document.getElementById("scope")).toHaveAttribute("data-service-included");
    expect(screen.getByRole("link", { name: "See how the process works" })).toHaveAttribute("href", "#custom-advisory-process");
    const question = screen.getByRole("button", { name: "What is included?" });
    expect(question).toHaveAttribute("aria-expanded", "true");
    await user.click(question); expect(question).toHaveAttribute("aria-expanded", "false");
    const primary = document.getElementById("custom-advisory-hero-cta")!;
    expect(primary).toHaveAttribute("href", "/book");
    await user.click(primary); expect(fixture.navigations).toContain("/book");
  });

  it.each(["en", "es"])("preserves approved S-Corp guidance and localized booking in %s", async locale => {
    fixture.locale = locale;
    fixture.fetch.mockResolvedValue({ data: service({ slug: { current: "s-corp-tax-advantage" }, title: "Unreviewed source title" }) });
    const page = await fetchCmsService("s-corp-tax-advantage", locale);
    render(await ServicePageTemplate({ page: page!, locale }));
    expect(screen.queryByText("Unreviewed source title")).toBeNull();
    const label = locale === "es" ? "Reservar una evaluación S-Corp" : "Book an S-Corp Evaluation";
    expect(document.getElementById("s-corp-tax-advantage-hero-cta")).toHaveTextContent(label);
    expect(document.getElementById("s-corp-tax-advantage-hero-cta")).toHaveAttribute("href", "/book");
    expect(document.querySelectorAll("[data-service-suitability] li")).toHaveLength(4);
  });

  it("omits unavailable optional sections while retaining a valid hero and contact action", async () => {
    const page = service({ eligibility: undefined, process: { heading: "", steps: [] }, included: { heading: "", items: [] }, faqSection: { heading: "", items: [] }, closing: { heading: "", label: "", href: "" }, hero: { ...service().hero, secondaryCta: undefined } });
    render(await ServicePageTemplate({ page, locale: "en" }));
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(document.querySelector("[data-service-suitability]")).toBeNull();
    expect(document.querySelector("[data-service-process]")).toBeNull();
    expect(document.querySelector("[data-service-included]")).toBeNull();
    expect(screen.queryByRole("button", { name: "What is included?" })).toBeNull();
    expect(document.getElementById("custom-advisory-hero-cta")).toHaveAttribute("href", "/book");
  });

  it("does not invent a process/included heading from nonempty CMS arrays", async () => {
    render(await ServicePageTemplate({ page: service({ process: { heading: "", steps: service().process.steps }, included: { heading: "", items: ["Approved item"] } }), locale: "en" }));
    expect(document.querySelector("[data-service-process]")).toBeNull();
    expect(document.querySelector("[data-service-included]")).toBeNull();
    expect(screen.getByRole("link", { name: "Discuss eligibility" })).toHaveAttribute("href", "/contact");
  });

  it("falls back safely for unsafe secondary destinations and keeps ordinary informational contact labels", async () => {
    const base = service();
    render(await ServicePageTemplate({ page: service({ hero: { ...base.hero, primaryCta: { label: "Discuss the service", href: "javascript:alert(1)" }, secondaryCta: { label: "Read the scope", href: "data:text/html,unsafe" } }, process: { heading: "", steps: [] }, eligibility: { heading: "Fit", items: ["Approved criterion"] } }), locale: "en" }));
    expect(document.getElementById("custom-advisory-hero-cta")).toHaveAttribute("href", "/contact");
    expect(screen.getByRole("link", { name: "Read the scope" })).toHaveAttribute("href", "#included");
    expect(screen.queryByRole("link", { name: "Discuss eligibility" })).toBeNull();
  });

  it("shows the mobile booking action only when hero, qualification, final CTA and footer are out of view", async () => {
    render(<>{await ServicePageTemplate({ page: service(), locale: "en" })}<footer id="site-footer">Footer</footer></>);
    const sticky = document.querySelector("[data-mobile-sticky-cta]")!;
    expect(sticky).not.toBeVisible();
    intersects("custom-advisory-hero-cta", false); expect(sticky).toBeVisible();
    intersects("custom-advisory-decision-sequence", true); expect(sticky).not.toBeVisible();
    intersects("custom-advisory-decision-sequence", false); expect(sticky).toBeVisible();
    intersects("service-next-step", true); expect(sticky).not.toBeVisible();
    intersects("service-next-step", false); intersects("site-footer", true); expect(sticky).not.toBeVisible();
    intersects("site-footer", false); expect(sticky).toBeVisible();
  });
});

describe("qualification content and safe omission", () => {
  it.each([{}, { heading: "Fit", items: [] }, { items: ["Approved criterion"] }])("omits incomplete qualification data without an empty heading or list", eligibility => {
    render(<QualificationCheckpoint sectionId="fit" eligibility={eligibility} />);
    expect(document.querySelector("[data-service-suitability]")).toBeNull();
  });

  it("renders complete groups with consecutive ordinals, disqualifier and an actionable explanation", () => {
    render(<QualificationCheckpoint sectionId="fit" eligibility={{ heading: "Fit", eyebrow: "Scope review", description: "Consider the requirements.", badge: "Reviewed criteria", primaryGroup: { heading: "Primary criteria", items: ["First requirement", "Second requirement"] }, secondaryGroup: { heading: "Other criteria", items: ["Third requirement"] }, disqualifierHeading: "When to review another option", disqualifier: "Existing structure may require different support.", cta: { label: "Discuss fit", href: "/contact", microcopy: "Ask a question." } }} />);
    expect(screen.getAllByRole("list").map(list => list.getAttribute("start"))).toEqual(["1", "3"]);
    expect(screen.getByText("Reviewed criteria")).toBeInTheDocument();
    expect(screen.getByText("Existing structure may require different support.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Discuss fit" })).toHaveAttribute("href", "/contact");
    expect(screen.getByText("Ask a question.")).toBeInTheDocument();
  });

  it.each([{ primaryGroup: { items: ["Ignored incomplete group"] } }, { primaryGroup: { heading: "Incomplete group" } }, { primaryGroup: { heading: "First", items: ["Incomplete pair"] }, secondaryGroup: { heading: "Second", items: [] } }])("falls back to approved flat criteria when grouped content is incomplete", groups => {
    render(<QualificationCheckpoint sectionId="fit" eligibility={{ heading: "Fit", items: ["Approved flat criterion"], ...groups }} />);
    expect(screen.getByRole("heading", { name: "Approved flat criterion" })).toBeInTheDocument();
    expect(screen.queryByText("Ignored incomplete group")).toBeNull();
  });

  it("prefers explicit detailed cards/custom heading and omits grouped-only claims", () => {
    render(<QualificationCheckpoint sectionId="fit" heading={<span>Approved custom heading</span>} cards={[{ title: "Detailed criterion", detail: "Its approved explanation." }]} eligibility={{ heading: "Base heading", badge: "Grouped-only badge", disqualifier: "Grouped-only disclaimer", items: ["Original criterion"], primaryGroup: { heading: "First", items: ["First"] }, secondaryGroup: { heading: "Second", items: ["Second"] } }} />);
    expect(screen.getByRole("heading", { name: "Approved custom heading" })).toBeInTheDocument();
    expect(screen.getByText("Its approved explanation.")).toBeInTheDocument();
    expect(screen.queryByText("Original criterion")).toBeNull();
    expect(screen.queryByText("Grouped-only badge")).toBeNull();
    expect(screen.queryByText("Grouped-only disclaimer")).toBeNull();
  });

  it.each([{ label: "Missing destination" }, { href: "/contact" }])("does not present an incomplete eligibility action", cta => {
    render(<QualificationCheckpoint sectionId="fit" eligibility={{ heading: "Fit", items: ["Criterion"], cta }} />);
    expect(screen.queryByRole("link")).toBeNull();
  });
});

describe("process, included and hero contracts", () => {
  it.each([3, 4, 5])("keeps every approved step and its real duration for a %s-step process", count => {
    const steps = Array.from({ length: count }, (_, index) => ({ title: `Review ${index + 1}`, description: `Scope ${index + 1}`, duration: index === 0 ? "Step 1" : index === 1 ? "Paso 2" : "One week" }));
    render(<ServiceProcessSection id="process" process={{ heading: "Approved process", eyebrow: "Scope", description: "A documented review", steps }} outputLabel="Output" primaryCta={{ label: "Book", href: "/book" }} ctaHelp="Discuss the scope." />);
    expect(screen.getAllByRole("listitem")).toHaveLength(count);
    expect(screen.queryByText("Step 1")).toBeNull(); expect(screen.queryByText("Paso 2")).toBeNull();
    expect(screen.getAllByText("One week")).toHaveLength(count - 2);
    expect(screen.getByRole("link", { name: "Book" })).toHaveAttribute("href", "/book");
  });

  it("uses detailed output/review copy when available and approved step fallbacks for partial details", () => {
    render(<ServiceProcessSection id="process" process={{ heading: "Process", steps: [{ title: "First step", description: "First description" }, { title: "Second step", description: "Second description", duration: "" }] }} details={[{ title: "", reviewLabel: "We review", review: "Approved review scope", output: "Approved deliverable" }]} outputLabel="Output" primaryCta={{ label: "Ask", href: "/contact" }} ctaHelp="Bring questions." />);
    expect(screen.getByRole("heading", { name: "First step" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Second step" })).toBeInTheDocument();
    expect(screen.getByText("Approved deliverable")).toBeInTheDocument();
    expect(document.querySelectorAll("[data-process-output]")).toHaveLength(1);
  });

  it("uses detailed titles and all row outputs when every process step has reviewed detail", () => {
    render(<ServiceProcessSection id="process" process={{ heading: "Process", steps: [{ title: "Original", description: "Retained description" }] }} details={[{ title: "Reviewed title", reviewLabel: "Review", review: "Reviewed scope", output: "Final output" }]} outputLabel="Output" primaryCta={{ label: "Ask", href: "/contact" }} ctaHelp="Discuss it." />);
    expect(screen.getByRole("heading", { name: "Reviewed title" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Original" })).toBeNull();
    expect(screen.getByText("Retained description")).toBeInTheDocument();
    expect(screen.getByText("Final output")).toBeInTheDocument();
  });

  it.each([{ headline: "Approved offer" }, { detail: "An approved scope-based price" }, { headline: "Approved offer", detail: "Confirmed before work" }, undefined])("preserves only the supplied included-scope offer fields", pricing => {
    render(<ServiceIncludedSection id="scope" included={{ heading: "Included", items: ["Approved item"], pricing }} scopeLabel="Included support" />);
    expect(screen.getByRole("heading", { name: "Approved item" })).toBeInTheDocument();
    if (pricing?.headline) expect(screen.getByText(pricing.headline)).toBeInTheDocument();
    if (pricing?.detail) expect(screen.getByText(pricing.detail)).toBeInTheDocument();
    if (!pricing) expect(screen.queryByText("Approved offer")).toBeNull();
  });

  it("uses an approved grouped presentation and note without duplicating legacy included items", () => {
    render(<ServiceIncludedSection id="scope" included={{ heading: "Included", eyebrow: "Legacy scope", description: "Legacy description", items: ["Legacy item"] }} scopeLabel="Scope" presentation={{ description: "Reviewed description", note: "Approved scope note", groups: [{ heading: "First group", items: [{ title: "Reviewed item", detail: "Documented detail" }] }, { heading: "Second group", items: [{ title: "Other item", detail: "" }] }] }} />);
    expect(screen.getByText("Reviewed description")).toBeInTheDocument();
    expect(screen.getByText("Approved scope note")).toBeInTheDocument();
    expect(screen.queryByText("Legacy item")).toBeNull();
    expect(screen.getByText("Documented detail")).toBeInTheDocument();
  });

  it("omits empty hero summary/review chrome but retains its primary action", () => {
    render(<ServiceHero id="hero" eyebrow="" headline="Approved headline" subheadline="Approved summary" primaryCta={{ label: "Ask", href: "/contact" }} primaryCtaId="hero-cta" reviewItems={[]} reviewSummary={{ title: "" }} compactHeadline />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Approved headline");
    expect(screen.queryByRole("list")).toBeNull();
    expect(screen.getByRole("link", { name: "Ask" })).toHaveAttribute("href", "/contact");
  });

  it("handles extended review items, optional detail and an approved secondary hero action", () => {
    render(<ServiceHero id="hero" eyebrow="Review" headline="Approved headline" subheadline="Summary" primaryCta={{ label: "Ask", href: "/contact" }} secondaryCta={{ label: "Read scope", href: "#scope" }} primaryCtaId="hero-cta" reviewItems={[{ title: "One", detail: "First detail" }, { title: "Two" }, { title: "Three" }, { title: "Four" }]} reviewSummary={{ title: "Decision", detail: "Reviewed conclusion" }} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
    expect(screen.getByText("First detail")).toBeInTheDocument();
    expect(screen.getByText("Reviewed conclusion")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Read scope" })).toHaveAttribute("href", "#scope");
  });
});

describe("CMS read boundaries, metadata and recovery", () => {
  it.each([null, {}, { title: "Missing hero" }, { ...service(), title: 7 }, { ...service(), title: "   " }, { ...service(), hero: null }, { ...service(), hero: { headline: "Unapproved incomplete hero" } }])("rejects malformed required CMS content safely", async data => {
    fixture.fetch.mockResolvedValue({ data });
    expect(await fetchCmsService("custom-advisory", "en")).toBeNull();
    await expect(CmsServicePage({ cmsSlug: "custom-advisory", locale: "en", canonicalPath: "/services/custom-advisory" })).rejects.toThrow("NEXT_NOT_FOUND");
    expect((await getCmsServiceMetadata({ cmsSlug: "custom-advisory", locale: "en", canonicalPath: "/services/custom-advisory" })).title).toBe("Service Not Found");
  });

  it.each([undefined, null, "invalid-section"])("omits absent or invalid optional CMS sections instead of causing a renderer crash", async optional => {
    fixture.fetch.mockResolvedValue({ data: { ...service(), process: optional, included: optional, faqSection: optional, comparison: optional, eligibility: optional, closing: optional } });
    render(await serverTree(await CmsServicePage({ cmsSlug: "custom-advisory", locale: "en", canonicalPath: "/services/custom-advisory" })));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("A clear plan for your business");
    expect(document.querySelector("[data-service-process]")).toBeNull();
    expect(document.querySelector("[data-service-included]")).toBeNull();
    const graph = JSON.parse(document.querySelector('script[type="application/ld+json"]')!.textContent!)["@graph"];
    expect(graph.map((item: { "@type": string }) => item["@type"])).toEqual(["Service"]);
  });

  it("retains approved rows while rejecting malformed optional rows and suppresses invalid durations", async () => {
    fixture.fetch.mockResolvedValue({ data: { ...service(), process: { heading: "Process", steps: [{ title: "Valid step", description: "Valid scope", duration: 123 }, null, { title: "Incomplete step" }] }, included: { heading: "Included", items: ["Valid scope", null, 12, ""] }, faqSection: { heading: "FAQ", items: [{ question: "Valid question", answer: "Valid answer" }, null, { question: "Incomplete", answer: "" }] } } });
    render(await serverTree(await CmsServicePage({ cmsSlug: "custom-advisory", locale: "en", canonicalPath: "/services/custom-advisory" })));
    expect(within(document.querySelector("[data-service-process]") as HTMLElement).getByRole("heading", { name: "Valid step" })).toBeInTheDocument();
    expect(screen.queryByText("123")).toBeNull();
    expect(screen.queryByText("Incomplete step")).toBeNull();
    expect(screen.getByRole("button", { name: "Valid question" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Incomplete" })).toBeNull();
  });

  it("uses reviewed fallbacks for incomplete eligibility/comparison but preserves complete CMS groups", async () => {
    const eligibility = { heading: "Approved fallback fit", items: ["Fallback criterion"] };
    const comparison = { heading: "Approved fallback comparison", conclusion: "Fallback conclusion", pairs: [] };
    fixture.fetch.mockResolvedValue({ data: service({ eligibility: { primaryGroup: { items: ["Missing heading"] }, secondaryGroup: { items: ["Missing heading"] } }, comparison: { heading: "Incomplete comparison", pairs: [{ problem: "Old", solution: "New" }] } }) });
    const { unmount } = render(await serverTree(await CmsServicePage({ cmsSlug: "custom-advisory", locale: "en", canonicalPath: "/services/custom-advisory", eligibilityOverride: eligibility, comparisonOverride: comparison })));
    expect(screen.getByRole("heading", { name: "Approved fallback fit" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Fallback conclusion" })).toBeInTheDocument();
    unmount();
    fixture.fetch.mockResolvedValue({ data: service({ eligibility: { heading: "CMS fit", primaryGroup: { heading: "First group", items: ["First criterion"] }, secondaryGroup: { heading: "Second group", items: ["Second criterion"] } }, comparison: { heading: "CMS comparison", conclusion: "CMS conclusion", pairs: [{ category: "Scope", problem: "Old", solution: "New", outcome: "Approved outcome" }] } }) });
    render(await serverTree(await CmsServicePage({ cmsSlug: "custom-advisory", locale: "en", canonicalPath: "/services/custom-advisory", eligibilityOverride: eligibility, comparisonOverride: comparison })));
    expect(screen.getByRole("heading", { name: "CMS fit" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Approved fallback fit" })).toBeNull();
    expect(screen.getByRole("heading", { name: "CMS conclusion" })).toBeInTheDocument();
  });

  it.each(["en", "es"])("keeps localized canonicals, approved metadata and optional indexing/image rules for %s", async locale => {
    fixture.fetch.mockResolvedValue({ data: service({ seo: { metaTitle: "Reviewed SEO title", metaDescription: "Reviewed SEO description", noIndex: true, keywords: ["approved-keyword"], openGraphImage: { _type: "image", asset: { _type: "reference", _ref: "image-fixture-1200x630-png" } } } }) });
    const metadata = await getCmsServiceMetadata({ cmsSlug: "custom-advisory", locale, canonicalPath: "/services/custom-advisory" });
    expect(metadata.title).toBe("Reviewed SEO title"); expect(metadata.description).toBe("Reviewed SEO description");
    expect(metadata.robots).toEqual({ index: false, follow: false });
    expect(metadata.alternates?.canonical).toBe(`https://unionnationaltax.com/${locale}/services/custom-advisory`);
    expect(metadata.openGraph?.images).toEqual([{ url: "https://cdn.example.test/service.png", width: 1200, height: 630, alt: "Approved Advisory" }]);
  });

  it("uses content fallbacks when SEO is absent and successfully reads content after a temporary provider outage", async () => {
    fixture.fetch.mockRejectedValueOnce(new Error("CMS temporarily unavailable"));
    await expect(fetchCmsService("custom-advisory", "en")).rejects.toThrow("CMS temporarily unavailable");
    fixture.fetch.mockResolvedValue({ data: service() });
    const metadata = await getCmsServiceMetadata({ cmsSlug: "custom-advisory", locale: "en", canonicalPath: "/services/custom-advisory" });
    expect(metadata.title).toBe("Approved Advisory | Union National Tax");
    expect(metadata.description).toBe(service().hero.subheadline);
    expect(metadata.robots).toBeUndefined(); expect(metadata.openGraph?.images).toBeUndefined();
  });
});

describe("headline and booking boundaries", () => {
  it.each([undefined, "not in the headline", ""])("does not create a misleading highlight when it is %s", highlight => {
    render(<h1>{renderHeroHeadline("Approved headline", highlight)}</h1>);
    expect(screen.getByRole("heading")).toHaveTextContent("Approved headline");
    expect(screen.getByRole("heading").querySelector("span")).toBeNull();
  });
  it("preserves the full copy in separate and inline highlights", () => {
    const { rerender } = render(<h1>{renderHeroHeadline("Before match after", "match", true)}</h1>);
    expect(screen.getByRole("heading")).toHaveTextContent("Before match after");
    rerender(<h1>{renderHeroHeadline("Before match after", "match")}</h1>);
    expect(screen.getByRole("heading")).toHaveTextContent("Before match after");
  });
  it.each([[undefined, undefined, "/contact"], ["Book", undefined, "/book"], ["Reservar", "javascript:bad", "/book"], ["Discuss", "http://unsafe.test", "/contact"], ["Read", "#included", "#included"]])("uses safe booking fallback for %s", (label, href, expected) => {
    expect(bookingHref(label, href)).toBe(expected);
  });
});

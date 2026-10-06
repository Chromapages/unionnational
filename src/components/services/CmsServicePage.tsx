import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { SERVICE_PAGE_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import type { ServicePage } from "@/types/sanity";
import { reviewedScorpService } from "@/lib/scorp/service-content";
import { z } from "zod";

const text = z.string();
const meaningfulText = text.refine(value => value.trim().length > 0);
const optionalText = text.optional().catch(undefined);
const textItems = z.array(meaningfulText.optional().catch(undefined)).catch([]).transform(items => items.filter((item): item is string => item !== undefined));
const group = z.object({ heading: meaningfulText, items: textItems }).passthrough().optional().catch(undefined);
const step = z.object({ title: meaningfulText, description: meaningfulText, duration: optionalText }).passthrough();
const faq = z.object({ question: meaningfulText, answer: meaningfulText }).passthrough();
const displayService = z.object({
    title: meaningfulText,
    slug: z.object({ current: text.regex(/^[\p{L}\p{N}][\p{L}\p{N}._-]{0,199}$/u) }).passthrough(),
    hero: z.object({
        eyebrow: text.catch(""), headline: meaningfulText, subheadline: meaningfulText, highlight: optionalText,
        primaryCta: z.object({ label: meaningfulText, href: text.catch("/contact") }).passthrough(),
        secondaryCta: z.object({ label: optionalText, href: optionalText }).passthrough().optional().catch(undefined),
    }).passthrough(),
    eligibility: z.object({
        eyebrow: optionalText, heading: optionalText, description: optionalText, badge: optionalText, items: textItems,
        primaryGroup: group, secondaryGroup: group, disqualifierHeading: optionalText, disqualifier: optionalText,
        cta: z.object({ label: optionalText, href: optionalText, microcopy: optionalText }).passthrough().optional().catch(undefined),
    }).passthrough().optional().catch(undefined),
    comparison: z.object({
        heading: text.catch(""), description: optionalText, conclusion: optionalText,
        pairs: z.array(z.object({ category: optionalText, outcome: optionalText, problem: text, solution: text }).passthrough().optional().catch(undefined)).catch([]).transform(items => items.filter(item => item !== undefined)),
    }).passthrough().catch({ heading: "", pairs: [] }),
    process: z.object({
        eyebrow: optionalText, heading: text.catch(""), description: optionalText,
        steps: z.array(step.optional().catch(undefined)).catch([]).transform(items => items.filter(item => item !== undefined)),
    }).passthrough().catch({ heading: "", steps: [] }),
    included: z.object({
        eyebrow: optionalText, heading: text.catch(""), description: optionalText, items: textItems,
        pricing: z.object({ headline: optionalText, detail: optionalText }).passthrough().optional().catch(undefined),
    }).passthrough().catch({ heading: "", items: [] }),
    faqSection: z.object({
        eyebrow: optionalText, heading: text.catch(""),
        items: z.array(faq.optional().catch(undefined)).catch([]).transform(items => items.filter(item => item !== undefined)),
    }).passthrough().catch({ heading: "", items: [] }),
    closing: z.object({ heading: text.catch(""), label: text.catch(""), href: text.catch(""), disclaimer: optionalText }).passthrough().catch({ heading: "", label: "", href: "" }),
}).passthrough();

type CmsServicePageProps = {
    cmsSlug: string;
    locale: string;
    canonicalPath: string;
    eligibilityOverride?: ServicePage["eligibility"];
    comparisonOverride?: ServicePage["comparison"];
};

export async function fetchCmsService(cmsSlug: string, locale: string) {
    const { data } = await sanityFetch({ query: SERVICE_PAGE_QUERY, params: { slug: cmsSlug, locale } });
    const parsed = displayService.safeParse(data);
    // Empty optional sections stay omitted; malformed required content is never published.
    return parsed.success ? reviewedScorpService(parsed.data as ServicePage, locale) : null;
}

export async function getCmsServiceMetadata({ cmsSlug, locale, canonicalPath }: CmsServicePageProps): Promise<Metadata> {
    const service = await fetchCmsService(cmsSlug, locale);
    if (!service) return { title: "Service Not Found" };

    const baseUrl = "https://unionnationaltax.com";
    const localizedPath = `/${locale === "es" ? "es" : "en"}${canonicalPath}`;
    const canonicalUrl = `${baseUrl}${localizedPath}`;
    const image = service.seo?.openGraphImage?.asset
        ? urlFor(service.seo.openGraphImage).width(1200).height(630).url()
        : undefined;

    return {
        title: service.seo?.metaTitle || `${service.title} | Union National Tax`,
        description: service.seo?.metaDescription || service.hero.subheadline,
        keywords: service.seo?.keywords,
        robots: service.seo?.noIndex ? { index: false, follow: false } : undefined,
        alternates: {
            canonical: canonicalUrl,
            languages: {
                en: `${baseUrl}/en${canonicalPath}`,
                es: `${baseUrl}/es${canonicalPath}`,
            },
        },
        openGraph: {
            title: service.seo?.metaTitle || service.title,
            description: service.seo?.metaDescription || service.hero.subheadline,
            url: canonicalUrl,
            type: "website",
            images: image ? [{ url: image, width: 1200, height: 630, alt: service.title }] : undefined,
        },
    };
}

export async function CmsServicePage({ cmsSlug, locale, canonicalPath, eligibilityOverride, comparisonOverride }: CmsServicePageProps) {
    const service = await fetchCmsService(cmsSlug, locale);
    if (!service) notFound();
    const hasGroupedEligibility = Boolean(service.eligibility?.primaryGroup?.items?.length && service.eligibility?.secondaryGroup?.items?.length);
    const hasStructuredComparison = Boolean(service.comparison?.conclusion && service.comparison.pairs?.every((pair) => pair.category && pair.outcome));
    const renderedService = {
        ...service,
        eligibility: eligibilityOverride && !hasGroupedEligibility ? eligibilityOverride : service.eligibility,
        comparison: comparisonOverride && !hasStructuredComparison ? comparisonOverride : service.comparison,
    };

    const structuredFaq = service.faqSection.items.filter((item) => item.question && item.answer);
    const canonicalUrl = `https://unionnationaltax.com/${locale === "es" ? "es" : "en"}${canonicalPath}`;
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Service",
                name: service.title,
                description: service.hero.subheadline,
                url: canonicalUrl,
            },
            ...(structuredFaq.length ? [{
                "@type": "FAQPage",
                url: canonicalUrl,
                mainEntity: structuredFaq.map((item) => ({
                    "@type": "Question",
                    name: item.question,
                    acceptedAnswer: { "@type": "Answer", text: item.answer },
                })),
            }] : []),
        ],
    };

    return (
        <div className="flex min-h-screen flex-col overflow-x-clip bg-surface font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
            <HeaderWrapper />
            <main id="main-content" className="flex-1 pb-20 md:pb-0">
                <ServicePageTemplate page={renderedService} locale={locale} />
            </main>
            <Footer bookingCta bookingLabel={service.hero.primaryCta.label} />
        </div>
    );
}

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

type CmsServicePageProps = {
    cmsSlug: string;
    locale: string;
    canonicalPath: string;
    eligibilityOverride?: ServicePage["eligibility"];
    comparisonOverride?: ServicePage["comparison"];
};

export async function fetchCmsService(cmsSlug: string, locale: string) {
    const { data } = await sanityFetch({ query: SERVICE_PAGE_QUERY, params: { slug: cmsSlug, locale } });
    return data ? reviewedScorpService(data as ServicePage, locale) : null;
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

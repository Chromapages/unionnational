import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { SERVICES_QUERY, PRICING_TIERS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ServicesDesktopExperience } from "@/components/services/ServicesDesktopExperience";
import type { Service } from "@/components/services/ServicesClient";
import type { PricingTier } from "@/components/pricing/PricingSection";
import { localizedAlternates } from "@/lib/seo/localizedAlternates";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "ServicesPage.metadata" });
    
    return {
        title: t("title"),
        description: t("description"),
        alternates: localizedAlternates(locale, "/services"),
    };
}

export const revalidate = 60;

// Generate static params for SSG
export async function generateStaticParams() {
    return [
        { locale: 'en' },
        { locale: 'es' },
    ];
}
export default async function ServicesPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const locale = params.locale;
    const t = await getTranslations({ locale, namespace: "ServicesPage" });
    const [{ data: services }, { data: pricingTiers }] = await Promise.all([
        sanityFetch({ query: SERVICES_QUERY, params: { locale } }),
        sanityFetch({ query: PRICING_TIERS_QUERY, params: { locale } }),
    ]);

    // Pull FAQ items from translations (static; CMS schema doesn't have FAQ field yet)
    const faqItems = t.raw("FAQ.items") as Array<{ question: string; answer: string }>;

    // Schema.org Structured Data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "AccountingService",
        "name": "Union National Tax",
        "description": "Modern tax strategy and financial services for the digital economy.",
        "url": `https://unionnationaltax.com${locale === 'en' ? '' : `/${locale}`}/services`,
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Tax & Financial Services",
            "itemListElement": ((services || []) as Array<{ title: string; shortDescription: string }>).map((service, index: number) => ({
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": service.title,
                    "description": service.shortDescription
                },
                "position": index + 1
            }))
        }
    };

    return (
        <div className="min-h-dvh bg-white font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
            <HeaderWrapper />
            <main id="main-content">
                <ServicesDesktopExperience services={(services || []) as Service[]} tiers={(pricingTiers || []) as PricingTier[]} faqItems={faqItems} />
            </main>
            <Footer />
        </div>
    );
}

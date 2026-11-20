import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { sanityFetch } from "@/sanity/lib/live";
import { PRICING_TIERS_QUERY, SERVICES_PAGE_QUERY } from "@/sanity/lib/queries";
import { PricingSection, type PricingTier } from "@/components/pricing/PricingSection";
import { CTASection } from "@/components/home/CTASection";
import { Metadata } from "next";
import { localizedAlternates } from "@/lib/seo/localizedAlternates";
import { getTranslations } from "next-intl/server";

export const revalidate = 60; // Revalidate every minute

// Generate static params for SSG - pre-render at build time
export async function generateStaticParams() {
    return [
        { locale: 'en' },
        { locale: 'es' },
    ];
}

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await props.params;
    return {
        title: "Pricing | Union National Tax",
        description: "Transparent pricing for comprehensive tax strategies and fractional CFO services.",
        alternates: localizedAlternates(locale, "/pricing"),
    };
}

export default async function PricingPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const locale = params.locale;
    const [t, { data: tierData }, { data: pageData }] = await Promise.all([
        getTranslations({ locale, namespace: "ServicesPage.PricingAvailability" }),
        sanityFetch({ query: PRICING_TIERS_QUERY, params: { locale } }),
        sanityFetch({ query: SERVICES_PAGE_QUERY, params: { locale } }),
    ]);
    const tiers: PricingTier[] = tierData ?? [];
    const hasAdvisoryTiers = tiers.some(tier => tier.category === "advisory" || !tier.category);

    return (
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <HeaderWrapper />

            <main id="main-content" className="pt-12">
                {/* Hero */}
                <section className="max-w-4xl mx-auto px-6 mb-24 text-center">
                    <RevealOnScroll>
                        {hasAdvisoryTiers && (
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gold-200 text-gold-600 text-[10px] font-semibold uppercase tracking-widest mb-6 shadow-sm font-sans">
                                Investment
                            </div>
                        )}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-900 tracking-tight mb-8 leading-[1.1] font-heading">
                            {hasAdvisoryTiers ? <>Invest in your <br /><span className="text-gold-500">financial infrastructure.</span></> : t("heading")}
                        </h1>
                        <p className="text-lg text-brand-900 leading-relaxed max-w-2xl mx-auto font-sans">
                            {hasAdvisoryTiers ? 'Choose the engagement model that fits your growth stage. All plans include our proactive "Tax First" methodology.' : t("description")}
                        </p>
                    </RevealOnScroll>
                </section>

                <PricingSection tiers={tiers} hasAdvisoryTiers={hasAdvisoryTiers} />

                <div className="mt-16">
                    <CTASection data={pageData} />
                </div>
            </main>

            <Footer />
        </div>
    );
}

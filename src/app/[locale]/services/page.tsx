import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { LuxuryTravelIncentive } from "@/components/ui/LuxuryTravelIncentive";
import { client } from "@/sanity/lib/client";
import { ServicesClient } from "@/components/services/ServicesClient";
import { PartnerProgramsSection } from "@/components/services/PartnerProgramsSection";
import { PricingSection } from "@/components/pricing/PricingSection";
import { SERVICES_QUERY, PRICING_TIERS_QUERY, SERVICES_PAGE_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { Metadata } from "next";
import { ProcessTimeline } from "@/components/services/ProcessTimeline";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "ServicesPage.metadata" });

    return {
        title: t("title"),
        description: t("description"),
    };
}

export const revalidate = 60;

export default async function ServicesPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const locale = params.locale;
    const t = await getTranslations({ locale, namespace: "ServicesPage" });
    const [{ data: services }, { data: pricingTiers }, { data: pageData }] = await Promise.all([
        sanityFetch({ query: SERVICES_QUERY, params: { locale } }),
        sanityFetch({ query: PRICING_TIERS_QUERY, params: { locale } }),
        sanityFetch({ query: SERVICES_PAGE_QUERY, params: { locale } })
    ]);

    // Schema.org Structured Data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "AccountingService",
        "name": "Union National Tax",
        "description": "Modern tax strategy and financial services for the digital economy.",
        "url": "https://unionnationaltax.com/services",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Tax & Financial Services",
            "itemListElement": (services as Array<{ title: string; shortDescription: string }>).map((service, index: number) => ({
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
        <div className="min-h-dvh bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <HeaderWrapper />

            <main id="main-content">
                {/* Minimalist Hero Section - Midnight Forest Brand Theme */}
                <section className="bg-brand-500 px-6 py-16 md:py-20 relative overflow-hidden">
                    {/* Subtle Texture/Grain could go here if requested, but keeping it "Solid" as per Vault philosophy */}

                    <div className="max-w-7xl mx-auto">
                        <div className="max-w-3xl">
                            <RevealOnScroll>
                                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tighter mb-8 leading-[1.05] font-heading font-black">
                                    {t("Hero.title")}
                                </h1>
                                <p className="text-xl text-brand-50/80 mb-12 leading-relaxed font-sans max-w-xl">
                                    {t("Hero.subtitle")}
                                </p>

                                <div className="flex flex-col sm:flex-row items-center gap-6">
                                    <Link
                                        href="/contact"
                                        className={cn(
                                            "w-full sm:w-auto px-10 py-5 bg-gold-500 text-brand-900 font-bold text-lg rounded-md shadow-sm",
                                            "hover:bg-gold-600 transition-all duration-300",
                                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-500",
                                            "active:scale-95 flex items-center justify-center gap-3 font-heading tracking-tight"
                                        )}
                                    >
                                        {t("Hero.ctaPrimary")}
                                        <ArrowRight className="w-5 h-5" />
                                    </Link>
                                    <a
                                        href="#services"
                                        className={cn(
                                            "w-full sm:w-auto px-10 py-5 bg-transparent text-white font-bold text-lg rounded-md",
                                            "border border-white/20 hover:bg-white/10 transition-all duration-300",
                                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-500",
                                            "active:scale-95 flex items-center justify-center gap-3 font-heading tracking-tight"
                                        )}
                                    >
                                        {t("Hero.ctaSecondary")}
                                    </a>
                                </div>
                            </RevealOnScroll>
                        </div>
                    </div>
                </section>

                {/* Services Grid (Interactive) */}
                <div id="services" className="scroll-mt-32 mt-16">
                    <ServicesClient services={services} />
                </div>

                <section className="pt-24 pb-12 bg-white/30">
                    <PricingSection
                        tiers={pricingTiers}
                        hideTaxPrep={true}
                        translations={{
                            eyebrow: t("PricingSection.eyebrow"),
                            title: t("PricingSection.title"),
                            subtitle: t("PricingSection.subtitle"),
                            comparisonTitle: t("PricingSection.comparisonTitle"),
                            comparisonSubtitle: t("PricingSection.comparisonSubtitle"),
                        }}
                    />
                </section>



                {/* Process Timeline */}
                <ProcessTimeline />








                <div className="max-w-7xl mx-auto px-6 pb-24">
                    <LuxuryTravelIncentive />
                </div>
            </main>

            <Footer />
        </div>
    );
}

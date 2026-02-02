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
import { PricingTrustSection } from "@/components/pricing/PricingTrustSection";
import { SERVICES_QUERY, PRICING_TIERS_QUERY, SERVICES_PAGE_QUERY } from "@/sanity/lib/queries";
import { Metadata } from "next";
import { ProcessTimeline } from "@/components/services/ProcessTimeline";
import * as Icons from "lucide-react";

export const metadata: Metadata = {
    title: "Services | Union National Tax",
    description: "Comprehensive tax strategy, bookkeeping, and CFO services for modern businesses.",
};

export const revalidate = 60;

export default async function ServicesPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const locale = params.locale;
    const [services, pricingTiers, pageData] = await Promise.all([
        client.fetch(SERVICES_QUERY),
        client.fetch(PRICING_TIERS_QUERY),
        client.fetch(SERVICES_PAGE_QUERY)
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
                {/* Minimalist Hero Section */}
                <section className="max-w-7xl mx-auto px-6 pt-24 pb-20 relative">
                    <div className="max-w-3xl">
                        <RevealOnScroll>
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-900 tracking-tight mb-8 leading-[1.1] font-heading">
                                Eliminate tax anxiety. Build true wealth.
                            </h1>
                            <p className="text-xl text-brand-900/60 mb-12 leading-relaxed font-sans max-w-2xl">
                                We replace reactive &quot;once-a-year&quot; filing with a proactive, year-round financial system designed for high-growth contractors and S-Corp owners.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <Link
                                    href="/contact"
                                    className="w-full sm:w-auto px-10 py-4 bg-brand-900 text-white font-bold text-base rounded-xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-900/10 flex items-center justify-center gap-2 font-heading tracking-wide"
                                >
                                    Schedule Consultation
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <a
                                    href="#services"
                                    className="w-full sm:w-auto px-10 py-4 bg-transparent text-brand-900 font-bold text-base rounded-xl border border-brand-200 hover:border-brand-900 transition-all flex items-center justify-center gap-2 font-heading tracking-wide"
                                >
                                    Browse Services
                                </a>
                            </div>
                        </RevealOnScroll>
                    </div>
                </section>

                {/* Services Grid (Interactive) */}
                <div id="services" className="scroll-mt-32">
                    <ServicesClient services={services} />
                </div>

                {/* Pricing Section */}
                <section className="pt-24 pb-12 bg-white/30">
                    <PricingSection tiers={pricingTiers} hideTaxPrep={true} />
                </section>



                {/* Process Timeline */}
                <ProcessTimeline />

                {/* Pricing Trust Section (Philosophy) */}
                <PricingTrustSection />







                <div className="max-w-5xl mx-auto px-6 pb-24">
                    <LuxuryTravelIncentive />
                </div>
            </main>

            <Footer />
        </div>
    );
}

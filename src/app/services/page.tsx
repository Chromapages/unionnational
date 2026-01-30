import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CTASection } from "@/components/home/CTASection";
import { client } from "@/sanity/lib/client";
import { ServicesClient } from "@/components/services/ServicesClient";
import { PartnerProgramCard } from "@/components/services/PartnerProgramCard";
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

export default async function ServicesPage() {
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
                {/* Hero Section */}
                <section className="max-w-[90rem] mx-auto px-6 pt-32 mb-32 relative">
                    {/* Radial Gradient Background */}
                    <div className="absolute top-0 left-1/2 w-[1000px] h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-500/20 via-transparent to-transparent rounded-full blur-3xl -z-10 opacity-50 pointer-events-none -translate-x-1/2 -translate-y-1/3"></div>

                    <div className="text-center max-w-4xl mx-auto">
                        <RevealOnScroll>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-gold-500/30 text-brand-900 text-[11px] font-bold uppercase tracking-widest mb-8 shadow-sm font-sans">
                                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse"></span>
                                Elite Financial Infrastructure
                            </div>
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-900 tracking-tight mb-8 leading-[1.1] font-heading">
                                Eliminate tax anxiety. <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-gold-400">Build true wealth.</span>
                            </h1>
                            <p className="text-xl text-brand-900/70 mb-12 leading-relaxed font-sans max-w-2xl mx-auto">
                                We replace the reactive &quot;once-a-year&quot; filing with a proactive, year-round financial system designed for high-growth contractors and S-Corp owners.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    href="/contact"
                                    className="w-full sm:w-auto px-8 py-4 bg-brand-900 text-white font-bold text-base rounded-xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-900/10 flex items-center justify-center gap-2 font-heading tracking-wide"
                                >
                                    Schedule Consultation
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <a
                                    href="#services"
                                    className="w-full sm:w-auto px-8 py-4 bg-white text-brand-900 font-bold text-base rounded-xl border border-slate-200 hover:border-brand-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 font-heading tracking-wide"
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

                {/* Featured Partner Programs */}
                <section className="max-w-[90rem] mx-auto px-6 mb-32">
                    <RevealOnScroll>
                        <h2 className="text-2xl font-bold text-brand-900 mb-8 font-heading">Specialized Partner Programs</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            {/* Construction Card */}
                            <PartnerProgramCard
                                title="Construction CFO Partnership"
                                description="Stop bleeding cash on job costing & labor. The 'Hybrid CFO + COO' model for $1M-$10M contractors."
                                icon="HardHat"
                                colorTheme="emerald"
                                stats={[
                                    { value: 400, label: "Avg Savings", prefix: "$", suffix: "K+" },
                                    { value: 95, label: "Retention", suffix: "%" },
                                    { value: 90, label: "To Results", suffix: " Days" },
                                ]}
                                features={[
                                    "Job costing automation",
                                    "Real-time margin tracking",
                                    "Tax strategy optimization",
                                ]}
                                ctaUrl="/vsl/construction"
                                isFeatured={true}
                                backgroundImage="/images/construction-bg.jpg"
                            />

                            {/* Restaurant Card */}
                            <PartnerProgramCard
                                title="Restaurant CFO Partnership"
                                description="Stop profit leaks on food cost & labor. The 'Kitchen Command Center' system for $500K-$5M venues."
                                icon="UtensilsCrossed"
                                colorTheme="orange"
                                stats={[
                                    { value: 350, label: "Avg Savings", prefix: "$", suffix: "K+" },
                                    { value: 98, label: "Retention", suffix: "%" },
                                    { value: 90, label: "To Results", suffix: " Days" },
                                ]}
                                features={[
                                    "Inventory & COGS control",
                                    "Real-time P&L visibility",
                                    "Menu pricing strategy",
                                ]}
                                ctaUrl="/vsl/restaurants"
                                backgroundImage="/images/restaurant-bg.jpg"
                            />

                        </div>
                    </RevealOnScroll>
                </section>

                {/* Pricing Section */}
                <section className="py-24 bg-white/30">
                    <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
                        <RevealOnScroll>
                            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-4 font-heading">Simple, Transparent Pricing</h2>
                            <p className="text-brand-900/60 font-sans max-w-2xl mx-auto text-lg">Choose the tier that fits your business stage. No hidden fees, just expert partnership.</p>
                        </RevealOnScroll>
                    </div>
                    <PricingSection tiers={pricingTiers} />
                </section>



                {/* Process Timeline */}
                <ProcessTimeline />

                {/* Pricing Trust Section (Philosophy) */}
                <PricingTrustSection />






                <CTASection data={pageData} />
            </main>

            <Footer />
        </div>
    );
}

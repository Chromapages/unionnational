"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { AdvisoryPricingCards } from "./AdvisoryPricingCards";
import { TaxPrepGrid } from "./TaxPrepGrid";
import { OptionalServices } from "./OptionalServices";
import { ServiceComparisonTable } from "@/components/services/ServiceComparisonTable";
import { TaxPrepPricingTables } from "./TaxPrepPricingTables";
import { PricingCarousel } from "./PricingCarousel";

// Re-using the same interface for consistency across files
export interface PricingTier {
    _id: string;
    name: string;
    slug: { current: string };
    tagline?: string;
    price?: string;
    billingPeriod?: string;
    features?: string[];
    isFeatured?: boolean;
    ctaText?: string;
    ctaUrl?: string;
    category: string;
    bestFor?: string;
    includes?: string;
    displayOrder?: number;
    relatedService?: {
        title: string;
        slug: { current: string };
    };
}

interface PricingSectionProps {
    tiers: PricingTier[];
    hideTaxPrep?: boolean;
    translations?: {
        eyebrow: string;
        title: string;
        subtitle: string;
        comparisonTitle: string;
        comparisonSubtitle: string;
    };
}

export function PricingSection({ tiers, hideTaxPrep = false, translations }: PricingSectionProps) {
    if (!tiers) return null;

    // Filter tiers based on category
    const advisoryTiers = tiers.filter(t => t.category === "advisory" || !t.category);
    const optionalTiers = tiers.filter(t => t.category === "optional");

    // Use translations or fallback to default English
    const t = translations || {
        eyebrow: "Strategic Partnership",
        title: "Choose Your Level of Support",
        subtitle: "Move beyond simple compliance. Select an advisory tier that matches the complexity of your business and your wealth goals.",
        comparisonTitle: "Complete Transparency",
        comparisonSubtitle: "Compare plans to find the right level of support for your business needs.",
    };

    return (
        <section className="py-12 relative overflow-hidden">
            <div className="space-y-16 lg:space-y-24">

                {/* Section Header */}
                <div className="text-center max-w-4xl mx-auto px-6 mb-16">
                    <RevealOnScroll>
                        <span className="text-gold-500 font-bold tracking-widest text-xs uppercase mb-4 block">{t.eyebrow}</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-brand-900 font-heading mb-6">{t.title}</h2>
                        <p className="text-brand-900/60 font-sans text-lg max-w-2xl mx-auto leading-relaxed">
                            {t.subtitle}
                        </p>
                    </RevealOnScroll>
                </div>

                {/* Unified Pricing Carousel */}
                <RevealOnScroll>
                    <div className="max-w-7xl mx-auto px-6">
                        <PricingCarousel
                            advisoryView={<AdvisoryPricingCards tiers={advisoryTiers} />}
                            taxPrepView={<TaxPrepPricingTables />}
                            comparisonView={
                                <div className="space-y-16">
                                    <ServiceComparisonTable />
                                    <OptionalServices tiers={optionalTiers} />
                                </div>
                            }
                        />
                    </div>
                </RevealOnScroll>

            </div>
        </section>
    );
}

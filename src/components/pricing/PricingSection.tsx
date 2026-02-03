"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { AdvisoryPricingCards } from "./AdvisoryPricingCards";
import { TaxPrepGrid } from "./TaxPrepGrid";
import { OptionalServices } from "./OptionalServices";
import { ServiceComparisonTable } from "@/components/services/ServiceComparisonTable";

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
        <section className="py-24 relative overflow-hidden">
            <div className="space-y-16 lg:space-y-24">

                {/* 1. Advisory Pricing (The Hero Cards) */}
                <div className="relative">
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

                    <AdvisoryPricingCards tiers={advisoryTiers} />
                </div>

                {/* 2. Tax Compliance (The Clean Table) */}
                {!hideTaxPrep && (
                    <RevealOnScroll>
                        <TaxPrepGrid tiers={tiers} />
                    </RevealOnScroll>
                )}

                {/* 3. Service Tier Comparison Table (Complete Transparency) */}
                <RevealOnScroll>
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl font-bold text-brand-900 font-heading mb-3">{t.comparisonTitle}</h2>
                            <p className="text-brand-900/60 max-w-2xl mx-auto text-sm">
                                {t.comparisonSubtitle}
                            </p>
                        </div>
                        <ServiceComparisonTable />
                    </div>
                </RevealOnScroll>

                {/* 4. Optional Services (The Grid) */}
                <RevealOnScroll>
                    <OptionalServices tiers={optionalTiers} />
                </RevealOnScroll>

            </div>
        </section>
    );
}

"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { AdvisoryPricingCards } from "./AdvisoryPricingCards";
import { ServiceComparisonTable } from "@/components/services/ServiceComparisonTable";
import { TaxPrepPricingTables } from "./TaxPrepPricingTables";
import { PricingCarousel } from "./PricingCarousel";
import { IncludedFeatures } from "./IncludedFeatures";
import { SectionHeader } from "@/components/ui/SectionHeader";

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

    // Use translations or fallback to default English
    const t = translations || {
        eyebrow: "Strategic Partnership",
        title: "Choose Your Level of Support",
        subtitle: "Move beyond simple compliance. Select an advisory tier that matches the complexity of your business and your wealth goals.",
        comparisonTitle: "Complete Transparency",
        comparisonSubtitle: "Compare plans to find the right level of support for your business needs.",
    };

    return (
        <section className="relative overflow-hidden py-16 md:py-20">
            <div className="space-y-16 lg:space-y-24">

                {/* Section Header */}
                <div className="px-6">
                    <RevealOnScroll>
                        <SectionHeader label={t.eyebrow} heading={t.title} description={t.subtitle} className="mb-12 md:mb-16" />
                    </RevealOnScroll>
                </div>

                {/* Unified Pricing Carousel */}
                <RevealOnScroll>
                    <div className="max-w-7xl mx-auto px-6">
                        <PricingCarousel
                            advisoryView={<AdvisoryPricingCards tiers={advisoryTiers} />}
                            taxPrepView={<TaxPrepPricingTables />}
                            comparisonView={<ServiceComparisonTable />}
                            hideTaxPrep={hideTaxPrep}
                        />
                    </div>
                </RevealOnScroll>

                {/* What's Included Section */}
                <div className="mt-12 lg:mt-24">
                    <IncludedFeatures />
                </div>

            </div>
        </section>
    );
}

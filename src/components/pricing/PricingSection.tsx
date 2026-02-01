"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { AdvisoryPricingCards } from "./AdvisoryPricingCards";
import { TaxPrepGrid } from "./TaxPrepGrid";
import { OptionalServices } from "./OptionalServices";

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
}

export function PricingSection({ tiers }: PricingSectionProps) {
    if (!tiers) return null;

    // Filter tiers based on category
    // Defaulting to "advisory" if no category is set (graceful fallback)
    const advisoryTiers = tiers.filter(t => t.category === "advisory" || !t.category);

    // Pass raw tiers to TaxPrepGrid, which handles the filtering for individual/business internally
    // or pass filtered lists if the component expected separate props.
    // Based on my TaxPrepGrid implementation, it expects `tiers` and filters itself?
    // Let's re-read TaxPrepGrid. YES. it takes `tiers` and filters internally.
    // Wait, in my write_to_file for TaxPrepGrid, I made it filter internally. 
    // BUT the previous implementation in this file was trying to pass individual filtering.
    // Let's just pass ALL tiers to TaxPrepGrid and let it handle "individual" and "business".

    // Actually, looking at the previous file content I replaced, I had `individualTiers` and `businessTiers` variables.
    // I will stick to passing all tiers to TaxPrepGrid as I designed it to be smart.

    // Optional services
    const optionalTiers = tiers.filter(t => t.category === "optional");

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background elements if needed */}

            <div className="space-y-32">

                {/* 1. Advisory Pricing (The Hero Cards) */}
                <div className="relative">
                    {/* Section Header */}
                    <div className="text-center max-w-4xl mx-auto px-6 mb-16">
                        <RevealOnScroll>
                            <span className="text-gold-500 font-bold tracking-widest text-xs uppercase mb-4 block">Strategic Partnership</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-brand-900 font-heading mb-6">Choose Your Level of Support</h2>
                            <p className="text-brand-900/60 font-sans text-lg max-w-2xl mx-auto leading-relaxed">
                                Move beyond simple compliance. Select an advisory tier that matches the complexity of your business and your wealth goals.
                            </p>
                        </RevealOnScroll>
                    </div>

                    <AdvisoryPricingCards tiers={advisoryTiers} />
                </div>

                {/* 2. Tax Compliance (The Clean Table) */}
                <RevealOnScroll>
                    <TaxPrepGrid tiers={tiers} />
                </RevealOnScroll>

                {/* 3. Optional Services (The Grid) */}
                <RevealOnScroll>
                    <OptionalServices tiers={optionalTiers} />
                </RevealOnScroll>

            </div>
        </section>
    );
}

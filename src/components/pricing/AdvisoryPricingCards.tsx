import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Define strict types matching the Sanity query
interface PricingTier {
    _id: string;
    name: string;
    slug: { current: string };
    tagline?: string;
    price?: string;
    billingPeriod?: string;
    features?: string[];
    category: string;
    isFeatured?: boolean;
    ctaText?: string;
    ctaUrl?: string;
}

interface AdvisoryPricingCardsProps {
    tiers: PricingTier[];
}

export function AdvisoryPricingCards({ tiers }: AdvisoryPricingCardsProps) {
    if (!tiers || tiers.length === 0) return null;

    // Filter mainly for advisory, but just in case this component receives raw data
    // Matching the logic in PricingSection: (category === "advisory" || !category)
    // Matching the logic in PricingSection: (category === "advisory" || !category)
    const advisoryTiers = tiers.filter(t => t.category === "advisory" || !t.category);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-6 relative z-10 items-center">
            {advisoryTiers.map((tier) => {
                const nameLower = tier.name.toLowerCase();
                const isExecutive = nameLower.includes("executive");
                const isGrowth = nameLower.includes("growth") || tier.isFeatured;
                const isFoundation = !isExecutive && !isGrowth;

                return (
                    <div
                        key={tier._id}
                        className={cn(
                            "relative flex flex-col p-8 rounded-[2rem] transition-all duration-300 h-full",

                            // Foundation: Clean White, Subtle, Professional
                            isFoundation && "bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 text-brand-900",

                            // Growth: The "Hero" - Cream/Gold Tint, Prominent
                            isGrowth && "bg-[#FFFCF5] border border-gold-200 shadow-2xl scale-105 z-20 text-brand-900 ring-4 ring-gold-500/5",

                            // Executive: The "VIP" - Dark, Exclusive, Premium
                            isExecutive && "bg-[#0B1215] border border-white/10 shadow-xl hover:-translate-y-1 text-white"
                        )}
                    >
                        {/* "Most Popular" Badge for Featured Tier */}
                        {tier.isFeatured && (
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-center w-full">
                                <span className="inline-block px-6 py-2 bg-[#C2A360] text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full shadow-lg font-sans">
                                    Most Popular
                                </span>
                            </div>
                        )}

                        {/* Header */}
                        <div className="text-center mb-10 pt-4">
                            <h3 className={cn(
                                "text-3xl font-bold font-heading mb-3",
                                isExecutive ? "text-white" : "text-brand-900"
                            )}>
                                {tier.name}
                            </h3>
                            {tier.tagline && (
                                <p className={cn(
                                    "text-sm font-medium tracking-wide opacity-80",
                                    isExecutive ? "text-slate-400" : "text-brand-600"
                                )}>
                                    {tier.tagline}
                                </p>
                            )}
                        </div>

                        {/* Pricing */}
                        <div className={cn(
                            "text-center mb-10 pb-8 border-b border-dashed",
                            isExecutive ? "border-white/10" : "border-brand-900/10"
                        )}>
                            <div className="flex items-baseline justify-center gap-1.5">
                                <span className={cn(
                                    "text-5xl font-bold font-heading tracking-tight",
                                    isExecutive ? "text-white" : "text-brand-900"
                                )}>
                                    {tier.price}
                                </span>
                                {tier.billingPeriod && (
                                    <span className={cn(
                                        "text-xs font-semibold uppercase tracking-wider translate-y-[-4px]",
                                        isExecutive ? "text-slate-500" : "text-brand-400"
                                    )}>
                                        /{tier.billingPeriod}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Features List */}
                        <ul className="space-y-5 mb-10 flex-grow px-2">
                            {tier.features?.map((feature, idx) => (
                                <li key={idx} className={cn(
                                    "flex items-start gap-4 text-[15px] font-medium leading-relaxed",
                                    isExecutive ? "text-slate-300" : "text-brand-700"
                                )}>
                                    <div className={cn(
                                        "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 shadow-sm",
                                        isFoundation && "bg-slate-100 text-slate-500",
                                        isGrowth && "bg-[#D4B572] text-white",
                                        isExecutive && "bg-brand-800 text-brand-400"
                                    )}>
                                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                                    </div>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        {/* CTA Button */}
                        <div className="mt-auto pt-4">
                            <Link
                                href={tier.ctaUrl || "/contact"}
                                className={cn(
                                    "block w-full py-5 px-6 rounded-xl text-center font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-md",

                                    // Foundation: Outline
                                    isFoundation && "bg-white text-brand-900 border-2 border-slate-100 hover:border-brand-200 hover:shadow-lg hover:bg-slate-50",

                                    // Growth: Solid Dark (High Contrast against Cream)
                                    isGrowth && "bg-[#0B1215] text-white hover:bg-black hover:shadow-xl hover:scale-[1.02]",

                                    // Executive: Solid Gold (Luxury on Dark)
                                    isExecutive && "bg-[#C2A360] text-brand-950 hover:bg-[#d4b572] hover:shadow-gold-500/20 hover:scale-[1.02]"
                                )}
                            >
                                {tier.ctaText || "Get Started"}
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

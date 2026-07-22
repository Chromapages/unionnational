"use client";

import Link from "next/link";
import { Check, Shield, TrendingUp, Wallet, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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

const getTierIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("foundation")) return Wallet;
    if (n.includes("growth")) return TrendingUp;
    if (n.includes("executive")) return Shield;
    return Star;
};

export function AdvisoryPricingCards({ tiers }: AdvisoryPricingCardsProps) {
    if (!tiers || tiers.length === 0) return null;

    const advisoryTiers = [...tiers]
        .filter(t => t.category === "advisory" || !t.category)
        .sort((a, b) => Number(b.isFeatured || b.name.toLowerCase().includes("foundation")) - Number(a.isFeatured || a.name.toLowerCase().includes("foundation")));

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6 relative z-10 items-stretch">
            {advisoryTiers.map((tier) => {
                const nameLower = tier.name.toLowerCase();
                const isExecutive = nameLower.includes("executive");
                const isPopular = tier.isFeatured || nameLower.includes("foundation");
                const Icon = getTierIcon(tier.name);

                return (
                    <motion.div
                        key={tier._id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className={cn(
                            "group relative flex flex-col rounded-3xl p-7 md:p-10 transition-all duration-500",
                            "border border-white/10 shadow-2xl overflow-hidden h-full",

                            // High-end Fintech Aesthetics
                            isExecutive
                                ? "bg-[#0B1215] text-white"
                                : "bg-white/80 backdrop-blur-sm text-brand-900 border-slate-200/60",

                            isPopular && "border-gold-500 ring-2 ring-gold-500/30 shadow-xl shadow-gold-500/10"
                        )}
                    >
                        {/* Subtle background glow for featured cards */}
                        {isPopular && (
                            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-gold-500/10 transition-colors duration-500" />
                        )}

                        {/* Standardized recommendation badge */}
                        {isPopular && (
                            <div className="absolute top-0 right-0">
                                <div className="absolute top-4 right-[-35px] rotate-45 bg-gold-500 text-brand-950 text-[10px] font-bold uppercase tracking-widest px-10 py-1 shadow-lg border-b border-black/10">
                                    Recommended
                                </div>
                            </div>
                        )}

                        {/* Card Header */}
                        <div className="mb-8 flex flex-col items-start gap-4 sm:mb-10 sm:flex-row sm:justify-between">
                            <div className={cn(
                                "w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110",
                                isExecutive ? "bg-brand-800/50 text-gold-500" : "bg-brand-50 text-brand-600"
                            )}>
                                <Icon className="w-7 h-7" />
                            </div>
                            <div className="text-left sm:text-right">
                                <h3 className={cn(
                                    "text-2xl font-bold font-heading tracking-tight",
                                    isExecutive ? "text-white" : "text-brand-900"
                                )}>
                                    {tier.name}
                                </h3>
                                {tier.tagline && (
                                    <p className={cn(
                                        "text-[11px] font-bold uppercase tracking-widest mt-1",
                                        isExecutive ? "text-gold-500/70" : "text-brand-500"
                                    )}>
                                        {tier.tagline}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Pricing Section */}
                        <div className="mb-8 border-t border-dashed border-white/10 pt-4 dark:border-brand-900/5 sm:mb-10">
                            <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-baseline sm:gap-2">
                                <span className={cn(
                                    "text-4xl font-bold font-heading tracking-tight sm:text-5xl",
                                    isExecutive ? "text-white" : "text-brand-900"
                                )}>
                                    {tier.price}
                                </span>
                                {tier.billingPeriod && (
                                    <span className={cn(
                                "text-xs font-bold uppercase tracking-widest opacity-70 whitespace-nowrap",
                                        isExecutive ? "text-slate-400" : "text-brand-500"
                                    )}>
                                        /{tier.billingPeriod}
                                    </span>
                                )}
                            </div>
                            <p className={cn(
                                "mt-3 rounded-md px-3 py-2 text-sm font-semibold",
                                isExecutive ? "bg-brand-800/60 text-slate-300" : "bg-gold-50 text-brand-700"
                            )}>
                                Starting implementation fee applies
                            </p>
                        </div>

                        {/* Features Grid - Clean & Minimalist */}
                        <ul className="space-y-4 mb-10 flex-grow">
                            {tier.features?.map((feature, idx) => (
                                <li key={idx} className={cn(
                                    "flex items-start gap-3 text-[14px] font-medium leading-relaxed group/item",
                                    isExecutive ? "text-slate-300" : "text-brand-700"
                                )}>
                                    <div className={cn(
                                        "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5",
                                        "transition-colors duration-300",
                                        isExecutive ? "bg-brand-800/80 group-hover/item:bg-gold-500/20" : "bg-slate-100 group-hover/item:bg-brand-50"
                                    )}>
                                        <Check className={cn(
                                            "w-3 h-3 transition-colors duration-300",
                                            isExecutive ? "text-gold-500" : "text-brand-500"
                                        )} />
                                    </div>
                                    <span className="transition-colors duration-300 group-hover/item:text-gold-600 dark:group-hover/item:text-gold-400">
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* Tier selection is a secondary action; the page-level booking CTA remains primary. */}
                        <div className="mt-auto">
                            <Link
                                href={tier.ctaUrl || "/contact"}
                                className={cn(
                                    "block min-h-11 w-full rounded-xl border px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] transition-colors",

                                    isExecutive
                                        ? "border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-brand-950"
                                        : "border-brand-900 bg-white text-brand-900 hover:bg-brand-900 hover:text-white"
                                )}
                            >
                                <span className="relative z-10">{tier.ctaText || "Get Started"}</span>
                            </Link>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}

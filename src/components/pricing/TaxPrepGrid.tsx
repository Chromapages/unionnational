"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Check } from "lucide-react";
import Link from "next/link";
import { PricingTier } from "./PricingSection";

interface TaxPrepGridProps {
    title: string;
    subtitle: string;
    tiers: PricingTier[];
}

export function TaxPrepGrid({ title, subtitle, tiers }: TaxPrepGridProps) {
    if (!tiers || tiers.length === 0) return null;

    return (
        <section className="mb-24">
            <RevealOnScroll>
                <div className="mb-10 pl-4 border-l-4 border-brand-900">
                    <h3 className="text-2xl font-bold text-brand-900 font-heading uppercase tracking-widest">{title}</h3>
                    <p className="text-brand-900/60 font-sans mt-1">{subtitle}</p>
                </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {tiers.map((tier, i) => (
                    <RevealOnScroll key={tier._id} delay={i * 100} className="h-full">
                        <div className="bg-white border border-slate-200 p-8 rounded-xl h-full flex flex-col hover:shadow-xl transition-all duration-300 group">
                            <div className="mb-6 pb-6 border-b border-slate-100">
                                <h4 className="text-xl font-bold text-brand-900 font-heading mb-2">{tier.name}</h4>
                                <div className="text-3xl font-bold text-brand-900 font-heading mb-1">
                                    {tier.price.startsWith('$') ? tier.price : `$${tier.price}`}
                                </div>
                                <div className="text-sm text-slate-500 font-medium font-sans">Starting Price</div>
                            </div>

                            <div className="mb-8 flex-grow">
                                <div className="mb-4">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-sans block mb-2">Best For</span>
                                    <p className="text-sm text-brand-900 leading-relaxed font-sans font-medium">
                                        {tier.bestFor || "Please contact us for details"}
                                    </p>
                                </div>

                                <div>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-sans block mb-2">What's Included</span>
                                    <ul className="space-y-3">
                                        {/* Use includes if available, otherwise fallback to features */}
                                        {(tier.includes ? tier.includes.split('\n') : tier.features)?.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 font-sans leading-relaxed">
                                                <div className="mt-1 w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                                                    <Check className="w-2.5 h-2.5" />
                                                </div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <Link
                                href={tier.ctaUrl || "/contact"}
                                className="w-full py-3 bg-slate-50 text-brand-900 font-bold text-sm rounded-lg flex items-center justify-center transition-colors hover:bg-brand-900 hover:text-white font-sans mt-auto"
                            >
                                Get Started
                            </Link>
                        </div>
                    </RevealOnScroll>
                ))}
            </div>
        </section>
    );
}

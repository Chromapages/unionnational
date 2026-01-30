"use client";

import { useState } from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Check, ArrowRight, HelpCircle, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import { TaxPrepGrid } from "./TaxPrepGrid";
import { OptionalServices } from "./OptionalServices";
import { PricingTrustSection } from "./PricingTrustSection";

export interface PricingTier {
    _id: string;
    name: string;
    slug: { current: string };
    tagline: string;
    price: string;
    billingPeriod: string;
    features: string[];
    isFeatured: boolean;
    ctaText: string;
    ctaUrl: string;
    category?: 'advisory' | 'individual' | 'business' | 'optional';
    bestFor?: string;
    includes?: string;
    relatedService: {
        title: string;
        slug: { current: string };
    };
}

interface FAQItem {
    _id: string;
    question: string;
    answer: string;
    category: string;
}

interface PricingSectionProps {
    tiers: PricingTier[];
    faqs: FAQItem[];
}

export function PricingSection({ tiers, faqs }: PricingSectionProps) {
    const [openFAQ, setOpenFAQ] = useState<string | null>(null);

    const toggleFAQ = (id: string) => {
        setOpenFAQ(openFAQ === id ? null : id);
    };

    // Group tiers by category
    const advisoryTiers = tiers.filter(t => t.category === 'advisory' || !t.category); // Fallback for legacy
    const individualTiers = tiers.filter(t => t.category === 'individual');
    const businessTiers = tiers.filter(t => t.category === 'business');
    const optionalServices = tiers.filter(t => t.category === 'optional');

    return (
        <div className="space-y-32">

            {/* 1. Advisory Plans (Cards) */}
            {advisoryTiers.length > 0 && (
                <div>
                    <div className="text-center mb-16">
                        <RevealOnScroll>
                            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-4 font-heading">Tax Planning & Advisory</h2>
                            <p className="text-brand-900/60 font-sans max-w-2xl mx-auto text-lg">Year-round strategic partnership for business owners and high-net-worth individuals.</p>
                        </RevealOnScroll>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
                        {advisoryTiers.map((tier, i) => (
                            <RevealOnScroll key={tier._id} delay={i * 75} className={`relative rounded-2xl p-8 lg:p-10 flex flex-col h-full border transition-all duration-300 ${tier.isFeatured ? 'bg-brand-900 border-brand-900 shadow-2xl scale-105 z-10' : 'bg-white border-slate-200 hover:border-gold-500/30 hover:shadow-xl'}`}>

                                {tier.isFeatured && (
                                    <div className="absolute top-0 right-0 left-0 flex justify-center -mt-4 pointer-events-none">
                                        <span className="bg-gold-500 text-brand-900 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg font-sans">
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                {/* Header */}
                                <div className="mb-8">
                                    <h3 className={`text-xl font-bold mb-2 font-heading ${tier.isFeatured ? 'text-white' : 'text-brand-900'}`}>
                                        {tier.name}
                                    </h3>
                                    <p className={`text-sm leading-relaxed font-sans ${tier.isFeatured ? 'text-slate-400' : 'text-slate-500'}`}>
                                        {tier.tagline}
                                    </p>
                                </div>

                                {/* Price */}
                                <div className="mb-8 font-sans">
                                    <div className="flex items-baseline gap-1">
                                        <span className={`text-4xl font-bold font-heading ${tier.isFeatured ? 'text-white' : 'text-brand-900'}`}>
                                            {tier.price.startsWith('$') ? tier.price : `$${tier.price}`}
                                        </span>
                                        <span className={`text-sm font-medium ${tier.isFeatured ? 'text-slate-400' : 'text-slate-500'}`}>
                                            /year
                                        </span>
                                    </div>
                                    <div className="mt-2 text-xs font-semibold text-gold-500 uppercase tracking-wide">
                                        Annual Investment
                                    </div>
                                </div>

                                {/* Features */}
                                <ul className="space-y-4 mb-10 flex-grow font-sans">
                                    {tier.features?.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${tier.isFeatured ? 'bg-gold-500/20 text-gold-500' : 'bg-green-100 text-green-600'}`}>
                                                <Check className="w-3 h-3" />
                                            </div>
                                            <span className={`text-sm leading-relaxed ${tier.isFeatured ? 'text-slate-300' : 'text-slate-600'}`}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <Link
                                    href={tier.ctaUrl || "/contact"}
                                    className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all group font-sans ${tier.isFeatured
                                        ? 'bg-gold-500 text-brand-900 hover:bg-white hover:text-brand-900'
                                        : 'bg-slate-50 text-brand-900 hover:bg-brand-900 hover:text-white'}`}
                                >
                                    {tier.ctaText || "Select Plan"}
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>

                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            )}

            {/* 2. Tax Preparation (Grids) */}
            {(individualTiers.length > 0 || businessTiers.length > 0) && (
                <div className="max-w-7xl mx-auto px-6 pt-16 border-t border-slate-200">
                    <div className="text-center mb-16">
                        <RevealOnScroll>
                            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-4 font-heading">2026 Tax Preparation</h2>
                            <p className="text-brand-900/60 font-sans max-w-2xl mx-auto text-lg">Transparent, straightforward pricing for your tax needs. Based on complexity, not forms.</p>
                        </RevealOnScroll>
                    </div>

                    <TaxPrepGrid
                        title="Individual Tax Returns"
                        subtitle="For individuals, families, and sole proprietors."
                        tiers={individualTiers}
                    />

                    <TaxPrepGrid
                        title="Business Entity Returns"
                        subtitle="For Partnerships, S-Corps, and C-Corps."
                        tiers={businessTiers}
                    />
                </div>
            )}

            {/* 3. Optional Services */}
            <OptionalServices services={optionalServices} />

            {/* 4. Trust & Disclosures */}
            <PricingTrustSection />

            {/* Pricing FAQ Section */}
            <section className="max-w-3xl mx-auto px-6">
                <RevealOnScroll>
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold text-brand-900 mb-4 font-heading">Pricing FAQ</h2>
                        <p className="text-brand-900/60 font-sans">Common questions about our engagement models.</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.filter(f => f.category === 'pricing' || f.category === 'general').slice(0, 5).map((faq) => (
                            <div key={faq._id} className="border border-slate-200 rounded-xl bg-white overflow-hidden">
                                <button
                                    onClick={() => toggleFAQ(faq._id)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                                >
                                    <span className="font-bold text-brand-900 font-heading">{faq.question}</span>
                                    {openFAQ === faq._id ? (
                                        <Minus className="w-5 h-5 text-gold-600 shrink-0" />
                                    ) : (
                                        <Plus className="w-5 h-5 text-slate-400 shrink-0" />
                                    )}
                                </button>
                                <AnimatePresence>
                                    {openFAQ === faq._id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="px-6 pb-6 text-sm text-brand-900/70 leading-relaxed font-sans border-t border-slate-100 pt-4">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </RevealOnScroll>
            </section>
        </div>
    );
}

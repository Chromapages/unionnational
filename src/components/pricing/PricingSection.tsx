"use client";

import { useState } from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Check, ArrowRight, HelpCircle, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

interface PricingTier {
    _id: string;
    name: string;
    slug: { current: string };
    tagline: string;
    price: number;
    billingPeriod: string;
    features: string[];
    isFeatured: boolean;
    ctaText: string;
    ctaUrl: string;
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
    const [isAnnual, setIsAnnual] = useState(false);
    const [openFAQ, setOpenFAQ] = useState<string | null>(null);

    const toggleFAQ = (id: string) => {
        setOpenFAQ(openFAQ === id ? null : id);
    };

    return (
        <div className="space-y-32">

            {/* Toggle Switch */}
            <div className="flex justify-center mb-16">
                <div className="bg-white border border-slate-200 p-1.5 rounded-full flex items-center relative shadow-sm">
                    <button
                        onClick={() => setIsAnnual(false)}
                        className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all relative z-10 font-sans ${!isAnnual ? 'text-brand-900 bg-white shadow-sm' : 'text-slate-500 hover:text-brand-900'}`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setIsAnnual(true)}
                        className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all relative z-10 flex items-center gap-2 font-sans ${isAnnual ? 'bg-brand-900 text-white shadow-lg' : 'text-slate-500 hover:text-brand-900'}`}
                    >
                        Annually
                        <span className="bg-gold-500 text-brand-900 text-[10px] px-2 py-0.5 rounded-full">Save 20%</span>
                    </button>
                    {!isAnnual && (
                        <div className="absolute inset-0 bg-slate-100 rounded-full opacity-0"></div>
                    )}
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
                {tiers.map((tier, i) => {
                    const price = isAnnual ? Math.round(tier.price * 0.8) : tier.price;

                    return (
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
                                        ${price}
                                    </span>
                                    <span className={`text-sm font-medium ${tier.isFeatured ? 'text-slate-400' : 'text-slate-500'}`}>
                                        /{tier.billingPeriod === 'One Time' ? 'project' : 'month'}
                                    </span>
                                </div>
                                {isAnnual && tier.billingPeriod !== 'One Time' && (
                                    <div className="mt-2 text-xs font-semibold text-gold-500 uppercase tracking-wide">
                                        Billed annually (${price * 12})
                                    </div>
                                )}
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
                                {tier.ctaText}
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>

                        </RevealOnScroll>
                    );
                })}
            </div>

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

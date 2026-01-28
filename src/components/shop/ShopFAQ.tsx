"use client";

import { useState } from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

interface FAQItem {
    question: string;
    answer: string;
}

interface ShopFAQProps {
    items: FAQItem[];
}

export function ShopFAQ({ items }: ShopFAQProps) {
    if (!items || items.length === 0) return null;
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="max-w-3xl mx-auto px-6 mb-32">
            <RevealOnScroll>
                <div className="text-center mb-12">
                    <h3 className="text-2xl font-bold text-brand-900 mb-4 font-heading">Frequently Asked Questions</h3>
                </div>

                <div className="space-y-4">
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className="group rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm transition-all hover:border-gold-400/50 hover:shadow-md"
                        >
                            <button
                                type="button"
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="flex w-full items-center justify-between gap-4 p-5 text-left text-base font-semibold text-brand-900 font-heading"
                            >
                                <span>{item.question}</span>
                                <span className={`transition-transform duration-300 ${openIndex === idx ? "rotate-180" : "rotate-0"}`}>
                                    <ChevronDown className="w-5 h-5 text-brand-900/60" />
                                </span>
                            </button>
                            <AnimatePresence initial={false}>
                                {openIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 pb-5 text-sm text-slate-500 leading-relaxed font-sans">
                                            {item.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                <div className="mt-10 rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm px-6 py-5 text-center">
                    <p className="text-sm font-semibold text-brand-900 font-heading">Still have questions?</p>
                    <p className="mt-2 text-sm text-slate-500 font-sans">
                        Reach out to our team for personalized guidance.
                    </p>
                    <Link
                        href="/contact"
                        className="mt-4 inline-flex items-center justify-center rounded-full border border-brand-900 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-brand-900 transition-colors hover:bg-brand-900 hover:text-white"
                    >
                        Contact Support
                    </Link>
                </div>
            </RevealOnScroll>
        </section>
    );
}

"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ChevronDown } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
}

interface ShopFAQProps {
    items: FAQItem[];
}

export function ShopFAQ({ items }: ShopFAQProps) {
    if (!items || items.length === 0) return null;

    return (
        <section className="max-w-3xl mx-auto px-6 mb-32">
            <RevealOnScroll>
                <div className="text-center mb-12">
                    <h3 className="text-2xl font-bold text-brand-900 mb-4 font-heading">Frequently Asked Questions</h3>
                </div>

                <div className="space-y-4">
                    {items.map((item, idx) => (
                        <details key={idx} className="group bg-white rounded-xl border border-slate-200 overflow-hidden cursor-pointer transition-shadow hover:shadow-md">
                            <summary className="flex justify-between items-center p-5 font-bold text-sm text-brand-900 list-none font-sans select-none">
                                <span>{item.question}</span>
                                <span className="transition-transform duration-300 group-open:rotate-180">
                                    <ChevronDown className="w-4 h-4 text-brand-900/60" />
                                </span>
                            </summary>
                            <div className="px-5 pb-5 pt-0 text-sm text-brand-900/70 leading-relaxed font-sans border-t border-transparent group-open:border-slate-100 group-open:pt-4 transition-all">
                                {item.answer}
                            </div>
                        </details>
                    ))}
                </div>
            </RevealOnScroll>
        </section>
    );
}

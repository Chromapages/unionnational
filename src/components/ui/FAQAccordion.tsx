"use client";

import { useState } from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Plus } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    items: FAQItem[];
    title?: string;
    className?: string;
}

export function FAQAccordion({ items, title = "Common Questions", className }: FAQAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className={`py-24 ${className}`}>
            <div className="max-w-3xl mx-auto px-6">
                <RevealOnScroll>
                    <h2 className="text-2xl font-bold text-brand-900 tracking-tight mb-8 text-center font-heading">{title}</h2>
                    <div className="space-y-4">
                        {items.map((item, i) => (
                            <div
                                key={i}
                                className="group bg-white border border-slate-200 rounded-xl overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    className="flex items-center justify-between w-full p-5 text-left text-brand-900 font-bold text-sm hover:bg-gold-50/50 transition-colors font-heading"
                                >
                                    {item.question}
                                    <Plus
                                        className={`w-4 h-4 text-gold-400 transition-transform duration-300 ${openIndex === i ? "rotate-45" : ""
                                            }`}
                                    />
                                </button>
                                <div
                                    className={`px-5 text-sm text-brand-900 leading-relaxed font-body transition-all duration-300 ease-in-out overflow-hidden ${openIndex === i ? "max-h-96 pb-5 opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                >
                                    {item.answer}
                                </div>
                            </div>
                        ))}
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}

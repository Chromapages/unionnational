"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import Link from "next/link";
import { FAQAccordion } from "@/components/home/FAQAccordion";

interface FAQItem {
    question: string;
    answer: string;
}

interface ShopFAQProps {
    items: FAQItem[];
}

export function ShopFAQ({ items }: ShopFAQProps) {
    if (!items || items.length === 0) return null;

    // Map shop items (simple objects) to the format expected by FAQAccordion
    const mappedItems = items.map((item, idx) => ({
        _id: `shop-faq-${idx}`,
        question: item.question,
        answer: item.answer,
        category: "General"
    }));

    return (
        <section className="max-w-4xl mx-auto px-6 mb-32">
            <RevealOnScroll>
                <div className="text-center mb-12">
                    <h3 className="text-2xl font-bold text-brand-900 mb-4 font-heading">Frequently Asked Questions</h3>
                </div>

                <FAQAccordion items={mappedItems} variant="light" />

                <div className="mt-16 rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm px-6 py-8 text-center max-w-2xl mx-auto">
                    <p className="text-sm font-semibold text-brand-900 font-heading">Still have questions?</p>
                    <p className="mt-2 text-sm text-slate-500 font-sans mb-6">
                        Reach out to our team for personalized guidance.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-full border border-brand-900 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-brand-900 transition-colors hover:bg-brand-900 hover:text-white"
                    >
                        Contact Support
                    </Link>
                </div>
            </RevealOnScroll>
        </section>
    );
}

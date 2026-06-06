import { Plus, Minus } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const faqs = [
    {
        q: "Is this book only for large construction companies?",
        a: "Not at all. The blueprint works for any construction or trade business doing $250K–$20M in revenue. The systems scale up — but they're designed to start working immediately regardless of your current size.",
    },
    {
        q: "How is this different from other business books?",
        a: "Most business books are written for generic industries. This book is written specifically for construction — the job costing, the crew dynamics, the cash flow timing, the seasonal swings. Every example, every system, every recommendation is built around how construction businesses actually operate.",
    },
    {
        q: "When will I receive the physical book?",
        a: "Physical books ship within 3–5 business days via standard US shipping (free). You'll receive an order confirmation with tracking. All digital formats are available immediately after purchase.",
    },
    {
        q: "Do I get digital access with the physical book?",
        a: "Yes. Every physical book purchase includes a complimentary digital PDF download so you can reference the material on your phone or tablet while you wait for the book to arrive.",
    },
    {
        q: "Is this the same as working with Jason directly?",
        a: "The book gives you the complete framework Jason uses with his private clients — at a fraction of the cost. Many business owners use the book as a starting point and then engage Jason's firm for implementation support once they understand the strategy.",
    },
];

export function BlueprintFAQ() {
    return (
        <RevealOnScroll>
            <section className="py-20 lg:py-24 bg-surface">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 lg:mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-900/5 border border-brand-900/10 text-[10px] font-bold uppercase tracking-widest text-brand-900 mb-6">
                            Got Questions?
                        </span>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-brand-900 tracking-tight leading-[1.05] uppercase">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <RevealOnScroll key={i} delay={i * 60}>
                                <details
                                    className="group border border-slate-200 rounded-2xl overflow-hidden bg-white"
                                    open
                                >
                                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:bg-slate-50 transition-colors">
                                        <span className="font-bold font-heading text-brand-900 pr-4">
                                            {faq.q}
                                        </span>
                                        <span
                                            aria-hidden="true"
                                            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors bg-slate-100 text-slate-500 group-open:bg-brand-900 group-open:text-white"
                                        >
                                            <Plus size={14} className="block group-open:hidden" />
                                            <Minus size={14} className="hidden group-open:block" />
                                        </span>
                                    </summary>
                                    <div className="px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed border-l-2 border-brand-900/20">
                                        {faq.a}
                                    </div>
                                </details>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>
        </RevealOnScroll>
    );
}

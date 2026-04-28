"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface FAQItemProps {
    q: string;
    a: string;
}

const FAQItem = ({ q, a }: FAQItemProps) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-slate-100 last:border-b-0">
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full flex justify-between items-center gap-4 py-6 text-left group"
                aria-expanded={open}
            >
                <span className="font-bold text-brand-900 font-heading text-lg leading-snug group-hover:text-gold-600 transition-colors">
                    {q}
                </span>
                <span className="shrink-0 w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-gold-500 group-hover:text-gold-500 transition-all">
                    {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <div className="pb-6 text-slate-600 leading-relaxed font-body text-base">
                            {a}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

interface ScorpFAQSectionProps {
    faqs: { q: string; a: string }[];
}

export const ScorpFAQSection = ({ faqs }: ScorpFAQSectionProps) => {
    return (
        <section className="py-20 lg:py-24 bg-white relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 lg:mb-20">
                    <RevealOnScroll>
                        <div className="mb-6">
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600 font-heading">F.A.Q.</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-900 font-heading leading-[1.1] mb-8">
                            Honest <span className="italic text-gold-500">Answers.</span>
                        </h2>
                        <p className="text-lg text-slate-500 font-light font-sans max-w-2xl mx-auto">
                            The decision should be based on actual business conditions, not marketing hype.
                        </p>
                    </RevealOnScroll>
                </div>

                <RevealOnScroll delay={200}>
                    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm px-6 lg:px-10">
                        {faqs.map((faq, i) => (
                            <FAQItem key={i} q={faq.q} a={faq.a} />
                        ))}
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ChevronUp } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";

const faqs = [
    {
        q: "Is the checklist actually useful for a small contractor?",
        a: "Yes. The checklist is built for construction business owners at any stage — from solo contractors to firms with multiple crews. The items on it apply directly to the decisions you make every day, regardless of company size.",
    },
    {
        q: "Is this about bookkeeping or about profit control?",
        a: "Profit control. The checklist covers the daily habits and systems that determine whether profit stays in your jobs or quietly disappears through labor overruns, change orders, and scope creep.",
    },
    {
        q: "I already have an accountant. Why do I need this?",
        a: "Most accountants help you understand what happened after the fact. The checklist focuses on the indicators you should be watching during the job — where the actual profit is won or lost.",
    },
    {
        q: "How long does it take to complete?",
        a: "About 5 minutes. It is a quick audit of your current profit control habits — not a long read. contractors go through it in one sitting.",
    },
    {
        q: "Is there a catch with the free checklist?",
        a: "No catch. You get the full checklist. After you complete it, you may receive a few emails about the Construction Profitability Assessment — that is the natural next step if you want a deeper diagnostic.",
    },
];

export function BlueprintFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <RevealOnScroll>
            <section className="py-20 lg:py-24 bg-surface">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 lg:mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-900/5 border border-brand-900/10 text-[10px] font-bold uppercase tracking-widest text-brand-900 mb-6">
                            Got Questions?
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold font-heading text-brand-900 tracking-tight">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <RevealOnScroll key={i} delay={i * 60}>
                                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                                    <button
                                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                        className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-slate-50 transition-colors"
                                    >
                                        <span className="font-bold font-heading text-brand-900 pr-4">
                                            {faq.q}
                                        </span>
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors",
                                            openIndex === i ? "bg-brand-900 text-white" : "bg-slate-100 text-slate-500"
                                        )}>
                                            {openIndex === i ? <ChevronUp size={14} /> : <Plus size={14} />}
                                        </div>
                                    </button>
                                    <AnimatePresence>
                                        {openIndex === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25, ease: "easeOut" }}
                                            >
                                                <div className="px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed border-l-2 border-brand-900/20">
                                                    {faq.a}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>
        </RevealOnScroll>
    );
}
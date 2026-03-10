"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

interface VSLFaqProps {
  faqs?: { question: string; answer: string }[];
}

export function VSLFaq({ faqs }: VSLFaqProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const defaultFaqs = [
    {
      question: "How long does the initial onboarding process take?",
      answer: "Typically, we can complete the discovery and roadmap phase in 7-14 days, depending on the complexity of your current financial situation."
    },
    {
      question: "Is there a long-term commitment required?",
      answer: "We offer both project-based resolution and ongoing partner programs. Our goal is to prove value early so you choose to stay for the long term."
    },
    {
      question: "What if I have unfiled returns or tax penalties?",
      answer: "That is exactly what we specialize in. We have a direct line to IRS representatives to pause collections and begin the abatement process immediately."
    }
  ];

  const items = faqs && faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <section className="py-20 md:py-32 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-200/50 text-slate-600 text-sm font-bold mb-6">
            <HelpCircle className="w-4 h-4" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-brand-900 font-heading">
            Got Questions? We Have Answers.
          </h2>
        </div>

        <div className="space-y-4">
          {items.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-bold text-brand-900 pr-8">
                  {faq.question}
                </span>
                <div className="shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-brand-900">
                  {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 pt-0 text-slate-600 leading-relaxed text-lg border-t border-slate-50">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

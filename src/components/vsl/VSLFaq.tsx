"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface VSLFaqProps {
  faqs?: { question: string; answer: string }[];
}

export function VSLFaq({ faqs }: VSLFaqProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const defaultFaqs = [
    {
      question: "How much can you actually reduce my tax debt?",
      answer: "Results vary based on your financial situation, but our clients see an average 78% reduction in total liability. Many qualify for federal programs like Offer in Compromise that allow for settling for cents on the dollar."
    },
    {
      question: "How long does the resolution process take?",
      answer: "We typically stop immediate IRS collections (levies/garnishments) within 21 days. The full negotiation and settlement process usually takes between 4 to 12 months depending on the complexity."
    },
    {
      question: "Is this legitimate? Can the IRS really settle for less?",
      answer: "Absolutely. The Offer in Compromise and Currently Not Collectible programs are federally authorized. As IRS-authorized Enrolled Agents, we have a 97% acceptance rate on filed settlements."
    },
    {
      question: "What if I haven't filed in multiple years?",
      answer: "This is very common. We file all your back returns, negotiate the associated penalties, and get you back into full compliance without maximizing what you owe."
    },
    {
      question: "What does the strategy call cost?",
      answer: "The initial strategy call is 100% free with no obligation. We analyze your situation and tell you exactly what we can achieve for you before you commit to anything."
    }
  ];

  const items = faqs && faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <section className="py-24 md:py-32 bg-[#050A14] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-16 lg:gap-24">
          <div className="flex flex-col">
            <div className="font-mono text-[11px] font-bold text-emerald-500 tracking-[0.2em] uppercase mb-4">
              Common Questions
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight mb-4">
              Have questions?
            </h2>
            <p className="text-slate-500 text-[15px] leading-relaxed">
              We've helped thousands navigate the IRS resolution process. Here are the most common questions we receive.
            </p>
          </div>

          <div className="flex flex-col border-t border-white/10">
            {items.map((faq, index) => (
              <div key={index} className="border-b border-white/10">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between py-6 text-left group transition-all"
                  aria-expanded={openIndex === index}
                >
                  <span className={`text-lg font-bold transition-colors ${openIndex === index ? "text-emerald-400" : "text-white group-hover:text-emerald-400"}`}>
                    {faq.question}
                  </span>
                  <div className={`shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180 text-emerald-400" : "text-slate-500"}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="pb-8 text-slate-400 leading-relaxed text-[15px]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

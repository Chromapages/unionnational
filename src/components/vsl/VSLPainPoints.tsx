"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface VSLPainPointsProps {
  items?: { text: string }[];
  industry: string;
}

export function VSLPainPoints({ items, industry }: VSLPainPointsProps) {
  const fallbacks: Record<string, string[]> = {
    construction: [
      "Leaking cash on job costing & labor overruns",
      "Struggling to scale beyond your personal capacity",
      "Constant fire-fighting and project delays",
      "No clear visibility into project-level profitability",
      "Field teams and office staff out of sync",
      "Inconsistent cash flow making it hard to bid new jobs"
    ],
    restaurants: [
      "Food costs rising faster than menu prices",
      "High employee turnover destroying service standards",
      "Marketing spend not showing clear ROI",
      "Inefficient prep and inventory systems",
      "Lack of real-time data to make profit decisions",
      "Inconsistent guest experience across shifts"
    ],
    "real-estate": [
      "Low lead-to-close conversion ratios",
      "Overwhelmed by managing multiple listing platforms",
      "Inconsistent deal flow creating 'commission breath'",
      "Spending too much on low-quality lead gen",
      "Lack of automated follow-up systems",
      "No clear brand differentiation in a crowded market"
    ],
    "tax-resolution": [
      "Threats of IRS levies or wage garnishments",
      "Constant calls and harassment from tax agents",
      "Accumulating penalties and interest every day",
      "Inability to sleep from constant tax-related stress",
      "Fear of losing your business or personal assets",
      "Confusion over complex IRS forms and procedures"
    ]
  };

  const defaultItems = (fallbacks[industry] || fallbacks["tax-resolution"]).map(text => ({ text }));
  const painPoints = items && items.length > 0 ? items : defaultItems;

  return (
    <section className="py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-brand-900 font-heading mb-4"
          >
            Does Any Of This Sound Like You?
          </motion.h2>
          <div className="w-20 h-1 bg-red-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border-l-4 border-red-500 hover:shadow-md transition-shadow group"
            >
              <div className="p-2 rounded-lg bg-red-50 text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white">
                <AlertCircle className="w-5 h-5 shrink-0" />
              </div>
              <p className="text-slate-700 font-medium leading-relaxed pt-1">
                {point.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

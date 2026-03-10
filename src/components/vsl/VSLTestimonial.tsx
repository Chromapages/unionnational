"use client";

import React from "react";
import { motion } from "framer-motion";

interface TestimonialData {
  quote: string;
  name?: string;
  author?: string;
  company?: string;
  rating?: number;
  industryBadge?: string;
  beforeAfterMetric?: string;
  beforeVal?: string;
  afterVal?: string;
}

interface VSLTestimonialProps {
  testimonial?: TestimonialData;
}

export function VSLTestimonial({ testimonial }: VSLTestimonialProps) {
  const defaultTestimonial: TestimonialData = {
    quote: "I owed $210,000 to the IRS from my restaurant. Union National settled it for $18,400. I thought I'd lose everything — instead, I kept my business and my home. They're the real deal.",
    name: "Marco R.",
    company: "Restaurant Owner",
    rating: 5,
    industryBadge: "Miami, FL",
    beforeVal: "$210,000",
    afterVal: "$18,400",
  };

  const data = testimonial?.quote ? testimonial : defaultTestimonial;
  const authorName = data.name || data.author || "Client";

  return (
    <section className="py-16 md:py-20 bg-[#0D1526] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          {/* Quote */}
          <blockquote className="text-xl md:text-3xl font-medium text-white mb-8 leading-relaxed italic tracking-tight">
            &quot;{data.quote}&quot;
          </blockquote>

          {/* Author */}
          <div className="flex flex-col items-center mb-6">
            <div className="text-white font-bold text-base mb-1">{authorName}</div>
            <div className="text-slate-500 text-sm font-medium">
              {data.company} {data.industryBadge && `· ${data.industryBadge}`}
            </div>
          </div>

          {/* Before/After Pills */}
          {(data.beforeVal || data.afterVal) && (
            <div className="inline-flex rounded-full border border-white/10 overflow-hidden font-mono text-xs font-bold">
              <div className="px-5 py-2 bg-red-500/10 text-red-400 border-r border-white/10 uppercase tracking-wider">
                Before: {data.beforeVal}
              </div>
              <div className="px-5 py-2 bg-emerald-500/10 text-emerald-400 uppercase tracking-wider">
                After: {data.afterVal}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/5 blur-[100px] pointer-events-none" />
    </section>
  );
}

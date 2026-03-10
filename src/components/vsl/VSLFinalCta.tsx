"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, ShieldCheck, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { LuxuryTravelIncentive } from "@/components/ui/LuxuryTravelIncentive";

interface VSLFinalCtaProps {
  headline?: string;
  subtext?: string;
  industry: string;
}

export function VSLFinalCta({ headline, subtext, industry }: VSLFinalCtaProps) {
  const industryMap: Record<string, string> = {
    construction: "Construction Profitability",
    restaurants: "Restaurant Operations",
    "real-estate": "Real Estate Deal Flow",
    "tax-resolution": "Tax Debt Struggle"
  };

  const defaultHeadline = `Ready to Stop Struggling With ${industryMap[industry] || "Your Business Challenges"}?`;
  const defaultSubtext = "Book your free, no-obligation strategy call today and get a clear roadmap to resolution.";

  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-brand-900 to-slate-950 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-[300px] h-[300px] bg-gold-400 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-400 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-6xl font-black text-white font-heading mb-8 leading-tight">
            {headline || defaultHeadline}
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12">
            {subtext || defaultSubtext}
          </p>

          {/* CTA Button */}
          <div className="mb-16">
            <Link
              href="/apply"
              className="inline-flex items-center gap-3 px-10 py-6 bg-gold-500 hover:bg-gold-600 text-brand-900 font-black text-xl rounded-2xl shadow-[0_0_30px_rgba(212,160,23,0.4)] transition-all hover:scale-105 group"
            >
              Book Your Free Strategy Call
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6 text-slate-400 font-bold text-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                NO OBLIGATION
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gold-500" />
                15-MINUTE CALL
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-400" />
                SPOTS LIMITED
              </div>
            </div>
          </div>

          {/* Luxury Travel Incentive (Optional but included for extra value) */}
          <div className="max-w-2xl mx-auto opacity-90 scale-95">
            <LuxuryTravelIncentive />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

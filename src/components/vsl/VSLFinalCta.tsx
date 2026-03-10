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

  const defaultHeadline = `Ready to Resolve Your ${industryMap[industry] || "IRS Tax Debt"} Once and For All?`;
  const defaultSubtext = "The first step is a 15-minute strategy call. We analyze your situation and tell you exactly what we can achieve. No pressure — just a plan.";

  return (
    <section className="py-24 md:py-40 bg-[#050A14] relative overflow-hidden border-t border-white/5">
      {/* Background Accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_100%,rgba(34,197,94,0.1)_0%,transparent_50%)]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="font-mono text-[11px] font-bold text-emerald-500 tracking-[0.2em] uppercase mb-8">
            Final Step
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-white font-heading mb-8 leading-[1.05] tracking-tighter">
            {headline || defaultHeadline}
          </h2>
          <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-16 leading-relaxed">
            {subtext || defaultSubtext}
          </p>

          {/* CTA Button */}
          <div className="mb-20">
            <Link
              href="/apply"
              className="inline-flex items-center gap-3 px-12 py-7 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xl rounded-2xl shadow-[0_0_40px_rgba(34,197,94,0.3)] transition-all hover:translate-y-[-4px] group"
            >
              Book Your Free Strategy Call
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8 text-slate-500 font-bold text-sm tracking-widest">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-500/60" />
                NO OBLIGATION
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-emerald-500/60" />
                15-MINUTE CALL
              </div>
              <div className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-emerald-500/60" />
                SPOTS LIMITED
              </div>
            </div>
          </div>

        </motion.div>
      </div>

      {/* Luxury Travel Incentive - full width outside constrained container */}
      <div className="relative z-10 px-4 mt-0">
        <div className="bg-white/[0.03] border border-white/[0.08] p-1 rounded-3xl backdrop-blur-sm">
          <LuxuryTravelIncentive />
        </div>
      </div>
    </section>
  );
}

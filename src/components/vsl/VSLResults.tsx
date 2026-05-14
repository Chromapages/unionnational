"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface VSLResultsProps {
  stats?: { value: string; label: string }[];
  title?: string;
  subheadline?: string;
}

export function VSLResults({ stats, title, subheadline }: VSLResultsProps) {
  const defaultStats = [
    { value: "340%", label: "Avg. Revenue Growth" },
    { value: "$2.1M", label: "Tax Penalties Abated" },
    { value: "450+", label: "Success Stories" },
    { value: "92%", label: "Operational Efficiency Gain" },
  ];

  const items = stats && stats.length > 0 ? stats : defaultStats;

  return (
    <section className="py-24 md:py-32 bg-brand-900 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gold-500 rounded-full blur-[150px] transform -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute -bottom-24 right-0 w-[300px] h-[300px] bg-white rounded-full blur-[100px] opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gold-400 font-bold uppercase tracking-[0.2em] text-sm block mb-4"
          >
            Proof in Performance
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white font-heading mb-6"
          >
            {title || "Real Outcomes. Documented Results."}
          </motion.h2>
          <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {subheadline || "We don't just provide services; we deliver measurable bottom-line improvements that transform businesses."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 lg:gap-8 mb-20">
          {items.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors group"
            >
              <span className="text-4xl lg:text-5xl xl:text-6xl font-black text-gold-500 font-heading mb-3 group-hover:scale-110 transition-transform">
                {stat.value}
              </span>
              <span className="text-sm font-bold text-slate-300 tracking-wide">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Secondary CTA Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <Link
            href="/apply"
            className="group px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/20 transition-all flex items-center gap-3 text-lg font-bold"
          >
            See More Success Stories
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

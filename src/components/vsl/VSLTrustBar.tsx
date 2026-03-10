"use client";

import React from "react";
import { motion } from "framer-motion";

interface VSLTrustBarProps {
  stats?: { value: string; label: string }[];
}

export function VSLTrustBar({ stats }: VSLTrustBarProps) {
  const defaultStats = [
    { value: "$10M+", label: "Debt Resolved" },
    { value: "500+", label: "Clients Served" },
    { value: "20+", label: "Years Experience" },
    { value: "98%", label: "Success Rate" },
    { value: "IRS", label: "Certified Team" },
  ];

  const items = stats && stats.length > 0 ? stats : defaultStats;

  return (
    <div className="w-full bg-white border-b border-slate-100 py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
          {items.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center justify-center text-center group"
            >
              <span className="text-3xl md:text-5xl font-black text-gold-500 font-heading mb-2 transition-transform group-hover:scale-110 duration-300">
                {stat.value}
              </span>
              <span className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest px-2">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

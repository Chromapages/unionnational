"use client";

import React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";

interface VSLHowItWorksProps {
  steps?: { title: string; description: string; icon: string }[];
}

export function VSLHowItWorks({ steps }: VSLHowItWorksProps) {
  const defaultSteps = [
    {
      title: "Free Consultation & Analysis",
      description: "We review your full IRS account transcripts, calculate your true liability, and identify every legal resolution option available.",
      icon: "Search"
    },
    {
      title: "Negotiate Directly with IRS",
      description: "Our enrolled agents handle all communication. We file the right programs (OIC, CNC, IA) to minimize what you legally owe.",
      icon: "Shield"
    },
    {
      title: "Resolution & Clean Slate",
      description: "You receive written confirmation from the IRS. Collections stop. You start fresh — with a clear path forward.",
      icon: "CheckCircle2"
    },
  ];

  const items = steps && steps.length > 0 ? steps : defaultSteps;

  const getIcon = (iconName: string) => {
    // @ts-ignore
    const Icon = LucideIcons[iconName] || LucideIcons.CheckCircle2;
    return <Icon className="w-6 h-6" />;
  };

  return (
    <section className="py-24 md:py-32 bg-[#0D1526] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-[11px] font-bold text-emerald-500 tracking-[0.2em] uppercase mb-4"
          >
            The Process
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-white font-heading mb-6 tracking-tight"
          >
            Three Steps to IRS Freedom
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Desktop Connecting Line */}
          <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
          </div>

          {items.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative z-10 group"
            >
              <div className="bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm rounded-2xl p-8 h-full transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.12] group">
                {/* Background Large Number */}
                <div className="absolute top-6 right-8 font-mono text-7xl font-black text-white/[0.03] leading-none pointer-events-none group-hover:text-emerald-500/10 transition-colors">
                  0{index + 1}
                </div>

                {/* Icon Container */}
                <div className="w-14 h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(34,197,94,0.1)] group-hover:scale-110 transition-transform duration-300">
                  {getIcon(step.icon)}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-4 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-[15px]">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

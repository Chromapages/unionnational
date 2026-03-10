"use client";

import React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { ChevronRight } from "lucide-react";

interface VSLHowItWorksProps {
  steps?: { title: string; description: string; icon: string }[];
}

export function VSLHowItWorks({ steps }: VSLHowItWorksProps) {
  const defaultSteps = [
    {
      title: "Discovery Call",
      description: "We dive deep into your financials to identify hidden gaps and immediate opportunities for recovery.",
      icon: "Search"
    },
    {
      title: "Custom Roadmap",
      description: "We build a bespoke execution plan tailored to your specific industry goals and risk profile.",
      icon: "Map"
    },
    {
      title: "Execution & Results",
      description: "Our elite team implements the roadmap, providing constant visibility until targets are achieved.",
      icon: "Rocket"
    },
  ];

  const items = steps && steps.length > 0 ? steps : defaultSteps;

  const getIcon = (iconName: string) => {
    // @ts-ignore
    const Icon = LucideIcons[iconName] || LucideIcons.CheckCircle2;
    return <Icon className="w-8 h-8" />;
  };

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-brand-900 font-heading mb-4"
          >
            Our Simple 3-Step Process
          </motion.h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            We've streamlined our onboarding to get you results as fast as possible without the friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          {items.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector Arrow (Desktop Only) */}
              {index < items.length - 1 && (
                <div className="hidden md:block absolute top-12 -right-12 lg:-right-16 z-0 opacity-20 transform translate-x-1/2">
                  <ChevronRight className="w-10 h-10 text-brand-900" />
                </div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center px-6"
              >
                {/* Number Badge */}
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-brand-900 text-white flex items-center justify-center font-bold text-lg shadow-lg border-2 border-white">
                  {index + 1}
                </div>

                {/* Icon Container */}
                <div className="w-20 h-20 rounded-3xl bg-gold-50 text-gold-600 flex items-center justify-center mb-8 rotate-3 transition-transform group-hover:rotate-0 group-hover:scale-110 duration-300 shadow-sm border border-gold-100">
                  {getIcon(step.icon)}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-black text-brand-900 font-heading mb-4">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {step.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

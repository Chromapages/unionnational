"use client";

import React from "react";
import { motion } from "framer-motion";

interface StatItem {
    value: string;
    label: string;
}

interface VSLMetricsBarProps {
    stats?: StatItem[];
}

export function VSLMetricsBar({ stats }: VSLMetricsBarProps) {
    const defaultStats: StatItem[] = [
        { value: "$847M+", label: "Tax Debt Resolved" },
        { value: "12,400+", label: "Clients Helped" },
        { value: "97%", label: "Success Rate" },
        { value: "4.9★", label: "Average Rating" },
    ];

    const items = stats && stats.length > 0 ? stats : defaultStats;

    return (
        <div className="w-full bg-[#0D1526] border-y border-white/5 py-12 md:py-20 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-full bg-emerald-500/10 blur-[120px]" />
            </div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
                    {items.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`flex flex-col items-center justify-center text-center px-6 py-6 md:py-0 ${index < items.length - 1 ? "md:border-r border-white/5" : ""
                                } ${index % 2 === 0 ? "border-r md:border-r" : ""
                                } md:border-b-0 border-b border-white/5 last:border-b-0`}
                        >
                            <div className="text-3xl md:text-5xl font-bold text-emerald-400 font-mono mb-3 tracking-tight">
                                {stat.value}
                            </div>
                            <div className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

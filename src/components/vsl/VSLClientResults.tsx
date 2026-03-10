"use client";

import React from "react";
import { motion } from "framer-motion";

interface VSLClientResultsProps {
    headline?: string;
    description?: string;
}

export function VSLClientResults({ headline, description }: VSLClientResultsProps) {
    const stats = [
        { value: "$847", suffix: "M+", label: "Total Debt Resolved" },
        { value: "78", suffix: "%", label: "Avg. Debt Reduction" },
        { value: "21", suffix: "days", label: "Avg. Protection Time" },
        { value: "12", suffix: "K+", label: "Satisfied Clients" },
    ];

    return (
        <section className="w-full bg-[#050A14] py-24 md:py-32 border-t border-white/5">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-20">
                    <div>
                        <div className="font-mono text-[11px] font-bold text-emerald-500 tracking-[0.2em] uppercase mb-4">
                            Proven Performance
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-8">
                            {headline || "Real Clients. Real Reductions."}
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                            {description || "Every case is unique — but our track record speaks for itself. We've helped thousands of individuals and business owners achieve life-changing IRS resolutions."}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-xl"
                            >
                                <div className="text-3xl md:text-5xl font-black text-white font-mono tracking-tighter mb-2">
                                    {stat.value}<span className="text-emerald-500">{stat.suffix}</span>
                                </div>
                                <div className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest leading-tight">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Logo/Brand Marquee Overlay */}
                <div className="pt-12 border-t border-white/5">
                    <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                        <span className="font-mono text-sm font-bold text-white tracking-widest">CONSTRUCTION GROUP</span>
                        <span className="font-mono text-sm font-bold text-white tracking-widest">RESTAURANT ASSOC.</span>
                        <span className="font-mono text-sm font-bold text-white tracking-widest">REAL ESTATE HUB</span>
                        <span className="font-mono text-sm font-bold text-white tracking-widest">MEDICAL PARTNERS</span>
                        <span className="font-mono text-sm font-bold text-white tracking-widest">TECH SOLUTIONS</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

interface PainPoint {
    title: string;
    description: string;
}

interface VSLProblemStatementProps {
    headline?: string;
    painPoints?: PainPoint[];
    industry: "construction" | "restaurants" | "real-estate" | "tax-resolution";
}

export function VSLProblemStatement({ headline, painPoints, industry: _industry }: VSLProblemStatementProps) {
    const defaultPainPoints: PainPoint[] = [
        {
            title: "Wage Garnishments & Levies",
            description: "The IRS can seize up to 90% of your paycheck with zero warning."
        },
        {
            title: "Compounding Penalties",
            description: "Interest and fees grow by the day — making your balance harder to escape."
        },
        {
            title: "Intimidating Collection Calls",
            description: "Designed to pressure you into bad decisions without professional guidance."
        },
        {
            title: "Tax Liens on Property",
            description: "Outstanding debts can attach to your home, business, and assets."
        }
    ];

    const items = painPoints && painPoints.length > 0 ? painPoints : defaultPainPoints;

    return (
        <section className="w-full bg-[#050A14] py-24 md:py-32 overflow-hidden">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col"
                    >
                        <div className="font-mono text-[11px] font-bold text-emerald-500 tracking-[0.2em] uppercase mb-4">
                            The Real Problem
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-10 tracking-tight">
                            {headline || "The IRS Isn't On Your Side."}
                        </h2>

                        <div className="space-y-6">
                            {items.map((item, idx) => (
                                <div key={idx} className="flex gap-4 group">
                                    <div className="flex-shrink-0 mt-1">
                                        <XCircle className="w-5 h-5 text-red-500/80 group-hover:text-red-500 transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="block text-white font-bold text-lg mb-1 leading-none tracking-tight">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-400 text-[14px] leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Visual Stack */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative z-20 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
                            <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-4">
                                Client Case Study Breakdown
                            </div>

                            <div className="mb-8">
                                <div className="text-[11px] text-slate-400 uppercase tracking-widest mb-1">
                                    IRS Debt Before Resolution
                                </div>
                                <div className="text-4xl font-black text-red-500 font-mono tracking-tight">
                                    $184,500
                                </div>
                                <div className="text-[12px] text-red-500/60 mt-2 flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                                    +$2,300/mo in compounding penalties
                                </div>
                            </div>

                            <div className="h-px bg-white/5 w-full mb-8" />

                            <div>
                                <div className="text-[11px] text-slate-400 uppercase tracking-widest mb-1">
                                    Settled Debt After Negotiation
                                </div>
                                <div className="text-4xl font-black text-emerald-400 font-mono tracking-tight">
                                    $24,200
                                </div>
                                <div className="text-[13px] text-emerald-400 mt-3 font-semibold">
                                    87% Reduction · All Liens Removed
                                </div>
                            </div>
                        </div>

                        {/* Ghost Cards for Depth */}
                        <div className="absolute -top-4 -right-4 w-full h-full bg-white/5 rounded-2xl z-10 border border-white/5" />
                        <div className="absolute -top-8 -right-8 w-full h-full bg-white/5 rounded-2xl z-0 opacity-30 border border-white/5" />

                        {/* Glow Background */}
                        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-emerald-500/10 blur-[100px] pointer-events-none -z-10" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

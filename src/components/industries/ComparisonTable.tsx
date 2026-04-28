"use client";

import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Check, X, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonRow {
    feature: string;
    generic: string;
    architect: string;
    architectHighlight?: boolean;
}

interface ComparisonTableProps {
    title: string;
    subtitle: string;
    rows: ComparisonRow[];
}

export function ComparisonTable({
    title,
    subtitle,
    rows
}: ComparisonTableProps) {
    return (
        <section className="py-24 px-6 lg:px-8 bg-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold-500/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <RevealOnScroll className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-bold font-heading text-brand-950 tracking-tighter leading-tight mb-6">
                        {title}
                    </h2>
                    <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </RevealOnScroll>

                <div className="max-w-5xl mx-auto">
                    <RevealOnScroll>
                        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
                            <div className="grid grid-cols-12 bg-brand-950 text-white items-center">
                                <div className="col-span-4 p-8 lg:p-10 text-sm font-bold uppercase tracking-widest text-slate-400 border-r border-white/5">
                                    Capability
                                </div>
                                <div className="col-span-4 p-8 lg:p-10 text-sm font-bold uppercase tracking-widest text-slate-400 border-r border-white/5 text-center">
                                    Standard CPA
                                </div>
                                <div className="col-span-4 p-8 lg:p-10 text-sm font-black uppercase tracking-widest text-gold-500 flex items-center justify-center gap-2">
                                    <ShieldCheck size={18} />
                                    Wealth Architect
                                </div>
                            </div>

                            <div className="divide-y divide-slate-100">
                                {rows.map((row, i) => (
                                    <div key={i} className="grid grid-cols-12 items-center group hover:bg-slate-50/50 transition-colors">
                                        <div className="col-span-4 p-8 lg:px-10 font-bold text-brand-950 font-heading text-lg lg:text-xl border-r border-slate-100 italic">
                                            {row.feature}
                                        </div>
                                        <div className="col-span-4 p-8 lg:px-10 text-slate-400 font-light border-r border-slate-100 text-center">
                                            {row.generic}
                                        </div>
                                        <div className={cn(
                                            "col-span-4 p-8 lg:px-10 font-bold text-brand-900 bg-gold-500/[0.03] flex items-center justify-center gap-3",
                                            row.architectHighlight ? "text-gold-700" : ""
                                        )}>
                                            <div className="w-6 h-6 rounded-full bg-gold-500 text-brand-950 flex items-center justify-center shrink-0">
                                                <Check size={14} strokeWidth={4} />
                                            </div>
                                            <span className="text-center">{row.architect}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-slate-50 p-8 text-center">
                                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                                    Strategic Analysis Verified • 2026 Standards
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
}

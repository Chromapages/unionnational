"use client";

import { useState } from "react";
import { ArrowRight, TrendingDown, TrendingUp, Calculator } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const LOW_MARGIN = 0.05;
const HIGH_MARGIN = 0.18;

const fmt = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

export function MathSection() {
    const [revenue, setRevenue] = useState(750000);

    const deltaPerYear = revenue * (HIGH_MARGIN - LOW_MARGIN);
    const delta5Years = deltaPerYear * 5;
    const delta10Years = deltaPerYear * 10;

    return (
        <section className="py-20 lg:py-28 bg-white relative overflow-hidden border-y border-slate-200">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-500/5 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/3 pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <RevealOnScroll>
                    <div className="text-center mb-10">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 border border-rose-200/60 text-[10px] font-black uppercase tracking-[0.2em] text-rose-700 mb-5">
                            <Calculator className="w-3.5 h-3.5" />
                            The Cost of Inaction
                        </span>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-brand-900 tracking-tight leading-[1.05] uppercase">
                            The Math Most Contractors
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-rose-800 italic font-black pr-4">
                                Avoid
                            </span>
                        </h2>
                    </div>
                </RevealOnScroll>

                {/* Interactive Revenue Slider */}
                <RevealOnScroll delay={50}>
                    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 mb-10 max-w-2xl mx-auto text-center shadow-sm">
                        <label htmlFor="revenue-slider" className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                            Select Your Annual Revenue:
                        </label>
                        <div className="text-4xl font-black text-brand-900 font-heading mb-4 tabular-nums">
                            {fmt(revenue)}
                        </div>
                        <input
                            id="revenue-slider"
                            type="range"
                            min={250000}
                            max={10000000}
                            step={250000}
                            value={revenue}
                            onChange={(e) => setRevenue(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                        />
                        <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wider">
                            <span>$250K</span>
                            <span>$5M</span>
                            <span>$10M+</span>
                        </div>
                    </div>
                </RevealOnScroll>

                {/* Side-by-side comparison */}
                <RevealOnScroll delay={100}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8 mb-10">
                        {/* Low margin card */}
                        <div className="relative rounded-3xl border-2 border-slate-200 bg-slate-50 p-7 sm:p-9">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-11 h-11 rounded-xl bg-slate-200 flex items-center justify-center">
                                    <TrendingDown className="w-5 h-5 text-slate-600" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Industry Average</p>
                                    <p className="text-2xl font-black text-slate-700 font-heading">5% Net Margin</p>
                                </div>
                            </div>
                            <div className="space-y-3 border-t border-slate-200 pt-5">
                                <div className="flex justify-between items-baseline text-sm text-slate-600">
                                    <span>Annual revenue</span>
                                    <span className="font-bold tabular-nums">{fmt(revenue)}</span>
                                </div>
                                <div className="flex justify-between items-baseline text-sm text-slate-600">
                                    <span>× Margin</span>
                                    <span className="font-bold tabular-nums">5%</span>
                                </div>
                                <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline">
                                    <span className="text-slate-700 font-bold uppercase text-xs tracking-wider">You keep</span>
                                    <span className="text-3xl font-black text-slate-700 tabular-nums">{fmt(revenue * LOW_MARGIN)}</span>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed pt-1">
                                    /year — running the business the way most contractors do.
                                </p>
                            </div>
                        </div>

                        {/* High margin card */}
                        <div className="relative rounded-3xl border-2 border-gold-500 bg-gradient-to-br from-gold-500 to-gold-600 p-7 sm:p-9 shadow-2xl shadow-gold-500/20">
                            <div className="absolute -top-3 -right-3 px-3 py-1 bg-brand-900 text-gold-400 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                                Top Performers
                            </div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/70">With the Blueprint Systems</p>
                                    <p className="text-2xl font-black text-white font-heading">18% Net Margin</p>
                                </div>
                            </div>
                            <div className="space-y-3 border-t border-white/20 pt-5">
                                <div className="flex justify-between items-baseline text-sm text-white/90">
                                    <span>Annual revenue</span>
                                    <span className="font-bold tabular-nums">{fmt(revenue)}</span>
                                </div>
                                <div className="flex justify-between items-baseline text-sm text-white/90">
                                    <span>× Margin</span>
                                    <span className="font-bold tabular-nums">18%</span>
                                </div>
                                <div className="border-t border-white/20 pt-3 flex justify-between items-baseline">
                                    <span className="text-white font-bold uppercase text-xs tracking-wider">You keep</span>
                                    <span className="text-3xl font-black text-white tabular-nums">{fmt(revenue * HIGH_MARGIN)}</span>
                                </div>
                                <p className="text-xs text-white/80 leading-relaxed pt-1">
                                    /year — same revenue, with job costing, cash forecasting, and pricing discipline.
                                </p>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>

                {/* The Gap — center impact */}
                <RevealOnScroll delay={200}>
                    <div className="relative max-w-3xl mx-auto mb-10">
                        <div className="text-center">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-3">
                                The Gap — Per Year
                            </p>
                            <p className="text-6xl sm:text-7xl lg:text-8xl font-black text-brand-900 font-heading tracking-tight leading-none tabular-nums mb-3">
                                {fmt(deltaPerYear)}
                            </p>
                            <p className="text-base sm:text-lg text-slate-700 font-light leading-relaxed max-w-xl mx-auto">
                                The cost of running your business without the systems in this book. Every. Single. Year.
                            </p>
                        </div>
                    </div>
                </RevealOnScroll>

                {/* Compounding row */}
                <RevealOnScroll delay={300}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
                        <div className="text-center px-6 py-5 rounded-2xl bg-rose-50 border border-rose-200/60">
                            <p className="text-[10px] font-black uppercase tracking-widest text-rose-700 mb-1.5">Over 5 Years</p>
                            <p className="text-3xl sm:text-4xl font-black text-rose-700 font-heading tabular-nums">{fmt(delta5Years)}</p>
                        </div>
                        <div className="text-center px-6 py-5 rounded-2xl bg-rose-100/60 border border-rose-300/60">
                            <p className="text-[10px] font-black uppercase tracking-widest text-rose-800 mb-1.5">Over 10 Years</p>
                            <p className="text-3xl sm:text-4xl font-black text-rose-900 font-heading tabular-nums">{fmt(delta10Years)}</p>
                        </div>
                    </div>
                </RevealOnScroll>

                {/* Closing line */}
                <RevealOnScroll delay={400}>
                    <p className="text-base sm:text-lg text-slate-700 leading-relaxed text-center max-w-2xl mx-auto mb-10 font-light">
                        That&apos;s not revenue. That&apos;s <strong className="font-bold text-brand-900">profit you earned, generated, and lost</strong> — to jobs you shouldn&apos;t have taken, to estimates that were too low, to overhead that wasn&apos;t allocated, to cash flow timing that forced you to take the next job at any price.
                    </p>
                </RevealOnScroll>

                {/* CTA */}
                <RevealOnScroll delay={500}>
                    <div className="text-center">
                        <a
                            href="#book-sales"
                            className="inline-flex items-center gap-2 px-10 py-5 bg-gold-500 hover:bg-gold-600 text-white font-black uppercase tracking-wider text-sm sm:text-base rounded-full transition-colors shadow-lg shadow-gold-500/30"
                        >
                            See How to Close the Gap
                            <ArrowRight size={18} />
                        </a>
                        <p className="mt-4 text-xs text-slate-500 uppercase tracking-wider font-bold">
                            The Blueprint · $27 Digital or $39 Print
                        </p>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}

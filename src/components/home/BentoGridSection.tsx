"use client";

import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { User, Landmark, ArrowUp, TrendingUp, Shield, BarChart2 } from "lucide-react";

export function BentoGridSection() {
    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-100/40 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <RevealOnScroll className="text-center mb-16">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600 font-heading">
                        Why Choose Us
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 tracking-tight text-brand-900 font-heading">
                        Institutional Grade <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-700">
                            Tax Strategy.
                        </span>
                    </h2>
                </RevealOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-6 gap-6 grid-rows-[auto_auto]">

                    {/* Card 1: Tax Savings (Large) */}
                    <RevealOnScroll className="md:col-span-4 rounded-3xl p-8 md:p-10 bg-gradient-to-br from-brand-900 to-brand-950 border border-white/10 hover:border-gold-500/30 transition-all duration-300 group relative overflow-hidden min-h-[320px] flex flex-col justify-between">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <TrendingUp className="w-32 h-32 text-gold-500" />
                        </div>

                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-bold uppercase tracking-wider mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse"></span>
                                Client Impact
                            </div>
                            <h3 className="text-2xl font-medium text-white max-w-xs font-heading">
                                Generating wealth through strategic tax reduction.
                            </h3>
                        </div>

                        <div className="mt-8">
                            <div className="text-6xl md:text-7xl font-bold text-white tracking-tight font-heading group-hover:scale-105 transition-transform origin-left">
                                $2M<span className="text-gold-500">+</span>
                            </div>
                            <p className="text-slate-400 font-medium mt-2 font-sans">Annual tax savings generated for our clients</p>
                        </div>
                    </RevealOnScroll>

                    {/* Card 2: Lead Expert (Portrait) */}
                    <RevealOnScroll delay={100} className="md:col-span-2 rounded-3xl p-8 bg-brand-900 border border-white/10 hover:border-gold-500/30 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden min-h-[320px]">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-950/90 z-10"></div>

                        {/* Abstract Portrait Illustration or Icon */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gold-500/5 rounded-full blur-3xl group-hover:bg-gold-500/10 transition-colors"></div>

                        <div className="relative z-20">
                            <span className="inline-block px-3 py-1 rounded-full bg-white/5 text-white/80 text-[10px] font-bold uppercase tracking-widest mb-6 border border-white/10">
                                Principal
                            </span>
                        </div>

                        <div className="relative z-20">
                            <h3 className="text-2xl font-bold text-white mb-1 font-heading">Jason Astwood</h3>
                            <div className="text-gold-500 font-bold text-xs tracking-wider mb-4 font-sans">EA, MBA, FSCP, LUTCF</div>

                            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-sans italic border-l-2 border-gold-500/50 pl-4">
                                "We look for every legal opportunity to build your wealth."
                            </p>

                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gold-500 text-brand-900 flex items-center justify-center font-bold text-xs">JA</div>
                                <div className="text-xs text-slate-500 font-sans">Union National Tax</div>
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* Card 3: Enrolled Agent Info (Wide) */}
                    <RevealOnScroll delay={200} className="md:col-span-3 rounded-3xl p-8 md:p-10 bg-white text-brand-900 border border-slate-200 hover:shadow-xl hover:border-gold-500/30 transition-all duration-300 md:min-h-[300px] flex flex-col justify-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-110"></div>

                        <div className="flex items-center gap-2 mb-4">
                            <Shield className="w-5 h-5 text-gold-600" />
                            <span className="text-xs font-bold text-gold-600 uppercase tracking-widest font-sans">Highest Credential</span>
                        </div>

                        <h3 className="text-2xl lg:text-3xl font-bold mb-4 font-heading">
                            What is an <span className="text-gold-600">Enrolled Agent?</span>
                        </h3>

                        <p className="text-slate-600 leading-relaxed mb-6 font-sans max-w-md">
                            Federally licensed tax specialists with <strong>unlimited rights</strong> to represent you before the IRS.
                        </p>

                        <div className="flex gap-4">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-bold text-slate-700">
                                <Landmark className="w-3.5 h-3.5 text-slate-500" />
                                Federal License
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-bold text-slate-700">
                                <ArrowUp className="w-3.5 h-3.5 text-slate-500" />
                                All 50 States
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* Card 4: Specialized Expertise */}
                    <RevealOnScroll delay={300} className="md:col-span-3 rounded-3xl p-8 md:p-10 bg-brand-900 border border-white/10 hover:border-gold-500/30 hover:bg-brand-800 transition-all duration-300 relative overflow-hidden group min-h-[300px]">
                        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10"></div>

                        {/* Micro-visualization: Bar Chart */}
                        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-10 group-hover:opacity-20 transition-opacity">
                            <div className="flex items-end gap-2 h-full p-6">
                                <div className="w-1/4 h-[40%] bg-gold-500 rounded-t"></div>
                                <div className="w-1/4 h-[60%] bg-gold-500 rounded-t"></div>
                                <div className="w-1/4 h-[80%] bg-gold-500 rounded-t"></div>
                                <div className="w-1/4 h-[100%] bg-gold-500 rounded-t"></div>
                            </div>
                        </div>

                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-gold-500">
                                <BarChart2 className="w-6 h-6" />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4 font-heading">
                                Specialized <br /><span className="text-gold-500">Industry Focus</span>
                            </h3>

                            <p className="text-slate-400 leading-relaxed max-w-sm text-sm font-sans mb-6">
                                Unlike generalist CPAs, we specialize in tax code and ethics for specific high-growth industries like Construction, Real Estate, and Food Service.
                            </p>

                            <div className="text-gold-500 font-bold text-sm flex items-center gap-2 font-heading tracking-wide group-hover:translate-x-1 transition-transform">
                                Explore Industries <ArrowUp className="w-3.5 h-3.5 rotate-45" />
                            </div>
                        </div>
                    </RevealOnScroll>

                </div>
            </div>
        </section>
    );
}

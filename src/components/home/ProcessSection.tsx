"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ScanSearch, BookOpen, TrendingUp, ArrowRight } from "lucide-react";

export function ProcessSection() {
    return (
        <section className="py-24 mb-0 relative overflow-hidden" style={{ backgroundColor: "#00527b" }}>
            {/* Background Gradients */}
            <div
                className="absolute rounded-full blur-[120px] pointer-events-none"
                style={{
                    top: 0,
                    left: 0,
                    width: '40rem',
                    height: '40rem',
                    backgroundColor: 'var(--color-brand-red)',
                    opacity: 0.08,
                    transform: 'translate(-50%, -50%)'
                }}
            />
            <div
                className="absolute rounded-full blur-[100px] pointer-events-none"
                style={{
                    bottom: 0,
                    right: 0,
                    width: '30rem',
                    height: '30rem',
                    backgroundColor: 'var(--color-brand-red)',
                    opacity: 0.05,
                    transform: 'translate(30%, 30%)'
                }}
            />

            <div style={{ maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
                <RevealOnScroll className="mb-24 text-center max-w-3xl mx-auto">
                    <span className="text-xs font-semibold uppercase tracking-widest mb-3 block text-blue-200">Our Process</span>
                    <h2 className="text-3xl lg:text-5xl font-semibold text-white tracking-tight leading-tight mb-6">
                        The Road to <span className="text-white">Tax Clarity.</span>
                    </h2>
                    <p className="text-blue-100 text-lg">
                        A simplified, transparent journey to financial optimization. We handle the complexity so you can focus on growth.
                    </p>
                </RevealOnScroll>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="absolute top-6 left-[16%] right-[16%] h-0.5 bg-white/10 hidden md:block" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {/* Step 1 */}
                        <RevealOnScroll className="relative group flex flex-col items-center">
                            {/* Stepper Dot */}
                            <div className="w-12 h-12 rounded-full bg-white border-4 border-brand-primary flex items-center justify-center relative z-10 mb-8 shadow-lg">
                                <span className="text-brand-primary font-bold text-sm">1</span>
                            </div>

                            {/* Card */}
                            <div className="w-full bg-white rounded-2xl p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group-hover:shadow-brand-red/10">
                                <div className="mb-6 inline-flex p-3 rounded-lg bg-brand-light-red/30 text-brand-red">
                                    <ScanSearch className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-black mb-4 group-hover:text-brand-primary transition-colors">
                                    Discovery & Analysis
                                </h3>
                                <p className="text-brand-900 leading-relaxed mb-6 text-sm">
                                    We deep-dive into your prior returns and current financials to identify immediate tax leakage and missed opportunities.
                                </p>
                                <div className="flex items-center text-sm font-semibold text-brand-red group-hover:gap-2 transition-all">
                                    Start Audit <ArrowRight className="w-4 h-4 ml-1" />
                                </div>
                            </div>
                        </RevealOnScroll>

                        {/* Step 2 */}
                        <RevealOnScroll delay={100} className="relative group flex flex-col items-center">
                            {/* Stepper Dot */}
                            <div className="w-12 h-12 rounded-full bg-white border-4 border-brand-primary flex items-center justify-center relative z-10 mb-8 shadow-lg">
                                <span className="text-brand-primary font-bold text-sm">2</span>
                            </div>

                            {/* Card */}
                            <div className="w-full bg-white rounded-2xl p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group-hover:shadow-brand-red/10">
                                <div className="mb-6 inline-flex p-3 rounded-lg bg-brand-light-red/30 text-brand-red">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-black mb-4 group-hover:text-brand-primary transition-colors">
                                    The S-Corp Playbook
                                </h3>
                                <p className="text-brand-900 leading-relaxed mb-6 text-sm">
                                    We implement the election, set up your payroll system, and establish a reasonable compensation strategy that IRS respects.
                                </p>
                                <div className="flex items-center text-sm font-semibold text-brand-red group-hover:gap-2 transition-all">
                                    Implementation <ArrowRight className="w-4 h-4 ml-1" />
                                </div>
                            </div>
                        </RevealOnScroll>

                        {/* Step 3 */}
                        <RevealOnScroll delay={200} className="relative group flex flex-col items-center">
                            {/* Stepper Dot */}
                            <div className="w-12 h-12 rounded-full bg-white border-4 border-brand-primary flex items-center justify-center relative z-10 mb-8 shadow-lg">
                                <span className="text-brand-primary font-bold text-sm">3</span>
                            </div>

                            {/* Card */}
                            <div className="w-full bg-white rounded-2xl p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group-hover:shadow-brand-red/10">
                                <div className="mb-6 inline-flex p-3 rounded-lg bg-brand-light-red/30 text-brand-red">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-black mb-4 group-hover:text-brand-primary transition-colors">
                                    Quarterly Strategy
                                </h3>
                                <p className="text-brand-900 leading-relaxed mb-6 text-sm">
                                    No year-end surprises. We meet quarterly to adjust estimates, review profit margins, and pivot strategies as you grow.
                                </p>
                                <div className="flex items-center text-sm font-semibold text-brand-red group-hover:gap-2 transition-all">
                                    Growth Planning <ArrowRight className="w-4 h-4 ml-1" />
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </div>
        </section>
    );
}

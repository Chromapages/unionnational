"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ArrowRight, FileText, Briefcase, Check } from "lucide-react";

export function PricingPreview() {
    return (
        <section
            id="pricing"
            className="mb-0 py-16 sm:py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
            <RevealOnScroll className="text-center mb-16">
                <span className="text-xs font-semibold uppercase tracking-widest text-gold-600 font-sans">Engagement Models</span>
                <h2 className="text-3xl lg:text-4xl font-bold mt-3 text-brand-900 tracking-tight font-heading">How We Can Work Together</h2>
            </RevealOnScroll>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Compliance Plan */}
                <RevealOnScroll
                    className="rounded-md p-8 sm:p-10 lg:p-12 flex flex-col relative group transition-all duration-300 hover:shadow-xl overflow-hidden bg-slate-50 border border-slate-200"
                >
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                <FileText className="w-7 h-7 text-brand-500" />
                            </div>
                        </div>

                        <h3 className="text-3xl font-semibold mb-4 text-brand-900 font-heading">Tax Compliance</h3>
                        <p className="text-brand-900 mb-8 max-w-sm font-sans">
                            Perfect for small businesses needing accurate, worry-free tax preparation and filings.
                        </p>

                        <div className="space-y-4 mb-12 flex-grow">
                            {[
                                "Annual Tax Returns (Bus & Person)",
                                "Quarterly Estimate Calculations",
                                "Basic IRS/State Correspondence"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-brand-900/60" />
                                    <span className="text-sm font-medium text-slate-600 font-sans">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto flex items-center justify-between">
                            <span className="text-sm font-bold text-brand-500 uppercase tracking-wider font-sans">Foundation Plan</span>
                            <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 bg-white border border-slate-200 text-brand-500 group-hover:bg-brand-500 group-hover:border-brand-500 group-hover:scale-110 shadow-sm">
                                <ArrowRight className="w-5 h-5 transition-colors duration-300 group-hover:text-white" />
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>

                {/* Fractional CFO Plan */}
                <RevealOnScroll
                    delay={100}
                    className="rounded-md p-8 sm:p-10 lg:p-12 flex flex-col relative group transition-all duration-300 hover:shadow-xl overflow-hidden bg-brand-500"
                >
                    {/* Visual Flourish */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500 rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-500 rounded-full blur-[120px] opacity-20 translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                <Briefcase className="w-7 h-7 text-white" />
                            </div>
                            <div className="bg-gold-500 text-brand-900 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg font-sans">
                                Most Popular
                            </div>
                        </div>

                        <h3 className="text-3xl font-semibold text-white mb-4 font-heading">Fractional CFO</h3>
                        <p className="text-brand-900/60 mb-8 max-w-sm font-sans">
                            Full-service strategic financial leadership to maximize cash flow and minimize tax liability.
                        </p>

                        <div className="space-y-4 mb-12 flex-grow">
                            {[
                                "Proactive Tax Planning Strategies",
                                "Monthly Bookkeeping & Reporting",
                                "Unlimited Strategic Consulting"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-gold-500" />
                                    <span className="text-sm font-medium text-slate-300 font-sans">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto flex items-center justify-between">
                            <span className="text-sm font-bold text-gold-100 uppercase tracking-wider font-sans">Strategic Plan</span>
                            <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 bg-gold-500 text-brand-900 shadow-lg group-hover:scale-110 group-hover:shadow-xl group-hover:rotate-45">
                                <ArrowRight className="w-5 h-5 transition-all duration-300 group-hover:rotate-[-45deg]" />
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}

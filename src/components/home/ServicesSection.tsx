"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { FileCheck, Building2, BarChart3, LineChart, Notebook, Rocket, ArrowRight } from "lucide-react";

export function ServicesSection() {
    return (
        <section
            id="services"
            className="mb-0 py-16 sm:py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
            <RevealOnScroll
                className="rounded-md shadow-sm bg-white border border-slate-200 p-6 sm:p-8 lg:p-10"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-16 sm:mb-20 pb-8 sm:pb-12 border-b border-slate-100">
                    <div>
                        <div className="text-xs font-semibold uppercase tracking-widest mb-4 text-gold-600 font-sans">Our Expertise</div>
                        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-brand-900 font-heading">Comprehensive Financial Solutions.</h2>
                    </div>
                    <div className="flex items-end">
                        <p className="text-brand-900 leading-relaxed font-sans max-w-md">
                            Design a financial operating system that works for your business. From basic compliance to strategic growth tools.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Service 1: Strategic Bookkeeping */}
                    <div className="group bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 hover:-translate-y-1 hover:shadow-lg hover:border-gold-500/30 transition-all duration-300 cursor-pointer">
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center mb-6 bg-gold-50 text-gold-600"
                        >
                            <Notebook className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-brand-900 font-heading">Strategic Bookkeeping</h3>
                        <p className="text-sm text-brand-900 leading-relaxed mb-6 font-sans">
                            Focuses on maintaining detailed, accurate records to support cash flow, compliance, and smart decision-making. stay on top of your finances.
                        </p>
                        <div className="flex items-center gap-2 text-sm font-medium text-brand-500 group-hover:gap-3 transition-all font-sans">
                            Learn More <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>

                    {/* Service 2: Fractional CFO */}
                    <div className="group bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 hover:-translate-y-1 hover:shadow-lg hover:border-gold-500/30 transition-all duration-300 cursor-pointer">
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center mb-6 bg-gold-50 text-gold-600"
                        >
                            <BarChart3 className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-brand-900 font-heading">Fractional CFO Services</h3>
                        <p className="text-sm text-brand-900 leading-relaxed mb-6 font-sans">
                            High-level financial leadership (cash flow, strategy, growth) without the cost of a full-time executive.
                        </p>
                        <div className="flex items-center gap-2 text-sm font-medium text-brand-500 group-hover:gap-3 transition-all font-sans">
                            Learn More <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>

                    {/* Service 3: S-Corp Tax Advantage */}
                    <div className="group bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 hover:-translate-y-1 hover:shadow-lg hover:border-gold-500/30 transition-all duration-300 cursor-pointer">
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center mb-6 bg-gold-50 text-gold-600"
                        >
                            <Building2 className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-brand-900 font-heading">S-Corp Tax Advantage</h3>
                        <p className="text-sm text-brand-900 leading-relaxed mb-6 font-sans">
                            Expert guidance tailored to maximizing S-Corp tax savings while ensuring compliance. Maximize your S-Corp tax savings.
                        </p>
                        <div className="flex items-center gap-2 text-sm font-medium text-brand-500 group-hover:gap-3 transition-all font-sans">
                            Learn More <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>

                    {/* Service 4: Tax Planning Consulting */}
                    <div className="group bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 hover:-translate-y-1 hover:shadow-lg hover:border-gold-500/30 transition-all duration-300 cursor-pointer">
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center mb-6 bg-gold-50 text-gold-600"
                        >
                            <LineChart className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-brand-900 font-heading">Tax Planning Consulting</h3>
                        <p className="text-sm text-brand-900 leading-relaxed mb-6 font-sans">
                            Personalized strategies built on up-to-date tax law insights to minimize taxes and boost savings.
                        </p>
                        <div className="flex items-center gap-2 text-sm font-medium text-brand-500 group-hover:gap-3 transition-all font-sans">
                            Learn More <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>

                    {/* Service 5: Tax Filing & Preparation */}
                    <div className="group bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 hover:-translate-y-1 hover:shadow-lg hover:border-gold-500/30 transition-all duration-300 cursor-pointer">
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center mb-6 bg-gold-50 text-gold-600"
                        >
                            <FileCheck className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-brand-900 font-heading">Tax Filing & Preparation</h3>
                        <p className="text-sm text-brand-900 leading-relaxed mb-6 font-sans">
                            End-to-end tax handling that is accurate, compliant, and optimized to reduce liability. Optimized to reduce what you owe.
                        </p>
                        <div className="flex items-center gap-2 text-sm font-medium text-brand-500 group-hover:gap-3 transition-all font-sans">
                            Learn More <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>

                    {/* Service 6: New Business Formation */}
                    <div className="group bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 hover:-translate-y-1 hover:shadow-lg hover:border-gold-500/30 transition-all duration-300 cursor-pointer">
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center mb-6 bg-gold-50 text-gold-600"
                        >
                            <Rocket className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-brand-900 font-heading">New Business Formation</h3>
                        <p className="text-sm text-brand-900 leading-relaxed mb-6 font-sans">
                            Guidance on smart entity choices to protect assets and maximize tax benefits from day one. Start your business the right way.
                        </p>
                        <div className="flex items-center gap-2 text-sm font-medium text-brand-500 group-hover:gap-3 transition-all font-sans">
                            Learn More <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </RevealOnScroll>
        </section>
    );
}

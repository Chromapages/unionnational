"use client";

import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { User, Landmark, ArrowUp } from "lucide-react";

export function BentoGridSection() {
    return (
        <section
            className="mb-0 py-16 sm:py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
            <RevealOnScroll className="text-center mb-16">
                <span className="text-xs font-semibold uppercase tracking-widest text-gold-600 font-sans">Why Us</span>
                <h2 className="text-3xl lg:text-4xl font-bold mt-4 tracking-tight text-brand-900 font-heading">Why Contractors & E-Com Choose Us</h2>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Stat Card with Background Image */}
                <RevealOnScroll
                    className="rounded-md p-6 sm:p-8 md:p-10 flex flex-col justify-end hover:shadow-xl transition-all duration-300 group cursor-default relative overflow-hidden min-h-[280px]"
                >
                    {/* Background Image */}
                    <Image
                        src="/images/stat-bg.png"
                        alt="Tax Savings Background"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/50 to-transparent" />

                    {/* Content */}
                    <div className="relative z-10">
                        <div className="text-6xl font-bold mb-4 tracking-tighter group-hover:scale-105 transition-transform origin-left text-white font-sans">$2M+</div>
                        <p className="text-lg font-medium text-white font-sans" style={{ maxWidth: '220px' }}>Tax savings generated for our clients annually</p>
                    </div>
                </RevealOnScroll>

                {/* Credentials Card */}
                <RevealOnScroll
                    delay={100}
                    className="rounded-md p-6 sm:p-8 md:p-10 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group bg-brand-500"
                    style={{ minHeight: '300px' }}
                >
                    <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-semibold uppercase tracking-widest mb-6 border border-white/10 font-sans">
                            Lead Expert
                        </span>
                        <h3 className="text-2xl font-semibold text-white mb-2 font-heading">Jason Astwood</h3>
                        <div className="text-gold-400 font-semibold text-sm mb-6 font-sans">EA, MBA, FSCP, LUTCF</div>
                    </div>

                    <div>
                        <p className="text-slate-300 text-sm leading-relaxed mb-4 font-sans">
                            "We don't just file taxes. We look for every legal opportunity to build your wealth."
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white text-brand-500 flex items-center justify-center font-bold text-sm">JA</div>
                            <div className="text-xs text-slate-300 font-sans">Principal</div>
                        </div>
                    </div>
                </RevealOnScroll>

                {/* Enrolled Agent Education Card (Full Width) */}
                <RevealOnScroll
                    delay={200}
                    className="md:col-span-2 rounded-md p-6 sm:p-8 md:p-10 flex flex-col md:flex-row gap-8 md:gap-10 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 -z-10"></div>

                    <div className="md:w-1/2 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-4">
                            <User className="w-5 h-5 text-gold-600" />
                            <span className="text-xs font-bold text-brand-500 uppercase tracking-widest font-sans">Highest IRS Credential</span>
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-medium mb-4 text-brand-900 font-heading">
                            What is an <span className="text-gold-600">Enrolled Agent?</span>
                        </h3>
                        <p className="text-brand-900 leading-relaxed mb-6 font-sans">
                            An Enrolled Agent (EA) is the <strong className="font-bold text-brand-900 font-heading">highest credential awarded by the IRS</strong>. Unlike typical CPAs who may specialize in audits or general accounting, EAs are federally licensed tax specialists with <strong className="font-bold text-brand-900 font-heading">unlimited practice rights</strong>.
                        </p>
                        <p className="text-brand-900 leading-relaxed text-sm font-sans">
                            This means we can represent you before the IRS in all 50 states, handling everything from filings to audits and appeals.
                        </p>
                    </div>

                    <div className="md:w-1/2 flex items-center justify-center">
                        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                            <div className="p-4 rounded-md bg-[#F8F9FA] border border-slate-100 flex flex-col items-center text-center">
                                <div className="w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center mb-3">
                                    <Landmark className="w-5 h-5" />
                                </div>
                                <div className="text-xs font-semibold text-brand-500 mb-1 font-sans">Federal License</div>
                                <div className="text-[10px] text-brand-900 font-sans">Valid in all 50 States</div>
                            </div>
                            <div className="p-4 rounded-md bg-[#F8F9FA] border border-slate-100 flex flex-col items-center text-center">
                                <div className="w-10 h-10 rounded-full bg-gold-500 text-white flex items-center justify-center mb-3">
                                    <ArrowUp className="w-5 h-5" />
                                </div>
                                <div className="text-xs font-semibold text-brand-500 mb-1 font-sans">IRS Representation</div>
                                <div className="text-[10px] text-brand-900 font-sans">Unlimited Rights</div>
                            </div>
                            <div className="col-span-2 p-4 rounded-md bg-gold-50 border border-gold-100 flex flex-col items-center text-center">
                                <div className="text-xs font-bold text-gold-700 uppercase tracking-wide mb-2 font-sans">Specialized Expertise</div>
                                <div className="text-[10px] text-brand-900 leading-relaxed max-w-[200px] font-sans">
                                    Focus exclusively on tax code, ethics, and representation.
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}

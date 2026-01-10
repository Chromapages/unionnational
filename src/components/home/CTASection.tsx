"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function CTASection() {
    return (
        <section id="contact" className="max-w-7xl mx-auto px-6 mb-20">
            <RevealOnScroll className="rounded-md p-8 lg:p-12 relative overflow-hidden min-h-[320px] flex items-center">
                {/* Background Image */}
                <Image
                    src="/images/ctasection.jpg"
                    alt="CTA Background"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Softer Overlay to let background show */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-900/90 via-brand-900/70 to-brand-900/30"></div>

                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500 opacity-20 rounded-full blur-[100px] pointer-events-none"></div>

                {/* Solid White Card */}
                <div className="relative z-10 bg-white border border-slate-200 rounded-md p-10 shadow-2xl max-w-3xl">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                        <div className="max-w-lg text-center lg:text-left">
                            <span className="text-gold-600 text-xs font-bold uppercase tracking-widest mb-4 block font-heading">Take Action</span>
                            <h2 className="text-3xl lg:text-4xl font-bold text-brand-900 tracking-tight mb-5 font-heading">
                                Stop guessing with your taxes.
                            </h2>
                            <p className="text-brand-900 text-sm leading-relaxed mb-0 font-sans">
                                Book a strategy call with Jason Astwood today. We'll identify your potential savings in the first 15 minutes.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto shrink-0">
                            <Link href="/contact" className="w-full sm:w-auto bg-gold-500 text-brand-900 px-8 py-3.5 rounded-md text-sm font-bold hover:bg-gold-600 transition-colors shadow-sm text-center whitespace-nowrap font-heading tracking-wide">
                                Contact Us
                            </Link>
                            <button className="w-full sm:w-auto bg-white border border-slate-200 text-brand-900 px-8 py-3.5 rounded-md text-sm font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 group whitespace-nowrap font-heading tracking-wide shadow-sm">
                                S-Corp Playbook
                                <ArrowUpRight className="w-4 h-4 text-gold-500 group-hover:text-gold-600 transition-colors" />
                            </button>
                        </div>
                    </div>
                </div>
            </RevealOnScroll>
        </section>
    );
}

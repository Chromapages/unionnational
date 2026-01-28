"use client";

import { ShieldCheck, Zap, Award } from "lucide-react";

interface ShopHeroProps {
    title: string;
    subtitle: string;
}

export function ShopHero({ title, subtitle }: ShopHeroProps) {
    return (
        <section className="relative bg-slate-50 py-24 overflow-hidden border-b border-slate-200">
            {/* Abstract Background Gradient - Light Mode */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white via-slate-50 to-slate-100 opacity-80" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />

            {/* Geometric Accent */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-brand-200/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-gold-600 text-[10px] font-bold uppercase tracking-widest mb-6 shadow-sm">
                    Resource Center
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-900 tracking-tight mb-6 font-heading">
                    {title}
                </h1>

                <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10 font-sans">
                    {subtitle}
                </p>

                {/* Trust Badges - Minimal Row */}
                <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <div className="flex items-center gap-2">
                        <div className="bg-green-100 p-1 rounded-full">
                            <ShieldCheck className="w-3.5 h-3.5 text-green-700" />
                        </div>
                        Secure Checkout
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="bg-gold-100 p-1 rounded-full">
                            <Zap className="w-3.5 h-3.5 text-gold-700" />
                        </div>
                        Instant Access
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="bg-brand-100 p-1 rounded-full">
                            <Award className="w-3.5 h-3.5 text-brand-700" />
                        </div>
                        Expert Verified
                    </div>
                </div>
            </div>
        </section>
    );
}

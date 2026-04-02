"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";
import React from "react";

interface RevenueTier {
    range: string;
    savings: string;
    deductions: string;
}

interface RevenueTierGridProps {
    title: string;
    subtitle?: string;
    tiers: RevenueTier[];
    className?: string;
}

export const RevenueTierGrid = ({
    title,
    subtitle,
    tiers,
    className,
}: RevenueTierGridProps) => {
    return (
        <section className={cn("py-24 px-6 bg-brand-900 overflow-hidden", className)}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 px-4">
                    <RevealOnScroll>
                        <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tighter mb-6">
                            {title}
                        </h2>
                    </RevealOnScroll>
                    {subtitle && (
                        <RevealOnScroll>
                            <p className="text-lg text-brand-100/60 max-w-2xl mx-auto">
                                {subtitle}
                            </p>
                        </RevealOnScroll>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                    {tiers.map((tier, i) => (
                        <RevealOnScroll key={i} delay={i * 100} className="group relative">
                            {/* Glass Card with 3D Tilt and Shine */}
                            <div className={cn(
                                "relative overflow-hidden h-full rounded-[2.5rem] p-12 transition-all duration-700",
                                "glass-premium border-white/5",
                                "group-hover:-translate-y-6 group-hover:shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.15)]",
                                "group-hover:border-gold-500/40",
                                "perspective-[2500px]"
                            )}>
                                <div className="relative z-10 transition-transform duration-700 group-hover:rotate-x-[4deg]">
                                    <div className="flex items-center justify-between mb-12">
                                        <span className="inline-block text-[11px] font-black uppercase tracking-[0.3em] text-gold-400 bg-white/5 px-4 py-2 rounded-full border border-white/10 group-hover:border-gold-500/20 transition-colors">
                                            {tier.range}
                                        </span>
                                        {/* Dynamic Tier Indicator */}
                                        <div className="flex gap-1">
                                            {[...Array(3)].map((_, idx) => (
                                                <div 
                                                    key={idx} 
                                                    className={cn(
                                                        "w-1.5 h-1.5 rounded-full transition-all duration-700",
                                                        idx <= i ? "bg-gold-500 shadow-[0_0_8px_rgba(212,175,55,0.6)]" : "bg-white/10"
                                                    )} 
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="mb-10">
                                        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-2">Estimated Annual Savings</div>
                                        <h3 className="text-5xl lg:text-6xl font-display font-black text-white tracking-[-0.03em] leading-none group-hover:text-gold-100 transition-colors">
                                            {tier.savings}
                                        </h3>
                                    </div>
                                    
                                    <div className="space-y-6 pt-10 border-t border-white/5">
                                        <p className="text-brand-100/60 text-base lg:text-lg font-light leading-relaxed font-body">
                                            {tier.deductions}
                                        </p>
                                        <div className="flex items-center gap-3 text-[10px] font-black text-gold-500/40 uppercase tracking-[0.2em] group-hover:text-gold-500/80 transition-colors">
                                            <div className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
                                            Active Strategy Review
                                        </div>
                                    </div>
                                </div>

                                {/* Dynamic Background Glow */}
                                <div className="absolute -top-32 -right-32 w-80 h-80 bg-gold-500/10 rounded-full blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                
                                {/* Bottom Accent Line */}
                                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-center" />
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
                
                {/* Decorative Elements */}
                <div 
                    className="absolute inset-0 pointer-events-none opacity-[0.02]"
                    style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}
                />
            </div>
        </section>
    );
};

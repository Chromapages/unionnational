"use client";

import { motion } from "framer-motion";
import { Plane, ArrowRight, Gauge, ShieldCheck, Map } from "lucide-react";
import Link from "next/link";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface LuxuryTravelIncentiveProps {
    revenueThreshold?: string;
    title?: string;
    description?: string;
    className?: string;
}

export const LuxuryTravelIncentive = ({
    revenueThreshold = "$500K - $1M+",
    title = "The Executive Retreat Incentive",
    description = "Move beyond simple tax savings. High-revenue partners unlock exclusive access to our annual luxury networking retreats and private wealth summits.",
    className = ""
}: LuxuryTravelIncentiveProps) => {
    return (
        <RevealOnScroll className={`w-full ${className}`}>
            <div className="relative group overflow-hidden rounded-[2rem] border border-gold-500/30 bg-brand-950 p-1 md:p-1.5 shadow-2xl transition-all duration-500 hover:shadow-gold-500/20">
                {/* Glossy Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                {/* Main Content Container */}
                <div className="relative bg-brand-950 rounded-[1.8rem] px-8 py-10 md:px-12 md:py-14 border border-white/5 overflow-hidden">

                    {/* Background Decorative Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gold-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-gold-600/20 transition-colors duration-700" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-400/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10 flex flex-col items-center text-center">
                        {/* Elite Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500 text-xs font-bold uppercase tracking-[0.2em] mb-8 backdrop-blur-md"
                        >
                            <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
                            Qualified Revenue: {revenueThreshold}
                        </motion.div>

                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-8 font-heading leading-tight">
                            {title}
                        </h2>

                        <p className="text-lg md:text-xl text-slate-300/80 leading-relaxed mb-12 max-w-2xl mx-auto font-sans">
                            {description}
                        </p>

                        {/* Interactive Feature Hooks */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 w-full max-w-3xl">
                            {[
                                { icon: Plane, label: "Private Retreats" },
                                { icon: Gauge, label: "Wealth Strategy" },
                                { icon: ShieldCheck, label: "Asset Protection" }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-gold-500/30 transition-colors group/item">
                                    <item.icon className="w-6 h-6 text-gold-500 group-hover/item:scale-110 transition-transform" />
                                    <span className="text-sm font-bold text-white/70 tracking-wide uppercase font-sans">{item.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Primary Action */}
                        <div className="flex flex-col items-center gap-6">
                            <Link
                                href="/contact?type=high-revenue"
                                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gold-500 text-brand-950 font-black text-xl rounded-2xl transition-all duration-300 hover:bg-gold-400 hover:scale-[1.03] active:scale-[0.98] shadow-[0_0_30px_rgba(212,174,55,0.4)] hover:shadow-[0_0_50px_rgba(212,174,55,0.6)] font-heading tracking-tight"
                            >
                                Apply for Partner Status
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <p className="text-slate-500 text-sm font-sans flex items-center gap-2">
                                <Map className="w-4 h-4" />
                                Limited to 12 new executive partners in {new Date().getFullYear()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </RevealOnScroll>
    );
};

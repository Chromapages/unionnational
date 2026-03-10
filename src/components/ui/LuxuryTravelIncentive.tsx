"use client";

import { motion } from "framer-motion";
import { Plane, ArrowRight, Gauge, ShieldCheck, Map, Sparkles } from "lucide-react";
import Link from "next/link";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { useTranslations } from "next-intl";

interface LuxuryTravelIncentiveProps {
    className?: string;
    revenueThreshold?: string;
    title?: string;
    description?: string;
}

export const LuxuryTravelIncentive = ({
    className = "",
    revenueThreshold,
    title,
    description
}: LuxuryTravelIncentiveProps) => {
    const t = useTranslations("ServicesPage.ExecutiveIncentive");
    const currentYear = new Date().getFullYear();

    const features = [
        { icon: Plane, label: t("features.privateRetreats") },
        { icon: Gauge, label: t("features.wealthStrategy") },
        { icon: ShieldCheck, label: t("features.assetProtection") }
    ];

    // Use props if provided, otherwise fallback to translations
    const displayThreshold = revenueThreshold || t("badge", { threshold: "$500K - $1M+" });
    const displayTitle = title || t("title");
    const displayDescription = description || t("description");

    return (
        <div className={`w-full relative bg-brand-900 border-y border-white/5 overflow-hidden py-12 lg:py-0 ${className}`}>
            {/* Main Container - Full Width */}
            <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[450px] lg:min-h-[600px]">

                {/* Left Column - Content */}
                <div className="p-8 md:p-16 lg:p-24 xl:p-32 flex flex-col justify-center relative z-20">
                    <RevealOnScroll>
                        {/* Eyebrow Badge - Following Design System */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 border border-gold-500/30 rounded-md w-fit mb-8"
                        >
                            <Sparkles className="w-4 h-4 text-gold-500" />
                            <span className="text-xs font-bold text-gold-500 uppercase tracking-widest">
                                {displayThreshold}
                            </span>
                        </motion.div>

                        {/* Title - Large for wide screens */}
                        <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tighter mb-8 font-heading leading-[0.9] lg:max-w-[1.2em]">
                            {displayTitle}
                        </h2>

                        {/* Description - Larger text */}
                        <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-12 font-sans max-w-4xl">
                            {displayDescription}
                        </p>

                        {/* Feature Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                            {features.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col items-center gap-3 p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-gold-500/40 transition-colors group"
                                >
                                    <item.icon className="w-8 h-8 text-gold-500 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm font-bold text-white/80 uppercase tracking-widest font-sans text-center">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <Link
                                href="/contact?type=high-revenue"
                                className="group inline-flex items-center gap-3 px-8 py-4 bg-gold-500 text-brand-900 font-bold text-xl rounded-md shadow-2xl shadow-gold-500/20 hover:bg-gold-600 active:scale-95 transition-all font-heading"
                            >
                                {t("cta")}
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <p className="text-slate-400 text-base font-sans flex items-center gap-3">
                                <Map className="w-5 h-5 text-slate-500" />
                                {t("limitText", { year: currentYear })}
                            </p>
                        </div>
                    </RevealOnScroll>
                </div>

                {/* Right Column - Visual Accent */}
                <div className="relative min-h-[375px] lg:min-h-full flex items-center justify-center overflow-hidden">
                    {/* High-Fidelity Image Background */}
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                        style={{ backgroundImage: "url('/images/incentives/executive_retreat_luxury.png')" }}
                    />

                    {/* Overlay Gradients - Enhanced for larger container */}
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/60 to-transparent lg:block hidden" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-transparent to-transparent lg:hidden block" />
                    <div className="absolute inset-0 bg-brand-900/10" />

                </div>
            </div>
        </div>
    );
};

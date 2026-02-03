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
        <RevealOnScroll className={`w-full ${className}`}>
            {/* Main Container - Full width with max-width constraint */}
            <div className="relative bg-brand-900 border border-slate-200 rounded-lg shadow-soft overflow-hidden">

                {/* Two-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

                    {/* Left Column - Content */}
                    <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">

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

                        {/* Title - Outfit font, tracking-tighter */}
                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-6 font-heading leading-[1.1]">
                            {displayTitle}
                        </h2>

                        {/* Description - Inter font */}
                        <p className="text-lg text-slate-300 leading-relaxed mb-10 font-sans max-w-xl">
                            {displayDescription}
                        </p>

                        {/* Feature Grid - Solid design */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                            {features.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col items-center gap-3 p-5 bg-white/5 border border-white/10 rounded-lg hover:border-gold-500/40 transition-colors"
                                >
                                    <item.icon className="w-6 h-6 text-gold-500" />
                                    <span className="text-xs font-bold text-white/80 uppercase tracking-wider font-sans text-center">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button - Gold Standard Button per Design System */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <Link
                                href="/contact?type=high-revenue"
                                className="group inline-flex items-center gap-3 px-8 py-4 bg-gold-500 text-brand-900 font-bold text-lg rounded-md shadow-sm hover:bg-gold-600 active:scale-95 transition-all font-heading"
                            >
                                {t("cta")}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <p className="text-slate-400 text-sm font-sans flex items-center gap-2">
                                <Map className="w-4 h-4 text-slate-500" />
                                {t("limitText", { year: currentYear })}
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Visual Accent */}
                    <div className="relative bg-brand-500/30 min-h-[300px] lg:min-h-full flex items-center justify-center p-8">
                        {/* Decorative Elements */}
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 to-transparent" />

                        {/* Central Icon/Graphic */}
                        <div className="relative z-10 text-center">
                            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 rounded-full bg-gold-500/10 border-2 border-gold-500/30 flex items-center justify-center">
                                <Plane className="w-16 h-16 md:w-20 md:h-20 text-gold-500" />
                            </div>
                            <p className="text-white/60 text-sm font-sans uppercase tracking-widest">
                                {t("exclusiveAccess")}
                            </p>
                        </div>

                        {/* Corner Accents */}
                        <div className="absolute top-6 right-6 w-3 h-3 bg-gold-500 rounded-full" />
                        <div className="absolute bottom-6 left-6 w-3 h-3 bg-gold-500 rounded-full" />
                    </div>
                </div>
            </div>
        </RevealOnScroll>
    );
};

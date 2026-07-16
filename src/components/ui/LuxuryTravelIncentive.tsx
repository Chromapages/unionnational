"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
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
    const [showDisclosure, setShowDisclosure] = useState(false);

    const features = [
        t("features.privateRetreats"),
        t("features.wealthStrategy"),
        t("features.assetProtection")
    ];

    const displayBadge = revenueThreshold || t("badge");
    const displayTitle = title || t("title");
    const displayDescription = description || t("description");
    const qualificationNote = t("qualificationNote");

    return (
        <div className={`w-full relative bg-brand-900 border-y border-white/5 overflow-hidden ${className}`}>
            {/* 2-col layout: content + image */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-0">

                {/* Left Column - Compact content (3/5) */}
                <div className="lg:col-span-3 flex flex-col justify-center px-6 py-10 lg:py-12 relative z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold-500/10 border border-gold-500/30 rounded-md w-fit mb-5"
                    >
                        <Sparkles className="w-3 h-3 text-gold-500" />
                        <span className="text-[10px] font-bold text-gold-500 uppercase tracking-widest">
                            {displayBadge}
                        </span>
                    </motion.div>

                    {/* Headline — benefit + exclusivity */}
                    <motion.h2
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tighter mb-4 font-heading leading-[1.05] max-w-xl"
                    >
                        {displayTitle}
                    </motion.h2>

                    {/* Supporting copy — why a serious owner would care */}
                    <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 }}
                        className="text-base text-slate-300 leading-relaxed mb-6 font-sans max-w-lg"
                    >
                        {displayDescription}
                    </motion.p>

                    {/* Benefit-oriented value chips */}
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-wrap gap-2 mb-7"
                    >
                        {features.map((label, i) => (
                            <span
                                key={i}
                                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-semibold text-white/70 tracking-wide"
                            >
                                <span className="w-1 h-1 rounded-full bg-gold-500/60 shrink-0" />
                                {label}
                            </span>
                        ))}
                    </motion.div>

                    {/* CTA — primary, dominant */}
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.12 }}
                        className="flex flex-col sm:flex-row sm:items-center gap-4 mb-3"
                    >
                        <Link
                            href="/contact?type=high-revenue"
                            className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gold-500 text-brand-900 font-bold text-base rounded-md shadow-lg shadow-gold-500/20 hover:bg-gold-600 active:scale-95 transition-all font-heading"
                        >
                            {t("cta")}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <p className="text-slate-500 text-xs font-sans">
                            {qualificationNote}
                        </p>
                    </motion.div>

                    {/* Scarcity line — visually secondary */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="text-slate-600 text-[11px] font-sans mb-4"
                    >
                        {t("limitText", { year: currentYear })}
                    </motion.p>

                    {/* Minimal disclosure toggle */}
                    <button
                        onClick={() => setShowDisclosure(!showDisclosure)}
                        className="text-[10px] text-slate-700 hover:text-slate-500 transition-colors underline underline-offset-2 decoration-slate-800 w-fit text-left"
                    >
                        Travel incentive disclosure
                    </button>

                    {showDisclosure && (
                        <p className="mt-1.5 text-[10px] text-slate-700 leading-relaxed max-w-xs">
                            Travel incentives are provided by a third-party provider and are not owned or operated by Union National Tax, LLC.
                            Subject to activation, availability, and separate provider terms. Taxes, fees, and incidental expenses may apply.
                        </p>
                    )}
                </div>

                {/* Right Column - Visual (2/5) */}
                <div className="lg:col-span-2 relative min-h-[220px] lg:min-h-full overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                        style={{ backgroundImage: "url('/images/incentives/executive_retreat_luxury.png')" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/50 to-transparent" />
                    <div className="absolute inset-0 bg-brand-900/10" />
                </div>
            </div>
        </div>
    );
};

"use client";

import { useTranslations } from "next-intl";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import {
    Globe, ShieldCheck, HardHat, Zap, Cloud,
    CheckCircle2, LucideIcon
} from "lucide-react";
import { motion } from "framer-motion";

const ICON_MAP: Record<string, LucideIcon> = {
    Globe,
    ShieldCheck,
    HardHat,
    Zap,
    Cloud,
};

interface Feature {
    icon: string;
    title: string;
    description: string;
}

interface NationwideServiceSectionProps {
    data?: {
        nationwideBadge?: string;
        nationwideTitle?: string;
        nationwideSubtitle?: string;
        nationwideFeatures?: Feature[];
    };
}

export function NationwideServiceSection({ data }: NationwideServiceSectionProps) {
    const t = useTranslations("HomePage.NationwideServiceSection");

    // Extract Sanity data with local fallbacks
    const badge = data?.nationwideBadge || t('badge');
    const title = data?.nationwideTitle || t('title');
    const subtitle = data?.nationwideSubtitle || t('subtitle');
    const features = data?.nationwideFeatures?.length
        ? data.nationwideFeatures
        : [
            { icon: "Globe", title: t("features.video.title"), description: t("features.video.description") },
            { icon: "Cloud", title: t("features.portal.title"), description: t("features.portal.description") },
            { icon: "ShieldCheck", title: t("features.multistate.title"), description: t("features.multistate.description") },
            { icon: "CheckCircle2", title: t("features.advisor.title"), description: t("features.advisor.description") },
        ];

    return (
        <section className="relative overflow-hidden border-y border-slate-100 bg-white py-24 sm:py-28">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.06)_0,_transparent_50%)] pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="mx-auto max-w-4xl">
                    <RevealOnScroll>
                        <div className="mb-10">
                            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/15 bg-gold-500/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-gold-700">
                                <span className="h-1.5 w-1.5 rounded-full bg-gold-500 animate-pulse" />
                                {badge}
                            </div>

                            <h2 className="mt-6 text-3xl font-bold tracking-tight text-brand-950 md:text-5xl lg:text-6xl font-heading leading-[1.05]">
                                {title}
                            </h2>

                            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl">
                                {subtitle}
                            </p>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll delay={150}>
                        <div className="mb-10 grid grid-cols-1 gap-4 rounded-[2rem] border border-slate-200 bg-slate-50 p-6 sm:grid-cols-2">
                            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <div className="text-3xl font-bold text-brand-950 font-heading">50</div>
                                <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                                    {t("visual.statOne")}
                                </div>
                            </div>
                            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <div className="text-3xl font-bold text-brand-950 font-heading">100%</div>
                                <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                                    {t("visual.statTwo")}
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>

                    <div className="space-y-4">
                        {features.map((feature: Feature, index: number) => {
                            const Icon = ICON_MAP[feature.icon] || CheckCircle2;

                            return (
                                <motion.div
                                    key={`${feature.title}-${index}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.08 }}
                                    viewport={{ once: true }}
                                    className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500/25 hover:shadow-[0_20px_70px_rgba(212,175,55,0.12)]"
                                >
                                    <div className="flex items-start gap-5">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold-500/15 bg-gold-500/10 text-gold-600 transition-transform duration-300 group-hover:scale-105 group-hover:bg-gold-500 group-hover:text-brand-950">
                                            <Icon className="h-5 w-5" aria-hidden="true" />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <h4 className="text-lg font-bold text-brand-950 font-heading group-hover:text-gold-700 transition-colors">
                                                {feature.title}
                                            </h4>
                                            <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <RevealOnScroll delay={300}>
                        <div className="mt-10 rounded-[2rem] border border-brand-900/10 bg-brand-950 p-6 text-white shadow-2xl">
                            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                                <div className="max-w-2xl">
                                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">
                                        {t("visual.title")}
                                    </div>
                                    <h3 className="mt-3 text-2xl font-bold font-heading">
                                        {t("visual.titleAccent")}
                                    </h3>
                                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                                        {t("visual.description")}
                                    </p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="flex h-16 w-16 items-center justify-center rounded-full border border-gold-500/20 bg-gold-500/10 text-gold-500"
                                    >
                                        <Globe className="h-8 w-8" aria-hidden="true" />
                                    </motion.div>

                                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right">
                                        <div className="text-gold-400 text-2xl font-bold font-heading">Live</div>
                                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                                            Nationwide Delivery
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>

        </section>
    );
}

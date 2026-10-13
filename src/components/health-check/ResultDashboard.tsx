"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldAlert, TrendingUp, BarChart3, PieChart, BadgeCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import type { HealthScores } from "./useHealthScore";

type Tier = "critical" | "stable" | "growth";

interface ResultDashboardProps {
    scores: HealthScores;
    tier: Tier;
    name: string;
}

const tierContent = {
    critical: {
        color: "text-red-500",
        bg: "bg-red-50",
        border: "border-red-100",
        icon: ShieldAlert,
        ctaLink: "/contact?topic=resolution",
    },
    stable: {
        color: "text-amber-500",
        bg: "bg-amber-50",
        border: "border-amber-100",
        icon: BarChart3,
        ctaLink: "/contact?topic=strategy",
    },
    growth: {
        color: "text-emerald-500",
        bg: "bg-emerald-50",
        border: "border-emerald-100",
        icon: TrendingUp,
        ctaLink: "/services",
    },
};

const breakdownItems = [
    { key: "entity", icon: PieChart, max: 15 },
    { key: "compliance", icon: ShieldAlert, max: 35 },
    { key: "operations", icon: BarChart3, max: 50 },
] as const;

export function ResultDashboard({ scores, tier, name }: ResultDashboardProps) {
    const t = useTranslations("HealthCheck.results");
    const content = tierContent[tier];
    const heading = useRef<HTMLHeadingElement>(null);
    useEffect(() => { heading.current?.focus(); }, []);

    return (
        <div className="h-full w-full bg-slate-50 p-6 sm:p-8 md:p-10 lg:p-12 overflow-y-auto">
            <div className="w-full max-w-3xl">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500 font-bold">{t("report")}</p>
                        <h2 ref={heading} tabIndex={-1} className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-brand-900">
                            {t("prepared", {name: name || t("business")})}
                        </h2>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/60 bg-gold-400/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-gold-600">
                        <BadgeCheck className="w-4 h-4" />
                        {t("basedOn")}
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-6">
                    <div className={`rounded-3xl border ${content.border} ${content.bg} p-6 sm:p-7 shadow-sm`}>
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold">{t("tier")}</p>
                                <h3 className={`mt-2 text-2xl font-bold font-heading ${content.color}`}>{t(`${tier}.title`)}</h3>
                                <p className="mt-3 text-slate-600 text-base leading-relaxed">{t(`${tier}.description`)}</p>
                            </div>
                            <div className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm ${content.color}`}>
                                <content.icon className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {(["one", "two", "three"] as const).map((item) => (
                                <div key={item} className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm">
                                    {t(`${tier}.highlights.${item}`)}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold">{t("service")}</p>
                        <h4 className="mt-3 text-xl font-bold text-brand-900">{t(`${tier}.service`)}</h4>
                        <p className="mt-3 text-sm text-slate-500">
                            {t("serviceDescription")}
                        </p>
                        <Link
                            href={content.ctaLink}
                            className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-brand-900 px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-brand-900/20 transition hover:bg-gold-400 hover:text-brand-900"
                        >
                            {t(`${tier}.cta`)}
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </div>
                </div>

                <div className="mt-10">
                    <h4 className="text-lg font-bold text-brand-900 uppercase tracking-widest">{t("snapshot")}</h4>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {breakdownItems.map((item) => {
                            const value = scores[item.key];
                            const percentage = Math.max(0, (value / item.max) * 100);
                            return (
                                <div key={item.key} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold">{t(`breakdown.${item.key}`)}</p>
                                            <p className="mt-2 text-2xl font-bold text-brand-900">
                                                {value}
                                                <span className="text-sm font-bold text-slate-500">/{item.max}</span>
                                            </p>
                                        </div>
                                        <div className="w-10 h-10 rounded-2xl bg-gold-400/15 text-gold-600 flex items-center justify-center">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <div className="mt-4 h-2 rounded-full bg-slate-100 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${percentage}%` }}
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                            className="h-full bg-gold-400"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

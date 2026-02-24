"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldAlert, TrendingUp, BarChart3, PieChart, BadgeCheck } from "lucide-react";
import Link from "next/link";
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
        title: "Urgent Attention Needed",
        desc: "Compliance exposure is putting cash flow and continuity at risk.",
        ctaText: "Get Tax Resolution",
        ctaLink: "/contact?topic=resolution",
        upsell: "Tax Resolution",
        highlights: ["Missing compliance safeguards", "Cash flow exposed", "Entity inefficiencies"],
    },
    stable: {
        color: "text-amber-500",
        bg: "bg-amber-50",
        border: "border-amber-100",
        icon: BarChart3,
        title: "Stable but Stagnant",
        desc: "Operations are steady, but optimization opportunities are still open.",
        ctaText: "Get Tax Strategy",
        ctaLink: "/contact?topic=strategy",
        upsell: "Tax Strategy",
        highlights: ["Moderate compliance health", "Entity optimization available", "Growth runway unlocked"],
    },
    growth: {
        color: "text-emerald-500",
        bg: "bg-emerald-50",
        border: "border-emerald-100",
        icon: TrendingUp,
        title: "Ready for Scale",
        desc: "Your foundation supports expansion. Now focus on strategic scale.",
        ctaText: "Explore Fractional CFO",
        ctaLink: "/services",
        upsell: "Fractional CFO",
        highlights: ["Optimized compliance posture", "Entity structure supports growth", "Operational maturity strong"],
    },
};

const breakdownItems = [
    { key: "entity", label: "Entity Structure", icon: PieChart, max: 15 },
    { key: "compliance", label: "Compliance", icon: ShieldAlert, max: 35 },
    { key: "operations", label: "Operations", icon: BarChart3, max: 50 },
] as const;

export function ResultDashboard({ scores, tier, name }: ResultDashboardProps) {
    const content = tierContent[tier];

    return (
        <div className="h-full w-full bg-slate-50 p-6 sm:p-8 md:p-10 lg:p-12 overflow-y-auto">
            <div className="w-full max-w-3xl">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500 font-bold">Financial Diagnostic Report</p>
                        <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-brand-900">
                            Prepared for {name || "Your Business"}
                        </h2>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/60 bg-gold-400/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-gold-600">
                        <BadgeCheck className="w-4 h-4" />
                        Verified Analysis
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-6">
                    <div className={`rounded-3xl border ${content.border} ${content.bg} p-6 sm:p-7 shadow-sm`}>
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold">Diagnostic Tier</p>
                                <h3 className={`mt-2 text-2xl font-bold font-heading ${content.color}`}>{content.title}</h3>
                                <p className="mt-3 text-slate-600 text-base leading-relaxed">{content.desc}</p>
                            </div>
                            <div className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm ${content.color}`}>
                                <content.icon className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {content.highlights.map((item) => (
                                <div key={item} className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold">Recommended Service</p>
                        <h4 className="mt-3 text-xl font-bold text-brand-900">{content.upsell}</h4>
                        <p className="mt-3 text-sm text-slate-500">
                            Priority service alignment based on live audit scoring.
                        </p>
                        <Link
                            href={content.ctaLink}
                            className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-brand-900 px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-brand-900/20 transition hover:bg-gold-400 hover:text-brand-900"
                        >
                            {content.ctaText}
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </div>
                </div>

                <div className="mt-10">
                    <h4 className="text-lg font-bold text-brand-900 uppercase tracking-widest">Performance Snapshot</h4>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {breakdownItems.map((item) => {
                            const value = scores[item.key];
                            const percentage = Math.max(0, (value / item.max) * 100);
                            return (
                                <div key={item.key} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold">{item.label}</p>
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

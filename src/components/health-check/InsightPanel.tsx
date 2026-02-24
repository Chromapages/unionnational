"use client";

import { motion } from "framer-motion";
import { Activity, ShieldCheck, Layers3, TrendingUp } from "lucide-react";

type ModuleStatus = "idle" | "active" | "complete";

interface ModuleItem {
    label: string;
    status: ModuleStatus;
}

interface MetricItem {
    label: string;
    value: string | number;
}

interface InsightPanelProps {
    eyebrow: string;
    title: string;
    description?: string;
    detail?: string;
    modules: ModuleItem[];
    metrics?: MetricItem[];
    score?: number;
    tierLabel?: string;
    pulseKey?: number;
}

const statusStyles: Record<ModuleStatus, string> = {
    idle: "border-slate-200 text-slate-500 font-bold",
    active: "border-gold-500/70 text-gold-700 shadow-lg shadow-gold-500/10 bg-white",
    complete: "border-emerald-500/70 text-emerald-700 shadow-lg shadow-emerald-500/10 bg-white",
};

export function InsightPanel({
    eyebrow,
    title,
    description,
    detail,
    modules,
    metrics,
    score,
    tierLabel,
    pulseKey,
}: InsightPanelProps) {
    return (
        <div className="h-full w-full relative overflow-hidden bg-slate-50 text-brand-900 p-6 sm:p-8 md:p-10 lg:p-12 md:border-r md:border-slate-200">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.05),_transparent_50%)]"></div>
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-brand-500/5 rounded-full blur-3xl opacity-70"></div>

            <motion.div
                key={pulseKey}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative z-10 flex h-full flex-col justify-between gap-10"
            >
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/5 border border-brand-900/10 text-xs font-bold tracking-[0.2em] uppercase text-gold-600">
                        <Activity className="w-3.5 h-3.5" />
                        {eyebrow}
                    </div>

                    <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold font-heading leading-tight text-brand-900">
                        {title}
                    </h2>
                    {description && (
                        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-sm">
                            {description}
                        </p>
                    )}
                    {detail && (
                        <p className="mt-6 text-sm uppercase tracking-[0.2em] text-slate-500 font-bold">{detail}</p>
                    )}
                </div>

                <div className="space-y-6">
                    {typeof score === "number" && (
                        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold">Live Score</p>
                                <p className="text-3xl font-bold font-heading text-brand-900">{score}</p>
                            </div>
                            {tierLabel && (
                                <div className="flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-gold-600">
                                    <TrendingUp className="w-4 h-4" />
                                    {tierLabel}
                                </div>
                            )}
                        </div>
                    )}

                    {metrics && metrics.length > 0 && (
                        <div className="grid grid-cols-2 gap-3">
                            {metrics.map((metric) => (
                                <div key={metric.label} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 font-bold">
                                        {metric.label}
                                    </p>
                                    <p className="mt-1 text-lg font-bold text-brand-900">{metric.value}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="space-y-3">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold">Module Status</p>
                        <div className="grid grid-cols-1 gap-3">
                            {modules.map((module) => (
                                <div
                                    key={module.label}
                                    className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition-all ${statusStyles[module.status]}`}
                                >
                                    <span className="flex items-center gap-2">
                                        {module.label === "Entity" && <Layers3 className="w-4 h-4" />}
                                        {module.label === "Compliance" && <ShieldCheck className="w-4 h-4" />}
                                        {module.label === "Operations" && <Activity className="w-4 h-4" />}
                                        {module.label}
                                    </span>
                                    <span className="text-xs uppercase tracking-[0.2em]">
                                        {module.status === "complete" ? "Verified" : module.status === "active" ? "Live" : "Queued"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

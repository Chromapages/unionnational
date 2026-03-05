"use client";

import type { ElementType } from "react";
import { ShieldCheck, TrendingUp, Users } from "lucide-react";

interface TrustMetric {
    label: string;
    value: string;
    icon: ElementType;
}

interface TrustMetricsProps {
    metrics?: TrustMetric[];
}

const defaultMetrics: TrustMetric[] = [
    { label: "Downloads", value: "500+", icon: Users },
    { label: "Vetted", value: "Expert Reviewed", icon: ShieldCheck },
    { label: "Impact", value: "Strategic Gains", icon: TrendingUp },
];

export function TrustMetrics({ metrics = defaultMetrics }: TrustMetricsProps) {
    return (
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl border border-slate-100 bg-white/60 px-8 py-5 backdrop-blur-md shadow-sm transition-all hover:shadow-md hover:bg-white/80">
            {metrics.map((metric) => {
                const Icon = metric.icon;
                return (
                    <div
                        key={metric.label}
                        className="flex items-center gap-4 group cursor-default"
                    >
                        <Icon className="h-5 w-5 text-gold-500 transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />
                        <div className="flex items-baseline gap-2.5">
                            <span className="text-lg font-bold text-slate-900 tracking-tight font-heading">
                                {metric.value}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-500 transition-colors pt-0.5">
                                {metric.label}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

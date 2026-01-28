"use client";

import type { ElementType } from "react";
import { Clock, Download, FileText, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FeatureBentoProps {
    format?: string;
    category?: string;
}

const formatMap: Record<string, { label: string; icon: ElementType }> = {
    ebook: { label: "PDF Playbook", icon: FileText },
    template: { label: "Templates", icon: Sparkles },
    course: { label: "Video Masterclass", icon: FileText },
    bundle: { label: "Bundle", icon: Sparkles },
};

const categoryImpactMap: Record<string, string> = {
    ebook: "Compliance Clarity",
    template: "Execution Ready",
    course: "Skill Lift",
};

export function FeatureBento({ format, category }: FeatureBentoProps) {
    const normalizedFormat = format?.toLowerCase() || "";
    const formatConfig = formatMap[normalizedFormat] || { label: format || "Resource", icon: FileText };
    const impact = categoryImpactMap[category?.toLowerCase() || ""] || "Strategic Savings";
    const FormatIcon = formatConfig.icon;

    const cells = [
        {
            title: "Format",
            value: formatConfig.label,
            icon: FormatIcon,
            accent: "bg-slate-50",
        },
        {
            title: "Delivery",
            value: "Instant Access",
            icon: Download,
            accent: "bg-gold-50",
        },
        {
            title: "Execution Time",
            value: "Under 2 hours",
            icon: Clock,
            accent: "bg-sky-50",
        },
        {
            title: "Impact Zone",
            value: impact,
            icon: ShieldCheck,
            accent: "bg-emerald-50",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {cells.map((cell, idx) => {
                const Icon = cell.icon;
                return (
                    <motion.div
                        key={cell.title}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1, duration: 0.4 }}
                        whileHover={{ y: -2 }}
                        className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-brand-100"
                    >
                        {/* Background Gradient */}
                        <div className={cn("absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100", cell.accent)} />

                        <div className="relative z-10 flex items-center justify-between">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-500 transition-colors">
                                {cell.title}
                            </div>
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition-all duration-300 group-hover:bg-white group-hover:text-brand-900 group-hover:shadow-sm">
                                <Icon className="h-4 w-4" />
                            </div>
                        </div>

                        <div className="relative z-10 mt-3">
                            <div className="text-lg font-bold text-brand-900 font-heading">
                                {cell.value}
                            </div>
                            <p className="mt-1 text-[11px] font-medium text-slate-400 group-hover:text-brand-900/60 transition-colors">
                                Optimized for implementation.
                            </p>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}

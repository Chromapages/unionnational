"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2, TrendingUp, Calculator, AlertTriangle } from "lucide-react";

interface ImpactCardProps {
    title: string;
    items: string[];
    variant?: "default" | "highlight" | "warning";
    className?: string;
}

const iconMap = {
    default: CheckCircle2,
    highlight: TrendingUp,
    warning: AlertTriangle,
};

const variantStyles = {
    default: "border-white/10 bg-brand-950/40",
    highlight: "border-gold-500/30 bg-gold-500/10",
    warning: "border-red-500/30 bg-red-500/10",
};

const iconColorMap = {
    default: "text-gold-400",
    highlight: "text-gold-400",
    warning: "text-red-400",
};

export function ImpactCard({ title, items, variant = "default", className }: ImpactCardProps) {
    const Icon = iconMap[variant];

    return (
        <div
            className={cn(
                "rounded-2xl border p-6",
                variantStyles[variant],
                className
            )}
        >
            <div className="flex items-center gap-3 mb-4">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl bg-white/5", iconColorMap[variant])}>
                    <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-white">{title}</h3>
            </div>
            <ul className="space-y-3">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-white/80">
                        <CheckCircle2 className="h-4 w-4 mt-0.5 text-gold-400 flex-shrink-0" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

interface KeyTakeawayProps {
    takeaways: string[];
    className?: string;
}

export function KeyTakeaways({ takeaways, className }: KeyTakeawayProps) {
    if (!takeaways || takeaways.length === 0) return null;

    return (
        <div className={cn("rounded-2xl border border-gold-500/30 bg-gold-500/5 p-6", className)}>
            <h3 className="flex items-center gap-2 font-heading text-lg font-semibold text-gold-200 mb-4">
                <TrendingUp className="h-5 w-5" />
                Key Takeaways
            </h3>
            <ul className="space-y-3">
                {takeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-white/80">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold flex-shrink-0">
                            {index + 1}
                        </span>
                        <span>{takeaway}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

interface ToolReferenceProps {
    tools: string[];
    className?: string;
}

export function ToolReferences({ tools, className }: ToolReferenceProps) {
    if (!tools || tools.length === 0) return null;

    return (
        <div className={cn("rounded-2xl border border-white/10 bg-white/5 p-6", className)}>
            <h3 className="flex items-center gap-2 font-heading text-lg font-semibold text-white mb-4">
                <Calculator className="h-5 w-5 text-white/70" />
                Related Tools
            </h3>
            <div className="flex flex-wrap gap-2">
                {tools.map((tool, index) => (
                    <span
                        key={index}
                        className="rounded-full bg-white/10 px-3 py-1.5 text-sm text-white/80"
                    >
                        {tool}
                    </span>
                ))}
            </div>
        </div>
    );
}

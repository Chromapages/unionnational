"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Calculator,
    TrendingUp,
    FileText,
    Lock,
    ChevronRight
} from "lucide-react";
import { HealthCheckSurvey } from "@/components/health-check/HealthCheckSurvey";
import { JobCostCalculator } from "./calculators/JobCostCalculator";

const tools = [
    {
        id: "tax-health-check",
        title: "Business Tax Health Check",
        description: "Get a comprehensive analysis of your tax strategy in under 2 minutes.",
        icon: TrendingUp,
        color: "amber" as const,
        featured: true,
    },
    {
        id: "job-cost-calculator",
        title: "Job Cost vs. Tax Return",
        description: "See how much you're really making vs. what the IRS and overhead take.",
        icon: Calculator,
        color: "violet" as const,
        featured: true,
    },
    {
        id: "deduction-finder",
        title: "Deduction Finder",
        description: "Identify business deductions you might be missing.",
        icon: FileText,
        color: "violet" as const,
        featured: false,
        comingSoon: true,
    },
];

const colorClasses = {
    amber: {
        bg: "bg-amber-500/5",
        border: "border-amber-500/20",
        text: "text-amber-600",
        hover: "hover:border-amber-500/40 hover:bg-amber-500/10",
    },
    violet: {
        bg: "bg-brand-500/5",
        border: "border-brand-500/20",
        text: "text-brand-600",
        hover: "hover:border-brand-500/40 hover:bg-brand-500/10",
    },
    emerald: {
        bg: "bg-emerald-500/5",
        border: "border-emerald-500/20",
        text: "text-emerald-600",
        hover: "hover:border-emerald-500/40 hover:bg-emerald-500/10",
    },
};

interface InteractiveToolsListProps {
    embedded?: boolean;
}

export function InteractiveToolsList({ embedded = false }: InteractiveToolsListProps) {
    const [activeTool, setActiveTool] = useState<string | null>(null);

    const handleToolSelect = (toolId: string) => {
        const tool = tools.find(t => t.id === toolId);
        if (tool?.comingSoon) return;
        setActiveTool(toolId);
    };

    const handleBack = () => {
        setActiveTool(null);
    };

    if (activeTool) {
        return (
            <div className={embedded ? "bg-white" : "min-h-screen bg-white"}>
                {!embedded && (
                    <div className="bg-white border-b border-slate-200">
                        <div className="w-full px-4 sm:px-6 py-4">
                            <button
                                onClick={handleBack}
                                className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-900 transition-colors font-medium"
                            >
                                <ChevronRight className="w-4 h-4 rotate-180" />
                                Back to Tools
                            </button>
                        </div>
                    </div>
                )}
                <div className={embedded ? "" : "py-8 px-4 md:px-8"}>
                    {activeTool === "tax-health-check" && <HealthCheckSurvey />}
                    {activeTool === "job-cost-calculator" && <JobCostCalculator />}
                </div>
            </div>
        );
    }

    return (
        <div className={embedded ? "bg-white" : "min-h-screen bg-white"}>
            <div className={`relative w-full ${embedded ? "pb-0" : "px-4 sm:px-6 py-16 lg:py-24"}`}>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="relative">
                    <div className={`text-center mb-12 ${embedded ? "px-4 sm:px-6 mt-8" : ""}`}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-sm font-medium mb-6">
                            <Calculator className="w-4 h-4" />
                            Interactive Tools
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-900 mb-4 font-heading">
                            Free Assessment Tools
                        </h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                            Get personalized insights into your tax strategy with our suite of free tools.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full border-t border-slate-200 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                        {tools.map((tool) => {
                            const colors = colorClasses[tool.color];
                            const Icon = tool.icon;

                            return (
                                <motion.div
                                    key={tool.id}
                                    className={`
                                        group relative flex flex-col h-full p-8 lg:p-12 transition-all duration-300
                                        ${tool.comingSoon ? "opacity-60" : "hover:bg-brand-50/30"}
                                    `}
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-8">
                                            <div className={`w-14 h-14 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                                <Icon className={`w-7 h-7 ${colors.text}`} />
                                            </div>
                                            {tool.featured && (
                                                <span className="px-2 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-700 text-[10px] font-bold uppercase tracking-wider">
                                                    Free
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-2xl font-bold text-brand-900 mb-3 font-heading">
                                            {tool.title}
                                        </h3>

                                        <p className="text-slate-600 leading-relaxed mb-6">
                                            {tool.description}
                                        </p>
                                    </div>

                                    <div className="mt-auto pt-8 border-t border-slate-100">
                                        {tool.comingSoon ? (
                                            <div className="flex items-center gap-2 text-slate-400 font-medium">
                                                <Lock className="w-4 h-4" />
                                                Coming Soon
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => handleToolSelect(tool.id)}
                                                className={`
                                                    inline-flex items-center gap-2 font-bold transition-all
                                                    ${colors.text} hover:translate-x-1
                                                `}
                                            >
                                                Start Free
                                                <ArrowRight className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

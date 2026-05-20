"use client";

import { motion } from "framer-motion";
import {
    BarChart3,
    TrendingUp,
    DollarSign,
    RefreshCw,
    FileText,
    Calendar
} from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";

const pillars = [
    {
        icon: BarChart3,
        title: "Job Costing",
        description: "Track estimated vs. actual costs per project in real time. Know which jobs are making money and which are draining cash before the job ends.",
    },
    {
        icon: TrendingUp,
        title: "Estimating Discipline",
        description: "Build estimates using current labor and production data. Bake in overhead recovery. Stop bidding blind.",
    },
    {
        icon: DollarSign,
        title: "Cash Flow Forecasting",
        description: "90-day rolling cash flow forecasts so you can see gaps before they become crises. Plan for payroll, not around it.",
    },
    {
        icon: RefreshCw,
        title: "Margin Control",
        description: "Monitor margin fade as it happens. Catch rework, waste, and scope creep before they compound across multiple jobs.",
    },
    {
        icon: FileText,
        title: "Change Order Control",
        description: "Formal approval workflows so every approved change is documented, tracked, and billed — no more lost revenue.",
    },
    {
        icon: Calendar,
        title: "Weekly Financial Rhythm",
        description: "A structured weekly review cadence so financial decisions are made with current data, not last quarter's report.",
    },
];

export function ControlSystemSection() {
    return (
        <RevealOnScroll>
            <section className="py-20 lg:py-24 bg-surface">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        <div className="bg-gradient-to-br from-brand-900/5 to-transparent rounded-3xl p-8 lg:p-0">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-900/5 border border-brand-900/10 text-[10px] font-bold uppercase tracking-widest text-brand-900 mb-6">
                                Construction Financial Control
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-brand-900 tracking-tight mb-6">
                                Six Key Areas of Construction Financial Control
                            </h2>
                            <p className="text-slate-500 text-lg leading-relaxed">
                                The checklist covers the exact habits construction owners need to move from reactive firefighting to proactive financial control — starting this week.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {pillars.map((pillar, i) => (
                                <RevealOnScroll key={i} delay={i * 80}>
                                    <motion.div
                                        whileHover={{ y: -4 }}
                                        className="flex items-start gap-5 p-6 bg-white rounded-2xl border border-slate-200 hover:border-gold-500/30 hover:shadow-lg transition-all"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-brand-900 text-gold-500 flex items-center justify-center shrink-0">
                                            <pillar.icon size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold font-heading text-brand-900 mb-1">
                                                {pillar.title}
                                            </h3>
                                            <p className="text-slate-500 text-sm leading-relaxed">
                                                {pillar.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                </RevealOnScroll>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </RevealOnScroll>
    );
}
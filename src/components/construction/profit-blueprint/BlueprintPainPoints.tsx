"use client";

import { motion } from "framer-motion";
import {
    TrendingDown,
    Clock,
    FileText,
    DollarSign,
    RefreshCw,
    Users,
    BarChart3
} from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";

const painPoints = [
    {
        icon: TrendingDown,
        title: "Margin Fade",
        description: "Jobs look profitable on paper but the actual margin disappears through labor overruns, material waste, and change order chaos.",
    },
    {
        icon: DollarSign,
        title: "Cash Flow Crunches",
        description: "You are busy and profitable on paper, but payroll hits before invoices get paid. Cash flow timing gaps drain working capital.",
    },
    {
        icon: FileText,
        title: "Estimating Guessing",
        description: "Bids are based on intuition rather than real production data. You do not know which estimates are actually covering your costs.",
    },
    {
        icon: Clock,
        title: "Job Costing Blind Spots",
        description: "You find out a job lost money months later at tax time. By then, the data is useless for fixing the problem.",
    },
    {
        icon: RefreshCw,
        title: "Change Order Chaos",
        description: "Change orders get lost, approved verbally, or never make it to billing. Revenue that should be captured slips through the cracks.",
    },
    {
        icon: Users,
        title: "Subcontractor Misalignment",
        description: "Subs are running their own schedules, billing inconsistently, and scope creep is eating margin that was never approved.",
    },
];

export function BlueprintPainPoints() {
    return (
        <RevealOnScroll>
            <section className="py-20 lg:py-24 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 lg:mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-900/5 border border-brand-900/10 text-[10px] font-bold uppercase tracking-widest text-brand-900 mb-6">
                            What Contractors Fix
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-brand-900 tracking-tight">
                            The Gaps That Drain Your Profit
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {painPoints.map((point, i) => (
                            <RevealOnScroll key={i} delay={i * 80}>
                                <motion.div
                                    whileHover={{ y: -4 }}
                                    className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:border-gold-500/30 transition-all h-full"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-brand-900 flex items-center justify-center text-gold-500 mb-6">
                                        <point.icon size={20} />
                                    </div>
                                    <h3 className="text-lg font-bold font-heading text-brand-900 mb-3">
                                        {point.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        {point.description}
                                    </p>
                                </motion.div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>
        </RevealOnScroll>
    );
}
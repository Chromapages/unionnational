"use client";

import { ScorpFitLevel } from "@/lib/scorp/schema";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, TrendingUp, Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScorpEstimatorCTA } from "./ScorpEstimatorCTA";

interface ScorpEstimatorResultProps {
    fitLevel: ScorpFitLevel;
    savingsRange: string;
}

const MESSAGES: Record<ScorpFitLevel, string> = {
    LOW_FIT: "Your estimate suggests that S-Corp treatment may not be your strongest next move right now. That does not mean there is no planning opportunity. It means the better next step may be a broader tax-structure review before making an S-Corp election. The S-Corp Advantage booklet has been sent to your email.",
    POSSIBLE_FIT: "Your responses suggest there may be a real S-Corp opportunity, but the fit depends on your actual numbers and implementation readiness. A focused review can help determine whether the savings outweigh payroll and compliance complexity. The S-Corp Advantage booklet has been sent to your email.",
    STRONG_CANDIDATE: "Your responses suggest that you may be a strong candidate for S-Corp tax treatment. If your current business income is still being taxed primarily as sole proprietor income, there is a real possibility that you are overpaying in self-employment taxes. The S-Corp Advantage booklet has been sent to your email.",
    HIGH_INTENT_SCORP: "Your responses suggest a strong S-Corp opportunity with enough business size or profitability to justify a deeper review now. The next step is to confirm the real savings range, compensation strategy, payroll readiness, and broader tax fit. The S-Corp Advantage booklet has been sent to your email."
};

const FIT_LABELS: Record<ScorpFitLevel, { label: string, color: string, icon: any }> = {
    LOW_FIT: { label: "Review Recommended", color: "text-slate-400", icon: AlertCircle },
    POSSIBLE_FIT: { label: "Potential Fit", color: "text-blue-500", icon: TrendingUp },
    STRONG_CANDIDATE: { label: "Strong Candidate", color: "text-brand-900", icon: CheckCircle2 },
    HIGH_INTENT_SCORP: { label: "High-Value Opportunity", color: "text-gold-600", icon: CheckCircle2 }
};

export const ScorpEstimatorResult = ({ fitLevel, savingsRange }: ScorpEstimatorResultProps) => {
    const config = FIT_LABELS[fitLevel];
    const Icon = config.icon;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
        >
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-10">
                    <Icon size={18} className={config.color} />
                    <span className={cn("text-[10px] font-semibold uppercase tracking-widest", config.color)}>
                        {config.label}
                    </span>
                </div>

                <div className="mb-10">
                    <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-[0.2em] mb-4">Estimated Potential Savings</h2>
                    <div className="text-3xl sm:text-4xl md:text-6xl font-bold text-brand-900 font-heading tracking-tighter leading-none">
                        {savingsRange} <span className="text-xl md:text-2xl text-slate-400 align-middle">/yr</span>
                    </div>
                </div>

                <div className="max-w-2xl mx-auto mb-12">
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-body font-light">
                        {MESSAGES[fitLevel]}
                    </p>
                    <p className="mt-6 text-[10px] text-slate-400 font-medium uppercase tracking-widest">
                        *This is a directional estimate only, not final tax advice.
                    </p>
                </div>

                <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row gap-6 justify-center">
                    <ScorpEstimatorCTA fitLevel={fitLevel} />
                </div>
            </div>
        </motion.div>
    );
};

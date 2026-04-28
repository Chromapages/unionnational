"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { ScorpEstimatorInput } from "@/lib/scorp/schema";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const REVENUE_BANDS = [
    { value: "UNDER_100K", label: "Under $100K" },
    { value: "100K_250K", label: "$100K – $250K" },
    { value: "250K_500K", label: "$250K – $500K" },
    { value: "500K_1M", label: "$500K – $1M" },
    { value: "1M_5M", label: "$1M – $5M" },
    { value: "5M_PLUS", label: "$5M+" }
];

const PROFIT_RANGES = [
    { value: "UNDER_50K", label: "Under $50K" },
    { value: "50K_100K", label: "$50K – $100K" },
    { value: "100K_150K", label: "$100K – $150K" },
    { value: "150K_250K", label: "$150K – $250K" },
    { value: "250K_PLUS", label: "$250K+" }
];

const READINESS_LEVELS = [
    { value: "LOW", label: "Early Stages / Learning", desc: "Just starting to explore structure" },
    { value: "MEDIUM", label: "Ready but Need Direction", desc: "Know I need it, not sure how" },
    { value: "HIGH", label: "Immediate Implementation", desc: "Ready to implement now" }
];

const PAIN_POINTS = [
    { value: "OVERPAYING_TAXES", label: "Overpaying Taxes" },
    { value: "ENTITY_STRUCTURE_CONFUSION", label: "Structure Confusion" },
    { value: "BOOKKEEPING_CHAOS", label: "Bookkeeping Chaos" },
    { value: "UNCLEAR_NUMBERS", label: "Unclear Numbers" },
    { value: "CASH_FLOW_ISSUES", label: "Cash Flow Issues" },
    { value: "WANT_SCALABLE_GROWTH", label: "Scalable Growth" }
];

export const ScorpEstimatorStepFinancials = () => {
    const { control, setValue, formState: { errors } } = useFormContext<ScorpEstimatorInput>();
    
    const currentRevenue = useWatch({ control, name: "annual_revenue_band" });
    const currentProfit = useWatch({ control, name: "estimated_net_profit_range" });
    const currentPayroll = useWatch({ control, name: "current_payroll_status" });
    const currentReadiness = useWatch({ control, name: "tax_payroll_readiness" });
    const currentPain = useWatch({ control, name: "primary_pain_point" });

    const handleSelect = (fieldName: keyof ScorpEstimatorInput, value: any) => {
        setValue(fieldName, value, { 
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        });
    };

    const OptionGrid = ({ 
        label, 
        options, 
        currentValue, 
        fieldName 
    }: { 
        label: string, 
        options: { value: string, label: string }[], 
        currentValue: any, 
        fieldName: keyof ScorpEstimatorInput 
    }) => {
        const labelId = `${fieldName}_label`;
        return (
            <div className="space-y-4" role="radiogroup" aria-labelledby={labelId}>
                <label id={labelId} className="text-sm font-bold text-brand-500 uppercase tracking-wider block">{label}</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {options.map((opt) => (
                        <button
                            key={opt.value}
                            type="button"
                            role="radio"
                            aria-checked={currentValue === opt.value}
                            onClick={() => handleSelect(fieldName, opt.value)}
                            className={cn(
                                "text-left px-5 py-4 rounded-xl border transition-all font-body text-sm",
                                currentValue === opt.value 
                                    ? "bg-brand-500 text-white border-brand-500 shadow-lg shadow-brand-500/20" 
                                    : "bg-white text-slate-600 border-slate-200 hover:border-gold-500"
                            )}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
                {errors[fieldName] && <p id={`${fieldName}_error`} className="text-red-500 text-xs font-medium">{(errors[fieldName] as any).message}</p>}
            </div>
        );
    };

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-10"
        >
            <OptionGrid 
                label="Annual Gross Revenue" 
                options={REVENUE_BANDS} 
                currentValue={currentRevenue} 
                fieldName="annual_revenue_band" 
            />

            <OptionGrid 
                label="Estimated Net Profit" 
                options={PROFIT_RANGES} 
                currentValue={currentProfit} 
                fieldName="estimated_net_profit_range" 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4" role="radiogroup" aria-labelledby="payroll_label">
                    <label id="payroll_label" className="text-sm font-bold text-brand-500 uppercase tracking-wider block">Currently Running Payroll?</label>
                    <div className="flex flex-col sm:flex-row gap-3">
                        {["RUNNING_PAYROLL", "NOT_RUNNING_PAYROLL", "NOT_SURE"].map((val) => (
                            <button
                                key={val}
                                type="button"
                                role="radio"
                                aria-checked={currentPayroll === val}
                                onClick={() => handleSelect("current_payroll_status", val)}
                                className={cn(
                                    "flex-1 px-4 py-4 rounded-xl border transition-all font-body text-[10px] font-bold leading-tight",
                                    currentPayroll === val 
                                        ? "bg-brand-500 text-white border-brand-500 shadow-md" 
                                        : "bg-white text-slate-600 border-slate-200 hover:border-gold-500"
                                )}
                            >
                                {val.replace(/_/g, " ")}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <label htmlFor="primary_pain_point" className="text-sm font-bold text-brand-500 uppercase tracking-wider block">Primary Pain Point</label>
                    <select
                        id="primary_pain_point"
                        onChange={(e) => handleSelect("primary_pain_point", e.target.value)}
                        value={currentPain || ""}
                        className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-gold-500 outline-none transition-all font-body text-sm bg-white"
                    >
                        <option value="" disabled>Select your biggest challenge</option>
                        {PAIN_POINTS.map(p => (
                            <option key={p.value} value={p.value}>{p.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="space-y-4" role="radiogroup" aria-labelledby="readiness_label">
                <label id="readiness_label" className="text-sm font-bold text-brand-500 uppercase tracking-wider block">Implementation Readiness</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {READINESS_LEVELS.map((level) => (
                        <button
                            key={level.value}
                            type="button"
                            role="radio"
                            aria-checked={currentReadiness === level.value}
                            onClick={() => handleSelect("tax_payroll_readiness", level.value)}
                            className={cn(
                                "text-left p-6 rounded-2xl border transition-all font-body group",
                                currentReadiness === level.value 
                                    ? "bg-brand-500 text-white border-brand-500 ring-2 ring-gold-500/50" 
                                    : "bg-white text-slate-600 border-slate-200 hover:border-gold-500"
                            )}
                        >
                            <span className={cn(
                                "text-sm font-bold block mb-1 group-hover:text-gold-500 transition-colors uppercase tracking-widest",
                                currentReadiness === level.value ? "text-gold-400" : "text-brand-500"
                            )}>
                                {level.label}
                            </span>
                            <span className="text-xs opacity-70 leading-relaxed block">{level.desc}</span>
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

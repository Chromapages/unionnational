"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    ArrowLeft,
    Loader2,
    CheckCircle2,
    TrendingDown,
    DollarSign,
    Clock,
    FileText,
    Users,
    BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { normalizeRevenue } from "@/lib/ghl/contract";

// ─── SECTIONS (3 stages) ───────────────────────────────────────────────────────

const SECTIONS = [
    { id: "business", title: "Your Business", description: "Tell us about your company and challenges." },
    { id: "financial", title: "Your Financial Health", description: "Answer key questions about your operations." },
    { id: "contact", title: "Your Info + Results", description: "Where to send your personalized results." },
];

// ─── OPTIONS ───────────────────────────────────────────────────────────────────

const tradeTypes = [
    "General contractor",
    "HVAC",
    "Roofing",
    "Plumbing",
    "Electrical",
    "Concrete",
    "Landscaping",
    "Remodeling",
    "Other",
];

const revenueBands = ["Under $250K", "$250K–$500K", "$500K–$1M", "$1M–$5M", "$5M+"];

const employeeCounts = ["1–4", "5–9", "10–19", "20–49", "50+"];

const biggestChallenges = [
    "Job Costing",
    "Cash Flow",
    "Estimating",
    "Margin Fade",
    "Change Orders",
    "Subcontractor Control",
    "Scaling Chaos",
    "Weekly Reviews",
    "Systems & Documentation",
];

// ─── FORM SCHEMA ──────────────────────────────────────────────────────────────

const formSchema = z.object({
    // Stage 1: Business Profile
    tradeType: z.string().min(1, "Trade type is required"),
    revenueBand: z.string().min(1, "Revenue band is required"),
    employeeCount: z.string().min(1, "Employee count is required"),
    biggestChallenge: z.string().min(1, "Please select your biggest challenge"),

    // Stage 2: Financial Health (streamlined key questions)
    jobCostingKnowsProfit: z.string().min(1, "Required"),
    cashFlowForecast: z.string().min(1, "Required"),
    operationalChangeOrders: z.string().min(1, "Required"),
    estimatingCurrentData: z.string().min(1, "Required"),
    cashFlowPayrollStress: z.string().min(1, "Required"),
    operationalSubAccountability: z.string().min(1, "Required"),

    // Stage 3: Contact Info
    fullName: z.string().min(1, "Full name is required"),
    businessName: z.string().min(1, "Business name is required"),
    email: z.string().email("Valid email required"),
    phone: z.string().min(1, "Phone number is required").min(10, "Please enter a valid phone number (10+ digits)"),
});

type FormData = z.infer<typeof formSchema>;

// ─── SCORING ──────────────────────────────────────────────────────────────────

function calculateScore(data: FormData) {
    let score = 0;

    // Revenue score
    if (data.revenueBand === "$250K–$500K") score += 15;
    else if (data.revenueBand === "$500K–$1M") score += 25;
    else if (data.revenueBand === "$1M–$5M") score += 30;
    else if (data.revenueBand === "$5M+") score += 25;

    // Job Costing score
    if (data.jobCostingKnowsProfit === "Yes") score += 5;
    else if (data.jobCostingKnowsProfit === "Sometimes") score += 2;

    // Estimating score
    if (data.estimatingCurrentData === "Yes") score += 6;
    else if (data.estimatingCurrentData === "Somewhat") score += 3;

    // Cash Flow score
    if (data.cashFlowForecast === "Yes") score += 10;
    else if (data.cashFlowForecast === "Sometimes") score += 5;

    if (data.cashFlowPayrollStress === "No") score += 5;
    else if (data.cashFlowPayrollStress === "Sometimes") score += 2;

    // Operational score
    if (data.operationalChangeOrders === "Yes") score += 5;
    else if (data.operationalChangeOrders === "Sometimes") score += 2;

    if (data.operationalSubAccountability === "Yes") score += 5;
    else if (data.operationalSubAccountability === "Usually") score += 3;

    // Biggest challenge bonus (urgency proxy)
    if (data.biggestChallenge === "Cash Flow") score += 5;

    return Math.min(100, score);
}

function getScoreBand(score: number): { label: string; color: string; bg: string; tier: string } {
    if (score >= 75) return { label: "High Intent", color: "text-emerald-600", bg: "bg-emerald-50", tier: "HIGH" };
    if (score >= 50) return { label: "Good Fit", color: "text-gold-600", bg: "bg-gold-50", tier: "MEDIUM" };
    if (score >= 25) return { label: "Nurture", color: "text-slate-600", bg: "bg-slate-100", tier: "LOW" };
    return { label: "Low Fit", color: "text-slate-500", bg: "bg-slate-100", tier: "LOW" };
}

function getTopLeakAreas(data: FormData): { label: string; icon: React.ElementType; description: string }[] {
    const leaks: { label: string; icon: React.ElementType; description: string; priority: number }[] = [];

    if (data.jobCostingKnowsProfit !== "Yes") {
        leaks.push({
            label: "Job Costing",
            icon: BarChart3,
            description: "Without per-project cost tracking, you cannot see which jobs are making or losing money in real time.",
            priority: data.jobCostingKnowsProfit === "No" ? 2 : 1,
        });
    }
    if (data.cashFlowForecast !== "Yes") {
        leaks.push({
            label: "Cash Flow Forecasting",
            icon: DollarSign,
            description: "Without 90-day forecasting, cash crunches catch you off guard — even during busy seasons.",
            priority: data.cashFlowForecast === "No" ? 2 : 1,
        });
    }
    if (data.estimatingCurrentData !== "Yes" && data.estimatingCurrentData !== "Somewhat") {
        leaks.push({
            label: "Estimating Accuracy",
            icon: TrendingDown,
            description: "Jobs finishing below expected margin is a systematic estimating problem, not a one-time issue.",
            priority: 2,
        });
    }
    if (data.operationalChangeOrders !== "Yes") {
        leaks.push({
            label: "Change Order Control",
            icon: FileText,
            description: "Change orders that slip through without formal approval are captured revenue that never gets billed.",
            priority: 1,
        });
    }
    if (data.operationalSubAccountability !== "Yes") {
        leaks.push({
            label: "Subcontractor Control",
            icon: Users,
            description: "Subs running out of sync with scope means labor and materials that were never approved, eating margin.",
            priority: 1,
        });
    }
    if (data.cashFlowPayrollStress === "Yes") {
        leaks.push({
            label: "Cash Flow Pressure",
            icon: Clock,
            description: "Payroll stress despite busy seasons signals a cash flow management problem, not a revenue problem.",
            priority: 1,
        });
    }

    return leaks.sort((a, b) => b.priority - a.priority).slice(0, 3);
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export function ProfitabilityAssessmentForm() {
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [finalResults, setFinalResults] = useState<{
        score: number;
        band: ReturnType<typeof getScoreBand>;
        leaks: ReturnType<typeof getTopLeakAreas>;
        highIntent: boolean;
    } | null>(null);

    const {
        handleSubmit,
        trigger,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
    });

    const formValues = watch();
    const values = formValues;

    const handleNext = async () => {
        let fields: (keyof FormData)[] = [];

        if (step === 0) {
            fields = ["tradeType", "revenueBand", "employeeCount", "biggestChallenge"];
        }
        if (step === 1) {
            fields = [
                "jobCostingKnowsProfit",
                "cashFlowForecast",
                "operationalChangeOrders",
                "estimatingCurrentData",
                "cashFlowPayrollStress",
                "operationalSubAccountability",
            ];
        }
        if (step === 2) {
            fields = ["fullName", "businessName", "email", "phone"];
        }

        const valid = await trigger(fields);
        if (valid) {
            setDirection(1);
            setStep((s) => s + 1);
        }
    };

    const handleBack = () => {
        setDirection(-1);
        setStep((s) => Math.max(0, s - 1));
    };

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);

        const score = calculateScore(data);
        const band = getScoreBand(score);
        const leaks = getTopLeakAreas(data);
        const highIntent = score >= 75;

        const payload = {
            event_type: "CONSTRUCTION_ASSESSMENT_SUBMITTED",
            contact: {
                first_name: data.fullName,
                email: data.email,
                phone: data.phone,
                tags: [
                    "LM_Construction",
                    "Interest_Construction",
                    `unt-fit-score-${band.tier.toLowerCase()}`,
                    highIntent ? "Qualified_HighIntent" : "",
                ].filter(Boolean),
            },
            business: {
                business_name: data.businessName,
                industry: "CONSTRUCTION",
                annual_revenue_band: normalizeRevenue(data.revenueBand),
                challenge: data.biggestChallenge,
            },
            intent: {
                primary_service_interest: "CONSTRUCTION_CFO_PARTNERSHIP",
                lead_magnet_type: "CONSTRUCTION_PROFITABILITY_ASSESSMENT",
                pain_points: [data.biggestChallenge],
                high_intent: highIntent,
            },
            results: {
                fit_score: score,
                assessment_label: band.label,
            },
            meta: {
                version: "2.0",
                submitted_at: new Date().toISOString(),
            },
        };

        try {
            const response = await fetch("/api/ghl/intake", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setFinalResults({ score, band, leaks, highIntent });
                setIsComplete(true);
            }
        } catch (error) {
            console.error("Assessment submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const slideVariants = {
        enter: (d: number) => ({ x: d > 0 ? 50 : -50, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d: number) => ({ x: d < 0 ? 50 : -50, opacity: 0 }),
    };

    if (isComplete && finalResults) {
        return (
            <AssessmentResults
                score={finalResults.score}
                band={finalResults.band}
                leaks={finalResults.leaks}
                highIntent={finalResults.highIntent}
                firstName={values.fullName || ""}
            />
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-[2.5rem] shadow-[0_32px_80px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden">
                {/* Progress */}
                <div className="bg-slate-50/50 border-b border-slate-100 px-8 py-6">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-black text-brand-900/40 uppercase tracking-[0.3em]">
                            Assessment: Step {step + 1}/{SECTIONS.length}
                        </span>
                        <div className="flex gap-1.5">
                            {SECTIONS.map((_, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "h-1.5 rounded-full transition-all duration-500",
                                        step === i ? "w-8 bg-gold-500" : step > i ? "w-3 bg-brand-900" : "w-3 bg-slate-200"
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-brand-900 font-heading">{SECTIONS[step]?.title}</span>
                        <span className="text-slate-400 text-sm">—</span>
                        <span className="text-slate-500 text-sm">{SECTIONS[step]?.description}</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 lg:p-12">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={step}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                            {/* STAGE 1: Your Business */}
                            {step === 0 && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em]">
                                                Trade Type
                                            </label>
                                            <select
                                                onChange={(e) => setValue("tradeType", e.target.value, { shouldValidate: true })}
                                                value={values.tradeType || ""}
                                                className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-xl px-4 py-3 transition-all text-sm appearance-none"
                                            >
                                                <option value="">Select...</option>
                                                {tradeTypes.map((t) => (
                                                    <option key={t} value={t}>
                                                        {t}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.tradeType && (
                                                <p className="text-rose-500 text-[10px] font-bold">{errors.tradeType.message}</p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em]">
                                                Annual Revenue
                                            </label>
                                            <select
                                                onChange={(e) => setValue("revenueBand", e.target.value, { shouldValidate: true })}
                                                value={values.revenueBand || ""}
                                                className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-xl px-4 py-3 transition-all text-sm appearance-none"
                                            >
                                                <option value="">Select...</option>
                                                {revenueBands.map((r) => (
                                                    <option key={r} value={r}>
                                                        {r}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.revenueBand && (
                                                <p className="text-rose-500 text-[10px] font-bold">{errors.revenueBand.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em]">
                                                Number of Employees
                                            </label>
                                            <select
                                                onChange={(e) => setValue("employeeCount", e.target.value, { shouldValidate: true })}
                                                value={values.employeeCount || ""}
                                                className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-xl px-4 py-3 transition-all text-sm appearance-none"
                                            >
                                                <option value="">Select...</option>
                                                {employeeCounts.map((e) => (
                                                    <option key={e} value={e}>
                                                        {e}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.employeeCount && (
                                                <p className="text-rose-500 text-[10px] font-bold">{errors.employeeCount.message}</p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em]">
                                                Biggest Challenge
                                            </label>
                                            <select
                                                onChange={(e) => setValue("biggestChallenge", e.target.value, { shouldValidate: true })}
                                                value={values.biggestChallenge || ""}
                                                className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-xl px-4 py-3 transition-all text-sm appearance-none"
                                            >
                                                <option value="">Select...</option>
                                                {biggestChallenges.map((c) => (
                                                    <option key={c} value={c}>
                                                        {c}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.biggestChallenge && (
                                                <p className="text-rose-500 text-[10px] font-bold">{errors.biggestChallenge.message}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* STAGE 2: Your Financial Health */}
                            {step === 1 && (
                                <div className="space-y-6">
                                    {/* Question 1: Job Costing */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-brand-900">
                                            Do you know which jobs make or lose money?
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            {["Yes", "Sometimes", "No"].map((opt) => (
                                                <button
                                                    key={opt}
                                                    type="button"
                                                    onClick={() => setValue("jobCostingKnowsProfit", opt, { shouldValidate: true })}
                                                    className={cn(
                                                        "p-4 rounded-xl border-2 transition-all text-center text-sm font-bold",
                                                        values.jobCostingKnowsProfit === opt
                                                            ? "border-brand-900 bg-brand-900 text-white"
                                                            : "border-slate-100 bg-slate-50 hover:border-gold-200"
                                                    )}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Question 2: Cash Flow Forecast */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-brand-900">
                                            Do you use 90-day cash flow forecasts?
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            {["Yes", "Sometimes", "No"].map((opt) => (
                                                <button
                                                    key={opt}
                                                    type="button"
                                                    onClick={() => setValue("cashFlowForecast", opt, { shouldValidate: true })}
                                                    className={cn(
                                                        "p-4 rounded-xl border-2 transition-all text-center text-sm font-bold",
                                                        values.cashFlowForecast === opt
                                                            ? "border-brand-900 bg-brand-900 text-white"
                                                            : "border-slate-100 bg-slate-50 hover:border-gold-200"
                                                    )}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Question 3: Change Orders */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-brand-900">
                                            Are change orders captured and approved before work continues?
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                                            {["Yes", "Usually", "Sometimes", "No"].map((opt) => (
                                                <button
                                                    key={opt}
                                                    type="button"
                                                    onClick={() => setValue("operationalChangeOrders", opt, { shouldValidate: true })}
                                                    className={cn(
                                                        "p-4 rounded-xl border-2 transition-all text-center text-xs font-bold",
                                                        values.operationalChangeOrders === opt
                                                            ? "border-brand-900 bg-brand-900 text-white"
                                                            : "border-slate-100 bg-slate-50 hover:border-gold-200"
                                                    )}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Question 4: Estimating Data */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-brand-900">
                                            Do your estimates use current labor and production data?
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                                            {["Yes", "Somewhat", "Using old data", "Starting"].map((opt) => (
                                                <button
                                                    key={opt}
                                                    type="button"
                                                    onClick={() => setValue("estimatingCurrentData", opt, { shouldValidate: true })}
                                                    className={cn(
                                                        "p-4 rounded-xl border-2 transition-all text-center text-xs font-bold",
                                                        values.estimatingCurrentData === opt
                                                            ? "border-brand-900 bg-brand-900 text-white"
                                                            : "border-slate-100 bg-slate-50 hover:border-gold-200"
                                                    )}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Question 5: Payroll Stress */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-brand-900">
                                            Do you ever struggle with payroll despite being busy?
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {["Yes", "No"].map((opt) => (
                                                <button
                                                    key={opt}
                                                    type="button"
                                                    onClick={() => setValue("cashFlowPayrollStress", opt, { shouldValidate: true })}
                                                    className={cn(
                                                        "p-4 rounded-xl border-2 transition-all text-center text-sm font-bold",
                                                        values.cashFlowPayrollStress === opt
                                                            ? "border-brand-900 bg-brand-900 text-white"
                                                            : "border-slate-100 bg-slate-50 hover:border-gold-200"
                                                    )}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Question 6: Sub Accountability */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-brand-900">
                                            Are subs held accountable to schedule and scope?
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                                            {["Yes", "Usually", "Sometimes", "No"].map((opt) => (
                                                <button
                                                    key={opt}
                                                    type="button"
                                                    onClick={() => setValue("operationalSubAccountability", opt, { shouldValidate: true })}
                                                    className={cn(
                                                        "p-4 rounded-xl border-2 transition-all text-center text-xs font-bold",
                                                        values.operationalSubAccountability === opt
                                                            ? "border-brand-900 bg-brand-900 text-white"
                                                            : "border-slate-100 bg-slate-50 hover:border-gold-200"
                                                    )}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* STAGE 3: Contact Info */}
                            {step === 2 && (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em]">
                                            Full Name
                                        </label>
                                        <input
                                            onChange={(e) => setValue("fullName", e.target.value, { shouldValidate: true })}
                                            value={values.fullName || ""}
                                            className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-xl px-4 py-3 transition-all text-sm"
                                            placeholder="Jane Doe"
                                        />
                                        {errors.fullName && (
                                            <p className="text-rose-500 text-[10px] font-bold">{errors.fullName.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em]">
                                            Business Name
                                        </label>
                                        <input
                                            onChange={(e) => setValue("businessName", e.target.value, { shouldValidate: true })}
                                            value={values.businessName || ""}
                                            className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-xl px-4 py-3 transition-all text-sm"
                                            placeholder="Smith Builders LLC"
                                        />
                                        {errors.businessName && (
                                            <p className="text-rose-500 text-[10px] font-bold">{errors.businessName.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em]">
                                            Business Email
                                        </label>
                                        <input
                                            onChange={(e) => setValue("email", e.target.value, { shouldValidate: true })}
                                            value={values.email || ""}
                                            type="email"
                                            className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-xl px-4 py-3 transition-all text-sm"
                                            placeholder="jane@smithbuilders.com"
                                        />
                                        {errors.email && (
                                            <p className="text-rose-500 text-[10px] font-bold">{errors.email.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em]">
                                            Phone
                                        </label>
                                        <input
                                            onChange={(e) => setValue("phone", e.target.value, { shouldValidate: true })}
                                            value={values.phone || ""}
                                            type="tel"
                                            className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-xl px-4 py-3 transition-all text-sm"
                                            placeholder="(555) 123-4567"
                                        />
                                        {errors.phone && (
                                            <p className="text-rose-500 text-[10px] font-bold">{errors.phone.message}</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Controls */}
                    <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-100">
                        {step > 0 ? (
                            <button
                                type="button"
                                onClick={handleBack}
                                className="flex items-center gap-2 text-slate-400 font-bold hover:text-brand-900 transition-colors uppercase tracking-[0.2em] text-[10px]"
                            >
                                <ArrowLeft className="w-4 h-4" /> Back
                            </button>
                        ) : (
                            <div />
                        )}

                        {step < 2 ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="bg-brand-900 text-white font-black px-8 py-4 rounded-xl flex items-center gap-3 hover:bg-gold-500 hover:text-brand-900 transition-all text-xs uppercase tracking-widest shadow-lg shadow-brand-900/10 group"
                            >
                                Continue <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-brand-900 text-white font-black px-10 py-4 rounded-xl flex items-center gap-3 hover:bg-gold-500 hover:text-brand-900 transition-all text-xs uppercase tracking-widest shadow-xl shadow-brand-900/20 disabled:opacity-50"
                            >
                                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "See My Results"}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

// ─── RESULTS COMPONENT (unchanged) ───────────────────────────────────────────

interface AssessmentResultsProps {
    score: number;
    band: ReturnType<typeof getScoreBand>;
    leaks: { label: string; icon: React.ElementType; description: string }[];
    highIntent: boolean;
    firstName: string;
}

function AssessmentResults({ score, band, leaks, highIntent, firstName }: AssessmentResultsProps) {
    const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "/book";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8"
        >
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-3xl overflow-hidden text-center p-12 lg:p-20">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">
                    <CheckCircle2 size={14} className="text-gold-500" /> Assessment Complete
                </div>

                <div className="relative inline-block mb-8">
                    <div className={`text-8xl md:text-9xl font-black font-heading ${band.color} tracking-tighter`}>{score}</div>
                    <div className="absolute -top-4 -right-8 bg-brand-900 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                        Score / 100
                    </div>
                </div>

                <div className="mb-6">
                    <span className={`text-2xl md:text-3xl font-bold uppercase tracking-tight font-heading ${band.color}`}>
                        {band.label}
                    </span>
                </div>

                {highIntent && (
                    <div className="mb-8 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-left max-w-xl mx-auto">
                        <p className="text-emerald-900 font-bold text-sm">High Priority — You qualify for a Strategy Call</p>
                        <p className="text-emerald-700 text-xs mt-1">
                            Based on your revenue and assessment answers, you are a strong fit for the Construction CFO Partnership.
                            Book a call to discuss your specific situation.
                        </p>
                    </div>
                )}

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => window.open(bookingUrl, "_blank")}
                        className="bg-brand-900 text-white font-black px-10 py-5 rounded-2xl flex items-center justify-center gap-4 hover:bg-gold-500 hover:text-brand-900 transition-all text-sm uppercase tracking-widest shadow-2xl shadow-brand-900/20 group"
                    >
                        Book Your Strategy Call <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            {leaks.length > 0 && (
                <div className="bg-brand-950 rounded-[2rem] p-10 text-white">
                    <h3 className="text-lg font-bold font-heading uppercase tracking-widest text-gold-500 mb-8 flex items-center gap-3">
                        <TrendingDown className="w-6 h-6" /> Your Top Profit Leaks
                    </h3>
                    <div className="space-y-4">
                        {leaks.map((leak, i) => (
                            <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-white/5">
                                <div className="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center text-gold-500 shrink-0">
                                    <leak.icon size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-1">{leak.label}</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed">{leak.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] py-8">
                Union National Tax — Construction Strategy Division
            </p>
        </motion.div>
    );
}
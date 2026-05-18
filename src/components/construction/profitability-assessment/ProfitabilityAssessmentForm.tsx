"use client";

import { useState, useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    ArrowLeft,
    Loader2,
    CheckCircle2,
    X,
    TrendingDown,
    DollarSign,
    Clock,
    FileText,
    RefreshCw,
    Users,
    BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { normalizeRevenue } from "@/lib/ghl/contract";

// ─── SECTIONS & QUESTIONS ──────────────────────────────────────────────────────

const SECTIONS = [
    { id: "business", title: "Business Profile", description: "Tell us about your construction company." },
    { id: "jobCosting", title: "Job Costing", description: "Do you track profitability on a per-project basis?" },
    { id: "estimating", title: "Estimating", description: "How confident are you in your project estimates?" },
    { id: "cashFlow", title: "Cash Flow", description: "How often do you review your cash flow position?" },
    { id: "operational", title: "Operational Control", description: "How do you manage change orders, subs, and reviews?" },
    { id: "intent", title: "Your Situation", description: "What is the biggest issue and how soon do you want help?" },
];

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

const activeJobs = ["1–3", "4–7", "8–15", "16+"];

// ─── FORM SCHEMA ──────────────────────────────────────────────────────────────

const formSchema = z.object({
    // Section 1: Business Profile
    businessName: z.string().min(1, "Business name is required"),
    tradeType: z.string().min(1, "Trade type is required"),
    revenueBand: z.string().min(1, "Revenue band is required"),
    employeeCount: z.string().min(1, "Employee count is required"),
    activeJobs: z.string().min(1, "Active jobs is required"),

    // Section 2: Job Costing
    jobCostingTrack: z.string().min(1, "Required"),
    jobCostingCompare: z.string().min(1, "Required"),
    jobCostingLaborMaterials: z.string().min(1, "Required"),
    jobCostingKnowsProfit: z.string().min(1, "Required"),

    // Section 3: Estimating
    estimatingCurrentData: z.string().min(1, "Required"),
    estimatingOverheadRecovery: z.string().min(1, "Required"),
    estimatingMarginFade: z.string().min(1, "Required"),
    estimatingTrackFade: z.string().min(1, "Required"),

    // Section 4: Cash Flow
    cashFlowForecast: z.string().min(1, "Required"),
    cashFlowBilling: z.string().min(1, "Required"),
    cashFlowRetainage: z.string().min(1, "Required"),
    cashFlowPayrollStress: z.string().min(1, "Required"),

    // Section 5: Operational Control
    operationalChangeOrders: z.string().min(1, "Required"),
    operationalSubAccountability: z.string().min(1, "Required"),
    operationalWeeklyReviews: z.string().min(1, "Required"),
    operationalDocumentedSystems: z.string().min(1, "Required"),

    // Section 6: Intent
    biggestIssue: z.string().min(1, "Required"),
    urgency: z.string().min(1, "Required"),
    openToCall: z.boolean(),

    // Contact Info
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Valid email required"),
    phone: z.string().optional(),
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

    // Job Costing score (max 25)
    if (data.jobCostingTrack === "Yes") score += 7;
    else if (data.jobCostingTrack === "Somewhat") score += 3;

    if (data.jobCostingCompare === "Yes") score += 7;
    else if (data.jobCostingCompare === "Sometimes") score += 3;

    if (data.jobCostingLaborMaterials === "Yes") score += 6;
    else if (data.jobCostingLaborMaterials === "Partially") score += 3;

    if (data.jobCostingKnowsProfit === "Yes") score += 5;
    else if (data.jobCostingKnowsProfit === "Sometimes") score += 2;

    // Estimating score (max 20)
    if (data.estimatingCurrentData === "Yes") score += 6;
    else if (data.estimatingCurrentData === "Somewhat") score += 3;

    if (data.estimatingOverheadRecovery === "Yes") score += 5;
    else if (data.estimatingOverheadRecovery === "Partially") score += 2;

    if (data.estimatingMarginFade === "Rarely" || data.estimatingMarginFade === "Never") score += 5;
    else if (data.estimatingMarginFade === "Sometimes") score += 2;

    if (data.estimatingTrackFade === "Yes") score += 4;

    // Cash Flow score (max 25)
    if (data.cashFlowForecast === "Yes") score += 10;
    else if (data.cashFlowForecast === "Sometimes") score += 5;

    if (data.cashFlowBilling === "Yes") score += 5;

    if (data.cashFlowRetainage === "No") score += 5;
    else if (data.cashFlowRetainage === "Sometimes") score += 2;

    if (data.cashFlowPayrollStress === "No") score += 5;
    else if (data.cashFlowPayrollStress === "Sometimes") score += 2;

    // Operational score (max 20)
    if (data.operationalChangeOrders === "Yes") score += 5;
    else if (data.operationalChangeOrders === "Sometimes") score += 2;

    if (data.operationalSubAccountability === "Yes") score += 5;
    else if (data.operationalSubAccountability === "Usually") score += 3;

    if (data.operationalWeeklyReviews === "Yes") score += 5;
    else if (data.operationalWeeklyReviews === "Sometimes") score += 2;

    if (data.operationalDocumentedSystems === "Yes") score += 5;
    else if (data.operationalDocumentedSystems === "Some") score += 2;

    // Urgency score (max 20)
    if (data.urgency === "Immediately") score += 20;
    else if (data.urgency === "This month") score += 15;
    else if (data.urgency === "This quarter") score += 10;

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

    if (data.jobCostingTrack !== "Yes") {
        leaks.push({
            label: "Job Costing",
            icon: BarChart3,
            description: "Without per-project cost tracking, you cannot see which jobs are making or losing money in real time.",
            priority: data.jobCostingTrack === "No" ? 2 : 1,
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
    if (data.estimatingMarginFade === "Often" || data.estimatingMarginFade === "Almost always") {
        leaks.push({
            label: "Margin Fade",
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
    if (data.operationalWeeklyReviews !== "Yes") {
        leaks.push({
            label: "Weekly Financial Reviews",
            icon: Clock,
            description: "Making decisions from last quarter's numbers is how profitable businesses stay stuck.",
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

    return leaks.sort((a, b) => b.priority - a.priority).slice(0, 3);
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export function ProfitabilityAssessmentForm() {
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [finalResults, setFinalResults] = useState<{ score: number; band: ReturnType<typeof getScoreBand>; leaks: ReturnType<typeof getTopLeakAreas>; highIntent: boolean } | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        trigger,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
    });

    const values = watch();

    const handleNext = async () => {
        let fields: (keyof FormData)[] = [];

        // Define fields per step
        if (step === 0) fields = ["businessName", "tradeType", "revenueBand", "employeeCount", "activeJobs"];
        if (step === 1) fields = ["jobCostingTrack", "jobCostingCompare", "jobCostingLaborMaterials", "jobCostingKnowsProfit"];
        if (step === 2) fields = ["estimatingCurrentData", "estimatingOverheadRecovery", "estimatingMarginFade", "estimatingTrackFade"];
        if (step === 3) fields = ["cashFlowForecast", "cashFlowBilling", "cashFlowRetainage", "cashFlowPayrollStress"];
        if (step === 4) fields = ["operationalChangeOrders", "operationalSubAccountability", "operationalWeeklyReviews", "operationalDocumentedSystems"];
        if (step === 5) fields = ["biggestIssue", "urgency"];

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
        const highIntent = score >= 75 || (score >= 50 && data.urgency === "Immediately");

        const payload = {
            event_type: "CONSTRUCTION_ASSESSMENT_SUBMITTED",
            contact: {
                first_name: data.firstName,
                last_name: data.lastName,
                email: data.email,
                phone: data.phone || undefined,
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
            },
            intent: {
                primary_service_interest: "CONSTRUCTION_CFO_PARTNERSHIP",
                lead_magnet_type: "CONSTRUCTION_PROFITABILITY_ASSESSMENT",
                urgency: data.urgency === "Immediately" ? "IMMEDIATE" : data.urgency === "This month" ? "THIS_QUARTER" : "PLANNING_ONLY",
                pain_points: [data.biggestIssue],
                high_intent: highIntent,
            },
            results: {
                fit_score: score,
                assessment_label: band.label,
            },
            meta: {
                version: "1.0",
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
        return <AssessmentResults score={finalResults.score} band={finalResults.band} leaks={finalResults.leaks} highIntent={finalResults.highIntent} firstName={values.firstName} />;
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
                        <span className="text-sm font-bold text-brand-900 font-heading">
                            {SECTIONS[step]?.title}
                        </span>
                        <span className="text-slate-400 text-sm">—</span>
                        <span className="text-slate-500 text-sm">
                            {SECTIONS[step]?.description}
                        </span>
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
                            {/* SECTION 0: Business Profile */}
                            {step === 0 && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em]">Business Name</label>
                                            <input
                                                {...register("businessName")}
                                                className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-xl px-4 py-3 transition-all text-sm"
                                                placeholder="Smith Builders LLC"
                                            />
                                            {errors.businessName && <p className="text-rose-500 text-[10px] font-bold">{errors.businessName.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em]">Trade Type</label>
                                            <select {...register("tradeType")} className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-xl px-4 py-3 transition-all text-sm appearance-none">
                                                <option value="">Select...</option>
                                                {tradeTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                                            </select>
                                            {errors.tradeType && <p className="text-rose-500 text-[10px] font-bold">{errors.tradeType.message}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em]">Annual Revenue</label>
                                            <select {...register("revenueBand")} className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-xl px-4 py-3 transition-all text-sm appearance-none">
                                                <option value="">Select...</option>
                                                {revenueBands.map((r) => <option key={r} value={r}>{r}</option>)}
                                            </select>
                                            {errors.revenueBand && <p className="text-rose-500 text-[10px] font-bold">{errors.revenueBand.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em]">Employees</label>
                                            <select {...register("employeeCount")} className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-xl px-4 py-3 transition-all text-sm appearance-none">
                                                <option value="">Select...</option>
                                                {employeeCounts.map((e) => <option key={e} value={e}>{e}</option>)}
                                            </select>
                                            {errors.employeeCount && <p className="text-rose-500 text-[10px] font-bold">{errors.employeeCount.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em]">Active Jobs/Month</label>
                                            <select {...register("activeJobs")} className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-xl px-4 py-3 transition-all text-sm appearance-none">
                                                <option value="">Select...</option>
                                                {activeJobs.map((a) => <option key={a} value={a}>{a}</option>)}
                                            </select>
                                            {errors.activeJobs && <p className="text-rose-500 text-[10px] font-bold">{errors.activeJobs.message}</p>}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* SECTION 1: Job Costing */}
                            {step === 1 && (
                                <div className="space-y-4">
                                    {[
                                        { field: "jobCostingTrack", q: "Do you track job costs by project?" },
                                        { field: "jobCostingCompare", q: "Do you compare estimated vs. actual costs weekly?" },
                                        { field: "jobCostingLaborMaterials", q: "Do you track labor, materials, equipment, and subs separately?" },
                                        { field: "jobCostingKnowsProfit", q: "Do you know which jobs make or lose money?" },
                                    ].map(({ field, q }) => (
                                        <div key={field} className="space-y-3">
                                            <label className="text-sm font-bold text-brand-900">{q}</label>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                {["Yes", "Somewhat", "No"].map((opt) => (
                                                    <button
                                                        key={opt}
                                                        type="button"
                                                        onClick={() => (register(field as keyof FormData) as any).onChange({ target: { value: opt } })}
                                                        className={cn(
                                                            "p-4 rounded-xl border-2 transition-all text-center text-sm font-bold",
                                                            (values as any)[field] === opt
                                                                ? "border-brand-900 bg-brand-900 text-white"
                                                                : "border-slate-100 bg-slate-50 hover:border-gold-200"
                                                        )}
                                                    >
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* SECTION 2: Estimating */}
                            {step === 2 && (
                                <div className="space-y-4">
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-brand-900">Do your estimates use current labor and production data?</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                                            {["Yes", "Somewhat", "Using old data", "Starting/No"].map((opt) => (
                                                <button key={opt} type="button" onClick={() => register("estimatingCurrentData").onChange({ target: { value: opt } })} className={cn("p-4 rounded-xl border-2 transition-all text-center text-xs font-bold", (values as any).estimatingCurrentData === opt ? "border-brand-900 bg-brand-900 text-white" : "border-slate-100 bg-slate-50 hover:border-gold-200")}>
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-brand-900">Do you calculate overhead recovery?</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            {["Yes", "Partially", "No"].map((opt) => (
                                                <button key={opt} type="button" onClick={() => register("estimatingOverheadRecovery").onChange({ target: { value: opt } })} className={cn("p-4 rounded-xl border-2 transition-all text-center text-sm font-bold", (values as any).estimatingOverheadRecovery === opt ? "border-brand-900 bg-brand-900 text-white" : "border-slate-100 bg-slate-50 hover:border-gold-200")}>
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-brand-900">Do jobs often finish below expected margin?</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                                            {["Rarely", "Sometimes", "Often", "Almost always"].map((opt) => (
                                                <button key={opt} type="button" onClick={() => register("estimatingMarginFade").onChange({ target: { value: opt } })} className={cn("p-4 rounded-xl border-2 transition-all text-center text-xs font-bold", (values as any).estimatingMarginFade === opt ? "border-brand-900 bg-brand-900 text-white" : "border-slate-100 bg-slate-50 hover:border-gold-200")}>
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-brand-900">Do you track margin fade?</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            {["Yes", "Informally", "No"].map((opt) => (
                                                <button key={opt} type="button" onClick={() => register("estimatingTrackFade").onChange({ target: { value: opt } })} className={cn("p-4 rounded-xl border-2 transition-all text-center text-sm font-bold", (values as any).estimatingTrackFade === opt ? "border-brand-900 bg-brand-900 text-white" : "border-slate-100 bg-slate-50 hover:border-gold-200")}>
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* SECTION 3: Cash Flow */}
                            {step === 3 && (
                                <div className="space-y-4">
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-brand-900">Do you use 90-day cash flow forecasts?</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            {["Yes", "Sometimes", "No"].map((opt) => (
                                                <button key={opt} type="button" onClick={() => register("cashFlowForecast").onChange({ target: { value: opt } })} className={cn("p-4 rounded-xl border-2 transition-all text-center text-sm font-bold", (values as any).cashFlowForecast === opt ? "border-brand-900 bg-brand-900 text-white" : "border-slate-100 bg-slate-50 hover:border-gold-200")}>
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-brand-900">Do you bill by schedule or milestone?</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {["Yes", "No"].map((opt) => (
                                                <button key={opt} type="button" onClick={() => register("cashFlowBilling").onChange({ target: { value: opt } })} className={cn("p-4 rounded-xl border-2 transition-all text-center text-sm font-bold", (values as any).cashFlowBilling === opt ? "border-brand-900 bg-brand-900 text-white" : "border-slate-100 bg-slate-50 hover:border-gold-200")}>
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-brand-900">Do you have retainage issues?</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            {["Yes sometimes", "No", "Not applicable"].map((opt) => (
                                                <button key={opt} type="button" onClick={() => register("cashFlowRetainage").onChange({ target: { value: opt } })} className={cn("p-4 rounded-xl border-2 transition-all text-center text-xs font-bold", (values as any).cashFlowRetainage === opt ? "border-brand-900 bg-brand-900 text-white" : "border-slate-100 bg-slate-50 hover:border-gold-200")}>
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-brand-900">Do you ever struggle with payroll despite being busy?</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {["Yes", "No"].map((opt) => (
                                                <button key={opt} type="button" onClick={() => register("cashFlowPayrollStress").onChange({ target: { value: opt } })} className={cn("p-4 rounded-xl border-2 transition-all text-center text-sm font-bold", (values as any).cashFlowPayrollStress === opt ? "border-brand-900 bg-brand-900 text-white" : "border-slate-100 bg-slate-50 hover:border-gold-200")}>
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* SECTION 4: Operational Control */}
                            {step === 4 && (
                                <div className="space-y-4">
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-brand-900">Are change orders captured and approved before work continues?</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                                            {["Yes", "Usually", "Sometimes", "No"].map((opt) => (
                                                <button key={opt} type="button" onClick={() => register("operationalChangeOrders").onChange({ target: { value: opt } })} className={cn("p-4 rounded-xl border-2 transition-all text-center text-xs font-bold", (values as any).operationalChangeOrders === opt ? "border-brand-900 bg-brand-900 text-white" : "border-slate-100 bg-slate-50 hover:border-gold-200")}>
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-brand-900">Are subs held accountable to schedule and scope?</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                                            {["Yes", "Usually", "Sometimes", "No"].map((opt) => (
                                                <button key={opt} type="button" onClick={() => register("operationalSubAccountability").onChange({ target: { value: opt } })} className={cn("p-4 rounded-xl border-2 transition-all text-center text-xs font-bold", (values as any).operationalSubAccountability === opt ? "border-brand-900 bg-brand-900 text-white" : "border-slate-100 bg-slate-50 hover:border-gold-200")}>
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-brand-900">Do you have weekly project financial reviews?</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            {["Yes", "Sometimes", "No"].map((opt) => (
                                                <button key={opt} type="button" onClick={() => register("operationalWeeklyReviews").onChange({ target: { value: opt } })} className={cn("p-4 rounded-xl border-2 transition-all text-center text-sm font-bold", (values as any).operationalWeeklyReviews === opt ? "border-brand-900 bg-brand-900 text-white" : "border-slate-100 bg-slate-50 hover:border-gold-200")}>
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-brand-900">Do you have documented production systems?</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            {["Yes", "Some", "No"].map((opt) => (
                                                <button key={opt} type="button" onClick={() => register("operationalDocumentedSystems").onChange({ target: { value: opt } })} className={cn("p-4 rounded-xl border-2 transition-all text-center text-sm font-bold", (values as any).operationalDocumentedSystems === opt ? "border-brand-900 bg-brand-900 text-white" : "border-slate-100 bg-slate-50 hover:border-gold-200")}>
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* SECTION 5: Intent */}
                            {step === 5 && (
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-brand-900">What is the biggest issue right now?</label>
                                        <select {...register("biggestIssue")} className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-xl px-4 py-3 transition-all text-sm appearance-none">
                                            <option value="">Select...</option>
                                            <option value="Job costing">Job Costing</option>
                                            <option value="Cash flow">Cash Flow</option>
                                            <option value="Estimating">Estimating</option>
                                            <option value="Margin fade">Margin Fade</option>
                                            <option value="Change orders">Change Orders</option>
                                            <option value="Subcontractor control">Subcontractor Control</option>
                                            <option value="Scaling chaos">Scaling Chaos</option>
                                        </select>
                                        {errors.biggestIssue && <p className="text-rose-500 text-[10px] font-bold">{errors.biggestIssue.message}</p>}
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-brand-900">How soon do you want help?</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                                            {["Immediately", "This month", "This quarter", "Just researching"].map((opt) => (
                                                <button key={opt} type="button" onClick={() => register("urgency").onChange({ target: { value: opt } })} className={cn("p-4 rounded-xl border-2 transition-all text-center text-xs font-bold", (values as any).urgency === opt ? "border-brand-900 bg-brand-900 text-white" : "border-slate-100 bg-slate-50 hover:border-gold-200")}>
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                        {errors.urgency && <p className="text-rose-500 text-[10px] font-bold">{errors.urgency.message}</p>}
                                    </div>

                                    <div className="space-y-3">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" {...register("openToCall")} className="w-5 h-5 rounded border-slate-200 text-brand-900 focus:ring-gold-500" />
                                            <span className="text-sm text-slate-600">I am open to a construction financial strategy call</span>
                                        </label>
                                    </div>
                                </div>
                            )}

                            {/* CONTACT STEP */}
                            {step === 6 && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em]">First Name</label>
                                            <input {...register("firstName")} className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-xl px-4 py-3 transition-all text-sm" placeholder="Jane" />
                                            {errors.firstName && <p className="text-rose-500 text-[10px] font-bold">{errors.firstName.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em]">Last Name</label>
                                            <input {...register("lastName")} className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-xl px-4 py-3 transition-all text-sm" placeholder="Doe" />
                                            {errors.lastName && <p className="text-rose-500 text-[10px] font-bold">{errors.lastName.message}</p>}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em]">Business Email</label>
                                        <input {...register("email")} type="email" className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-xl px-4 py-3 transition-all text-sm" placeholder="jane@smithbuilders.com" />
                                        {errors.email && <p className="text-rose-500 text-[10px] font-bold">{errors.email.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em]">Phone <span className="text-slate-400">(optional)</span></label>
                                        <input {...register("phone")} type="tel" className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-xl px-4 py-3 transition-all text-sm" placeholder="(555) 123-4567" />
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

                        {step < 6 ? (
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

// ─── RESULTS COMPONENT ────────────────────────────────────────────────────────

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
                    <div className={`text-8xl md:text-9xl font-black font-heading ${band.color} tracking-tighter`}>
                        {score}
                    </div>
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
                        <p className="text-emerald-900 font-bold text-sm">
                            High Priority — You qualify for a Strategy Call
                        </p>
                        <p className="text-emerald-700 text-xs mt-1">
                            Based on your revenue and assessment answers, you are a strong fit for the Construction CFO Partnership. Book a call to discuss your specific situation.
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
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    UtensilsCrossed,
    Users,
    DollarSign,
    Calendar,
    CreditCard,
    ShieldCheck,
    CheckCircle2,
    ArrowRight,
    ArrowLeft,
    Loader2,
    TrendingUp,
    Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RestaurantAssessmentResults } from "./RestaurantAssessmentResults";
import { normalizeRevenue } from "@/lib/ghl/contract";

const formSchema = z.object({
    primeCost: z.enum(["Never", "Occasionally", "Weekly"]),
    foodCost: z.enum(["Guesswork", "Partial costing", "Full plate costing"]),
    laborBurden: z.enum(["Over 35%", "30–35%", "Under 30%"]),
    menuPricing: z.enum(["Never", "Over 12 months ago", "6–12 months ago", "Within 6 months"]),
    financialRhythm: z.enum(["Never", "Monthly", "1–2 weeks", "Within days"]),
    cashFlow: z.enum(["Blind", "Reactive", "Real-time"]),
    taxCompliance: z.enum(["No", "Partially", "Yes, fully"]),
    revenueRange: z.enum(["Under $500K", "$500K-$1M", "$1M+"]),
    // Contact Info
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Valid business email required"),
    phone: z.string().min(10, "Valid phone required"),
    companyName: z.string().min(2, "Company name is required"),
});

type FormData = z.infer<typeof formSchema>;

const STEPS = [
    { id: "primeCost", title: "Prime Cost Visibility", description: "Do you track combined Food + Labor cost as a percentage of revenue?", icon: LayoutDashboard },
    { id: "foodCost", title: "Food Cost Discipline", description: "How do you currently monitor food cost vs. theoretical?", icon: UtensilsCrossed },
    { id: "laborBurden", title: "Labor Burden", description: "What is your current labor cost percentage?", icon: Users },
    { id: "menuPricing", title: "Menu Pricing", description: "When did you last raise menu prices?", icon: DollarSign },
    { id: "financialRhythm", title: "Financial Rhythm", description: "How quickly do you see your weekly P&L?", icon: Calendar },
    { id: "cashFlow", title: "Cash Flow Visibility", description: "How would you describe your cash flow visibility?", icon: CreditCard },
    { id: "taxCompliance", title: "Tax & Compliance", description: "Are you capturing the FICA Tip Credit (Section 45B)?", icon: ShieldCheck },
    { id: "contact", title: "Secure Results", description: "Where should we send your full analysis?", icon: CheckCircle2 },
];

export const RestaurantProfitLeakAssessment = () => {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [finalResults, setFinalResults] = useState<{
        score: number;
        label: string;
        urgency: string;
        highIntent: boolean;
    } | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        trigger,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
    });

    const values = watch();

    const calculateScore = (data: FormData) => {
        let score = 0;

        // Prime Cost
        if (data.primeCost === "Occasionally") score += 2;
        else if (data.primeCost === "Weekly") score += 4;

        // Food Cost
        if (data.foodCost === "Partial costing") score += 2;
        else if (data.foodCost === "Full plate costing") score += 4;

        // Labor Burden
        if (data.laborBurden === "30–35%") score += 2;
        else if (data.laborBurden === "Under 30%") score += 4;

        // Menu Pricing
        if (data.menuPricing === "6–12 months ago") score += 2;
        else if (data.menuPricing === "Within 6 months") score += 4;
        else if (data.menuPricing === "Over 12 months ago") score += 1;

        // Financial Rhythm
        if (data.financialRhythm === "1–2 weeks") score += 2;
        else if (data.financialRhythm === "Within days") score += 4;
        else if (data.financialRhythm === "Monthly") score += 1;

        // Cash Flow
        if (data.cashFlow === "Reactive") score += 2;
        else if (data.cashFlow === "Real-time") score += 4;

        // Tax Compliance
        if (data.taxCompliance === "Partially") score += 2;
        else if (data.taxCompliance === "Yes, fully") score += 4;

        return score;
    };

    const handleNext = async () => {
        let fields: (keyof FormData)[] = [];
        if (step === 1) fields = ["primeCost"];
        if (step === 2) fields = ["foodCost"];
        if (step === 3) fields = ["laborBurden"];
        if (step === 4) fields = ["menuPricing"];
        if (step === 5) fields = ["financialRhythm"];
        if (step === 6) fields = ["cashFlow"];
        if (step === 7) fields = ["taxCompliance"];

        const isValid = await trigger(fields);
        if (isValid) {
            setDirection(1);
            setStep((s) => s + 1);
        }
    };

    const handleBack = () => {
        setDirection(-1);
        setStep((s) => s - 1);
    };

    const onSubmit = async (data: FormData) => {
        const score = calculateScore(data);
        let urgency = "PLANNING_ONLY";
        let label = "Strong Foundation";

        if (score < 10) {
            urgency = "IMMEDIATE";
            label = "Critical";
        } else if (score < 18) {
            urgency = "THIS_QUARTER";
            label = "Needs Work";
        }

        const highIntent =
            (data.revenueRange === "$500K-$1M" || data.revenueRange === "$1M+") && score < 18;

        const payload = {
            event_type: "RESTAURANT_PROFIT_LEAK_ASSESSMENT_SUBMITTED",
            contact: {
                first_name: data.firstName,
                last_name: data.lastName,
                email: data.email,
                phone: data.phone,
                tags: [
                    "unt-restaurant-pla",
                    `unt-fit-score-${score >= 18 ? "high" : score >= 10 ? "medium" : "low"}`,
                ],
            },
            business: {
                business_name: data.companyName,
                industry: "HOSPITALITY",
                annual_revenue_band: normalizeRevenue(data.revenueRange),
            },
            intent: {
                primary_service_interest: "RESTAURANT_CFO_PARTNERSHIP",
                lead_magnet_type: "RESTAURANT_PROFIT_LEAK_ASSESSMENT",
                urgency: urgency,
                high_intent: highIntent,
            },
            results: {
                fit_score: score,
                assessment_label: label,
            },
        };

        try {
            const response = await fetch("/api/ghl/intake", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setFinalResults({ score, label, urgency, highIntent });
                setIsComplete(true);
            }
        } catch (error) {
            console.error("Submission failed:", error);
        }
    };

    const slideVariants = {
        enter: (d: number) => ({ x: d > 0 ? 50 : -50, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d: number) => ({ x: d < 0 ? 50 : -50, opacity: 0 }),
    };

    if (isComplete && finalResults) {
        return <RestaurantAssessmentResults {...finalResults} />;
    }

    const currentStepConfig = STEPS[step - 1];
    const StepIcon = currentStepConfig?.icon ?? CheckCircle2;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-[2.5rem] shadow-[0_32px_80px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden">
                {/* Progress Header */}
                <div className="bg-slate-50/50 border-b border-slate-100 px-8 py-6">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-black text-brand-900/40 uppercase tracking-[0.3em]">
                            Assessment Progress: Step {step}/{STEPS.length}
                        </span>
                        <div className="flex gap-1.5">
                            {STEPS.map((_, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "h-1.5 rounded-full transition-all duration-500",
                                        step === i + 1
                                            ? "w-8 bg-gold-500"
                                            : step > i + 1
                                            ? "w-3 bg-brand-900"
                                            : "w-3 bg-slate-200"
                                    )}
                                />
                            ))}
                        </div>
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
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="space-y-8"
                        >
                            <div className="flex items-center gap-4 mb-2">
                                <div className="w-12 h-12 rounded-xl bg-brand-900 flex items-center justify-center">
                                    <StepIcon className="w-6 h-6 text-gold-500" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gold-600 uppercase tracking-[0.3em]">
                                        Restaurant Profit Leak Assessment
                                    </p>
                                    <h2 className="text-3xl font-bold text-brand-900 font-heading tracking-tight uppercase">
                                        {currentStepConfig?.title}
                                    </h2>
                                </div>
                            </div>
                            <p className="text-brand-900/60 text-lg font-light leading-relaxed">
                                {currentStepConfig?.description}
                            </p>

                            {/* Step 1: Prime Cost */}
                            {step === 1 && (
                                <div className="space-y-3">
                                    {["Never", "Occasionally", "Weekly"].map((opt) => (
                                        <button
                                            key={opt}
                                            type="button"
                                            onClick={() => {
                                                setValue("primeCost", opt as FormData["primeCost"]);
                                                handleNext();
                                            }}
                                            className={cn(
                                                "w-full p-6 rounded-2xl border-2 transition-all text-left flex items-center justify-between group",
                                                values.primeCost === opt
                                                    ? "border-brand-900 bg-brand-900 text-white"
                                                    : "border-slate-50 bg-slate-50 hover:border-gold-200"
                                            )}
                                        >
                                            <span className="font-bold text-sm">{opt}</span>
                                            <CheckCircle2
                                                className={cn(
                                                    "w-6 h-6",
                                                    values.primeCost === opt ? "text-gold-500" : "text-slate-200"
                                                )}
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Step 2: Food Cost */}
                            {step === 2 && (
                                <div className="space-y-3">
                                    {["Guesswork", "Partial costing", "Full plate costing"].map((opt) => (
                                        <button
                                            key={opt}
                                            type="button"
                                            onClick={() => {
                                                setValue("foodCost", opt as FormData["foodCost"]);
                                                handleNext();
                                            }}
                                            className={cn(
                                                "w-full p-6 rounded-2xl border-2 transition-all text-left flex items-center justify-between group",
                                                values.foodCost === opt
                                                    ? "border-brand-900 bg-brand-900 text-white"
                                                    : "border-slate-50 bg-slate-50 hover:border-gold-200"
                                            )}
                                        >
                                            <span className="font-bold text-sm">{opt}</span>
                                            <CheckCircle2
                                                className={cn(
                                                    "w-6 h-6",
                                                    values.foodCost === opt ? "text-gold-500" : "text-slate-200"
                                                )}
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Step 3: Labor Burden */}
                            {step === 3 && (
                                <div className="space-y-3">
                                    {["Over 35%", "30–35%", "Under 30%"].map((opt) => (
                                        <button
                                            key={opt}
                                            type="button"
                                            onClick={() => {
                                                setValue("laborBurden", opt as FormData["laborBurden"]);
                                                handleNext();
                                            }}
                                            className={cn(
                                                "w-full p-6 rounded-2xl border-2 transition-all text-left flex items-center justify-between group",
                                                values.laborBurden === opt
                                                    ? "border-brand-900 bg-brand-900 text-white"
                                                    : "border-slate-50 bg-slate-50 hover:border-gold-200"
                                            )}
                                        >
                                            <span className="font-bold text-sm">{opt}</span>
                                            <Users
                                                className={cn(
                                                    "w-6 h-6",
                                                    values.laborBurden === opt ? "text-gold-500" : "text-slate-200"
                                                )}
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Step 4: Menu Pricing */}
                            {step === 4 && (
                                <div className="space-y-3">
                                    {["Never", "Over 12 months ago", "6–12 months ago", "Within 6 months"].map(
                                        (opt) => (
                                            <button
                                                key={opt}
                                                type="button"
                                                onClick={() => {
                                                    setValue("menuPricing", opt as FormData["menuPricing"]);
                                                    handleNext();
                                                }}
                                                className={cn(
                                                    "w-full p-6 rounded-2xl border-2 transition-all text-left flex items-center justify-between group",
                                                    values.menuPricing === opt
                                                        ? "border-brand-900 bg-brand-900 text-white"
                                                        : "border-slate-50 bg-slate-50 hover:border-gold-200"
                                                )}
                                            >
                                                <span className="font-bold text-sm">{opt}</span>
                                                <DollarSign
                                                    className={cn(
                                                        "w-6 h-6",
                                                        values.menuPricing === opt ? "text-gold-500" : "text-slate-200"
                                                    )}
                                                />
                                            </button>
                                        )
                                    )}
                                </div>
                            )}

                            {/* Step 5: Financial Rhythm */}
                            {step === 5 && (
                                <div className="space-y-3">
                                    {["Never", "Monthly", "1–2 weeks", "Within days"].map((opt) => (
                                        <button
                                            key={opt}
                                            type="button"
                                            onClick={() => {
                                                setValue("financialRhythm", opt as FormData["financialRhythm"]);
                                                handleNext();
                                            }}
                                            className={cn(
                                                "w-full p-6 rounded-2xl border-2 transition-all text-left flex items-center justify-between group",
                                                values.financialRhythm === opt
                                                    ? "border-brand-900 bg-brand-900 text-white"
                                                    : "border-slate-50 bg-slate-50 hover:border-gold-200"
                                            )}
                                        >
                                            <span className="font-bold text-sm">{opt}</span>
                                            <Calendar
                                                className={cn(
                                                    "w-6 h-6",
                                                    values.financialRhythm === opt ? "text-gold-500" : "text-slate-200"
                                                )}
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Step 6: Cash Flow */}
                            {step === 6 && (
                                <div className="space-y-3">
                                    {["Blind", "Reactive", "Real-time"].map((opt) => (
                                        <button
                                            key={opt}
                                            type="button"
                                            onClick={() => {
                                                setValue("cashFlow", opt as FormData["cashFlow"]);
                                                handleNext();
                                            }}
                                            className={cn(
                                                "w-full p-6 rounded-2xl border-2 transition-all text-left flex items-center justify-between group",
                                                values.cashFlow === opt
                                                    ? "border-brand-900 bg-brand-900 text-white"
                                                    : "border-slate-50 bg-slate-50 hover:border-gold-200"
                                            )}
                                        >
                                            <span className="font-bold text-sm">{opt}</span>
                                            <CreditCard
                                                className={cn(
                                                    "w-6 h-6",
                                                    values.cashFlow === opt ? "text-gold-500" : "text-slate-200"
                                                )}
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Step 7: Tax & Compliance */}
                            {step === 7 && (
                                <div className="space-y-3">
                                    {["No", "Partially", "Yes, fully"].map((opt) => (
                                        <button
                                            key={opt}
                                            type="button"
                                            onClick={() => {
                                                setValue("taxCompliance", opt as FormData["taxCompliance"]);
                                                handleNext();
                                            }}
                                            className={cn(
                                                "w-full p-6 rounded-2xl border-2 transition-all text-left flex items-center justify-between group",
                                                values.taxCompliance === opt
                                                    ? "border-brand-900 bg-brand-900 text-white"
                                                    : "border-slate-50 bg-slate-50 hover:border-gold-200"
                                            )}
                                        >
                                            <span className="font-bold text-sm">{opt}</span>
                                            <ShieldCheck
                                                className={cn(
                                                    "w-6 h-6",
                                                    values.taxCompliance === opt ? "text-gold-500" : "text-slate-200"
                                                )}
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Step 8: Contact Info */}
                            {step === 8 && (
                                <div className="space-y-6">
                                    {/* Revenue Range */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em] ml-1">
                                            Annual Revenue
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            {["Under $500K", "$500K-$1M", "$1M+"].map((range) => (
                                                <button
                                                    key={range}
                                                    type="button"
                                                    onClick={() =>
                                                        setValue("revenueRange", range as FormData["revenueRange"])
                                                    }
                                                    className={cn(
                                                        "p-4 rounded-xl border-2 transition-all text-center",
                                                        values.revenueRange === range
                                                            ? "border-gold-500 bg-gold-50"
                                                            : "border-slate-50 bg-slate-50 hover:border-gold-200"
                                                    )}
                                                >
                                                    <TrendingUp
                                                        className={cn(
                                                            "w-5 h-5 mx-auto mb-2",
                                                            values.revenueRange === range
                                                                ? "text-gold-600"
                                                                : "text-slate-300"
                                                        )}
                                                    />
                                                    <span className="font-black text-brand-900 uppercase tracking-widest text-xs">
                                                        {range}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em] ml-1">
                                                First Name
                                            </label>
                                            <input
                                                {...register("firstName")}
                                                className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-xl px-4 py-3 transition-all italic"
                                                placeholder="e.g. Maria"
                                            />
                                            {errors.firstName && (
                                                <p className="text-rose-500 text-[10px] font-bold">
                                                    {errors.firstName.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em] ml-1">
                                                Last Name
                                            </label>
                                            <input
                                                {...register("lastName")}
                                                className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-xl px-4 py-3 transition-all italic"
                                                placeholder="e.g. Russo"
                                            />
                                            {errors.lastName && (
                                                <p className="text-rose-500 text-[10px] font-bold">
                                                    {errors.lastName.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em] ml-1">
                                            Business Email
                                        </label>
                                        <input
                                            {...register("email")}
                                            type="email"
                                            className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-xl px-4 py-3 transition-all italic"
                                            placeholder="maria@bellaitalia.com"
                                        />
                                        {errors.email && (
                                            <p className="text-rose-500 text-[10px] font-bold">
                                                {errors.email.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em] ml-1">
                                                Direct Phone
                                            </label>
                                            <input
                                                {...register("phone")}
                                                className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-xl px-4 py-3 transition-all italic"
                                                placeholder="(555) 000-0000"
                                            />
                                            {errors.phone && (
                                                <p className="text-rose-500 text-[10px] font-bold">
                                                    {errors.phone.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em] ml-1">
                                                Restaurant Name
                                            </label>
                                            <input
                                                {...register("companyName")}
                                                className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-xl px-4 py-3 transition-all italic font-bold"
                                                placeholder="Bella Italia Ristorante"
                                            />
                                            {errors.companyName && (
                                                <p className="text-rose-500 text-[10px] font-bold">
                                                    {errors.companyName.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Controls */}
                    <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-100">
                        {step > 1 ? (
                            <button
                                type="button"
                                onClick={handleBack}
                                className="flex items-center gap-2 text-slate-400 font-bold hover:text-brand-900 transition-colors uppercase tracking-[0.2em] text-[10px]"
                            >
                                <ArrowLeft className="w-4 h-4" /> Back
                            </button>
                        ) : (
                            <div className="text-slate-300 uppercase tracking-[0.2em] text-[10px] font-bold italic flex items-center gap-2">
                                <Briefcase size={14} /> Hospitality Specialization
                            </div>
                        )}

                        {step < 8 ? (
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
                                {isSubmitting ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    "Unlock Your Analysis"
                                )}
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Verification Footer */}
            <div className="mt-12 flex justify-center items-center gap-8 opacity-40">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <ShieldCheck size={16} className="text-gold-600" /> Secure Encryption
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <TrendingUp size={16} className="text-gold-600" /> Instant Analysis
                </div>
            </div>
        </div>
    );
};

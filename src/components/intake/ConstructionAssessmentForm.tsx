"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { 
    TrendingUp, 
    Building2, 
    CheckCircle2, 
    ArrowRight, 
    ArrowLeft, 
    Loader2, 
    AlertTriangle,
    ShieldCheck,
    BarChart3,
    Calendar,
    Target,
    Zap,
    Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ConstructionResults } from "./ConstructionResults";
import { normalizeIndustry, normalizeRevenue } from "@/lib/ghl/contract";

const formSchema = z.object({
    revenueRange: z.enum(['Under $250K', '$250K-$500K', '$500K-$1M', '$1M+']),
    jobCosting: z.enum(['No, we don\'t track job-by-job', 'Partially / Inconsistent', 'Yes, fully automated']),
    cashFlow: z.enum(['Never / We just check bank balance', 'Monthly / Quarterly', 'Weekly / Real-time']),
    estimating: z.enum(['Guesswork / Based on intuition', 'Mostly accurate, but we miss things', 'Highly accurate / Data-driven']),
    reviews: z.enum(['Never / Only at tax time', 'Annually / Semi-annually', 'Monthly / Proactive']),
    // Contact Info
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Valid business email required"),
    phone: z.string().min(10, "Valid phone required"),
    companyName: z.string().min(2, "Company name is required"),
});

type FormData = z.infer<typeof formSchema>;

const STEPS = [
    { id: 'revenue', title: 'Revenue Band', description: 'What is your current annual volume?' },
    { id: 'jobCosting', title: 'Job Costing', description: 'Do you track profitability on a per-project basis?' },
    { id: 'cashFlow', title: 'Cash Flow Visibility', description: 'How often do you review your cash flow position?' },
    { id: 'estimating', title: 'Estimating Accuracy', description: 'How confident are you in your project estimates?' },
    { id: 'reviews', title: 'Financial Reviews', description: 'How often do you review your financial performance?' },
    { id: 'contact', title: 'Secure Results', description: 'Where should we send your full blueprint analysis?' },
];

export const ConstructionAssessmentForm = () => {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [finalResults, setFinalResults] = useState<{ score: number; label: string; urgency: string; highIntent: boolean } | null>(null);

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

    // --- Scoring Logic ---
    const calculateScore = (data: FormData) => {
        let score = 0;
        
        // Revenue
        if (data.revenueRange === '$250K-$500K') score += 5;
        else if (data.revenueRange === '$500K-$1M') score += 10;
        else if (data.revenueRange === '$1M+') score += 20;

        // Job Costing
        if (data.jobCosting === 'Partially / Inconsistent') score += 10;
        else if (data.jobCosting === 'Yes, fully automated') score += 15;

        // Cash Flow
        if (data.cashFlow === 'Monthly / Quarterly') score += 10;
        else if (data.cashFlow === 'Weekly / Real-time') score += 15;

        // Estimating
        if (data.estimating === 'Mostly accurate, but we miss things') score += 10;
        else if (data.estimating === 'Highly accurate / Data-driven') score += 15;

        // Reviews
        if (data.reviews === 'Annually / Semi-annually') score += 5;
        else if (data.reviews === 'Monthly / Proactive') score += 15;

        return score;
    };

    const handleNext = async () => {
        let fields: (keyof FormData)[] = [];
        if (step === 1) fields = ['revenueRange'];
        if (step === 2) fields = ['jobCosting'];
        if (step === 3) fields = ['cashFlow'];
        if (step === 4) fields = ['estimating'];
        if (step === 5) fields = ['reviews'];
        
        const isValid = await trigger(fields);
        if (isValid) {
            setDirection(1);
            setStep(s => s + 1);
        }
    };

    const handleBack = () => {
        setDirection(-1);
        setStep(s => s - 1);
    };

    const onSubmit = async (data: FormData) => {
        const score = calculateScore(data);
        let urgency = "PLANNING_ONLY";
        let label = "Strong Foundation";
        
        if (score < 35) {
            urgency = "IMMEDIATE";
            label = "High Risk";
        } else if (score < 60) {
            urgency = "THIS_QUARTER";
            label = "Profit Leaks Present";
        }

        const highIntent = (data.revenueRange === '$500K-$1M' || data.revenueRange === '$1M+') && score < 60;

        const payload = {
            event_type: "CONSTRUCTION_ASSESSMENT_SUBMITTED",
            contact: {
                first_name: data.firstName,
                last_name: data.lastName,
                email: data.email,
                phone: data.phone,
                tags: [
                    "unt-construction-blueprint",
                    `unt-fit-score-${score >= 60 ? 'high' : score >= 35 ? 'medium' : 'low'}`
                ]
            },
            business: {
                business_name: data.companyName,
                industry: "CONSTRUCTION",
                annual_revenue_band: normalizeRevenue(data.revenueRange),
            },
            intent: {
                primary_service_interest: "CONSTRUCTION_BLUEPRINT",
                lead_magnet_type: "CONSTRUCTION_ASSESSMENT",
                urgency: urgency,
                high_intent: highIntent
            },
            results: {
                fit_score: score,
                assessment_label: label
            }
        };

        try {
            const response = await fetch("/api/ghl-intake", {
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
        return <ConstructionResults {...finalResults} />;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-[2.5rem] shadow-[0_32px_80px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden">
                {/* Progress Header */}
                <div className="bg-slate-50/50 border-b border-slate-100 px-8 py-6">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-black text-brand-900/40 uppercase tracking-[0.3em]">Assessment Progress: Step {step}/6</span>
                        <div className="flex gap-1.5">
                            {[1, 2, 3, 4, 5, 6].map(s => (
                                <div 
                                    key={s} 
                                    className={cn(
                                        "h-1.5 rounded-full transition-all duration-500",
                                        step === s ? "w-8 bg-gold-500" : (step > s ? "w-3 bg-brand-900" : "w-3 bg-slate-200")
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
                            <div className="space-y-3">
                                <h2 className="text-3xl font-bold text-brand-900 font-heading tracking-tight uppercase">
                                    {STEPS[step - 1].title}
                                </h2>
                                <p className="text-brand-900/60 text-lg font-light leading-relaxed">
                                    {STEPS[step - 1].description}
                                </p>
                            </div>

                            {/* Step 1: Revenue */}
                            {step === 1 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {['Under $250K', '$250K-$500K', '$500K-$1M', '$1M+'].map((range) => (
                                        <button
                                            key={range}
                                            type="button"
                                            onClick={() => {
                                                setValue("revenueRange", range as any);
                                                handleNext();
                                            }}
                                            className={cn(
                                                "p-6 rounded-2xl border-2 transition-all text-left group",
                                                values.revenueRange === range ? "border-gold-500 bg-gold-50" : "border-slate-50 bg-slate-50 hover:border-gold-200"
                                            )}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-black text-brand-900 uppercase tracking-widest text-sm">{range}</span>
                                                <TrendingUp className={cn("w-5 h-5", values.revenueRange === range ? "text-gold-600" : "text-slate-300")} />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Step 2: Job Costing */}
                            {step === 2 && (
                                <div className="space-y-3">
                                    {['No, we don\'t track job-by-job', 'Partially / Inconsistent', 'Yes, fully automated'].map((opt) => (
                                        <button
                                            key={opt}
                                            type="button"
                                            onClick={() => {
                                                setValue("jobCosting", opt as any);
                                                handleNext();
                                            }}
                                            className={cn(
                                                "w-full p-6 rounded-2xl border-2 transition-all text-left flex items-center justify-between group",
                                                values.jobCosting === opt ? "border-brand-900 bg-brand-900 text-white" : "border-slate-50 bg-slate-50 hover:border-gold-200"
                                            )}
                                        >
                                            <span className="font-bold text-sm">{opt}</span>
                                            <CheckCircle2 className={cn("w-6 h-6", values.jobCosting === opt ? "text-gold-500" : "text-slate-200")} />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Step 3: Cash Flow */}
                            {step === 3 && (
                                <div className="space-y-3">
                                    {['Never / We just check bank balance', 'Monthly / Quarterly', 'Weekly / Real-time'].map((opt) => (
                                        <button
                                            key={opt}
                                            type="button"
                                            onClick={() => {
                                                setValue("cashFlow", opt as any);
                                                handleNext();
                                            }}
                                            className={cn(
                                                "w-full p-6 rounded-2xl border-2 transition-all text-left flex items-center justify-between group",
                                                values.cashFlow === opt ? "border-brand-900 bg-brand-900 text-white" : "border-slate-50 bg-slate-50 hover:border-gold-200"
                                            )}
                                        >
                                            <span className="font-bold text-sm">{opt}</span>
                                            <Calendar className={cn("w-6 h-6", values.cashFlow === opt ? "text-gold-500" : "text-slate-200")} />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Step 4: Estimating */}
                            {step === 4 && (
                                <div className="space-y-3">
                                    {['Guesswork / Based on intuition', 'Mostly accurate, but we miss things', 'Highly accurate / Data-driven'].map((opt) => (
                                        <button
                                            key={opt}
                                            type="button"
                                            onClick={() => {
                                                setValue("estimating", opt as any);
                                                handleNext();
                                            }}
                                            className={cn(
                                                "w-full p-6 rounded-2xl border-2 transition-all text-left flex items-center justify-between group",
                                                values.estimating === opt ? "border-brand-900 bg-brand-900 text-white" : "border-slate-50 bg-slate-50 hover:border-gold-200"
                                            )}
                                        >
                                            <span className="font-bold text-sm">{opt}</span>
                                            <Target className={cn("w-6 h-6", values.estimating === opt ? "text-gold-500" : "text-slate-200")} />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Step 5: Reviews */}
                            {step === 5 && (
                                <div className="space-y-3">
                                    {['Never / Only at tax time', 'Annually / Semi-annually', 'Monthly / Proactive'].map((opt) => (
                                        <button
                                            key={opt}
                                            type="button"
                                            onClick={() => {
                                                setValue("reviews", opt as any);
                                                handleNext();
                                            }}
                                            className={cn(
                                                "w-full p-6 rounded-2xl border-2 transition-all text-left flex items-center justify-between group",
                                                values.reviews === opt ? "border-brand-900 bg-brand-900 text-white" : "border-slate-50 bg-slate-50 hover:border-gold-200"
                                            )}
                                        >
                                            <span className="font-bold text-sm">{opt}</span>
                                            <BarChart3 className={cn("w-6 h-6", values.reviews === opt ? "text-gold-500" : "text-slate-200")} />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Step 6: Contact Info */}
                            {step === 6 && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em] ml-1">First Name</label>
                                            <input {...register("firstName")} className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-xl px-4 py-3 transition-all italic" placeholder="e.g. John" />
                                            {errors.firstName && <p className="text-rose-500 text-[10px] font-bold">{errors.firstName.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em] ml-1">Last Name</label>
                                            <input {...register("lastName")} className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-xl px-4 py-3 transition-all italic" placeholder="e.g. Smith" />
                                            {errors.lastName && <p className="text-rose-500 text-[10px] font-bold">{errors.lastName.message}</p>}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em] ml-1">Business Email</label>
                                        <input {...register("email")} type="email" className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-xl px-4 py-3 transition-all italic" placeholder="john@construction.com" />
                                        {errors.email && <p className="text-rose-500 text-[10px] font-bold">{errors.email.message}</p>}
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em] ml-1">Direct Phone</label>
                                            <input {...register("phone")} className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-xl px-4 py-3 transition-all italic" placeholder="(555) 000-0000" />
                                            {errors.phone && <p className="text-rose-500 text-[10px] font-bold">{errors.phone.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-brand-900/50 uppercase tracking-[0.2em] ml-1">Company Name</label>
                                            <input {...register("companyName")} className="w-full bg-slate-50 border-2 border-transparent focus:border-gold-500/50 focus:bg-white outline-none rounded-xl px-4 py-3 transition-all italic font-bold" placeholder="Smith Builders LLC" />
                                            {errors.companyName && <p className="text-rose-500 text-[10px] font-bold">{errors.companyName.message}</p>}
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
                                <Briefcase size={14} /> Construction Specialization
                            </div>
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
                                className="bg-brand-900 text-white font-black px-10 py-4 rounded-xl flex items-center gap-3 hover:bg-gold-500 hover:text-brand-900 transition-all text-xs uppercase tracking-widest shadow-xl shadow-brand-900/20 disabled:opacity-50 animate-pulse"
                            >
                                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Unlock Blueprint"}
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
                    <Zap size={16} className="text-gold-600" /> Instant Analysis
                </div>
            </div>
        </div>
    );
};

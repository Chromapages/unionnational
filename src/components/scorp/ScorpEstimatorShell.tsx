"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScorpEstimatorInput, ScorpEstimatorInputSchema, ScorpFitLevel } from "@/lib/scorp/schema";
import { ScorpEstimatorProgress } from "./ScorpEstimatorProgress";
import { ScorpEstimatorStepContact } from "./ScorpEstimatorStepContact";
import { ScorpEstimatorStepStructure } from "./ScorpEstimatorStepStructure";
import { ScorpEstimatorStepFinancials } from "./ScorpEstimatorStepFinancials";
import { ScorpEstimatorResult } from "./ScorpEstimatorResult";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

const STEPS = [
    "Contact & Business",
    "Structure & Context",
    "Profit & Payroll",
    "Result"
];

export const ScorpEstimatorShell = () => {
    const isMobile = useMediaQuery("(max-width: 640px)");
    const [step, setStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [result, setResult] = useState<{ fitLevel: ScorpFitLevel; savingsRange: string } | null>(null);

    const methods = useForm<ScorpEstimatorInput>({
        resolver: zodResolver(ScorpEstimatorInputSchema),
        mode: "onBlur",
        defaultValues: {
            full_name: "",
            email: "",
            phone: "",
            business_name: "",
            entity_type: "LLC",
            niche_vertical: "PROFESSIONAL_SERVICES",
            income_subject_to_se_tax: "YES",
            annual_revenue_band: "UNDER_100K",
            estimated_net_profit_range: "UNDER_50K",
            current_payroll_status: "NOT_RUNNING_PAYROLL",
            tax_payroll_readiness: "MEDIUM",
            primary_pain_point: "OVERPAYING_TAXES"
        }
    });

    const { trigger, handleSubmit } = methods;

    // ─── Phase-Based Tracking ────────────────────────────────────────────────
    const trackEvent = (eventName: string, properties: any = {}) => {
        if (typeof window !== "undefined" && (window as any).dataLayer) {
            (window as any).dataLayer.push({
                event: eventName,
                ...properties,
                timestamp: new Date().toISOString()
            });
        }
        console.log(`[Analytics] ${eventName}:`, properties);
    };

    // ─── Data Hygiene ────────────────────────────────────────────────────────
    const normalizePhone = (phone: string) => {
        return phone.replace(/\D/g, ""); // Keep only digits
    };

    const nextStep = async () => {
        let fieldsToValidate: (keyof ScorpEstimatorInput)[] = [];
        
        if (step === 0) {
            fieldsToValidate = ["full_name", "email", "phone", "business_name"];
        } else if (step === 1) {
            fieldsToValidate = ["entity_type", "niche_vertical", "income_subject_to_se_tax"];
        } else if (step === 2) {
            fieldsToValidate = ["annual_revenue_band", "estimated_net_profit_range", "current_payroll_status", "tax_payroll_readiness", "primary_pain_point"];
        }

        const isValid = await trigger(fieldsToValidate);
        if (isValid) {
            trackEvent("estimator_step_completed", { step: step + 1, total_steps: 3 });
            setStep(s => s + 1);
        }
    };

    const prevStep = () => setStep(s => s - 1);

    const onFormSubmit = async (data: ScorpEstimatorInput) => {
        setIsSubmitting(true);
        setSubmitError(null);
        
        trackEvent("estimator_submission_started");

        try {
            // Clean phone data
            const cleanData = {
                ...data,
                phone: normalizePhone(data.phone)
            };

            const response = await fetch("/api/scorp-estimator", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cleanData)
            });

            const resultData = await response.json();

            if (!response.ok) {
                throw new Error(resultData.message || "Failed to calculate estimate");
            }

            setResult({
                fitLevel: resultData.scorp_fit_level,
                savingsRange: resultData.scorp_estimated_savings
            });

            trackEvent("estimator_submitted", {
                fit_level: resultData.scorp_fit_level,
                high_intent: resultData.high_intent_flag
            });

            setStep(3); // Go to result screen
        } catch (err: any) {
            setSubmitError(err.message || "An unexpected error occurred. Please try again.");
            console.error("Submission Error:", err);
            trackEvent("estimator_submission_failed", { error: err.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <FormProvider {...methods}>
            <div className="w-full max-w-4xl mx-auto bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl shadow-brand-900/5 border border-slate-100 p-6 md:p-14 overflow-hidden relative">
                {step < 3 && (
                    <ScorpEstimatorProgress 
                        currentStep={step} 
                        totalSteps={STEPS.length} 
                        stepTitles={STEPS} 
                    />
                )}

                <div className="min-h-[400px] flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                        {step === 0 && <ScorpEstimatorStepContact key="s0" />}
                        {step === 1 && <ScorpEstimatorStepStructure key="s1" />}
                        {step === 2 && <ScorpEstimatorStepFinancials key="s2" />}
                        {step === 3 && result && (
                            <ScorpEstimatorResult 
                                key="s3" 
                                fitLevel={result.fitLevel} 
                                savingsRange={result.savingsRange} 
                            />
                        )}
                    </AnimatePresence>
                </div>

                {step < 3 && (
                    <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-6">
                        <button
                            type="button"
                            onClick={prevStep}
                            disabled={step === 0 || isSubmitting}
                            className={cn(
                                "flex items-center justify-center gap-2 text-slate-400 font-bold uppercase tracking-widest text-[10px] hover:text-brand-900 transition-colors disabled:opacity-0 py-2",
                            )}
                        >
                            <ArrowLeft size={16} />
                            Back
                        </button>

                        <div className="flex flex-col items-end gap-2">
                            {submitError && (
                                <p className="text-red-500 text-xs font-medium flex items-center gap-2 mb-2">
                                    <AlertCircle size={14} />
                                    {submitError}
                                </p>
                            )}
                            
                            <button
                                type="button"
                                onClick={step === 2 ? handleSubmit(onFormSubmit) : nextStep}
                                disabled={isSubmitting}
                                className="w-full sm:w-auto px-10 py-5 bg-brand-500 text-white font-bold rounded-2xl hover:bg-brand-600 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3 group"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin text-gold-500" />
                                        Calculating...
                                    </>
                                ) : (
                                    <>
                                        {step === 2 ? "Get Your Estimate" : "Continue"}
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </FormProvider>
    );
};

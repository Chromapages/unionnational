"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Building2,
    TrendingUp,
    Users,
    Briefcase,
    Landmark,
    ChevronRight,
    Loader2,
    CheckCircle2,
    Activity,
    ArrowRight,
    Mail,
} from "lucide-react";

type Step = 1 | 2 | 3 | 4;

interface FormData {
    entityType: string;
    revenueRange: string;
    email: string;
}

interface BusinessHealthAssessmentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const entityTypes = [
    { id: "llc", label: "LLC", icon: Building2, description: "Limited Liability Company" },
    { id: "s-corp", label: "S-Corporation", icon: TrendingUp, description: "Pass-through entity" },
    { id: "c-corp", label: "C-Corporation", icon: Landmark, description: "Traditional corporation" },
    { id: "sole-prop", label: "Sole Proprietorship", icon: Briefcase, description: "Single owner business" },
    { id: "partnership", label: "Partnership", icon: Users, description: "Multi-owner business" },
];

const revenueRanges = [
    { id: "0-100k", label: "$0 - $100K", description: "Startup / Early stage" },
    { id: "100k-500k", label: "$100K - $500K", description: "Growing business" },
    { id: "500k-1m", label: "$500K - $1M", description: "Established business" },
    { id: "1m-5m", label: "$1M - $5M", description: "Scaling business" },
    { id: "5m+", label: "$5M+", description: "Enterprise level" },
];

const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
};

export const BusinessHealthAssessmentModal = ({
    isOpen,
    onClose,
}: BusinessHealthAssessmentModalProps) => {
    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [formData, setFormData] = useState<FormData>({
        entityType: "",
        revenueRange: "",
        email: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    const handleClose = () => {
        onClose();
        // Reset after animation
        setTimeout(() => {
            setCurrentStep(1);
            setFormData({ entityType: "", revenueRange: "", email: "" });
            setStatus("idle");
        }, 300);
    };

    const handleEntitySelect = (entityId: string) => {
        setFormData((prev) => ({ ...prev, entityType: entityId }));
        setTimeout(() => setCurrentStep(2), 300);
    };

    const handleRevenueSelect = (revenueId: string) => {
        setFormData((prev) => ({ ...prev, revenueRange: revenueId }));
        setTimeout(() => setCurrentStep(3), 300);
    };

    const handleAnalysisComplete = () => {
        setCurrentStep(4);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.email) return;

        setStatus("loading");

        // Mock API call - simulate submission
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setStatus("success");
    };

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    const progressWidth = ((currentStep - 1) / 3) * 100;

    const modalContent = (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-brand-950/90 backdrop-blur-md"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-xl bg-brand-900 border border-gold-500/30 rounded-3xl shadow-2xl overflow-hidden ring-1 ring-white/10"
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors z-20"
                    aria-label="Close modal"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Progress Bar */}
                <div className="relative h-1 bg-brand-800">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold-500 to-gold-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressWidth}%` }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                </div>

                <div className="relative z-10 p-8 md:p-10">
                    <AnimatePresence mode="wait">
                        {status === "success" ? (
                            <motion.div
                                key="success"
                                variants={stepVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="flex flex-col items-center text-center py-8"
                            >
                                <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 ring-1 ring-emerald-500/20">
                                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-3 font-heading">
                                    Assessment Complete!
                                </h3>
                                <p className="text-slate-400 mb-8 max-w-sm mx-auto font-sans leading-relaxed">
                                    Thank you for completing the assessment. Our team will review your
                                    business profile and contact you within 24 hours with personalized
                                    recommendations.
                                </p>
                                <button
                                    onClick={handleClose}
                                    className="px-8 py-3 bg-gold-500 text-brand-950 font-bold rounded-xl hover:bg-gold-400 transition-all"
                                >
                                    Done
                                </button>
                            </motion.div>
                        ) : (
                            <>
                                {/* Step 1: Entity Type */}
                                {currentStep === 1 && (
                                    <motion.div
                                        key="step1"
                                        variants={stepVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
                                                <Building2 className="w-5 h-5 text-gold-500" />
                                            </div>
                                            <span className="text-xs font-bold text-gold-500 uppercase tracking-widest">
                                                Step 1 of 3
                                            </span>
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 font-heading">
                                            What&apos;s your business entity type?
                                        </h2>
                                        <p className="text-slate-400 mb-8 font-sans">
                                            Select your current business structure to help us understand your
                                            tax situation.
                                        </p>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {entityTypes.map((entity) => (
                                                <button
                                                    key={entity.id}
                                                    onClick={() => handleEntitySelect(entity.id)}
                                                    className="group p-4 rounded-xl bg-brand-950/50 border border-gold-500/20 hover:border-gold-500/50 hover:bg-gold-500/5 transition-all text-left"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-10 h-10 rounded-lg bg-brand-800 flex items-center justify-center shrink-0 group-hover:bg-gold-500/20 transition-colors">
                                                            <entity.icon className="w-5 h-5 text-slate-400 group-hover:text-gold-500 transition-colors" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-white group-hover:text-gold-400 transition-colors">
                                                                {entity.label}
                                                            </h3>
                                                            <p className="text-xs text-slate-500 mt-0.5">
                                                                {entity.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 2: Revenue Range */}
                                {currentStep === 2 && (
                                    <motion.div
                                        key="step2"
                                        variants={stepVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
                                                <TrendingUp className="w-5 h-5 text-gold-500" />
                                            </div>
                                            <span className="text-xs font-bold text-gold-500 uppercase tracking-widest">
                                                Step 2 of 3
                                            </span>
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 font-heading">
                                            What&apos;s your annual revenue?
                                        </h2>
                                        <p className="text-slate-400 mb-8 font-sans">
                                            This helps us determine the complexity of your tax situation and
                                            potential savings opportunities.
                                        </p>

                                        <div className="space-y-3">
                                            {revenueRanges.map((range) => (
                                                <button
                                                    key={range.id}
                                                    onClick={() => handleRevenueSelect(range.id)}
                                                    className="group w-full p-4 rounded-xl bg-brand-950/50 border border-gold-500/20 hover:border-gold-500/50 hover:bg-gold-500/5 transition-all flex items-center justify-between"
                                                >
                                                    <div className="text-left">
                                                        <h3 className="font-bold text-white group-hover:text-gold-400 transition-colors text-lg">
                                                            {range.label}
                                                        </h3>
                                                        <p className="text-xs text-slate-500 mt-0.5">
                                                            {range.description}
                                                        </p>
                                                    </div>
                                                    <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-gold-500 transition-colors" />
                                                </button>
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => setCurrentStep(1)}
                                            className="mt-6 text-sm text-slate-500 hover:text-gold-500 transition-colors flex items-center gap-1"
                                        >
                                            ← Back to Entity Type
                                        </button>
                                    </motion.div>
                                )}

                                {/* Step 3: Analyzing */}
                                {currentStep === 3 && (
                                    <AnalyzingStep onComplete={handleAnalysisComplete} />
                                )}

                                {/* Step 4: Email Capture */}
                                {currentStep === 4 && (
                                    <motion.div
                                        key="step4"
                                        variants={stepVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        transition={{ duration: 0.3 }}
                                        className="text-center"
                                    >
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/10">
                                            <Activity className="w-8 h-8 text-emerald-500" />
                                        </div>

                                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 font-heading">
                                            Your Business Health Score: <span className="text-emerald-400">Ready for Optimization</span>
                                        </h2>

                                        <p className="text-slate-400 mb-8 max-w-md mx-auto font-sans leading-relaxed">
                                            Based on your {entityTypes.find(e => e.id === formData.entityType)?.label} structure
                                            and {revenueRanges.find(r => r.id === formData.revenueRange)?.label.toLowerCase()} revenue,
                                            we&apos;ve identified significant tax savings opportunities for your business.
                                        </p>

                                        <div className="bg-brand-950/50 border border-gold-500/20 rounded-xl p-6 mb-8">
                                            <h3 className="text-lg font-bold text-white mb-4 font-heading flex items-center gap-2">
                                                <Mail className="w-5 h-5 text-gold-500" />
                                                Get Your Detailed Assessment
                                            </h3>
                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <input
                                                    type="email"
                                                    placeholder="Enter your business email"
                                                    value={formData.email}
                                                    onChange={(e) =>
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            email: e.target.value,
                                                        }))
                                                    }
                                                    required
                                                    className="w-full bg-brand-900 border border-gold-500/30 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/50 transition-all font-sans text-center"
                                                />
                                                <button
                                                    type="submit"
                                                    disabled={status === "loading"}
                                                    className="w-full bg-gold-500 text-brand-950 font-bold py-3.5 rounded-xl hover:bg-gold-400 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20"
                                                >
                                                    {status === "loading" ? (
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                    ) : (
                                                        <>
                                                            Get My Assessment <ArrowRight className="w-4 h-4" />
                                                        </>
                                                    )}
                                                </button>
                                            </form>
                                            <p className="text-xs text-slate-500 mt-4">
                                                Free assessment. No obligation. We respect your privacy.
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => setCurrentStep(2)}
                                            className="text-sm text-slate-500 hover:text-gold-500 transition-colors"
                                        >
                                            ← Back to Revenue
                                        </button>
                                    </motion.div>
                                )}
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );

    return typeof window !== "undefined"
        ? createPortal(modalContent, document.body)
        : null;
};

// Analyzing Step Component
function AnalyzingStep({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            key="step3"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center text-center py-12"
        >
            <div className="relative mb-8">
                <div className="w-24 h-24 rounded-full bg-brand-800 flex items-center justify-center">
                    <Loader2 className="w-10 h-10 text-gold-500 animate-spin" />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-gold-500/20 border-t-gold-500 animate-spin" style={{ animationDuration: '1.5s' }} />
            </div>

            <h2 className="text-2xl font-bold text-white mb-3 font-heading">
                Analyzing Your Business Profile...
            </h2>

            <p className="text-slate-400 mb-8 max-w-sm mx-auto font-sans">
                We&apos;re evaluating your entity structure, revenue range, and industry benchmarks to identify
                optimization opportunities.
            </p>

            {/* Progress Bar */}
            <div className="w-full max-w-xs">
                <div className="h-2 bg-brand-800 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                    />
                </div>
                <p className="text-xs text-slate-500 mt-2 text-center">
                    {progress < 30 && "Analyzing entity structure..."}
                    {progress >= 30 && progress < 60 && "Evaluating revenue optimization..."}
                    {progress >= 60 && progress < 90 && "Checking compliance requirements..."}
                    {progress >= 90 && "Finalizing recommendations..."}
                </p>
            </div>
        </motion.div>
    );
}

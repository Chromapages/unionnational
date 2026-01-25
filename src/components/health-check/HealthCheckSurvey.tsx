"use client";

import { useState, useMemo, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, PieChart, ShieldAlert, BarChart3, CheckCircle2 } from "lucide-react";

import { InsightPanel } from "./InsightPanel";
import { QuestionCard } from "./QuestionCard";
import { ResultDashboard } from "./ResultDashboard";
import { useHealthScore, type HealthCategory } from "./useHealthScore";
import { ResultVaultPreview } from "./ResultVaultPreview";
import { SecureLeadCapture } from "./SecureLeadCapture";

type Tier = "critical" | "stable" | "growth";
type ModuleStatus = "idle" | "active" | "complete";

interface Option {
    label: string;
    value: number;
    description?: string;
}

interface Question {
    id: number;
    category: HealthCategory;
    question: string;
    description?: string;
    options: Option[];
}

const QUESTIONS: Question[] = [
    {
        id: 1,
        category: "entity",
        question: "What type of business entity do you operate?",
        description: "Your entity structure determines your tax liability and protection level.",
        options: [
            { label: "S-Corp", value: 15, description: "Pass-through taxation, potential SE tax savings" },
            { label: "LLC (Single or Partnership)", value: 10, description: "Flexible, but potentially higher SE taxes" },
            { label: "C-Corp", value: 8, description: "Double taxation potential, but good for scaling" },
            { label: "Sole Proprietorship", value: 3, description: "Simplest, but highest personal liability & tax" },
            { label: "Not sure / Other", value: 0, description: "Let's figure this out immediately" },
        ],
    },
    {
        id: 2,
        category: "compliance",
        question: "Have you filed all federal & state tax returns for the last 3 years?",
        description: "Consistency with the IRS is the foundation of financial health.",
        options: [
            { label: "Yes, all filed on time", value: 20 },
            { label: "Filed, but some were late", value: 10 },
            { label: "Missing 1-2 returns", value: 0 },
            { label: "Missing more than 2 returns", value: -10 },
            { label: "Not sure", value: 0 },
        ],
    },
    {
        id: 3,
        category: "compliance",
        question: "Do you currently owe back taxes to the IRS or state?",
        options: [
            { label: "No outstanding tax debt", value: 15 },
            { label: "Yes, under $10k", value: 10 },
            { label: "Yes, $10k - $50k", value: 5 },
            { label: "Yes, over $50k", value: 0 },
            { label: "Not sure", value: 3 },
        ],
    },
    {
        id: 4,
        category: "operations",
        question: "How often do you review your financial statements?",
        description: "You can't manage what you don't measure.",
        options: [
            { label: "Monthly", value: 15 },
            { label: "Quarterly", value: 10 },
            { label: "Annually (at tax time)", value: 5 },
            { label: "Rarely / Never", value: 0 },
        ],
    },
    {
        id: 5,
        category: "operations",
        question: "Do you separate personal and business expenses?",
        options: [
            { label: "Always (separate accounts)", value: 12 },
            { label: "Usually (rarely mixed)", value: 8 },
            { label: "Sometimes (occasional mixing)", value: 4 },
            { label: "No (completely mixed)", value: 0 },
        ],
    },
    {
        id: 6,
        category: "operations",
        question: "What system do you use to track business expenses?",
        options: [
            { label: "Accounting Software (QBO, Xero)", value: 12 },
            { label: "Spreadsheets", value: 8 },
            { label: "Shoebox / Receipts", value: 3 },
            { label: "No system", value: 0 },
        ],
    },
    {
        id: 7,
        category: "operations",
        question: "Do you engage in proactive tax planning?",
        description: "Tax planning happens before year-end, not after.",
        options: [
            { label: "Year-round with a pro", value: 11 },
            { label: "Some year-end planning", value: 6 },
            { label: "No proactive planning", value: 0 },
        ],
    },
];

const categoryCopy: Record<HealthCategory, { title: string; description: string }> = {
    entity: {
        title: "Entity Efficiency",
        description: "The right structure protects your profit and reduces IRS exposure.",
    },
    compliance: {
        title: "Compliance Readiness",
        description: "Accurate filings prevent penalties and keep leverage in your favor.",
    },
    operations: {
        title: "Operational Maturity",
        description: "Disciplined operations create a financial runway for growth.",
    },
};

const tierLabel: Record<Tier, string> = {
    critical: "High Risk",
    stable: "Moderate",
    growth: "Growth Ready",
};

const leadCaptureStep = QUESTIONS.length + 1;
const resultsStep = QUESTIONS.length + 2;

export function HealthCheckSurvey() {
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const scores = useHealthScore(answers, QUESTIONS);

    const tier = useMemo<Tier>(() => {
        if (scores.total <= 40) return "critical";
        if (scores.total <= 70) return "stable";
        return "growth";
    }, [scores.total]);

    const categoryTotals = useMemo(() => {
        return QUESTIONS.reduce<Record<HealthCategory, number>>(
            (acc, question) => {
                acc[question.category] += 1;
                return acc;
            },
            { entity: 0, compliance: 0, operations: 0 }
        );
    }, []);

    const answeredCounts = useMemo(() => {
        return QUESTIONS.reduce<Record<HealthCategory, number>>(
            (acc, question) => {
                if (answers[question.id] !== undefined) acc[question.category] += 1;
                return acc;
            },
            { entity: 0, compliance: 0, operations: 0 }
        );
    }, [answers]);

    const activeCategory = step > 0 && step <= QUESTIONS.length ? QUESTIONS[step - 1].category : null;

    const statusModules: { label: string; status: ModuleStatus }[] = [
        {
            label: "Entity",
            status:
                answeredCounts.entity >= categoryTotals.entity
                    ? "complete"
                    : activeCategory === "entity"
                      ? "active"
                      : "idle",
        },
        {
            label: "Compliance",
            status:
                answeredCounts.compliance >= categoryTotals.compliance
                    ? "complete"
                    : activeCategory === "compliance"
                      ? "active"
                      : "idle",
        },
        {
            label: "Operations",
            status:
                answeredCounts.operations >= categoryTotals.operations
                    ? "complete"
                    : activeCategory === "operations"
                      ? "active"
                      : "idle",
        },
    ];

    const handleStart = useCallback(() => {
        setDirection(1);
        setStep(1);
    }, []);

    const handleOptionSelect = useCallback((qId: number, value: number) => {
        setAnswers((prev) => ({ ...prev, [qId]: value }));
        setDirection(1);
        setTimeout(() => setStep((prev) => prev + 1), 400);
    }, []);

    const handleBack = useCallback(() => {
        if (step > 0) {
            setDirection(-1);
            setStep((prev) => prev - 1);
        }
    }, [step]);

    const handleFormSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            setIsSubmitting(true);

            try {
                const response = await fetch("/api/survey", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        phone: formData.phone,
                        answers,
                        score: scores.total,
                    }),
                });

                const data = await response.json();

                if (!data.success) {
                    console.error("Survey submission failed:", data.error);
                }
            } catch (error) {
                console.error("Survey submission error:", error);
            }

            setIsSubmitting(false);
            setDirection(1);
            setStep(resultsStep);
        },
        [answers, formData, scores.total]
    );

    const insightMetrics = [
        { label: "Entity", value: scores.entity },
        { label: "Compliance", value: scores.compliance },
        { label: "Operations", value: scores.operations },
        { label: "Total", value: scores.total },
    ];

    const introRight = (
        <div className="h-full w-full bg-slate-50 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
            <div className="max-w-xl mx-auto w-full">
                <div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl shadow-brand-900/5 border border-slate-100">
                    <h3 className="text-xs uppercase tracking-[0.3em] text-slate-400 text-center">The Live Audit</h3>
                    <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-brand-900 text-center">
                        Financial Diagnostic
                    </h1>
                    <p className="mt-4 text-base sm:text-lg text-slate-500 text-center">
                        Premium-grade insight across entity structure, compliance, and operations in under 2 minutes.
                    </p>
                    <div className="mt-6 space-y-3">
                        {[
                            { label: "Entity Structure Efficiency", icon: PieChart },
                            { label: "IRS Compliance Status", icon: ShieldAlert },
                            { label: "Operational Maturity", icon: BarChart3 },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
                            >
                                <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-sm text-brand-500">
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <span className="font-semibold text-slate-700">{item.label}</span>
                                <CheckCircle2 className="w-5 h-5 ml-auto text-emerald-500" />
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={handleStart}
                        className="mt-8 w-full group inline-flex items-center justify-center rounded-2xl bg-brand-900 px-6 py-4 text-base sm:text-lg font-bold font-heading text-white shadow-xl shadow-brand-900/20 transition hover:-translate-y-0.5 hover:bg-brand-800"
                    >
                        Start Diagnostic
                        <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="mt-4 text-center text-[10px] uppercase tracking-[0.3em] text-slate-400">
                        No Credit Card Required
                    </p>
                </div>
            </div>
        </div>
    );

    const progress = step > 0 && step <= QUESTIONS.length ? step / QUESTIONS.length : undefined;

    const leftPanel = (
        <AnimatePresence mode="wait" initial={false}>
            {step === 0 && (
                <InsightPanel
                    key="insight-intro"
                    eyebrow="Live Audit"
                    title="Financial Diagnostic"
                    description="Answer seven precision questions to surface risks and unlock growth leverage."
                    detail="Estimated time: 2 minutes"
                    modules={statusModules}
                    metrics={[
                        { label: "Questions", value: QUESTIONS.length },
                        { label: "Live Score", value: scores.total },
                    ]}
                />
            )}

            {step > 0 && step <= QUESTIONS.length && activeCategory && (
                <InsightPanel
                    key={`insight-${step}`}
                    eyebrow="Live Audit"
                    title={categoryCopy[activeCategory].title}
                    description={categoryCopy[activeCategory].description}
                    detail={`Question ${step} of ${QUESTIONS.length}`}
                    modules={statusModules}
                    metrics={insightMetrics}
                    pulseKey={Object.keys(answers).length}
                />
            )}

            {step === leadCaptureStep && (
                <ResultVaultPreview key="insight-lock" name={formData.firstName} />
            )}

            {step === resultsStep && (
                <InsightPanel
                    key="insight-results"
                    eyebrow="Live Audit"
                    title="Final Audit Score"
                    description="Your financial snapshot is calibrated. Review the report and next step."
                    detail="Summary generated"
                    modules={statusModules}
                    score={scores.total}
                    tierLabel={tierLabel[tier]}
                    pulseKey={Object.keys(answers).length}
                />
            )}
        </AnimatePresence>
    );

    const rightPanel = (
        <AnimatePresence mode="wait" initial={false}>
            {step === 0 && <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {introRight}
            </motion.div>}

            {step > 0 && step <= QUESTIONS.length && (
                <QuestionCard
                    key={`question-${step}`}
                    step={step}
                    totalSteps={QUESTIONS.length}
                    question={QUESTIONS[step - 1].question}
                    description={QUESTIONS[step - 1].description}
                    options={QUESTIONS[step - 1].options}
                    selectedValue={answers[QUESTIONS[step - 1].id]}
                    direction={direction}
                    onSelect={(value) => handleOptionSelect(QUESTIONS[step - 1].id, value)}
                    onBack={handleBack}
                />
            )}

            {step === leadCaptureStep && (
                <motion.div key="capture" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <SecureLeadCapture
                        formData={formData}
                        setFormData={setFormData}
                        isSubmitting={isSubmitting}
                        onSubmit={handleFormSubmit}
                    />
                </motion.div>
            )}

            {step === resultsStep && (
                <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <ResultDashboard scores={scores} tier={tier} name={formData.firstName} />
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <div className="w-full max-w-[1400px] mx-auto py-8 px-4 md:px-8">
            <div className="relative grid grid-cols-1 md:grid-cols-12 min-h-fit md:min-h-[640px] lg:min-h-[720px] bg-white rounded-2xl sm:rounded-3xl lg:rounded-[3rem] shadow-2xl overflow-hidden border border-slate-200">
                {typeof progress === "number" && (
                    <div className="absolute top-0 inset-x-0 h-1.5 bg-white/20 z-50">
                        <motion.div
                            className="h-full bg-gold-400"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                    </div>
                )}
                <div className="md:col-span-5 order-1">{leftPanel}</div>
                <div className="md:col-span-7 order-2">{rightPanel}</div>
            </div>
        </div>
    );
}

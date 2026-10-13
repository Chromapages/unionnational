"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, PieChart, ShieldAlert, BarChart3, CheckCircle2 } from "lucide-react";

import { InsightPanel } from "./InsightPanel";
import { QuestionCard } from "./QuestionCard";
import { ResultDashboard } from "./ResultDashboard";
import { useHealthScore, type HealthCategory } from "./useHealthScore";
import { ResultVaultPreview } from "./ResultVaultPreview";
import { SecureLeadCapture } from "./SecureLeadCapture";
import { getHealthScoreCategory, HEALTH_QUESTIONS, HEALTH_ANSWER_CONTRACT_VERSION } from "@/lib/intake/health-score";

type ModuleStatus = "idle" | "active" | "complete";

const QUESTIONS = HEALTH_QUESTIONS;

const leadCaptureStep = QUESTIONS.length + 1;
const resultsStep = QUESTIONS.length + 2;

export function HealthCheckSurvey() {
    const locale = useLocale();
    const t = useTranslations("HealthCheck");
    const submissionId = useRef(crypto.randomUUID());
    const inFlight = useRef(false);
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [answerOptionIds, setAnswerOptionIds] = useState<Record<number, string>>({});
    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const answerTransition = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => () => {
        if (answerTransition.current !== null) clearTimeout(answerTransition.current);
    }, []);

    const scores = useHealthScore(answers);

    const tier = getHealthScoreCategory(scores.total);

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

    const statusModules: { category: HealthCategory; label: string; status: ModuleStatus }[] = [
        {
            category: "entity",
            label: t("categories.entity"),
            status:
                answeredCounts.entity >= categoryTotals.entity
                    ? "complete"
                    : activeCategory === "entity"
                        ? "active"
                        : "idle",
        },
        {
            category: "compliance",
            label: t("categories.compliance"),
            status:
                answeredCounts.compliance >= categoryTotals.compliance
                    ? "complete"
                    : activeCategory === "compliance"
                        ? "active"
                        : "idle",
        },
        {
            category: "operations",
            label: t("categories.operations"),
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

    const handleOptionSelect = useCallback((qId: number, optionId: string) => {
        if (answerTransition.current !== null) return;
        const option = QUESTIONS.find(question => question.id === qId)?.options.find(option => option.id === optionId);
        if (!option) return;
        setAnswers((prev) => ({ ...prev, [qId]: option.value }));
        setAnswerOptionIds((prev) => ({ ...prev, [qId]: option.id }));
        setDirection(1);
        setIsTransitioning(true);
        answerTransition.current = setTimeout(() => {
            answerTransition.current = null;
            setIsTransitioning(false);
            setStep(qId + 1);
        }, 400);
    }, []);

    const handleBack = useCallback(() => {
        if (answerTransition.current !== null) {
            clearTimeout(answerTransition.current);
            answerTransition.current = null;
            setIsTransitioning(false);
        }
        if (step > 0) {
            setDirection(-1);
            setStep((prev) => prev - 1);
        }
    }, [step]);

    const handleFormSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            if (inFlight.current) return;
            inFlight.current = true;
            setIsSubmitting(true);
            setSubmitError(null);

            try {
                const response = await fetch("/api/survey", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    signal: AbortSignal.timeout(12_000),
                    body: JSON.stringify({
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        phone: formData.phone,
                        answers,
                        answer_option_ids: answerOptionIds,
                        answer_contract_version: HEALTH_ANSWER_CONTRACT_VERSION,
                        score: scores.total,
                        locale,
                        source_page: window.location.pathname,
                        submission_id: submissionId.current,
                    }),
                });

                const data = await response.json();
                if (!response.ok || data.success !== true) throw new Error("Survey delivery failed");
                setDirection(1);
                setStep(resultsStep);
            } catch {
                setSubmitError(t("submissionError"));
            } finally {
                inFlight.current = false;
                setIsSubmitting(false);
            }
        },
        [answers, answerOptionIds, formData, scores.total, locale, t]
    );

    const insightMetrics = [
        { label: t("categories.entity"), value: scores.entity },
        { label: t("categories.compliance"), value: scores.compliance },
        { label: t("categories.operations"), value: scores.operations },
        { label: t("categories.total"), value: scores.total },
    ];

    const introRight = (
        <div className="h-full w-full bg-slate-50 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
            <div className="max-w-xl mx-auto w-full">
                <div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl shadow-brand-900/5 border border-slate-100">
                    <h3 className="text-xs uppercase tracking-[0.3em] text-slate-500 text-center font-bold">{t("eyebrow")}</h3>
                    <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-brand-900 text-center">
                        {t("title")}
                    </h1>
                    <p className="mt-4 text-base sm:text-lg text-slate-500 text-center">
                        {t("intro")}
                    </p>
                    <div className="mt-6 space-y-3">
                        {[
                            { label: t("areas.entity"), icon: PieChart },
                            { label: t("areas.compliance"), icon: ShieldAlert },
                            { label: t("areas.operations"), icon: BarChart3 },
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
                        {t("start")}
                        <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="mt-4 text-center text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold">
                        {t("noCard")}
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
                    eyebrow={t("eyebrow")}
                    title={t("title")}
                    description={t("introDetail")}
                    detail={t("sevenQuestions")}
                    modules={statusModules}
                    metrics={[
                        { label: t("questionsLabel"), value: QUESTIONS.length },
                        { label: t("liveScore"), value: scores.total },
                    ]}
                />
            )}

            {step > 0 && step <= QUESTIONS.length && activeCategory && (
                <InsightPanel
                    key={`insight-${step}`}
                    eyebrow={t("eyebrow")}
                    title={t(`categoryCopy.${activeCategory}.title`)}
                    description={t(`categoryCopy.${activeCategory}.description`)}
                    detail={t("questionStep", {step, total: QUESTIONS.length})}
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
                    eyebrow={t("eyebrow")}
                    title={t("assessmentScore")}
                    description={t("summaryDescription")}
                    detail={t("generated")}
                    modules={statusModules}
                    score={scores.total}
                    tierLabel={t(`tiers.${tier}`)}
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
                    question={t(`questions.${QUESTIONS[step - 1].id}.question`)}
                    description={QUESTIONS[step - 1].description ? t(`questions.${QUESTIONS[step - 1].id}.description`) : undefined}
                    options={QUESTIONS[step - 1].options.map(option => ({
                        ...option,
                        label: t(`questions.${QUESTIONS[step - 1].id}.options.${option.id}.label`),
                        description: option.description ? t(`questions.${QUESTIONS[step - 1].id}.options.${option.id}.description`) : undefined,
                    }))}
                    selectedOptionId={answerOptionIds[QUESTIONS[step - 1].id]}
                    direction={direction}
                    disabled={isTransitioning}
                    onSelect={(optionId) => handleOptionSelect(QUESTIONS[step - 1].id, optionId)}
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
                    {submitError && <p role="alert" className="mt-4 text-rose-700">{submitError}</p>}
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

"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AlertCircle, ArrowLeft, ArrowRight, Building2, CheckCircle2, Handshake, Shield, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { submitContactForm } from "@/app/[locale]/contact/actions";
import { trackMetaEvent } from "@/components/seo/MetaPixel";

const contactFormSchema = z.object({
    _hpt: z.string().optional(),
    goal: z.enum(["tax-reduction", "audit-defense", "restructure", "partnership", "industry-inquiry"], { message: "Please select a primary goal." }),
    clientType: z.enum(["business", "individual"]),
    firstName: z.string().trim().min(2, "First name is required").max(100),
    lastName: z.string().trim().min(2, "Last name is required").max(100),
    email: z.string().trim().email("Please enter a valid email address").max(254),
    phone: z.string().trim().max(30).optional(),
    message: z.string().trim().max(2_000).optional(),
    privacy: z.literal(true, { message: "You must agree to the privacy policy" }),
});

type ContactData = z.infer<typeof contactFormSchema>;
type ConsultationGoal = ContactData["goal"];
type SubmissionState = { status: "idle" | "success" | "error"; message?: string };

export function MultiStepContactForm({ title, subtitle, industry }: { title?: string; subtitle?: string; industry?: "restaurants" | "construction" }) {
    const t = useTranslations(industry ? "IndustryContact" : "ContactPage.MultiStepForm");
    const locale = useLocale();
    const [submissionId] = useState(() => crypto.randomUUID());
    const [step, setStep] = useState<1 | 2 | 3>(industry ? 3 : 1);
    const [submission, setSubmission] = useState<SubmissionState>({ status: "idle" });
    const [selectedGoal, setSelectedGoal] = useState<ConsultationGoal | null>(industry ? "industry-inquiry" : null);
    const [goalError, setGoalError] = useState(false);
    const stepHeadingRef = useRef<HTMLHeadingElement>(null);
    const successHeadingRef = useRef<HTMLHeadingElement>(null);
    const inFlight = useRef(false);
    const previousStep = useRef(step);

    useEffect(() => {
        if (previousStep.current !== step) stepHeadingRef.current?.focus();
        previousStep.current = step;
    }, [step]);

    useEffect(() => {
        if (submission.status === "success") successHeadingRef.current?.focus();
    }, [submission.status]);

    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<ContactData>({
        resolver: zodResolver(contactFormSchema),
        mode: "onBlur",
        defaultValues: { clientType: "business", ...(industry ? { goal: "industry-inquiry" as const } : {}) },
    });

    const goals = industry ? [] : [
        { id: "tax-reduction", label: t("step1.goals.taxReduction"), helper: t("step1.helpers.taxReduction"), icon: TrendingDown },
        { id: "audit-defense", label: t("step1.goals.auditDefense"), helper: t("step1.helpers.auditDefense"), icon: Shield },
        { id: "restructure", label: t("step1.goals.restructure"), helper: t("step1.helpers.restructure"), icon: Building2 },
        { id: "partnership", label: t("step1.goals.partnership"), helper: t("step1.helpers.partnership"), icon: Handshake },
    ] as const;
    const selected = goals.find((goal) => goal.id === selectedGoal);

    const selectGoal = (goal: ConsultationGoal) => {
        setSelectedGoal(goal);
        setGoalError(false);
        setValue("goal", goal, { shouldValidate: true, shouldDirty: true });
    };

    const goTo = (nextStep: 1 | 2 | 3) => {
        setStep(nextStep);
    };

    const confirmGoal = () => {
        if (!selectedGoal) {
            setGoalError(true);
            document.getElementById("consultation-goal-tax-reduction")?.focus();
            return;
        }
        setValue("goal", selectedGoal, { shouldValidate: true, shouldDirty: true });
        goTo(2);
    };

    const onValid = async (data: ContactData) => {
        if (inFlight.current) return;
        inFlight.current = true;
        setSubmission({ status: "idle" });
        const fd = new FormData();
        Object.entries(data).forEach(([key, value]) => fd.append(key, String(value ?? "")));
        fd.append("locale", locale);
        fd.append("submissionId", submissionId);
        if (industry) fd.append("industry", industry);
        try {
            const result = await submitContactForm(null, fd);
            if (result.status === "success") {
                trackMetaEvent("Lead", { content_name: "Contact Form", content_category: industry || data.goal });
                setSubmission({ status: "success" });
            } else if (result.status === "error") {
                setSubmission({ status: "error", message: industry ? undefined : result.message });
            } else {
                setSubmission({ status: "error" });
            }
        } catch {
            setSubmission({ status: "error" });
        } finally {
            inFlight.current = false;
        }
    };

    const fieldClass = (invalid: boolean) => cn(
        "min-h-12 w-full rounded-lg border bg-white px-4 py-3 text-sm text-brand-900 outline-none transition focus-visible:ring-2",
        industry ? "placeholder:text-slate-700 focus-visible:ring-brand-900 focus-visible:ring-offset-2 focus-visible:border-brand-900" : "focus-visible:ring-gold-500/30",
        industry ? invalid ? "border-rose-700" : "border-slate-700" : invalid ? "border-rose-500" : "border-slate-200 focus-visible:border-gold-500"
    );

    if (submission.status === "success") {
        return (
            <div className="flex min-h-[430px] flex-col items-center justify-center rounded-3xl border border-emerald-200 bg-white p-8 text-center shadow-2xl" role="status" aria-live="polite">
                <CheckCircle2 className="h-14 w-14 text-emerald-600" aria-hidden="true" />
                <h2 ref={successHeadingRef} tabIndex={-1} className="mt-5 font-heading text-3xl font-bold text-brand-900">{t("success.title")}</h2>
                <p className={cn("mt-3 max-w-md leading-7", industry ? "text-slate-700" : "text-slate-600")}>{t("success.message")}</p>
                {!industry && <p className="mt-5 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">{t("success.responseTime")}</p>}
            </div>
        );
    }

    return (
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 text-brand-900 shadow-2xl sm:p-8">
            <form onSubmit={handleSubmit(onValid)} noValidate>
                <input type="text" {...register("_hpt")} tabIndex={-1} autoComplete="off" aria-hidden="true" className="pointer-events-none absolute -inset-full opacity-0" />
                <input type="hidden" {...register("clientType")} />
                <input type="hidden" {...register("goal")} value={selectedGoal ?? ""} />

                {!industry && <div className="mb-7" aria-label={t("progressLabel")}>
                    <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                        <span>{t("stepCount", { current: step, total: 3 })}</span>
                        <span>{Math.round((step / 3) * 100)}%</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2" aria-hidden="true">
                        {[1, 2, 3].map((item) => <span key={item} className={cn("h-1.5 rounded-full", item <= step ? "bg-gold-500" : "bg-slate-200")} />)}
                    </div>
                </div>}

                {step === 1 && (
                        <div>
                            <h2 ref={stepHeadingRef} tabIndex={-1} className="font-heading text-2xl font-bold sm:text-3xl">{title || t("step1.fallbackTitle")}</h2>
                            <p className="mt-2 text-sm leading-6 text-slate-600">{subtitle || t("step1.fallbackSubtitle")}</p>
                            <div className="mt-6 grid gap-3" role="radiogroup" aria-label={t("step1.fallbackTitle")} aria-invalid={goalError} aria-describedby={goalError ? "consultation-goal-error" : undefined}>
                                {goals.map(({ id, label, helper, icon: Icon }) => (
                                    <label key={id} htmlFor={`consultation-goal-${id}`} className={cn("relative z-10 flex min-h-[72px] w-full cursor-pointer select-none items-start gap-3 rounded-xl border-2 p-4 text-left transition focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-gold-500", selectedGoal === id ? "border-gold-500 bg-gold-50" : "border-slate-100 hover:border-gold-300")}>
                                        <input
                                            id={`consultation-goal-${id}`}
                                            type="radio"
                                            value={id}
                                            name="consultation-goal"
                                            checked={selectedGoal === id}
                                            onChange={() => selectGoal(id)}
                                            className="sr-only"
                                        />
                                        <span className={cn("mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", selectedGoal === id ? "bg-gold-500 text-brand-950" : "bg-slate-100 text-slate-600")}><Icon className="h-5 w-5" aria-hidden="true" /></span>
                                        <span><span className="block text-sm font-bold">{label}</span><span className="mt-1 block text-xs leading-5 text-slate-600">{helper}</span></span>
                                        {selectedGoal === id && <CheckCircle2 className="ml-auto h-5 w-5 shrink-0 text-gold-600" aria-hidden="true" />}
                                    </label>
                                ))}
                            </div>
                            {(goalError || errors.goal) && <p id="consultation-goal-error" className="mt-3 flex items-center gap-2 text-sm text-rose-600" role="alert"><AlertCircle className="h-4 w-4" />{t("step1.errorMessage")}</p>}
                            <button type="button" onClick={confirmGoal} className="relative z-20 mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-900 px-5 font-bold text-white transition hover:bg-gold-500 hover:text-brand-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500">
                                {t("step1.continueButton")}<ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </button>
                        </div>
                )}

                {step === 2 && selected && (
                        <div className="py-2">
                            <button type="button" onClick={() => goTo(1)} className="mb-6 flex min-h-11 items-center gap-2 text-sm font-bold text-slate-500 hover:text-brand-900 focus-visible:outline-2 focus-visible:outline-gold-500"><ArrowLeft className="h-4 w-4" />{t("step2.backButton")}</button>
                            <div className="rounded-2xl border border-gold-200 bg-gold-50 p-5">
                                <CheckCircle2 className="h-8 w-8 text-gold-600" aria-hidden="true" />
                                <p className="mt-4 text-xs font-bold uppercase tracking-widest text-gold-700">{t("confirmation.eyebrow")}</p>
                                <h2 ref={stepHeadingRef} tabIndex={-1} className="mt-2 font-heading text-2xl font-bold">{selected.label}</h2>
                                <p className="mt-2 text-sm leading-6 text-slate-600">{selected.helper}</p>
                            </div>
                            <p className="mt-6 text-sm leading-6 text-slate-600">{t("confirmation.next")}</p>
                            <button type="button" onClick={() => goTo(3)} className="relative z-20 mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-900 px-5 font-bold text-white transition hover:bg-gold-500 hover:text-brand-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500">{t("confirmation.continue")}<ArrowRight className="h-4 w-4" /></button>
                        </div>
                )}

                {step === 3 && (
                        <div>
                            {!industry && <button type="button" onClick={() => goTo(2)} className="mb-4 flex min-h-11 items-center gap-2 text-sm font-bold text-slate-500 hover:text-brand-900 focus-visible:outline-2 focus-visible:outline-gold-500"><ArrowLeft className="h-4 w-4" />{t("step2.backButton")}</button>}
                            <h2 ref={stepHeadingRef} tabIndex={-1} className="font-heading text-2xl font-bold">{industry && title || t("step2.title")}</h2>
                            <p className={cn("mt-2 text-sm", industry ? "text-slate-700" : "text-slate-600")}>{industry && subtitle || t("step2.subtitle")}</p>
                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <Field id="firstName" label={t("step2.labels.firstName")} error={errors.firstName?.message && t("validation.firstNameRequired")}><input id="firstName" autoComplete="given-name" {...register("firstName")} aria-invalid={Boolean(errors.firstName)} aria-describedby={errors.firstName ? "firstName-error" : undefined} className={fieldClass(Boolean(errors.firstName))} placeholder={t("step2.placeholders.firstName")} /></Field>
                                <Field id="lastName" label={t("step2.labels.lastName")} error={errors.lastName?.message && t("validation.lastNameRequired")}><input id="lastName" autoComplete="family-name" {...register("lastName")} aria-invalid={Boolean(errors.lastName)} aria-describedby={errors.lastName ? "lastName-error" : undefined} className={fieldClass(Boolean(errors.lastName))} placeholder={t("step2.placeholders.lastName")} /></Field>
                                <Field id="email" label={t("step2.labels.email")} error={errors.email?.message && t("validation.emailInvalid")}><input id="email" type="email" autoComplete="email" {...register("email")} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} className={fieldClass(Boolean(errors.email))} placeholder={t("step2.placeholders.email")} /></Field>
                                <Field id="phone" label={t("step2.labels.phone")} error={errors.phone?.message && (industry ? t("validation.phoneInvalid") : errors.phone.message)}><input id="phone" type="tel" autoComplete="tel" maxLength={30} {...register("phone")} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} className={fieldClass(Boolean(errors.phone))} placeholder={t("step2.placeholders.phone")} /></Field>
                            </div>
                            <Field id="message" label={t("step2.labels.message")} error={errors.message?.message && (industry ? t("validation.messageInvalid") : errors.message.message)} className="mt-4"><textarea id="message" rows={2} maxLength={2_000} {...register("message")} aria-invalid={Boolean(errors.message)} aria-describedby={[industry && "message-warning", errors.message && "message-error"].filter(Boolean).join(" ") || undefined} className={cn(fieldClass(Boolean(errors.message)), "resize-y")} placeholder={t("step2.placeholders.message")} /></Field>
                            {industry && <p id="message-warning" className="mt-2 text-xs leading-5 text-slate-700">{t("messageWarning")}</p>}
                            <label className={cn("mt-4 flex cursor-pointer items-start gap-3 text-xs leading-5", industry ? "min-h-11 text-slate-700" : "text-slate-600")}><input type="checkbox" {...register("privacy")} aria-invalid={Boolean(errors.privacy)} aria-describedby={errors.privacy ? "privacy-error" : undefined} className={cn("mt-1 h-5 w-5 shrink-0 accent-brand-900", industry && "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-900")} /><span>{t.rich("step2.privacyText", { privacyLink: (chunks) => <Link href="/legal/privacy-policy" className={cn("font-semibold underline", industry && "inline-flex min-h-11 items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-900")}>{chunks}</Link> })}</span></label>
                            {errors.privacy && <p id="privacy-error" className="mt-1 text-xs text-rose-600" role="alert">{t("validation.privacyRequired")}</p>}
                            {submission.status === "error" && <p className="mt-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-700" role="alert">{submission.message || t("errorMessage")}</p>}
                            <button type="submit" disabled={isSubmitting} className={cn("mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gold-500 px-5 font-bold text-brand-950 transition hover:bg-gold-400 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60", industry ? "focus-visible:outline-brand-900" : "focus-visible:outline-gold-500")}>{isSubmitting ? t("step2.sending") : industry && submission.status === "error" ? t("step2.retryButton") : t("step2.submitButton")} {!isSubmitting && <ArrowRight className="h-4 w-4" />}</button>
                            <p className={cn("mt-3 text-center text-xs leading-5", industry ? "text-slate-700" : "text-slate-500")}>{t("microcopy")}</p>
                        </div>
                )}

                {step < 3 && <p className="mt-5 text-center text-xs leading-5 text-slate-500">{t("microcopy")}</p>}
            </form>
        </div>
    );
}

function Field({ id, label, error, className, children }: { id: string; label: string; error?: string | false; className?: string; children: React.ReactNode }) {
    return <div className={className}><label htmlFor={id} className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-600">{label}</label>{children}{error && <p id={`${id}-error`} className="mt-1 text-xs text-rose-600" role="alert">{error}</p>}</div>;
}

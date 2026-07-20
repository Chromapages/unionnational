"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AlertCircle, ArrowLeft, ArrowRight, Building2, CheckCircle2, Handshake, Shield, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { submitContactForm } from "@/app/[locale]/contact/actions";
import { trackMetaEvent } from "@/components/seo/MetaPixel";

const contactFormSchema = z.object({
    _hpt: z.string().optional(),
    goal: z.enum(["tax-reduction", "audit-defense", "restructure", "partnership"], { message: "Please select a primary goal." }),
    clientType: z.enum(["business", "individual"]),
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().optional(),
    message: z.string().optional(),
    privacy: z.literal(true, { message: "You must agree to the privacy policy" }),
});

type ContactData = z.infer<typeof contactFormSchema>;
type ConsultationGoal = ContactData["goal"];
type SubmissionState = { status: "idle" | "success" | "error"; message?: string };

export function MultiStepContactForm({ title, subtitle }: { title?: string; subtitle?: string }) {
    const t = useTranslations("ContactPage.MultiStepForm");
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [submission, setSubmission] = useState<SubmissionState>({ status: "idle" });
    const [selectedGoal, setSelectedGoal] = useState<ConsultationGoal | null>(null);
    const [goalError, setGoalError] = useState(false);

    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<ContactData>({
        resolver: zodResolver(contactFormSchema),
        mode: "onBlur",
        defaultValues: { clientType: "business" },
    });

    const goals = [
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
            return;
        }
        setValue("goal", selectedGoal, { shouldValidate: true, shouldDirty: true });
        goTo(2);
    };

    const onValid = async (data: ContactData) => {
        setSubmission({ status: "idle" });
        const fd = new FormData();
        Object.entries(data).forEach(([key, value]) => fd.append(key, String(value ?? "")));
        const result = await submitContactForm(null, fd);
        if (result.status === "success") {
            trackMetaEvent("Lead", { content_name: "Contact Form", content_category: data.goal });
            setSubmission({ status: "success" });
        } else if (result.status === "error") {
            setSubmission({ status: "error", message: result.message });
        } else {
            setSubmission({ status: "error" });
        }
    };

    const fieldClass = (invalid: boolean) => cn(
        "min-h-12 w-full rounded-lg border bg-white px-4 py-3 text-sm text-brand-900 outline-none transition focus-visible:ring-2 focus-visible:ring-gold-500/30",
        invalid ? "border-rose-500" : "border-slate-200 focus-visible:border-gold-500"
    );

    if (submission.status === "success") {
        return (
            <div className="flex min-h-[430px] flex-col items-center justify-center rounded-3xl border border-emerald-200 bg-white p-8 text-center shadow-2xl" role="status" aria-live="polite">
                <CheckCircle2 className="h-14 w-14 text-emerald-600" aria-hidden="true" />
                <h2 className="mt-5 font-heading text-3xl font-bold text-brand-900">{t("success.title")}</h2>
                <p className="mt-3 max-w-md leading-7 text-slate-600">{t("success.message")}</p>
                <p className="mt-5 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">{t("success.responseTime")}</p>
            </div>
        );
    }

    return (
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 text-brand-900 shadow-2xl sm:p-8">
            <form onSubmit={handleSubmit(onValid)} noValidate>
                <input type="text" {...register("_hpt")} tabIndex={-1} autoComplete="off" aria-hidden="true" className="pointer-events-none absolute -inset-full opacity-0" />
                <input type="hidden" {...register("clientType")} />
                <input type="hidden" {...register("goal")} value={selectedGoal ?? ""} />

                <div className="mb-7" aria-label={t("progressLabel")}>
                    <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                        <span>{t("stepCount", { current: step, total: 3 })}</span>
                        <span>{Math.round((step / 3) * 100)}%</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2" aria-hidden="true">
                        {[1, 2, 3].map((item) => <span key={item} className={cn("h-1.5 rounded-full", item <= step ? "bg-gold-500" : "bg-slate-200")} />)}
                    </div>
                </div>

                {step === 1 && (
                        <div>
                            <h2 className="font-heading text-2xl font-bold sm:text-3xl">{title || t("step1.fallbackTitle")}</h2>
                            <p className="mt-2 text-sm leading-6 text-slate-600">{subtitle || t("step1.fallbackSubtitle")}</p>
                            <div className="mt-6 grid gap-3" role="radiogroup" aria-label={t("step1.fallbackTitle")}>
                                {goals.map(({ id, label, helper, icon: Icon }) => (
                                    <label key={id} htmlFor={`consultation-goal-${id}`} onClick={() => selectGoal(id)} className={cn("relative z-10 flex min-h-[72px] w-full cursor-pointer select-none items-start gap-3 rounded-xl border-2 p-4 text-left transition focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-gold-500", selectedGoal === id ? "border-gold-500 bg-gold-50" : "border-slate-100 hover:border-gold-300")}>
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
                            {(goalError || errors.goal) && <p className="mt-3 flex items-center gap-2 text-sm text-rose-600" role="alert"><AlertCircle className="h-4 w-4" />{t("step1.errorMessage")}</p>}
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
                                <h2 className="mt-2 font-heading text-2xl font-bold">{selected.label}</h2>
                                <p className="mt-2 text-sm leading-6 text-slate-600">{selected.helper}</p>
                            </div>
                            <p className="mt-6 text-sm leading-6 text-slate-600">{t("confirmation.next")}</p>
                            <button type="button" onClick={() => goTo(3)} className="relative z-20 mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-900 px-5 font-bold text-white transition hover:bg-gold-500 hover:text-brand-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500">{t("confirmation.continue")}<ArrowRight className="h-4 w-4" /></button>
                        </div>
                )}

                {step === 3 && (
                        <div>
                            <button type="button" onClick={() => goTo(2)} className="mb-4 flex min-h-11 items-center gap-2 text-sm font-bold text-slate-500 hover:text-brand-900 focus-visible:outline-2 focus-visible:outline-gold-500"><ArrowLeft className="h-4 w-4" />{t("step2.backButton")}</button>
                            <h2 className="font-heading text-2xl font-bold">{t("step2.title")}</h2>
                            <p className="mt-2 text-sm text-slate-600">{t("step2.subtitle")}</p>
                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <Field id="firstName" label={t("step2.labels.firstName")} error={errors.firstName?.message && t("validation.firstNameRequired")}><input id="firstName" autoComplete="given-name" {...register("firstName")} className={fieldClass(Boolean(errors.firstName))} placeholder={t("step2.placeholders.firstName")} /></Field>
                                <Field id="lastName" label={t("step2.labels.lastName")} error={errors.lastName?.message && t("validation.lastNameRequired")}><input id="lastName" autoComplete="family-name" {...register("lastName")} className={fieldClass(Boolean(errors.lastName))} placeholder={t("step2.placeholders.lastName")} /></Field>
                                <Field id="email" label={t("step2.labels.email")} error={errors.email?.message && t("validation.emailInvalid")}><input id="email" type="email" autoComplete="email" {...register("email")} className={fieldClass(Boolean(errors.email))} placeholder={t("step2.placeholders.email")} /></Field>
                                <Field id="phone" label={t("step2.labels.phone")}><input id="phone" type="tel" autoComplete="tel" {...register("phone")} className={fieldClass(false)} placeholder={t("step2.placeholders.phone")} /></Field>
                            </div>
                            <Field id="message" label={t("step2.labels.message")} className="mt-4"><textarea id="message" rows={2} {...register("message")} className={cn(fieldClass(false), "resize-y")} placeholder={t("step2.placeholders.message")} /></Field>
                            <label className="mt-4 flex cursor-pointer items-start gap-3 text-xs leading-5 text-slate-600"><input type="checkbox" {...register("privacy")} className="mt-1 h-5 w-5 shrink-0 accent-brand-900" /><span>{t.rich("step2.privacyText", { privacyLink: (chunks) => <Link href="/legal/privacy-policy" className="font-semibold underline">{chunks}</Link> })}</span></label>
                            {errors.privacy && <p className="mt-1 text-xs text-rose-600" role="alert">{t("validation.privacyRequired")}</p>}
                            {submission.status === "error" && <p className="mt-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-700" role="alert">{submission.message || t("errorMessage")}</p>}
                            <button type="submit" disabled={isSubmitting} className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gold-500 px-5 font-bold text-brand-950 transition hover:bg-gold-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 disabled:opacity-60">{isSubmitting ? t("step2.sending") : t("step2.submitButton")} {!isSubmitting && <ArrowRight className="h-4 w-4" />}</button>
                            <p className="mt-3 text-center text-xs leading-5 text-slate-500">{t("microcopy")}</p>
                        </div>
                )}

                {step < 3 && <p className="mt-5 text-center text-xs leading-5 text-slate-500">{t("microcopy")}</p>}
            </form>
        </div>
    );
}

function Field({ id, label, error, className, children }: { id: string; label: string; error?: string | false; className?: string; children: React.ReactNode }) {
    return <div className={className}><label htmlFor={id} className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-600">{label}</label>{children}{error && <p className="mt-1 text-xs text-rose-600" role="alert">{error}</p>}</div>;
}

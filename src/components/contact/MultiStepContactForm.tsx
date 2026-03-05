"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
    TrendingDown,
    Shield,
    Building2,
    Handshake,
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";

// --- Form Schema & Types ---
const contactFormSchema = z.object({
    goal: z.enum(['tax-reduction', 'audit-defense', 'restructure', 'partnership'], {
        message: "Please select a primary goal.",
    }),
    clientType: z.enum(['business', 'individual']),
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().optional(),
    message: z.string().optional(),
    privacy: z.literal(true, {
        message: "You must agree to the privacy policy",
    }),
});

type FormData = z.infer<typeof contactFormSchema>;

interface MultiStepContactFormProps {
    title?: string;
    subtitle?: string;
}

export function MultiStepContactForm({ title, subtitle }: MultiStepContactFormProps) {
    const t = useTranslations("ContactPage.MultiStepForm");
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(0);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        trigger,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(contactFormSchema),
        mode: "onChange",
        defaultValues: {
            clientType: 'business',
        },
    });

    const selectedGoal = watch("goal");

    const goals = [
        { id: 'tax-reduction', label: t("step1.goals.taxReduction"), icon: TrendingDown },
        { id: 'audit-defense', label: t("step1.goals.auditDefense"), icon: Shield },
        { id: 'restructure', label: t("step1.goals.restructure"), icon: Building2 },
        { id: 'partnership', label: t("step1.goals.partnership"), icon: Handshake },
    ] as const;

    // --- Handlers ---
    const handleGoalSelect = (goalId: FormData['goal']) => {
        setValue("goal", goalId, { shouldValidate: true });
    };

    const handleNext = async () => {
        const isGoalValid = await trigger("goal");
        if (isGoalValid) {
            setDirection(1);
            setStep(2);
        }
    };

    const handleBack = () => {
        setDirection(-1);
        setStep(1);
    };

    const onSubmit = async (data: FormData) => {
        await new Promise(resolve => setTimeout(resolve, 1500));
        alert("Message sent! (Simulated)");
    };

    // --- Variatns for Animation ---
    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0,
        }),
        center: { x: 0, opacity: 1 },
        exit: (direction: number) => ({
            x: direction < 0 ? 50 : -50,
            opacity: 0,
        }),
    };

    return (
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-100 shadow-xl relative overflow-hidden">
            {/* Top Decoration */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gold-500/5 rounded-bl-full -mr-10 -mt-10 pointer-events-none" />

            <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 w-full">
                {/* Progress Bar */}
                <div className="flex items-center gap-2 mb-8">
                    <div className={cn("h-1 flex-1 rounded-full transition-colors duration-500", step >= 1 ? "bg-gold-500" : "bg-slate-200")} />
                    <div className={cn("h-1 flex-1 rounded-full transition-colors duration-500", step >= 2 ? "bg-gold-500" : "bg-slate-200")} />
                </div>

                <AnimatePresence mode="wait" custom={direction}>
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="space-y-6"
                        >
                            <div>
                                <h2 className="text-2xl font-bold text-brand-900 font-heading mb-2">
                                    {title || t("step1.fallbackTitle")}
                                </h2>
                                <p className="text-brand-900/60 font-sans text-sm">
                                    {subtitle || t("step1.fallbackSubtitle")}
                                </p>
                            </div>

                            {errors.goal && (
                                <div className="flex items-center gap-2 text-rose-500 text-sm bg-rose-50 p-3 rounded-lg border border-rose-100">
                                    <AlertCircle className="w-4 h-4" />
                                    {t("step1.errorMessage")}
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {goals.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => handleGoalSelect(item.id)}
                                        className={cn(
                                            "cursor-pointer group relative p-4 rounded-xl border-2 transition-all duration-200 flex flex-col gap-3",
                                            selectedGoal === item.id
                                                ? "border-gold-500 bg-gold-50/50"
                                                : "border-slate-100 hover:border-gold-500/30 hover:bg-slate-50"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                                            selectedGoal === item.id ? "bg-gold-500 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-gold-100 group-hover:text-gold-600"
                                        )}>
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className={cn(
                                            "font-sans font-semibold text-sm",
                                            selectedGoal === item.id ? "text-brand-900" : "text-brand-900/80"
                                        )}>
                                            {item.label}
                                        </span>

                                        {/* Checkmark for selected state */}
                                        {selectedGoal === item.id && (
                                            <div className="absolute top-3 right-3 text-gold-500">
                                                <CheckCircle2 className="w-5 h-5" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={handleNext}
                                disabled={!selectedGoal}
                                className="w-full bg-brand-900 text-white font-bold py-3.5 rounded-lg hover:bg-gold-500 hover:text-brand-900 transition-all shadow-lg shadow-brand-900/10 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                            >
                                {t("step1.continueButton")}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>

                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="space-y-6"
                        >
                            <div>
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="flex items-center gap-1 text-xs font-semibold text-brand-900/50 hover:text-gold-600 uppercase tracking-wide mb-4 transition-colors"
                                >
                                    <ArrowLeft className="w-3 h-3" /> {t("step2.backButton")}
                                </button>
                                <h2 className="text-2xl font-bold text-brand-900 font-heading mb-2">{t("step2.title")}</h2>
                                <p className="text-brand-900/60 font-sans text-sm">{t("step2.subtitle")}</p>
                            </div>

                            {/* Client Type */}
                            <div className="flex bg-slate-100 p-1 rounded-lg w-fit">
                                {(['business', 'individual'] as const).map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setValue('clientType', type)}
                                        className={cn(
                                            "px-4 py-1.5 rounded-md text-sm font-medium transition-all capitalize",
                                            watch('clientType') === type
                                                ? "bg-white text-brand-900 shadow-sm"
                                                : "text-brand-900/60 hover:text-brand-900"
                                        )}
                                    >
                                        {t(`step2.clientTypes.${type}`)}
                                    </button>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label htmlFor="firstName" className="text-xs font-semibold text-slate-700 uppercase tracking-wide">{t("step2.labels.firstName")}</label>
                                    <input
                                        {...register("firstName")}
                                        className={cn(
                                            "w-full bg-white border rounded-lg px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400",
                                            errors.firstName
                                                ? "border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                                                : "border-slate-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                                        )}
                                        placeholder={t("step2.placeholders.firstName")}
                                    />
                                    {errors.firstName && <span className="text-xs text-rose-500">{t("validation.firstNameRequired")}</span>}
                                </div>
                                <div className="space-y-1.5">
                                    <label htmlFor="lastName" className="text-xs font-semibold text-slate-700 uppercase tracking-wide">{t("step2.labels.lastName")}</label>
                                    <input
                                        {...register("lastName")}
                                        className={cn(
                                            "w-full bg-white border rounded-lg px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400",
                                            errors.lastName
                                                ? "border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                                                : "border-slate-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                                        )}
                                        placeholder={t("step2.placeholders.lastName")}
                                    />
                                    {errors.lastName && <span className="text-xs text-rose-500">{t("validation.lastNameRequired")}</span>}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="email" className="text-xs font-semibold text-slate-700 uppercase tracking-wide">{t("step2.labels.email")}</label>
                                <input
                                    type="email"
                                    {...register("email")}
                                    className={cn(
                                        "w-full bg-white border rounded-lg px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400",
                                        errors.email
                                            ? "border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                                            : "border-slate-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                                    )}
                                    placeholder={t("step2.placeholders.email")}
                                />
                                {errors.email && <span className="text-xs text-rose-500">{t("validation.emailInvalid")}</span>}
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="message" className="text-xs font-semibold text-slate-700 uppercase tracking-wide">{t("step2.labels.message")}</label>
                                <textarea
                                    {...register("message")}
                                    rows={3}
                                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 resize-none"
                                    placeholder={t("step2.placeholders.message")}
                                />
                            </div>

                            {/* Privacy Checkbox */}
                            <div className="flex items-start gap-3 pt-2">
                                <div className="relative flex items-center mt-1">
                                    <input
                                        type="checkbox"
                                        {...register("privacy")}
                                        id="privacy"
                                        className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-slate-300 bg-white checked:border-brand-900 checked:bg-brand-900 transition-all"
                                    />
                                    <CheckCircle2 className="pointer-events-none absolute left-0 top-0 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity p-0.5" />
                                </div>
                                <label htmlFor="privacy" className="text-xs text-brand-900/70 leading-relaxed cursor-pointer select-none">
                                    {t.rich("step2.privacyText", {
                                        privacyLink: (chunks) => <Link href="/privacy" className="underline decoration-slate-300 hover:text-brand-900">{chunks}</Link>
                                    })}
                                </label>
                            </div>
                            {errors.privacy && <span className="text-xs text-rose-500 block -mt-1">{t("validation.privacyRequired")}</span>}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-brand-900 text-white font-bold py-3.5 rounded-lg hover:bg-gold-500 hover:text-brand-900 transition-all shadow-lg shadow-brand-900/10 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed mt-6"
                            >
                                {isSubmitting ? t("step2.sending") : t("step2.submitButton")}
                                {!isSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                            </button>

                        </motion.div>
                    )}
                </AnimatePresence>

            </form>
        </div>
    );
}

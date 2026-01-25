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

const goals = [
    { id: 'tax-reduction', label: 'Reduce my tax liability', icon: TrendingDown },
    { id: 'audit-defense', label: 'Defend an IRS audit', icon: Shield },
    { id: 'restructure', label: 'Restructure my business', icon: Building2 },
    { id: 'partnership', label: 'Explore a partnership', icon: Handshake },
] as const;

interface MultiStepContactFormProps {
    title?: string;
    subtitle?: string;
}

export function MultiStepContactForm({ title, subtitle }: MultiStepContactFormProps) {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(0); // -1 for back, 1 for next

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        trigger,
        formState: { errors, isSubmitting, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(contactFormSchema),
        mode: "onChange",
        defaultValues: {
            clientType: 'business',
        },
    });

    const selectedGoal = watch("goal");

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
        // Simulate API call
        console.log("Form Data:", data);
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
                                    {title || "What's your primary goal?"}
                                </h2>
                                <p className="text-brand-900/60 font-sans text-sm">
                                    {subtitle || "Select the option that best describes your needs."}
                                </p>
                            </div>

                            {errors.goal && (
                                <div className="flex items-center gap-2 text-rose-500 text-sm bg-rose-50 p-3 rounded-lg border border-rose-100">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.goal.message}
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
                                Continue
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
                                    <ArrowLeft className="w-3 h-3" /> Back
                                </button>
                                <h2 className="text-2xl font-bold text-brand-900 font-heading mb-2">A few details about you.</h2>
                                <p className="text-brand-900/60 font-sans text-sm">We'll use this to prepare for our conversation.</p>
                            </div>

                            {/* Client Type */}
                            <div className="flex bg-slate-100 p-1 rounded-lg w-fit">
                                {['business', 'individual'].map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setValue('clientType', type as any)}
                                        className={cn(
                                            "px-4 py-1.5 rounded-md text-sm font-medium transition-all capitalize",
                                            watch('clientType') === type
                                                ? "bg-white text-brand-900 shadow-sm"
                                                : "text-brand-900/60 hover:text-brand-900"
                                        )}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label htmlFor="firstName" className="text-xs font-semibold text-slate-700 uppercase tracking-wide">First Name</label>
                                    <input
                                        {...register("firstName")}
                                        className={cn(
                                            "w-full bg-white border rounded-lg px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400",
                                            errors.firstName
                                                ? "border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                                                : "border-slate-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                                        )}
                                        placeholder="Jane"
                                    />
                                    {errors.firstName && <span className="text-xs text-rose-500">{errors.firstName.message}</span>}
                                </div>
                                <div className="space-y-1.5">
                                    <label htmlFor="lastName" className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Last Name</label>
                                    <input
                                        {...register("lastName")}
                                        className={cn(
                                            "w-full bg-white border rounded-lg px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400",
                                            errors.lastName
                                                ? "border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                                                : "border-slate-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                                        )}
                                        placeholder="Doe"
                                    />
                                    {errors.lastName && <span className="text-xs text-rose-500">{errors.lastName.message}</span>}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="email" className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Work Email</label>
                                <input
                                    type="email"
                                    {...register("email")}
                                    className={cn(
                                        "w-full bg-white border rounded-lg px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400",
                                        errors.email
                                            ? "border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                                            : "border-slate-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                                    )}
                                    placeholder="jane@company.com"
                                />
                                {errors.email && <span className="text-xs text-rose-500">{errors.email.message}</span>}
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="message" className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Message (Optional)</label>
                                <textarea
                                    {...register("message")}
                                    rows={3}
                                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 resize-none"
                                    placeholder="Tell us a bit about your situation..."
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
                                    I agree to the <a href="/privacy" className="underline decoration-slate-300 hover:text-brand-900">Privacy Policy</a> and consent to being contacted. We honor your privacy and never share data.
                                </label>
                            </div>
                            {errors.privacy && <span className="text-xs text-rose-500 block -mt-1">{errors.privacy.message}</span>}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-brand-900 text-white font-bold py-3.5 rounded-lg hover:bg-gold-500 hover:text-brand-900 transition-all shadow-lg shadow-brand-900/10 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed mt-6"
                            >
                                {isSubmitting ? "Sending..." : "Request Consultation"}
                                {!isSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                            </button>

                        </motion.div>
                    )}
                </AnimatePresence>

            </form>
        </div>
    );
}

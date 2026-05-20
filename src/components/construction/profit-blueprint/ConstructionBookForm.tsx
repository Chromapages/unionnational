"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    email: z.string().email("Valid email required"),
    phone: z.string().min(10, "Valid phone number required"),
});

type FormData = z.infer<typeof formSchema>;

interface ConstructionBookFormProps {
    className?: string;
    campaign?: string;
}

export function ConstructionBookForm({ className, campaign }: ConstructionBookFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setErrorMessage(null);

        const payload = {
            event_type: "CONSTRUCTION_CHECKLIST_SUBMITTED",
            contact: {
                first_name: data.firstName,
                email: data.email,
                phone: data.phone,
                tags: ["LM_Construction_ProfitLeakChecklist", "Interest_Construction"],
            },
            intent: {
                lead_magnet_type: "CONSTRUCTION_PROFIT_LEAK_CHECKLIST",
                primary_service_interest: "CONSTRUCTION_BLUEPRINT",
            },
            business: {
                industry: "CONSTRUCTION",
            },
            tracking: {
                utm_source: campaign || "meta_ads",
            },
            meta: {
                version: "1.0",
                submitted_at: new Date().toISOString(),
            },
        };

        try {
            const response = await fetch("/api/ghl/intake", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error("Failed to submit");
            setIsSuccess(true);
        } catch (error) {
            console.error("Book download form submission error:", error);
            setErrorMessage("There was an error submitting your request. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn("bg-white rounded-2xl border border-slate-200 shadow-xl p-8 sm:p-10 text-center", className)}
            >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 ring-2 ring-gold-500 ring-offset-4">
                    <CheckCircle2 className="w-8 h-8 text-green-700" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-brand-900 mb-3">
                    Check Your Inbox
                </h3>
                <p className="text-brand-700 font-medium">
                    Your Profit Leak Checklist is on the way.
                </p>
            </motion.div>
        );
    }

    return (
        <div className={cn("bg-white rounded-2xl border border-slate-200 shadow-xl p-8 sm:p-10", className)}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1.5">
                        First Name
                    </label>
                    <input
                        id="firstName"
                        type="text"
                        autoComplete="given-name"
                        placeholder="Jane"
                        {...register("firstName")}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-brand-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500 transition-colors text-sm"
                    />
                    {errors.firstName && (
                        <p className="mt-1.5 text-xs text-red-600">{errors.firstName.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="jane@company.com"
                        {...register("email")}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-brand-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500 transition-colors text-sm"
                    />
                    {errors.email && (
                        <p className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1.5">
                        Phone Number
                    </label>
                    <input
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="(555) 555-5555"
                        {...register("phone")}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-brand-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500 transition-colors text-sm"
                    />
                    {errors.phone && (
                        <p className="mt-1.5 text-xs text-red-600">{errors.phone.message}</p>
                    )}
                </div>

                {errorMessage && (
                    <p className="text-sm text-red-600 bg-red-50 rounded-xl p-4">{errorMessage}</p>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-gold-500 hover:bg-gold-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-brand-900 font-bold font-heading rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        "Send Me the Profit Leak Checklist"
                    )}
                </button>

                <p className="text-xs text-slate-400 text-center flex items-center justify-center gap-1.5">
                        <Lock className="w-3 h-3" />
                        We respect your privacy. No spam, ever.
                    </p>
            </form>
        </div>
    );
}
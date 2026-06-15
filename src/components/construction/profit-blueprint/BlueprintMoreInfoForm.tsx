"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, Lock, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    email: z.string().email("Valid email required"),
    phone: z.string().min(10, "Valid phone number required"),
    businessName: z.string().min(1, "Business name is required"),
    state: z.string().min(1, "State is required"),
    message: z.string().min(1, "Please enter your question").max(500, "Message too long"),
});

type FormData = z.infer<typeof formSchema>;

interface BlueprintMoreInfoFormProps {
    className?: string;
}

export function BlueprintMoreInfoForm({ className }: BlueprintMoreInfoFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setErrorMessage(null);

        const payload = {
            event_type: "BLUEPRINT_MORE_INFO_REQUEST",
            contact: {
                first_name: data.firstName,
                email: data.email,
                phone: data.phone,
                tags: ["LM_Blueprint_MoreInfo", "Interest_Construction"],
            },
            intent: {
                lead_magnet_type: "BLUEPRINT_MORE_INFO",
                primary_service_interest: "CONSTRUCTION_BLUEPRINT",
                message: data.message,
            },
            business: {
                business_name: data.businessName,
                industry: "CONSTRUCTION",
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
            reset();
        } catch (error) {
            console.error("Blueprint more info form submission error:", error);
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
                className={cn("bg-brand-800 border border-gold-500/20 rounded-2xl p-8 sm:p-10 text-center", className)}
            >
                <div className="w-16 h-16 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-gold-500" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-white mb-3">
                    Message Sent
                </h3>
                <p className="text-slate-300">
                    We'll be in touch shortly to answer your questions.
                </p>
            </motion.div>
        );
    }

    return (
        <div className={cn("bg-brand-800 border border-gold-500/20 rounded-2xl p-8 sm:p-10", className)}>
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gold-500/20 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-gold-500" />
                </div>
                <div>
                    <h3 className="text-xl font-heading font-bold text-white">
                        Have Questions?
                    </h3>
                    <p className="text-sm text-slate-400">
                        Send us a message and we'll get back to you within 24 hours.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-slate-300 mb-1.5">
                            First Name
                        </label>
                        <input
                            id="firstName"
                            type="text"
                            autoComplete="given-name"
                            placeholder="Jane"
                            {...register("firstName")}
                            className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-brand-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500 transition-colors text-sm"
                        />
                        {errors.firstName && (
                            <p className="mt-1.5 text-xs text-red-400">{errors.firstName.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            placeholder="jane@company.com"
                            {...register("email")}
                            className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-brand-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500 transition-colors text-sm"
                        />
                        {errors.email && (
                            <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-1.5">
                            Phone Number
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            autoComplete="tel"
                            placeholder="(555) 555-5555"
                            {...register("phone")}
                            className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-brand-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500 transition-colors text-sm"
                        />
                        {errors.phone && (
                            <p className="mt-1.5 text-xs text-red-400">{errors.phone.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="businessName" className="block text-sm font-medium text-slate-300 mb-1.5">
                            Business Name
                        </label>
                        <input
                            id="businessName"
                            type="text"
                            autoComplete="organization"
                            placeholder="Acme Construction"
                            {...register("businessName")}
                            className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-brand-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500 transition-colors text-sm"
                        />
                        {errors.businessName && (
                            <p className="mt-1.5 text-xs text-red-400">{errors.businessName.message}</p>
                        )}
                    </div>
                </div>

                <div>
                    <label htmlFor="state" className="block text-sm font-medium text-slate-300 mb-1.5">
                        State
                    </label>
                    <input
                        id="state"
                        type="text"
                        autoComplete="address-level1"
                        placeholder="TX"
                        maxLength={2}
                        {...register("state")}
                        className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-brand-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500 transition-colors text-sm uppercase"
                    />
                    {errors.state && (
                        <p className="mt-1.5 text-xs text-red-400">{errors.state.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1.5">
                        Your Question
                    </label>
                    <textarea
                        id="message"
                        rows={4}
                        placeholder="What would you like to know about the blueprint?"
                        {...register("message")}
                        className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-brand-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500 transition-colors text-sm resize-none"
                    />
                    {errors.message && (
                        <p className="mt-1.5 text-xs text-red-400">{errors.message.message}</p>
                    )}
                </div>

                {errorMessage && (
                    <p className="text-sm text-red-400 bg-red-500/10 rounded-xl p-4">{errorMessage}</p>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-gold-500 hover:bg-gold-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-brand-900 font-bold font-heading rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        "Send Message"
                    )}
                </button>

                <p className="text-xs text-slate-500 text-center flex items-center justify-center gap-1.5">
                    <Lock className="w-3 h-3" />
                    We respect your privacy. No spam, ever.
                </p>
            </form>
        </div>
    );
}

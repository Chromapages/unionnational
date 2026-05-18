"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    email: z.string().email("Valid email required"),
});

type FormData = z.infer<typeof formSchema>;

export function ExitIntentChecklist() {
    const [isVisible, setIsVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !sessionStorage.getItem("checklist_shown")) {
                sessionStorage.setItem("checklist_shown", "1");
                setIsVisible(true);
            }
        };

        document.body.addEventListener("mouseleave", handleMouseLeave);
        return () => document.body.removeEventListener("mouseleave", handleMouseLeave);
    }, []);

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);

        const payload = {
            event_type: "CONSTRUCTION_CHECKLIST_SUBMITTED",
            contact: {
                first_name: data.firstName,
                email: data.email,
                tags: ["LM_Construction_ProfitLeakChecklist", "Interest_Construction"],
            },
            intent: {
                lead_magnet_type: "CONSTRUCTION_PROFIT_LEAK_CHECKLIST",
                primary_service_interest: "CONSTRUCTION_CFO_PARTNERSHIP",
            },
            business: {
                industry: "CONSTRUCTION",
            },
            meta: {
                version: "1.0",
                submitted_at: new Date().toISOString(),
            },
        };

        try {
            await fetch("/api/ghl/intake", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            setIsSuccess(true);
        } catch (error) {
            console.error("Checklist submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setIsVisible(false);
        reset();
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                >
                    <div
                        className="absolute inset-0 bg-brand-950/80 backdrop-blur-sm"
                        onClick={handleClose}
                    />
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 sm:p-10 border border-gold-500/30 overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {isSuccess ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-8"
                            >
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 className="w-8 h-8 text-green-700" />
                                </div>
                                <h3 className="text-2xl font-heading font-bold text-brand-900 mb-3">
                                    Check Your Inbox
                                </h3>
                                <p className="text-slate-600">
                                    Your Profit Leak Checklist is on the way.
                                </p>
                            </motion.div>
                        ) : (
                            <>
                                <h3 className="text-xl font-heading font-bold text-brand-900 mb-2">
                                    Before You Go — Get the Contractor Profit Leak Checklist
                                </h3>
                                <p className="text-sm text-slate-500 mb-8">
                                    Get the quick checklist contractors use to spot where profit may be slipping.
                                </p>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div>
                                        <input
                                            {...register("firstName")}
                                            type="text"
                                            placeholder="First name"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-brand-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500 transition-colors text-sm"
                                        />
                                        {errors.firstName && (
                                            <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>
                                        )}
                                    </div>
                                    <div>
                                        <input
                                            {...register("email")}
                                            type="email"
                                            placeholder="Email address"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-brand-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500 transition-colors text-sm"
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-3.5 px-6 bg-gold-500 hover:bg-gold-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-brand-900 font-bold font-heading rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            "Send Me the Checklist"
                                        )}
                                    </button>
                                    <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-400">
                                        <Lock className="w-3.5 h-3.5" />
                                        <span>No spam. Unsubscribe anytime.</span>
                                    </div>
                                </form>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
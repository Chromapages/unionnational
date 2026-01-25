"use client";

import { useMemo } from "react";
import * as z from "zod";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import { SecureInput } from "./SecureInput";
import { SecurityBadge } from "./SecurityBadge";

const leadCaptureSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Enter a valid email"),
    phone: z.string().min(14, "Enter a valid phone"),
});

interface SecureLeadCaptureProps {
    formData: { firstName: string; lastName: string; email: string; phone: string };
    setFormData: React.Dispatch<React.SetStateAction<{ firstName: string; lastName: string; email: string; phone: string }>>;
    isSubmitting: boolean;
    onSubmit: (e: React.FormEvent) => void;
}

const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length === 0) return "";
    if (digits.length < 4) return `(${digits}`;
    if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

export function SecureLeadCapture({ formData, setFormData, isSubmitting, onSubmit }: SecureLeadCaptureProps) {
    const validation = useMemo(() => leadCaptureSchema.safeParse(formData), [formData]);
    const errors = validation.success ? {} : validation.error.flatten().fieldErrors;

    return (
        <div className="h-full w-full bg-slate-50 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full max-w-md mx-auto"
            >
                <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-brand-900/10 p-6 sm:p-8">
                    <div className="text-center">
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Secure Verification</p>
                        <h3 className="mt-3 text-2xl sm:text-3xl font-bold font-heading text-brand-900">
                            Unlock Your Report
                        </h3>
                        <p className="mt-3 text-sm text-slate-500">
                            Confirm your identity to access the vault preview and action plan.
                        </p>
                    </div>

                    <form onSubmit={onSubmit} className="mt-6 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <SecureInput
                                id="firstName"
                                label="First Name"
                                value={formData.firstName}
                                onChange={(value) => setFormData((prev) => ({ ...prev, firstName: value }))}
                                error={errors.firstName?.[0]}
                                isValid={!!formData.firstName && !errors.firstName}
                                autoComplete="given-name"
                            />
                            <SecureInput
                                id="lastName"
                                label="Last Name"
                                value={formData.lastName}
                                onChange={(value) => setFormData((prev) => ({ ...prev, lastName: value }))}
                                error={errors.lastName?.[0]}
                                isValid={!!formData.lastName && !errors.lastName}
                                autoComplete="family-name"
                            />
                        </div>
                        <SecureInput
                            id="email"
                            label="Email Address"
                            type="email"
                            value={formData.email}
                            onChange={(value) => setFormData((prev) => ({ ...prev, email: value }))}
                            error={errors.email?.[0]}
                            isValid={!!formData.email && !errors.email}
                            autoComplete="email"
                        />
                        <SecureInput
                            id="phone"
                            label="Phone Number"
                            type="tel"
                            value={formData.phone}
                            onChange={(value) =>
                                setFormData((prev) => ({ ...prev, phone: formatPhone(value) }))
                            }
                            error={errors.phone?.[0]}
                            isValid={!!formData.phone && !errors.phone}
                            autoComplete="tel"
                        />

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full group inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 px-6 py-4 text-sm font-bold uppercase tracking-[0.25em] text-brand-900 shadow-xl shadow-gold-400/30 transition hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Securing..." : "Unlock Full Report"}
                            <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </button>
                    </form>
                    <div className="mt-6 flex justify-center">
                        <SecurityBadge />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

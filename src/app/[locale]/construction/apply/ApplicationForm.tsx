"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useLocale } from "next-intl";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

// Form Schema
const formSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Valid phone number is required"),
    companyName: z.string().min(1, "Company name is required"),
    revenue: z.enum(["UNDER_100K", "100K_500K", "500K_1M", "1M_3M", "3M_5M", "5M_PLUS"]),
});

type FormData = z.infer<typeof formSchema>;

export default function ApplicationForm() {
    const router = useRouter();
    const locale = useLocale();
    const submissionId = useRef(crypto.randomUUID());
    const inFlight = useRef(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        if (inFlight.current) return;
        inFlight.current = true;
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            // Submit to API endpoint (which forwards to GHL webhook)
            const response = await fetch('/api/submit-application', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data, locale, submissionId: submissionId.current }),
            });

            const acknowledgement = await response.json().catch(() => null);
            if (!response.ok || acknowledgement?.success !== true) {
                throw new Error('Failed to submit application');
            }

            // After successful submission, redirect based on revenue
            if (data.revenue === "UNDER_100K" || data.revenue === "100K_500K") {
                router.push(`/${locale}/construction/downsell`);
            } else {
                router.push(`/${locale}/construction/booking`);
            }
        } catch {
            setSubmitError('There was an error submitting your application. Please try again.');
        } finally {
            inFlight.current = false;
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* First Name */}
                <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-medium text-brand-100 font-sans">
                        First Name
                    </label>
                    <input
                        {...register("firstName")}
                        id="firstName"
                        aria-invalid={!!errors.firstName}
                        aria-describedby={errors.firstName ? "firstName-error" : undefined}
                        type="text"
                        className="w-full px-4 py-3 rounded-xl bg-brand-800 border border-brand-700 text-white placeholder:text-brand-500/50 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all font-sans"
                        placeholder="John"
                    />
                    {errors.firstName && (
                        <p id="firstName-error" className="text-red-400 text-xs font-sans mt-1 pl-1">{errors.firstName.message}</p>
                    )}
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-medium text-brand-100 font-sans">
                        Last Name
                    </label>
                    <input
                        {...register("lastName")}
                        id="lastName"
                        aria-invalid={!!errors.lastName}
                        aria-describedby={errors.lastName ? "lastName-error" : undefined}
                        type="text"
                        className="w-full px-4 py-3 rounded-xl bg-brand-800 border border-brand-700 text-white placeholder:text-brand-500/50 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all font-sans"
                        placeholder="Doe"
                    />
                    {errors.lastName && (
                        <p id="lastName-error" className="text-red-400 text-xs font-sans mt-1 pl-1">{errors.lastName.message}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Email */}
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-brand-100 font-sans">
                        Email Address
                    </label>
                    <input
                        {...register("email")}
                        id="email"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        type="email"
                        className="w-full px-4 py-3 rounded-xl bg-brand-800 border border-brand-700 text-white placeholder:text-brand-500/50 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all font-sans"
                        placeholder="john@company.com"
                    />
                    {errors.email && (
                        <p id="email-error" className="text-red-400 text-xs font-sans mt-1 pl-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-brand-100 font-sans">
                        Phone Number
                    </label>
                    <input
                        {...register("phone")}
                        id="phone"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                        type="tel"
                        className="w-full px-4 py-3 rounded-xl bg-brand-800 border border-brand-700 text-white placeholder:text-brand-500/50 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all font-sans"
                        placeholder="(555) 123-4567"
                    />
                    {errors.phone && (
                        <p id="phone-error" className="text-red-400 text-xs font-sans mt-1 pl-1">{errors.phone.message}</p>
                    )}
                </div>
            </div>

            {/* Company Name */}
            <div className="space-y-2">
                <label htmlFor="companyName" className="block text-sm font-medium text-brand-100 font-sans">
                    Company Name
                </label>
                <input
                    {...register("companyName")}
                    id="companyName"
                    aria-invalid={!!errors.companyName}
                    aria-describedby={errors.companyName ? "companyName-error" : undefined}
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-brand-800 border border-brand-700 text-white placeholder:text-brand-500/50 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all font-sans"
                    placeholder="Acme Construction Inc."
                />
                {errors.companyName && (
                    <p id="companyName-error" className="text-red-400 text-xs font-sans mt-1 pl-1">{errors.companyName.message}</p>
                )}
            </div>

            {/* Revenue Dropdown (Gatekeeper) */}
            <div className="space-y-2 pt-2">
                <label htmlFor="revenue" className="block text-sm font-bold text-white font-sans">
                    What is your current annual revenue? <span className="text-emerald-500">*</span>
                </label>
                <div className="relative">
                    <select
                        {...register("revenue")}
                        defaultValue=""
                        id="revenue"
                        aria-invalid={!!errors.revenue}
                        aria-describedby={errors.revenue ? "revenue-error" : undefined}
                        className="w-full px-4 py-4 rounded-xl bg-brand-800 border border-brand-700 text-white outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all appearance-none font-sans cursor-pointer hover:border-brand-600"
                    >
                        <option value="" disabled>Select Revenue Range...</option>
                        <option value="UNDER_100K">Under $100k</option>
                        <option value="100K_500K">$100k - $500k</option>
                        <option value="500K_1M">$500k - $1M</option>
                        <option value="1M_3M">$1M - $3M</option>
                        <option value="3M_5M">$3M - $5M</option>
                        <option value="5M_PLUS">$5M+</option>
                    </select>
                    {/* Custom Arrow */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                {errors.revenue && (
                    <p id="revenue-error" className="text-red-400 text-xs font-sans mt-1 pl-1">{errors.revenue.message}</p>
                )}
            </div>

            {/* Submit Button */}
            {submitError && <p role="alert" className="text-red-400 text-sm">{submitError}</p>}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 mt-6 rounded-xl bg-emerald-500 text-white font-bold text-lg hover:bg-emerald-600 active:scale-[0.99] transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 font-heading disabled:opacity-70 disabled:cursor-not-allowed group"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                    </>
                ) : (
                    <>
                        {submitError ? "Retry Application" : "Continue"}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </button>

            <p className="text-center text-xs text-brand-400 font-sans mt-4">
                <CheckCircle2 className="w-3 h-3 inline-block mr-1 text-emerald-500" />
                Your information is secure and encrypted.
            </p>
        </form>
    );
}

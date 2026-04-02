"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Loader2, CheckCircle2, ShieldCheck, Mail, Phone, FileText } from "lucide-react";

// Form Schema
const formSchema = z.object({
    name: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Valid phone number is required"),
    businessType: z.enum([
        "construction",
        "real-estate",
        "hospitality",
        "other"
    ]),
    revenueRange: z.enum([
        "500k_1m",
        "1m_3m",
        "3m_5m",
        "5m_plus",
        "prefer_not"
    ]),
});

type FormData = z.infer<typeof formSchema>;

interface TaxAnalysisFormProps {
    industry: "construction" | "real-estate" | "hospitality";
    source: string;
}

const industryLabels: Record<string, string> = {
    "construction": "Construction / Contractor",
    "real-estate": "Real Estate (Investor, Agent, or Broker)",
    "hospitality": "Hospitality (Restaurant, Hotel, or Service Business)",
};

const revenueRangeLabels: Record<string, string> = {
    "500k_1m": "$500,000 – $1,000,000",
    "1m_3m": "$1,000,000 – $3,000,000",
    "3m_5m": "$3,000,000 – $5,000,000",
    "5m_plus": "$5,000,000+",
    "prefer_not": "Prefer not to say",
};

export function TaxAnalysisForm({ industry, source }: TaxAnalysisFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            businessType: industry as FormData["businessType"],
        },
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/leads/tax-analysis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data, source }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit');
            }

            setIsSuccess(true);
        } catch (error) {
            console.error('Tax analysis form submission error:', error);
            alert('There was an error submitting your request. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Success State
    if (isSuccess) {
        return (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-10 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-green-700" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-brand-900 mb-3">
                    Your Tax Savings Analysis Is On Its Way
                </h3>
                <p className="text-slate-600 mb-6">
                    Check your inbox — it should arrive within one business day.
                </p>
                <div className="bg-slate-50 rounded-xl p-6 text-left space-y-3">
                    <p className="text-sm text-slate-600 font-medium">
                        What happens next:
                    </p>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-gold-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-brand-900 text-xs font-bold">1</span>
                            </div>
                            <p className="text-sm text-slate-700">
                                Your analysis has been segmented to your specific business type and revenue range.
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-gold-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-brand-900 text-xs font-bold">2</span>
                            </div>
                            <p className="text-sm text-slate-700">
                                You'll receive 3–5 deduction categories with approximate value ranges.
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-gold-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-brand-900 text-xs font-bold">3</span>
                            </div>
                            <p className="text-sm text-slate-700">
                                Read it on your time. Share it with your current CPA if you want.
                            </p>
                        </div>
                    </div>
                </div>
                <p className="text-xs text-slate-500 mt-6">
                    Questions? Reply directly to the email when it arrives.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Form Header */}
            <div className="bg-brand-500 p-6 sm:p-8 text-center">
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-2">
                    Get Your Free Tax Savings Analysis
                </h3>
                <p className="text-brand-100 text-sm sm:text-base">
                    Takes 90 seconds. Delivered by email within one business day.
                </p>
                <p className="text-gold-400 text-xs sm:text-sm mt-1">
                    No sales call. No obligation. Just the analysis.
                </p>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 space-y-5">
                {/* Name */}
                <div className="space-y-1.5">
                    <label htmlFor="name" className="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                        Full Name
                    </label>
                    <input
                        {...register("name")}
                        type="text"
                        className="w-full border border-slate-300 rounded-lg bg-white px-4 py-3.5 text-brand-900 placeholder:text-slate-400 outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors text-base"
                        placeholder="John Contractor"
                    />
                    {errors.name && (
                        <p className="text-feedback-error text-xs font-medium pl-1">{errors.name.message}</p>
                    )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                        Email Address
                    </label>
                    <input
                        {...register("email")}
                        type="email"
                        className="w-full border border-slate-300 rounded-lg bg-white px-4 py-3.5 text-brand-900 placeholder:text-slate-400 outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors text-base"
                        placeholder="john@contractorcompany.com"
                    />
                    {errors.email && (
                        <p className="text-feedback-error text-xs font-medium pl-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                    <label htmlFor="phone" className="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                        Phone Number
                    </label>
                    <input
                        {...register("phone")}
                        type="tel"
                        className="w-full border border-slate-300 rounded-lg bg-white px-4 py-3.5 text-brand-900 placeholder:text-slate-400 outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors text-base"
                        placeholder="(801) 555-1234"
                    />
                    {errors.phone && (
                        <p className="text-feedback-error text-xs font-medium pl-1">{errors.phone.message}</p>
                    )}
                </div>

                {/* Business Type */}
                <div className="space-y-1.5">
                    <label htmlFor="businessType" className="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                        Business Type
                    </label>
                    <div className="relative">
                        <select
                            {...register("businessType")}
                            className="w-full border border-slate-300 rounded-lg bg-white px-4 py-3.5 text-brand-900 outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors appearance-none cursor-pointer text-base"
                        >
                            <option value="construction">Construction / Contractor</option>
                            <option value="real-estate">Real Estate (Investor, Agent, or Broker)</option>
                            <option value="hospitality">Hospitality (Restaurant, Hotel, or Service Business)</option>
                            <option value="other">Other</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                    {errors.businessType && (
                        <p className="text-feedback-error text-xs font-medium pl-1">{errors.businessType.message}</p>
                    )}
                </div>

                {/* Revenue Range */}
                <div className="space-y-1.5">
                    <label htmlFor="revenueRange" className="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                        Annual Revenue Range
                    </label>
                    <div className="relative">
                        <select
                            {...register("revenueRange")}
                            className="w-full border border-slate-300 rounded-lg bg-white px-4 py-3.5 text-brand-900 outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors appearance-none cursor-pointer text-base"
                        >
                            <option value="500k_1m">$500,000 – $1,000,000</option>
                            <option value="1m_3m">$1,000,000 – $3,000,000</option>
                            <option value="3m_5m">$3,000,000 – $5,000,000</option>
                            <option value="5m_plus">$5,000,000+</option>
                            <option value="prefer_not">Prefer not to say</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                    {errors.revenueRange && (
                        <p className="text-feedback-error text-xs font-medium pl-1">{errors.revenueRange.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 mt-2 rounded-lg bg-gold-500 text-brand-900 font-heading font-bold text-base hover:bg-gold-600 active:scale-[0.99] transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        "Send Me My Free Analysis"
                    )}
                </button>

                {/* Privacy Note */}
                <div className="flex items-start gap-2 pt-1">
                    <ShieldCheck className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-500">
                        Your information is never sold or shared with third parties. We use it to deliver your analysis and, occasionally, to send relevant tax planning information for Utah business owners. You can unsubscribe at any time.
                    </p>
                </div>
            </form>
        </div>
    );
}

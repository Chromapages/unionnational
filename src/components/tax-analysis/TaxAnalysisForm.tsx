"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Loader2, CheckCircle2, ShieldCheck } from "lucide-react";
import { normalizeRevenue, normalizeIndustry } from "@/lib/ghl/contract";

// Form Schema (Frontend-only validation)
const formSchema = z.object({
    name: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Valid phone number is required"),
    businessType: z.string(),
    revenueRange: z.string(),
});

type FormData = z.infer<typeof formSchema>;

interface TaxAnalysisFormProps {
    industry: "construction" | "real-estate" | "hospitality";
    source: string;
}

export function TaxAnalysisForm({ industry, source }: TaxAnalysisFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            businessType: industry,
        },
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);

        const payload = {
            event_type: "TAX_ANALYSIS_SUBMITTED",
            contact: {
                first_name: data.name.split(" ")[0],
                last_name: data.name.split(" ").slice(1).join(" "),
                email: data.email,
                phone: data.phone
            },
            business: {
                industry: normalizeIndustry(data.businessType),
                annual_revenue_band: normalizeRevenue(data.revenueRange),
            },
            intent: {
                primary_service_interest: "TAX_PLANNING",
                lead_magnet_type: "TAX_SAVINGS_ANALYSIS",
                source: source
            },
            meta: {
                version: "1.0",
                submitted_at: new Date().toISOString()
            }
        };

        try {
            const response = await fetch('/api/ghl/intake', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error('Failed to submit');
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
                    <p className="text-sm text-slate-600 font-medium">What happens next:</p>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-gold-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-brand-900 text-xs font-bold">1</span>
                            </div>
                            <p className="text-sm text-slate-700">Analysis segmented to your specific business type.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-gold-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-brand-900 text-xs font-bold">2</span>
                            </div>
                            <p className="text-sm text-slate-700">3–5 specific deduction categories identified.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-brand-500 p-6 sm:p-8 text-center">
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-2">Get Your Free Tax Savings Analysis</h3>
                <p className="text-brand-100 text-sm">Delivered by email within one business day.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 space-y-5">
                <input {...register("name")} placeholder="Full Name" className="w-full border border-slate-300 rounded-lg px-4 py-3.5" />
                {errors.name && <p className="text-feedback-error text-xs">{errors.name.message}</p>}
                
                <input {...register("email")} type="email" placeholder="Email Address" className="w-full border border-slate-300 rounded-lg px-4 py-3.5" />
                {errors.email && <p className="text-feedback-error text-xs">{errors.email.message}</p>}
                
                <input {...register("phone")} type="tel" placeholder="Phone Number" className="w-full border border-slate-300 rounded-lg px-4 py-3.5" />
                {errors.phone && <p className="text-feedback-error text-xs">{errors.phone.message}</p>}

                <select {...register("businessType")} className="w-full border border-slate-300 rounded-lg px-4 py-3.5">
                    <option value="construction">Construction / Contractor</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="hospitality">Hospitality</option>
                    <option value="other">Other</option>
                </select>

                <select {...register("revenueRange")} className="w-full border border-slate-300 rounded-lg px-4 py-3.5">
                    <option value="500k_1m">$500,000 – $1,000,000</option>
                    <option value="1m_3m">$1,000,000 – $3,000,000</option>
                    <option value="5m_plus">$5,000,000+</option>
                </select>

                <button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-lg bg-gold-500 text-brand-900 font-bold">
                    {isSubmitting ? "Submitting..." : "Send Me My Free Analysis"}
                </button>

                <div className="flex items-start gap-2 pt-1">
                    <ShieldCheck className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <p className="text-[10px] text-slate-500 leading-tight">Your info is never sold. Delivered via email. Unsubscribe anytime.</p>
                </div>
            </form>
        </div>
    );
}

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

// Form Schema
const formSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Valid phone number is required"),
    companyName: z.string().min(1, "Company name is required"),
    revenue: z.enum(["less_500k", "500k_1m", "1m_5m", "5m_plus"]),
});

type FormData = z.infer<typeof formSchema>;

export default function ApplicationForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        console.log("Application Data:", data);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Gatekeeper Logic
        if (data.revenue === "less_500k") {
            router.push("/construction/downsell");
        } else {
            router.push("/construction/booking");
        }

        // Note: isSubmitting stays true during redirect for smooth UX
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
                        type="text"
                        className="w-full px-4 py-3 rounded-xl bg-brand-800 border border-brand-700 text-white placeholder:text-brand-500/50 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all font-sans"
                        placeholder="John"
                    />
                    {errors.firstName && (
                        <p className="text-red-400 text-xs font-sans mt-1 pl-1">{errors.firstName.message}</p>
                    )}
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-medium text-brand-100 font-sans">
                        Last Name
                    </label>
                    <input
                        {...register("lastName")}
                        type="text"
                        className="w-full px-4 py-3 rounded-xl bg-brand-800 border border-brand-700 text-white placeholder:text-brand-500/50 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all font-sans"
                        placeholder="Doe"
                    />
                    {errors.lastName && (
                        <p className="text-red-400 text-xs font-sans mt-1 pl-1">{errors.lastName.message}</p>
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
                        type="email"
                        className="w-full px-4 py-3 rounded-xl bg-brand-800 border border-brand-700 text-white placeholder:text-brand-500/50 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all font-sans"
                        placeholder="john@company.com"
                    />
                    {errors.email && (
                        <p className="text-red-400 text-xs font-sans mt-1 pl-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-brand-100 font-sans">
                        Phone Number
                    </label>
                    <input
                        {...register("phone")}
                        type="tel"
                        className="w-full px-4 py-3 rounded-xl bg-brand-800 border border-brand-700 text-white placeholder:text-brand-500/50 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all font-sans"
                        placeholder="(555) 123-4567"
                    />
                    {errors.phone && (
                        <p className="text-red-400 text-xs font-sans mt-1 pl-1">{errors.phone.message}</p>
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
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-brand-800 border border-brand-700 text-white placeholder:text-brand-500/50 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all font-sans"
                    placeholder="Acme Construction Inc."
                />
                {errors.companyName && (
                    <p className="text-red-400 text-xs font-sans mt-1 pl-1">{errors.companyName.message}</p>
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
                        className="w-full px-4 py-4 rounded-xl bg-brand-800 border border-brand-700 text-white outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all appearance-none font-sans cursor-pointer hover:border-brand-600"
                    >
                        <option value="" disabled selected>Select Revenue Range...</option>
                        <option value="less_500k">Less than $500k</option>
                        <option value="500k_1m">$500k - $1M</option>
                        <option value="1m_5m">$1M - $5M</option>
                        <option value="5m_plus">$5M+</option>
                    </select>
                    {/* Custom Arrow */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                {errors.revenue && (
                    <p className="text-red-400 text-xs font-sans mt-1 pl-1">{errors.revenue.message}</p>
                )}
            </div>

            {/* Submit Button */}
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
                        Continue to Booking
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

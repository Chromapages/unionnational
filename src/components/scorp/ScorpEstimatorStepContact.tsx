"use client";

import { useFormContext } from "react-hook-form";
import { ScorpEstimatorInput } from "@/lib/scorp/schema";
import { motion } from "framer-motion";

export const ScorpEstimatorStepContact = () => {
    const { register, formState: { errors } } = useFormContext<ScorpEstimatorInput>();

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                    <label htmlFor="full_name" className="text-sm font-bold text-brand-500 uppercase tracking-wider">Full Name</label>
                    <input 
                        id="full_name"
                        {...register("full_name")} 
                        placeholder="John Doe"
                        aria-invalid={errors.full_name ? "true" : "false"}
                        aria-describedby={errors.full_name ? "full_name_error" : undefined}
                        className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all font-body font-normal"
                    />
                    {errors.full_name && <p id="full_name_error" className="text-red-500 text-xs font-medium">{errors.full_name.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold text-brand-500 uppercase tracking-wider">Email Address</label>
                    <input 
                        id="email"
                        {...register("email")} 
                        type="email"
                        placeholder="john@example.com"
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-describedby={errors.email ? "email_error" : undefined}
                        className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all font-body"
                    />
                    {errors.email && <p id="email_error" className="text-red-500 text-xs font-medium">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-bold text-brand-500 uppercase tracking-wider">Phone Number</label>
                    <input 
                        id="phone"
                        {...register("phone")} 
                        type="tel"
                        placeholder="(555) 000-0000"
                        aria-invalid={errors.phone ? "true" : "false"}
                        aria-describedby={errors.phone ? "phone_error" : undefined}
                        className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all font-body"
                    />
                    {errors.phone && <p id="phone_error" className="text-red-500 text-xs font-medium">{errors.phone.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="business_name" className="text-sm font-bold text-brand-500 uppercase tracking-wider">Business Name</label>
                    <input 
                        id="business_name"
                        {...register("business_name")} 
                        placeholder="Acme Corp"
                        aria-invalid={errors.business_name ? "true" : "false"}
                        aria-describedby={errors.business_name ? "business_name_error" : undefined}
                        className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all font-body"
                    />
                    {errors.business_name && <p id="business_name_error" className="text-red-500 text-xs font-medium">{errors.business_name.message}</p>}
                </div>
                <div className="space-y-2">
                    <label htmlFor="website_url" className="text-sm font-bold text-brand-500 uppercase tracking-wider">Website URL (Optional)</label>
                    <input 
                        id="website_url"
                        {...register("website_url")} 
                        placeholder="https://example.com"
                        className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all font-body"
                    />
                </div>
            </div>
        </motion.div>
    );
};

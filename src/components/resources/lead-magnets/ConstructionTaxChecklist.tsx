"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Download, Check, ShieldCheck, Mail, ArrowRight, FileText } from "lucide-react";

const DEDUCTION_HIGHLIGHTS = [
    "100% Bonus Depreciation on Heavy Equipment",
    "Mileage & Travel for Remote Job Sites",
    "Direct Materials, Supplies & Subcontractors",
    "Tools, PPE, and Specialized Gear",
];

export function ConstructionTaxChecklist() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call to CRM/Email Marketing service
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSuccess(true);
    };

    return (
        <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto rounded-3xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-600 text-sm font-bold tracking-wide uppercase mb-6">
                    <FileText className="w-4 h-4" />
                    Free Lead Magnet
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-brand-900 mb-6 font-heading tracking-tight">
                    Construction Tax Deduction Checklist
                </h1>
                <p className="text-xl text-slate-600 font-medium">
                    Never miss a deduction again — print and keep this in your truck.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                {/* Visual / Info Side */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-white rounded-3xl -z-10 transform -rotate-2 scale-105 border border-slate-200" />
                    <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 shadow-xl shadow-slate-200/50">
                        <div className="w-16 h-16 rounded-2xl bg-brand-900 flex items-center justify-center mb-8 shadow-lg shadow-brand-900/20">
                            <Download className="w-8 h-8 text-white" />
                        </div>

                        <h3 className="text-2xl font-bold text-brand-900 mb-4 font-heading">
                            Stop leaving money on the table.
                        </h3>
                        <p className="text-slate-600 mb-8 leading-relaxed">
                            Independent contractors frequently overpay on taxes by overlooking job-specific deductions. This 2025/2026 updated checklist covers the most impactful tax write-offs for the construction industry.
                        </p>

                        <div className="space-y-4 mb-8">
                            {DEDUCTION_HIGHLIGHTS.map((item, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="mt-1 w-6 h-6 rounded-full bg-gold-500 flex items-center justify-center shrink-0">
                                        <Check className="w-3.5 h-3.5 text-brand-900 font-bold" />
                                    </div>
                                    <span className="text-slate-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                            <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
                            <p className="text-sm text-slate-500">
                                Updated for 2025/2026 tax codes. Includes Bonus Depreciation & Section 179 updates.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Form Side */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="bg-brand-900 rounded-3xl p-8 lg:p-12 relative overflow-hidden shadow-2xl shadow-brand-900/30">
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-800/50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                        <div className="relative z-10">
                            <div className="mb-8">
                                <h3 className="text-3xl font-bold text-white mb-3 font-heading">
                                    Get Your Free Copy
                                </h3>
                                <p className="text-brand-100">
                                    Enter your details below and we'll send the PDF directly to your inbox.
                                </p>
                            </div>

                            <AnimatePresence mode="wait">
                                {!isSuccess ? (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-5"
                                    >
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium text-brand-100 block">
                                                First Name
                                            </label>
                                            <input
                                                id="name"
                                                type="text"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all backdrop-blur-sm"
                                                placeholder="John"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium text-brand-100 block">
                                                Email Address
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                                <input
                                                    id="email"
                                                    type="email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full pl-13 pr-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all backdrop-blur-sm"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full mt-4 flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-brand-900 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-gold-500/20"
                                        >
                                            {isSubmitting ? (
                                                <div className="w-5 h-5 border-2 border-brand-900/30 border-t-brand-900 rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    Download Free Checklist
                                                    <ArrowRight className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>

                                        <p className="text-xs text-brand-200/60 text-center mt-6">
                                            By downloading, you agree to receive email communications from Union National Tax. We value your privacy.
                                        </p>
                                    </motion.form>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle2 className="w-8 h-8 text-white" />
                                        </div>
                                        <h4 className="text-2xl font-bold text-white mb-2 font-heading">
                                            Checklist Sent!
                                        </h4>
                                        <p className="text-brand-100 mb-8">
                                            Check your inbox at <strong>{email}</strong> for your download link.
                                        </p>
                                        <a
                                            href="#"
                                            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-lg font-medium transition-all"
                                        >
                                            <Download className="w-4 h-4" />
                                            Download Directly Here
                                        </a>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

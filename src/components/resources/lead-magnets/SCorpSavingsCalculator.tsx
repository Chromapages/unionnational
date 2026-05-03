"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Check, Mail, ArrowRight, Send, TrendingUp, DollarSign, Percent } from "lucide-react";
import Link from "next/link";

export function SCorpSavingsCalculator() {
    const [step, setStep] = useState(1);
    const [income, setIncome] = useState("");
    const [salary, setSalary] = useState("");
    const [businessExpenses, setBusinessExpenses] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    // Calculations
    const netProfit = parseFloat(income || "0") - parseFloat(businessExpenses || "0");
    
    // Sole Prop / LLC: Self-employment tax on all net profit (15.3% on 92.35% of net)
    const solePropSEtax = netProfit > 0 ? netProfit * 0.9235 * 0.153 : 0;
    
    // S-Corp: Only pay SE tax on salary, not distributions
    const sCorpSalary = parseFloat(salary || "0");
    const sCorpSEtax = sCorpSalary * 0.153;
    
    // Savings = Difference in SE tax
    const annualSavings = Math.max(0, solePropSEtax - sCorpSEtax);
    
    // Federal tax savings (rough estimate - assuming 22% bracket)
    const federalTaxSavings = annualSavings * 0.22;
    const totalAnnualSavings = annualSavings + federalTaxSavings;

    const handleCalculate = () => {
        if (income && salary && businessExpenses) {
            setStep(2);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        console.log("Submitting S-Corp calculation:", { 
            name, email, income, salary, businessExpenses, 
            netProfit, annualSavings, totalAnnualSavings 
        });
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsComplete(true);
    };

    const formatCurrency = (num: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
    };

    if (isComplete) {
        return (
            <section className="w-full bg-brand-900 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto rounded-3xl">
                <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                        <Check className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-black text-white mb-2">Calculation Complete!</h2>
                    <p className="text-slate-300 mb-8">
                        Your detailed report has been sent to <strong>{email}</strong>
                    </p>

                    <div className="bg-brand-800/50 rounded-2xl p-8 border border-brand-700 max-w-md mx-auto mb-8">
                        <div className="text-gold-400 font-bold mb-2">Your Estimated Annual Savings</div>
                        <div className="text-5xl font-black text-white mb-4">{formatCurrency(totalAnnualSavings)}</div>
                        
                        <div className="space-y-3 text-left bg-brand-900/50 rounded-xl p-4">
                            <div className="flex justify-between">
                                <span className="text-slate-400">Net Profit (Sole Prop):</span>
                                <span className="text-white">{formatCurrency(netProfit)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">SE Tax (Sole Prop):</span>
                                <span className="text-red-400">-{formatCurrency(solePropSEtax)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">SE Tax (S-Corp):</span>
                                <span className="text-green-400">-{formatCurrency(sCorpSEtax)}</span>
                            </div>
                            <div className="border-t border-brand-700 pt-3 flex justify-between font-bold">
                                <span className="text-white">Annual Savings:</span>
                                <span className="text-green-400">{formatCurrency(annualSavings)}</span>
                            </div>
                        </div>
                    </div>

                    <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-600 text-brand-900 font-bold rounded-xl transition-all">
                        Lock In These Savings <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full bg-brand-900 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto rounded-3xl">
            <AnimatePresence mode="wait">
                {step === 1 ? (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-sm font-bold tracking-wide uppercase mb-4">
                                <Calculator className="w-4 h-4" />
                                Calculator
                            </div>
                            <h2 className="text-3xl font-black text-white mb-2">Calculate Your S-Corp Savings</h2>
                            <p className="text-slate-300">Enter your business numbers to see how much you could save.</p>
                        </div>

                        <div className="bg-brand-800/50 backdrop-blur rounded-3xl p-8 border border-brand-700">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                                        <DollarSign className="w-4 h-4 inline mr-1" />
                                        Annual Business Revenue (Gross Income)
                                    </label>
                                    <input
                                        type="number"
                                        value={income}
                                        onChange={(e) => setIncome(e.target.value)}
                                        className="w-full px-4 py-4 rounded-xl border border-brand-600 bg-brand-800 text-white placeholder-slate-500 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10 outline-none text-lg"
                                        placeholder="150000"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                                        <DollarSign className="w-4 h-4 inline mr-1" />
                                        Business Expenses (Annual)
                                    </label>
                                    <input
                                        type="number"
                                        value={businessExpenses}
                                        onChange={(e) => setBusinessExpenses(e.target.value)}
                                        className="w-full px-4 py-4 rounded-xl border border-brand-600 bg-brand-800 text-white placeholder-slate-500 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10 outline-none text-lg"
                                        placeholder="30000"
                                    />
                                </div>

                                <div>
                                     <label className="block text-sm font-semibold text-slate-300 mb-2">
                                        <DollarSign className="w-4 h-4 inline mr-1" />
                                        Your &quot;Reasonable Salary&quot; (if S-Corp)
                                    </label>
                                    <input
                                        type="number"
                                        value={salary}
                                        onChange={(e) => setSalary(e.target.value)}
                                        className="w-full px-4 py-4 rounded-xl border border-brand-600 bg-brand-800 text-white placeholder-slate-500 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10 outline-none text-lg"
                                        placeholder="60000"
                                    />
                                     <p className="text-slate-500 text-sm mt-2">This is what you&apos;d pay yourself as a salary if you switched to S-Corp.</p>
                                </div>

                                <button
                                    onClick={handleCalculate}
                                    disabled={!income || !salary || !businessExpenses}
                                    className="w-full py-4 bg-gold-500 hover:bg-gold-600 text-brand-900 font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Calculate Savings <TrendingUp className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-bold tracking-wide uppercase mb-4">
                                <TrendingUp className="w-4 h-4" />
                                Your Potential Savings
                            </div>
                            <h2 className="text-4xl font-black text-white mb-2">{formatCurrency(totalAnnualSavings)}</h2>
                            <p className="text-slate-300">per year by switching to S-Corp</p>
                        </div>

                        <div className="bg-brand-800/50 backdrop-blur rounded-3xl p-8 border border-brand-700 mb-8">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-4 bg-brand-900/50 rounded-xl">
                                    <span className="text-slate-300">Net Profit (Sole Prop):</span>
                                    <span className="text-white font-bold">{formatCurrency(netProfit)}</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-brand-900/50 rounded-xl">
                                    <span className="text-slate-300">Self-Employment Tax (Sole Prop):</span>
                                    <span className="text-red-400 font-bold">-{formatCurrency(solePropSEtax)}</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-brand-900/50 rounded-xl">
                                    <span className="text-slate-300">Self-Employment Tax (S-Corp):</span>
                                    <span className="text-green-400 font-bold">-{formatCurrency(sCorpSEtax)}</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
                                    <span className="text-white font-bold">SE Tax Savings:</span>
                                    <span className="text-green-400 font-bold">{formatCurrency(annualSavings)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-8">
                            <h3 className="text-xl font-bold text-brand-900 mb-4">Get Your Full Report</h3>
                            <p className="text-slate-600 mb-6">Enter your email to receive a detailed breakdown with tax planning recommendations.</p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none"
                                        placeholder="John"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Business Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none"
                                        placeholder="john@business.com"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isSubmitting ? "Sending..." : <>Email My Report <Mail className="w-4 h-4" /></>}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

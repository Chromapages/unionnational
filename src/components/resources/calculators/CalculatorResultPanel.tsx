"use client";

import { motion } from "framer-motion";
import { ArrowRight, Info, AlertTriangle, TrendingDown } from "lucide-react";
import Link from "next/link";

interface CalculatorResultPanelProps {
    results: {
        trueTakeHome: number;
        profitMargin: number;
        totalTax: number;
        grossProfit: number;
    };
    revenue: number;
}

export function CalculatorResultPanel({ results, revenue }: CalculatorResultPanelProps) {
    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

    const taxImpactPercent = results.grossProfit > 0 ? (results.totalTax / results.grossProfit) * 100 : 0;

    return (
        <div className="space-y-8">
            <div className="text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-2 font-bold">Your True Monthly Take-Home</p>
                <motion.h2
                    key={results.trueTakeHome}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-5xl sm:text-6xl font-black text-brand-900 font-heading"
                >
                    {formatCurrency(results.trueTakeHome)}
                </motion.h2>
                <div className="flex items-center justify-center gap-2 mt-4">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
                        {results.profitMargin.toFixed(1)}% Real Margin
                    </span>
                    {taxImpactPercent > 30 && (
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider">
                            <TrendingDown className="w-3 h-3" />
                            High Tax Impact
                        </span>
                    )}
                </div>
            </div>

            <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100 space-y-4">
                <h4 className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-black mb-4">The Reality Check</h4>

                <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">Gross Job Profit</span>
                    <span className="font-bold text-brand-900">{formatCurrency(results.grossProfit)}</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-slate-600">Total Tax Leakage</span>
                        <div className="group relative">
                            <Info className="w-3.5 h-3.5 text-slate-300 cursor-help" />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-brand-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 shadow-xl">
                                Includes Self-Employment Tax (15.3%) and estimated State/Federal Income Tax.
                            </div>
                        </div>
                    </div>
                    <span className="font-bold text-red-500">-{formatCurrency(results.totalTax)}</span>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                    <span className="text-brand-900 font-bold">Estimated Take-Home</span>
                    <span className="text-xl font-black text-emerald-600">{formatCurrency(results.trueTakeHome)}</span>
                </div>
            </div>

            <div className="p-5 bg-gold-500/5 rounded-2xl border border-gold-500/10 flex items-start gap-4">
                <AlertTriangle className="w-5 h-5 text-gold-600 shrink-0 mt-1" />
                <div>
                    <h5 className="text-sm font-bold text-brand-900">Tax Leakage Warning</h5>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        You're losing <span className="font-bold text-brand-900">{taxImpactPercent.toFixed(0)}%</span> of your job profit to taxes. A strategic S-Corp election or specialized deductions could save you over $10,000 annually.
                    </p>
                </div>
            </div>

            <Link
                href="/contact?topic=calculator"
                className="w-full flex items-center justify-center gap-3 bg-brand-900 text-white rounded-2xl py-5 px-6 text-sm font-bold uppercase tracking-[0.2em] hover:bg-brand-800 transition-all shadow-xl shadow-brand-900/10 group whitespace-nowrap"
            >
                <span className="flex items-center gap-3">
                    Get Your Profit Plan
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
            </Link>
        </div>
    );
}

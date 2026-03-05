"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Calculator, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

export function SCorpCalculator() {
    const [netIncome, setNetIncome] = useState<string>("");
    const [result, setResult] = useState<{
        llcTax: number;
        scorpTax: number;
        savings: number;
    } | null>(null);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const calculateSavings = () => {
        const income = parseFloat(netIncome.replace(/,/g, ""));
        if (isNaN(income) || income <= 0) return;

        // Simplified Tax Logic (2024 Estimates)
        // 1. Sole Prop / LLC: 15.3% SE Tax on 92.35% of net earnings
        // (We'll ignore income tax as it largely nets out, focusing on SE Tax savings)
        const seTaxBase = income * 0.9235;
        const llcSeTax = Math.min(seTaxBase, 168600) * 0.153 + Math.max(0, seTaxBase - 168600) * 0.029;

        // 2. S-Corp: Reasonable Salary + Distributions
        // Rudimentary Reasonable Comp Logic: 40% of income or max 100k (simplified)
        let salary = income * 0.4;
        if (salary < 40000) salary = 40000; // Minimum floor
        if (income < 50000) salary = income; // Below threshold, scant savings
        if (salary > 120000) salary = 120000; // soft cap for calculator demo

        const scorpSeTax = Math.min(salary, 168600) * 0.153 + Math.max(0, salary - 168600) * 0.029;

        const savings = llcSeTax - scorpSeTax;

        setResult({
            llcTax: llcSeTax,
            scorpTax: scorpSeTax,
            savings: Math.max(0, savings),
        });
    };

    return (
        <div className="bg-white/95 backdrop-blur rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20 relative z-20 max-w-sm w-full mx-auto md:mx-0">
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-gold rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Calculator className="text-white w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-navy mb-2">Estimate Your Savings</h3>
            <p className="text-sm text-brand-900 mb-6">
                See how much you could save by electing S-Corp status.
            </p>

            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-navy uppercase tracking-wide mb-2">
                        Net Business Income
                    </label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-900/60" />
                        <input
                            type="number"
                            placeholder="150000"
                            value={netIncome}
                            onChange={(e) => setNetIncome(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-3 text-sm font-medium text-navy focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all"
                        />
                    </div>
                </div>

                <Button onClick={calculateSavings} className="w-full" size="lg">
                    Calculate Savings
                </Button>
            </div>

            {result && (
                <div className="mt-6 pt-6 border-t border-slate-100 animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-brand-900">Potential Savings:</span>
                        <span className="text-2xl font-bold text-green-600">
                            {formatCurrency(result.savings)}
                            <span className="text-xs font-normal text-brand-900/60 block text-right">/ year</span>
                        </span>
                    </div>

                    <div className="text-xs text-brand-900/60 bg-slate-50 p-3 rounded-lg mt-2">
                        *Estimated self-employment tax savings. Actual results depend on specific deductions and reasonable compensation.
                    </div>

                    <div className="mt-4">
                        <Button variant="outline" className="w-full text-xs h-9">
                            Get Full Analysis <ArrowRight className="w-3 h-3 ml-2" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

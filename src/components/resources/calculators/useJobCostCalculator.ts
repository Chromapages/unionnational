"use client";

import { useState, useMemo } from "react";

export interface CalculatorState {
    revenue: number;
    materials: number;
    labor: number;
    overheadRate: number; // percentage (0-100)
    taxRate: number;      // percentage (0-100)
}

export function useJobCostCalculator() {
    const [state, setState] = useState<CalculatorState>({
        revenue: 10000,
        materials: 2500,
        labor: 1500,
        overheadRate: 15,
        taxRate: 25,
    });

    const results = useMemo(() => {
        const grossProfit = state.revenue - state.materials - state.labor;
        const overheadAmount = (state.revenue * state.overheadRate) / 100;
        const netProfitBeforeTax = grossProfit - overheadAmount;

        // Simplified tax calculation for educational tool
        // In reality, SE tax is 15.3% on 92.35% of net profit, but we'll keep it illustrative
        const seTaxAmount = Math.max(0, netProfitBeforeTax * 0.153);
        const incomeTaxAmount = Math.max(0, (netProfitBeforeTax - seTaxAmount) * (state.taxRate / 100));
        const totalTax = seTaxAmount + incomeTaxAmount;
        const trueTakeHome = Math.max(0, netProfitBeforeTax - totalTax);

        const profitMargin = state.revenue > 0 ? (trueTakeHome / state.revenue) * 100 : 0;

        return {
            grossProfit,
            overheadAmount,
            netProfitBeforeTax,
            seTaxAmount,
            incomeTaxAmount,
            totalTax,
            trueTakeHome,
            profitMargin,
        };
    }, [state]);

    const updateField = (field: keyof CalculatorState, value: number) => {
        setState((prev) => ({ ...prev, [field]: value }));
    };

    return {
        state,
        results,
        updateField,
    };
}

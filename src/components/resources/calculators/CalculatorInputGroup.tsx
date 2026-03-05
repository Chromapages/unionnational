"use client";

import { CalculatorState } from "./useJobCostCalculator";

interface CalculatorInputGroupProps {
    state: CalculatorState;
    onUpdate: (field: keyof CalculatorState, value: number) => void;
}

export function CalculatorInputGroup({ state, onUpdate }: CalculatorInputGroupProps) {
    const inputs = [
        { label: "Total Job Revenue", field: "revenue", min: 0, max: 1000000, step: 1000, isCurrency: true },
        { label: "Materials Cost", field: "materials", min: 0, max: 500000, step: 500, isCurrency: true },
        { label: "Labor Cost", field: "labor", min: 0, max: 500000, step: 500, isCurrency: true },
    ];

    const sliders = [
        { label: "Estimated Overhead", field: "overheadRate", min: 0, max: 100, step: 1, suffix: "%" },
        { label: "Estimated Tax Rate", field: "taxRate", min: 0, max: 100, step: 1, suffix: "%" },
    ];

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
                {inputs.map((input) => (
                    <div key={input.field} className="group">
                        <label className="block text-xs uppercase tracking-[0.2em] text-slate-500 mb-2 group-focus-within:text-gold-600 transition-colors font-bold">
                            {input.label}
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
                            <input
                                type="number"
                                value={state[input.field as keyof CalculatorState]}
                                onChange={(e) => onUpdate(input.field as keyof CalculatorState, Number(e.target.value))}
                                className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-8 pr-4 text-brand-900 font-bold outline-none focus:border-gold-500/50 focus:ring-4 focus:ring-gold-500/5 transition-all text-lg"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="space-y-8 pt-4">
                {sliders.map((slider) => (
                    <div key={slider.field} className="group">
                        <div className="flex justify-between items-center mb-4">
                            <label className="text-xs uppercase tracking-[0.2em] text-slate-500 group-focus-within:text-gold-600 transition-colors font-bold">
                                {slider.label}
                            </label>
                            <span className="text-brand-900 font-bold text-lg">
                                {state[slider.field as keyof CalculatorState]}{slider.suffix}
                            </span>
                        </div>
                        <input
                            type="range"
                            min={slider.min}
                            max={slider.max}
                            step={slider.step}
                            value={state[slider.field as keyof CalculatorState]}
                            onChange={(e) => onUpdate(slider.field as keyof CalculatorState, Number(e.target.value))}
                            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-gold-500"
                        />
                        <div className="flex justify-between mt-2">
                            <span className="text-[10px] text-slate-400 font-bold">0%</span>
                            <span className="text-[10px] text-slate-400 font-bold">100%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

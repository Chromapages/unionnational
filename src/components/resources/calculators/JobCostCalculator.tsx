"use client";

import { motion } from "framer-motion";
import { useJobCostCalculator } from "./useJobCostCalculator";
import { CalculatorInputGroup } from "./CalculatorInputGroup";
import { TaxWaterfallChart } from "./TaxWaterfallChart";
import { CalculatorResultPanel } from "./CalculatorResultPanel";

export function JobCostCalculator() {
    const { state, results, updateField } = useJobCostCalculator();

    return (
        <section className="w-full bg-white py-12 px-4 shadow-sm border border-slate-100 rounded-[3rem] overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
                    {/* Left Side: Inputs */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-10"
                    >
                        <div>
                            <span className="text-gold-700 font-black uppercase tracking-widest text-xs">Interactive Workshop</span>
                            <h2 className="text-3xl sm:text-4xl font-black text-brand-900 font-heading mt-2">
                                Job Cost vs. Take-Home
                            </h2>
                            <p className="text-slate-500 mt-4 leading-relaxed max-w-md">
                                Most contractors stop at Gross Profit. See how overhead and taxes eat into your real income—and how to stop the leak.
                            </p>
                        </div>

                        <CalculatorInputGroup state={state} onUpdate={updateField} />
                    </motion.div>

                    {/* Right Side: Visuals & Results */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-slate-50/50 rounded-[2.5rem] border border-slate-100 p-6 sm:p-10"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-12">
                            <TaxWaterfallChart revenue={state.revenue} results={results} />

                            <CalculatorResultPanel results={results} revenue={state.revenue} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

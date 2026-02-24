"use client";

import { motion } from "framer-motion";

interface TaxWaterfallChartProps {
    revenue: number;
    results: {
        grossProfit: number;
        overheadAmount: number;
        seTaxAmount: number;
        incomeTaxAmount: number;
        trueTakeHome: number;
    };
}

export function TaxWaterfallChart({ revenue, results }: TaxWaterfallChartProps) {
    const items = [
        { label: "Revenue", value: revenue, color: "bg-slate-200", type: "base" },
        { label: "Materials & Labor", value: results.grossProfit - revenue, color: "bg-red-400/20", type: "subtraction" },
        { label: "Overhead", value: -results.overheadAmount, color: "bg-amber-400/20", type: "subtraction" },
        { label: "Self-Employment Tax", value: -results.seTaxAmount, color: "bg-blue-400/20", type: "subtraction" },
        { label: "Income Tax", value: -results.incomeTaxAmount, color: "bg-indigo-400/20", type: "subtraction" },
        { label: "True Take-Home", value: results.trueTakeHome, color: "bg-emerald-500", type: "result" },
    ];

    const maxVal = revenue || 1000;

    // Calculate vertical positions for a waterfall effect
    let currentTotal = revenue;
    const chartData = items.map((item, idx) => {
        if (idx === 0) return { ...item, height: 100, y: 0 };
        if (item.type === "result") return { ...item, height: (item.value / maxVal) * 100, y: 100 - (item.value / maxVal) * 100 };

        const height = (Math.abs(item.value) / maxVal) * 100;
        const y = 100 - (currentTotal / maxVal) * 100;
        currentTotal += item.value;
        return { ...item, height, y };
    });

    return (
        <div className="h-full flex flex-col pt-8">
            <h3 className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-8 text-center font-bold">Revenue Depletion Flow</h3>

            <div className="flex-1 relative min-h-[300px] mb-12 flex justify-between items-end gap-2 px-4">
                {/* Horizontal grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    {[0, 25, 50, 75, 100].map((tick) => (
                        <div key={tick} className="w-full border-t border-slate-100 relative">
                            <span className="absolute -left-8 -top-2 text-[10px] font-bold text-slate-300">{100 - tick}%</span>
                        </div>
                    ))}
                </div>

                {chartData.map((item, idx) => (
                    <div key={item.label} className="relative flex-1 flex flex-col items-center group h-full">
                        <motion.div
                            initial={false}
                            animate={{
                                height: `${Math.max(2, item.height)}%`,
                                top: `${item.y}%`
                            }}
                            className={`w-full max-w-[40px] rounded-sm relative shadow-sm transition-all duration-300 group-hover:shadow-md ${item.color} ${item.type === 'result' ? 'shadow-emerald-500/20' : ''
                                }`}
                        >
                            {/* Tooltip on hover */}
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-brand-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                                {item.label}: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Math.abs(item.value))}
                            </div>
                        </motion.div>

                        {/* Connecting dashed lines for waterfall */}
                        {idx < chartData.length - 1 && item.type !== 'result' && (
                            <motion.div
                                animate={{ top: `${item.y + item.height}%` }}
                                className="absolute left-[calc(100%-8px)] w-full border-t border-dashed border-slate-200 z-0"
                            />
                        )}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-6 gap-2 px-2 text-center">
                {items.map((item) => (
                    <span key={item.label} className="text-[8px] uppercase tracking-tighter text-slate-600 font-black leading-tight break-words">
                        {item.label}
                    </span>
                ))}
            </div>
        </div>
    );
}

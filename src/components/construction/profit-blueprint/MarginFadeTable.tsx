"use client";

import { motion } from "framer-motion";
import { TrendingDown, DollarSign, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";

const fadeData = [
    { revenue: "$750,000", fade2: "$15,000", fade5: "$37,500", fade8: "$60,000" },
    { revenue: "$1,500,000", fade2: "$30,000", fade5: "$75,000", fade8: "$120,000" },
    { revenue: "$3,000,000", fade2: "$60,000", fade5: "$150,000", fade8: "$240,000" },
];

export function MarginFadeTable() {
    return (
        <RevealOnScroll>
            <section className="py-20 lg:py-24 bg-surface">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 lg:mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 border border-rose-100 text-[10px] font-bold uppercase tracking-widest text-rose-600 mb-6">
                            <TrendingDown size={14} /> Profit Leak
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-brand-900 tracking-tight mb-4">
                            What Margin Fade Can Cost
                        </h2>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                            Even small margin leaks compound across jobs. Here&apos;s the math on what your revenue might be silently surrendering.
                        </p>
                    </div>

                    <RevealOnScroll delay={200}>
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-brand-900 text-white">
                                            <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest text-slate-300">
                                                Annual Revenue
                                            </th>
                                            <th className="px-6 py-5 text-center text-xs font-bold uppercase tracking-widest text-rose-400">
                                                2% Margin Fade
                                            </th>
                                            <th className="px-6 py-5 text-center text-xs font-bold uppercase tracking-widest text-rose-500">
                                                5% Margin Fade
                                            </th>
                                            <th className="px-6 py-5 text-center text-xs font-bold uppercase tracking-widest text-rose-600">
                                                8% Margin Fade
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {fadeData.map((row, i) => (
                                            <tr key={i} className="hover:bg-rose-50 transition-colors">
                                                <td className="px-6 py-5 font-bold text-brand-900 text-sm">
                                                    {row.revenue}
                                                </td>
                                                <td className="px-6 py-5 text-center">
                                                    <span className="inline-flex items-center gap-1.5 text-rose-600 font-bold text-sm">
                                                        <TrendingDown size={14} />
                                                        {row.fade2}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 text-center">
                                                    <span className="inline-flex items-center gap-1.5 text-rose-600 font-bold text-base">
                                                        <TrendingDown size={14} />
                                                        {row.fade5}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 text-center">
                                                    <span className="inline-flex items-center gap-1.5 text-rose-600 font-black text-lg">
                                                        <TrendingDown size={14} />
                                                        {row.fade8}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll delay={300}>
                        <div className="mt-10 text-center">
                            <p className="text-sm text-slate-500 max-w-xl mx-auto italic">
                                Even small margin leaks become expensive when they repeat across dozens of jobs each year. The first step is knowing where profit is slipping: labor, materials, subs, change orders, estimating, billing, or cash flow.
                            </p>
                            <div className="mt-6">
                                <Link
                                    href="/construction/profitability-assessment"
                                    className="inline-flex items-center gap-2 text-brand-900 font-bold text-sm hover:text-gold-600 transition-colors"
                                >
                                    <DollarSign size={16} className="text-gold-500" />
                                    <span>Find Your Profit Leaks</span>
                                </Link>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>
        </RevealOnScroll>
    );
}
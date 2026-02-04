"use client";

import { motion } from "framer-motion";
import { Plus, Check, Info } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";

const individualReturns = [
    {
        level: "Basic",
        bestFor: "W-2 / 1099 Filers",
        included: "Federal + 1 state • E-file • Secure portal • EA review • Audit protection",
        price: "$595+"
    },
    {
        level: "Investor / Homeowner",
        bestFor: "Investments, itemized deductions",
        included: "Everything in Basic + investment income, Schedule A, retirement income",
        price: "$795+"
    },
    {
        level: "Self-Employed / Rental",
        bestFor: "Business owners or landlords",
        included: "Everything above + Schedule C (1 business) or Schedule E (up to 2 rentals), depreciation review",
        price: "$995+"
    }
];

const businessReturns = [
    {
        type: "Small Business",
        bestFor: "Under $1M revenue",
        includes: "1120-S / 1065 / Complex LLC • K-1s • Compliance review • EA audit protection",
        price: "$1,800"
    },
    {
        type: "Mid-Size Business",
        bestFor: "$1M–$3M revenue",
        includes: "Multi-owner • payroll review • multi-state considerations",
        price: "$2,800"
    },
    {
        type: "Complex / Multi-Entity",
        bestFor: "$3M+ revenue",
        includes: "Advanced structures • multiple states • multiple entities",
        price: "$3,800+"
    }
];

export function TaxPrepPricingTables() {
    return (
        <section className="w-full py-12 md:py-20 bg-brand-900 rounded-3xl overflow-hidden border border-white/10">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="mb-12 border-b border-white/10 pb-8">
                    <RevealOnScroll>
                        <h2 className="text-3xl md:text-5xl font-bold text-white font-heading mb-4 tracking-tight">
                            2026 Tax Preparation Pricing
                        </h2>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-gold-500/80 text-sm font-medium uppercase tracking-wider mb-6">
                            <span>Prepared by an IRS Enrolled Agent</span>
                            <span className="hidden sm:inline">•</span>
                            <span>3-Year Audit Protection Included</span>
                            <span className="hidden sm:inline">•</span>
                            <span>Private Hotel Incentive</span>
                        </div>
                        <p className="text-slate-400 text-lg flex items-center gap-2 italic">
                            <Info className="w-5 h-5 text-gold-500 shrink-0" />
                            Pricing is based on complexity, not forms. Final pricing is confirmed after review.
                        </p>
                    </RevealOnScroll>
                </div>

                <div className="grid grid-cols-1 gap-16">
                    {/* Individual Returns */}
                    <div>
                        <RevealOnScroll>
                            <h3 className="text-xl font-bold text-gold-500 uppercase tracking-widest mb-8 border-l-4 border-gold-500 pl-4">
                                Individual Tax Returns
                            </h3>
                        </RevealOnScroll>

                        <div className="overflow-x-auto -mx-6 px-6">
                            <table className="w-full border-collapse text-left min-w-[800px]">
                                <thead>
                                    <tr className="border-b border-white/5">
                                        <th className="py-4 font-heading text-white/50 font-bold uppercase tracking-wider text-xs w-[20%]">Level</th>
                                        <th className="py-4 font-heading text-white/50 font-bold uppercase tracking-wider text-xs w-[20%]">Best For</th>
                                        <th className="py-4 font-heading text-white/50 font-bold uppercase tracking-wider text-xs w-[45%]">What's Included</th>
                                        <th className="py-4 font-heading text-white/50 font-bold uppercase tracking-wider text-xs w-[15%] text-right">Starting Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {individualReturns.map((row, idx) => (
                                        <tr key={idx} className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors">
                                            <td className="py-6 font-bold text-white text-lg pr-4">{row.level}</td>
                                            <td className="py-6 text-slate-300 text-sm pr-4">{row.bestFor}</td>
                                            <td className="py-6 text-slate-400 text-sm leading-relaxed pr-8">{row.included}</td>
                                            <td className="py-6 font-black text-gold-500 text-xl text-right whitespace-nowrap">{row.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="mt-6 flex items-center gap-3 text-slate-500 text-sm"
                        >
                            <Plus className="w-4 h-4 text-gold-500" />
                            Additional businesses, rentals, or complexity quoted separately.
                        </motion.div>
                    </div>

                    {/* Business Returns */}
                    <div>
                        <RevealOnScroll>
                            <h3 className="text-xl font-bold text-gold-500 uppercase tracking-widest mb-8 border-l-4 border-gold-500 pl-4">
                                Business Entity Returns
                            </h3>
                        </RevealOnScroll>

                        <div className="overflow-x-auto -mx-6 px-6">
                            <table className="w-full border-collapse text-left min-w-[800px]">
                                <thead>
                                    <tr className="border-b border-white/5">
                                        <th className="py-4 font-heading text-white/50 font-bold uppercase tracking-wider text-xs w-[20%]">Entity Type</th>
                                        <th className="py-4 font-heading text-white/50 font-bold uppercase tracking-wider text-xs w-[20%]">Best For</th>
                                        <th className="py-4 font-heading text-white/50 font-bold uppercase tracking-wider text-xs w-[45%]">Includes</th>
                                        <th className="py-4 font-heading text-white/50 font-bold uppercase tracking-wider text-xs w-[15%] text-right">Starting Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {businessReturns.map((row, idx) => (
                                        <tr key={idx} className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors">
                                            <td className="py-6 font-bold text-white text-lg pr-4">{row.type}</td>
                                            <td className="py-6 text-slate-300 text-sm pr-4">{row.bestFor}</td>
                                            <td className="py-6 text-slate-400 text-sm leading-relaxed pr-8">{row.includes}</td>
                                            <td className="py-6 font-black text-gold-500 text-xl text-right whitespace-nowrap">{row.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

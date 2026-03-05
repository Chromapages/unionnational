"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { motion } from "framer-motion";

const OPTIONAL_SERVICES = [
    {
        service: "Prior-Year Returns",
        range: "$750 – $1,500 / year",
    },
    {
        service: "Amended Returns",
        range: "$650+",
    },
    {
        service: "IRS Notices & Resolution",
        range: "$350 – $1,200",
    },
    {
        service: "Multi-State Filings",
        range: "$200+ per state",
    },
    {
        service: "BOI / FinCEN Filing",
        range: "$250",
    },
];

export function OptionalServicesTable() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 text-white">
            <RevealOnScroll>
                <div className="bg-brand-950 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                    {/* Header */}
                    <div className="px-8 py-10 md:px-12 md:py-14 border-b border-white/10 text-center md:text-left">
                        <h3 className="text-2xl md:text-3xl font-bold text-white font-heading mb-3 tracking-tight">
                            Optional Services <span className="text-white/40 font-normal block md:inline text-lg md:text-xl md:ml-2">(Quoted as Needed)</span>
                        </h3>
                    </div>

                    {/* Table Structure */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/[0.03]">
                                <tr>
                                    <th className="px-8 py-5 md:px-12 text-xs font-bold uppercase tracking-[0.2em] text-gold-500">Service</th>
                                    <th className="px-8 py-5 md:px-12 text-xs font-bold uppercase tracking-[0.2em] text-gold-500">Typical Range</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {OPTIONAL_SERVICES.map((item, index) => (
                                    <motion.tr
                                        key={item.service}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group hover:bg-white/[0.02] transition-colors duration-300"
                                    >
                                        <td className="px-8 py-6 md:px-12">
                                            <span className="text-white/90 font-sans text-base md:text-lg font-medium group-hover:text-white transition-colors">
                                                {item.service}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 md:px-12">
                                            <span className="text-white/70 font-sans text-base md:text-lg font-normal group-hover:text-gold-400 transition-colors">
                                                {item.range}
                                            </span>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer / Note */}
                    <div className="px-8 py-8 md:px-12 bg-white/[0.02] border-t border-white/10">
                        <p className="text-white/50 text-xs md:text-sm leading-relaxed max-w-2xl italic">
                            * Pricing for optional services is estimated based on common scenarios. Final quotes are provided after assessing the volume and complexity of your specific requirements.
                        </p>
                    </div>
                </div>
            </RevealOnScroll>
        </div>
    );
}

"use client";

import { PortableText } from "next-sanity";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface BookOverviewProps {
    fullDescription?: any;
    features?: string[];
    shortDescription?: string;
}

export function BookOverview({ fullDescription, features, shortDescription }: BookOverviewProps) {
    const hasContent = fullDescription || shortDescription;
    if (!hasContent && !features?.length) return null;

    return (
        <section id="overview" className="scroll-mt-24 py-12 bg-white border-b border-slate-100">
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                <h2 className="text-2xl font-bold text-brand-900 font-heading tracking-tight mb-8">
                    Overview
                </h2>

                {/* Notes from Publisher card */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-xl border border-slate-200 bg-slate-50/60 p-8 mb-8"
                >
                    <p className="font-heading italic text-base text-brand-700 font-bold mb-5">
                        Notes From Your Publisher
                    </p>

                    {fullDescription ? (
                        <div className="prose prose-slate max-w-none columns-1 md:columns-2 gap-x-12 text-slate-700 leading-relaxed text-sm">
                            <PortableText value={fullDescription} />
                        </div>
                    ) : shortDescription ? (
                        <p className="text-slate-700 leading-relaxed">{shortDescription}</p>
                    ) : null}
                </motion.div>

                {/* Key takeaways */}
                {features && features.length > 0 && (
                    <div>
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
                            Key Takeaways
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {features.map((f, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -8 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-start gap-3 text-sm text-slate-700"
                                >
                                    <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                                    <span>{f}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </section>
    );
}

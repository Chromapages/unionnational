"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ShieldCheck } from "lucide-react";

interface FounderSectionProps {
    videoUrl?: string;
    videoFileUrl?: string;
    imageUrl?: string;
    imageAlt?: string;
}

export function FounderSection({ videoUrl, videoFileUrl, imageUrl, imageAlt }: FounderSectionProps) {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Content Column */}
                    <RevealOnScroll>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-600 text-[10px] font-bold uppercase tracking-widest mb-6">
                            Founder's Message
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold text-brand-900 mb-6 font-heading leading-tight">
                            Strategy Built on <br />
                            <span className="text-gold-500">Uncompromising Precision.</span>
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed font-sans mb-8">
                            At Union National Tax, we believe tax preparation is just the baseline. True value lies in the strategy that happens before the filing. Our mission is to bridge the gap between complex tax code and the agile needs of modern business.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                <div className="w-10 h-10 rounded-full bg-brand-900 flex items-center justify-center text-gold-500">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-brand-900 font-sans text-sm tracking-wide uppercase">IRS Enrolled Agent Certified</span>
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* Image Column */}
                    <RevealOnScroll delay={0.2}>
                        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl group border-4 border-white">
                            {imageUrl ? (
                                <Image
                                    src={imageUrl}
                                    alt={imageAlt || "Founder"}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-brand-900 flex items-center justify-center">
                                    <div className="relative w-3/4 h-3/4">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/20 to-transparent rounded-3xl" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-white/30 text-lg font-bold">Founder Photo</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
}

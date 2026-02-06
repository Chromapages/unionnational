"use client";

import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Play, ShieldCheck } from "lucide-react";

interface FounderSectionProps {
    videoUrl?: string;
    videoFileUrl?: string;
}

export function FounderSection({ videoUrl, videoFileUrl }: FounderSectionProps) {
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

                    {/* Video Column */}
                    <RevealOnScroll delay={0.2}>
                        <div className="relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl group border-4 border-white">
                            {videoFileUrl ? (
                                <video
                                    src={videoFileUrl}
                                    className="w-full h-full object-cover"
                                    controls
                                    playsInline
                                    poster="/vsl-placeholder.jpg"
                                />
                            ) : videoUrl ? (
                                <iframe
                                    src={videoUrl}
                                    className="w-full h-full object-cover"
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <div className="absolute inset-0 bg-brand-900 flex items-center justify-center">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gold-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                                        <button className="relative w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center text-brand-950 shadow-xl transform transition-transform group-hover:scale-110">
                                            <Play className="fill-current w-8 h-8 ml-1" />
                                        </button>
                                    </div>
                                    <p className="absolute bottom-8 text-white/50 text-xs font-bold uppercase tracking-widest">
                                        Watch Strategy Briefing
                                    </p>
                                </div>
                            )}
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
}

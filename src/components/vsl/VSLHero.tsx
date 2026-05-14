"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, ChevronRight, Play } from "lucide-react";
import Link from "next/link";
import VideoEmbed from "@/components/ui/VideoEmbed";

interface VSLHeroProps {
    badge?: string;
    headline?: string;
    subheadline?: string;
    videoUrl?: string;
    videoPoster?: string;
    ctaText?: string;
    ctaUrl?: string;
    month: string;
}

export function VSLHero({
    badge,
    headline,
    subheadline,
    videoUrl,
    videoPoster,
    ctaText,
    ctaUrl,
    month
}: VSLHeroProps) {
    return (
        <section className="relative overflow-hidden bg-[#050A14] pt-20 pb-24 md:pt-32 md:pb-40 px-4">
            {/* Fintech Grid & Gradient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(34,197,94,0.08)_0%,transparent_70%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_60%,rgba(59,130,246,0.06)_0%,transparent_60%)]" />
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}
                />
            </div>

            <div className="relative max-w-5xl mx-auto flex flex-col items-center">
                {/* Badge */}
                {badge && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-sm"
                    >
                        <span className="text-[11px] font-bold text-emerald-400 tracking-[0.2em] uppercase font-mono">
                            {badge}
                        </span>
                    </motion.div>
                )}

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-black text-white text-center leading-[1.05] mb-8 font-heading tracking-tighter"
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/70">
                        {headline || "Achieve Massive Growth with our Proven System"}
                    </span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg md:text-xl text-slate-400 text-center max-w-2xl mb-12 leading-relaxed"
                >
                    {subheadline || "Specialized financial resolution and strategic planning for elite business owners."}
                </motion.p>

                {/* Video Embed */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="w-full relative rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(34,197,94,0.1)] border border-white/10 mb-16 group"
                >
                    <div className="aspect-video bg-[#0D1526] relative">
                        {videoUrl ? (
                            <VideoEmbed videoUrl={videoUrl} posterImage={videoPoster} />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center text-black shadow-[0_0_40px_rgba(34,197,94,0.4)] hover:scale-110 transition-transform cursor-pointer">
                                    <Play className="w-10 h-10 ml-1 fill-current" />
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="w-full flex flex-col md:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href={ctaUrl || "#cta"}
                        className="w-full md:w-auto px-12 py-5 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-lg rounded-xl shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-all hover:translate-y-[-2px] flex items-center justify-center gap-2 group"
                    >
                        {ctaText || "Book Strategy Call"}
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                        href="tel:+18005550123"
                        className="w-full md:w-auto px-12 py-5 bg-white/5 hover:bg-white/10 text-white font-bold text-lg rounded-xl border border-white/15 transition-all flex items-center justify-center gap-2"
                    >
                        <Phone className="w-5 h-5" />
                        Or Call Now
                    </Link>
                </motion.div>

                {/* Urgency Trigger */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-10 flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/5"
                >
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                    </span>
                    <span className="text-[13px] font-medium text-slate-400">
                        Limited Strategy Call Spots Available — <span className="text-red-400 font-bold">{month}</span>
                    </span>
                </motion.div>
            </div>
        </section>
    );
}

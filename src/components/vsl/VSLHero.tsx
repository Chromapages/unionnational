"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, Phone, ChevronRight } from "lucide-react";
import Link from "next/link";
import VideoEmbed from "@/components/ui/VideoEmbed";

interface VSLHeroProps {
    badge?: any;
    headline?: string;
    subheadline?: string;
    videoUrl?: string;
    ctaText?: string;
    ctaUrl?: string;
    month: string;
}

export function VSLHero({
    badge,
    headline,
    subheadline,
    videoUrl,
    ctaText,
    ctaUrl,
    month
}: VSLHeroProps) {
    return (
        <section className="relative overflow-hidden bg-radial-at-t from-brand-900 to-slate-950 pt-16 pb-20 md:pt-24 md:pb-32 px-4">
            {/* Background Decorative patterns */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-brand-400 rounded-full blur-[100px]" />
            </div>

            <div className="relative max-w-5xl mx-auto flex flex-col items-center">
                {/* Badge */}
                {badge && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 px-4 py-1.5 rounded-full bg-gold-100/10 border border-gold-500/30 backdrop-blur-sm"
                    >
                        <span className="text-sm font-bold text-gold-400 tracking-wider uppercase">
                            {badge}
                        </span>
                    </motion.div>
                )}

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-black text-white text-center leading-[1.1] mb-6 font-heading tracking-tight"
                >
                    {headline || "Achieve Massive Growth with our Proven System"}
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg md:text-xl text-slate-300 text-center max-w-3xl mb-10 leading-relaxed"
                >
                    {subheadline || "Specialized financial resolution and strategic planning for elite business owners."}
                </motion.p>

                {/* Video Embed */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="w-full relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 mb-12 group"
                >
                    <div className="aspect-video bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
                        {videoUrl ? (
                            <VideoEmbed videoUrl={videoUrl} />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-900/50">
                                <div className="w-20 h-20 rounded-full bg-gold-500 flex items-center justify-center text-brand-900 animate-pulse">
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
                        href={ctaUrl || "#"}
                        className="w-full md:w-auto px-10 py-5 bg-gold-500 hover:bg-gold-600 text-brand-900 font-black text-lg rounded-xl shadow-[0_0_20px_rgba(212,160,23,0.3)] transition-all hover:scale-105 flex items-center justify-center gap-2 group"
                    >
                        {ctaText || "Book Strategy Call"}
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                        href="tel:+18005550123"
                        className="w-full md:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-bold text-lg rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2"
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
                    className="mt-8 flex items-center gap-2"
                >
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    <span className="text-sm font-medium text-slate-400">
                        Limited Availability — <span className="text-red-400 font-bold">{month}</span>
                    </span>
                </motion.div>
            </div>
        </section>
    );
}

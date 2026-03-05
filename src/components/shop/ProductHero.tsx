"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Folder } from "lucide-react";
import { TrustMetrics } from "./TrustMetrics";

interface ProductHeroProps {
    title: string;
    subtitle: string;
    imageUrl?: string;
    format?: string;
}

export function ProductHero({ title, subtitle, imageUrl, format }: ProductHeroProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-3xl bg-transparent"
        >
            <div className="flex flex-col gap-10 md:flex-row">
                <div className="w-full md:w-5/12">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/50 transition-transform duration-500 group-hover:-translate-y-2">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={title}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full flex-col items-center justify-center bg-slate-50 text-slate-300">
                                <Folder className="h-16 w-16 mb-4 opacity-50" />
                                <span className="text-xs font-bold uppercase tracking-widest">No Preview</span>
                            </div>
                        )}
                        {format && (
                            <div className="absolute right-4 top-4 rounded-full border border-slate-200 bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-900 shadow-sm backdrop-blur-md">
                                {format}
                            </div>
                        )}

                        {/* Dossier Effect Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-white/10 pointer-events-none" />
                    </div>
                </div>

                <div className="flex flex-1 flex-col justify-center gap-8">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-900 shadow-sm mb-6">
                            <BadgeCheck className="h-3.5 w-3.5 text-gold-500" />
                            Verified Strategy
                        </div>
                        <h1 className="text-4xl font-bold text-brand-900 md:text-5xl font-heading leading-tight tracking-tight">
                            {title}
                        </h1>
                        <p className="mt-6 text-lg text-slate-600 font-sans leading-relaxed max-w-xl">
                            {subtitle}
                        </p>
                    </div>

                </div>
            </div>

            <div className="mt-12 w-full">
                <TrustMetrics />
            </div>
        </motion.section>
    );
}

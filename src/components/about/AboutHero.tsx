"use client";

import { motion } from "framer-motion";

interface AboutHeroProps {
    title: string;
    subtitle: string;
    badge?: string;
}

export function AboutHero({ title, subtitle, badge }: AboutHeroProps) {
    return (
        <section className="relative bg-brand-900 pt-32 pb-24 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.05),_transparent_55%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(15,50,46,0.9),_rgba(7,18,16,0.95))]" />
            <div className="absolute -top-24 right-0 h-[520px] w-[520px] translate-x-1/3 rounded-full bg-gold-500/10 blur-[140px]" />
            <div className="absolute bottom-0 left-0 h-[420px] w-[420px] -translate-x-1/3 translate-y-1/3 rounded-full bg-gold-500/5 blur-[160px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(255,204,102,0.08),_transparent_45%),radial-gradient(circle_at_70%_80%,_rgba(13,46,43,0.6),_transparent_55%)] opacity-80" />

            <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-gold-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
                        {badge || "About The Firm"}
                    </div>

                    <h1 className="mt-8 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl font-heading leading-[1.05]">
                        {title}
                    </h1>

                    <p className="mt-6 max-w-xl text-lg text-brand-100/80 md:text-xl">
                        {subtitle}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                    className="relative"
                >
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-100/70">North Star</p>
                        <h2 className="mt-4 text-2xl font-semibold text-white font-heading">
                            Engineering tax certainty for the entrepreneurs shaping the modern economy.
                        </h2>
                        <p className="mt-4 text-sm text-brand-100/75">
                            Every engagement is designed to move capital toward growth, backed by transparent planning and auditable strategy.
                        </p>
                        <div className="mt-6 grid grid-cols-2 gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-100/70">
                            <div className="rounded-2xl border border-white/10 bg-brand-900/40 px-4 py-3">
                                Predictable outcomes
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-brand-900/40 px-4 py-3">
                                Institutional rigor
                            </div>
                        </div>
                    </div>
                    <div className="pointer-events-none absolute -bottom-8 -right-6 h-32 w-32 rounded-full bg-gold-500/30 blur-3xl" />
                </motion.div>
            </div>
        </section>
    );
}

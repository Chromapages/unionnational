"use client";

import { motion } from "framer-motion";


interface AboutHeroProps {
    title: string;
    subtitle: string;
    badge?: string;
}

export function AboutHero({ title, subtitle, badge }: AboutHeroProps) {
    return (
        <section className="relative bg-brand-900 pt-28 pb-16 overflow-hidden border-b border-white/5">
            {/* Solid Midnight Forest Background - "The Digital Vault" */}
            <div className="absolute inset-0 bg-brand-900" />

            {/* Subtle Grid Pattern for Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Radial Gradient for Focus */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.03),_transparent_70%)]" />

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.1fr_0.9fr] items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/20 bg-gold-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-gold-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
                            {badge || "EST. 2015"}
                        </div>

                        <h1 className="mt-8 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl font-heading leading-[0.95]">
                            {title || "The Architects of Modern Wealth."}
                        </h1>

                        <p className="mt-8 max-w-xl text-lg text-brand-100/70 md:text-xl font-sans leading-relaxed">
                            {subtitle || "Union National Tax bridges the gap between complex IRS regulations and the agile needs of modern consultants, creators, and agencies."}
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <button className="bg-gold-500 text-brand-950 px-8 py-4 rounded-lg font-bold hover:bg-gold-400 transition-colors shadow-[0_0_20px_-5px_rgba(212,175,55,0.3)]">
                                Book Consultation
                            </button>
                            <button className="px-8 py-4 rounded-lg font-bold text-white border border-white/10 hover:bg-white/5 transition-colors">
                                Explore Our Firm
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        {/* Abstract Visual - The Secure Vault */}
                        <div className="relative aspect-square max-w-md mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/20 to-transparent rounded-3xl rotate-6 blur-2xl" />
                            <div className="relative h-full w-full rounded-3xl border border-white/10 bg-brand-950/50 backdrop-blur-sm p-8 flex flex-col justify-center border-l-gold-500/50 border-l-4 shadow-2xl">
                                <div className="space-y-8">
                                    <div className="flex items-start gap-4">
                                        <div className="h-10 w-10 rounded-full bg-gold-500/10 flex items-center justify-center border border-gold-500/20 text-gold-500 font-bold">1</div>
                                        <div>
                                            <h3 className="text-white font-heading font-semibold text-lg">Entity Structure</h3>
                                            <p className="text-sm text-brand-100/60 mt-1">Optimized for liability and tax efficiency.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="h-10 w-10 rounded-full bg-gold-500/10 flex items-center justify-center border border-gold-500/20 text-gold-500 font-bold">2</div>
                                        <div>
                                            <h3 className="text-white font-heading font-semibold text-lg">Strategic Planning</h3>
                                            <p className="text-sm text-brand-100/60 mt-1">Quarterly projections to eliminate surprises.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="h-10 w-10 rounded-full bg-gold-500/10 flex items-center justify-center border border-gold-500/20 text-gold-500 font-bold">3</div>
                                        <div>
                                            <h3 className="text-white font-heading font-semibold text-lg">Compliance & Defense</h3>
                                            <p className="text-sm text-brand-100/60 mt-1">Audit-proof documentation and support.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

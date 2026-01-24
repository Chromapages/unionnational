"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { ShopStatsBar } from "./ShopStatsBar";

interface ShopHeroProps {
    title: string;
    subtitle: string;
}

export function ShopHero({ title, subtitle }: ShopHeroProps) {
    return (
        <section className="relative bg-brand-900 pt-32 pb-32 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-900 via-brand-900 to-brand-800 z-0" />
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3 z-0" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/3 translate-y-1/3 z-0" />

            <div className="relative max-w-7xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gold-400 text-[10px] font-bold uppercase tracking-widest mb-8 shadow-sm backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                        Premium Resources
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight mb-8 leading-[1.1] font-heading">
                        {title}
                    </h1>

                    <p className="text-lg md:text-xl text-brand-100/80 leading-relaxed max-w-2xl mx-auto mb-16">
                        {subtitle}
                    </p>
                </motion.div>

                <div className="relative z-20">
                    <ShopStatsBar />
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-30 text-brand-200"
            >
                <a
                    href="#browse"
                    className="flex flex-col items-center gap-2 hover:text-gold-400 transition-colors opacity-50 hover:opacity-80"
                >
                    <span className="text-[10px] uppercase tracking-widest">Scroll to Explore</span>
                    <ArrowDown className="w-4 h-4 animate-bounce" />
                </a>
            </motion.div>
        </section>
    );
}

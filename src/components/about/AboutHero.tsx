"use client";

import { motion } from "framer-motion";

interface AboutHeroProps {
    title: string;
    subtitle: string;
    badge?: string;
}

export function AboutHero({ title, subtitle, badge }: AboutHeroProps) {
    return (
        <section className="relative bg-brand-900 pt-32 pb-20 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-900 via-brand-900 to-brand-800" />
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
            
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gold-400 text-[10px] font-bold uppercase tracking-widest mb-8 shadow-sm backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                        {badge || "About The Firm"}
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-8 leading-[1.1] font-heading">
                        {title}
                    </h1>
                    
                    <p className="text-lg md:text-xl text-brand-100/80 leading-relaxed max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </motion.div>
            </div>

        </section>
    );
}

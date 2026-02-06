"use client";

import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface TeamHeroProps {
    badge?: string;
    title?: string;
    subtitle?: string;
}

export const TeamHero = ({
    badge = "Our Team",
    title = "The Strategists Behind the Numbers",
    subtitle = "A collective of high-impact tax professionals and financial architects dedicated to your growth."
}: TeamHeroProps) => {
    return (
        <section className="relative bg-brand-900 pt-32 pb-20 overflow-hidden border-b border-white/5">
            {/* Background Texture & Depth */}
            <div className="absolute inset-0 bg-brand-900" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.03),_transparent_70%)]" />

            {/* Decorative Glow elements */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
                <RevealOnScroll>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 rounded-full border border-gold-500/20 bg-gold-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-gold-400 mb-8"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
                        {badge}
                    </motion.div>

                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-8 font-heading leading-[1.05] max-w-4xl mx-auto">
                        {title}
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg text-brand-100/70 md:text-xl font-sans leading-relaxed">
                        {subtitle}
                    </p>
                </RevealOnScroll>
            </div>
        </section>
    );
};

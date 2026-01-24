"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface MissionStatementProps {
    mission: string;
    vision?: string;
}

export function MissionStatement({ mission, vision }: MissionStatementProps) {
    return (
        <section className="max-w-5xl mx-auto px-6 mb-32 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
            >
                {/* Decorative Elements */}
                <Quote className="w-16 h-16 text-gold-500/20 absolute -top-8 -left-8 md:-left-16" />
                <Quote className="w-16 h-16 text-gold-500/20 absolute -bottom-8 -right-8 md:-right-16" />

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-900 leading-tight mb-8 font-heading relative z-10">
                    {mission}
                </h2>

                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-8" />

                {vision && (
                    <p className="text-lg text-zinc-600 max-w-3xl mx-auto leading-relaxed">
                        {vision}
                    </p>
                )}
            </motion.div>
        </section>
    );
}

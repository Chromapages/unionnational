"use client";

import { ShieldCheck, FileCheck, Lock, BarChart3, PhoneCall } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { motion } from "framer-motion";

const INCLUDED_FEATURES = [
    {
        title: "3-Year Audit Protection",
        icon: ShieldCheck,
    },
    {
        title: "EA-Prepared Return",
        icon: FileCheck,
    },
    {
        title: "Secure Client Portal",
        icon: Lock,
    },
    {
        title: "Accuracy & Compliance Review",
        icon: BarChart3,
    },
    {
        title: "Post-Filing Support",
        icon: PhoneCall,
    },
];

export function IncludedFeatures() {
    return (
        <div className="w-full bg-brand-950/90 border-y border-white/5 py-12 md:py-16 relative overflow-hidden">
            {/* Subtle background glow/texture */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-600/5 rounded-full blur-[100px]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                <RevealOnScroll>
                    <h3 className="text-[11px] md:text-sm font-bold uppercase tracking-[0.3em] text-gold-400 mb-12">
                        What&apos;s Included With Every Return
                    </h3>
                </RevealOnScroll>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12">
                    {INCLUDED_FEATURES.map((feature, index) => (
                        <RevealOnScroll key={feature.title} delay={index * 0.1}>
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="flex flex-col items-center gap-4 group cursor-default"
                            >
                                <div className="relative">
                                    {/* Icon Background Glow */}
                                    <div className="absolute inset-0 bg-gold-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    <feature.icon className="w-10 h-10 md:w-12 md:h-12 text-gold-500 transition-all duration-300 group-hover:scale-110 group-hover:text-gold-400" strokeWidth={1.5} />
                                </div>
                                <span className="text-white/80 font-sans text-xs md:text-sm font-semibold tracking-wide leading-tight px-4 transition-colors duration-300 group-hover:text-white">
                                    {feature.title}
                                </span>
                            </motion.div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </div>
    );
}

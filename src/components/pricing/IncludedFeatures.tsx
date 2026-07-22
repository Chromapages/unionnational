"use client";

import { ShieldCheck, FileCheck, Lock, BarChart3, PhoneCall } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";

const INCLUDED_FEATURES = [
    {
        title: "3-Year Audit Protection",
        icon: ShieldCheck,
        emphasized: true,
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
        <section className="relative mt-6 w-full overflow-hidden border-y border-white/10 bg-brand-950/90 pb-16 pt-10 md:mt-10 md:pb-20 md:pt-14" aria-labelledby="included-features-heading">
            {/* Subtle background glow/texture */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-600/5 rounded-full blur-[100px]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                <RevealOnScroll>
                    <SectionHeader
                        label="Return protection"
                        heading="What&apos;s Included With Every Return"
                        headingId="included-features-heading"
                        dark
                        className="mb-8 md:mb-12"
                    />
                </RevealOnScroll>

                <div className="flex flex-col gap-3 text-left md:grid md:grid-cols-5 md:gap-6 md:text-center">
                    {INCLUDED_FEATURES.map((feature, index) => (
                        <RevealOnScroll key={feature.title} delay={index * 0.1}>
                            <motion.div
                                whileHover={{ y: -3 }}
                                className={`group flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors duration-300 md:flex-col md:justify-center md:border-transparent md:bg-transparent md:px-2 md:py-4 ${feature.emphasized ? "border-gold-500/35 bg-gold-500/10 md:bg-transparent" : "border-white/10 bg-white/[0.03]"}`}
                            >
                                <div className="relative shrink-0">
                                    {/* Icon Background Glow */}
                                    <div className="absolute inset-0 bg-gold-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    <feature.icon
                                        className={`${feature.emphasized ? "h-8 w-8 md:h-12 md:w-12" : "h-6 w-6 md:h-10 md:w-10"} text-gold-500 transition-all duration-300 group-hover:scale-110 group-hover:text-gold-400`}
                                        strokeWidth={1.75}
                                    />
                                </div>
                                <span className={`font-sans text-sm leading-tight tracking-wide text-white/80 transition-colors duration-300 group-hover:text-white md:px-1 ${feature.emphasized ? "font-semibold text-white" : "font-medium"}`}>
                                    {feature.title}
                                </span>
                            </motion.div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
}

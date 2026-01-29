"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";

// Placeholder logos - In production this would fetch from Sanity or use real assets
// Using text placeholders styled like logos for now to avoid broken images
const placeholderLogos = [
    { name: "TechStart Inc", color: "bg-blue-500" },
    { name: "Growth Fund", color: "bg-green-500" },
    { name: "Creative Agency", color: "bg-purple-500" },
    { name: "Build Corp", color: "bg-orange-500" },
    { name: "Health Plus", color: "bg-red-500" },
];

interface ClientLogosSectionProps {
    logos?: any[];
}

export function ClientLogosSection({ logos }: ClientLogosSectionProps) {
    const hasLogos = logos && logos.length > 0;

    return (
        <section className="relative overflow-hidden border-y border-white/5 bg-[var(--color-background)] py-16">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(245,158,11,0.03),_rgba(139,92,246,0.03),_rgba(245,158,11,0.03))]" />
            <div className="relative mx-auto max-w-6xl px-6">
                <div className="flex flex-col items-center gap-6 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                        Trusted by 1,000+ Business Owners
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-50 transition-opacity hover:opacity-100">
                        {hasLogos ? (
                            logos.map((logo, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.05, filter: "grayscale(0%)" }}
                                    className="relative h-8 w-32 grayscale invert"
                                >
                                    {logo.asset ? (
                                        <Image
                                            src={urlFor(logo.asset).url()}
                                            alt={logo.alt || "Client Logo"}
                                            fill
                                            className="object-contain"
                                        />
                                    ) : (
                                        <span className="font-heading font-black text-2xl text-white/20">
                                            {logo.alt || "Logo"}
                                        </span>
                                    )}
                                </motion.div>
                            ))
                        ) : (
                            placeholderLogos.map((logo, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.05, filter: "grayscale(0%)" }}
                                    className="font-heading font-black text-2xl text-white/20 grayscale"
                                >
                                    {logo.name}
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}


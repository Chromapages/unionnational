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
        <section className="py-20 bg-slate-50 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <p className="text-sm font-bold text-brand-300 uppercase tracking-widest mb-10 font-sans">
                    Trusted by 1,000+ Business Owners
                </p>

                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {hasLogos ? (
                        logos.map((logo, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05, filter: "grayscale(0%)", opacity: 1 }}
                                className="relative h-8 w-32"
                            >
                                {logo.asset ? (
                                    <Image
                                        src={urlFor(logo.asset).url()}
                                        alt={logo.alt || "Client Logo"}
                                        fill
                                        className="object-contain"
                                    />
                                ) : (
                                    <span className="font-heading font-black text-2xl text-brand-200 hover:text-brand-900 transition-colors cursor-default">
                                        {logo.alt || "Logo"}
                                    </span>
                                )}
                            </motion.div>
                        ))
                    ) : (
                        placeholderLogos.map((logo, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05, filter: "grayscale(0%)", opacity: 1 }}
                                className="font-heading font-black text-2xl text-brand-200 hover:text-brand-900 transition-colors cursor-default"
                            >
                                {logo.name}
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}

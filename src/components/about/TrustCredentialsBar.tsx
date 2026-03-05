"use client";

import { motion } from "framer-motion";
import { ShieldCheck, GraduationCap, Award, Medal } from "lucide-react";

const credentials = [
    { icon: ShieldCheck, label: "IRS Enrolled Agent", sublabel: "Federally Licensed" },
    { icon: GraduationCap, label: "MBA", sublabel: "Business Administration" },
    { icon: Award, label: "FSCP®", sublabel: "Financial Services Certified" },
    { icon: Medal, label: "LUTCF", sublabel: "Life Underwriter Fellow" },
];

export function TrustCredentialsBar() {
    return (
        <section className="bg-[var(--color-background)] py-16 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-x-0 md:divide-x divide-white/10">
                    {credentials.map((cred, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-[var(--color-primary)]/20 transition-all duration-300">
                                <cred.icon className="w-8 h-8 text-[var(--color-primary)]" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-[var(--color-text)] font-bold text-lg mb-1 font-heading tracking-wide">{cred.label}</h3>
                            <p className="text-[var(--color-secondary)]/60 text-xs font-sans uppercase tracking-wider font-semibold">{cred.sublabel}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}


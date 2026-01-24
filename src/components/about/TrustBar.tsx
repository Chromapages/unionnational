"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap, ShieldCheck, Scale, FileCheck } from "lucide-react";

const badges = [
    { label: "Enrolled Agent", icon: ShieldCheck, sub: "Highest IRS Credential" },
    { label: "MBA", icon: GraduationCap, sub: "Master of Business Admin" },
    { label: "FSCP®", icon: Award, sub: "Financial Services Certified" },
    { label: "LUTCF®", icon: FileCheck, sub: "Life Underwriter Fellow" },
    { label: "Tax Court", icon: Scale, sub: "Authorized Practitioner" },
];

export function TrustBar() {
    return (
        <section className="w-full border-y border-zinc-200 bg-zinc-50/50">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                    {badges.map((badge, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity"
                        >
                            <badge.icon className="w-8 h-8 text-gold-600" />
                            <div className="text-left">
                                <div className="font-bold text-brand-900 text-sm leading-tight">
                                    {badge.label}
                                </div>
                                <div className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">
                                    {badge.sub}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

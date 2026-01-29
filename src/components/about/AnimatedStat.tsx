"use client";

import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimatedStatProps {
    value: number;
    suffix?: string;
    prefix?: string;
    label: string;
    icon: React.ReactNode;
    delay?: number;
}

export function AnimatedStat({ value, suffix = "", prefix = "", label, icon, delay = 0 }: AnimatedStatProps) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    const spring = useSpring(0, {
        duration: 2500,
        bounce: 0,
    });

    const display = useTransform(spring, (current) => {
        // Simple formatting for now, can be enhanced with Intl
        const val = Math.round(current);
        if (val >= 1000 && val < 1000000) return `${(val / 1000).toFixed(1)}K`; // 1.2K
        if (val >= 1000000) return `${(val / 1000000).toFixed(0)}M`; // 50M
        return val.toLocaleString();
    });

    useEffect(() => {
        if (inView) {
            setTimeout(() => {
                spring.set(value);
            }, delay * 1000);
        }
    }, [inView, value, spring, delay]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay }}
            className="group bg-white p-8 rounded-2xl border border-zinc-100 shadow-sm hover:bg-slate-50/30 hover:shadow-lg hover:border-gold-500/40 transition-[background-color,border-color,box-shadow] duration-300 flex flex-col items-center justify-center text-center"
        >
            <div className="w-14 h-14 bg-brand-50 text-gold-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-900 group-hover:text-gold-400 transition-colors duration-300">
                {icon}
            </div>
            <div className="text-4xl font-bold text-brand-900 mb-2 font-heading flex items-baseline">
                {prefix}
                <motion.span>{display}</motion.span>
                {suffix}
            </div>
            <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest font-sans group-hover:text-gold-600 transition-colors">
                {label}
            </div>
        </motion.div>
    );
}

"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { useIntersectionInView } from "@/hooks/useIntersectionInView";

interface AnimatedStatProps {
    value: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    className?: string;
}

export function AnimatedStat({ value, suffix = "", prefix = "", duration = 2, className }: AnimatedStatProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useIntersectionInView(ref, { once: true, rootMargin: "-20px" });

    const count = useMotionValue(0);

    const display = useTransform(count, (current) => {
        // Format number with commas if needed, though for animation simply rounding is often enough
        // For more complex formatting, Intl.NumberFormat could be used inside the transform
        return `${prefix}${Math.round(current).toLocaleString()}${suffix}`;
    });

    useEffect(() => {
        if (inView) {
            const controls = animate(count, value, {
                duration,
                ease: "easeOut",
            });
            return () => controls.stop();
        }
    }, [inView, value, count, duration]);

    return <motion.span ref={ref} className={className}>{display}</motion.span>;
}

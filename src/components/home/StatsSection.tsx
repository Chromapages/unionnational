"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Briefcase, Clock, Users, ArrowUpRight } from "lucide-react";

// Hook for counting animation
const useCounter = (end: number, duration: number = 2000, start: boolean = false) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start) return;

        let startTime: number | null = null;
        let animationFrameId: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            // Ease out quart
            const ease = 1 - Math.pow(1 - percentage, 4);

            setCount(Math.floor(end * ease));

            if (progress < duration) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [end, duration, start]);

    return count;
};

// Component to handle individual stat visibility
const StatCounter = ({ value, label, suffix = "+", prefix = "" }: { value: number, label: string, suffix?: string, prefix?: string }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const count = useCounter(value, 2000, isVisible);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className="text-center sm:text-left">
            <div className="text-4xl lg:text-5xl font-bold tracking-tight text-gold-500 font-heading tabular-nums">
                {prefix}{count.toLocaleString()}{suffix}
            </div>
            <div className="text-xs font-bold text-white/80 uppercase tracking-widest leading-tight mt-2 font-heading">
                {label}
            </div>
        </div>
    );
};

export function StatsSection() {
    return (
        <section
            id="about"
            className="relative py-24 bg-slate-50 border-y border-slate-200 overflow-hidden"
        >
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-px h-full bg-slate-200" />
                <div className="absolute top-0 left-2/4 w-px h-full bg-slate-200" />
                <div className="absolute top-0 left-3/4 w-px h-full bg-slate-200" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header Content */}
                <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
                    <RevealOnScroll>
                        <span className="text-xs font-bold uppercase tracking-[0.2em] block mb-6 text-gold-600 font-heading">
                            Our Mission
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] text-brand-900 font-heading">
                            Local Experts. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-800 to-brand-500">
                                National Results.
                            </span>
                        </h2>
                    </RevealOnScroll>

                    <RevealOnScroll delay={200}>
                        <div className="prose prose-lg text-slate-600 font-sans">
                            <p className="leading-relaxed">
                                We are strategic partners for contractors and e-commerce owners, providing the personalized attention of a local firm with the capabilities of a national enterprise.
                            </p>
                            <div className="flex items-center gap-2 mt-6 text-brand-900 font-bold text-sm uppercase tracking-wide cursor-pointer group w-fit">
                                Read Our Story <ArrowUpRight className="w-4 h-4 text-gold-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* Primary Highlight Card */}
                    <RevealOnScroll className="lg:col-span-12 relative rounded-3xl overflow-hidden bg-brand-900 text-white p-8 md:p-12 lg:p-16 shadow-2xl group min-h-[400px] flex items-center">
                        <Image
                            src="/images/stat-bg.png"
                            alt="Tax Strategy Meeting"
                            fill
                            className="object-cover opacity-20 group-hover:scale-105 transition-transform duration-1000 mix-blend-overlay"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/80 to-transparent z-10" />

                        <div className="relative z-20 grid md:grid-cols-2 gap-12 items-center w-full">
                            <div>
                                <div className="text-gold-500 font-bold mb-4 flex items-center gap-2">
                                    <span className="w-8 h-px bg-gold-500"></span>
                                    <span>Impact</span>
                                </div>
                                <h3 className="text-3xl md:text-5xl font-bold font-heading leading-tight mb-6">
                                    Securing your legacy through <br /> intelligent planning.
                                </h3>
                                <p className="text-slate-400 font-sans max-w-md leading-relaxed">
                                    Using advanced strategies like S-Corp elections and defined benefit plans to maximize wealth retention.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-8 md:gap-12 border-l border-white/10 pl-8 md:pl-12">
                                <StatCounter value={500} label="Clients Served" suffix="+" />
                                <StatCounter value={3528} label="Successful Cases" suffix="+" />
                                <StatCounter value={48} label="Years Experience" suffix="+" />
                                <StatCounter value={6} label="Certified Experts" suffix="+" />
                            </div>
                        </div>
                    </RevealOnScroll>

                </div>
            </div>
        </section>
    );
}

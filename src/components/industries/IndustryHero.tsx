"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle2, TrendingUp, ShieldCheck, LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";

interface IndustryHeroProps {
    title: string;
    highlight: string;
    subtitle: string;
    ctaText: string;
    ctaUrl: string;
    videoUrl?: string;
    eyebrow: string;
    eyebrowIcon: LucideIcon;
    stats: {
        label: string;
        value: string;
        icon: LucideIcon;
        subValue?: string;
    }[];
}

export function IndustryHero({
    title,
    highlight,
    subtitle,
    ctaText,
    ctaUrl,
    videoUrl,
    eyebrow,
    eyebrowIcon: EyebrowIcon,
    stats
}: IndustryHeroProps) {
    return (
        <section className="relative w-full min-h-[90dvh] flex items-center pt-32 pb-20 bg-brand-950 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(212,175,55,0.05)_0,_transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,_rgba(13,46,43,0.3)_0,_transparent_50%)]"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                
                {/* Abstract Noise/Texture */}
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    
                    {/* Left: Content */}
                    <div className="lg:col-span-7">
                        <RevealOnScroll>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
                            >
                                <EyebrowIcon size={16} className="text-gold-500" />
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400 font-heading">
                                    {eyebrow}
                                </span>
                            </motion.div>

                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading text-white leading-[0.9] tracking-tighter mb-8">
                                {title} <br />
                                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-400">
                                    {highlight}
                                </span>
                            </h1>

                            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl font-light leading-relaxed">
                                {subtitle}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <Link
                                    href={ctaUrl}
                                    className="px-10 py-5 bg-gold-500 text-brand-950 font-black rounded-xl hover:bg-gold-400 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all text-xl flex items-center justify-center gap-3 group active:scale-[0.98]"
                                >
                                    {ctaText}
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <button className="px-10 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-xl flex items-center justify-center gap-3 group">
                                    <Play size={20} className="text-gold-500 fill-gold-500" />
                                    Watch Strategy
                                </button>
                            </div>
                        </RevealOnScroll>
                    </div>

                    {/* Right: Fintech Stats Card */}
                    <div className="lg:col-span-5 relative">
                        <RevealOnScroll delay={300}>
                            <div className="relative p-1 bg-gradient-to-br from-white/20 to-transparent rounded-[2.5rem] shadow-2xl backdrop-blur-sm">
                                <div className="bg-brand-900/80 rounded-[2.4rem] p-8 md:p-10 border border-white/5 relative overflow-hidden">
                                    {/* Glass reflection */}
                                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
                                    
                                    <div className="relative z-10 space-y-10">
                                        <div className="flex justify-between items-center">
                                            <div className="text-xs font-bold text-gold-500 uppercase tracking-widest font-heading">Performance Audit</div>
                                            <div className="flex gap-1.5">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                                <div className="w-2 h-2 rounded-full bg-white/10"></div>
                                                <div className="w-2 h-2 rounded-full bg-white/10"></div>
                                            </div>
                                        </div>

                                        <div className="space-y-8">
                                            {stats.map((stat, i) => {
                                                const StatIcon = stat.icon;

                                                return (
                                                    <div key={i} className="group cursor-pointer">
                                                        <div className="flex items-center justify-between mb-4">
                                                            <div className="flex items-center gap-4">
                                                                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-gold-500 group-hover:bg-gold-500 group-hover:text-brand-900 transition-all">
                                                                    <StatIcon size={20} />
                                                                </div>
                                                                <div>
                                                                    <div className="text-sm font-bold text-white font-heading">{stat.label}</div>
                                                                    {stat.subValue && <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{stat.subValue}</div>}
                                                                </div>
                                                            </div>
                                                            <div className="text-2xl md:text-3xl font-bold text-white font-heading tabular-nums">
                                                                {stat.value}
                                                            </div>
                                                        </div>
                                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: "85%" }}
                                                                transition={{ delay: 0.5 + i * 0.1, duration: 1.5, ease: "easeOut" }}
                                                                className="h-full bg-gold-500 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                                            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">System Status</div>
                                            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                                                <ShieldCheck size={14} />
                                                Verified Optimization
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Floating Decoration */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-6 -left-6 bg-gold-500 p-4 rounded-2xl shadow-xl z-20"
                            >
                                <TrendingUp className="text-brand-900 w-8 h-8" />
                            </motion.div>
                        </RevealOnScroll>
                    </div>
                </div>
            </div>
        </section>
    );
}

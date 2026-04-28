"use client";

import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";
import { LucideIcon, ArrowUpRight } from "lucide-react";

interface BentoItem {
    title: string;
    description: string;
    icon: LucideIcon;
    size: "small" | "medium" | "large";
    color?: string;
    image?: string;
    stat?: string;
    statLabel?: string;
}

interface IndustryBentoProps {
    eyebrow: string;
    title: string;
    highlight: string;
    subtitle: string;
    items: BentoItem[];
    dark?: boolean;
}

export function IndustryBento({
    eyebrow,
    title,
    highlight,
    subtitle,
    items,
    dark = false
}: IndustryBentoProps) {
    return (
        <section className={cn("py-24 px-6 lg:px-8 overflow-hidden", dark ? "bg-brand-950 text-white" : "bg-slate-50 text-brand-900")}>
            <div className="max-w-7xl mx-auto">
                <RevealOnScroll className="mb-16">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="max-w-3xl">
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600 mb-6 block">
                                {eyebrow}
                            </span>
                            <h2 className={cn("text-4xl md:text-6xl font-bold font-heading tracking-tighter leading-[1.1] mb-6", dark ? "text-white" : "text-brand-950")}>
                                {title} <br />
                                <span className="italic text-gold-600">{highlight}</span>
                            </h2>
                            <p className={cn("text-lg md:text-xl font-light max-w-2xl", dark ? "text-slate-400" : "text-slate-600")}>
                                {subtitle}
                            </p>
                        </div>
                    </div>
                </RevealOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[280px]">
                    {items.map((item, idx) => {
                        const ItemIcon = item.icon;

                        return (
                            <RevealOnScroll
                                key={idx}
                                delay={idx * 100}
                                className={cn(
                                    "relative group overflow-hidden rounded-[2.5rem] border transition-all duration-500",
                                    item.size === "large" ? "md:col-span-8 md:row-span-2" : 
                                    item.size === "medium" ? "md:col-span-6" : "md:col-span-4",
                                    dark ? "bg-brand-900/50 border-white/5 hover:border-gold-500/30" : "bg-white border-slate-200 hover:border-gold-500/30 hover:shadow-2xl"
                                )}
                            >
                            {/* Inner Content */}
                            <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
                                <div>
                                    <div className={cn(
                                        "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:scale-110",
                                        dark ? "bg-white/5 text-gold-500" : "bg-brand-950 text-gold-500"
                                    )}>
                                        <ItemIcon size={24} />
                                    </div>
                                    <h3 className={cn("text-2xl font-bold font-heading mb-4 tracking-tight", dark ? "text-white" : "text-brand-950")}>
                                        {item.title}
                                    </h3>
                                    <p className={cn("text-sm font-light leading-relaxed max-w-xs", dark ? "text-slate-400" : "text-slate-500")}>
                                        {item.description}
                                    </p>
                                </div>

                                {item.stat && (
                                    <div className="mt-4">
                                        <div className="text-4xl md:text-5xl font-bold text-gold-600 font-heading tracking-tighter mb-1">
                                            {item.stat}
                                        </div>
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                            {item.statLabel}
                                        </div>
                                    </div>
                                )}

                                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowUpRight className="text-gold-500" size={24} />
                                </div>
                            </div>

                            {/* Background image/pattern for large cards */}
                            {item.image && (
                                <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                                </div>
                            )}
                            
                            {/* Gradient Overlay for dark mode */}
                            {dark && (
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                            )}
                            </RevealOnScroll>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

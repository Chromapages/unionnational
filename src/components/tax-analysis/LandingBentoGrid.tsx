"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";
import { 
    LucideIcon, 
    FileText, 
    TrendingUp, 
    Users as UsersIcon, 
    Clock, 
    Building2, 
    Star, 
    Utensils, 
    Coffee, 
    ReceiptText, 
    ShieldCheck,
    Truck,
    HardHat,
    Hammer,
    Calculator,
    Zap,
    Briefcase,
    Globe,
    Scale,
    BarChart3,
    Construction,
    Gauge,
    Landmark,
    Home,
    MapPin,
    Search,
    Key,
    Wallet,
    HandCoins,
    Activity,
    Layout,
    Mail,
    Phone,
    Map,
    Info,
    HelpCircle,
    AlertCircle,
    CheckCircle2,
    Percent
} from "lucide-react";
import React from "react";

const IconMap: Record<string, LucideIcon> = {
    FileText,
    TrendingUp,
    Users: UsersIcon,
    Clock,
    Building2,
    Star,
    Utensils,
    Coffee,
    ReceiptText,
    ShieldCheck,
    Truck,
    HardHat,
    Hammer,
    Calculator,
    Zap,
    Briefcase,
    Globe,
    Scale,
    BarChart3,
    Construction,
    Gauge,
    Landmark,
    Home,
    MapPin,
    Search,
    Key,
    Wallet,
    HandCoins,
    Activity,
    Layout,
    Mail,
    Phone,
    Map,
    Info,
    HelpCircle,
    AlertCircle,
    CheckCircle2,
    Percent
};

interface BentoItem {
    title: string;
    description: string;
    icon: string; // Changed to string
    className?: string;
    iconClassName?: string;
}

interface LandingBentoGridProps {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    items: BentoItem[];
    variant?: "light" | "dark";
}

export const LandingBentoGrid = ({
    eyebrow,
    title,
    subtitle,
    items,
    variant = "light",
}: LandingBentoGridProps) => {
    return (
        <section className={cn(
            "py-24 px-6 overflow-hidden",
            variant === "dark" ? "bg-brand-950" : "bg-white"
        )}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    {eyebrow && (
                        <RevealOnScroll>
                            <span className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-4 inline-block">
                                {eyebrow}
                            </span>
                        </RevealOnScroll>
                    )}
                    <RevealOnScroll>
                        <h2 className={cn(
                            "text-3xl sm:text-5xl font-heading font-black tracking-tighter mb-6",
                            variant === "dark" ? "text-white" : "text-brand-900"
                        )}>
                            {title}
                        </h2>
                    </RevealOnScroll>
                    {subtitle && (
                        <RevealOnScroll>
                            <p className={cn(
                                "text-lg max-w-2xl mx-auto",
                                variant === "dark" ? "text-brand-100/70" : "text-slate-600"
                            )}>
                                {subtitle}
                            </p>
                        </RevealOnScroll>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-6 gap-6 lg:gap-8">
                    {items.map((item, i) => {
                        const IconComponent = IconMap[item.icon] || ShieldCheck;
                        
                        return (
                            <RevealOnScroll key={i} delay={i * 100} className={cn(
                                "group relative transition-all duration-700",
                                "hover:-translate-y-4",
                                "perspective-[2500px]",
                                item.className || "md:col-span-2"
                            )}>
                                {/* Card Body */}
                                <div className={cn(
                                    "h-full w-full rounded-[2.5rem] p-10 transition-all duration-700 overflow-hidden relative",
                                    "group-hover:rotate-x-[3deg] group-hover:rotate-y-[2deg]",
                                    variant === "dark" 
                                        ? "glass-premium border-white/5 group-hover:border-gold-500/40 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6),0_0_20px_rgba(212,175,55,0.15)]" 
                                        : "bg-slate-50 border border-slate-200 text-brand-900 group-hover:shadow-2xl group-hover:border-brand-200 group-hover:bg-white"
                                )}>
                                    {/* Glass Shine Overlay */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none bg-gradient-to-br from-white/5 via-transparent to-transparent" />
                                    
                                    {/* Icon Container with Glow */}
                                    <div className="relative mb-10 inline-block">
                                        <div className={cn(
                                            "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-700 group-hover:scale-110 relative z-10",
                                            variant === "dark" 
                                                ? "bg-brand-900 border border-white/10 text-gold-400 shadow-2xl group-hover:bg-gold-500 group-hover:text-brand-950 group-hover:border-gold-400" 
                                                : "bg-brand-500 text-white shadow-xl group-hover:bg-brand-600"
                                        )}>
                                            <IconComponent className={cn("w-8 h-8 transition-transform duration-700 group-hover:rotate-12", item.iconClassName)} />
                                        </div>
                                        {/* Icon Glow */}
                                        <div className={cn(
                                            "absolute inset-0 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 scale-150",
                                            variant === "dark" ? "bg-gold-500" : "bg-brand-500"
                                        )} />
                                    </div>

                                    <h3 className={cn(
                                        "text-2xl lg:text-3xl font-display font-black mb-5 tracking-tight leading-tight",
                                        variant === "dark" ? "text-white" : "text-brand-900"
                                    )}>
                                        {item.title}
                                    </h3>
                                    <p className={cn(
                                        "text-base lg:text-lg leading-relaxed font-body font-light",
                                        variant === "dark" ? "text-brand-100/60" : "text-slate-600"
                                    )}>
                                        {item.description}
                                    </p>

                                    {/* Bottom Accents */}
                                    {variant === "dark" && (
                                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-center" />
                                    )}
                                </div>
                            </RevealOnScroll>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

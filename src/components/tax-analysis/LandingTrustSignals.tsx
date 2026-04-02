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
    CheckCircle2
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
    CheckCircle2
};

interface TrustItem {
    icon: string; // Changed to string
    title: string;
    subtitle: string;
    description: string;
}

interface LandingTrustSignalsProps {
    title: string;
    items: TrustItem[];
    variant?: "light" | "dark";
}

export const LandingTrustSignals = ({
    title,
    items,
    variant = "light",
}: LandingTrustSignalsProps) => {
    return (
        <section className={cn(
            "py-24 px-6 border-y",
            variant === "dark" 
                ? "bg-brand-950 border-white/5" 
                : "bg-slate-50 border-slate-200"
        )}>
            <div className="max-w-7xl mx-auto">
                <RevealOnScroll>
                    <h2 className={cn(
                        "text-2xl sm:text-4xl font-heading font-black text-center mb-16 tracking-tighter",
                        variant === "dark" ? "text-white" : "text-brand-900"
                    )}>
                        {title}
                    </h2>
                </RevealOnScroll>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {items.map((item, i) => {
                        const IconComponent = IconMap[item.icon] || ShieldCheck;
                        
                        return (
                            <RevealOnScroll key={i} delay={i * 100}>
                                <div className={cn(
                                    "group relative h-full rounded-[2rem] p-10 transition-all duration-700 overflow-hidden",
                                    variant === "dark"
                                        ? "glass-premium border-white/5 hover:border-gold-500/30 hover:shadow-premium"
                                        : "bg-white border border-slate-200 shadow-sm hover:border-gold-500/40 hover:shadow-2xl hover:-translate-y-3"
                                )}>
                                    <div className={cn(
                                        "w-16 h-16 rounded-2xl flex items-center justify-center mb-10 transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 shadow-xl",
                                        variant === "dark" ? "bg-brand-900 border border-white/10 text-gold-400" : "bg-brand-50 text-brand-900 border border-brand-100"
                                    )}>
                                        <IconComponent className="w-8 h-8" />
                                    </div>
                                    <h3 className={cn(
                                        "text-2xl font-display font-black mb-2 tracking-tight leading-tight",
                                        variant === "dark" ? "text-white" : "text-brand-900"
                                    )}>
                                        {item.title}
                                    </h3>
                                    <p className="text-[11px] font-black text-gold-600 uppercase tracking-[0.3em] mb-8 font-sans">
                                        {item.subtitle}
                                    </p>
                                    <p className={cn(
                                        "text-base leading-relaxed font-body font-light",
                                        variant === "dark" ? "text-brand-100/60" : "text-slate-600"
                                    )}>
                                        {item.description}
                                    </p>
                                    
                                    {/* Bottom border accent */}
                                    <div className={cn(
                                        "absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000",
                                    )} />
                                </div>
                            </RevealOnScroll>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import * as Icons from "lucide-react";
import { AnimatedStat } from "@/components/ui/AnimatedStat";
import { cn } from "@/lib/utils";

// Dynamic Icon Component
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
    // @ts-expect-error - Icons access dynamically
    const Icon = Icons[name] || Icons.Briefcase;
    return <Icon className={className} />;
};

interface Stat {
    value: number; // Numeric value for animation
    label: string;
    prefix?: string;
    suffix?: string;
}

interface PartnerProgramCardProps {
    title: string;
    description: string;
    icon: string;
    // Removed unused accentColor prop
    colorTheme: 'emerald' | 'orange'; 
    stats: Stat[];
    features: string[];
    ctaUrl: string;
    backgroundImage?: string;
    isFeatured?: boolean;
}

export function PartnerProgramCard({
    title,
    description,
    icon,
    colorTheme,
    stats,
    features,
    ctaUrl,
    backgroundImage,
    isFeatured = false,
}: PartnerProgramCardProps) {
    
    // Theme configurations
    const theme = {
        emerald: {
            bg: "bg-emerald-500",
            text: "text-emerald-400",
            border: "border-emerald-500/20",
            hoverBorder: "hover:border-emerald-500/50",
            badgeBg: "bg-emerald-500/10",
            badgeBorder: "border-emerald-500/20",
            badgeText: "text-emerald-400",
            badgeDot: "bg-emerald-400",
            iconGradient: "from-emerald-400 to-emerald-600",
            shadow: "shadow-emerald-500/20",
            buttonBg: "bg-emerald-500/10",
            buttonText: "text-emerald-400",
            buttonHoverBg: "group-hover:bg-emerald-500",
            hoverShadow: "hover:shadow-emerald-500/10",
        },
        orange: {
            bg: "bg-orange-500",
            text: "text-orange-400",
            border: "border-orange-500/20",
            hoverBorder: "hover:border-orange-500/50",
            badgeBg: "bg-orange-500/10",
            badgeBorder: "border-orange-500/20",
            badgeText: "text-orange-400",
            badgeDot: "bg-orange-400",
            iconGradient: "from-orange-400 to-orange-600",
            shadow: "shadow-orange-500/20",
            buttonBg: "bg-orange-500/10",
            buttonText: "text-orange-400",
            buttonHoverBg: "group-hover:bg-orange-500",
            hoverShadow: "hover:shadow-orange-500/10",
        }
    }[colorTheme];

    return (
        <Link href={ctaUrl} className="block group h-full">
            <div className={cn(
                "relative h-full rounded-[2.5rem] bg-brand-900 p-8 sm:p-10 border overflow-hidden transition-all duration-500 flex flex-col group-hover:-translate-y-1 hover:shadow-2xl",
                theme.border,
                theme.hoverBorder,
                theme.hoverShadow
            )}>
                {/* Background Image & Overlay */}
                {backgroundImage && (
                    <>
                        <div 
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 mix-blend-overlay transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: `url(${backgroundImage})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-900/95 to-brand-900/80" />
                    </>
                )}

                {/* Featured Badge */}
                {isFeatured && (
                    <div className="absolute top-6 right-6">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500 text-brand-900 text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-gold-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-900 animate-pulse" />
                            Featured
                        </div>
                    </div>
                )}

                <div className="relative z-10 flex flex-col flex-grow">
                    {/* Category Badge */}
                    <div className={cn(
                        "inline-flex self-start items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest mb-8",
                        theme.badgeBg,
                        theme.badgeBorder,
                        theme.badgeText
                    )}>
                        <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", theme.badgeDot)} />
                        For {colorTheme === 'emerald' ? 'Construction Firms' : 'Restaurants'}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
                        <div className={cn(
                            "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white shadow-lg flex-shrink-0",
                            theme.iconGradient,
                            theme.shadow
                        )}>
                            <DynamicIcon name={icon} className="w-8 h-8" />
                        </div>
                        <h3 className={cn(
                            "text-2xl sm:text-3xl font-bold text-white font-heading transition-colors",
                            colorTheme === 'emerald' ? "group-hover:text-emerald-400" : "group-hover:text-orange-400"
                        )}>
                            {title}
                        </h3>
                    </div>

                    <p className="text-brand-100/70 text-lg mb-8 leading-relaxed">
                        {description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3 mb-8">
                        {features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-3 text-brand-100/90">
                                <Check className={cn("w-5 h-5 flex-shrink-0", theme.text)} />
                                <span className="text-sm font-medium">{feature}</span>
                            </div>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className={cn(
                        "h-px w-full bg-gradient-to-r from-transparent to-transparent mb-8",
                        colorTheme === 'emerald' ? "via-emerald-500/20" : "via-orange-500/20"
                    )} />

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        {stats.map((stat, i) => (
                            <div key={i}>
                                <AnimatedStat 
                                    value={stat.value} 
                                    prefix={stat.prefix} 
                                    suffix={stat.suffix} 
                                    className={cn("text-2xl font-bold block", theme.text)}
                                />
                                <div className="text-[10px] uppercase tracking-wider text-brand-100/50 mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-auto">
                        <div className={cn(
                            "w-full py-4 rounded-xl border font-bold uppercase tracking-widest text-sm flex items-center justify-center group-hover:text-white transition-all duration-300",
                            theme.buttonBg,
                            theme.border,
                            theme.buttonText,
                            theme.buttonHoverBg
                        )}>
                            Apply Now <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

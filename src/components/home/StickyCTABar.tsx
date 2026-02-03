"use client";

import { useEffect, useState } from "react";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface StickyCTABarProps {
    data?: {
        ctaButtonUrl?: string;
    };
}

export function StickyCTABar({ data }: StickyCTABarProps) {
    const [isVisible, setIsVisible] = useState(false);
    const t = useTranslations('HomePage.StickyCTABar');

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling past 800px (approx height of hero)
            const show = window.scrollY > 800;
            if (show !== isVisible) {
                setIsVisible(show);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isVisible]);

    const ctaUrl = data?.ctaButtonUrl || "/contact";

    return (
        <>
            {/* Desktop Floating Button (Bottom Left) */}
            <div 
                className={cn(
                    "fixed bottom-8 left-8 z-50 hidden md:flex flex-col items-start gap-2 transition-all duration-500 transform",
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
                )}
            >
                {/* Tooltip Bubble */}
                <div className="bg-white text-brand-900 px-4 py-2 rounded-lg shadow-lg border border-slate-100 text-sm font-bold mb-2 animate-bounce origin-bottom-left">
                    {t('tooltip')}
                    <div className="absolute bottom-[-6px] left-6 w-3 h-3 bg-white border-b border-l border-slate-100 transform rotate-45"></div>
                </div>

                <Link
                    href={ctaUrl}
                    className="bg-gold-500 text-brand-900 pl-6 pr-2 py-2 rounded-full shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.6)] hover:scale-105 transition-all duration-300 flex items-center gap-3 group font-heading font-bold tracking-wide border border-gold-400"
                >
                    <span>{t('desktopButton')}</span>
                    <div className="w-10 h-10 rounded-full bg-brand-900 text-gold-500 flex items-center justify-center group-hover:rotate-[-45deg] transition-transform duration-300">
                        <ArrowRight className="w-5 h-5" />
                    </div>
                </Link>
            </div>

            {/* Mobile Bottom Bar (Full Width) */}
            <div 
                className={cn(
                    "fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-slate-200 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] transition-all duration-500 transform",
                    isVisible ? "translate-y-0" : "translate-y-full"
                )}
            >
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">{t('mobile.eyebrow')}</p>
                        <p className="text-sm font-bold text-brand-900 leading-tight">{t('mobile.title')}</p>
                    </div>
                    <Link
                        href={ctaUrl}
                        className="bg-gold-500 text-brand-900 px-6 py-3 rounded-lg font-bold text-sm shadow-md active:scale-95 transition-transform flex items-center gap-2"
                    >
                        <Calendar className="w-4 h-4" />
                        {t('mobile.button')}
                    </Link>
                </div>
            </div>
        </>
    );
}

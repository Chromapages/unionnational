"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface LandingHeroProps {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary?: string;
    trustSignals: string[];
    industry: "construction" | "real-estate" | "hospitality";
    videoUrl?: string;
}

export const LandingHero = ({
    badge,
    title,
    titleHighlight,
    subtitle,
    ctaPrimary,
    ctaSecondary = "Already know about us? →",
    trustSignals,
    industry,
    videoUrl = "https://cdn.pixabay.com/video/2021/08/13/84918-588365261_large.mp4", 
}: LandingHeroProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.6;
        }
    }, []);

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-brand-950 px-6 py-20 lg:py-32">
            {/* Background Video & Advanced Overlays */}
            <div className="absolute inset-0 z-0">
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale saturate-0 scale-105 transition-transform duration-10000"
                >
                    <source src={videoUrl} type="video/mp4" />
                </video>
                
                {/* Fintech Layering: Gradient + Blur + Mesh */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(184,134,11,0.05),transparent_70%)] z-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-950 via-brand-950/80 to-brand-950 z-20" />
                <div className="absolute inset-0 backdrop-blur-[3px] z-30 opacity-60" />
                
                {/* Industry Specific Line Art / Pattern */}
                <div className="absolute inset-0 z-40 opacity-[0.07] pointer-events-none">
                    {industry === "construction" && (
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <defs>
                                <pattern id="blueprint" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.05" />
                                </pattern>
                            </defs>
                            <rect width="100" height="100" fill="url(#blueprint)" />
                        </svg>
                    )}
                    {industry === "real-estate" && (
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                    )}
                </div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-50 max-w-6xl mx-auto text-center">
                <RevealOnScroll>
                    {/* Premium Badge */}
                    <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-2.5 mb-10 shadow-2xl transition-all duration-500 hover:border-gold-500/30 group">
                        <span className="w-2.5 h-2.5 bg-gold-400 rounded-full animate-pulse shadow-[0_0_12px_rgba(212,175,55,1)]"></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold-300 font-sans">
                            {badge}
                        </span>
                    </div>

                    <h1 className="text-5xl sm:text-7xl lg:text-8xl font-heading font-bold text-white tracking-[-0.04em] mb-10 leading-[0.9] lg:leading-[0.85]">
                        <span className="block opacity-90">{title}</span>
                        <span className="text-display block mt-6 mb-4 bg-gradient-to-r from-gold-100 via-gold-500 to-gold-200 bg-clip-text text-transparent animate-gradient-slow drop-shadow-[0_0_40px_rgba(212,175,55,0.2)]">
                            {titleHighlight}
                        </span>
                        <span className="text-3xl sm:text-5xl lg:text-7xl block tracking-tighter opacity-80 mt-2 font-medium">Unclaimed Every Year</span>
                    </h1>

                    <p className="text-lg sm:text-xl lg:text-2xl text-brand-100/70 max-w-3xl mx-auto mb-16 font-body leading-relaxed font-light px-4">
                        {subtitle}
                    </p>

                    {/* Pro Trust Indicator */}
                    <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-[11px] font-black text-white/40 mb-20 uppercase tracking-[0.4em]">
                        {trustSignals.map((signal, i) => (
                            <div key={i} className="flex items-center gap-4 group cursor-default transition-all duration-700 hover:text-gold-400/80">
                                <div className="w-1.5 h-1.5 rounded-full bg-gold-500/20 group-hover:bg-gold-500 group-hover:shadow-[0_0_8px_rgba(212,175,55,0.8)] transition-all" />
                                <span className="group-hover:tracking-[0.5em] transition-all duration-1000">{signal}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8 px-4">
                        <Link
                            href="#get-started"
                            className={cn(
                                "group w-full sm:w-auto px-16 py-6 bg-gold-500 text-brand-900 font-black text-xl rounded-xl shadow-[0_20px_50px_rgba(212,175,55,0.2)] transition-all duration-500",
                                "hover:bg-gold-400 hover:scale-[1.05] hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-4 font-heading tracking-tight"
                            )}
                        >
                            {ctaPrimary}
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-500" />
                        </Link>
                        
                        <Link
                            href="/"
                            className="text-white/40 hover:text-gold-400 font-bold transition-all duration-500 flex items-center gap-3 group text-sm uppercase tracking-widest"
                        >
                            Explore Global Strategy <span className="group-hover:translate-x-2 transition-transform duration-500">→</span>
                        </Link>
                    </div>
                </RevealOnScroll>
            </div>

            {/* Modern Surface Accents */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-50" />
            
            {/* Cinematic Grain Overlay */}
            <div 
                className="absolute inset-0 pointer-events-none opacity-[0.04] z-[45]"
                style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}
            />
        </section>
    );
};

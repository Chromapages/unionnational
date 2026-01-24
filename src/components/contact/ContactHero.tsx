"use client";

import { TrustBadges } from "./TrustBadges";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface ContactHeroProps {
    title?: string;
    subtitle?: string;
    stats?:
        | {
              clients: number;
              savings: string;
              responseTime: string;
          }
        | null;
}

export function ContactHero({
    title = "Let's Build Your Tax Strategy Together",
    subtitle = "Whether you're facing a complex audit or looking to restructure for growth, our strategists are ready to listen.",
    stats
}: ContactHeroProps) {
    const safeStats = {
        clients: stats?.clients ?? 5000,
        savings: stats?.savings ?? "$2.3B",
        responseTime: stats?.responseTime ?? "2 hours",
    };

    return (
        <section className="relative w-full overflow-hidden bg-brand-900 border-b border-white/5">
            {/* Background Gradient & Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

            {/* Decorative Glow */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative max-w-5xl mx-auto px-6 pt-32 pb-24 text-center">
                <RevealOnScroll>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-[10px] font-bold uppercase tracking-widest mb-8 shadow-sm font-sans backdrop-blur-sm">
                        Contact Union National Tax
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-8 leading-[1.1] font-heading">
                        {title}
                    </h1>

                    <p className="text-lg text-slate-300/90 leading-relaxed max-w-2xl mx-auto font-sans mb-12">
                        {subtitle}
                    </p>

                    <TrustBadges className="mb-16" />

                    {/* Stats Bar */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-white/10 max-w-3xl mx-auto">
                        <div>
                            <div className="text-3xl font-bold text-gold-500 font-heading mb-1">{safeStats.clients.toLocaleString()}+</div>
                            <div className="text-sm text-slate-400 font-sans uppercase tracking-wide">Happy Clients</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-gold-500 font-heading mb-1">{safeStats.savings}</div>
                            <div className="text-sm text-slate-400 font-sans uppercase tracking-wide">Tax Saved</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-gold-500 font-heading mb-1">{safeStats.responseTime}</div>
                            <div className="text-sm text-slate-400 font-sans uppercase tracking-wide">Avg. Response</div>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}

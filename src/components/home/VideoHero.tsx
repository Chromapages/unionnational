"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { HeroVideoPlayer } from "@/components/home/HeroVideoPlayer";

interface VideoHeroProps {
    data?: {
        heroVideoUrl?: string;
        heroPlayerVideoUrl?: string;
        heroPlayerPosterUrl?: string;
    };
}

export const VideoHero = ({ data }: VideoHeroProps): React.JSX.Element => {
    const backgroundVideoRef = useRef<HTMLVideoElement>(null);
    const backgroundVideoUrl = data?.heroVideoUrl;
    const playerVideoUrl = data?.heroPlayerVideoUrl || backgroundVideoUrl;

    return (
        <section className="relative isolate overflow-hidden bg-brand-900 py-16 sm:py-20 lg:py-28" aria-labelledby="hero-heading">
            {backgroundVideoUrl && (
                <video ref={backgroundVideoRef} src={backgroundVideoUrl} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-30" />
            )}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950 via-brand-900/90 to-brand-900/75" aria-hidden="true" />
            <div className="mx-auto grid max-w-screen-xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(560px,1fr)] lg:items-center lg:gap-16 lg:px-8">
                <div className="max-w-[680px]">
                    <p className="home-eyebrow text-gold-400">Proactive Tax Strategy for Service Businesses</p>
                    <h1 id="hero-heading" className="mt-5 max-w-[12ch] font-heading text-4xl font-bold leading-[1.03] tracking-[-.035em] text-white sm:text-5xl lg:text-7xl">
                        Stop overpaying the IRS. Build a smarter business.
                    </h1>
                    <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-slate-300">
                        Proactive tax strategy and S-Corp planning for contractors and service-based business owners — built to reduce tax surprises and support better decisions throughout the year.
                    </p>
                    <div className="mt-7 flex flex-wrap gap-3">
                        <Link href="/book" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold-500 px-[1.125rem] py-3.5 font-heading font-bold text-brand-950 transition-colors hover:bg-gold-400">
                            Book a Strategy Call <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <a href="#how-it-works" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-[1.125rem] py-3.5 font-semibold text-white transition-colors hover:border-white hover:bg-white/10">See How It Works</a>
                    </div>
                    <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-slate-300">In your strategy call, we’ll review your current structure, identify potential planning opportunities, and help you determine the right next step.</p>
                    <p className="mt-3 text-sm font-semibold text-gold-300">Best for established contractors and service-based businesses seeking proactive tax guidance beyond year-end filing.</p>
                    <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-slate-300" aria-label="Firm credentials">
                        <li>IRS Enrolled Agent</li>
                        <li aria-hidden="true" className="text-gold-400">·</li>
                        <li>200+ Contractors Served</li>
                        <li aria-hidden="true" className="text-gold-400">·</li>
                        <li>Avg. Annual Savings $23,420</li>
                    </ul>
                </div>
                {playerVideoUrl && (
                    <div className="w-full max-w-xl lg:max-w-none">
                        <HeroVideoPlayer src={playerVideoUrl} poster={data?.heroPlayerPosterUrl} ariaLabel="See how Union National Tax works" unavailableMessage="Video unavailable. Book a strategy call to learn how we work." />
                    </div>
                )}
            </div>
        </section>
    );
};

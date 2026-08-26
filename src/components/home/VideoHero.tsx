"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, BadgeCheck, CalendarCheck, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { HeroVideoPlayer } from "@/components/home/HeroVideoPlayer";

interface VideoHeroProps {
    data?: {
        heroTitleLocalized?: string;
        heroSubtitleLocalized?: string;
        heroCtaTextLocalized?: string;
        heroVideoUrl?: string;
        heroBackgroundPosterUrl?: string;
        heroPlayerVideoUrl?: string;
        heroPlayerPosterUrl?: string;
    };
}

interface TrustBadgeItem {
    icon: LucideIcon;
    label: string;
}

type HeroEventName =
    | "hero_primary_cta_click"
    | "hero_secondary_cta_click"
    | "hero_video_start";

export const VideoHero = ({ data }: VideoHeroProps): React.JSX.Element => {
    const t = useTranslations("HomeHero");
    const locale = useLocale();
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [backgroundVideoReady, setBackgroundVideoReady] = useState(false);
    const [backgroundVideoFailed, setBackgroundVideoFailed] = useState(false);
    const videoStartTrackedRef = useRef(false);
    const backgroundVideoRef = useRef<HTMLVideoElement>(null);

    const rawBackgroundVideoUrl = data?.heroVideoUrl;
    const rawPlayerVideoUrl = data?.heroPlayerVideoUrl;

    const resolvedBackgroundVideoUrl =
        typeof rawBackgroundVideoUrl === "string"
            ? rawBackgroundVideoUrl
            : (rawBackgroundVideoUrl as unknown as { asset?: { url?: string }; url?: string })?.asset?.url ||
              (rawBackgroundVideoUrl as unknown as { url?: string })?.url;

    const playerVideoUrl =
        (typeof rawPlayerVideoUrl === "string"
            ? rawPlayerVideoUrl
            : (rawPlayerVideoUrl as unknown as { asset?: { url?: string }; url?: string })?.asset?.url ||
              (rawPlayerVideoUrl as unknown as { url?: string })?.url) || resolvedBackgroundVideoUrl;

    const backgroundVideoUrl =
        resolvedBackgroundVideoUrl && resolvedBackgroundVideoUrl !== playerVideoUrl
            ? resolvedBackgroundVideoUrl
            : undefined;

    const title = data?.heroTitleLocalized?.trim() || t("title");
    const subtitle = data?.heroSubtitleLocalized?.trim() || t("subtitle");
    const primaryCta = data?.heroCtaTextLocalized?.trim() || t("primaryCta");
    const secondaryCta = t("secondaryCta");

    const trustItems: TrustBadgeItem[] = [
        { icon: BadgeCheck, label: t("trustCredential") },
        { icon: Users, label: t("trustVolume") },
        { icon: CalendarCheck, label: t("trustExperience") },
    ];

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

        updatePreference();
        mediaQuery.addEventListener("change", updatePreference);
        return () => mediaQuery.removeEventListener("change", updatePreference);
    }, []);

    useEffect(() => {
        setBackgroundVideoReady(false);
        setBackgroundVideoFailed(false);

        const video = backgroundVideoRef.current;
        if (!video || !backgroundVideoUrl || prefersReducedMotion) return;

        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;

        const handleReady = () => setBackgroundVideoReady(true);

        if (video.readyState >= 2) {
            handleReady();
        }

        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise
                .then(handleReady)
                .catch(() => {
                    if (video.readyState >= 2) {
                        handleReady();
                    }
                });
        }
    }, [backgroundVideoUrl, prefersReducedMotion]);

    const trackHeroEvent = (event: HeroEventName, destination: string) => {
        const browserWindow = window as unknown as {
            dataLayer?: Record<string, unknown>[];
        };
        browserWindow.dataLayer ??= [];
        browserWindow.dataLayer.push({
            event,
            locale,
            placement: "homepage_hero",
            destination,
        });
    };

    const handleVideoStart = () => {
        if (videoStartTrackedRef.current) return;
        videoStartTrackedRef.current = true;
        trackHeroEvent("hero_video_start", "foreground_video");
    };

    return (
        <section
            className="relative isolate flex min-h-[650px] overflow-hidden bg-brand-900 py-14 sm:py-16 lg:min-h-[680px] lg:py-16 xl:min-h-[700px]"
            aria-labelledby="hero-heading"
        >
            {data?.heroBackgroundPosterUrl ? (
                <Image
                    src={data.heroBackgroundPosterUrl}
                    alt=""
                    fill
                    priority={!data?.heroPlayerPosterUrl}
                    sizes="(min-width: 1024px) 100vw, 0vw"
                    aria-hidden="true"
                    className="hidden lg:block absolute inset-0 -z-30 object-cover"
                />
            ) : null}

            {backgroundVideoUrl && !prefersReducedMotion && !backgroundVideoFailed ? (
                <>
                    <video
                        ref={backgroundVideoRef}
                        src={backgroundVideoUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        aria-hidden="true"
                        tabIndex={-1}
                        onCanPlay={() => setBackgroundVideoReady(true)}
                        onLoadedData={() => setBackgroundVideoReady(true)}
                        onLoadedMetadata={() => setBackgroundVideoReady(true)}
                        onPlay={() => setBackgroundVideoReady(true)}
                        onError={() => setBackgroundVideoFailed(true)}
                        className={`hidden lg:block absolute inset-0 -z-20 h-full w-full object-cover transition-opacity duration-700 motion-reduce:transition-none ${backgroundVideoReady ? "opacity-20" : "opacity-0"}`}
                    />
                    <button
                        type="button"
                        onClick={() => {
                            if (backgroundVideoRef.current) {
                                if (backgroundVideoRef.current.paused) {
                                    void backgroundVideoRef.current.play();
                                } else {
                                    backgroundVideoRef.current.pause();
                                }
                            }
                        }}
                        className="hidden lg:flex absolute bottom-4 left-4 z-10 size-10 items-center justify-center rounded-full bg-brand-950/50 text-white opacity-0 transition-opacity focus-visible:opacity-100 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
                        aria-label="Toggle background video playback"
                    >
                        <span className="sr-only">Pause background motion</span>
                        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </button>
                </>
            ) : null}

            <div
                className="absolute inset-0 -z-10 bg-[#051A18] lg:bg-transparent lg:bg-[linear-gradient(90deg,#051A18_0%,#051A18_58%,rgba(5,26,24,0.92)_100%)]"
                aria-hidden="true"
            />

            <div
                className={`mx-auto grid w-full max-w-screen-2xl items-center gap-8 sm:gap-10 lg:gap-12 px-5 sm:px-6 lg:px-6 xl:gap-16 ${
                    playerVideoUrl
                        ? "lg:grid-cols-12"
                        : "lg:grid-cols-1"
                }`}
            >
                <div className={playerVideoUrl ? "lg:col-span-5" : "max-w-[680px]"}>
                    <h1
                        id="hero-heading"
                        className="max-w-[14ch] text-balance font-heading text-[clamp(3.25rem,4.6vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.04em] text-white"
                    >
                        {title}
                    </h1>
                    <p className="mt-6 max-w-[55ch] text-lg leading-8 text-slate-200 sm:text-xl">
                        {subtitle}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
                        <Link
                            href="/scorp-estimator"
                            onClick={() =>
                                trackHeroEvent("hero_primary_cta_click", `/${locale}/scorp-estimator`)
                            }
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3.5 font-heading text-sm font-bold text-brand-950 shadow-[0_10px_30px_-14px_rgba(212,175,55,0.9)] transition-colors hover:bg-gold-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300 motion-reduce:transition-none"
                        >
                            {primaryCta}
                            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                        </Link>
                        <Link
                            href="#services"
                            onClick={() =>
                                trackHeroEvent("hero_secondary_cta_click", `/${locale}#services`)
                            }
                            className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-slate-300 underline decoration-slate-500/60 underline-offset-4 transition-colors hover:text-gold-400 hover:decoration-gold-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300 motion-reduce:transition-none"
                        >
                            <span>{secondaryCta}</span>
                            <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                        </Link>
                    </div>

                    {/* Infinite Flowing Trust Signals Carousel */}
                    <div
                        className="mt-8 relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]"
                    >
                        <div
                            className="flex w-max items-center gap-4 animate-hero-marquee hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:gap-3 motion-reduce:[mask-image:none]"
                            role="list"
                            aria-label="Firm credentials"
                        >
                            {/* Primary Set: Accessible to screen readers (exactly 3 items) */}
                            {trustItems.map((item, idx) => (
                                <div
                                    key={`trust-primary-${idx}`}
                                    role="listitem"
                                    className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gold-500/25 bg-brand-950/70 px-3.5 py-1.5 text-xs font-medium text-slate-200 backdrop-blur-sm transition-colors hover:border-gold-400 hover:text-white"
                                >
                                    <item.icon className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                                    <span className="whitespace-nowrap">{item.label}</span>
                                </div>
                            ))}
                            {/* Duplicate Sets for Seamless 50% TranslateX Loop: Hidden from screen readers */}
                            {[...trustItems, ...trustItems, ...trustItems].map((item, idx) => (
                                <div
                                    key={`trust-duplicate-${idx}`}
                                    aria-hidden="true"
                                    className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gold-500/25 bg-brand-950/70 px-3.5 py-1.5 text-xs font-medium text-slate-200 backdrop-blur-sm transition-colors hover:border-gold-400 hover:text-white"
                                >
                                    <item.icon className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                                    <span className="whitespace-nowrap">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {playerVideoUrl ? (
                    <div className="w-full self-center lg:col-span-7 lg:justify-self-end">
                        <HeroVideoPlayer
                            src={playerVideoUrl}
                            poster={data?.heroPlayerPosterUrl}
                            ariaLabel={t("videoLabel")}
                            unavailableMessage={t("unavailable")}
                            onPlay={handleVideoStart}
                        />
                    </div>
                ) : null}
            </div>
        </section>
    );
};

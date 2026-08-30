"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, BadgeCheck, CalendarCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { HeroVideoPlayer } from "@/components/home/HeroVideoPlayer";
import { useMediaQuery } from "@/hooks/use-media-query";

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

const splitSupportingCopy = (value: string): [string, string | null] => {
    const match = value.match(/^(.*?)(\s+(?:for|para)\s+.+)$/i);
    return match ? [match[1], match[2]] : [value, null];
};

export const VideoHero = ({ data }: VideoHeroProps): React.JSX.Element => {
    const t = useTranslations("HomeHero");
    const locale = useLocale();
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [backgroundVideoReady, setBackgroundVideoReady] = useState(false);
    const [backgroundVideoFailed, setBackgroundVideoFailed] = useState(false);
    const [heroImageLoaded, setHeroImageLoaded] = useState(false);
    const [heroImageFailed, setHeroImageFailed] = useState(false);
    const [mobileVideoRequested, setMobileVideoRequested] = useState(false);
    const videoStartTrackedRef = useRef(false);
    const navigationInProgressRef = useRef(false);
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
    const heroImageUrl = data?.heroBackgroundPosterUrl || data?.heroPlayerPosterUrl;

    const title = data?.heroTitleLocalized?.trim() || t("title");
    const subtitle = data?.heroSubtitleLocalized?.trim() || t("subtitle");
    const primaryCta = data?.heroCtaTextLocalized?.trim() || t("primaryCta");
    const secondaryCta = t("secondaryCta");
    const [serviceSummary, audienceSummary] = splitSupportingCopy(subtitle);

    const trustItems: TrustBadgeItem[] = [
        { icon: BadgeCheck, label: t("trustCredential") },
        { icon: CalendarCheck, label: t("trustExperience") },
    ];

    useEffect(() => {
        setHeroImageLoaded(false);
        setHeroImageFailed(false);
    }, [heroImageUrl]);

    useEffect(() => {
        setMobileVideoRequested(false);
    }, [playerVideoUrl]);

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
        if (!video || !backgroundVideoUrl || prefersReducedMotion || !isDesktop) return;

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
    }, [backgroundVideoUrl, isDesktop, prefersReducedMotion]);

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

    const handleHeroNavigation = (event: MouseEvent<HTMLAnchorElement>, eventName: HeroEventName, destination: string) => {
        if (navigationInProgressRef.current) {
            event.preventDefault();
            return;
        }

        navigationInProgressRef.current = true;
        trackHeroEvent(eventName, destination);
        window.setTimeout(() => {
            navigationInProgressRef.current = false;
        }, 750);
    };

    return (
        <section
            className="relative isolate overflow-hidden bg-brand-900 pt-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:py-16 lg:flex lg:min-h-[680px] lg:py-16 xl:min-h-[700px]"
            aria-labelledby="hero-heading"
        >
            {isDesktop && heroImageUrl && !heroImageFailed ? (
                <Image
                    src={heroImageUrl}
                    alt=""
                    width={1600}
                    height={900}
                    preload
                    loading="eager"
                    sizes="100vw"
                    aria-hidden="true"
                    onLoad={() => setHeroImageLoaded(true)}
                    onError={() => setHeroImageFailed(true)}
                    className={`absolute inset-0 -z-30 h-full w-full object-cover object-[68%_center] transition-opacity duration-500 motion-reduce:transition-none ${heroImageLoaded ? "opacity-100" : "opacity-0"}`}
                />
            ) : null}

            {isDesktop && backgroundVideoUrl && !prefersReducedMotion && !backgroundVideoFailed ? (
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
                className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(3,16,14,0.9)_0%,rgba(5,26,24,0.82)_52%,rgba(3,16,14,0.96)_100%)] lg:bg-[linear-gradient(90deg,rgba(5,26,24,0.92)_0%,rgba(5,26,24,0.82)_58%,rgba(5,26,24,0.62)_100%)]"
                aria-hidden="true"
            />

            <div
                className={`mx-auto grid w-full max-w-screen-2xl items-center gap-8 px-4 sm:gap-10 sm:px-6 lg:gap-12 lg:px-6 xl:gap-16 ${
                    playerVideoUrl
                        ? "lg:grid-cols-12"
                        : "lg:grid-cols-1"
                }`}
            >
                <div className={playerVideoUrl ? "min-w-0 lg:col-span-5" : "min-w-0 max-w-[680px]"}>
                    <h1
                        id="hero-heading"
                        className="max-w-full break-words font-heading text-[clamp(2rem,8vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.04em] text-white lg:max-w-[14ch]"
                    >
                        {title}
                    </h1>
                    <p className="mt-4 max-w-[34ch] text-pretty text-lg leading-7 text-slate-200 sm:mt-6 sm:max-w-[55ch] sm:leading-8 sm:text-xl">
                        <span className="font-medium text-slate-100">{serviceSummary}</span>
                        {audienceSummary ? <span className="text-slate-200">{audienceSummary}</span> : null}
                    </p>

                    <div className="mt-6 flex flex-col items-start gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-6">
                        <Link
                            href="/scorp-estimator"
                            onClick={(event) => handleHeroNavigation(event, "hero_primary_cta_click", `/${locale}/scorp-estimator`)}
                            className="inline-flex min-h-12 min-w-11 max-w-full touch-manipulation items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3.5 text-center font-heading text-sm font-bold leading-snug text-brand-950 shadow-[0_10px_30px_-14px_rgba(212,175,55,0.9)] transition-[background-color,transform] hover:bg-gold-400 active:scale-[0.98] active:bg-gold-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300 motion-reduce:transition-none"
                        >
                            <span className="min-w-0 break-words">{primaryCta}</span>
                            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                        </Link>
                        <Link
                            href="#services"
                            onClick={(event) => handleHeroNavigation(event, "hero_secondary_cta_click", `/${locale}#services`)}
                            className="group -ml-2 inline-flex min-h-12 max-w-full touch-manipulation items-center gap-1.5 px-2 text-sm font-semibold leading-snug text-slate-300 underline decoration-slate-500/60 underline-offset-4 transition-[color,opacity] hover:text-gold-400 hover:decoration-gold-400 active:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300 motion-reduce:transition-none"
                        >
                            <span className="min-w-0 break-words">{secondaryCta}</span>
                            <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none" aria-hidden="true" />
                        </Link>
                    </div>

                    {playerVideoUrl ? (
                        <div className="mt-6 w-full lg:hidden">
                            {mobileVideoRequested ? (
                                <HeroVideoPlayer
                                    src={playerVideoUrl}
                                    poster={data?.heroPlayerPosterUrl}
                                    ariaLabel={t("videoLabel")}
                                    unavailableMessage={t("unavailable")}
                                    onPlay={handleVideoStart}
                                />
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setMobileVideoRequested(true)}
                                    data-testid="mobile-hero-video-trigger"
                                    className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/25 px-4 py-3 text-sm font-semibold text-slate-100 transition-colors hover:border-gold-400 hover:text-gold-300 active:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300 motion-reduce:transition-none"
                                >
                                    {t("videoLabel")}
                                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                                </button>
                            )}
                        </div>
                    ) : null}

                    {/* Desktop-only trust signals; mobile credentials appear in the trust bar below the hero. */}
                    <div
                        className="relative mt-8 hidden w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)] lg:block"
                    >
                        <div
                            className="flex w-full flex-wrap items-center gap-3 lg:w-max lg:flex-nowrap lg:gap-4 lg:animate-hero-marquee lg:hover:[animation-play-state:paused] lg:focus-within:[animation-play-state:paused] motion-reduce:animate-none"
                            role="list"
                            aria-label="Firm credentials"
                        >
                            {/* Primary Set: Accessible to screen readers (exactly 3 items) */}
                            {trustItems.map((item, idx) => (
                                <div
                                    key={`trust-primary-${idx}`}
                                    role="listitem"
                                    className="inline-flex min-h-10 max-w-full items-center gap-2 rounded-full border border-gold-500/25 bg-brand-950/70 px-4 py-2 text-xs font-medium text-slate-100 backdrop-blur-sm transition-colors hover:border-gold-400 hover:text-white lg:shrink-0"
                                >
                                    <item.icon className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                                    <span className="min-w-0 break-words">{item.label}</span>
                                </div>
                            ))}
                            {/* Duplicate Sets for Seamless 50% TranslateX Loop: Hidden from screen readers */}
                            {[...trustItems, ...trustItems, ...trustItems].map((item, idx) => (
                                <div
                                    key={`trust-duplicate-${idx}`}
                                    aria-hidden="true"
                                    className="hidden lg:inline-flex lg:shrink-0 lg:items-center lg:gap-2 lg:rounded-full lg:border lg:border-gold-500/25 lg:bg-brand-950/70 lg:px-3.5 lg:py-1.5 lg:text-xs lg:font-medium lg:text-slate-200 lg:backdrop-blur-sm lg:transition-colors lg:hover:border-gold-400 lg:hover:text-white"
                                >
                                    <item.icon className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                                    <span className="whitespace-nowrap">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {playerVideoUrl ? (
                    <div className="hidden w-full self-center lg:col-span-7 lg:block lg:justify-self-end">
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

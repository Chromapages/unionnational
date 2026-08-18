"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
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

type HeroEventName =
    | "hero_primary_cta_click"
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
    const backgroundVideoUrl =
        typeof rawBackgroundVideoUrl === "string"
            ? rawBackgroundVideoUrl
            : (rawBackgroundVideoUrl as unknown as { asset?: { url?: string }; url?: string })?.asset?.url ||
              (rawBackgroundVideoUrl as unknown as { url?: string })?.url;

    const rawPlayerVideoUrl = data?.heroPlayerVideoUrl;
    const playerVideoUrl =
        (typeof rawPlayerVideoUrl === "string"
            ? rawPlayerVideoUrl
            : (rawPlayerVideoUrl as unknown as { asset?: { url?: string }; url?: string })?.asset?.url ||
              (rawPlayerVideoUrl as unknown as { url?: string })?.url) || backgroundVideoUrl;

    const title = data?.heroTitleLocalized?.trim() || t("title");
    const subtitle = data?.heroSubtitleLocalized?.trim() || t("subtitle");
    const primaryCta = data?.heroCtaTextLocalized?.trim() || t("primaryCta");

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
                    priority
                    sizes="100vw"
                    aria-hidden="true"
                    className="absolute inset-0 -z-30 object-cover"
                />
            ) : null}

            {backgroundVideoUrl && !prefersReducedMotion && !backgroundVideoFailed ? (
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
                    className={`absolute inset-0 -z-20 h-full w-full object-cover transition-opacity duration-700 motion-reduce:transition-none ${backgroundVideoReady ? "opacity-20" : "opacity-0"}`}
                />
            ) : null}

            <div
                className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,22,20,0.98)_0%,rgba(5,42,38,0.94)_48%,rgba(7,52,47,0.82)_100%)]"
                aria-hidden="true"
            />

            <div
                className={`mx-auto grid w-full max-w-screen-xl items-center gap-12 px-5 sm:px-6 lg:gap-12 lg:px-8 xl:gap-16 ${
                    playerVideoUrl
                        ? "lg:grid-cols-[minmax(0,1.08fr)_minmax(500px,0.92fr)]"
                        : "lg:grid-cols-1"
                }`}
            >
                <div className="max-w-[630px]">
                    <h1
                        id="hero-heading"
                        className="max-w-[14ch] text-balance font-heading text-[clamp(3.25rem,4.6vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.04em] text-white"
                    >
                        {title}
                    </h1>
                    <p className="mt-6 max-w-[55ch] text-lg leading-8 text-slate-200 sm:text-xl">
                        {subtitle}
                    </p>

                    <div className="mt-8">
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
                    </div>
                </div>

                {playerVideoUrl ? (
                    <div className="w-full self-center lg:justify-self-end">
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

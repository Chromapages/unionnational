"use client";

import { useEffect, useRef, useState } from "react";

interface HeroVideoPlayerProps {
    src: string;
    poster?: string;
    ariaLabel: string;
    unavailableMessage: string;
}

export function HeroVideoPlayer({
    src,
    poster,
    ariaLabel,
    unavailableMessage,
}: HeroVideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const attemptedSourceRef = useRef<string | null>(null);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);
    const [hasMediaError, setHasMediaError] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

        updatePreference();
        mediaQuery.addEventListener("change", updatePreference);
        return () => mediaQuery.removeEventListener("change", updatePreference);
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || prefersReducedMotion || hasMediaError || attemptedSourceRef.current === src) {
            return;
        }

        attemptedSourceRef.current = src;
        video.play().catch(() => {
            // Browsers may reject autoplay despite the muted setting. The
            // controls remain available and the poster/first frame stays visible.
        });
    }, [hasMediaError, prefersReducedMotion, src]);

    if (hasMediaError) {
        return (
            <div
                className="flex aspect-video items-center justify-center rounded-2xl border border-white/15 bg-brand-950 px-6 text-center text-sm leading-6 text-slate-200 shadow-lg"
                role="status"
            >
                {unavailableMessage}
            </div>
        );
    }

    return (
        <div className="aspect-video overflow-hidden rounded-2xl border border-white/15 bg-brand-950 shadow-lg shadow-brand-950/40 focus-within:ring-2 focus-within:ring-gold-400 focus-within:ring-offset-2 focus-within:ring-offset-brand-900">
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                controls
                muted
                playsInline
                preload="metadata"
                aria-label={ariaLabel}
                className="h-full w-full object-contain"
                onCanPlay={() => {
                    if (!prefersReducedMotion && attemptedSourceRef.current !== src) {
                        attemptedSourceRef.current = src;
                        videoRef.current?.play().catch(() => undefined);
                    }
                }}
                onError={() => setHasMediaError(true)}
            >
                {unavailableMessage}
            </video>
        </div>
    );
}

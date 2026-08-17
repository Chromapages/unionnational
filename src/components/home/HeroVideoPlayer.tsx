"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

interface HeroVideoPlayerProps {
    src: string;
    poster?: string;
    ariaLabel: string;
    unavailableMessage: string;
    onPlay?: () => void;
}

export function HeroVideoPlayer({
    src,
    poster,
    ariaLabel,
    unavailableMessage,
    onPlay,
}: HeroVideoPlayerProps) {
    const hasReportedPlayRef = useRef(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasMediaError, setHasMediaError] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        setHasMediaError(false);
        setHasStarted(false);
    }, [src]);

    const startPlayback = () => {
        const video = videoRef.current;
        if (!video) return;

        void video.play().then(
            () => video.focus(),
            () => setHasStarted(false),
        );
    };

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
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/15 bg-brand-950 shadow-lg shadow-brand-950/40 focus-within:ring-2 focus-within:ring-gold-400 focus-within:ring-offset-2 focus-within:ring-offset-brand-900">
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                controls={hasStarted}
                muted
                playsInline
                preload="metadata"
                aria-label={hasStarted ? ariaLabel : undefined}
                aria-hidden={!hasStarted}
                tabIndex={hasStarted ? 0 : -1}
                className="h-full w-full object-contain"
                onPlay={() => {
                    setHasStarted(true);
                    if (!hasReportedPlayRef.current) {
                        hasReportedPlayRef.current = true;
                        onPlay?.();
                    }
                }}
                onError={() => setHasMediaError(true)}
            >
                {unavailableMessage}
            </video>
            {!hasStarted && (
                <button
                    type="button"
                    className="group absolute inset-0 flex items-center justify-center overflow-hidden bg-brand-950/20 focus-visible:outline-none"
                    aria-label={ariaLabel}
                    onClick={startPlayback}
                >
                    {poster && (
                        // A plain image keeps remote CMS posters available even when Next image hosts are restricted.
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={poster}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    )}
                    <span className="absolute inset-0 bg-gradient-to-t from-brand-950/65 via-brand-950/10 to-transparent" />
                    <span className="relative flex size-14 items-center justify-center rounded-full border border-white/30 bg-gold-400 text-brand-950 shadow-xl transition-transform duration-200 group-hover:scale-105 group-focus-visible:scale-105">
                        <Play className="ml-1 size-6 fill-current" aria-hidden="true" />
                    </span>
                </button>
            )}
        </div>
    );
}

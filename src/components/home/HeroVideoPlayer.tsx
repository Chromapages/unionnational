"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface HeroVideoPlayerProps {
    src: string;
    poster?: string;
    captionsSrc?: string;
    captionsLang?: string;
    captionsLabel?: string;
    ariaLabel: string;
    unavailableMessage: string;
    onPlay?: () => void;
}

export const HeroVideoPlayer = ({
    src,
    poster,
    captionsSrc,
    captionsLang = "en",
    captionsLabel = "English",
    ariaLabel,
    unavailableMessage,
    onPlay,
}: HeroVideoPlayerProps): React.JSX.Element => {
    const hasReportedPlayRef = useRef<boolean>(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasMediaError, setHasMediaError] = useState<boolean>(false);
    const [isMuted, setIsMuted] = useState<boolean>(true);

    useEffect(() => {
        setHasMediaError(false);
        setIsMuted(true);

        const video = videoRef.current;
        if (!video) return;

        video.muted = true;
        video.defaultMuted = true;

        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Autoplay may be restricted by browser policy; user can interact to play
            });
        }
    }, [src]);

    const handleToggleMute = () => {
        const video = videoRef.current;
        if (!video) return;

        const nextMutedState = !isMuted;
        video.muted = nextMutedState;
        setIsMuted(nextMutedState);

        if (video.paused) {
            void video.play();
        }
    };

    const handlePlay = () => {
        if (hasReportedPlayRef.current) return;
        hasReportedPlayRef.current = true;
        onPlay?.();
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === " " || event.key === "Enter") {
            event.preventDefault();
            handleToggleMute();
        }
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
        <div
            className="group relative aspect-video overflow-hidden rounded-2xl border border-white/15 bg-brand-950 shadow-lg shadow-brand-950/40 transition-all duration-300 hover:border-gold-500/30 hover:shadow-xl hover:shadow-brand-950/60 focus-within:ring-2 focus-within:ring-gold-400 focus-within:ring-offset-2 focus-within:ring-offset-brand-900"
            tabIndex={0}
            aria-label={ariaLabel}
            onKeyDown={handleKeyDown}
        >
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                controls={!isMuted}
                aria-label={ariaLabel}
                className="h-full w-full object-cover"
                onPlay={handlePlay}
                onError={() => setHasMediaError(true)}
            >
                {captionsSrc ? (
                    <track
                        kind="captions"
                        src={captionsSrc}
                        srcLang={captionsLang}
                        label={captionsLabel}
                        default
                    />
                ) : null}
                {unavailableMessage}
            </video>

            {isMuted ? (
                <button
                    type="button"
                    onClick={handleToggleMute}
                    className="absolute bottom-4 right-4 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-brand-950/80 px-4 py-2 text-xs font-semibold text-white shadow-xl backdrop-blur-md transition-all hover:bg-gold-500 hover:text-brand-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
                >
                    <VolumeX className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Click for Sound</span>
                </button>
            ) : null}
        </div>
    );
};

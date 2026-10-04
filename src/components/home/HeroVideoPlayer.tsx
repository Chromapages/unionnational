"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { VolumeX } from "lucide-react";

interface HeroVideoPlayerProps {
    src: string;
    poster?: string;
    captionsSrc?: string;
    captionsLang?: string;
    captionsLabel?: string;
    ariaLabel: string;
    unavailableMessage: string;
    retryLabel?: string;
    soundLabel?: string;
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
    retryLabel = "Retry video",
    soundLabel = "Click for Sound",
    onPlay,
}: HeroVideoPlayerProps): React.JSX.Element => {
    const hasReportedPlayRef = useRef<boolean>(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasMediaError, setHasMediaError] = useState<boolean>(false);
    const [isMuted, setIsMuted] = useState<boolean>(true);
    const [retryCount, setRetryCount] = useState(0);

    const handlePlay = useCallback(() => {
        if (hasReportedPlayRef.current) return;
        hasReportedPlayRef.current = true;
        onPlay?.();
    }, [onPlay]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
        const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
        if (retryCount === 0 && (saveData || reducedMotion)) return;

        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.then(handlePlay).catch(() => {
                // Policy restrictions leave native controls available; media errors show the fallback.
                if (video.error) setHasMediaError(true);
            });
        }
    }, [src, retryCount, handlePlay]);

    const handleToggleMute = () => {
        const video = videoRef.current;
        if (!video) return;

        const nextMutedState = !isMuted;
        video.muted = nextMutedState;
        setIsMuted(nextMutedState);

        if (video.paused) {
            video.play()?.catch(() => {
                if (video.error) setHasMediaError(true);
            });
        }
    };

    if (hasMediaError) {
        return (
            <div
                className="flex aspect-video flex-col items-center justify-center gap-4 rounded-2xl border border-white/15 bg-brand-950 px-6 text-center text-sm leading-6 text-slate-200 shadow-lg"
                role="status"
            >
                {unavailableMessage}
                <button
                    type="button"
                    onClick={() => { setHasMediaError(false); setRetryCount((count) => count + 1); }}
                    className="min-h-11 rounded-full border border-white/30 px-5 py-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
                >
                    {retryLabel}
                </button>
            </div>
        );
    }

    return (
        <div
            className="group relative aspect-video overflow-hidden rounded-2xl border border-white/15 bg-brand-950 shadow-lg shadow-brand-950/40 transition-all duration-300 hover:border-gold-500/30 hover:shadow-xl hover:shadow-brand-950/60 focus-within:ring-2 focus-within:ring-gold-400 focus-within:ring-offset-2 focus-within:ring-offset-brand-900"
        >
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                muted={isMuted}
                loop
                playsInline
                preload="none"
                controls
                aria-label={ariaLabel}
                className="h-full w-full object-cover"
                onPlay={handlePlay}
                onVolumeChange={(event) => setIsMuted(event.currentTarget.muted)}
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
                    className="absolute top-4 right-4 z-20 flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-brand-950/80 px-4 py-2 text-xs font-semibold text-white shadow-xl backdrop-blur-md transition-all hover:bg-gold-500 hover:text-brand-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
                >
                    <VolumeX className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{soundLabel}</span>
                </button>
            ) : null}
        </div>
    );
};

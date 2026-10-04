'use client';

import React, { useId, useState, useRef, useCallback, useEffect, useSyncExternalStore } from 'react';
import { useVideoPlayer } from '@/hooks/useVideoPlayer';
import { cn } from '@/lib/utils';
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize,
    Minimize,
    SkipBack,
    SkipForward,
    Loader2,
    PictureInPicture
} from 'lucide-react';

const playbackRates = [0.5, 1, 1.25, 1.5, 2];

export interface VideoChapter {
    id: string;
    title: string;
    startTime: number;
    thumbnail?: string;
    cta?: {
        text: string;
        url: string;
        duration?: number; // How long to show it
    };
}

interface VideoPlayerProps {
    src: string;
    poster?: string;
    autoPlay?: boolean;
    muted?: boolean;
    loop?: boolean;
    className?: string;
    chapters?: VideoChapter[];
}

export function VideoPlayer({
    src,
    poster,
    autoPlay = false,
    muted = false,
    loop = false,
    className = '',
    chapters = []
}: VideoPlayerProps) {
    const { videoRef, containerRef, state, controls } = useVideoPlayer({
        src,
        autoPlay,
        muted,
        loop
    });

    const [showControls, setShowControls] = useState(true);
    const [hasFocusWithin, setHasFocusWithin] = useState(false);
    const [speedOpen, setSpeedOpen] = useState(false);
    const noopSubscribe = () => () => {};
    const isClient = useSyncExternalStore(noopSubscribe, () => true, () => false);
    const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const speedContainerRef = useRef<HTMLDivElement>(null);
    const speedTriggerRef = useRef<HTMLButtonElement>(null);
    const speedOptionRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const speedPanelId = useId();
    const controlsVisible = showControls || !state.isPlaying || hasFocusWithin;
    const duration = Number.isFinite(state.duration) ? Math.max(0, state.duration) : 0;

    const getMediaErrorMessage = (error: MediaError | null) => {
        if (!error) return "Unknown media error";

        switch (error.code) {
            case MediaError.MEDIA_ERR_ABORTED:
                return "Media playback was aborted.";
            case MediaError.MEDIA_ERR_NETWORK:
                return "A network error interrupted media playback.";
            case MediaError.MEDIA_ERR_DECODE:
                return "The video could not be decoded by the browser.";
            case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                return "The video source format is not supported by the browser.";
            default:
                return error.message || "Unknown media error";
        }
    };

    // Format time helper
    const formatTime = useCallback((seconds: number) => {
        if (!Number.isFinite(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }, []);

    // Handle mouse movement to show/hide controls
    const handleMouseMove = useCallback(() => {
        setShowControls(true);

        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }

        if (state.isPlaying) {
            controlsTimeoutRef.current = setTimeout(() => {
                if (!containerRef.current?.contains(document.activeElement)) setShowControls(false);
            }, 3000);
        }
    }, [state.isPlaying, containerRef]);

    const handleMouseLeave = useCallback(() => {
        if (state.isPlaying && !containerRef.current?.contains(document.activeElement)) {
            setShowControls(false);
        }
    }, [state.isPlaying, containerRef]);

    useEffect(() => {
        return () => {
            if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        };
    }, []);

    useEffect(() => {
        if (!speedOpen) return;
        const selectedIndex = playbackRates.indexOf(state.playbackRate);
        speedOptionRefs.current[Math.max(0, selectedIndex)]?.focus();
        const closeOutside = (event: PointerEvent) => {
            if (!speedContainerRef.current?.contains(event.target as Node)) setSpeedOpen(false);
        };
        document.addEventListener('pointerdown', closeOutside);
        return () => document.removeEventListener('pointerdown', closeOutside);
    }, [speedOpen, state.playbackRate]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Only handle if container is focused or fullscreen
            if (!containerRef.current?.contains(document.activeElement) && !state.isFullscreen) return;
            // Native controls own their keyboard activation and slider adjustment.
            if (e.target instanceof Element && e.target.closest('button, input, select, textarea, a[href]')) return;

            // Prevent default scrolling for Space/Arrows
            if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
                e.preventDefault();
            }

            switch (e.code) {
                case 'Space':
                    controls.togglePlay();
                    break;
                case 'ArrowLeft':
                    controls.seekRelative(-10);
                    break;
                case 'ArrowRight':
                    controls.seekRelative(10);
                    break;
                case 'ArrowUp':
                    controls.setVolume(state.volume + 0.1);
                    break;
                case 'ArrowDown':
                    controls.setVolume(state.volume - 0.1);
                    break;
                case 'KeyM':
                    controls.toggleMute();
                    break;
                case 'KeyF':
                    controls.toggleFullscreen();
                    break;
            }

            // Show controls on keyboard interaction
            handleMouseMove();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [controls, state.volume, state.isFullscreen, handleMouseMove, containerRef]);

    // Don't render if no src
    if (!src) return null;

    // Current Chapter & CTA Logic
    const currentChapter = chapters.slice().reverse().find(c => state.currentTime >= c.startTime);
    const _showCta = currentChapter?.cta && state.isPlaying && !state.isBuffering;

    return (
        <div
            ref={containerRef}
            className={`relative group bg-brand-900 overflow-hidden outline-none ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onPointerDown={() => setShowControls(true)}
            onFocusCapture={() => {
                setHasFocusWithin(true);
                setShowControls(true);
                if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
            }}
            onBlurCapture={event => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                    setHasFocusWithin(false);
                    setSpeedOpen(false);
                }
            }}
            tabIndex={0}
            role="region"
            aria-label="Video Player"
        >
            <video
                ref={videoRef}
                className="w-full h-full object-contain"
                poster={poster}
                playsInline
                onClick={controls.togglePlay}
                muted={muted}
                loop={loop}
                onError={isClient ? (e) => {
                    const videoElement = e.currentTarget;
                    console.warn("Video element error:", {
                        message: getMediaErrorMessage(videoElement.error),
                        code: videoElement.error?.code,
                        src: videoElement.currentSrc || videoElement.src,
                        networkState: videoElement.networkState,
                        readyState: videoElement.readyState
                    });
                } : undefined}
            />

            {/* Loading Spinner */}
            {state.isBuffering && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Loader2 className="w-12 h-12 text-gold-500 animate-spin" />
                </div>
            )}

            {/* Center Play/Pause Overlay */}
            {!state.isPlaying && !state.isBuffering && <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
                <button
                    type="button"
                    onClick={() => { containerRef.current?.focus(); controls.togglePlay(); }}
                    className={cn(
                        'w-16 h-16 rounded-full bg-brand-900/80 flex items-center justify-center text-white',
                        'pointer-events-auto hover:ring-2 hover:ring-gold-500 transition-all transform hover:scale-105'
                    )}
                    aria-label="Play"
                >
                    <Play className="w-8 h-8 fill-current ml-1" />
                </button>
            </div>}

            {/* Control Bar */}
            <div
                data-video-controls
                inert={!controlsVisible}
                aria-hidden={!controlsVisible || undefined}
                className={cn(
                    'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-900/95 to-transparent px-4 pb-4 pt-12',
                    'transition-opacity duration-300 flex flex-col gap-2',
                    controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                )}
            >
                {/* Progress Bar */}
                <input type="range" min="0" max={duration} step="0.1"
                    value={Number.isFinite(state.currentTime) ? Math.min(Math.max(0, state.currentTime), duration) : 0}
                    disabled={duration === 0}
                    aria-label="Seek video"
                    aria-valuetext={`${formatTime(state.currentTime)} of ${formatTime(duration)}`}
                    onChange={event => controls.seek(Number(event.target.value))}
                    className="h-6 w-full cursor-pointer accent-gold-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300" />

                {/* Controls Row */}
                <div className="flex flex-wrap items-center justify-between gap-2 mt-1">
                    <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-4">
                        {/* Play/Pause */}
                        <button
                            type="button"
                            onClick={controls.togglePlay}
                            className="text-white hover:text-gold-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-lg p-1"
                            aria-label={state.isPlaying ? "Pause" : "Play"}
                        >
                            {state.isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                        </button>

                        {/* Volume */}
                        <div className="flex items-center gap-2 group/volume">
                            <button
                                type="button"
                                onClick={controls.toggleMute}
                                className="text-white hover:text-gold-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-lg p-1"
                                aria-label={state.isMuted ? "Unmute" : "Mute"}
                            >
                                {state.isMuted || state.volume === 0 ? (
                                    <VolumeX className="w-6 h-6" />
                                ) : (
                                    <Volume2 className="w-6 h-6" />
                                )}
                            </button>
                            <div className="w-16 sm:w-20">
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.05"
                                    value={state.isMuted ? 0 : state.volume}
                                    onChange={(e) => controls.setVolume(parseFloat(e.target.value))}
                                    className="h-6 w-full cursor-pointer accent-gold-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300"
                                    aria-label="Volume"
                                />
                            </div>
                        </div>

                        {/* Time Display */}
                        <div className="text-xs font-data tabular-nums text-slate-300 tabular-nums">
                            {formatTime(state.currentTime)} / {formatTime(state.duration)}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Speed Control */}
                        <div ref={speedContainerRef} className="relative"
                            onBlurCapture={event => {
                                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setSpeedOpen(false);
                            }}
                            onKeyDown={event => {
                                if (event.key === 'Escape') {
                                    event.preventDefault();
                                    setSpeedOpen(false);
                                    speedTriggerRef.current?.focus();
                                }
                            }}>
                            <button
                                ref={speedTriggerRef}
                                type="button"
                                aria-expanded={speedOpen}
                                aria-controls={speedPanelId}
                                onClick={() => setSpeedOpen(open => !open)}
                                onKeyDown={event => {
                                    if (event.key === 'ArrowDown') { event.preventDefault(); setSpeedOpen(true); }
                                }}
                                className="text-white hover:text-gold-400 transition-colors text-xs font-bold w-8 h-8 flex items-center justify-center rounded-lg"
                                aria-label="Playback Speed"
                            >
                                {state.playbackRate}x
                            </button>
                            {speedOpen && <div id={speedPanelId} role="group" aria-label="Playback speeds" className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 max-h-28 overflow-y-auto overscroll-contain bg-brand-900/95 border border-white/10 rounded-lg shadow-xl flex flex-col min-w-[60px]">
                                {playbackRates.map((rate, index) => (
                                    <button
                                        key={rate}
                                        ref={node => { speedOptionRefs.current[index] = node; }}
                                        type="button"
                                        aria-pressed={state.playbackRate === rate}
                                        onClick={() => { controls.setPlaybackRate(rate); setSpeedOpen(false); speedTriggerRef.current?.focus(); }}
                                        onKeyDown={event => {
                                            let next: number;
                                            switch (event.key) {
                                                case 'ArrowDown': next = (index + 1) % playbackRates.length; break;
                                                case 'ArrowUp': next = (index + playbackRates.length - 1) % playbackRates.length; break;
                                                case 'Home': next = 0; break;
                                                case 'End': next = playbackRates.length - 1; break;
                                                default: return;
                                            }
                                            event.preventDefault();
                                            speedOptionRefs.current[next]?.focus();
                                        }}
                                        className={`min-h-11 px-3 py-2 text-xs font-medium hover:bg-white/10 transition-colors text-left flex items-center justify-between ${state.playbackRate === rate ? 'text-gold-500' : 'text-slate-300'}`}
                                    >
                                        {rate}x
                                    </button>
                                ))}
                            </div>}
                        </div>

                        {/* PiP (only if supported) */}
                        {isClient && typeof document !== 'undefined' && document.pictureInPictureEnabled && (
                            <button
                                type="button"
                                onClick={controls.togglePip}
                                className={`text-white hover:text-gold-400 transition-colors hidden sm:block p-1 ${state.isPip ? 'text-gold-500' : ''}`}
                                aria-label={state.isPip ? "Exit Picture-in-Picture" : "Enter Picture-in-Picture"}
                            >
                                <PictureInPicture className="w-5 h-5" />
                            </button>
                        )}

                        {/* Skip Buttons (optional, but good for UX) */}
                        <button
                            type="button"
                            onClick={() => controls.seekRelative(-10)}
                            className="text-white hover:text-gold-400 transition-colors hidden sm:block p-1"
                            aria-label="Rewind 10 seconds"
                        >
                            <SkipBack className="w-5 h-5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => controls.seekRelative(10)}
                            className="text-white hover:text-gold-400 transition-colors hidden sm:block p-1"
                            aria-label="Forward 10 seconds"
                        >
                            <SkipForward className="w-5 h-5" />
                        </button>

                        {/* Fullscreen */}
                        <button
                            type="button"
                            onClick={controls.toggleFullscreen}
                            className="text-white hover:text-gold-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-lg p-1"
                            aria-label={state.isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                        >
                            {state.isFullscreen ? (
                                <Minimize className="w-6 h-6" />
                            ) : (
                                <Maximize className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

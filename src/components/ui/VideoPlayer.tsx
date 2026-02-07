'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
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
    PictureInPicture,
    Settings,
    List,
    X,
    ArrowRight
} from 'lucide-react';

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
    // Don't render if no src
    if (!src) return null;

    const { videoRef, containerRef, state, controls } = useVideoPlayer({
        src,
        autoPlay,
        muted,
        loop
    });

    const [showControls, setShowControls] = useState(true);
    const [isHovering, setIsHovering] = useState(false);
    const [isScrubbing, setIsScrubbing] = useState(false);
    const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

    // Current Chapter & CTA Logic
    const currentChapter = chapters.slice().reverse().find(c => state.currentTime >= c.startTime);
    const showCta = currentChapter?.cta && state.isPlaying && !state.isBuffering;

    // Format time helper
    const formatTime = (seconds: number) => {
        if (isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Handle mouse movement to show/hide controls
    const handleMouseMove = useCallback(() => {
        setShowControls(true);
        setIsHovering(true);

        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }

        if (state.isPlaying && !isScrubbing) {
            controlsTimeoutRef.current = setTimeout(() => {
                setShowControls(false);
                setIsHovering(false);
            }, 3000);
        }
    }, [state.isPlaying, isScrubbing]);

    const handleMouseLeave = useCallback(() => {
        setIsHovering(false);
        if (state.isPlaying && !isScrubbing) {
            setShowControls(false);
        }
    }, [state.isPlaying, isScrubbing]);

    // Handle seeking via progress bar
    const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
        if (!progressBarRef.current || !state.duration) return;

        const rect = progressBarRef.current.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        const seekTime = Math.max(0, Math.min(pos * state.duration, state.duration));

        controls.seek(seekTime);
    }, [state.duration, controls]);

    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        setIsScrubbing(true);
        handleSeek(e);
    }, [handleSeek]);

    useEffect(() => {
        const handleWindowMouseMove = (e: MouseEvent) => {
            if (isScrubbing) {
                handleSeek(e);
            }
        };

        const handleWindowMouseUp = () => {
            if (isScrubbing) {
                setIsScrubbing(false);
            }
        };

        if (isScrubbing) {
            window.addEventListener('mousemove', handleWindowMouseMove);
            window.addEventListener('mouseup', handleWindowMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleWindowMouseMove);
            window.removeEventListener('mouseup', handleWindowMouseUp);
        };
    }, [isScrubbing, handleSeek]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Only handle if container is focused or fullscreen
            if (!containerRef.current?.contains(document.activeElement) && !state.isFullscreen) return;

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
    }, [controls, state.volume, state.isFullscreen, handleMouseMove]);

    return (
        <div
            ref={containerRef}
            className={`relative group bg-brand-900 overflow-hidden outline-none ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
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
                muted={muted} // Initial muted state
                loop={loop}
            />

            {/* Loading Spinner */}
            {state.isBuffering && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Loader2 className="w-12 h-12 text-gold-500 animate-spin" />
                </div>
            )}

            {/* Center Play/Pause Overlay */}
            <div
                className={cn(
                    'absolute inset-0 flex items-center justify-center transition-opacity duration-200 pointer-events-none',
                    !state.isPlaying && !state.isBuffering ? 'opacity-100' : 'opacity-0'
                )}
            >
                <button
                    onClick={controls.togglePlay}
                    className={cn(
                        'w-16 h-16 rounded-full bg-brand-900/80 flex items-center justify-center text-white',
                        'pointer-events-auto hover:ring-2 hover:ring-gold-500 transition-all transform hover:scale-105'
                    )}
                    aria-label={state.isPlaying ? "Pause" : "Play"}
                >
                    {state.isPlaying ? (
                        <Pause className="w-8 h-8 fill-current" />
                    ) : (
                        <Play className="w-8 h-8 fill-current ml-1" />
                    )}
                </button>
            </div>

            {/* Control Bar */}
            <div
                className={cn(
                    'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-900/95 to-transparent px-4 pb-4 pt-12',
                    'transition-opacity duration-300 flex flex-col gap-2',
                    showControls || !state.isPlaying ? 'opacity-100' : 'opacity-0'
                )}
            >
                {/* Progress Bar */}
                <div
                    className="relative h-1 hover:h-2 bg-brand-700 w-full cursor-pointer rounded-full transition-all duration-150 group/progress"
                    ref={progressBarRef}
                    onMouseDown={handleMouseDown}
                >
                    {/* Buffered (optional, if we had buffer info) */}

                    {/* Played */}
                    <div
                        className="absolute top-0 left-0 h-full bg-gold-500 rounded-full relative"
                        style={{ width: `${state.progress}%` }}
                    >
                        {/* Scrubber Dot */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md scale-0 group-hover/progress:scale-100 transition-transform duration-150" />
                    </div>
                </div>

                {/* Controls Row */}
                <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-4">
                        {/* Play/Pause */}
                        <button
                            onClick={controls.togglePlay}
                            className="text-white hover:text-gold-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-lg p-1"
                            aria-label={state.isPlaying ? "Pause" : "Play"}
                        >
                            {state.isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                        </button>

                        {/* Volume */}
                        <div className="flex items-center gap-2 group/volume">
                            <button
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
                            <div className="w-0 overflow-hidden group-hover/volume:w-20 transition-all duration-200">
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.05"
                                    value={state.isMuted ? 0 : state.volume}
                                    onChange={(e) => controls.setVolume(parseFloat(e.target.value))}
                                    className="w-20 h-1 bg-brand-700 rounded-lg appearance-none cursor-pointer accent-gold-500"
                                    aria-label="Volume"
                                />
                            </div>
                        </div>

                        {/* Time Display */}
                        <div className="text-xs font-mono text-slate-300 tabular-nums">
                            {formatTime(state.currentTime)} / {formatTime(state.duration)}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Speed Control */}
                        <div className="relative group/speed">
                            <button
                                className="text-white hover:text-gold-400 transition-colors text-xs font-bold w-8 h-8 flex items-center justify-center rounded-lg"
                                aria-label="Playback Speed"
                            >
                                {state.playbackRate}x
                            </button>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-brand-900/95 border border-white/10 rounded-lg overflow-hidden shadow-xl opacity-0 invisible group-hover/speed:opacity-100 group-hover/speed:visible transition-all duration-200 flex flex-col min-w-[60px]">
                                {[0.5, 1, 1.25, 1.5, 2].map((rate) => (
                                    <button
                                        key={rate}
                                        onClick={() => controls.setPlaybackRate(rate)}
                                        className={`px-3 py-2 text-xs font-medium hover:bg-white/10 transition-colors text-left flex items-center justify-between ${state.playbackRate === rate ? 'text-gold-500' : 'text-slate-300'}`}
                                    >
                                        {rate}x
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* PiP (only if supported) */}
                        {typeof document !== 'undefined' && document.pictureInPictureEnabled && (
                            <button
                                onClick={controls.togglePip}
                                className={`text-white hover:text-gold-400 transition-colors hidden sm:block p-1 ${state.isPip ? 'text-gold-500' : ''}`}
                                aria-label={state.isPip ? "Exit Picture-in-Picture" : "Enter Picture-in-Picture"}
                            >
                                <PictureInPicture className="w-5 h-5" />
                            </button>
                        )}

                        {/* Skip Buttons (optional, but good for UX) */}
                        <button
                            onClick={() => controls.seekRelative(-10)}
                            className="text-white hover:text-gold-400 transition-colors hidden sm:block p-1"
                            aria-label="Rewind 10 seconds"
                        >
                            <SkipBack className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => controls.seekRelative(10)}
                            className="text-white hover:text-gold-400 transition-colors hidden sm:block p-1"
                            aria-label="Forward 10 seconds"
                        >
                            <SkipForward className="w-5 h-5" />
                        </button>

                        {/* Fullscreen */}
                        <button
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

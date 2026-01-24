import { useState, useEffect, useRef, useCallback } from 'react';
import Hls from 'hls.js';

interface UseVideoPlayerProps {
    src?: string;
    autoPlay?: boolean;
    muted?: boolean;
    loop?: boolean;
    poster?: string;
}

interface VideoPlayerState {
    isPlaying: boolean;
    isMuted: boolean;
    volume: number;
    progress: number; // 0-100
    duration: number;
    currentTime: number;
    isBuffering: boolean;
    isFullscreen: boolean;
    playbackRate: number;
    isPip: boolean;
}

export function useVideoPlayer({ src, autoPlay = false, muted = false, loop = false }: UseVideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [state, setState] = useState<VideoPlayerState>({
        isPlaying: false,
        isMuted: muted,
        volume: 1,
        progress: 0,
        duration: 0,
        currentTime: 0,
        isBuffering: false,
        isFullscreen: false,
        playbackRate: 1,
        isPip: false,
    });

    // Initialize HLS or regular video
    useEffect(() => {
        const video = videoRef.current;
        if (!video || !src) return;

        let hls: Hls | null = null;
        const isHls = src.includes('.m3u8') || src.includes('application/vnd.apple.mpegurl');

        if (isHls && Hls.isSupported()) {
            hls = new Hls({
                enableWorker: true,
                lowLatencyMode: true,
            });
            hls.loadSource(src);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                if (autoPlay) {
                    video.play().catch(() => {
                        // Autoplay prevented
                        setState(s => ({ ...s, isPlaying: false }));
                    });
                }
            });
            
            if (loop) {
                hls.on(Hls.Events.ENDED, () => {
                    video.play().catch(() => {});
                });
            }
        } else if (isHls && video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = src;
            video.addEventListener('loadedmetadata', () => {
                if (autoPlay) {
                    video.play().catch(() => { });
                }
            });
        } else {
            // Regular video file (MP4, WebM, etc.)
            video.src = src;
            video.muted = muted;
            video.loop = loop;
            
            const handleLoadedMetadata = () => {
                if (autoPlay) {
                    video.play().catch(() => {
                        // Autoplay prevented
                        setState(s => ({ ...s, isPlaying: false }));
                    });
                }
            };
            
            const handleEnded = () => {
                if (loop) {
                    video.play().catch(() => {});
                }
            };
            
            video.addEventListener('loadedmetadata', handleLoadedMetadata);
            if (loop) {
                video.addEventListener('ended', handleEnded);
            }
            
            // If metadata is already loaded, try to play immediately
            if (video.readyState >= 1 && autoPlay) {
                video.play().catch(() => {
                    setState(s => ({ ...s, isPlaying: false }));
                });
            }
            
            return () => {
                video.removeEventListener('loadedmetadata', handleLoadedMetadata);
                video.removeEventListener('ended', handleEnded);
            };
        }

        return () => {
            if (hls) {
                hls.destroy();
            }
        };
    }, [src, autoPlay, muted, loop]);

    // Sync muted and loop attributes
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        video.muted = muted;
        video.loop = loop;
    }, [muted, loop]);

    // Event Listeners
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const onPlay = () => setState(s => ({ ...s, isPlaying: true }));
        const onPause = () => setState(s => ({ ...s, isPlaying: false }));
        const onTimeUpdate = () => {
            setState(s => ({
                ...s,
                currentTime: video.currentTime,
                progress: (video.currentTime / video.duration) * 100 || 0,
            }));
        };
        const onDurationChange = () => setState(s => ({ ...s, duration: video.duration }));
        const onVolumeChange = () => setState(s => ({ ...s, volume: video.volume, isMuted: video.muted }));
        const onWaiting = () => setState(s => ({ ...s, isBuffering: true }));
        const onPlaying = () => setState(s => ({ ...s, isBuffering: false }));
        const onRateChange = () => setState(s => ({ ...s, playbackRate: video.playbackRate }));
        const onFullscreenChange = () => {
            setState(s => ({ ...s, isFullscreen: !!document.fullscreenElement }));
        };
        const onEnterPip = () => setState(s => ({ ...s, isPip: true }));
        const onLeavePip = () => setState(s => ({ ...s, isPip: false }));

        video.addEventListener('play', onPlay);
        video.addEventListener('pause', onPause);
        video.addEventListener('timeupdate', onTimeUpdate);
        video.addEventListener('durationchange', onDurationChange);
        video.addEventListener('volumechange', onVolumeChange);
        video.addEventListener('waiting', onWaiting);
        video.addEventListener('playing', onPlaying);
        video.addEventListener('ratechange', onRateChange);
        video.addEventListener('enterpictureinpicture', onEnterPip);
        video.addEventListener('leavepictureinpicture', onLeavePip);
        document.addEventListener('fullscreenchange', onFullscreenChange);

        return () => {
            video.removeEventListener('play', onPlay);
            video.removeEventListener('pause', onPause);
            video.removeEventListener('timeupdate', onTimeUpdate);
            video.removeEventListener('durationchange', onDurationChange);
            video.removeEventListener('volumechange', onVolumeChange);
            video.removeEventListener('waiting', onWaiting);
            video.removeEventListener('playing', onPlaying);
            video.removeEventListener('ratechange', onRateChange);
            video.removeEventListener('enterpictureinpicture', onEnterPip);
            video.removeEventListener('leavepictureinpicture', onLeavePip);
            document.removeEventListener('fullscreenchange', onFullscreenChange);
        };
    }, []);

    // Controls
    const togglePlay = useCallback(() => {
        if (!videoRef.current) return;
        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    }, []);

    const seek = useCallback((time: number) => {
        if (!videoRef.current) return;
        videoRef.current.currentTime = Math.max(0, Math.min(time, videoRef.current.duration));
    }, []);

    const seekRelative = useCallback((seconds: number) => {
        if (!videoRef.current) return;
        videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.currentTime + seconds, videoRef.current.duration));
    }, []);

    const setVolume = useCallback((value: number) => {
        if (!videoRef.current) return;
        videoRef.current.volume = Math.max(0, Math.min(value, 1));
        videoRef.current.muted = value === 0;
    }, []);

    const toggleMute = useCallback(() => {
        if (!videoRef.current) return;
        videoRef.current.muted = !videoRef.current.muted;
    }, []);

    const toggleFullscreen = useCallback(async () => {
        if (!containerRef.current) return;
        
        if (!document.fullscreenElement) {
            try {
                await containerRef.current.requestFullscreen();
            } catch (err) {
                console.error('Error attempting to enable fullscreen:', err);
            }
        } else {
            if (document.exitFullscreen) {
                await document.exitFullscreen();
            }
        }
    }, []);

    const setPlaybackRate = useCallback((rate: number) => {
        if (!videoRef.current) return;
        videoRef.current.playbackRate = rate;
    }, []);

    const togglePip = useCallback(async () => {
        if (!videoRef.current) return;
        
        try {
            if (document.pictureInPictureElement) {
                await document.exitPictureInPicture();
            } else {
                await videoRef.current.requestPictureInPicture();
            }
        } catch (err) {
            console.error('Error toggling PiP:', err);
        }
    }, []);

    return {
        videoRef,
        containerRef,
        state,
        controls: {
            togglePlay,
            seek,
            seekRelative,
            setVolume,
            toggleMute,
            toggleFullscreen,
            setPlaybackRate,
            togglePip,
        },
    };
}

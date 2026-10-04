"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { VideoPlayer } from "@/components/ui/VideoPlayer";

interface VideoEmbedProps {
    videoUrl?: string; // Sanity file URL or external embed URL
    posterImage?: string;
    autoPlay?: boolean;
}

export default function VideoEmbed({ videoUrl, posterImage, autoPlay = false }: VideoEmbedProps) {
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const contentRef = useRef<HTMLDivElement>(null);
    const activatedByVisitor = useRef(false);

    useEffect(() => {
        if (!isPlaying || !activatedByVisitor.current) return;
        contentRef.current?.querySelector<HTMLElement>('[role="region"], iframe')?.focus();
    }, [isPlaying]);

    if (!videoUrl) return null;

    // Debug logging in development
    if (process.env.NODE_ENV === "development") {
        console.log("[VideoEmbed] videoUrl:", videoUrl);
    }

    const videoUrlPath = videoUrl.split("?")[0].toLowerCase();
    const isExternalEmbed =
        videoUrl.includes("youtube.com") ||
        videoUrl.includes("youtu.be") ||
        videoUrl.includes("vimeo.com");
    const isNativeVideo =
        videoUrlPath.endsWith(".mp4") ||
        videoUrlPath.endsWith(".webm") ||
        videoUrlPath.endsWith(".m4v") ||
        videoUrlPath.endsWith(".ogg") ||
        videoUrlPath.endsWith(".ogv") ||
        videoUrlPath.endsWith(".m3u8") ||
        // Sanity CDN file URLs — treat as native video unless known unsupported format
        (videoUrl.includes("cdn.sanity.io/files") && !videoUrlPath.endsWith(".mov"));
    const isUnsupportedDirectVideo = !isExternalEmbed && !isNativeVideo;

    const handlePlay = () => {
        activatedByVisitor.current = true;
        setIsPlaying(true);
    };

    return (
        <div ref={contentRef} className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-2xl border-4 border-slate-800">
            {/* Video Player - Native HTML5 for web-safe formats */}
            {isNativeVideo && (
                <>
                    <div className="contents" inert={!isPlaying && Boolean(posterImage)}>
                        <VideoPlayer
                            src={videoUrl}
                            autoPlay={isPlaying}
                            muted={isPlaying} // Mute initially for autoplay to work in browsers
                            poster={posterImage}
                            className="w-full h-full"
                        />
                    </div>
                    {/* Poster / Thumbnail Overlay - Only show if not playing and poster exists */}
                    {!isPlaying && posterImage && (
                        <button
                            type="button"
                            className="absolute inset-0 z-10 cursor-pointer group"
                            onClick={handlePlay}
                            aria-label="Play video"
                        >
                            <Image
                                src={posterImage}
                                alt=""
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <span aria-hidden="true" className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                                <span className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl group-hover:scale-110 transition-transform">
                                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                                </span>
                            </span>
                        </button>
                    )}
                </>
            )}

            {/* Video Player - Iframe for YouTube/Vimeo */}
            {isExternalEmbed && (
                <>
                    {(isPlaying || !posterImage) && (
                        <iframe
                            title="Video player"
                            src={getEmbedUrl(videoUrl)}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    )}
                    {/* Poster / Thumbnail Overlay for YouTube/Vimeo */}
                    {!isPlaying && posterImage && (
                        <button
                            type="button"
                            className="absolute inset-0 z-10 cursor-pointer group"
                            onClick={handlePlay}
                            aria-label="Play video"
                        >
                            <Image
                                src={posterImage}
                                alt=""
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <span aria-hidden="true" className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                                <span className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl group-hover:scale-110 transition-transform">
                                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                                </span>
                            </span>
                        </button>
                    )}
                </>
            )}

            {/* Fallback for unsupported direct files like .mov */}
            {isUnsupportedDirectVideo && (
                <>
                    {posterImage ? (
                        <Image
                            src={posterImage}
                            alt="Video Thumbnail"
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-slate-900" />
                    )}
                    <div className="absolute inset-0 bg-black/55 flex items-center justify-center p-6 text-center">
                        <p className="max-w-md text-sm md:text-base text-white/85">
                            This video file format is not supported in the browser. Upload an `mp4` or `webm` file to display it here.
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}

// Helper function to convert YouTube/Vimeo URLs to embed URLs
function getEmbedUrl(url: string): string {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
        const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    } else if (url.includes("vimeo.com")) {
        const videoId = url.split("/").pop();
        return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    }
    return url;
}

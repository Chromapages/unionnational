"use client";

import { useState } from "react";
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
        setIsPlaying(true);
    };

    return (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-2xl border-4 border-slate-800">
            {/* Video Player - Native HTML5 for web-safe formats */}
            {isNativeVideo && (
                <>
                    <VideoPlayer
                        src={videoUrl}
                        autoPlay={isPlaying}
                        muted={isPlaying} // Mute initially for autoplay to work in browsers
                        poster={posterImage}
                        className="w-full h-full"
                    />
                    {/* Poster / Thumbnail Overlay - Only show if not playing and poster exists */}
                    {!isPlaying && posterImage && (
                        <div
                            className="absolute inset-0 z-10 cursor-pointer group"
                            onClick={handlePlay}
                            role="button"
                            aria-label="Play video"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === "Enter" && handlePlay()}
                        >
                            <Image
                                src={posterImage}
                                alt="Video Thumbnail"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl group-hover:scale-110 transition-transform">
                                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* Video Player - Iframe for YouTube/Vimeo */}
            {isExternalEmbed && (
                <>
                    {(isPlaying || !posterImage) && (
                        <iframe
                            src={getEmbedUrl(videoUrl)}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    )}
                    {/* Poster / Thumbnail Overlay for YouTube/Vimeo */}
                    {!isPlaying && posterImage && (
                        <div
                            className="absolute inset-0 z-10 cursor-pointer group"
                            onClick={handlePlay}
                            role="button"
                            aria-label="Play video"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === "Enter" && handlePlay()}
                        >
                            <Image
                                src={posterImage}
                                alt="Video Thumbnail"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl group-hover:scale-110 transition-transform">
                                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                                </div>
                            </div>
                        </div>
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

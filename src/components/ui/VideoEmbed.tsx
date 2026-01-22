"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface VideoEmbedProps {
    videoUrl?: string; // Sanity file URL or external embed URL
    posterImage?: string;
    autoPlay?: boolean;
}

export default function VideoEmbed({ videoUrl, posterImage, autoPlay = false }: VideoEmbedProps) {
    const [isPlaying, setIsPlaying] = useState(autoPlay);

    if (!videoUrl) return null;

    // Determine if it's a Sanity-hosted file (direct URL) or an embed URL
    const isSanityVideo = videoUrl.includes("cdn.sanity.io") || videoUrl.endsWith(".mp4") || videoUrl.endsWith(".webm") || videoUrl.endsWith(".mov");

    const handlePlay = () => {
        setIsPlaying(true);
    };

    return (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-2xl border-4 border-slate-800">
            {/* Poster / Thumbnail Overlay */}
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

            {/* Video Player - Native HTML5 for Sanity uploads */}
            {(isPlaying || !posterImage) && isSanityVideo && (
                <video
                    src={videoUrl}
                    className="w-full h-full object-cover"
                    controls
                    autoPlay={isPlaying}
                    playsInline
                />
            )}

            {/* Video Player - Iframe for YouTube/Vimeo */}
            {(isPlaying || !posterImage) && !isSanityVideo && (
                <iframe
                    src={getEmbedUrl(videoUrl)}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
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

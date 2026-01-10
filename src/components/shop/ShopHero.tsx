"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ArrowRight, ChevronDown, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

interface ShopHeroProps {
    title: string;
    subtitle: string;
    videoUrl?: string; // Expecting HLS or MP4
}

export function ShopHero({ title, subtitle, videoUrl }: ShopHeroProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !videoUrl) return;

        if (Hls.isSupported() && videoUrl.includes(".m3u8")) {
            const hls = new Hls({
                enableWorker: true,
                lowLatencyMode: true,
            });
            hls.loadSource(videoUrl);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play().catch(() => { });
            });
            return () => hls.destroy();
        } else {
            video.src = videoUrl;
            video.addEventListener("loadedmetadata", () => {
                video.play().catch(() => { });
            });
        }
    }, [videoUrl]);

    return (
        <section className="relative min-h-[80vh] flex items-center justify-center mb-24 overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full z-0">
                {videoUrl ? (
                    <video
                        ref={videoRef}
                        className="absolute inset-0 w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                ) : (
                    // Fallback background if no video
                    <div className="absolute inset-0 w-full h-full bg-brand-900" />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-900/90 via-brand-900/80 to-brand-900/95"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <RevealOnScroll>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-gold-400 text-[10px] font-semibold uppercase tracking-widest mb-8 font-sans">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>
                        Shop Official Resources
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight mb-6 leading-[1.1] font-heading">
                        {title}
                    </h1>
                    <p className="text-lg sm:text-xl text-white/70 mb-10 leading-relaxed max-w-2xl mx-auto font-sans">
                        {subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="#featured" className="bg-gold-500 text-brand-900 px-10 py-4 rounded-lg text-sm font-bold hover:bg-gold-400 transition-colors shadow-lg shadow-gold-500/30 flex items-center justify-center gap-2 font-sans">
                            View Latest Book <ArrowRight className="w-4 h-4" />
                        </a>
                        <a href="#browse" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-10 py-4 rounded-lg text-sm font-bold hover:bg-white/20 transition-colors flex items-center justify-center gap-2 font-sans">
                            Browse All
                        </a>
                    </div>
                </RevealOnScroll>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
                <ChevronDown className="w-6 h-6 text-white/50" />
            </div>
        </section>
    );
}

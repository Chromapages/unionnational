"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, RotateCcw, ArrowRight } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface BlueprintVideoSectionProps {
    videoSrc: string;
    posterSrc?: string;
}

export function BlueprintVideoSection({ videoSrc, posterSrc }: BlueprintVideoSectionProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [hasEnded, setHasEnded] = useState(false);

    // Autoplay muted when section is in view; pause when out of view.
    useEffect(() => {
        const video = videoRef.current;
        const section = sectionRef.current;
        if (!video || !section) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
                        video.play().catch(() => {
                            // Autoplay blocked by browser — user can click the video to start it.
                        });
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: [0, 0.3, 0.5] }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    const handleMuteToggle = () => {
        const video = videoRef.current;
        if (!video) return;
        video.muted = !video.muted;
        setIsMuted(video.muted);
    };

    const handleReplay = () => {
        const video = videoRef.current;
        if (!video) return;
        video.currentTime = 0;
        video.play().catch(() => {});
        setHasEnded(false);
    };

    const handleScrollToBook = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const target = document.getElementById("book-sales");
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section
            ref={sectionRef}
            className="py-20 lg:py-24 bg-[#0B1210] border-y border-brand-900/40 relative overflow-hidden"
        >
            <div className="absolute inset-0 z-0 bg-[url('/images/pattern-grid.svg')] bg-repeat opacity-[0.02]" />
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/4" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] translate-y-1/3 translate-x-1/3" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <RevealOnScroll>
                    <div className="text-center mb-6">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-gold-400">
                            Watch the 4-Minute Walkthrough
                        </span>
                    </div>
                </RevealOnScroll>

                <RevealOnScroll delay={100}>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight leading-[1.05] mb-6 uppercase text-center">
                        <span className="block text-white">How Jason takes contractors from</span>
                        <span className="block text-gold-500 mt-1">5% to 18% net margin in 18 months.</span>
                    </h2>
                </RevealOnScroll>

                <RevealOnScroll delay={200}>
                    <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light mb-10 max-w-2xl mx-auto text-center">
                        A 4-minute walkthrough of the system Jason has used with hundreds of contractors to plug profit leaks and build a company that runs without the owner on every job site.
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={300}>
                    <div className="relative max-w-4xl mx-auto">
                        <div className="relative aspect-video rounded-2xl overflow-hidden ring-1 ring-gold-500/20 shadow-2xl shadow-brand-900/60 bg-black">
                            <video
                                ref={videoRef}
                                src={videoSrc}
                                poster={posterSrc}
                                muted
                                playsInline
                                preload="metadata"
                                onEnded={() => setHasEnded(true)}
                                className="w-full h-full object-cover"
                            />

                            {hasEnded && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <button
                                        type="button"
                                        onClick={handleReplay}
                                        className="w-16 h-16 rounded-full bg-gold-500 hover:bg-gold-600 text-white flex items-center justify-center transition-colors shadow-xl"
                                        aria-label="Replay video"
                                    >
                                        <RotateCcw size={24} />
                                    </button>
                                </div>
                            )}

                            <div className="absolute bottom-4 right-4 flex items-center gap-2">
                                {isMuted && (
                                    <span className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm text-white text-xs font-semibold">
                                        Click to unmute
                                    </span>
                                )}
                                <button
                                    type="button"
                                    onClick={handleMuteToggle}
                                    className="w-11 h-11 rounded-full bg-black/70 backdrop-blur-sm hover:bg-black/90 border border-white/20 flex items-center justify-center text-white transition-colors"
                                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                                >
                                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>

                <RevealOnScroll delay={400}>
                    <div className="mt-10 text-center">
                        <a
                            href="#book-sales"
                            onClick={handleScrollToBook}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-600 text-white font-bold uppercase tracking-wider text-sm rounded-full transition-colors shadow-lg shadow-gold-500/20"
                        >
                            Get the Blueprint
                            <ArrowRight size={18} />
                        </a>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}

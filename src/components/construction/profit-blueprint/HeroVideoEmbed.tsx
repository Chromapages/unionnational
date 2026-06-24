"use client";

import { useRef } from "react";
import { Play } from "lucide-react";
import { trackMetaEvent } from "@/components/seo/MetaPixel";

interface HeroVideoEmbedProps {
    videoSrc: string;
    posterSrc?: string;
}

const FALLBACK_POSTER = "/images/og-construction.png";

export default function HeroVideoEmbed({ videoSrc, posterSrc }: HeroVideoEmbedProps) {
    const milestones = useRef({ p25: false, p50: false, p75: false, p100: false });

    const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        const video = e.currentTarget;
        if (!video.duration) return;

        const percent = (video.currentTime / video.duration) * 100;
        let milestoneTriggered: number | null = null;

        if (percent >= 25 && !milestones.current.p25) {
            milestones.current.p25 = true;
            milestoneTriggered = 25;
        } else if (percent >= 50 && !milestones.current.p50) {
            milestones.current.p50 = true;
            milestoneTriggered = 50;
        } else if (percent >= 75 && !milestones.current.p75) {
            milestones.current.p75 = true;
            milestoneTriggered = 75;
        } else if (percent >= 99 && !milestones.current.p100) {
            // Using 99% to handle loop wrap arounds gracefully
            milestones.current.p100 = true;
            milestoneTriggered = 100;
        }

        if (milestoneTriggered !== null) {
            trackMetaEvent("CustomVideoProgress", {
                percent: milestoneTriggered,
                video_name: "Construction Profit Blueprint VSL",
            });
        }
    };

    const handlePlay = () => {
        trackMetaEvent("VideoPlay", {
            video_name: "Construction Profit Blueprint VSL",
        });
    };

    return (
        <div className="relative w-full">
            <div className="relative w-full overflow-hidden rounded-2xl ring-1 ring-gold-400/30 shadow-2xl shadow-brand-900/60 bg-black" style={{ aspectRatio: "16 / 9" }}>
                <video
                    src={videoSrc}
                    poster={posterSrc || FALLBACK_POSTER}
                    muted
                    autoPlay
                    loop
                    controls
                    playsInline
                    preload="metadata"
                    onTimeUpdate={handleTimeUpdate}
                    onPlay={handlePlay}
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <img
                        src={posterSrc || FALLBACK_POSTER}
                        alt="Watch Jason explain the blueprint system"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </video>
            </div>

            <p className="mt-3 text-center text-slate-400 text-xs sm:text-sm font-medium">
                <Play className="w-3 h-3 inline-block mr-1.5 -mt-0.5 fill-current" />
                Watch Jason explain the system in 30 seconds
            </p>
        </div>
    );
}

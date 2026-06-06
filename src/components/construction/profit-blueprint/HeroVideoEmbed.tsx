import { Play } from "lucide-react";

interface HeroVideoEmbedProps {
    videoSrc: string;
    posterSrc?: string;
}

const FALLBACK_POSTER = "/images/og-construction.png";

export default function HeroVideoEmbed({ videoSrc, posterSrc }: HeroVideoEmbedProps) {
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
                Watch Jason explain the system in 4 minutes
            </p>
        </div>
    );
}

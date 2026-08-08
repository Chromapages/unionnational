type StrategyVideoSectionProps = {
    videoUrl: string;
    posterUrl?: string;
    posterAlt?: string;
    eyebrow?: string;
    heading: string;
    description?: string;
    captionsUrl?: string;
    caption?: string;
};

/**
 * Renders only a media-pipeline URL. Direct Sanity uploads are intentionally
 * excluded so an oversized source file can never become page weight by mistake.
 */
export function StrategyVideoSection({
    videoUrl,
    posterUrl,
    posterAlt,
    eyebrow,
    heading,
    description,
    captionsUrl,
    caption,
}: StrategyVideoSectionProps) {
    const videoType = /\.webm(?:$|\?)/i.test(videoUrl) ? "video/webm" : "video/mp4";
    const descriptionId = description ? "strategy-video-description" : undefined;
    const captionId = caption ? "strategy-video-caption" : undefined;
    const describedBy = [descriptionId, captionId].filter(Boolean).join(" ") || undefined;

    return (
        <section aria-labelledby="strategy-video-heading" className="bg-zinc-50 py-12 md:py-16">
            <div className="mx-auto max-w-5xl px-5 md:px-6">
                <div className="mx-auto max-w-3xl text-center">
                    {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-700">{eyebrow}</p>}
                    <h2 id="strategy-video-heading" className="mt-3 font-heading text-3xl font-bold tracking-tight text-brand-900 md:text-4xl">{heading}</h2>
                    {description && <p id={descriptionId} className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg">{description}</p>}
                </div>
                <figure className="mt-8">
                    <video
                        controls
                        preload="metadata"
                        poster={posterUrl}
                        aria-label={posterAlt || heading}
                        aria-describedby={describedBy}
                        className="aspect-video w-full rounded-2xl border border-zinc-200 bg-brand-950 shadow-lg"
                    >
                        <source src={videoUrl} type={videoType} />
                        {captionsUrl && <track kind="captions" src={captionsUrl} srcLang="en" label="English" default />}
                        Your browser does not support embedded video.
                    </video>
                    {caption && <figcaption id={captionId} className="mx-auto mt-3 max-w-3xl text-center text-sm leading-relaxed text-zinc-500">{caption}</figcaption>}
                </figure>
            </div>
        </section>
    );
}

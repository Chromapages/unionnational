"use client";

import { Linkedin, Play } from "lucide-react";

interface FounderSectionProps {
    videoUrl?: string;
}

export function FounderSection({ videoUrl }: FounderSectionProps) {
    return (
        <section className="relative overflow-hidden py-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,_rgba(13,46,43,0.08),_transparent_55%)]" />
            <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="relative order-2 flex flex-col justify-center lg:order-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">Founder</p>
                    <h2 className="mt-4 text-3xl font-semibold text-brand-900 font-heading">
                        Jason Astwood, EA, FSCP
                    </h2>
                    <p className="mt-4 text-base text-slate-600">
                        "The tax code wasn’t written to punish you. It was written to incentivize you." Jason combines two decades of experience with a
                        strategy-first mindset to help founders keep more of what they earn.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-300">
                        <span className="rounded-full border border-slate-200 bg-white px-4 py-2">EA Licensed</span>
                        <span className="rounded-full border border-slate-200 bg-white px-4 py-2">MBA</span>
                        <span className="rounded-full border border-slate-200 bg-white px-4 py-2">FSCP</span>
                    </div>
                    <div className="mt-8 flex items-center gap-4">
                        {videoUrl && (
                            <a
                                href={videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 rounded-full border border-brand-900/15 bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand-900 transition hover:border-gold-500/60 hover:text-gold-600"
                            >
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-900 text-gold-400">
                                    <Play className="h-4 w-4" />
                                </span>
                                Watch Founder Intro
                            </a>
                        )}
                        <a
                            href="#"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-brand-900/60 transition hover:border-[#0077b5] hover:text-[#0077b5]"
                        >
                            <Linkedin className="h-4 w-4" />
                        </a>
                    </div>
                </div>

                <div className="relative order-1 lg:order-2">
                    <div className="relative overflow-hidden rounded-[32px]">
                        <img
                            src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/N5KQjySifAxlxhrrvY8g/media/65cc3ecf190e877c7eed693d.png"
                            alt="Jason Astwood"
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/70 via-brand-900/10 to-transparent" />
                    </div>
                    <div className="absolute -bottom-10 left-10 max-w-sm rounded-3xl border border-white/40 bg-white/80 p-6 text-sm text-brand-900 shadow-xl backdrop-blur-lg">
                        <p className="font-semibold">"Planning isn’t a once-a-year event. It’s a partnership that compounds over time."</p>
                        <p className="mt-3 text-xs uppercase tracking-[0.2em] text-brand-300">Director & Chief Strategist</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

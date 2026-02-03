"use client";

import { Linkedin, Play } from "lucide-react";
import { useTranslations } from "next-intl";

interface FounderSectionProps {
    videoUrl?: string;
}

export function FounderSection({ videoUrl }: FounderSectionProps) {
    const t = useTranslations('AboutPage.FounderSection');
    return (
        <section className="relative overflow-hidden py-24 bg-brand-900 border-t border-white/5">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-brand-900" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,_rgba(255,255,255,0.02),_transparent_55%)]" />

            <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] items-center">
                <div className="relative order-2 flex flex-col justify-center lg:order-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-500">{t('eyebrow')}</p>
                    <h2 className="mt-4 text-3xl font-semibold text-white font-heading">
                        {t('name')}
                    </h2>
                    <p className="mt-6 text-lg text-brand-100/70 leading-relaxed">
                        {t('quote1')}
                        <br /><br />
                        {t('bio')}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-400">
                        <span className="rounded-full border border-gold-500/20 bg-gold-500/10 px-4 py-2">{t('credentials.ea')}</span>
                        <span className="rounded-full border border-gold-500/20 bg-gold-500/10 px-4 py-2">{t('credentials.mba')}</span>
                        <span className="rounded-full border border-gold-500/20 bg-gold-500/10 px-4 py-2">{t('credentials.fscp')}</span>
                    </div>
                    <div className="mt-10 flex items-center gap-4">
                        {videoUrl && (
                            <a
                                href={videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 rounded-xl border border-gold-500 bg-gold-500 px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-brand-950 transition-all hover:bg-gold-400 hover:scale-105 shadow-lg shadow-gold-500/20"
                            >
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-950 text-gold-500">
                                    <Play className="h-3 w-3 fill-current" />
                                </span>
                                {t('watchVideo')}
                            </a>
                        )}
                        <a
                            href="https://www.linkedin.com/in/jasonastwood/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition-all hover:border-[#0077b5] hover:text-[#0077b5] hover:bg-white/10"
                        >
                            <Linkedin className="h-5 w-5" />
                        </a>
                    </div>
                </div>

                <div className="relative order-1 lg:order-2">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] border border-white/10 shadow-2xl bg-brand-950">
                        {/* Placeholder or Real Image - Using the provided one but with better object-position if needed */}
                        <img
                            src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/N5KQjySifAxlxhrrvY8g/media/65cc3ecf190e877c7eed693d.png"
                            alt={t('imageAlt')}
                            className="h-full w-full object-cover grayscale-[20%] transition-all duration-700 hover:grayscale-0 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-transparent to-transparent" />

                        <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                            <p className="font-medium italic text-white/90 text-sm leading-relaxed">{t('quote2')}</p>
                            <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500">{t('role')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

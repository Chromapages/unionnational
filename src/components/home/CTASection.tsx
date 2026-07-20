"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { urlFor } from "@/sanity/lib/image";
import { Phone, Calendar, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getBookingHref } from "@/lib/booking";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface CTASectionProps {
    data?: {
        ctaTitle?: string;
        ctaSubtitle?: string;
        ctaButtonText?: string;
        ctaButtonUrl?: string;
        ctaBackgroundImage?: {
            asset?: unknown;
            alt?: string;
        };
    };
    variant?: "default" | "homepageWireframe";
}

export function CTASection({ data, variant = "default" }: CTASectionProps) {
    const t = useTranslations("HomePage.CTASection");
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);
    const backgroundImageUrl = data?.ctaBackgroundImage?.asset
        ? urlFor(data.ctaBackgroundImage).width(2000).height(1200).url()
        : "/images/ctasection.jpg";
    const backgroundImageAlt = data?.ctaBackgroundImage?.alt || "Office Background";

    // Fallbacks with translations
    const title = data?.ctaTitle || t("fallbackTitle");
    const subtitle = data?.ctaSubtitle || t("fallbackSubtitle");
    const buttonText = data?.ctaButtonText || t("fallbackButtonText");
    const buttonUrl = getBookingHref(data?.ctaButtonUrl);

    // ─── HOMEPAGE WIREFRAME VARIANT ─────────────────────────────────────────────
    // Clean, editorial, premium: solid brand-900 field, two-column grid,
    // restrained gold accent, one dominant CTA. No gradient stacks, no decorative
    // overlays, no image backgrounds.
    if (variant === "homepageWireframe") {
        return (
            <section
                id="contact"
                aria-labelledby="cta-heading"
                className="relative bg-black py-20 lg:py-20"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <RevealOnScroll>

                        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-12 items-center">

                            {/* Left column — text content */}
                            <div className="flex flex-col items-start text-left">
                                {/* Gold rule + credential badge */}
                                <div className="flex flex-col gap-3 mb-6">
                                    <div className="h-px w-12 bg-gold-500" aria-hidden="true" />
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500 font-sans">
                                        {t("badge", { year: currentYear })}
                                    </p>
                                </div>

                                {/* Heading */}
                                <h2
                                    id="cta-heading"
                                    className="text-4xl md:text-5xl font-bold text-white leading-[1.1] font-heading tracking-tight"
                                >
                                    {title}
                                </h2>

                                {/* Supporting copy */}
                                <p className="mt-5 text-lg text-slate-400 leading-relaxed font-sans max-w-lg">
                                    {subtitle}
                                </p>
                            </div>

                            {/* Right column — CTA aligned to top */}
                            <div className="flex flex-col items-start lg:items-start gap-3">
                                <Link
                                    href={buttonUrl}
                                    className="inline-flex min-h-[56px] items-center justify-center gap-3 rounded-full bg-gold-500 px-10 py-4 text-brand-950 font-bold font-heading text-base tracking-wide transition-all duration-200 hover:bg-gold-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
                                >
                                    <Calendar className="h-5 w-5 shrink-0" aria-hidden="true" />
                                    <span>{buttonText}</span>
                                </Link>

                                {/* Trust microcopy */}
                                <p className="text-sm text-slate-500 font-sans leading-relaxed">
                                    {t("consultationNote")}
                                </p>
                            </div>

                        </div>

                    </RevealOnScroll>
                </div>
            </section>
        );
    }

    // ─── DEFAULT VARIANT ─────────────────────────────────────────────────────────
    return (
        <section id="contact" className="relative py-16 lg:py-24 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <RevealOnScroll>
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-950 border border-white/5 shadow-2xl group">
                        {/* Background — solid gradient, no image */}
                        <div className="absolute inset-0 z-0">
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-950/90 to-brand-900/80"></div>

                            {/* Decorative Glow */}
                            <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px]"></div>
                            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-500/10 rounded-full blur-[100px]"></div>
                        </div>

                        <div className="relative z-10 px-8 py-12 lg:px-16 lg:py-16">
                            <div className="grid lg:grid-cols-12 gap-12 items-center">
                                {/* Text Content */}
                                <div className="lg:col-span-7 flex flex-col items-start text-left">
                                    {/* Gold badge with pulse dot */}
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-400/20 text-gold-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse"></span>
                                        {t("badge", { year: currentYear })}
                                    </div>

                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4 font-heading leading-[1.15]">
                                        {title}
                                    </h2>

                                    <p className="text-lg text-slate-300 leading-relaxed font-sans max-w-xl">
                                        {subtitle}
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="lg:col-span-5 flex flex-col items-center justify-end gap-4">
                                    <Link
                                        href={buttonUrl}
                                        className="w-full max-w-[320px] bg-gold-500 text-brand-950 px-8 py-4 rounded-xl text-lg font-bold hover:bg-gold-400 transition-all duration-300 shadow-[0_10px_20px_rgba(212,175,55,0.15)] hover:shadow-[0_15px_30px_rgba(212,175,55,0.25)] hover:-translate-y-0.5 text-center font-heading tracking-wide flex items-center justify-center gap-2 group/btn"
                                    >
                                        <Calendar className="w-5 h-5" />
                                        <span>{buttonText}</span>
                                        <ArrowRight className="w-5 h-5 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                                    </Link>

                                    <p className="text-sm text-slate-400 text-center">
                                        {t("strategySessionNote")}
                                    </p>
                                </div>
                            </div>

                            {/* Footer Text */}
                            <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <p className="text-sm text-slate-400 font-sans">
                                    {t("footerText")}
                                </p>
                                <div className="flex items-center gap-6">
                                    <div className="h-px w-8 bg-gold-500/30 hidden sm:block"></div>
                                    <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold font-sans">
                                        {t("poweredBy")}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}

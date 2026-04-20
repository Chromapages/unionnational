"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { urlFor } from "@/sanity/lib/image";
import { Phone, Calendar, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";

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
    const backgroundImageUrl = data?.ctaBackgroundImage?.asset
        ? urlFor(data.ctaBackgroundImage).width(2000).height(1200).url()
        : "/images/ctasection.jpg";
    const backgroundImageAlt = data?.ctaBackgroundImage?.alt || "Office Background";

    const currentYear = new Date().getFullYear();

    // Fallbacks with translations
    const title = data?.ctaTitle || t("fallbackTitle");
    const subtitle = data?.ctaSubtitle || t("fallbackSubtitle");
    const buttonText = data?.ctaButtonText || t("fallbackButtonText");
    const buttonUrl = data?.ctaButtonUrl || "/book";

    if (variant === "homepageWireframe") {
        return (
            <section id="contact" className="relative bg-surface py-12 lg:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <RevealOnScroll>
                        <div className="relative overflow-hidden rounded-[2rem] border-[3px] border-brand-900 bg-white shadow-soft sm:rounded-[2.25rem]">
                            <div className="absolute inset-0">
                                <Image
                                    src={backgroundImageUrl}
                                    alt={backgroundImageAlt}
                                    fill
                                    className="object-cover opacity-[0.42]"
                                />
                                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,5,4,0.34)_0%,rgba(1,5,4,0.24)_42%,rgba(1,5,4,0.14)_70%,rgba(1,5,4,0.18)_100%)]"></div>
                                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,5,4,0.14)_0%,rgba(1,5,4,0.04)_45%,rgba(1,5,4,0.1)_100%)]"></div>
                                <div className="absolute inset-y-0 right-0 w-[44%] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06),transparent_68%)]"></div>
                                <div className="absolute inset-0 bg-white/68"></div>
                            </div>

                            <div className="relative px-6 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-9">
                                <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px] lg:grid-rows-[auto_1fr_auto] lg:gap-x-10 lg:gap-y-0 xl:grid-cols-[minmax(0,1fr)_260px] xl:gap-x-14">
                                    <div className="lg:col-start-1 lg:row-start-1">
                                        <div className="inline-flex min-h-11 min-w-[180px] items-center justify-center rounded-full bg-gold-500 px-5 py-2 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-brand-950 sm:min-w-[238px]">
                                            {t("badge", { year: currentYear })}
                                        </div>
                                    </div>

                                    <div className="lg:col-start-1 lg:row-start-2 lg:pt-8">
                                        <h2 className="max-w-[700px] text-3xl font-bold leading-[0.98] tracking-tighter text-brand-900 sm:text-4xl lg:text-[3.5rem]">
                                            {title}
                                        </h2>

                                        <p className="mt-4 max-w-[620px] text-base leading-relaxed text-slate-700 sm:text-lg lg:text-[1.15rem]">
                                            {subtitle}
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-6 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:items-end lg:justify-center">
                                        <Link
                                            href={buttonUrl}
                                            className="inline-flex min-h-[62px] w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-center font-heading text-[15px] font-bold text-brand-950 transition-all duration-300 hover:bg-gold-400 hover:-translate-y-0.5 lg:w-[242px] xl:w-[258px]"
                                        >
                                            <Calendar className="h-4.5 w-4.5" />
                                            <span>{buttonText}</span>
                                        </Link>

                                        <Link
                                            href="/contact?type=expert"
                                            className="inline-flex min-h-[62px] w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-center font-heading text-[15px] font-bold text-brand-950 transition-all duration-300 hover:bg-gold-400 hover:-translate-y-0.5 lg:w-[242px] xl:w-[258px]"
                                        >
                                            <Phone className="h-4.5 w-4.5" />
                                            <span>{t("secondaryButton")}</span>
                                        </Link>
                                    </div>

                                    <div className="border-t border-brand-900/30 pt-5 lg:col-span-2 lg:row-start-3 lg:mt-10">
                                        <div className="flex flex-col gap-3 text-sm text-slate-700 sm:flex-row sm:items-center sm:justify-between sm:gap-6 lg:text-base">
                                            <p className="font-medium text-slate-700">
                                                {t("footerText")}
                                            </p>

                                            <p className="flex items-center gap-3 text-slate-600 sm:justify-end">
                                                <span aria-hidden="true" className="h-px w-6 bg-brand-900/40"></span>
                                                <span className="font-medium">Strategic guidance. Clear next steps.</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>
        );
    }

    return (
        <section id="contact" className="relative py-12 lg:py-20 bg-surface">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <RevealOnScroll>
                    <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-950 border border-white/5 shadow-2xl group">
                        {/* Subtle Background Accent */}
                        <div className="absolute inset-0 z-0">
                            <Image
                                src={backgroundImageUrl}
                                alt={backgroundImageAlt}
                                fill
                                className="object-cover opacity-20 group-hover:opacity-25 transition-opacity duration-700 grayscale"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-950/90 to-brand-900/80"></div>
                            
                            {/* Decorative Glow */}
                            <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px]"></div>
                            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-500/10 rounded-full blur-[100px]"></div>
                        </div>

                        <div className="relative z-10 px-8 py-12 lg:px-16 lg:py-16">
                            <div className="grid lg:grid-cols-12 gap-12 items-center">
                                {/* Text Content */}
                                <div className="lg:col-span-7 flex flex-col items-start text-left">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-400/20 text-gold-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse"></span>
                                        {t("badge", { year: currentYear })}
                                    </div>

                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4 font-heading leading-[1.15]">
                                        {title}
                                    </h2>

                                    <p className="text-lg text-slate-300/80 leading-relaxed font-sans max-w-xl">
                                        {subtitle}
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center justify-end gap-4">
                                    <Link
                                        href={buttonUrl}
                                        className="w-full sm:w-auto min-w-[220px] bg-gold-500 text-brand-950 px-6 py-3.5 rounded-xl text-base font-bold hover:bg-gold-400 transition-all duration-300 shadow-[0_10px_20px_rgba(212,175,55,0.15)] hover:shadow-[0_15px_30px_rgba(212,175,55,0.25)] hover:-translate-y-0.5 text-center font-heading tracking-wide flex items-center justify-center gap-2 group/btn"
                                    >
                                        <Calendar className="w-4 h-4" />
                                        <span>{buttonText}</span>
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                                    </Link>

                                    <Link
                                        href="/contact?type=expert"
                                        className="w-full sm:w-auto min-w-[200px] bg-white/5 backdrop-blur-md border border-white/10 text-white px-6 py-3.5 rounded-xl text-base font-bold hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2.5 group/secondary font-heading tracking-wide"
                                    >
                                        <Phone className="w-4 h-4 text-slate-400 group-hover/secondary:text-gold-500 transition-colors" />
                                        <span>{t("secondaryButton")}</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Footer Text */}
                            <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <p className="text-sm text-slate-500 font-sans italic opacity-60">
                                    {t("footerText")}
                                </p>
                                <div className="flex items-center gap-6">
                                    <div className="h-px w-8 bg-gold-500/30 hidden sm:block"></div>
                                    <span className="text-[10px] uppercase tracking-[0.3em] text-slate-600 font-bold font-sans">
                                        Powered by Union National
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

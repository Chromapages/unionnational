"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SwipeableCarousel } from "@/components/ui/SwipeableCarousel";
import { Star, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

interface Testimonial {
    _id?: string;
    clientName?: string;
    clientTitle?: string;
    clientCompany?: string;
    quote?: string;
    rating?: number;
}

interface TestimonialProps {
    testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials = [] }: TestimonialProps) {
    const t = useTranslations("HomePage.TestimonialsSection");

    if (!testimonials || testimonials.length === 0) return null;

    const marqueeTestimonials = [...testimonials, ...testimonials];

    const renderMeta = (testimonial: Testimonial) => (
        <div className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
            {testimonial.clientTitle}
            {testimonial.clientCompany ? ` • ${testimonial.clientCompany}` : ""}
        </div>
    );

    return (
        <section className="relative overflow-hidden bg-slate-50 py-24">
            <div className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/5 blur-[120px]" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/2 translate-y-1/2 rounded-full bg-brand-100/40 blur-[120px]" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <RevealOnScroll className="mb-16 max-w-3xl">
                    <div className="mb-4">
                        <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-gold-600">
                            {t("eyebrow")}
                        </span>
                    </div>
                    <h2 className="font-heading text-3xl font-bold leading-[1.1] tracking-tight text-brand-900 md:text-4xl lg:text-5xl">
                        {t("title")} <br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-gold-500 to-gold-700 bg-clip-text text-transparent">
                            {t("titleHighlight")}
                        </span>
                    </h2>
                </RevealOnScroll>

                <div className="md:hidden">
                    <SwipeableCarousel slideClassName="w-[320px]" gap={16} showArrows={false} dragFree>
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={`mobile-${testimonial._id || "testimonial"}-${index}`}
                                className="group relative flex h-[280px] flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                            >
                                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-brand-900 to-gold-500 opacity-0 transition-opacity group-active:opacity-100" />

                                <div>
                                    <div className="mb-4 flex items-start justify-between">
                                        <div className="flex gap-1 text-gold-500">
                                            {[...Array(testimonial.rating || 5)].map((_, starIndex) => (
                                                <Star key={starIndex} className="h-4 w-4 fill-current" aria-hidden="true" />
                                            ))}
                                        </div>
                                        <ShieldCheck className="h-5 w-5 text-slate-200" aria-hidden="true" />
                                    </div>

                                    <p className="line-clamp-4 text-sm font-medium leading-relaxed text-slate-700">
                                        &ldquo;{testimonial.quote}&rdquo;
                                    </p>
                                </div>

                                <div className="mt-4 border-t border-slate-100 pt-4">
                                    <div className="font-heading text-sm font-bold text-brand-900">
                                        {testimonial.clientName}
                                    </div>
                                    {renderMeta(testimonial)}
                                </div>
                            </div>
                        ))}
                    </SwipeableCarousel>
                </div>

                <div className="mask-gradient-x relative hidden w-full overflow-hidden py-6 md:block">
                    <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-20 bg-gradient-to-r from-slate-50 to-transparent sm:w-32" />
                    <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-20 bg-gradient-to-l from-slate-50 to-transparent sm:w-32" />

                    <div className="hover:pause flex w-max animate-scroll-slow gap-6 sm:gap-8 motion-reduce:animate-none">
                        {marqueeTestimonials.map((testimonial, index) => (
                            <div
                                key={`${testimonial._id || "testimonial"}-${index}`}
                                className="group relative flex h-[320px] w-[350px] shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/30 hover:shadow-xl sm:w-[400px]"
                            >
                                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-brand-900 to-gold-500 opacity-0 transition-opacity group-hover:opacity-100" />

                                <div>
                                    <div className="mb-6 flex items-start justify-between">
                                        <div className="flex gap-1 text-gold-500">
                                            {[...Array(testimonial.rating || 5)].map((_, starIndex) => (
                                                <Star key={starIndex} className="h-4 w-4 fill-current" aria-hidden="true" />
                                            ))}
                                        </div>
                                        <ShieldCheck className="h-5 w-5 text-slate-200 transition-colors group-hover:text-gold-500/50" aria-hidden="true" />
                                    </div>

                                    <p className="relative z-10 line-clamp-4 text-base font-medium leading-relaxed text-slate-700 transition-colors group-hover:text-brand-900">
                                        &ldquo;{testimonial.quote}&rdquo;
                                    </p>
                                </div>

                                <div className="mt-4 border-t border-slate-100 pt-4 transition-colors group-hover:border-gold-500/10">
                                    <div className="font-heading text-sm font-bold text-brand-900">
                                        {testimonial.clientName}
                                    </div>
                                    {renderMeta(testimonial)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

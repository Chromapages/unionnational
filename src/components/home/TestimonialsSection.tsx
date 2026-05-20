"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
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

    // Show only first 3 testimonials
    const displayTestimonials = testimonials.slice(0, 3);

    const renderMeta = (testimonial: Testimonial) => (
        <div className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
            {testimonial.clientTitle}
            {testimonial.clientCompany ? ` • ${testimonial.clientCompany}` : ""}
        </div>
    );

    return (
        <section className="relative overflow-hidden bg-slate-50 py-20 md:py-28">
            {/* Background accents */}
            <div className="absolute top-0 right-0 h-[400px] w-[400px] bg-gold-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-brand-100/40 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Section Header */}
                <RevealOnScroll className="text-center mb-16">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-gold-600 mb-4">
                        {t("eyebrow")}
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-950 font-heading leading-[1.1] mb-4">
                        {t("title")} <br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-gold-500 to-gold-700 bg-clip-text text-transparent">
                            {t("titleHighlight")}
                        </span>
                    </h2>
                </RevealOnScroll>

                {/* Testimonial Cards - 3 columns on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {displayTestimonials.map((testimonial, index) => (
                        <RevealOnScroll key={testimonial._id || index} delay={index * 100}>
                            <div className="group flex flex-col h-full bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:border-gold-500/30 transition-all duration-300">
                                {/* Stars */}
                                <div className="flex gap-1 text-gold-500 mb-6">
                                    {[...Array(testimonial.rating || 5)].map((_, starIndex) => (
                                        <Star key={starIndex} className="h-5 w-5 fill-current" aria-hidden="true" />
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className="text-slate-700 leading-relaxed text-base lg:text-lg flex-grow mb-6">
                                    &ldquo;{testimonial.quote}&rdquo;
                                </p>

                                {/* Attribution */}
                                <div className="pt-4 border-t border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-brand-900 flex items-center justify-center text-gold-500 text-sm font-bold">
                                            {testimonial.clientName?.charAt(0) || "C"}
                                        </div>
                                        <div>
                                            <div className="font-heading text-sm font-bold text-brand-900">
                                                {testimonial.clientName}
                                            </div>
                                            {renderMeta(testimonial)}
                                        </div>
                                    </div>
                                </div>

                                {/* Trust badge */}
                                <div className="mt-4 flex items-center gap-2 text-slate-400 text-xs">
                                    <ShieldCheck size={14} className="text-gold-500/50" aria-hidden="true" />
                                    <span>Verified Client</span>
                                </div>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>

            </div>
        </section>
    );
}
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, CheckCircle2, Star } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

interface VerticalHeroProps {
    title: string;
    description?: string;
    heroImage?: any;
    heroVideo?: string;
    painPoints?: string[];
    stats?: { value: string; label: string }[];
    testimonials?: any[];
    className?: string;
}

interface TestimonialCardProps {
    testimonial: any;
    className?: string;
}

function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
    return (
        <div className={cn("rounded-2xl border border-white/10 bg-white/5 p-6", className)}>
            <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                ))}
            </div>
            <blockquote className="text-sm text-white/80 leading-relaxed mb-4">
                "{testimonial.quote}"
            </blockquote>
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/20 text-gold-300 font-bold">
                    {testimonial.clientName?.charAt(0)}
                </div>
                <div>
                    <p className="text-sm font-medium text-white">{testimonial.clientName}</p>
                    {testimonial.clientCompany && (
                        <p className="text-xs text-white/50">{testimonial.clientCompany}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export function VerticalHero({
    title,
    description,
    heroImage,
    heroVideo,
    painPoints = [],
    stats = [],
    testimonials = [],
    className
}: VerticalHeroProps) {
    return (
        <section className={cn("relative overflow-hidden bg-forest-gradient pt-32 pb-16 text-white", className)}>
            {heroVideo && (
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover opacity-30"
                >
                    <source src={heroVideo} type="video/mp4" />
                </video>
            )}
            
            <div className="absolute inset-0">
                <div className="absolute -top-32 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[140px]" />
                <div className="absolute bottom-0 right-0 h-[260px] w-[260px] translate-x-1/3 translate-y-1/3 rounded-full bg-gold-500/15 blur-[120px]" />
            </div>

            {heroImage && !heroVideo && (
                <div className="absolute inset-0">
                    <Image
                        src={urlFor(heroImage).url()}
                        alt={heroImage.alt || title}
                        fill
                        className="object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/80 to-brand-950/40" />
                </div>
            )}

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                <RevealOnScroll>
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-gold-100">
                            <Building2 className="h-3.5 w-3.5" />
                            Industry Guide
                        </div>
                        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl font-heading">
                            {title}
                        </h1>
                        {description && (
                            <p className="max-w-2xl text-lg text-white/70 font-sans leading-relaxed">
                                {description}
                            </p>
                        )}
                    </div>
                </RevealOnScroll>

                {stats.length > 0 && (
                    <RevealOnScroll>
                        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
                                >
                                    <p className="text-3xl font-bold text-gold-200 font-heading">{stat.value}</p>
                                    <p className="mt-1 text-sm text-white/60">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </RevealOnScroll>
                )}

                {painPoints.length > 0 && (
                    <RevealOnScroll>
                        <div className="mt-12">
                            <h2 className="mb-6 text-xl font-semibold text-white font-heading">Common Challenges</h2>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {painPoints.map((point, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
                                    >
                                        <CheckCircle2 className="h-5 w-5 text-gold-400 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-white/80">{point}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </RevealOnScroll>
                )}

                {testimonials.length > 0 && (
                    <RevealOnScroll>
                        <div className="mt-16">
                            <h2 className="mb-6 text-xl font-semibold text-white font-heading">Client Success Stories</h2>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {testimonials.map((testimonial) => (
                                    <TestimonialCard key={testimonial._id} testimonial={testimonial} />
                                ))}
                            </div>
                        </div>
                    </RevealOnScroll>
                )}
            </div>
        </section>
    );
}

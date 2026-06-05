"use client";

import { useEffect, useRef, useState } from "react";
import { Star, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { urlFor } from "@/sanity/lib/image";

interface TestimonialImage {
    asset?: unknown;
}

interface Testimonial {
    _id?: string;
    clientName?: string;
    clientTitle?: string;
    clientCompany?: string;
    quote?: string;
    rating?: number;
    image?: TestimonialImage;
}

interface TestimonialsCarouselProps {
    testimonials?: Testimonial[];
}

function StarRating({ rating = 5 }: { rating?: number }) {
    const safe = Math.min(5, Math.max(1, rating ?? 5));
    return (
        <div
            className="flex gap-1 text-gold-500"
            role="img"
            aria-label={`${safe} out of 5 stars`}
        >
            {[...Array(safe)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
            ))}
        </div>
    );
}

function TestimonialCard({
    testimonial,
    setMarker,
}: {
    testimonial: Testimonial;
    setMarker?: "a" | "b";
}) {
    const t = useTranslations("HomePage.TestimonialsSection");
    const name = testimonial.clientName || "Anonymous Client";
    const initial = name.charAt(0).toUpperCase();
    const hasImage = Boolean(testimonial.image?.asset);
    const imageUrl = hasImage
        ? urlFor(testimonial.image as Parameters<typeof urlFor>[0]).width(80).height(80).url()
        : null;

    return (
        <article
            data-card-set={setMarker}
            className="testimonial-card flex flex-col h-full p-6 bg-white border border-slate-200 rounded-2xl shadow-sm"
        >
            <StarRating rating={testimonial.rating} />

            <blockquote className="mt-5 text-brand-900 text-base leading-[1.6] flex-grow line-clamp-5">
                &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            <footer className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                <div
                    className="w-10 h-10 rounded-full bg-brand-900 flex items-center justify-center text-gold-500 text-sm font-bold overflow-hidden flex-shrink-0"
                    style={{ backgroundColor: "var(--color-surface-offset)" }}
                >
                    {imageUrl ? (
                        // Plain <img> is intentional: Sanity CDN delivers optimized WebP/AVIF
                        // and we control lazy/async/dimensions explicitly per spec.
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={imageUrl}
                            alt=""
                            width={40}
                            height={40}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span aria-hidden="true">{initial}</span>
                    )}
                </div>
                <div className="min-w-0 flex-1">
                    <div className="font-semibold text-brand-900 text-sm truncate">
                        {name}
                    </div>
                    {(testimonial.clientTitle || testimonial.clientCompany) && (
                        <div className="text-sm text-slate-500 truncate">
                            {testimonial.clientTitle}
                            {testimonial.clientTitle && testimonial.clientCompany ? " • " : ""}
                            {testimonial.clientCompany}
                        </div>
                    )}
                </div>
            </footer>

            <div className="mt-3 flex items-center gap-2 text-slate-400 text-xs">
                <ShieldCheck size={14} className="text-gold-500/50" aria-hidden="true" />
                <span>{t("verifiedClient")}</span>
            </div>
        </article>
    );
}

function MarqueeRow({
    testimonials,
    duration,
    reverse = false,
}: {
    testimonials: Testimonial[];
    duration: number;
    reverse?: boolean;
}) {
    return (
        <div
            className="testimonial-carousel-track"
            aria-hidden="true"
            style={
                {
                    "--marquee-duration": `${duration}s`,
                    animationDirection: reverse ? "reverse" : "normal",
                } as React.CSSProperties
            }
        >
            {/* First identical set */}
            {testimonials.map((testimonial, i) => (
                <TestimonialCard
                    key={`a-${testimonial._id ?? i}`}
                    testimonial={testimonial}
                    setMarker="a"
                />
            ))}
            {/* Duplicate set for seamless infinite loop.
                When the first set has fully scrolled out of view
                (-50% transform = width of the original set), the
                second set sits in the exact starting position. */}
            {testimonials.map((testimonial, i) => (
                <TestimonialCard
                    key={`b-${testimonial._id ?? i}`}
                    testimonial={testimonial}
                    setMarker="b"
                />
            ))}
        </div>
    );
}

function StaticGridFallback({ testimonials }: { testimonials: Testimonial[] }) {
    return (
        <div
            className="grid gap-6"
            style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            }}
        >
            {testimonials.slice(0, 4).map((testimonial, i) => (
                <TestimonialCard
                    key={testimonial._id ?? i}
                    testimonial={testimonial}
                    setMarker="a"
                />
            ))}
        </div>
    );
}

function usePrefersReducedMotion(): boolean {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);

        syncPreference();
        mediaQuery.addEventListener("change", syncPreference);

        return () => mediaQuery.removeEventListener("change", syncPreference);
    }, []);

    return prefersReducedMotion;
}

export function TestimonialsSection({ testimonials = [] }: TestimonialsCarouselProps) {
    const t = useTranslations("HomePage.TestimonialsSection");
    const sectionRef = useRef<HTMLElement>(null);
    const touchTimeoutRef = useRef<number | null>(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    // On low-memory devices, drop will-change after mount to free GPU memory.
    // `performance.memory` is Chromium-only and only available in the browser,
    // so this effect is a no-op during SSR.
    useEffect(() => {
        type PerfMemory = { jsHeapSizeLimit?: number; usedJSHeapSize?: number };
        const perfMem = (performance as Performance & { memory?: PerfMemory }).memory;
        if (!perfMem?.jsHeapSizeLimit || !perfMem?.usedJSHeapSize) return;

        const used = perfMem.usedJSHeapSize / perfMem.jsHeapSizeLimit;
        if (used > 0.7) {
            document
                .querySelectorAll<HTMLElement>(".testimonial-carousel-track")
                .forEach((el) => {
                    el.style.willChange = "auto";
                });
        }
    }, []);

    // Measure natural card heights and publish the average to
    // --testimonial-card-height so every card (including the duplicated
    // marquee set and the static-grid fallback) renders at the same height.
    useEffect(() => {
        const measure = () => {
            // Only count the first occurrence of each card (set "a") across
            // all rows so the duplicate set "b" doesn't double the weight.
            const cards = document.querySelectorAll<HTMLElement>(
                '.testimonial-card[data-card-set="a"]'
            );
            if (cards.length === 0) return;

            let sum = 0;
            cards.forEach((card) => {
                sum += card.offsetHeight;
            });
            const avg = sum / cards.length;
            const rounded = Math.round(avg);

            // Only write if the value actually changed — avoids extra
            // style recalculation cascades on resize.
            const current = document.documentElement.style.getPropertyValue(
                "--testimonial-card-height"
            );
            if (current !== `${rounded}px`) {
                document.documentElement.style.setProperty(
                    "--testimonial-card-height",
                    `${rounded}px`
                );
            }
        };

        // Measure after the first paint and again after web fonts settle
        // (custom fonts change text wrapping → card heights).
        measure();
        if ("fonts" in document) {
            document.fonts.ready.then(measure);
        }
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [testimonials, prefersReducedMotion]);

    // Touch pause — pause on touchstart, resume 2000ms after touchend
    const handleTouchStart = () => {
        if (touchTimeoutRef.current) {
            window.clearTimeout(touchTimeoutRef.current);
            touchTimeoutRef.current = null;
        }
        sectionRef.current?.classList.add("is-touching");
    };
    const handleTouchEnd = () => {
        if (touchTimeoutRef.current) window.clearTimeout(touchTimeoutRef.current);
        touchTimeoutRef.current = window.setTimeout(() => {
            sectionRef.current?.classList.remove("is-touching");
            touchTimeoutRef.current = null;
        }, 2000);
    };

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (touchTimeoutRef.current) window.clearTimeout(touchTimeoutRef.current);
        };
    }, []);

    if (!testimonials || testimonials.length === 0) return null;

    // Animation duration scales with card count: 6s per card, clamped 30-50s
    const baseDuration = Math.min(50, Math.max(30, 6 * testimonials.length));

    // Two-row staggered layout at 8+ testimonials for richer visual rhythm
    const useTwoRows = testimonials.length >= 8;
    const splitIndex = useTwoRows ? Math.ceil(testimonials.length / 2) : testimonials.length;
    const firstRow = testimonials.slice(0, splitIndex);
    const secondRow = useTwoRows ? testimonials.slice(splitIndex) : [];

    // Headings
    const headerBlock = (
        <header className="relative z-10 max-w-[var(--content-narrow)] mx-auto text-center mb-10 px-4 sm:px-6 lg:px-8">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-gold-600 mb-4">
                {t("eyebrow")}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-950 font-heading leading-[1.1] mb-4">
                {t("title")}{" "}
                <span className="bg-gradient-to-r from-gold-500 to-gold-700 bg-clip-text text-transparent">
                    {t("titleHighlight")}
                </span>
            </h2>
            {t.has("subtitle") && (
                <p className="mt-3 text-base text-slate-500">{t("subtitle")}</p>
            )}
        </header>
    );

    // Reduced-motion fallback: static grid, no animation
    if (prefersReducedMotion) {
        return (
            <section
                ref={sectionRef}
                aria-label="Customer testimonials"
                className="relative overflow-hidden bg-slate-50 py-12 md:py-16 lg:py-24"
            >
                {/* Background accents */}
                <div className="absolute top-0 right-0 h-[400px] w-[400px] bg-gold-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-brand-100/40 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="max-w-7xl mx-auto">
                    {headerBlock}
                    <div className="px-4 sm:px-6 lg:px-8">
                        <StaticGridFallback testimonials={testimonials} />
                    </div>
                </div>

                {/* sr-only static list for screen readers */}
                <SrOnlyTestimonialsList testimonials={testimonials} />
            </section>
        );
    }

    return (
        <section
            ref={sectionRef}
            aria-label="Customer testimonials"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="testimonial-carousel-section relative overflow-hidden bg-slate-50 py-12 md:py-16 lg:py-24"
        >
            {/* Background accents (pointer-events-none so they don't block hover/touch) */}
            <div className="absolute top-0 right-0 h-[400px] w-[400px] bg-gold-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-brand-100/40 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            {headerBlock}

            {/* Carousel rows */}
            <div className="space-y-4">
                <div className="testimonial-carousel-viewport">
                    <MarqueeRow testimonials={firstRow} duration={baseDuration} />
                </div>
                {useTwoRows && (
                    <div className="testimonial-carousel-viewport">
                        <MarqueeRow
                            testimonials={secondRow}
                            duration={baseDuration}
                            reverse
                        />
                    </div>
                )}
            </div>

            {/* sr-only static list — full content available to assistive tech */}
            <SrOnlyTestimonialsList testimonials={testimonials} />
        </section>
    );
}

function SrOnlyTestimonialsList({ testimonials }: { testimonials: Testimonial[] }) {
    return (
        <ul className="sr-only" aria-label="All customer testimonials">
            {testimonials.map((testimonial, i) => (
                <li key={testimonial._id ?? i}>
                    <blockquote>
                        <p>{testimonial.quote}</p>
                        <cite>
                            {testimonial.clientName}
                            {testimonial.clientTitle ? `, ${testimonial.clientTitle}` : ""}
                            {testimonial.clientCompany ? `, ${testimonial.clientCompany}` : ""}
                        </cite>
                    </blockquote>
                </li>
            ))}
        </ul>
    );
}

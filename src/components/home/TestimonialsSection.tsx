"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Star, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { urlFor } from "@/sanity/lib/image";
import { TestimonialModal } from "@/components/ui/TestimonialModal";

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
    isDuplicate = false,
    onOpen,
}: {
    testimonial: Testimonial;
    setMarker?: "a" | "b";
    isDuplicate?: boolean;
    onOpen: (t: Testimonial) => void;
}) {
    const t = useTranslations("HomePage.TestimonialsSection");
    const name = testimonial.clientName || "Anonymous Client";
    const initial = name.charAt(0).toUpperCase();
    const hasImage = Boolean(testimonial.image?.asset);
    const quote = testimonial.quote || "";

    const imageUrl = hasImage
        ? urlFor(testimonial.image as Parameters<typeof urlFor>[0]).width(80).height(80).url()
        : null;

    return (
        <article
            data-card-set={setMarker}
            aria-hidden={isDuplicate || undefined}
            className="testimonial-card flex flex-col p-6 bg-white border border-slate-200 rounded-2xl shadow-sm"
        >
            <StarRating rating={testimonial.rating} />

            <blockquote className="mt-5 text-brand-900 text-base leading-[1.6] line-clamp-4">
                &ldquo;{quote}&rdquo;
            </blockquote>

            {quote && (
                <button
                    type="button"
                    onClick={() => onOpen(testimonial)}
                    tabIndex={isDuplicate ? -1 : undefined}
                    className="mt-3 w-fit rounded text-left text-sm font-medium text-gold-700 transition-colors duration-200 hover:text-gold-800 focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-2"
                    aria-label={`Read full story from ${name}`}
                >
                    {t("readFullStory")}
                </button>
            )}

            <footer className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3">
                {/* Author photo / company logo slot */}
                <div
                    className="w-10 h-10 rounded-full bg-brand-900 flex items-center justify-center text-gold-500 text-sm font-bold overflow-hidden flex-shrink-0"
                    style={{ backgroundColor: "var(--color-surface-offset)" }}
                >
                    {imageUrl ? (
                        // Plain <img> is intentional: Sanity CDN delivers optimized WebP/AVIF
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
                        /* Placeholder: shows initials with brand gradient */
                        <span aria-hidden="true" className="text-xs font-bold">{initial}</span>
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

// ─── Testimonial reordering ───────────────────────────────────────────────────
// Priority order: dollar-amount saves → contractor/construction language → generic
const RELEVANCE_PATTERNS = [
    /\$[\d,]+/,           // dollar amounts
    /contractor|construction|real estate/i,
    /saved|savings|reduced tax/i,
];

function getRelevanceScore(t: Testimonial): number {
    const text = `${t.quote || ""} ${t.clientName || ""} ${t.clientCompany || ""} ${t.clientTitle || ""}`;
    let score = 0;
    RELEVANCE_PATTERNS.forEach((pattern, i) => {
        if (pattern.test(text)) score = RELEVANCE_PATTERNS.length - i;
    });
    return score;
}

function MarqueeRow({
    testimonials,
    duration,
    reverse = false,
    onOpen,
}: {
    testimonials: Testimonial[];
    duration: number;
    reverse?: boolean;
    onOpen: (t: Testimonial) => void;
}) {
    return (
        <div
            className="testimonial-carousel-track"
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
                    onOpen={onOpen}
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
                    isDuplicate
                    onOpen={onOpen}
                />
            ))}
        </div>
    );
}

function StaticGridFallback({
    testimonials,
    onOpen,
}: {
    testimonials: Testimonial[];
    onOpen: (t: Testimonial) => void;
}) {
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
                    onOpen={onOpen}
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

    const [activeTestimonial, setActiveTestimonial] = useState<Testimonial | null>(null);

    const handleOpenModal = useCallback((testimonial: Testimonial) => {
        setActiveTestimonial(testimonial);
        sectionRef.current?.classList.add("is-modal-open");
    }, []);

    const handleCloseModal = useCallback(() => {
        setActiveTestimonial(null);
        sectionRef.current?.classList.remove("is-modal-open");
    }, []);

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

    if (!testimonials || testimonials.length === 0) {
        return (
            <section aria-label="Customer testimonials" className="relative overflow-hidden bg-slate-50 py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-slate-500">{t("noTestimonials") || "Client testimonials coming soon"}</p>
                </div>
            </section>
        );
    }

    // Reorder: dollar-amount saves → contractor/construction language → generic
    const sortedTestimonials = [...testimonials].sort(
        (a, b) => getRelevanceScore(b) - getRelevanceScore(a)
    );

    // Animation duration scales with card count: 8s per card, clamped 40-60s
    const baseDuration = Math.min(60, Math.max(40, 8 * sortedTestimonials.length));

    // Two-row staggered layout at 8+ testimonials for richer visual rhythm
    const useTwoRows = sortedTestimonials.length >= 8;
    const splitIndex = useTwoRows ? Math.ceil(sortedTestimonials.length / 2) : sortedTestimonials.length;
    const firstRow = sortedTestimonials.slice(0, splitIndex);
    const secondRow = useTwoRows ? sortedTestimonials.slice(splitIndex) : [];

    // Headings
    const headerBlock = (
        <header className="relative z-10 max-w-[var(--content-narrow)] mx-auto text-center mb-10 px-4 sm:px-6 lg:px-8">
            <span className="home-eyebrow mb-4 block text-gold-700">
                {t("eyebrow")}
            </span>
            <h2 className="home-section-heading mb-4 text-brand-950">
                {t("title")}
            </h2>
            {t.has("subtitle") && (
                <p className="home-supporting-copy mt-3 text-slate-600">{t("subtitle")}</p>
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
                <div className="max-w-7xl mx-auto">
                    {headerBlock}
                    <div className="px-4 sm:px-6 lg:px-8">
                        <StaticGridFallback testimonials={sortedTestimonials} onOpen={handleOpenModal} />
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
            {headerBlock}

            {/* Carousel rows */}
            <div className="space-y-4">
                <div className="testimonial-carousel-viewport">
                    <MarqueeRow testimonials={firstRow} duration={baseDuration} onOpen={handleOpenModal} />
                </div>
                {useTwoRows && (
                    <div className="testimonial-carousel-viewport">
                        <MarqueeRow
                            testimonials={secondRow}
                            duration={baseDuration}
                            reverse
                            onOpen={handleOpenModal}
                        />
                    </div>
                )}
            </div>

            {/* sr-only static list — full content available to assistive tech */}
            <SrOnlyTestimonialsList testimonials={sortedTestimonials} />

            {/* Full testimonial modal */}
            {activeTestimonial && (
                <TestimonialModal
                    isOpen={true}
                    onClose={handleCloseModal}
                    testimonial={activeTestimonial as Parameters<typeof TestimonialModal>[0]["testimonial"]}
                />
            )}
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

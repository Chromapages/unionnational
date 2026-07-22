"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface SwipeableCarouselProps {
    children: React.ReactNode[];
    className?: string;
    slideClassName?: string;
    showArrows?: boolean;
    showDots?: boolean;
    loop?: boolean;
    autoplay?: boolean;
    autoplayDelay?: number;
    snapAlign?: "start" | "center" | "end";
    slidesToScroll?: number;
    gap?: number;
    dragFree?: boolean;
    showProgress?: boolean;
    showSwipeHint?: boolean;
    ariaLabel?: string;
    slideLabels?: string[];
    selectedSlideClassName?: string;
    trackClassName?: string;
}

export function SwipeableCarousel({
    children,
    className = "",
    slideClassName = "",
    showArrows = true,
    showDots = true,
    loop = false,
    autoplay = false,
    autoplayDelay = 4000,
    snapAlign = "center",
    slidesToScroll = 1,
    gap = 16,
    dragFree = false,
    showProgress = false,
    showSwipeHint = true,
    ariaLabel = "Carousel",
    slideLabels,
    selectedSlideClassName = "",
    trackClassName = "",
}: SwipeableCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop,
        align: snapAlign,
        slidesToScroll,
        dragFree,
        containScroll: false,
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback(
        (index: number) => {
            if (emblaApi) emblaApi.scrollTo(index);
        },
        [emblaApi]
    );

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        const frameId = requestAnimationFrame(() => {
            setScrollSnaps(emblaApi.scrollSnapList());
            onSelect();
        });
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);

        return () => {
            cancelAnimationFrame(frameId);
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    // Autoplay
    useEffect(() => {
        if (!autoplay || !emblaApi) return;

        const autoplayFn = () => {
            if (emblaApi.canScrollNext()) {
                emblaApi.scrollNext();
            } else if (loop) {
                emblaApi.scrollTo(0);
            }
        };

        const intervalId = setInterval(autoplayFn, autoplayDelay);

        return () => clearInterval(intervalId);
    }, [autoplay, autoplayDelay, emblaApi, loop]);

    if (children.length === 0) return null;

    return (
        <section className={`relative ${className}`} aria-roledescription="carousel" aria-label={ariaLabel}>
            {/* Viewport */}
            <div className="overflow-hidden py-1 -my-1" ref={emblaRef}>
                <div
                    className={`flex touch-pan-y ${trackClassName}`}
                    style={{ gap: `${gap}px` }}
                >
                    {children.map((child, index) => (
                        <div
                            key={index}
                            className={`flex-shrink-0 flex-grow-0 transition-[opacity,transform,box-shadow] duration-200 motion-reduce:transition-none ${slideClassName} ${selectedIndex === index ? selectedSlideClassName : ""}`}
                            aria-roledescription="slide"
                            aria-label={`${index + 1} of ${children.length}${slideLabels?.[index] ? `: ${slideLabels[index]}` : ""}`}
                        >
                            {child}
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Arrows (Desktop) */}
            {showArrows && children.length > 1 && (
                <>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={scrollPrev}
                        disabled={!canScrollPrev && !loop}
                        className={`
                            absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4
                            w-10 h-10 rounded-full
                            bg-white/90 backdrop-blur-sm shadow-lg
                            border border-slate-200
                            flex items-center justify-center
                            text-brand-900 hover:bg-gold-50 hover:border-gold-300
                            transition-all duration-200
                            disabled:opacity-0 disabled:pointer-events-none
                            hidden md:flex
                            z-10
                        `}
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </motion.button>

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={scrollNext}
                        disabled={!canScrollNext && !loop}
                        className={`
                            absolute right-0 top-1/2 -translate-y-1/2 translate-x-4
                            w-10 h-10 rounded-full
                            bg-white/90 backdrop-blur-sm shadow-lg
                            border border-slate-200
                            flex items-center justify-center
                            text-brand-900 hover:bg-gold-50 hover:border-gold-300
                            transition-all duration-200
                            disabled:opacity-0 disabled:pointer-events-none
                            hidden md:flex
                            z-10
                        `}
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </motion.button>
                </>
            )}

            {(showDots || showProgress) && scrollSnaps.length > 1 && (
                <div className="flex justify-center items-center gap-1 mt-6 pb-2">
                    {showProgress && (
                        <p className="mr-2 text-sm font-semibold tabular-nums text-brand-700" aria-live="polite">
                            {selectedIndex + 1} of {scrollSnaps.length}
                        </p>
                    )}
                    {/* Dots Navigation */}
                    {showDots && scrollSnaps.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollTo(index)}
                            className="flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
                            aria-label={`Go to service ${index + 1}${slideLabels?.[index] ? `: ${slideLabels[index]}` : ""}`}
                            aria-current={selectedIndex === index ? "true" : undefined}
                        >
                            <span
                                className={`block rounded-full transition-all duration-300 motion-reduce:transition-none ${selectedIndex === index
                                    ? "h-2 w-6 bg-gold-500"
                                    : "h-2 w-2 bg-slate-300 hover:bg-slate-400"
                                }`}
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Mobile Swipe Hint */}
            {showSwipeHint && <div className="md:hidden flex items-center justify-center mt-2 text-slate-400 text-xs">
                <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    Swipe
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H3" />
                    </svg>
                </span>
            </div>}
        </section>
    );
}

// Mobile-optimized card carousel for services/testimonials
interface CardCarouselProps {
    items: {
        id: string;
        content: React.ReactNode;
    }[];
    cardWidth?: number;
    className?: string;
    showDots?: boolean;
}

export function CardCarousel({
    items,
    cardWidth = 300,
    className = "",
    showDots = true,
}: CardCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: "start",
        slidesToScroll: 1,
        dragFree: true,
        containScroll: "trimSnaps",
    });

    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on("select", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onSelect]);

    return (
        <div className={`relative ${className}`}>
            <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
                <div className="flex gap-4">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex-shrink-0 flex-grow-0"
                            style={{ width: cardWidth }}
                        >
                            {item.content}
                        </div>
                    ))}
                </div>
            </div>

            {showDots && items.length > 1 && (
                <div className="flex justify-center gap-1.5 mt-4">
                    {items.map((_, index) => (
                        <div
                            key={index}
                            className={`
                                h-1 rounded-full transition-all duration-300
                                ${selectedIndex === index
                                    ? "w-4 bg-gold-500"
                                    : "w-1 bg-slate-300"
                                }
                            `}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

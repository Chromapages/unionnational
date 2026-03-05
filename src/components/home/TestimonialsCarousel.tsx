'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TestimonialCard } from './TestimonialCard';

interface TestimonialsCarouselProps {
    testimonials: any[];
}

export const TestimonialsCarousel = ({ testimonials }: TestimonialsCarouselProps) => {
    // Basic setup with loop enabled
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: 'start', slidesToScroll: 1 },
        [Autoplay({ delay: 5000, stopOnInteraction: false })]
    );

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback((index: number) => {
        if (emblaApi) emblaApi.scrollTo(index);
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    return (
        <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden p-4 -m-4" ref={emblaRef}>
                <div className="flex touch-pan-y touch-pinch-zoom backface-visible">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial._id}
                            className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] 2xl:flex-[0_0_25%] pl-4 md:pl-5 lg:pl-6"
                        >
                            <TestimonialCard
                                testimonial={testimonial}
                                index={index}
                                className="h-full"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Arrows - Desktop/Tablet (Outside) */}
            <button
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 lg:-translate-x-12 z-10 w-10 h-10 rounded-full bg-brand-800/80 backdrop-blur-sm border border-brand-700 flex items-center justify-center text-gold-500 shadow-lg hover:bg-brand-700 hover:scale-105 transition-all duration-300 group hidden md:flex"
                onClick={scrollPrev}
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <button
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 lg:translate-x-12 z-10 w-10 h-10 rounded-full bg-brand-800/80 backdrop-blur-sm border border-brand-700 flex items-center justify-center text-gold-500 shadow-lg hover:bg-brand-700 hover:scale-105 transition-all duration-300 group hidden md:flex"
                onClick={scrollNext}
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Navigation Arrows - Mobile (Overlaid) */}
            <div className="flex md:hidden justify-between absolute top-1/2 -translate-y-1/2 left-4 right-4 z-10 pointer-events-none">
                <button
                    className="w-10 h-10 rounded-full bg-brand-800/80 backdrop-blur-sm border border-brand-700 flex items-center justify-center text-gold-500 shadow-lg pointer-events-auto active:scale-95 transition-transform"
                    onClick={scrollPrev}
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    className="w-10 h-10 rounded-full bg-brand-800/80 backdrop-blur-sm border border-brand-700 flex items-center justify-center text-gold-500 shadow-lg pointer-events-auto active:scale-95 transition-transform"
                    onClick={scrollNext}
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center flex-wrap gap-2 mt-10">
                {scrollSnaps.map((_, index) => (
                    <button
                        key={index}
                        className={`transition-all duration-300 rounded-full ${index === selectedIndex
                            ? 'w-3 h-3 bg-gold-500 shadow-[0_0_10px_rgba(212,175,55,0.5)]'
                            : 'w-2 h-2 bg-brand-700 hover:bg-brand-600'
                            }`}
                        onClick={() => scrollTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

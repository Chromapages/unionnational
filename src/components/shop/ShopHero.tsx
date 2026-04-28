"use client";

import { useTranslations } from "next-intl";
import { ShieldCheck, Zap, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { trackMetaEvent } from "@/components/seo/MetaPixel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { clsx } from "clsx";

interface HeroSlide {
    imageUrl: string;
    alt?: string;
}

interface ShopHeroProps {
    title: string;
    subtitle: string;
    slides?: HeroSlide[];
}

const fallbackSlides = [
    {
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
        alt: "Financial Desk",
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
        alt: "Modern Workspace",
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1664575602276-acd073f104c1?q=80&w=2070&auto=format&fit=crop",
        alt: "Team Planning",
    }
];

export function ShopHero({ title, subtitle, slides = [] }: ShopHeroProps) {
    const t = useTranslations("Shop.Hero");
    const displaySlides = (slides && slides.length > 0) ? slides : fallbackSlides;
    
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 }, [Autoplay({ delay: 5000, stopOnInteraction: true })]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback((emblaApi: any) => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect(emblaApi);
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
    }, [emblaApi, onSelect]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

    return (
        <section className="relative py-16 sm:py-24 overflow-hidden border-b border-slate-800">
            {/* Carousel Background */}
            <div className="absolute inset-0 z-0" ref={emblaRef}>
                <div className="flex h-full touch-pan-y">
                    {displaySlides.map((slide, index) => (
                        <div key={index} className="relative flex-[0_0_100%] min-w-0 h-full">
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                style={{ backgroundImage: `url(${slide.imageUrl})` }}
                                role="img"
                                aria-label={slide.alt || "Shop Hero Background"}
                            />
                            {/* Unified Dark Overlays */}
                            <div className="absolute inset-0 bg-brand-950/90" />
                            <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-transparent to-transparent z-1" />
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Carousel Arrows */}
            <div className="absolute inset-y-0 left-4 sm:left-8 flex items-center z-20 pointer-events-none">
                <button
                    onClick={scrollPrev}
                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/20 text-white/70 hover:bg-black/40 hover:text-white backdrop-blur-md border border-white/10 transition-all pointer-events-auto"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
            </div>
            <div className="absolute inset-y-0 right-4 sm:right-8 flex items-center z-20 pointer-events-none">
                <button
                    onClick={scrollNext}
                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/20 text-white/70 hover:bg-black/40 hover:text-white backdrop-blur-md border border-white/10 transition-all pointer-events-auto"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
            </div>

            {/* Content */}
            <div className="relative max-w-7xl mx-auto px-6 sm:px-16 text-left z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gold-400 text-[10px] font-bold uppercase tracking-widest mb-4 shadow-sm">
                    {t("resourceCenter")}
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4 font-heading drop-shadow-lg max-w-4xl">
                    {title}
                </h1>

                <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mb-8 font-sans drop-shadow">
                    {subtitle}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-start gap-4 mb-12">
                    <a
                        href="#browse"
                        onClick={() => trackMetaEvent("NavigateToShop", { section: "hero_cta" })}
                        className="group relative flex items-center gap-2 rounded-full bg-gold-500 px-8 py-4 text-sm font-bold uppercase tracking-widest text-brand-950 shadow-xl shadow-gold-500/20 transition-all hover:bg-gold-400 hover:shadow-gold-500/40"
                    >
                        {t("browseResources")}
                        <Zap className="w-4 h-4 transition-transform group-hover:scale-110" />
                    </a>
                </div>

                {/* Trust Badges - Minimal Row */}
                <div className="flex flex-wrap items-center justify-start gap-6 sm:gap-10 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-300">
                    <div className="flex items-center gap-2">
                        <div className="bg-green-500/20 backdrop-blur-sm border border-green-500/30 p-1 rounded-full">
                            <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                        </div>
                        {t("secureCheckout")}
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="bg-gold-500/20 backdrop-blur-sm border border-gold-500/30 p-1 rounded-full">
                            <Zap className="w-3.5 h-3.5 text-gold-400" />
                        </div>
                        {t("instantAccess")}
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 p-1 rounded-full">
                            <Award className="w-3.5 h-3.5 text-blue-400" />
                        </div>
                        {t("expertVerified")}
                    </div>
                </div>
            </div>

            {/* Carousel Dots */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-start px-6 sm:px-16 gap-2 z-20">
                {displaySlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={clsx(
                            "w-2 h-2 rounded-full transition-all duration-300",
                            index === selectedIndex
                                ? "bg-gold-500 w-6"
                                : "bg-white/40 hover:bg-white/60"
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}

"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";

const chapters = [
    {
        num: "01",
        title: "Financial Foundation",
        desc: "Understand your real numbers – job costing, overhead allocation, and the margin math that separates profitable companies from busy ones.",
    },
    {
        num: "02",
        title: "Pricing for Profit",
        desc: "Stop bidding to win and start pricing to build wealth. Markup vs. margin, overhead recovery, and how to never underprice a job again.",
    },
    {
        num: "03",
        title: "Business Structure",
        desc: "Entity selection, S-Corp election, owner compensation strategy, and the legal setup that protects you and maximizes after-tax income.",
    },
    {
        num: "04",
        title: "Hiring & Retention",
        desc: "Build a team that shows up, performs, and stays. Compensation models, accountability systems, and culture that actually works in the trades.",
    },
    {
        num: "05",
        title: "Operational Systems",
        desc: "The SOPs, workflows, and project management frameworks that let jobs run without you being on-site for every decision.",
    },
    {
        num: "06",
        title: "Scalable Growth",
        desc: "The roadmap from owner-operator to business owner — how to layer on revenue, manage capacity, and build a company worth owning.",
    },
];

function MobileCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: "start",
        slidesToScroll: 1,
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
        <div className="relative w-full">
            <div className="overflow-hidden w-full" ref={emblaRef}>
                <div className="flex touch-pan-y">
                    {chapters.map((chapter) => (
                        <div
                            key={chapter.num}
                            className="flex-shrink-0 flex-grow-0 w-full px-2"
                        >
                            <div className="border border-slate-200 bg-white p-6 rounded-2xl h-[220px] flex flex-col justify-between shadow-sm">
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-gold-600 font-black uppercase text-sm tracking-wider pr-4">
                                            {chapter.title}
                                        </h3>
                                        <span className="text-rose-500/10 text-4xl font-black font-heading leading-none select-none">
                                            {chapter.num}
                                        </span>
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed font-light">
                                        {chapter.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center gap-1.5 mt-6">
                {chapters.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => emblaApi?.scrollTo(index)}
                        className={cn(
                            "h-1 rounded-full transition-all duration-300",
                            selectedIndex === index ? "w-4 bg-gold-600" : "w-1 bg-slate-300"
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

export function BlueprintMastery() {
    return (
        <section className="py-20 lg:py-24 bg-slate-50 border-y border-slate-200 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 z-0 bg-[url('/images/pattern-grid.svg')] bg-repeat opacity-[0.02]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <header className="mb-12 lg:mb-16">
                    <RevealOnScroll>
                        <div className="mb-3">
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-rose-600">
                                Inside the Blueprint
                            </span>
                        </div>
                    </RevealOnScroll>
                    <RevealOnScroll delay={100}>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight leading-[1.05] uppercase">
                            <span className="block text-brand-900">What You&apos;ll Master</span>
                            <span className="block text-gold-600 mt-1">Chapter by Chapter</span>
                        </h2>
                    </RevealOnScroll>
                </header>

                {/* Tablet / Desktop Grid: Unified board layout */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 border-t border-l border-slate-200">
                    {chapters.map((chapter) => (
                        <div
                            key={chapter.num}
                            className="border-r border-b border-slate-200 p-8 md:p-10 flex flex-col justify-between h-full bg-white/40 hover:bg-white transition-colors"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <h3 className="text-gold-600 font-black uppercase text-sm tracking-wider pr-4">
                                        {chapter.title}
                                    </h3>
                                    <span className="text-rose-500/10 text-4xl font-black font-heading leading-none select-none">
                                        {chapter.num}
                                    </span>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed font-light">
                                    {chapter.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                    {/* Balanced empty grid cell at the end for Row 2 on desktop */}
                    <div className="hidden lg:block border-r border-b border-slate-200 bg-white/40 col-span-2" />
                </div>

                {/* Mobile swipable layout */}
                <div className="md:hidden">
                    <MobileCarousel />
                </div>
            </div>
        </section>
    );
}

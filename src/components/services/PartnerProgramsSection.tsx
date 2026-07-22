"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, HardHat, UtensilsCrossed } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { PartnerProgramCard } from "@/components/services/PartnerProgramCard";

const partnerPrograms = [
    {
        id: "construction",
        title: "Construction CFO Program",
        value: "Control job costs, labor, and cash flow.",
        highlights: ["Job-costing automation", "Live margin visibility", "Proactive tax planning"],
        ctaLabel: "See if you qualify",
        ctaUrl: "/vsl/construction",
        icon: HardHat,
    },
    {
        id: "restaurant",
        title: "Restaurant CFO Program",
        value: "See food and labor costs clearly.",
        highlights: ["Food-cost visibility", "Real-time P&L reporting", "Smarter menu pricing"],
        ctaLabel: "See if you qualify",
        ctaUrl: "/vsl/restaurants",
        icon: UtensilsCrossed,
    },
] as const;

function MobilePartnerProgramChooser() {
    const trackRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const updateActiveIndex = useCallback(() => {
        const track = trackRef.current;
        if (!track) return;

        const trackCenter = track.scrollLeft + track.clientWidth / 2;
        const closestIndex = Array.from(track.children).reduce((closest, card, index) => {
            const cardCenter = (card as HTMLElement).offsetLeft + (card as HTMLElement).offsetWidth / 2;
            const closestCenter = (track.children[closest] as HTMLElement).offsetLeft + (track.children[closest] as HTMLElement).offsetWidth / 2;
            return Math.abs(cardCenter - trackCenter) < Math.abs(closestCenter - trackCenter) ? index : closest;
        }, 0);

        setActiveIndex(closestIndex);
    }, []);

    const scrollToProgram = useCallback((index: number) => {
        const track = trackRef.current;
        const card = track?.children.item(index) as HTMLElement | null;
        if (!track || !card) return;

        setActiveIndex(index);
        const left = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
        track.scrollTo({ left, behavior: "auto" });
    }, []);

    return (
        <div className="lg:hidden -mx-4 sm:-mx-6">
            <div
                ref={trackRef}
                className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-px-[6%] px-[6%] pb-4 no-scrollbar"
                onScroll={updateActiveIndex}
                role="region"
                aria-roledescription="carousel"
                aria-label="Specialized partner programs"
            >
                {partnerPrograms.map((program, index) => {
                    const Icon = program.icon;
                    return (
                        <article
                            key={program.id}
                            className={`flex-none w-[88vw] snap-center rounded-2xl border bg-brand-900 p-6 shadow-sm transition-[box-shadow,border-color] duration-200 motion-reduce:transition-none ${activeIndex === index ? "border-gold-400/80 shadow-md shadow-gold-500/10" : "border-brand-700"}`}
                            aria-roledescription="slide"
                            aria-label={`${index + 1} of ${partnerPrograms.length}: ${program.title}`}
                        >
                            <div className="flex h-full min-h-[330px] flex-col">
                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/15 text-gold-400">
                                    <Icon className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <h3 className="truncate text-xl font-bold text-white font-heading">{program.title}</h3>
                                <p className="mt-2 truncate text-sm leading-5 text-brand-100/75">{program.value}</p>
                                <ul className="mt-6 space-y-2.5">
                                    {program.highlights.map((highlight) => (
                                        <li key={highlight} className="flex items-center gap-2 text-sm leading-5 text-brand-50/90">
                                            <Check className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                                            {highlight}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href={program.ctaUrl}
                                    className="mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-gold-500 px-4 py-2.5 text-sm font-bold text-brand-900 transition-colors hover:bg-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900"
                                >
                                    {program.ctaLabel}
                                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                </Link>
                            </div>
                        </article>
                    );
                })}
            </div>

            <div className="mt-2 flex items-center justify-center gap-1" aria-label="Program slide controls">
                <p className="mr-2 text-sm font-semibold tabular-nums text-brand-700" aria-live="polite">
                    {activeIndex + 1} of {partnerPrograms.length}
                </p>
                {partnerPrograms.map((program, index) => (
                    <button
                        key={program.id}
                        type="button"
                        onClick={() => scrollToProgram(index)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                scrollToProgram(index);
                            }
                        }}
                        aria-label={`Go to program ${index + 1}: ${program.title}`}
                        aria-current={activeIndex === index ? "true" : undefined}
                        className="flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
                    >
                        <span className={`block h-2 rounded-full transition-all duration-200 motion-reduce:transition-none ${activeIndex === index ? "w-6 bg-gold-500" : "w-2 bg-brand-200"}`} />
                    </button>
                ))}
            </div>
        </div>
    );
}

export function PartnerProgramsSection() {
    return (
        <section className="max-w-[90rem] mx-auto px-4 sm:px-6 mb-12" aria-labelledby="partner-programs-heading">
            <RevealOnScroll>
                <h2 id="partner-programs-heading" className="text-2xl font-bold text-brand-900 mb-5 lg:mb-8 font-heading px-2 sm:px-0">Specialized Partner Programs</h2>

                <MobilePartnerProgramChooser />

                {/* Desktop retains the fuller comparison-oriented presentation. */}
                <div className="hidden lg:grid grid-cols-2 gap-8">
                    <PartnerProgramCard
                        title="Construction CFO Partnership"
                        description="Stop bleeding cash on job costing & labor. The 'Hybrid CFO + COO' model for $1M-$10M contractors."
                        icon="HardHat"
                        colorTheme="emerald"
                        stats={[
                            { value: 400, label: "Avg Savings", prefix: "$", suffix: "K+" },
                            { value: 95, label: "Retention", suffix: "%" },
                            { value: 90, label: "To Results", suffix: " Days" },
                        ]}
                        features={["Job costing automation", "Real-time margin tracking", "Tax strategy optimization"]}
                        ctaUrl="/vsl/construction"
                        isFeatured={true}
                        backgroundImage="/images/construction-bg.jpg"
                    />
                    <PartnerProgramCard
                        title="Restaurant CFO Partnership"
                        description="Stop profit leaks on food cost & labor. The 'Kitchen Command Center' system for $500K-$5M venues."
                        icon="UtensilsCrossed"
                        colorTheme="orange"
                        stats={[
                            { value: 350, label: "Avg Savings", prefix: "$", suffix: "K+" },
                            { value: 98, label: "Retention", suffix: "%" },
                            { value: 90, label: "To Results", suffix: " Days" },
                        ]}
                        features={["Inventory & COGS control", "Real-time P&L visibility", "Menu pricing strategy"]}
                        ctaUrl="/vsl/restaurants"
                        backgroundImage="/images/restaurant-bg.jpg"
                    />
                </div>
            </RevealOnScroll>
        </section>
    );
}

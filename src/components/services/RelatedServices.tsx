"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { SwipeableCarousel } from "@/components/ui/SwipeableCarousel";

interface RelatedService {
    _id: string;
    title: string;
    slug: { current: string };
    icon: string;
    shortDescription?: string;
}

interface RelatedServicesProps {
    services: RelatedService[];
}

export function RelatedServices({ services }: RelatedServicesProps) {
    if (!services || services.length === 0) return null;

    const cards = services.map((s) => (
        <Link
            key={s._id}
            href={`/services/${s.slug.current}`}
            className="group block h-full"
        >
            <div className="h-full p-6 bg-white rounded-2xl border border-zinc-200 transition-all duration-300 group-hover:bg-white/90 group-hover:border-gold-500/30 group-hover:shadow-xl group-hover:shadow-gold-900/5 relative overflow-hidden">
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gold-50/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col h-full">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-900 mb-4 transition-all duration-300 group-hover:bg-brand-900 group-hover:text-gold-400 group-hover:scale-110">
                        <DynamicIcon name={s.icon} className="w-6 h-6" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <h4 className="font-bold text-lg text-brand-900 mb-2 group-hover:text-brand-900 transition-colors">
                            {s.title}
                        </h4>
                        {s.shortDescription && (
                            <p className="text-sm text-zinc-500 line-clamp-2 mb-4 group-hover:text-zinc-600">
                                {s.shortDescription}
                            </p>
                        )}
                    </div>

                    {/* Action */}
                    <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-wider group-hover:text-gold-600 transition-colors mt-auto">
                        Learn More
                        <ArrowRight className="w-3 h-3 transform transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                </div>
            </div>
        </Link>
    ));

    return (
        <section className="pt-12 border-t border-zinc-200">
            <h2 className="text-2xl font-bold text-brand-900 mb-8 font-heading px-1">
                You Might Also Need
            </h2>

            {/* Mobile: Swipeable Carousel */}
            <div className="md:hidden -mx-4">
                <SwipeableCarousel
                    showArrows={false}
                    showDots={true}
                    gap={16}
                    dragFree={false}
                    snapAlign="center"
                    slideClassName="w-[85vw] max-w-[320px]"
                >
                    {cards}
                </SwipeableCarousel>
            </div>

            {/* Desktop: Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards}
            </div>
        </section>
    );
}

"use client";

import { useEffect, useState } from "react";
import type React from "react";

interface MobileCarouselPaginationProps {
    carouselId: string;
    items: Array<{ id: string; label: string }>;
}

export const MobileCarouselPagination = ({
    carouselId,
    items,
}: MobileCarouselPaginationProps): React.JSX.Element => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const carousel = document.getElementById(carouselId);
        if (!carousel) return;

        const updateActiveIndex = () => {
            const cards = [...carousel.querySelectorAll<HTMLElement>("[data-carousel-item]")];
            const carouselLeft = carousel.getBoundingClientRect().left;
            const closestIndex = cards.reduce((closest, card, index) => (
                Math.abs(card.getBoundingClientRect().left - carouselLeft) < Math.abs(cards[closest].getBoundingClientRect().left - carouselLeft)
                    ? index
                    : closest
            ), 0);
            setActiveIndex(closestIndex);
        };

        updateActiveIndex();
        carousel.addEventListener("scroll", updateActiveIndex, { passive: true });
        return () => carousel.removeEventListener("scroll", updateActiveIndex);
    }, [carouselId]);

    const selectCard = (index: number) => {
        const carousel = document.getElementById(carouselId);
        carousel?.querySelectorAll<HTMLElement>("[data-carousel-item]")[index]?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start",
        });
    };

    return (
        <div className="mt-1 flex justify-center gap-1 md:hidden" aria-label="Comparison card pagination">
            {items.map((item, index) => (
                <button
                    key={item.id}
                    type="button"
                    onClick={() => selectCard(index)}
                    aria-label={`Show ${item.label} comparison`}
                    aria-current={activeIndex === index ? "page" : undefined}
                    className="flex h-8 w-8 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
                >
                    <span
                        className={`block h-2 w-2 rounded-full transition-colors ${activeIndex === index ? "bg-brand-900" : "bg-slate-300"}`}
                        aria-hidden="true"
                    />
                </button>
            ))}
        </div>
    );
};

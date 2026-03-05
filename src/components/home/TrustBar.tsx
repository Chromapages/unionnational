"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface TrustBarProps {
    logos?: Array<{
        asset?: { url: string };
        alt?: string;
    }>;
}

export function TrustBar({ logos }: TrustBarProps) {
    const defaultBrands = [
        { name: "ABC", url: "https://www.vectorlogo.zone/logos/abcgo/abcgo-ar21.svg" },
        { name: "Fox News", url: "https://www.vectorlogo.zone/logos/fox/fox-wordmark.svg" },
        { name: "NBC", url: "https://www.vectorlogo.zone/logos/nbc/nbc-ar21.svg" },
        { name: "Associated Press", url: "https://www.vectorlogo.zone/logos/ap/ap-icon.svg" },
        { name: "CBS", url: "https://api.iconify.design/simple-icons:cbs.svg" },
        { name: "Sports Illustrated", url: "/images/sports-illustrated-logo.png" },
    ];

    const displayLogos = logos && logos.length > 0
        ? logos.map(logo => ({ url: logo.asset?.url || '', name: logo.alt || 'Logo' }))
        : defaultBrands;

    // Double the array for seamless infinite scroll
    const marqueeLogos = [...displayLogos, ...displayLogos];

    return (
        <section className="py-10 border-b border-slate-100 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
                <p className="text-xs font-bold text-brand-900/40 uppercase tracking-[0.2em] font-heading">
                    TAX EXPERT FEATURED IN
                </p>
            </div>

            <div className="relative w-full overflow-hidden mask-gradient-x">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

                <div className="flex w-max animate-scroll">
                    {marqueeLogos.map((brand, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-center px-8 sm:px-12 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer"
                        >
                            <img
                                src={brand.url}
                                alt={brand.name}
                                className="h-8 sm:h-9 md:h-10 w-auto object-contain max-w-[120px]"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

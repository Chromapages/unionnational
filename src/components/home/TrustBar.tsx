"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import Image from "next/image";

interface TrustBarProps {
    logos?: Array<{
        asset?: { url: string };
        alt?: string;
    }>;
}

export function TrustBar({ logos }: TrustBarProps) {
    const defaultBrands = [
        { name: "ABC", url: "https://www.vectorlogo.zone/logos/abcgo/abcgo-ar21.svg", className: "h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 2xl:h-20 w-auto" },
        { name: "Fox News", url: "https://www.vectorlogo.zone/logos/fox/fox-wordmark.svg", className: "h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 2xl:h-20 w-auto" },
        { name: "NBC", url: "https://www.vectorlogo.zone/logos/nbc/nbc-ar21.svg", className: "h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 2xl:h-20 w-auto" },
        { name: "Associated Press", url: "https://www.vectorlogo.zone/logos/ap/ap-icon.svg", className: "h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 2xl:h-20 w-auto" },
        { name: "CBS", url: "https://api.iconify.design/simple-icons:cbs.svg", className: "h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 2xl:h-20 w-auto" },
        { name: "Sports Illustrated", url: "/images/sports-illustrated-logo.png", className: "h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 2xl:h-20 w-auto" },
    ];

    const displayLogos = logos && logos.length > 0
        ? logos.map(logo => ({ url: logo.asset?.url || '', name: logo.alt || 'Logo' }))
        : defaultBrands;

    return (
        <section className="py-8 sm:py-12 border-b border-slate-100 bg-slate-50/50">
            <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-16">
                <RevealOnScroll>
                    <div className="flex flex-col items-center justify-center">
                        <span className="text-sm font-bold text-brand-900/50 uppercase tracking-widest mb-8 whitespace-nowrap font-heading">
                            As Featured In:
                        </span>
                        <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-6 sm:gap-8 md:gap-10 lg:gap-16 xl:gap-20 2xl:gap-24 w-full">
                            {displayLogos.map((brand, i) => (
                                <img
                                    key={i}
                                    src={brand.url}
                                    alt={brand.name}
                                    className="h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 2xl:h-20 w-auto object-contain mix-blend-multiply grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"
                                    loading="lazy"
                                />
                            ))}
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}

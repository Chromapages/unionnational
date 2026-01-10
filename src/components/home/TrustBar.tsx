"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function TrustBar() {
    const brands = [
        { name: "ABC", url: "https://www.vectorlogo.zone/logos/abcgo/abcgo-ar21.svg", className: "h-12 w-auto md:h-16" },
        { name: "Fox News", url: "https://www.vectorlogo.zone/logos/fox/fox-wordmark.svg", className: "h-10 w-auto md:h-14" },
        { name: "NBC", url: "https://www.vectorlogo.zone/logos/nbc/nbc-ar21.svg", className: "h-12 w-auto md:h-16" },
        { name: "Associated Press", url: "https://www.vectorlogo.zone/logos/ap/ap-icon.svg", className: "h-10 w-auto md:h-14" },
        { name: "CBS", url: "https://api.iconify.design/simple-icons:cbs.svg", className: "h-12 w-auto md:h-16" },
        { name: "Sports Illustrated", url: "/images/sports-illustrated-logo.png", className: "h-10 w-auto md:h-14" },
    ];

    return (
        <section className="py-10 border-b border-slate-100 bg-slate-50/50">
            <div className="max-w-[100rem] mx-auto px-6">
                <RevealOnScroll>
                    <div className="flex flex-col items-center justify-center">
                        <span className="text-sm font-bold text-brand-900/50 uppercase tracking-widest mb-8 whitespace-nowrap font-heading">
                            As Featured In:
                        </span>
                        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
                            {brands.map((brand, i) => (
                                <img
                                    key={i}
                                    src={brand.url}
                                    alt={brand.name}
                                    className={`${brand.className} object-contain mix-blend-multiply grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer`}
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

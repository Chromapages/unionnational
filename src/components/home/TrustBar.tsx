"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface TrustBarProps {
    logos?: Array<{
        asset?: { url: string };
        alt?: string;
    }>;
}

// Industry standard publication logos for a premium first impression
const fallbackLogos = [
    { name: "Forbes", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Forbes_logo.svg/2560px-Forbes_logo.svg.png" },
    { name: "Bloomberg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Bloomberg_L.P._logo.svg/2560px-Bloomberg_L.P._logo.svg.png" },
    { name: "Wall Street Journal", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/WSJ_Logo.svg/2560px-WSJ_Logo.svg.png" },
    { name: "Business Insider", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Business_Insider_Logo.svg/2560px-Business_Insider_Logo.svg.png" },
    { name: "TechCrunch", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/TechCrunch_logo.svg/2560px-TechCrunch_logo.svg.png" },
];

export function TrustBar({ logos }: TrustBarProps) {
    const t = useTranslations("HomePage.TrustBar");

    // Use Sanity logos if available, otherwise use placeholders
    const displayLogos = logos && logos.length > 0
        ? logos.filter((logo) => logo.asset?.url).map((logo) => ({
            url: logo.asset!.url,
            name: logo.alt || t("defaultAlt"),
        }))
        : fallbackLogos;

    // Triple the logos to ensure the carousel never has gaps on any screen size
    const marqueeLogos = [...displayLogos, ...displayLogos, ...displayLogos];

    return (
        <section className="relative overflow-hidden border-b border-slate-100 bg-white py-12">
            <div className="mx-auto mb-8 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                <p className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-brand-900/40">
                    {t("eyebrow")}
                </p>
            </div>

            <div className="mask-gradient-x relative w-full overflow-hidden">
                {/* Horizontal gradients for smooth fading edges */}
                <div className="absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-white to-transparent sm:w-40" />
                <div className="absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-white to-transparent sm:w-40" />

                <div className="flex w-max animate-scroll hover:pause motion-reduce:animate-none">
                    {marqueeLogos.map((brand, index) => (
                        <div
                            key={`${brand.url}-${index}`}
                            className="flex cursor-default items-center justify-center px-10 transition-all duration-500 sm:px-14"
                        >
                            <div className="relative h-7 w-[110px] opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300 sm:h-8 sm:w-[130px] md:h-9 md:w-[150px]">
                                <Image
                                    src={brand.url}
                                    alt={brand.name}
                                    fill
                                    sizes="(max-width: 768px) 130px, 150px"
                                    className="object-contain"
                                    unoptimized={brand.url.includes("wikimedia")} // Use unoptimized for external SVGs to avoid resize issues
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

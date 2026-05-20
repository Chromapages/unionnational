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

interface SvgLogo {
    name: string;
    svg: string;
    viewBox: string;
    isSvg: true;
}

interface ImageLogo {
    name: string;
    url: string;
    isSvg: false;
}

// Inline SVG logos for premium publications - professional and optimized
const fallbackLogos: SvgLogo[] = [
    {
        name: "Forbes",
        svg: `<svg viewBox="0 0 120 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="22" font-family="Georgia, serif" font-size="22" font-weight="bold">Forbes</text>
        </svg>`,
        viewBox: "0 0 120 30",
        isSvg: true,
    },
    {
        name: "Bloomberg",
        svg: `<svg viewBox="0 0 140 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="22" font-family="Arial, sans-serif" font-size="18" font-weight="bold" letter-spacing="0.5">BLOOMBERG</text>
        </svg>`,
        viewBox: "0 0 140 30",
        isSvg: true,
    },
    {
        name: "Wall Street Journal",
        svg: `<svg viewBox="0 0 150 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="20" font-family="Georgia, serif" font-size="14" font-weight="bold" letter-spacing="1">THE WALL STREET</text>
            <text x="0" y="32" font-family="Georgia, serif" font-size="12" letter-spacing="2">JOURNAL</text>
        </svg>`,
        viewBox: "0 0 150 35",
        isSvg: true,
    },
    {
        name: "Business Insider",
        svg: `<svg viewBox="0 0 160 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="20" font-family="Arial, sans-serif" font-size="13" font-weight="bold" letter-spacing="0.5">BUSINESS</text>
            <text x="75" y="20" font-family="Arial, sans-serif" font-size="13" font-weight="normal" letter-spacing="0.5">INSIDER</text>
        </svg>`,
        viewBox: "0 0 160 30",
        isSvg: true,
    },
    {
        name: "TechCrunch",
        svg: `<svg viewBox="0 0 140 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="22" font-family="Arial, sans-serif" font-size="18" font-weight="bold">TechCrunch</text>
        </svg>`,
        viewBox: "0 0 140 30",
        isSvg: true,
    },
];

type LogoItem = SvgLogo | ImageLogo;

export function TrustBar({ logos }: TrustBarProps) {
    const t = useTranslations("HomePage.TrustBar");

    // Use Sanity logos if available, otherwise use SVG fallbacks
    const displayLogos: LogoItem[] = logos && logos.length > 0
        ? logos.filter((logo) => logo.asset?.url).map((logo): ImageLogo => ({
            url: logo.asset!.url,
            name: logo.alt || t("defaultAlt"),
            isSvg: false,
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
                            key={`${brand.name}-${index}`}
                            className="flex cursor-default items-center justify-center px-10 transition-all duration-500 sm:px-14"
                        >
                            <div className="relative h-7 w-[110px] opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300 sm:h-8 sm:w-[130px] md:h-9 md:w-[150px]">
                                {"svg" in brand ? (
                                    <div
                                        className="h-full w-full"
                                        dangerouslySetInnerHTML={{ __html: brand.svg }}
                                        style={{ color: "#1a1a1a" }}
                                    />
                                ) : (
                                    <Image
                                        src={brand.url}
                                        alt={brand.name}
                                        fill
                                        sizes="(max-width: 768px) 130px, 150px"
                                        className="object-contain"
                                        unoptimized={brand.url.includes("wikimedia")}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface ClientLogosProps {
    logos?: any[]; // Sanity image objects
    className?: string;
}

// Fallback logos if none provided (placeholders)
const fallbackLogos = [
    { name: "Forbes", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Forbes_logo.svg/2560px-Forbes_logo.svg.png" },
    { name: "Bloomberg", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Bloomberg_L.P._logo.svg/2560px-Bloomberg_L.P._logo.svg.png" },
    { name: "Wall Street Journal", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/WSJ_Logo.svg/2560px-WSJ_Logo.svg.png" },
    { name: "Business Insider", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Business_Insider_Logo.svg/2560px-Business_Insider_Logo.svg.png" },
    { name: "TechCrunch", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/TechCrunch_logo.svg/2560px-TechCrunch_logo.svg.png" },
];

export function ClientLogoStrip({ logos, className }: ClientLogosProps) {
    // Use fallback logos if no Sanity data
    // Note: real Sanity image URL builder logic would go here

    return (
        <section className={cn("py-12 border-b border-slate-100 bg-white overflow-hidden", className)}>
            <p className="text-center text-[10px] font-bold text-brand-900/30 uppercase tracking-[0.2em] mb-8 font-sans">
                As Featured In
            </p>

            <div className="relative flex overflow-x-hidden group">
                <div className="animate-marquee whitespace-nowrap flex items-center gap-16 px-8">
                    {/* Double the logos for infinite scroll effect */}
                    {[...fallbackLogos, ...fallbackLogos].map((logo, i) => (
                        <div key={i} className="relative h-6 w-32 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                            {/* 
                           Note: Using simple img for fallback. 
                           In production with Next/Image, you need defined width/height.
                        */}
                            <img
                                src={logo.url}
                                alt={logo.name}
                                className="h-full w-full object-contain"
                            />
                        </div>
                    ))}
                </div>

                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent pointer-events-none" />
                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent pointer-events-none" />
            </div>
        </section>
    );
}

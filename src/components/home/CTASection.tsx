"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { urlFor } from "@/sanity/lib/image";
import { Phone, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface CTASectionProps {
    data?: {
        ctaTitle?: string;
        ctaSubtitle?: string;
        ctaButtonText?: string;
        ctaButtonUrl?: string;
        ctaBackgroundImage?: {
            asset?: unknown;
            alt?: string;
        };
    };
}

export function CTASection({ data }: CTASectionProps) {
    const backgroundImageUrl = data?.ctaBackgroundImage?.asset
        ? urlFor(data.ctaBackgroundImage).width(2000).height(1200).url()
        : "/images/ctasection.jpg";
    const backgroundImageAlt = data?.ctaBackgroundImage?.alt || "Office Background";

    return (
        <section id="contact" className="relative py-20 lg:py-28 overflow-hidden">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={backgroundImageUrl}
                    alt={backgroundImageAlt}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-brand-950/60 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-900/70 to-brand-900/50"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <RevealOnScroll>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500 text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse"></span>
                            Accepting New Clients for {new Date().getFullYear()} Tax Season
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-8 font-heading leading-[1.1]">
                            Stop Overpaying. <br className="hidden sm:block" />
                            <span className="text-gold-500">Start Building Wealth.</span>
                        </h2>

                        <p className="text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl mx-auto font-sans">
                            Join 500+ business owners who are saving an average of $40k/year. Book your free 15-minute strategy call to unlock your potential savings.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href={data?.ctaButtonUrl || "/contact"}
                                className="w-full sm:w-auto bg-gold-500 text-brand-900 px-8 py-5 rounded-xl text-lg font-bold hover:bg-gold-400 transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] hover:-translate-y-1 text-center font-heading tracking-wide flex items-center justify-center gap-2"
                            >
                                <Calendar className="w-5 h-5" />
                                {data?.ctaButtonText || "Book Strategy Call"}
                            </Link>

                            <button className="w-full sm:w-auto bg-white/5 backdrop-blur-sm border border-white/20 text-white px-8 py-5 rounded-xl text-lg font-bold hover:bg-white/10 hover:border-gold-500/50 hover:text-gold-500 transition-all duration-300 flex items-center justify-center gap-2 group font-heading tracking-wide">
                                <Phone className="w-5 h-5 text-slate-400 group-hover:text-gold-500" />
                                Talk to an Expert
                            </button>
                        </div>

                        <p className="mt-8 text-sm text-slate-500 font-sans">
                            No obligation. 100% Confidential.
                        </p>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
}

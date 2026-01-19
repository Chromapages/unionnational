"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface CTASectionProps {
    data?: {
        ctaTitle?: string;
        ctaSubtitle?: string;
        ctaButtonText?: string;
        ctaButtonUrl?: string;
    };
}

export function CTASection({ data }: CTASectionProps) {
    return (
        <section id="contact" className="bg-brand-900 relative overflow-hidden py-16 sm:py-20 lg:py-24">
            {/* Background Gradients/Effects */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-800/20 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/4"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/4"></div>

            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Column: Content */}
                    <div className="flex flex-col text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 justify-center lg:justify-start mb-6">
                            <span className="bg-gold-500/10 text-gold-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-gold-500/20 font-heading">
                                Limited Availability
                            </span>
                        </div>

                        <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6 font-heading leading-tight">
                            {data?.ctaTitle || "Stop Overpaying. Start Building Wealth."}
                        </h2>

                        <p className="text-brand-100 text-lg leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0 font-sans">
                            {data?.ctaSubtitle || "Join 500+ business owners saving more on taxes. Book your free 15-minute strategy call to unlock your potential savings."}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                            <Link
                                href={data?.ctaButtonUrl || "/contact"}
                                className="w-full sm:w-auto bg-gold-500 text-brand-950 px-8 py-4 rounded-lg text-base font-bold hover:bg-gold-400 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:-translate-y-0.5 text-center whitespace-nowrap font-heading tracking-wide"
                            >
                                {data?.ctaButtonText || "Book Strategy Call"}
                            </Link>

                            <button className="w-full sm:w-auto bg-transparent border border-brand-700 text-white px-8 py-4 rounded-lg text-base font-bold hover:bg-brand-900/50 hover:border-gold-500/50 hover:text-gold-500 transition-all duration-300 flex items-center justify-center gap-2 group whitespace-nowrap font-heading tracking-wide">
                                Download S-Corp Playbook
                                <ArrowUpRight className="w-4 h-4 text-brand-400 group-hover:text-gold-500 transition-colors" />
                            </button>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex items-center gap-4 justify-center lg:justify-start text-sm text-brand-200/80 font-sans">
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} className="w-5 h-5 text-gold-500 fill-gold-500" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="w-1 h-1 bg-brand-700 rounded-full"></span>
                            <span>Trusted by 500+ Businesses</span>
                        </div>
                    </div>

                    {/* Right Column: Visual */}
                    <div className="relative h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden border border-brand-800 shadow-2xl lg:translate-x-8">
                        {/* Using the existing background image but framed effectively */}
                        <Image
                            src="/images/ctasection.jpg"
                            alt="Jason Astwood - Union National Tax"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        {/* Overlay to ensure text readability if image spans (though here it's contained) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

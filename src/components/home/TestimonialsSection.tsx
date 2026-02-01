"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SwipeableCarousel } from "@/components/ui/SwipeableCarousel";
import { Quote, Star, ShieldCheck } from "lucide-react";

interface Testimonial {
    _id?: string;
    clientName?: string;
    clientTitle?: string;
    clientCompany?: string;
    quote?: string;
    rating?: number;
}

interface TestimonialProps {
    testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials = [] }: TestimonialProps) {
    if (!testimonials || testimonials.length === 0) return null;

    // Duplicate for seamless scroll
    const marqueeTestimonials = [...testimonials, ...testimonials];

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-100/40 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <RevealOnScroll className="mb-16 max-w-3xl">
                    <div className="mb-4">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600 font-heading">
                            Client Success Stories
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-brand-900 font-heading leading-[1.1]">
                        Trusted by High-Growth <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-700">
                            Business Owners
                        </span>
                    </h2>
                </RevealOnScroll>

                {/* Mobile: Swipeable Carousel | Desktop: Marquee */}
                <div className="md:hidden">
                    <SwipeableCarousel
                        slideClassName="w-[320px]"
                        gap={16}
                        showArrows={false}
                        dragFree={true}
                    >
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={`mobile-${testimonial._id || "testimonial"}-${index}`}
                                className="h-[280px] bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between group relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-900 to-gold-500 opacity-0 group-active:opacity-100 transition-opacity"></div>

                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex text-gold-500 gap-1">
                                            {[...Array(testimonial.rating || 5)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-current" />
                                            ))}
                                        </div>
                                        <ShieldCheck className="w-5 h-5 text-slate-200" />
                                    </div>

                                    <p className="text-sm font-sans font-medium text-slate-700 leading-relaxed line-clamp-4">
                                        "{testimonial.quote}"
                                    </p>
                                </div>

                                <div className="border-t border-slate-100 pt-4 mt-4">
                                    <div className="text-sm font-bold text-brand-900 font-heading">
                                        {testimonial.clientName}
                                    </div>
                                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mt-0.5">
                                        {testimonial.clientTitle}
                                        {testimonial.clientCompany && ` • ${testimonial.clientCompany}`}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </SwipeableCarousel>
                </div>

                {/* Desktop: Marquee Scroll */}
                <div className="hidden md:block relative w-full overflow-hidden mask-gradient-x py-6">
                    {/* Gradient Masks */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-slate-50 to-transparent z-20 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-slate-50 to-transparent z-20 pointer-events-none"></div>

                    <div className="flex w-max animate-scroll-slow gap-6 sm:gap-8 hover:pause">
                        {marqueeTestimonials.map((testimonial, index) => (
                            <div
                                key={`${testimonial._id || "testimonial"}-${index}`}
                                className="w-[350px] sm:w-[400px] h-[320px] bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:border-gold-500/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shrink-0 group relative overflow-hidden"
                            >
                                {/* Fintech Accent: Top Bar */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-900 to-gold-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex text-gold-500 gap-1">
                                            {[...Array(testimonial.rating || 5)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-current" />
                                            ))}
                                        </div>
                                        <ShieldCheck className="w-5 h-5 text-slate-200 group-hover:text-gold-500/50 transition-colors" />
                                    </div>

                                    <div className="relative">
                                        <p className="text-base font-sans font-medium text-slate-700 leading-relaxed relative z-10 line-clamp-4 group-hover:text-brand-900 transition-colors">
                                            "{testimonial.quote}"
                                        </p>
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 pt-4 mt-4 group-hover:border-gold-500/10 transition-colors">
                                    <div className="text-sm font-bold text-brand-900 font-heading">
                                        {testimonial.clientName}
                                    </div>
                                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mt-0.5">
                                        {testimonial.clientTitle}
                                        {testimonial.clientCompany && ` • ${testimonial.clientCompany}`}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

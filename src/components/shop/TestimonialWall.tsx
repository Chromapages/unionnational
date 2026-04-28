"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Testimonial {
    _id: string;
    clientName: string;
    clientTitle: string;
    clientCompany: string;
    quote: string;
    rating: number;
    imageUrl?: string;
}

interface TestimonialWallProps {
    testimonials?: Testimonial[];
    backgroundImage?: {
        url?: string;
        alt?: string;
    };
}

export function TestimonialWall({ testimonials: propTestimonials, backgroundImage }: TestimonialWallProps) {
    const [isMounted, setIsMounted] = useState(false);
    
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const displayTestimonials = propTestimonials?.filter((testimonial) => testimonial.quote && testimonial.clientName) || [];

    if (displayTestimonials.length === 0) {
        return null;
    }

    const featured = displayTestimonials[0];
    const backgroundImageUrl = backgroundImage?.url || "/images/testimonial-cinematic-bg.png";
    const backgroundImageAlt = backgroundImage?.alt || "Union National Tax product testimonial background";

    // During SSR and first paint, we render a version that matches the expected legacy structure
    // This avoids hydration mismatches while the server cache is stale
    return (
        <section id="reviews" className="scroll-mt-24 relative py-16 lg:py-20 overflow-hidden bg-brand-950">
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
                {isMounted ? (
                    <>
                        <Image 
                            src={backgroundImageUrl}
                            alt={backgroundImageAlt}
                            fill
                            className="object-cover opacity-60 mix-blend-overlay"
                            priority={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/80 to-transparent" />
                        <div className="absolute inset-0 bg-brand-950/20 backdrop-blur-[2px]" />
                    </>
                ) : (
                    <>
                        <img 
                            src={backgroundImageUrl}
                            alt={backgroundImageAlt}
                            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/60 to-transparent" />
                    </>
                )}
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[400px] gap-12">
                    
                    {/* Left Column: Spacer/Branding (Empty as requested) */}
                    <div className="hidden lg:block h-full" />

                    {/* Right Column: Featured Testimonial Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={isMounted ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex justify-center lg:justify-end"
                    >
                        <div className="w-full max-w-lg bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 p-10 shadow-2xl relative overflow-hidden group">
                            {/* Decorative Gloss */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-gold-400/20 transition-all duration-500" />
                            
                            <h2 className="text-2xl font-bold text-white font-heading tracking-tight mb-2">
                                Reader Feedback
                            </h2>
                            <p className="text-sm text-slate-400 font-sans mb-8">
                                Perspective from business owners and advisors using Union National Tax resources.
                            </p>

                            <div className="flex gap-1.5 text-gold-400 mb-8">
                                {[...Array(featured.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-current" />
                                ))}
                            </div>
                            
                            <blockquote className="relative">
                                <p className="text-white font-heading italic text-2xl md:text-3xl font-bold leading-tight mb-12">
                                    &ldquo;{featured.quote}&rdquo;
                                </p>
                            </blockquote>
                            
                            <div className="pt-8 border-t border-white/5 flex items-center gap-5">
                                <div className="h-0.5 w-8 bg-gold-500/50" />
                                <div>
                                    <p className="font-bold text-white text-base tracking-wide uppercase font-heading">{featured.clientName}</p>
                                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mt-1.5">
                                        {featured.clientTitle} {featured.clientCompany && `• ${featured.clientCompany}`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

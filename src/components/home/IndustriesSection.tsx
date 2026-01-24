"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { 
  Hammer, Home, Utensils, ShoppingBag, ShieldCheck, 
  ArrowRight, CheckCircle2, ChevronLeft, ChevronRight 
} from "lucide-react";

const industries = [
    {
        id: "construction",
        icon: <Hammer className="w-5 h-5" />,
        name: "Construction",
        description: "Contractors & Builders",
        detailTitle: "Build Wealth, Not Just Buildings",
        detailText: "Construction businesses face unique challenges with job costing, irregular cash flow, and heavy equipment depreciation. We help you optimize your tax structure so you can keep more capital for your next project.",
        benefits: ["Job Costing Analysis", "Equipment Depreciation Strategy", "Cash Flow Management"],
        image: "/images/industries/construction.png"
    },
    {
        id: "real-estate",
        icon: <Home className="w-5 h-5" />,
        name: "Real Estate",
        description: "Investors & Agents",
        detailTitle: "Maximize Your Real Estate Portfolio",
        detailText: "From 1031 exchanges to navigating passive activity loss rules, real estate tax law is complex. We ensure you're leveraging every deduction available to investors and agents.",
        benefits: ["1031 Exchange Planning", "Passive Activity Loss Rules", "Cost Segregation Studies"],
        image: "/images/industries/real-estate.png"
    },
    {
        id: "food",
        icon: <Utensils className="w-5 h-5" />,
        name: "Food Industry",
        description: "Restaurateurs & Franchisees",
        detailTitle: "Recipe for Financial Success",
        detailText: "Margins are tight in the food industry. We help restaurateurs and franchisees implement tight financial controls and tax strategies to improve the bottom line.",
        benefits: ["Inventory Management", "Tip Reporting Compliance", "Sales Tax Automation"],
        image: "/images/industries/food.png"
    },
    {
        id: "ecommerce",
        icon: <ShoppingBag className="w-5 h-5" />,
        name: "E-Commerce",
        description: "Online Sellers & Brands",
        detailTitle: "Scale Your Online Store Smartly",
        detailText: "E-commerce moves fast. We specialize in nexus issues, inventory accounting, and multi-state sales tax compliance, letting you focus on scaling your brand.",
        benefits: ["Multi-State Sales Tax Nexus", "Inventory Accounting", "Platform Fee Analysis"],
        image: "/images/industries/ecommerce.png"
    },
    {
        id: "insurance",
        icon: <ShieldCheck className="w-5 h-5" />,
        name: "Insurance",
        description: "Agency Owners",
        detailTitle: "Protect Your Agency's Earnings",
        detailText: "Insurance agencies have unique valuation and compensation models. We provide specialized tax planning to help agency owners maximize their retained earnings.",
        benefits: ["Commission Income Planning", "Agency Valuation Strategy", "Retirement Planning"],
        image: "/images/industries/insurance.png"
    }
];

export function IndustriesSection() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ 
        loop: true, 
        align: "center",
        skipSnaps: false,
    });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    return (
        <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Header */}
                <RevealOnScroll className="text-center mb-12 lg:mb-16">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-500 font-heading">
                        Who We Serve
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-4 tracking-tight text-brand-900 font-heading">
                        Specialized Tax Strategy <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-700">
                            for Your Industry
                        </span>
                    </h2>
                    <p className="text-slate-600 mt-6 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-sans">
                        We understand the unique financial challenges of your business. Our industry-specific expertise means real savings.
                    </p>
                </RevealOnScroll>

                {/* Carousel */}
                <RevealOnScroll delay={100}>
                    <div className="relative">
                        {/* Embla Viewport */}
                        <div className="overflow-hidden" ref={emblaRef}>
                            <div className="flex gap-6">
                                {industries.map((industry, index) => (
                                    <div 
                                        key={industry.id} 
                                        className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_80%] lg:flex-[0_0_60%]"
                                    >
                                        <div className={`
                                            bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden
                                            transition-all duration-500 h-full
                                            ${selectedIndex === index 
                                                ? "shadow-2xl scale-100 opacity-100 border-gold-500/30" 
                                                : "shadow-md scale-95 opacity-60"}
                                        `}>
                                            {/* Image */}
                                            <div className="relative h-48 sm:h-56 lg:h-64 w-full overflow-hidden bg-gradient-to-br from-brand-900 to-brand-800">
                                                <Image
                                                    src={industry.image}
                                                    alt={`${industry.name} illustration`}
                                                    fill
                                                    className="object-cover opacity-80 mix-blend-luminosity"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-transparent to-transparent" />
                                                <div className="absolute bottom-4 left-6 flex items-center gap-3">
                                                    <div className="p-2 rounded-lg bg-gold-500 text-brand-900 shadow-lg">
                                                        {industry.icon}
                                                    </div>
                                                    <span className="text-white font-bold text-lg font-heading">
                                                        {industry.name}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6 sm:p-8">
                                                <h3 className="text-xl sm:text-2xl font-bold text-brand-900 mb-3 font-heading">
                                                    {industry.detailTitle}
                                                </h3>
                                                <p className="text-slate-600 text-sm sm:text-base mb-6 leading-relaxed font-sans">
                                                    {industry.detailText}
                                                </p>

                                                {/* Benefits */}
                                                <div className="space-y-3 mb-6">
                                                    {industry.benefits.map((benefit, i) => (
                                                        <div key={i} className="flex items-center gap-3">
                                                            <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                                                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                                            </div>
                                                            <span className="text-sm font-medium text-brand-900 font-sans">
                                                                {benefit}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* CTA */}
                                                <a
                                                    href="/intake"
                                                    aria-label={`Get started with ${industry.name} tax planning`}
                                                    className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 font-semibold text-sm transition-colors cursor-pointer group"
                                                >
                                                    Learn More
                                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            onClick={scrollPrev}
                            disabled={!canScrollPrev}
                            aria-label="Previous industry"
                            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 
                                       w-12 h-12 rounded-full bg-white shadow-lg border border-slate-200
                                       items-center justify-center text-brand-900 
                                       hover:bg-gold-50 hover:border-gold-500/30 hover:text-gold-600
                                       disabled:opacity-30 disabled:cursor-not-allowed
                                       transition-all duration-200 cursor-pointer z-10"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={scrollNext}
                            disabled={!canScrollNext}
                            aria-label="Next industry"
                            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 
                                       w-12 h-12 rounded-full bg-white shadow-lg border border-slate-200
                                       items-center justify-center text-brand-900 
                                       hover:bg-gold-50 hover:border-gold-500/30 hover:text-gold-600
                                       disabled:opacity-30 disabled:cursor-not-allowed
                                       transition-all duration-200 cursor-pointer z-10"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {industries.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => scrollTo(index)}
                                aria-label={`Go to slide ${index + 1}`}
                                className={`
                                    w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer
                                    ${selectedIndex === index 
                                        ? "bg-gold-500 w-8" 
                                        : "bg-slate-300 hover:bg-slate-400"}
                                `}
                            />
                        ))}
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}

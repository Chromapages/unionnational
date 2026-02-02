"use client";

import { SwipeableCarousel } from "@/components/ui/SwipeableCarousel";

// Define strict types matching the Sanity query
interface PricingTier {
    _id: string;
    name: string;
    slug: { current: string };
    category: string;
    price?: string;
    billingPeriod?: string;
    features?: string[];
    tagline?: string;
}

interface OptionalServicesProps {
    tiers: PricingTier[];
}

import { CheckCircle2, FileClock, FileWarning, Map, FileSignature, Sparkles } from "lucide-react";

// Helper to get icon based on slug
const getServiceIcon = (slug: string) => {
    if (slug?.includes('prior')) return FileClock;
    if (slug?.includes('irs') || slug?.includes('notice')) return FileWarning;
    if (slug?.includes('state')) return Map;
    if (slug?.includes('amend')) return FileSignature;
    return Sparkles;
};

function ServiceCard({ service }: { service: PricingTier }) {
    const Icon = getServiceIcon(service.slug?.current);

    return (
        <div className="h-full bg-white rounded-2xl p-8 border border-zinc-100 shadow-sm hover:shadow-xl hover:border-gold-500/20 hover:scale-[1.02] transition-all duration-300 group flex flex-col relative overflow-hidden">
            {/* Soft Gradient Background Element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-opacity group-hover:opacity-100 opacity-0" />

            {/* Header: Icon & Title */}
            <div className="mb-6 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-900 mb-5 group-hover:bg-gold-500 group-hover:border-gold-500 group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-brand-900 text-xl font-heading leading-tight group-hover:text-brand-700 transition-colors">
                    {service.name}
                </h3>
                {service.tagline && (
                    <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
                        {service.tagline}
                    </p>
                )}
            </div>

            {/* Body: Features */}
            {service.features && service.features.length > 0 && (
                <div className="mb-8 flex-1">
                    <ul className="space-y-3">
                        {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-zinc-600">
                                <CheckCircle2 className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                                <span className="leading-snug">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Spacer if no features to push price down */}
            {(!service.features || service.features.length === 0) && <div className="flex-1" />}

            {/* Footer: Price */}
            <div className="pt-6 border-t border-zinc-100 mt-auto relative z-10">
                <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-2xl font-bold text-brand-900 font-heading">
                        {service.price}
                    </span>
                    {service.billingPeriod && (
                        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                            /{service.billingPeriod}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export function OptionalServices({ tiers }: OptionalServicesProps) {
    // Filter for Optional tiers
    const optionalServices = tiers?.filter(t => t.category === "optional") || [];

    if (optionalServices.length === 0) return null;

    // Create card elements for both mobile and desktop
    const serviceCards = optionalServices.map((service) => (
        <ServiceCard key={service._id} service={service} />
    ));

    return (
        <div className="max-w-7xl mx-auto px-6 mt-16 pb-0">
            <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-brand-900 font-heading mb-3">Additional Services</h2>
                <p className="text-brand-900/60 max-w-2xl mx-auto text-sm">
                    Specialized add-ons to complete your financial infrastructure.
                </p>
            </div>

            {/* Unified Carousel for Mobile and Desktop */}
            <SwipeableCarousel
                autoplay={true}
                loop={true}
                showArrows={true}
                showDots={true}
                snapAlign="start"
                slidesToScroll={1}
                gap={24}
                slideClassName="w-[85vw] max-w-[340px] md:w-[calc(50%-12px)] md:max-w-none lg:w-[calc(33.333%-16px)]"
            >
                {serviceCards}
            </SwipeableCarousel>
        </div>
    );
}

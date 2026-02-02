"use client";

import { CheckCircle2 } from "lucide-react";
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

function ServiceCard({ service }: { service: PricingTier }) {
    return (
        <div className="h-full bg-white rounded-xl p-6 border border-zinc-100 shadow-sm hover:shadow-lg hover:border-gold-500/20 hover:bg-brand-50/10 transition-all duration-300 group">
            {/* Header: Title and Price */}
            <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-brand-900 text-lg font-heading group-hover:text-gold-600 transition-colors">
                    {service.name}
                </h3>
                <div className="text-right">
                    <span className="block font-mono font-bold text-brand-900 tabular-nums">
                        {service.price}
                    </span>
                    {service.billingPeriod && (
                        <span className="text-[10px] text-brand-900/50 uppercase font-bold tracking-wider">
                            /{service.billingPeriod}
                        </span>
                    )}
                </div>
            </div>

            {/* Body: Features */}
            {service.features && service.features.length > 0 && (
                <ul className="space-y-2.5 mb-4">
                    {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-brand-900/70">
                            <CheckCircle2 className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            )}

            {/* Footer: Tagline */}
            {service.tagline && (
                <p className="text-sm text-brand-900/60 pt-4 border-t border-brand-900/5 italic">
                    {service.tagline}
                </p>
            )}
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
        <div className="max-w-7xl mx-auto px-6 mt-24 pb-24">
            <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-brand-900 font-heading mb-3">Additional Services</h2>
                <p className="text-brand-900/60 max-w-2xl mx-auto text-sm">
                    Specialized add-ons to complete your financial infrastructure.
                </p>
            </div>

            {/* Mobile: Swipeable Carousel */}
            <div className="md:hidden">
                <SwipeableCarousel
                    showArrows={false}
                    showDots={true}
                    snapAlign="start"
                    slidesToScroll={1}
                    gap={16}
                    slideClassName="w-[85vw] max-w-[340px]"
                >
                    {serviceCards}
                </SwipeableCarousel>
            </div>

            {/* Desktop: Responsive Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {serviceCards}
            </div>
        </div>
    );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SwipeableCarousel } from "@/components/ui/SwipeableCarousel";
import { CheckCircle2, FileClock, FileWarning, Map, FileSignature, Sparkles, X, Calendar, ArrowRight, LucideIcon } from "lucide-react";
import Link from "next/link";

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
    relatedService?: {
        title?: string;
        slug?: { current: string };
        shortDescription?: string;
        icon?: string;
    } | null;
}

interface OptionalServicesProps {
    tiers: PricingTier[];
}

// Map of icon names to components
const iconMap: Record<string, LucideIcon> = {
    'Notebook': FileClock,
    'BarChart3': FileClock,
    'Building2': Map,
    'LineChart': FileSignature,
    'FileCheck': FileWarning,
    'Rocket': Sparkles,
    'Briefcase': FileSignature,
};

interface ServiceIconProps {
    slug: string;
    iconName?: string;
    className?: string;
}

function ServiceIcon({ slug, iconName, className }: ServiceIconProps) {
    // If iconName is provided from Sanity, use it
    if (iconName && iconMap[iconName]) {
        const IconComponent = iconMap[iconName];
        return <IconComponent className={className} />;
    }
    
    // Fallback to slug matching
    if (slug?.includes('prior')) return <FileClock className={className} />;
    if (slug?.includes('irs') || slug?.includes('notice')) return <FileWarning className={className} />;
    if (slug?.includes('state')) return <Map className={className} />;
    if (slug?.includes('amend')) return <FileSignature className={className} />;
    
    return <Sparkles className={className} />;
}

// Modal Component
interface ServiceModalProps {
    service: PricingTier | null;
    isOpen: boolean;
    onClose: () => void;
}

function ServiceModal({ service, isOpen, onClose }: ServiceModalProps) {
    // Scroll lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEscape);
        }
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!service) return null;

    const description = service.relatedService?.shortDescription || service.tagline || "";
    const serviceSlug = service.relatedService?.slug?.current || service.slug?.current;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-brand-950/60 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 300,
                            duration: 0.3
                        }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div 
                            className="relative w-full max-w-lg bg-white rounded-2xl border border-white/20 shadow-2xl pointer-events-auto overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Decorative gradient */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-900/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-700 transition-all z-10"
                                aria-label="Close modal"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="relative z-0 p-8">
                                {/* Header: Icon & Title */}
                                <div className="mb-6">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 border border-brand-200 flex items-center justify-center text-brand-900 mb-5">
                                        <ServiceIcon 
                                            slug={service.slug?.current} 
                                            iconName={service.relatedService?.icon} 
                                            className="w-7 h-7" 
                                        />
                                    </div>
                                    <h2 className="text-2xl font-bold text-brand-900 font-heading">
                                        {service.name}
                                    </h2>
                                </div>

                                {/* Description */}
                                {description && (
                                    <p className="text-zinc-600 leading-relaxed mb-6 text-base">
                                        {description}
                                    </p>
                                )}

                                {/* Features / Deliverables */}
                                {service.features && service.features.length > 0 && (
                                    <div className="mb-8">
                                        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">
                                            What&apos;s Included
                                        </h3>
                                        <ul className="space-y-3">
                                            {service.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-sm text-zinc-700">
                                                    <div className="w-5 h-5 rounded-full bg-gold-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <CheckCircle2 className="w-3 h-3 text-gold-500" />
                                                    </div>
                                                    <span className="leading-relaxed">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Pricing */}
                                <div className="flex items-baseline gap-2 mb-8 p-4 bg-brand-50/50 rounded-xl border border-brand-100">
                                    <span className="text-3xl font-bold text-brand-900 font-heading">
                                        {service.price}
                                    </span>
                                    {service.billingPeriod && (
                                        <span className="text-sm font-bold text-zinc-400 uppercase tracking-wider">
                                            /{service.billingPeriod}
                                        </span>
                                    )}
                                </div>

                                {/* Footer: CTAs */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Link
                                        href={`/contact?service=${serviceSlug}`}
                                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gold-500 hover:bg-gold-600 text-brand-950 font-bold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-gold-500/20"
                                    >
                                        <Calendar className="w-5 h-5" />
                                        Schedule Consultation
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <button
                                        onClick={onClose}
                                        className="sm:w-auto px-6 py-3.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-semibold rounded-xl transition-all"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

interface ServiceCardProps {
    service: PricingTier;
    onClick: () => void;
}

function ServiceCard({ service, onClick }: ServiceCardProps) {
    return (
        <button
            onClick={onClick}
            className="h-full w-full text-left bg-white rounded-2xl p-8 border border-zinc-100 shadow-sm hover:shadow-xl hover:border-gold-500/20 hover:scale-[1.02] transition-all duration-300 group flex flex-col relative overflow-hidden cursor-pointer"
        >
            {/* Soft Gradient Background Element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-opacity group-hover:opacity-100 opacity-0" />

            {/* Header: Icon & Title */}
            <div className="mb-6 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-900 mb-5 group-hover:bg-gold-500 group-hover:border-gold-500 group-hover:text-white transition-all duration-300">
                    <ServiceIcon 
                        slug={service.slug?.current} 
                        iconName={service.relatedService?.icon} 
                        className="w-6 h-6" 
                    />
                </div>
                <h3 className="font-bold text-brand-900 text-xl font-heading leading-tight group-hover:text-brand-700 transition-colors">
                    {service.name}
                </h3>
                {service.tagline && (
                    <p className="text-sm text-zinc-500 mt-2 leading-relaxed line-clamp-2">
                        {service.tagline}
                    </p>
                )}
            </div>

            {/* Body: Features */}
            {service.features && service.features.length > 0 && (
                <div className="mb-8 flex-1">
                    <ul className="space-y-3">
                        {service.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-zinc-600">
                                <CheckCircle2 className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                                <span className="leading-snug line-clamp-1">{feature}</span>
                            </li>
                        ))}
                        {service.features.length > 3 && (
                            <li className="text-xs text-zinc-400 font-medium">
                                +{service.features.length - 3} more features
                            </li>
                        )}
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
        </button>
    );
}

export function OptionalServices({ tiers }: OptionalServicesProps) {
    const [selectedService, setSelectedService] = useState<PricingTier | null>(null);

    const handleCardClick = useCallback((service: PricingTier) => {
        setSelectedService(service);
    }, []);

    const handleCloseModal = useCallback(() => {
        setSelectedService(null);
    }, []);

    // Filter for Optional tiers
    const optionalServices = tiers?.filter(t => t.category === "optional") || [];

    if (optionalServices.length === 0) return null;

    // Create card elements for both mobile and desktop
    const serviceCards = optionalServices.map((service) => (
        <ServiceCard 
            key={service._id} 
            service={service} 
            onClick={() => handleCardClick(service)}
        />
    ));

    return (
        <>
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

            {/* Modal */}
            <ServiceModal
                service={selectedService}
                isOpen={!!selectedService}
                onClose={handleCloseModal}
            />
        </>
    );
}

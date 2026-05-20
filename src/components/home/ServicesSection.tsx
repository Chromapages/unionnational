"use client";

import { useTranslations } from "next-intl";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ArrowRight, ChevronRight, Zap, Target as TargetIcon, TrendingUp, ShieldCheck, LucideIcon, PieChart, Briefcase } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { fallbackServices, getServiceHref } from "@/components/layout/navigationData";

const ICON_MAP: Record<string, LucideIcon> = {
    Zap,
    Target: TargetIcon,
    TrendingUp,
    ShieldCheck,
    PieChart,
    Briefcase
};

interface Service {
    _id?: string;
    title: string;
    shortDescription: string;
    icon?: string;
    slug?: { current: string };
    badge?: string;
}

interface ServicesSectionProps {
    services: Service[];
    data?: {
        servicesEyebrow?: string;
        servicesTitle?: string;
        servicesSubtitle?: string;
        servicesButtonText?: string;
    };
}

export function ServicesSection({ services = [], data }: ServicesSectionProps) {
    const t = useTranslations("HomePage.ServicesSection");

    const eyebrow = data?.servicesEyebrow || t("eyebrow");
    const title = data?.servicesTitle || t("title");
    const subtitle = data?.servicesSubtitle || t("subtitle");
    const buttonText = data?.servicesButtonText || t("viewAllCta");

    const prioritySlugs = ['s-corp-tax-advantage', 'fractional-cfo', 'tax-planning'];
    
    // Map props services to priority services
    const priorityServicesMap = new Map<string, Service>();
    services.forEach(s => {
        if (s.slug?.current && prioritySlugs.includes(s.slug.current)) {
            priorityServicesMap.set(s.slug.current, s);
        }
    });

    // Make sure we have all three, fallback to local static data if missing from sanity
    const priorityServices: Service[] = prioritySlugs.map(slug => {
        let currentService: Service;
        if (priorityServicesMap.has(slug)) {
            currentService = { ...priorityServicesMap.get(slug)! };
        } else {
            const fallback = fallbackServices.find(f => f.slug?.current === slug);
            currentService = {
                title: fallback?.title || slug,
                shortDescription: fallback?.shortDescription || '',
                icon: fallback?.icon || 'Zap',
                slug: { current: slug }
            };
        }

        // Keep the subtitle detailed, premium, and uniform across all priority cards
        if (slug === 'tax-planning') {
            currentService.shortDescription = "Implement proactive tax-saving strategies to legally minimize your liability, optimize deductions, and shield business wealth.";
        } else if (slug === 's-corp-tax-advantage') {
            currentService.shortDescription = "Optimize your entity structure to legally reduce self-employment taxes, protect assets, and maximize your take-home pay.";
        } else if (slug === 'fractional-cfo') {
            currentService.shortDescription = "Leverage high-level financial leadership, cash flow forecasting, and strategic metrics to guide sustainable business scaling.";
        }

        return currentService;
    });

    return (
        <section
            id="services"
            className="relative py-24 sm:py-32 bg-white overflow-hidden"
        >
            {/* Subtle top divider */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 lg:mb-20 max-w-4xl mx-auto">
                    <RevealOnScroll>
                        <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-gold-600 font-sans mb-6">
                            {eyebrow}
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-brand-900 font-heading leading-[1.05] mb-6">
                            {title}
                        </h2>
                        <p className="text-slate-500 leading-relaxed font-sans text-lg md:text-xl font-light max-w-2xl mx-auto">
                            {subtitle}
                        </p>
                    </RevealOnScroll>
                </div>

                {/* Priority Strategy Grid — 3 columns on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
                    {priorityServices.map((service, index) => {
                        const Icon = ICON_MAP[service.icon || ''] || Zap;
                        return (
                            <RevealOnScroll key={index} delay={index * 100}>
                                <div className="group relative h-full bg-brand-900 rounded-3xl p-8 lg:p-10 overflow-hidden flex flex-col transition-all duration-500 hover:shadow-premium">

                                    {/* Subtle decorative gradient orb */}
                                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                    {/* Card Header */}
                                    <div className="flex items-start justify-between mb-auto">
                                        <div className="w-14 h-14 rounded-2xl bg-gold-500 flex items-center justify-center text-brand-900 shadow-lg group-hover:scale-105 transition-transform duration-500">
                                            <Icon size={26} strokeWidth={2} aria-hidden="true" />
                                        </div>
                                        <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-gold-500/80 px-3 py-1.5 bg-gold-500/10 rounded-full border border-gold-500/20">
                                            {t("pillarBadge")}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="mt-8">
                                        <h3 className="text-2xl lg:text-3xl font-black text-white tracking-tight font-heading leading-tight mb-4">
                                            {service.title}
                                        </h3>
                                        <p className="text-slate-400 leading-relaxed text-base lg:text-lg font-light mb-8">
                                            {service.shortDescription}
                                        </p>
                                    </div>

                                    {/* Footer CTA */}
                                    <Link
                                        href={getServiceHref(service)}
                                        className="inline-flex items-center gap-3 text-sm font-bold text-gold-500 hover:text-gold-400 transition-colors duration-300 group/link mt-auto"
                                    >
                                        <span className="uppercase tracking-[0.1em] text-xs">
                                            {t("serviceCta")}
                                        </span>
                                        <ArrowRight size={18} aria-hidden="true" className="group-hover/link:translate-x-2 transition-transform duration-300" />
                                    </Link>
                                </div>
                            </RevealOnScroll>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 lg:mt-20 text-center">
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 text-brand-900 font-bold uppercase tracking-[0.12em] text-xs hover:text-gold-600 transition-colors duration-300 group"
                    >
                        <span>{buttonText}</span>
                        <ChevronRight size={16} aria-hidden="true" className="group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

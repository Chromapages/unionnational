"use client";

import { useTranslations } from "next-intl";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ArrowRight, Zap, Target as TargetIcon, TrendingUp, ShieldCheck, LucideIcon, PieChart, Briefcase } from "lucide-react";
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

        // Use fallback only when shortDescription is empty (preserve CMS content)
        if (!currentService.shortDescription && slug === 'tax-planning') {
            currentService.shortDescription = "Implement proactive tax-saving strategies to legally minimize your liability, optimize deductions, and shield business wealth.";
        } else if (!currentService.shortDescription && slug === 's-corp-tax-advantage') {
            currentService.shortDescription = "Optimize your entity structure to legally reduce self-employment taxes, protect assets, and maximize your take-home pay.";
        } else if (!currentService.shortDescription && slug === 'fractional-cfo') {
            currentService.shortDescription = "Leverage high-level financial leadership, cash flow forecasting, and strategic metrics to guide sustainable business scaling.";
        }

        return currentService;
    });

    // CTA copy and qualifiers vary per pillar
    const pillarMeta: Record<string, { cta: string; qualifier: string }> = {
        "s-corp-tax-advantage": {
            cta: "See S-Corp Savings",
            qualifier: "For contractors, consultants & high-earning sole proprietors",
        },
        "fractional-cfo": {
            cta: "Meet a Fractional CFO",
            qualifier: "For growing businesses ready for financial leadership",
        },
        "tax-planning": {
            cta: "Build My Tax Plan",
            qualifier: "For owners who want year-round proactive strategy",
        },
    };

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
                        <span className="home-eyebrow mb-4 block text-gold-700">
                            {eyebrow}
                        </span>
                        <h2 className="home-section-heading mb-6 text-brand-900">
                            {title}
                        </h2>
                        <p className="home-supporting-copy mx-auto max-w-2xl text-slate-600">
                            {subtitle}
                        </p>
                    </RevealOnScroll>
                </div>

                {/* Priority Strategy Grid — 3 columns on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
                    {priorityServices.map((service, index) => {
                        const Icon = ICON_MAP[service.icon || ''] || Zap;
                        const meta = pillarMeta[service.slug?.current || ''] || {
                            cta: t("serviceCta"),
                            qualifier: null,
                        };
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
                                        <span className="home-eyebrow rounded-full border border-gold-500/20 bg-gold-500/10 px-3 py-1.5 text-gold-400">
                                            {t("pillarBadge")}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="mt-8">
                                        <h3 className="home-card-heading mb-2 text-white">
                                            {service.title}
                                        </h3>
                                        {/* "Who this is for" qualifier */}
                                        {meta.qualifier && (
                                            <p className="text-xs text-gold-500/70 mb-4 leading-relaxed">
                                                {meta.qualifier}
                                            </p>
                                        )}
                                        <p className="text-slate-400 leading-relaxed text-base lg:text-lg font-light">
                                            {service.shortDescription}
                                        </p>
                                    </div>

                                    {/* Footer CTA — varied copy per pillar */}
                                    <Link
                                        href={service.slug?.current ? getServiceHref(service) : '#'}
                                        aria-disabled={!service.slug?.current}
                                        className="inline-flex items-center gap-3 text-sm font-bold text-gold-500 hover:text-gold-400 transition-colors duration-300 group/link mt-auto"
                                    >
                                        <span className="uppercase tracking-[0.1em] text-xs">
                                            {meta.cta}
                                        </span>
                                        <ArrowRight size={18} aria-hidden="true" className="group-hover/link:translate-x-2 transition-transform duration-300" />
                                    </Link>
                                </div>
                            </RevealOnScroll>
                        );
                    })}
                </div>

                {/* Bottom CTA — primary button pattern */}
                <div className="mt-16 lg:mt-20 text-center">
                    <Link
                        href="/services"
                        className="inline-flex min-h-[56px] items-center justify-center gap-3 rounded-full bg-gold-500 px-10 py-4 text-brand-950 font-bold font-heading text-base tracking-wide transition-all duration-200 hover:bg-gold-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
                    >
                        <span>{buttonText}</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}

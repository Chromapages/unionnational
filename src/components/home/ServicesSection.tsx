"use client";

import { useTranslations } from "next-intl";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ArrowRight, ChevronRight, Zap, Target as TargetIcon, TrendingUp, ShieldCheck, LucideIcon, PieChart } from "lucide-react";
import { Link } from "@/i18n/navigation";

const ICON_MAP: Record<string, LucideIcon> = {
    Zap,
    Target: TargetIcon,
    TrendingUp,
    ShieldCheck,
    PieChart
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

    // Extract Sanity data with local fallbacks
    const eyebrow = data?.servicesEyebrow || t("eyebrow");
    const title = data?.servicesTitle || t("title");
    const subtitle = data?.servicesSubtitle || t("subtitle");
    const buttonText = data?.servicesButtonText || t("viewAllCta");

    // Priority Services mapping
    const prioritySlugs = ['s-corp-tax-advantage', 'fractional-cfo', 'tax-planning'];
    const priorityServices = services.filter(s => prioritySlugs.includes(s.slug?.current || ''));
    const industryCards = [
        { title: t("industries.construction.title"), icon: ShieldCheck, slug: "construction", desc: t("industries.construction.description") },
        { title: t("industries.restaurants.title"), icon: TrendingUp, slug: "restaurants", desc: t("industries.restaurants.description") }
    ];

    return (
        <section
            id="services"
            className="relative py-24 sm:py-32 bg-white overflow-hidden border-y border-slate-100"
        >
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="text-center mb-16 lg:mb-20 max-w-3xl mx-auto">
                    <RevealOnScroll>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold-600 font-heading block mb-6">
                            {eyebrow}
                        </span>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-brand-900 font-heading leading-[1.1] mb-8">
                            {title}
                        </h2>
                        <p className="text-slate-600 leading-relaxed font-sans text-xl font-light">
                            {subtitle}
                        </p>
                    </RevealOnScroll>
                </div>

                {/* Priority Strategy Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {priorityServices.map((service, index) => {
                        const Icon = ICON_MAP[service.icon || ''] || Zap;
                        return (
                            <RevealOnScroll key={index} delay={index * 150}>
                                <div className="group h-full bg-brand-950 p-10 rounded-[2.5rem] border border-white/5 shadow-2xl hover:border-gold-500/30 transition-all duration-500 relative overflow-hidden flex flex-col">
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-gold-500/5 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    
                                    <div className="flex justify-between items-start mb-10">
                                        <div className="w-16 h-16 rounded-2xl bg-gold-500 flex items-center justify-center text-brand-900 shadow-lg shadow-gold-500/20 group-hover:scale-110 transition-transform">
                                            <Icon size={32} aria-hidden="true" />
                                        </div>
                                        <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-gold-400">
                                            {t("pillarBadge")}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-black text-white mb-6 font-heading tracking-tighter leading-tight">
                                        {service.title}
                                    </h3>
                                    <p className="text-slate-400 leading-relaxed mb-10 text-lg font-light flex-1">
                                        {service.shortDescription}
                                    </p>

                                    <Link
                                        href={`/services/${service.slug?.current || ''}`}
                                        className="inline-flex items-center gap-3 text-lg font-black text-gold-500 hover:text-gold-400 transition-colors mt-auto group/link"
                                    >
                                        {t("serviceCta")}
                                        <ArrowRight size={24} aria-hidden="true" className="group-hover/link:translate-x-2 transition-transform" />
                                    </Link>
                                </div>
                            </RevealOnScroll>
                        );
                    })}
                </div>

                {/* Industry Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {industryCards.map((industry, i) => (
                        <RevealOnScroll key={i} delay={i * 200}>
                            <Link href={`/industries/${industry.slug}`} className="group block">
                                <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-200 flex items-center gap-8 hover:bg-white hover:border-gold-500/20 hover:shadow-xl transition-all h-full">
                                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-gold-600 shadow-sm group-hover:bg-brand-950 group-hover:text-gold-500 group-hover:border-brand-950 transition-all">
                                        <industry.icon size={28} aria-hidden="true" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-brand-900 font-heading mb-1">{industry.title}</h4>
                                        <p className="text-sm text-slate-500 font-medium">{industry.desc}</p>
                                    </div>
                                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowRight size={24} aria-hidden="true" className="text-gold-500" />
                                    </div>
                                </div>
                            </Link>
                        </RevealOnScroll>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 text-brand-900 font-black uppercase tracking-widest text-sm hover:text-gold-600 transition-colors group"
                    >
                        {buttonText} <ChevronRight size={18} aria-hidden="true" className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

"use client";

import { useTranslations } from "next-intl";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ArrowRight, ChevronRight, Zap, Target, TrendingUp, ShieldCheck, LucideIcon, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

const ICON_MAP: Record<string, LucideIcon> = {
    Zap,
    Target,
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
    data?: any;
}

export function ServicesSection({ services = [], data }: ServicesSectionProps) {
    const t = useTranslations("HomePage.ServicesSection");

    // Extract Sanity data with local fallbacks
    const eyebrow = data?.servicesEyebrow || t('eyebrow');
    const title = data?.servicesTitle || t('title');
    const subtitle = data?.servicesSubtitle || t('subtitle');
    const buttonText = data?.servicesButtonText || t('buttonText');

    return (
        <section
            id="services"
            className="relative py-20 sm:py-24 lg:py-32 bg-slate-50 overflow-hidden border-t border-slate-100"
        >
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
                    <RevealOnScroll className="max-w-3xl">
                        <div className="mb-4">
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600 font-heading">
                                {eyebrow}
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-brand-900 font-heading leading-[1.1] mb-6">
                            {title}
                        </h2>
                        <p className="text-slate-600 leading-relaxed font-sans text-base md:text-lg max-w-2xl">
                            {subtitle}
                        </p>
                    </RevealOnScroll>

                    <RevealOnScroll delay={0.2}>
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-2 group text-brand-900 font-bold hover:text-gold-600 transition-colors"
                        >
                            {buttonText}
                            <div className="w-8 h-8 rounded-full bg-brand-900 text-white flex items-center justify-center group-hover:bg-gold-500 group-hover:text-brand-900 transition-all duration-300">
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </Link>
                    </RevealOnScroll>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.length > 0 ? (
                        services.map((service, index) => {
                            const Icon = ICON_MAP[service.icon || ''] || Zap;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                                >
                                    {/* Card decoration */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-gold-400/10 transition-colors" />

                                    <div className="relative z-10">
                                        <div className="mb-6 flex justify-between items-start">
                                            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-brand-900 group-hover:bg-brand-900 group-hover:text-white transition-all duration-300 shadow-inner">
                                                <Icon className="w-7 h-7" />
                                            </div>
                                            {service.badge && (
                                                <span className="px-3 py-1 bg-gold-500/10 text-gold-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-gold-500/20">
                                                    {service.badge}
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-xl lg:text-2xl font-bold mb-4 text-brand-900 font-heading">
                                            {service.title}
                                        </h3>
                                        <p className="text-slate-500 leading-relaxed mb-8 text-sm md:text-base">
                                            {service.shortDescription}
                                        </p>

                                        <Link
                                            href={`/services/${service.slug?.current || ''}`}
                                            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-900 group-hover:text-gold-600 transition-colors"
                                        >
                                            Learn More
                                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </motion.div>
                            );
                        })
                    ) : (
                        <div className="col-span-full py-12 text-center text-slate-400 italic">
                            No services found. Add services in Sanity.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

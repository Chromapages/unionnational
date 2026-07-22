"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import * as Icons from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { mapCategory } from "@/components/layout/navigationData";
import { SectionHeader } from "@/components/ui/SectionHeader";

// Helper to resolve icon string to component
const getIcon = (iconName: string) => {
    // @ts-expect-error - Lucide exports aren't typed for dynamic access
    return Icons[iconName] || Icons.Briefcase;
};

export interface Service {
    _id: string;
    title: string;
    slug: { current: string };
    shortDescription: string;
    icon: string;
    features: string[];
    impactGoal: string;
    badge?: string;
    category?: string;
    startingPrice?: string;
    isPopular?: boolean;
    accentColor?: string;
}

interface ServicesClientProps {
    services: Service[];
}

export function ServicesClient({ services }: ServicesClientProps) {
    const t = useTranslations("Header");

    const categories = [
        { id: "Tax Strategy", labelKey: "servicesDropdownTaxStrategyLabel" },
        { id: "Financial Control", labelKey: "servicesDropdownFinancialControlLabel" },
        { id: "Compliance Support", labelKey: "servicesDropdownComplianceSupportLabel" }
    ];

    // Internal Card Component for reuse
    const ServiceCard = ({ service, className }: { service: Service; className?: string }) => {
        const Icon = getIcon(service.icon);
        return (
            <div className={`group relative bg-white rounded-2xl p-5 md:p-8 shadow-sm border border-zinc-200 hover:shadow-xl hover:border-gold-200 transition-all duration-300 flex flex-col h-full ${className}`}>
                {service.badge && (
                    <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-gold-100 text-gold-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Recommended
                    </div>
                )}

                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-brand-50 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-brand-900 transition-colors duration-300">
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-brand-900 group-hover:text-gold-500 transition-colors duration-300" />
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-brand-900 mb-2 md:mb-3 font-heading group-hover:text-gold-600 transition-colors">
                    {service.title}
                </h3>

                <p className="h-10 overflow-hidden text-sm leading-5 text-zinc-600 mb-4 md:mb-6 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                    {service.shortDescription}
                </p>

                {service.startingPrice && (
                    <div className="mb-4 pb-4 md:mb-6 md:pb-6 border-b border-zinc-100">
                        <p className="text-xs text-zinc-400 uppercase tracking-wide font-semibold mb-1">Starting at</p>
                        <p className="text-lg font-bold text-brand-900">{service.startingPrice}</p>
                    </div>
                )}

                <ul className="space-y-2 mb-5 md:space-y-3 md:mb-8">
                    {service.features?.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm leading-5 text-zinc-600">
                            <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{feature}</span>
                        </li>
                    ))}
                </ul>

                <Link
                    href={`/services/${service.slug.current}`}
                    className="mt-auto w-full min-h-11 py-2.5 md:py-3 rounded-xl border border-brand-200 text-brand-900 font-semibold flex items-center justify-center gap-2 group-hover:bg-brand-900 group-hover:text-white group-hover:border-brand-900 transition-all font-heading tracking-tight"
                >
                    View Details
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        );
    };

    return (
        <div className="relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="space-y-16 md:space-y-24">
                    {categories.map((category) => {
                        const categoryServices = services.filter(s => mapCategory(s.category) === category.id);
                        if (categoryServices.length === 0) return null;

                        return (
                            <div key={category.id} className="scroll-mt-[calc(var(--header-height)+1.5rem)]">
                                <SectionHeader label="Core Services" heading={t(category.labelKey)} className="mb-10" />

                                <motion.div
                                    layout
                                    className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
                                >
                                    <AnimatePresence mode="popLayout">
                                        {categoryServices.map((service) => (
                                            <motion.div
                                                layout
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.3 }}
                                                key={service._id}
                                                className="h-full"
                                            >
                                                <ServiceCard service={service} className="h-full" />
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
                <aside className="mt-16 rounded-2xl border border-brand-100 bg-brand-50 px-5 py-5 text-center md:mt-24">
                    <p className="text-sm font-semibold text-brand-900">Own a construction or restaurant business?</p>
                    <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-bold text-brand-700">
                        <Link href="/vsl/construction" className="inline-flex min-h-11 items-center underline decoration-gold-500 underline-offset-4 hover:text-brand-900">Explore construction CFO programs →</Link>
                        <Link href="/vsl/restaurants" className="inline-flex min-h-11 items-center underline decoration-gold-500 underline-offset-4 hover:text-brand-900">Explore restaurant CFO programs →</Link>
                    </div>
                </aside>
            </div>
        </div>
    );
}

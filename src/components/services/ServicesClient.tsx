"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import * as Icons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    const filteredServices = services;

    return (
        <div className="relative min-h-screen pb-20">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredServices.map((service) => {
                            const Icon = getIcon(service.icon);
                            return (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    key={service._id}
                                    className="group relative bg-white rounded-2xl p-8 shadow-sm border border-zinc-200 hover:shadow-xl hover:border-gold-200 transition-all duration-300 flex flex-col h-full"
                                >
                                    {service.badge && (
                                        <div className="absolute top-4 right-4 bg-gold-100 text-gold-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                            {service.badge}
                                        </div>
                                    )}

                                    <div className="w-14 h-14 rounded-xl bg-brand-50 flex items-center justify-center mb-6 group-hover:bg-brand-900 transition-colors duration-300">
                                        <Icon className="w-7 h-7 text-brand-900 group-hover:text-gold-500 transition-colors duration-300" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-brand-900 mb-3 font-heading group-hover:text-gold-600 transition-colors">
                                        {service.title}
                                    </h3>

                                    <p className="text-zinc-600 mb-6 line-clamp-3 flex-grow">
                                        {service.shortDescription}
                                    </p>

                                    {service.startingPrice && (
                                        <div className="mb-6 pb-6 border-b border-zinc-100">
                                            <p className="text-xs text-zinc-400 uppercase tracking-wide font-semibold mb-1">Starting at</p>
                                            <p className="text-lg font-bold text-brand-900">{service.startingPrice}</p>
                                        </div>
                                    )}

                                    <ul className="space-y-3 mb-8">
                                        {service.features?.slice(0, 3).map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                                                <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        href={`/services/${service.slug.current}`}
                                        className="mt-auto w-full py-3 rounded-xl border border-brand-200 text-brand-900 font-semibold flex items-center justify-center gap-2 group-hover:bg-brand-900 group-hover:text-white group-hover:border-brand-900 transition-all"
                                    >
                                        View Details
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}

"use client";

import { useTranslations } from "next-intl";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import {
    Globe, ShieldCheck, HardHat, Zap, Cloud,
    CheckCircle2, LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const ICON_MAP: Record<string, LucideIcon> = {
    Globe,
    ShieldCheck,
    HardHat,
    Zap,
    Cloud,
};

interface Feature {
    icon: string;
    title: string;
    description: string;
}

interface NationwideServiceSectionProps {
    data?: any;
}

export function NationwideServiceSection({ data }: NationwideServiceSectionProps) {
    const t = useTranslations("HomePage.NationwideServiceSection");

    // Extract Sanity data with local fallbacks
    const badge = data?.nationwideBadge || t('badge');
    const title = data?.nationwideTitle || t('title');
    const subtitle = data?.nationwideSubtitle || t('subtitle');
    const features = data?.nationwideFeatures || [];

    return (
        <section className="py-20 sm:py-24 lg:py-32 bg-[#0d2e2b] relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/images/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Text Content */}
                    <div className="order-2 lg:order-1">
                        <RevealOnScroll>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-bold uppercase tracking-widest mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse"></span>
                                {badge}
                            </div>

                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-heading tracking-tight leading-[1.1]">
                                {title}
                            </h2>

                            <p className="text-slate-300 text-lg leading-relaxed mb-12 max-w-xl font-sans">
                                {subtitle}
                            </p>

                            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
                                {features.length > 0 ? (
                                    features.map((feature: Feature, index: number) => {
                                        const Icon = ICON_MAP[feature.icon] || CheckCircle2;
                                        return (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                viewport={{ once: true }}
                                                className="group"
                                            >
                                                <div className="flex items-center gap-4 mb-3">
                                                    <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-brand-900 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                                                        <Icon className="w-5 h-5" />
                                                    </div>
                                                    <h4 className="text-white font-bold text-lg font-heading group-hover:text-gold-400 transition-colors">
                                                        {feature.title}
                                                    </h4>
                                                </div>
                                                <p className="text-slate-400 text-sm leading-relaxed pl-14">
                                                    {feature.description}
                                                </p>
                                            </motion.div>
                                        );
                                    })
                                ) : (
                                    <div className="text-slate-500 italic">Configure features in Sanity Studio</div>
                                )}
                            </div>
                        </RevealOnScroll>
                    </div>

                    {/* Visual content */}
                    <div className="order-1 lg:order-2">
                        <RevealOnScroll delay={0.2} className="relative">
                            <div className="relative aspect-square max-w-[500px] mx-auto">
                                {/* Decorative US Map background or similar */}
                                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 to-transparent rounded-[2.5rem] border border-white/5 backdrop-blur-[2px] overflow-hidden group">
                                    <div className="absolute inset-0 opacity-10 pointer-events-none transition-opacity group-hover:opacity-20 duration-700">
                                        {/* Fallback pattern if map SVG is missing */}
                                        <div className="w-full h-full bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:20px_20px]" />
                                    </div>

                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center p-8">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                                className="w-24 h-24 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-gold-500/20"
                                            >
                                                <Globe className="w-12 h-12 text-gold-500" />
                                            </motion.div>
                                            <h3 className="text-white font-bold text-2xl mb-4 font-heading">
                                                Federal & State <br /> Authority
                                            </h3>
                                            <p className="text-slate-400 font-medium leading-relaxed max-w-[240px] mx-auto text-sm">
                                                Handling multi-state complexity <br /> for contractors in every zip code.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Scan Line effect */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-500/5 to-transparent h-24 -translate-y-full animate-scan-slow pointer-events-none" />
                                </div>

                                {/* Floating Stats */}
                                <motion.div
                                    initial={{ x: 20, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="absolute -top-6 -right-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl z-20"
                                >
                                    <div className="text-gold-500 font-bold text-3xl mb-1">50</div>
                                    <div className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">States Licensed</div>
                                </motion.div>

                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    className="absolute -bottom-6 -left-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl z-20"
                                >
                                    <div className="text-gold-500 font-bold text-3xl mb-1">100%</div>
                                    <div className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">IRS Authorized</div>
                                </motion.div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scan {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(500%); }
                }
                .animate-scan-slow {
                    animation: scan 8s linear infinite;
                }
            `}</style>
        </section>
    );
}

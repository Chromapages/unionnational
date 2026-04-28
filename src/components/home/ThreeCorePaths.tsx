"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, CircleDollarSign, LineChart, Factory, CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export const ThreeCorePaths = () => {
    const t = useTranslations("HomePage.ThreeCorePaths");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const paths = [
        {
            id: "path1",
            icon: CircleDollarSign,
            key: "path1",
            href: "/book",
            color: "gold"
        },
        {
            id: "path2",
            icon: LineChart,
            key: "path2",
            href: "/health-check",
            color: "gold"
        },
        {
            id: "path3",
            icon: Factory,
            key: "path3",
            href: "/industries",
            color: "gold"
        }
    ];

    // Prevent hydration mismatch by returning a stable structure during initial client render
    if (!isMounted) {
        return (
            <section className="relative overflow-hidden border-y border-slate-100 bg-white py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-[600px] animate-pulse bg-slate-50/50 rounded-[2.5rem]" />
                </div>
            </section>
        );
    }

    return (
        <section suppressHydrationWarning className="relative overflow-hidden border-y border-slate-100 bg-white py-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.05)_0,_transparent_45%)] pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block rounded-full border border-gold-500/15 bg-gold-500/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gold-700"
                    >
                        {t("eyebrow")}
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mb-6 text-4xl font-bold tracking-tight text-brand-950 md:text-5xl lg:text-6xl font-heading"
                    >
                        {t("title")}
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mx-auto max-w-2xl text-xl font-light text-slate-600"
                    >
                        {t("subtitle")}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {paths.map((path, index) => (
                        <motion.div
                            key={path.id}
                            initial={{ opacity: 0, scale: 0.95, y: 40 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                            className="group relative flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-1 hover:border-gold-500/30 hover:shadow-[0_24px_80px_rgba(212,175,55,0.12)]"
                        >
                            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-gold-500/15 bg-gold-500/10 text-gold-600 transition-transform duration-500 group-hover:scale-110">
                                <path.icon size={28} aria-hidden="true" />
                            </div>

                            <h3 className="mb-4 text-2xl font-bold text-brand-950 transition-colors group-hover:text-gold-700">
                                {t(`${path.key}.title`)}
                            </h3>

                            <p className="mb-8 flex-grow leading-relaxed text-slate-600">
                                {t(`${path.key}.description`)}
                            </p>

                            <div className="space-y-3 mb-8">
                                {[0, 1, 2].map((itemIdx) => (
                                    <div key={itemIdx} className="flex items-start gap-3 text-sm text-slate-700">
                                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-gold-600" aria-hidden="true" />
                                        <span>{t(`${path.key}.items.${itemIdx}`)}</span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href={path.href}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-brand-900/10 px-4 py-4 font-bold text-brand-950 transition-all duration-300 hover:border-gold-500/30 hover:bg-gold-500 hover:text-brand-950"
                            >
                                {t(`${path.key}.cta`)}
                                <ArrowRight size={18} />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};


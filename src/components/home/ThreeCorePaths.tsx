"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, CircleDollarSign, LineChart, Factory, CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";

export const ThreeCorePaths = () => {
    const t = useTranslations("HomePage.ThreeCorePaths");

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

    return (
        <section className="py-24 bg-brand-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase text-gold-500 bg-gold-500/10 rounded-full border border-gold-500/20"
                    >
                        {t("eyebrow")}
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 tracking-tight"
                    >
                        {t("title")}
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-400 max-w-2xl mx-auto font-light"
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
                            className="group relative flex flex-col h-full p-8 rounded-[2rem] border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent hover:border-gold-500/30 hover:from-gold-500/10 transition-all duration-500"
                        >
                            <div className="mb-8 w-14 h-14 rounded-2xl bg-gold-500/10 flex items-center justify-center text-gold-500 border border-gold-500/20 group-hover:scale-110 transition-transform duration-500">
                                <path.icon size={28} />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gold-500 transition-colors">
                                {t(`${path.key}.title`)}
                            </h3>

                            <p className="text-slate-400 mb-8 flex-grow leading-relaxed">
                                {t(`${path.key}.description`)}
                            </p>

                            <div className="space-y-3 mb-8">
                                {[0, 1, 2].map((itemIdx) => (
                                    <div key={itemIdx} className="flex items-center gap-3 text-sm text-slate-300">
                                        <CheckCircle2 size={16} className="text-gold-500/60" />
                                        <span>{t(`${path.key}.items.${itemIdx}`)}</span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href={path.href}
                                className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl border border-gold-500/30 text-gold-500 font-bold hover:bg-gold-500 hover:text-brand-900 transition-all duration-300"
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

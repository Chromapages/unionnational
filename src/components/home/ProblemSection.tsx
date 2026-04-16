"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { AlertTriangle, XCircle, Clock, EyeOff, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function ProblemSection() {
    const t = useTranslations("HomePage.ProblemSection");
    const problems = [
        {
            icon: EyeOff,
            title: t("items.flyingBlind.title"),
            description: t("items.flyingBlind.description"),
        },
        {
            icon: Clock,
            title: t("items.taxSurprises.title"),
            description: t("items.taxSurprises.description"),
        },
        {
            icon: AlertTriangle,
            title: t("items.complianceDrag.title"),
            description: t("items.complianceDrag.description"),
        },
    ];

    return (
        <section className="relative overflow-hidden bg-slate-50 px-6 py-24 lg:py-36">
            <div className="absolute top-0 right-0 h-[500px] w-[500px] translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/5 blur-[100px]" />
            <div className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/2 translate-y-1/2 rounded-full bg-brand-500/5 blur-[100px]" />

            <div className="relative z-10 mx-auto max-w-7xl">
                <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
                    <RevealOnScroll>
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-red-600">
                                <XCircle size={14} aria-hidden="true" />
                                {t("badge")}
                            </div>
                            <h2 className="font-heading text-4xl font-bold leading-[1.1] tracking-tighter text-brand-950 md:text-6xl">
                                {t("title")}
                                <br />
                                <span className="italic text-gold-600">{t("titleAccent")}</span> {t("titleEnd")}
                            </h2>
                            <p className="max-w-xl text-xl font-light leading-relaxed text-slate-600">
                                {t("subtitle")}
                            </p>

                            <div className="pt-6">
                                <Link
                                    href="/services/s-corp-tax-advantage"
                                    className="group inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-brand-950 transition-colors hover:text-gold-600"
                                >
                                    {t("cta")}
                                    <ArrowRight size={18} aria-hidden="true" className="text-gold-500 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 gap-6">
                        {problems.map((problem, index) => (
                            <RevealOnScroll key={problem.title} delay={index * 150}>
                                <div className="group flex gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-gold-500/20 hover:shadow-xl">
                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-950 text-gold-500 shadow-lg shadow-black/10 transition-transform group-hover:scale-110">
                                        <problem.icon size={28} aria-hidden="true" />
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-heading text-xl font-bold text-brand-900">{problem.title}</h3>
                                        <p className="text-sm font-light leading-relaxed text-slate-500">
                                            {problem.description}
                                        </p>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

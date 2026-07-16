"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
    EyeOff,
    Clock,
    AlertTriangle,
    Check,
    ShieldCheck,
    Users,
    ArrowRight,
    TrendingDown,
    Zap,
} from "lucide-react";

interface StatItem {
    value: string;
    label: string;
}

interface WhyUsSectionProps {
    data?: {
        problemTitle?: string;
        problemSubtitle?: string;
        differentiatorTitle?: string;
        differentiatorSubtitle?: string;
        stats?: StatItem[];
    };
}

export const WhyUsSection = ({ data }: WhyUsSectionProps) => {
    const t = useTranslations("HomePage.WhyUsSection");

    // ─── Side-by-side comparison rows ───────────────────────────────────────────
    // Each row pairs a "status quo" problem with its CFO partnership solution.
    // Matched-row structure so each point contrasts directly across columns.
    const comparisonRows = [
        {
            problemIcon: EyeOff,
            problemTitle: t("problems.flyingBlind.title"),
            problemDesc: t("problems.flyingBlind.description"),
            solutionIcon: Check,
            solutionTitle: t("differentiators.proactiveStrategy.title"),
            solutionDesc: t("differentiators.proactiveStrategy.description"),
        },
        {
            problemIcon: Clock,
            problemTitle: t("problems.taxSurprises.title"),
            problemDesc: t("problems.taxSurprises.description"),
            solutionIcon: Users,
            solutionTitle: t("differentiators.directAccess.title"),
            solutionDesc: t("differentiators.directAccess.description"),
        },
        {
            problemIcon: AlertTriangle,
            problemTitle: t("problems.complianceDrag.title"),
            problemDesc: t("problems.complianceDrag.description"),
            solutionIcon: ShieldCheck,
            solutionTitle: t("differentiators.sCorpSpecialists.title"),
            solutionDesc: t("differentiators.sCorpSpecialists.description"),
        },
    ];

    // Stats — defaults from CMS
    const stats = data?.stats?.length
        ? data.stats
        : [
              { value: "23%", label: t("stats.averageTaxReduction") },
              { value: "$2.4M", label: t("stats.clientSavingsLastYear") },
              { value: "1,000+", label: t("stats.businessesServed") },
              { value: "15+", label: t("stats.yearsExperience") },
          ];


    return (
        <section
            id="why-us-section"
            aria-labelledby="why-us-heading"
            className="relative overflow-hidden bg-slate-50 py-24 border-y border-slate-200"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <RevealOnScroll className="text-center mb-16 max-w-3xl mx-auto">
                    <span className="home-eyebrow mb-4 block text-gold-700">
                        {t("eyebrow")}
                    </span>
                    <h2
                        id="why-us-heading"
                        className="home-section-heading mb-6 text-brand-900"
                    >
                        {data?.problemTitle || t("fallbackTitle")}
                    </h2>
                    <p className="home-supporting-copy text-slate-600">
                        {data?.problemSubtitle || t("fallbackSubtitle")}
                    </p>
                </RevealOnScroll>

                {/* ─── Comparison Header Row ─────────────────────────────────────── */}
                <RevealOnScroll delay={100}>
                    <div className="grid grid-cols-2 gap-4 mb-4 px-2">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center text-red-500 border border-red-100">
                                <TrendingDown size={18} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 font-sans">{t("statusQuoLabel")}</p>
                                <h3 className="home-card-heading text-base md:text-lg text-brand-900">{t("traditionalCpaTitle")}</h3>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-500 border border-gold-500/20">
                                <Zap size={18} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gold-500/80 font-sans">{t("proactiveDefenseLabel")}</p>
                                <h3 className="home-card-heading text-base md:text-lg text-black">{t("cfoPartnershipTitle")}</h3>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>

                {/* ─── Side-by-side Comparison Rows ─────────────────────────────── */}
                <RevealOnScroll delay={200}>
                    <div className="mb-16 space-y-4">
                        {comparisonRows.map((row, idx) => (
                            <div
                                key={idx}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch"
                            >
                                {/* Problem card — left column */}
                                <div className="bg-white border border-slate-200 rounded-xl p-5 flex gap-4 items-start hover:border-red-200 transition-all duration-200">
                                    <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 shrink-0 mt-0.5">
                                        <row.problemIcon size={16} />
                                    </div>
                                    <div>
                                        <h4 className="mb-1 font-sans text-sm font-semibold leading-[1.35] text-brand-900">{row.problemTitle}</h4>
                                        <p className="text-xs text-slate-500 leading-relaxed">{row.problemDesc}</p>
                                    </div>
                                </div>

                                {/* Solution card — right column */}
                                <div className="bg-brand-900 border border-brand-800 rounded-xl p-5 flex gap-4 items-start hover:border-gold-500/30 transition-all duration-200">
                                    <div className="w-9 h-9 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 border border-gold-500/20 shrink-0 mt-0.5">
                                        <row.solutionIcon size={16} />
                                    </div>
                                    <div>
                                        <h4 className="mb-1 font-sans text-sm font-semibold leading-[1.35] text-white">{row.solutionTitle}</h4>
                                        <p className="text-xs text-slate-400 leading-relaxed">{row.solutionDesc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </RevealOnScroll>

                {/* ─── Stats Row ─────────────────────────────────────────────────── */}
                <RevealOnScroll delay={300}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                                <div className="text-3xl md:text-4xl font-black font-heading mb-2 text-gold-500">
                                    {stat.value}
                                </div>
                                <div className="text-xs sm:text-sm text-slate-600 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </RevealOnScroll>

                {/* Call to Action */}
                <RevealOnScroll delay={400}>
                    <div className="text-center bg-white border border-slate-200 rounded-2xl shadow-sm p-8 sm:p-10 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow">
                        <div className="text-left">
                            <h3 className="home-card-heading mb-1 text-brand-900">
                                {data?.differentiatorTitle || t("ctaTitle")}
                            </h3>
                            <p className="text-sm text-slate-500">
                                {data?.differentiatorSubtitle || t("ctaSubtitle")}
                            </p>
                        </div>
                        <Link
                            href={{ pathname: "/book" }}
                            tabIndex={0}
                            aria-label={t("ctaButtonAria")}
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-600 active:scale-95 text-brand-900 font-bold font-heading rounded-md shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 shrink-0 group"
                        >
                            {t("ctaButton")}
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

import React from "react";
import Image from "next/image";
import { ArrowRight, BarChart3, CalendarDays, FileText, Flag, Files, Target, Users, type LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { ClientResultSource } from "@/lib/testimonials/clientResults";

export interface TestimonialsSectionProps {
    testimonials?: ClientResultSource[];
}

interface ProofCardItem {
    service: string;
    quote: string;
    industry: string;
    icon: LucideIcon;
    image: string;
}

export const TestimonialsSection = async ({
    testimonials,
}: TestimonialsSectionProps = {}): Promise<React.JSX.Element> => {
    void testimonials;
    const t = await getTranslations("HomePage.TestimonialsSection");

    const proofCards: ProofCardItem[] = [
        {
            service: t("proof.card1Service"),
            quote: t("proof.card1Quote"),
            industry: t("proof.card1Industry"),
            icon: FileText,
            image: "/images/results-ecommerce.jpg",
        },
        {
            service: t("proof.card2Service"),
            quote: t("proof.card2Quote"),
            industry: t("proof.card2Industry"),
            icon: BarChart3,
            image: "/images/results-bookkeeping.jpg",
        },
        {
            service: t("proof.card3Service"),
            quote: t("proof.card3Quote"),
            industry: t("proof.card3Industry"),
            icon: Users,
            image: "/images/results-manufacturing.jpg",
        },
    ];

    return (
        <section
            id="client-results"
            className="relative bg-[#fcfbf9] py-16 sm:py-20 lg:py-24 xl:pb-6 xl:pt-5"
            aria-labelledby="results-heading"
            data-analytics="testimonials_section_view"
        >
            <div className="mx-auto w-full max-w-screen-2xl px-5 sm:px-6 lg:px-8 xl:max-w-[100rem] xl:px-[3.25rem]">
                {/* 1. Header: Eyebrow + Title + Subtitle + 3-Stat Credibility Metric Strip */}
                <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-12 xl:block">
                    <div className="lg:col-span-7">
                        <div className="flex items-center gap-3 xl:gap-5">
                            <span className="font-body text-xs font-bold uppercase tracking-[0.16em] text-[#94713c] xl:font-medium xl:tracking-[0.24em] xl:text-brand-950">
                                {t("eyebrow")}
                            </span>
                            <span className="h-[2px] w-8 bg-[#94713c]/60 xl:order-first xl:w-9" aria-hidden="true" />
                        </div>
                        <h2
                            id="results-heading"
                            className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-brand-950 sm:text-4xl lg:text-[2.75rem] leading-[1.12] xl:mt-2 xl:text-[3.35rem] xl:font-bold xl:tracking-normal xl:leading-none"
                        >
                            {t("title")}
                        </h2>
                        <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base xl:mt-2 xl:max-w-none xl:text-[1.55rem] xl:leading-tight xl:text-slate-700">
                            <span className="xl:hidden">{t("subtitle")}</span>
                            <span className="hidden xl:inline">{t("desktopSubtitle")}</span>
                        </p>
                    </div>

                    <div className="grid grid-cols-3 divide-x divide-slate-200/80 pt-4 lg:col-span-5 lg:pt-0 xl:mt-[1.0625rem] xl:min-h-[5.25rem] xl:grid-cols-[25.5%_29%_45.5%] xl:items-center xl:rounded-md xl:border xl:border-[#e4dfd6] xl:bg-white/60 xl:py-1.5">
                        {/* Metric 1: 1,000+ Business Owners */}
                        <div className="px-3 text-center first:pl-0 sm:px-4 lg:text-left xl:pl-14 xl:first:pl-14">
                            <span className="block font-data tabular-nums text-3xl font-bold leading-none text-[#94713c] sm:text-4xl xl:text-[2.5rem] xl:text-brand-950">
                                {t("stats.ownersServedValue", { default: "1,000+" })}
                            </span>
                            <span className="mt-2 block font-body text-[10px] font-bold tracking-wider text-slate-700 uppercase sm:text-[11px] xl:mt-0 xl:text-lg xl:font-normal xl:normal-case xl:tracking-normal">
                                {t("stats.ownersServed")}
                            </span>
                        </div>

                        {/* Metric 2: 98% Clients Would Recommend */}
                        <div className="px-3 text-center sm:px-4 lg:text-left xl:pl-16">
                            <Users className="mx-auto h-5 w-5 text-[#94713c] lg:mx-0 xl:hidden" aria-hidden="true" />
                            <span className="mt-1 block font-data tabular-nums text-3xl font-bold leading-none text-[#94713c] sm:text-4xl xl:mt-0 xl:text-[2.5rem] xl:text-brand-950">
                                {t("stats.recommendRateValue", { default: "98%" })}
                            </span>
                            <span className="mt-2 block font-body text-[10px] font-bold tracking-wider text-slate-700 uppercase sm:text-[11px] xl:mt-0 xl:text-lg xl:font-normal xl:normal-case xl:tracking-normal">
                                {t("stats.recommendRate")}
                            </span>
                        </div>

                        {/* Metric 3: Year-Round Strategic Support */}
                        <div className="px-3 text-center last:pr-0 sm:px-4 lg:text-left xl:flex xl:items-center xl:gap-5 xl:pl-16">
                            <BarChart3 className="mx-auto h-5 w-5 text-[#94713c] lg:mx-0 xl:hidden" aria-hidden="true" />
                            <CalendarDays className="hidden h-8 w-8 shrink-0 text-[#94713c] xl:block" aria-hidden="true" />
                            <div>
                                <span className="mt-1.5 block font-body text-base font-bold tracking-wider text-[#94713c] uppercase sm:text-lg leading-tight xl:hidden">
                                    {t("stats.yearRound")}
                                </span>
                                <span className="mt-2 block font-body text-[10px] font-bold tracking-wider text-slate-700 uppercase sm:text-[11px] xl:hidden">
                                    {t("stats.strategicSupport")}
                                </span>
                                <span className="hidden text-sm font-semibold uppercase tracking-[0.22em] text-brand-950 xl:block">{t("stats.yearRoundAdvisory")}</span>
                                <span className="mt-1 hidden font-body text-lg text-slate-700 xl:block">{t("stats.desktopSupport")}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Main Featured Result Card */}
                <div className="mt-10 grid grid-cols-1 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm sm:mt-12 sm:rounded-3xl lg:grid-cols-12 xl:mt-3 xl:min-h-[26rem] xl:grid-cols-[minmax(0,1.82fr)_minmax(0,1fr)_minmax(0,.9fr)] xl:gap-3 xl:overflow-visible xl:rounded-none xl:border-0 xl:bg-transparent xl:shadow-none">
                    {/* Left: Deep Green Before / After / Outcome Flow */}
                    <div className="relative flex flex-col justify-between bg-[#041d1a] p-6 text-white sm:p-8 lg:col-span-6 lg:p-10 xl:col-span-1 xl:min-w-0 xl:justify-start xl:bg-[#17392f] xl:p-8">
                        <div>
                            <span className="font-body text-xs font-bold uppercase tracking-[0.16em] text-gold-400 xl:flex xl:items-center xl:gap-5 xl:font-medium xl:tracking-[0.24em]">
                                <span className="hidden h-[2px] w-7 bg-gold-300 xl:block" aria-hidden="true" />
                                {t("featured.eyebrow")}
                            </span>
                            <h3 className="mt-3 font-heading text-2xl font-bold text-white sm:text-3xl xl:mt-2 xl:text-[2.25rem] xl:font-semibold xl:leading-tight xl:tracking-[-0.015em] 2xl:text-[2.5rem]">
                                {t("featured.company")}
                            </h3>
                            <p className="mt-2 font-body text-xs font-semibold uppercase tracking-[0.14em] text-slate-400 xl:mt-0 xl:text-lg xl:font-normal xl:normal-case xl:tracking-normal xl:text-white">
                                {t("featured.industry")}
                            </p>
                            <div className="mt-4 hidden h-px w-full bg-white/30 xl:block" aria-hidden="true" />
                        </div>

                        <dl className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 sm:grid-cols-3 xl:mt-5 xl:gap-5">
                            {/* Step 1: BEFORE */}
                            <div className="relative">
                                <div className="flex size-10 items-center justify-center rounded-full border border-emerald-700/50 bg-emerald-950/60 text-emerald-300 xl:size-12 xl:border-0 xl:bg-white/10 xl:text-gold-200">
                                    <FileText className="h-4 w-4 xl:h-6 xl:w-6" aria-hidden="true" />
                                </div>
                                <ArrowRight className="absolute right-1 top-5 hidden h-5 w-5 text-white/80 xl:block" aria-hidden="true" />
                                <dt className="mt-4 block font-body text-xs font-bold tracking-widest text-gold-400 uppercase xl:mt-3 xl:text-[11px] xl:tracking-[0.18em]">
                                    {t("featured.beforeLabel")}
                                </dt>
                                <div className="my-1.5 h-px w-full bg-emerald-800/40 xl:hidden" aria-hidden="true" />
                                <dd className="m-0 text-xs leading-relaxed text-slate-300 sm:text-sm xl:mt-2 xl:text-lg xl:leading-[1.16] xl:text-white">
                                    {t("featured.beforeText")}
                                </dd>
                            </div>

                            {/* Step 2: AFTER */}
                            <div className="relative">
                                <div className="flex size-10 items-center justify-center rounded-full border border-emerald-700/50 bg-emerald-950/60 text-emerald-300 xl:size-12 xl:border-0 xl:bg-white/10 xl:text-gold-200">
                                    <BarChart3 className="h-4 w-4 xl:h-6 xl:w-6" aria-hidden="true" />
                                </div>
                                <ArrowRight className="absolute right-1 top-5 hidden h-5 w-5 text-white/80 xl:block" aria-hidden="true" />
                                <dt className="mt-4 block font-body text-xs font-bold tracking-widest text-gold-400 uppercase xl:mt-3 xl:text-[11px] xl:tracking-[0.18em]">
                                    <span className="xl:hidden">{t("featured.afterLabel")}</span>
                                    <span className="hidden xl:inline">{t("featured.afterDesktopLabel")}</span>
                                </dt>
                                <div className="my-1.5 h-px w-full bg-emerald-800/40 xl:hidden" aria-hidden="true" />
                                <dd className="m-0 text-xs leading-relaxed text-slate-300 sm:text-sm xl:mt-2 xl:text-lg xl:leading-[1.16] xl:text-white">
                                    {t("featured.afterText")}
                                </dd>
                            </div>

                            {/* Step 3: OUTCOME */}
                            <div className="relative">
                                <div className="flex size-10 items-center justify-center rounded-full border border-emerald-700/50 bg-emerald-950/60 text-emerald-300 xl:size-12 xl:border-0 xl:bg-white/10 xl:text-gold-200">
                                    <Flag className="h-4 w-4 xl:hidden" aria-hidden="true" />
                                    <Target className="hidden h-6 w-6 xl:block" aria-hidden="true" />
                                </div>
                                <dt className="mt-4 block font-body text-xs font-bold tracking-widest text-gold-400 uppercase xl:mt-3 xl:text-[11px] xl:tracking-[0.18em]">
                                    {t("featured.outcomeLabel")}
                                </dt>
                                <div className="my-1.5 h-px w-full bg-emerald-800/40 xl:hidden" aria-hidden="true" />
                                <dd className="m-0 text-xs leading-relaxed text-slate-300 sm:text-sm xl:mt-2 xl:text-lg xl:leading-[1.16] xl:text-white">
                                    {t("featured.outcomeText")}
                                </dd>
                            </div>
                        </dl>
                        <p className="hidden items-center gap-5 font-body text-[11px] uppercase tracking-[0.22em] text-gold-200 xl:mt-auto xl:flex">
                            <span className="h-[2px] w-7 bg-gold-300" aria-hidden="true" />
                            {t("featured.footerTagline")}
                        </p>
                    </div>

                    {/* Middle: Client Perspective Quote & Attribution */}
                    <div className="relative flex flex-col justify-between bg-white p-6 sm:p-8 lg:col-span-4 lg:p-10 xl:col-span-1 xl:min-w-0 xl:bg-[#faf8f3] xl:p-7">
                        <figure className="m-0 flex h-full min-h-0 flex-col justify-between xl:h-auto xl:flex-1">
                            <div>
                                <span className="block font-body text-xs font-bold uppercase tracking-[0.16em] text-gold-800 xl:flex xl:items-center xl:gap-4 xl:font-medium xl:tracking-[0.24em]">
                                    <span className="hidden h-[2px] w-7 bg-gold-500 xl:block" aria-hidden="true" />
                                    {t("featured.perspectiveEyebrow")}
                                </span>
                                <blockquote className="mt-4 font-body text-xl font-normal leading-snug text-brand-950 sm:text-2xl xl:mt-5 xl:text-[1.75rem] xl:leading-[1.14]">
                                    “{t("featured.perspectiveQuote")}”
                                </blockquote>
                            </div>
                            <figcaption className="mt-8 border-t border-slate-100 pt-4 xl:mt-auto xl:border-t-0 xl:pt-4">
                                <span className="hidden h-px w-8 bg-gold-700 xl:block" aria-hidden="true" />
                                <p className="font-body text-base font-bold text-brand-950 xl:mt-4 xl:text-lg">
                                    {t("featured.authorName")}
                                </p>
                                <p className="mt-0.5 text-xs text-slate-500 xl:text-base xl:text-slate-700">
                                    {t("featured.authorRole")}
                                </p>
                                <p className="text-xs text-slate-500 xl:text-base xl:text-slate-700">
                                    {t("featured.authorCompany")}
                                </p>
                            </figcaption>
                        </figure>
                        <div className="mt-5 hidden xl:block">
                            <p className="font-body text-[11px] uppercase tracking-[0.24em] text-brand-950">{t("featured.servicesLabel")}</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                                <span className="rounded-full bg-[#e3ebe6] px-3 py-1 font-body text-[13px] text-brand-950">{t("featured.serviceOne")}</span>
                                <span className="rounded-full bg-[#e3ebe6] px-3 py-1 font-body text-[13px] text-brand-950">{t("featured.serviceTwo")}</span>
                            </div>
                        </div>
                        <span className="pointer-events-none absolute bottom-24 right-6 hidden font-body text-[7rem] leading-none text-stone-200/80 xl:block" aria-hidden="true">”</span>
                    </div>

                    {/* Right: Construction Frame Photo with Brand Tagline */}
                    <div className="relative min-h-[240px] overflow-hidden sm:min-h-[280px] lg:col-span-2 lg:min-h-full xl:col-span-1 xl:min-h-[26rem]">
                        <Image
                            src="/images/torres-construction.jpg"
                            alt="Torres Built Construction project framework"
                            fill
                            sizes="(max-width: 1279px) 100vw, 25vw"
                            className="object-cover"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/35 to-transparent p-5 xl:hidden">
                            <p className="font-body text-[11px] font-bold tracking-wider text-white uppercase leading-tight">
                                {t("featured.photoTagline")}
                            </p>
                            <div className="mt-2 h-[2px] w-8 bg-gold-400" aria-hidden="true" />
                        </div>
                    </div>
                </div>

                {/* 3. "More Proof Across The Practice" Row & Cards */}
                <div className="mt-12 sm:mt-16 xl:mt-[1.125rem]">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-3 xl:gap-5">
                            <span className="font-body text-xs font-bold uppercase tracking-[0.16em] text-[#94713c] xl:font-medium xl:tracking-[0.24em] xl:text-brand-950">
                                {t("proof.eyebrow")}
                            </span>
                            <span className="h-[2px] w-8 bg-[#94713c]/60 xl:order-first" aria-hidden="true" />
                        </div>
                        <Link
                            href="/client-results"
                            className="group inline-flex items-center gap-1.5 text-xs font-bold text-brand-950 transition-colors hover:text-gold-700 sm:text-sm xl:hidden"
                        >
                            <span>{t("proof.viewAll")}</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                        </Link>
                    </div>

                    <div data-testid="client-results-grid" className="mt-5 grid gap-6 lg:grid-cols-3 xl:mt-3 xl:gap-4">
                        {proofCards.map((card, idx) => (
                            <article
                                key={`proof-card-${idx}`}
                                aria-label={`${card.service}: ${card.quote}`}
                                className="group relative flex min-h-0 items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 transition-all duration-300 hover:border-slate-300 hover:shadow-md sm:p-6 lg:p-8 xl:h-auto xl:min-h-36 xl:items-stretch xl:gap-0 xl:overflow-hidden xl:rounded-[3px] xl:p-0 2xl:h-[7.375rem] 2xl:min-h-0"
                            >
                                <Link href="/client-results" aria-label={`${card.service}: ${card.quote}`} className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-900 focus-visible:ring-inset" />
                                <div className="relative hidden h-full w-[40%] shrink-0 xl:block">
                                    <Image src={card.image} alt="" fill sizes="(max-width: 1279px) 1px, 14vw" className="object-cover" />
                                </div>
                                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#fbf4e6] text-[#9c783e] xl:hidden">
                                    <card.icon className="h-5 w-5" aria-hidden="true" />
                                </div>
                                <div className="min-w-0 flex-1 xl:flex xl:h-full xl:flex-col xl:justify-between xl:p-3">
                                    <span className="block font-body text-xs font-bold uppercase tracking-wider text-gold-800 xl:text-lg xl:normal-case xl:tracking-normal xl:text-brand-950">
                                        {card.service}
                                    </span>
                                    <blockquote className="mt-1 font-body text-base font-medium leading-snug text-brand-950 sm:text-lg xl:mt-0 xl:text-[15px] xl:font-normal xl:leading-[1.1]">
                                        “{card.quote}”
                                    </blockquote>
                                    <div className="mt-4 flex items-center justify-between font-body text-[11px] font-semibold tracking-wider text-slate-400 uppercase xl:mt-1 xl:text-[10px] xl:tracking-[0.18em] xl:text-slate-600">
                                        <span>{card.industry}</span>
                                        <ArrowRight
                                            className="h-4 w-4 text-slate-400 transition-all group-hover:translate-x-0.5 group-hover:text-brand-950 xl:text-brand-950"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                {/* 4. Bottom CTA Strip */}
                <div className="mt-6 flex flex-col justify-between gap-6 rounded-2xl border border-slate-200/80 bg-[#f7f5ef] p-5 sm:mt-8 sm:p-6 md:flex-row md:items-center lg:p-7 xl:mt-[1.4375rem] xl:min-h-[6rem] xl:gap-0 xl:overflow-hidden xl:rounded-[3px] xl:bg-[#faf8f4] xl:p-0">
                    <div className="flex items-start gap-4 sm:items-center xl:h-full xl:min-w-0 xl:flex-1 xl:gap-10">
                        <div className="relative hidden h-[6rem] w-80 shrink-0 [clip-path:polygon(0_0,80%_0,100%_100%,0_100%)] xl:block">
                            <Image src="/images/results-forest.jpg" alt="" fill sizes="320px" className="object-cover" />
                        </div>
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#ece6d8] text-[#9c783e] xl:hidden">
                            <Files className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <div>
                            <span className="block font-body text-xs font-bold uppercase tracking-wider text-gold-800 xl:font-medium xl:tracking-[0.22em] xl:text-brand-950">
                                <span className="xl:hidden">{t("ctaStrip.eyebrow")}</span>
                                <span className="hidden xl:inline">{t("ctaStrip.desktopEyebrow")}</span>
                            </span>
                            <h4 className="mt-0.5 font-heading text-base font-bold text-brand-950 sm:text-lg leading-snug xl:mt-1 xl:text-[1.3rem] xl:font-normal xl:tracking-[-0.005em]">
                                <span className="xl:hidden">{t("ctaStrip.title")}</span>
                                <span className="hidden xl:inline">{t("ctaStrip.desktopTitle")}</span>
                            </h4>
                            <p className="mt-0.5 text-xs text-slate-600 sm:text-sm leading-relaxed xl:hidden">
                                {t("ctaStrip.subtitle")}
                            </p>
                        </div>
                    </div>
                    <Link
                        href="/client-results"
                        data-analytics="testimonials_read_more_click"
                        className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-950 px-6 py-3 font-body text-xs font-bold text-white transition-all hover:bg-brand-900 active:bg-black focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-gold-500 focus-visible:ring-offset-2 sm:text-sm xl:gap-1.5 xl:rounded-[3px] xl:px-4 xl:text-sm xl:font-normal"
                    >
                        <span>{t("ctaStrip.buttonText")}</span>
                        <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                    <div className="ml-8 hidden h-[6rem] w-[8.5rem] shrink-0 flex-col justify-center border-l border-[#e4dfd6] pl-10 text-[10px] uppercase leading-[1.8] tracking-[0.2em] text-slate-700 xl:flex" aria-hidden="true">
                        <span className="mb-2 h-px w-6 bg-gold-600" />
                        <span>{t("ctaStrip.motifPeople")}</span>
                        <span>{t("ctaStrip.motifPlans")}</span>
                        <span>{t("ctaStrip.motifProgress")}</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

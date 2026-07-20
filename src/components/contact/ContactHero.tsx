"use client";

import { Award, CheckCircle2, Clock3, Quote, ShieldCheck, Users } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { MultiStepContactForm } from "./MultiStepContactForm";

interface ContactHeroProps {
    stats?: { clients?: number; savings?: string; responseTime?: string } | null;
    founder?: {
        name?: string;
        title?: string;
        imageUrl?: string;
        credentials?: string[];
    } | null;
    formTitle?: string;
    formSubtitle?: string;
    faqQuestions?: string[];
    testimonial?: {
        quote?: string;
        clientName?: string;
        clientCompany?: string;
    } | null;
}

export function ContactHero({
    stats,
    founder,
    formTitle,
    formSubtitle,
    faqQuestions = [],
    testimonial,
}: ContactHeroProps) {
    const t = useTranslations("ContactPage.Hero");
    const locale = useLocale();
    const clients = stats?.clients ?? 5000;
    const reviewerName = founder?.name || "Jason Astwood";

    const proofPoints = [
        { icon: Award, label: t("proof.eaLicensed") },
        { icon: ShieldCheck, label: t("proof.irsRepresentation") },
        { icon: Clock3, label: t("proof.avgResponse") },
        { icon: Users, label: `${clients.toLocaleString(locale === "es" ? "es-ES" : "en-US")}+ ${t("proof.clients")}` },
    ];

    return (
        <section className="relative overflow-hidden bg-brand-950 text-white">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(212,175,55,0.14),transparent_34%),linear-gradient(135deg,#071d1b_0%,#0d2e2b_58%,#123b36_100%)]" />
            <div className="pointer-events-none absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-10 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(520px,1.1fr)] lg:gap-14 lg:px-8 lg:py-16">
                <div className="min-w-0 self-start lg:sticky lg:top-24">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gold-400">
                        {t("eyebrow")}
                    </p>
                    <h1 className="max-w-2xl break-words font-heading text-[2rem] font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem]">
                        {t("consultationTitle")}
                    </h1>
                    <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                        {t("consultationSubtitle")}
                    </p>

                    <div className="mt-7 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-2.5" aria-label={t("proof.label")}>
                        {proofPoints.map(({ icon: Icon, label }) => (
                            <div key={label} className="flex min-h-12 min-w-0 items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-semibold text-slate-100 sm:text-sm">
                                <Icon className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                                <span className="min-w-0 leading-tight">{label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                        <div className="flex items-center gap-3">
                            {founder?.imageUrl ? (
                                // Sanity's CDN already serves this small image efficiently.
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={founder.imageUrl} alt="" className="h-12 w-12 rounded-xl object-cover object-top" />
                            ) : (
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500 font-heading font-bold text-brand-950" aria-hidden="true">
                                    {reviewerName.charAt(0)}
                                </div>
                            )}
                            <div>
                                <p className="text-sm font-bold">{t("reviewedBy", { name: reviewerName })}</p>
                                <p className="text-xs text-slate-400">{founder?.title || t("reviewerTitle")}</p>
                            </div>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-slate-300">{t("reviewProcess")}</p>
                    </div>

                    {faqQuestions.length > 0 && (
                        <div className="mt-6 hidden rounded-2xl border border-white/10 p-4 lg:block">
                            <p className="text-xs font-bold uppercase tracking-widest text-gold-400">{t("faqTeaser")}</p>
                            <ul className="mt-3 space-y-2 text-sm text-slate-300">
                                {faqQuestions.slice(0, 2).map((question) => (
                                    <li key={question} className="flex gap-2">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                                        <span>{question}</span>
                                    </li>
                                ))}
                            </ul>
                            <a href="#contact-faq" className="mt-3 inline-flex min-h-11 items-center text-sm font-bold text-gold-400 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400">
                                {t("viewFaq")}
                            </a>
                        </div>
                    )}
                </div>

                <div id="consultation-form" className="min-w-0 scroll-mt-24">
                    <MultiStepContactForm title={formTitle} subtitle={formSubtitle} />
                    {testimonial?.quote && (
                        <figure className="mt-4 rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                            <Quote className="h-5 w-5 text-gold-400" aria-hidden="true" />
                            <blockquote className="mt-2 text-sm leading-6 text-slate-200">&ldquo;{testimonial.quote}&rdquo;</blockquote>
                            <figcaption className="mt-3 text-xs font-semibold text-slate-400">
                                {testimonial.clientName || t("verifiedClient")}
                                {testimonial.clientCompany ? ` · ${testimonial.clientCompany}` : ""}
                            </figcaption>
                        </figure>
                    )}
                </div>
            </div>
        </section>
    );
}

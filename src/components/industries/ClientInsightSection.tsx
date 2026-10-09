"use client";

import { ArrowRight, ChartNoAxesColumnIncreasing, Quote, Settings, TrendingUp, UsersRound } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { BookingCtaLink } from "@/components/home/BookingCtaLink";
import { BOOKING_ROUTE } from "@/lib/booking";
import { Link } from "@/i18n/navigation";

export function ClientInsightSection({ id = "torres-story", compact = false }: { id?: string; compact?: boolean }) {
  const locale = useLocale();
  const t = useTranslations("ClientInsight");
  const featured = useTranslations("HomePage.TestimonialsSection.featured");
  const cta = useTranslations("HomePage.CTASection");
  const header = useTranslations("Header");
  const narrative = [
    { label: t("challengeLabel"), body: t("challengeBody") },
    { label: t("assessmentLabel"), body: t("assessmentBody") },
    { label: t("planningLabel"), body: t("planningBody") },
    { label: t("outcomeLabel"), body: t("outcomeBody") },
  ];

  if (compact) return (
    <section id={id} aria-labelledby={`${id}-perspective`} className="scroll-mt-28 py-10 lg:py-12">
      <div className="grid overflow-hidden rounded-xl border border-[#e4e7df] lg:grid-cols-[minmax(0,2fr)_minmax(0,1.05fr)]">
        <div className="relative isolate flex min-w-0 flex-col overflow-hidden bg-[#073f38] p-6 text-white sm:p-8 lg:p-10 xl:p-12">
          <div className="pointer-events-none absolute -right-72 -top-32 -z-10 size-[48rem] rounded-full border-[7rem] border-white/[.025]" aria-hidden="true" />
          <Quote className="size-10 rotate-180 text-gold-300 sm:size-12" strokeWidth={1.5} aria-hidden="true" />
          <h2 id={`${id}-perspective`} className="mt-4 text-xs font-semibold uppercase tracking-[.13em] text-gold-300 sm:text-sm">{t("clientPerspective")}</h2>
          <figure className="m-0 mt-5 flex flex-1 flex-col">
            <blockquote className="font-heading text-[clamp(1.375rem,2.2vw,2.25rem)] font-medium leading-[1.4] tracking-[-.015em]">“{featured("perspectiveQuote")}”</blockquote>
            <figcaption className="mt-7 flex flex-wrap items-end justify-between gap-x-5 gap-y-4 lg:mt-auto lg:pt-9">
              <div className="text-base leading-relaxed text-white/80"><span className="block font-heading text-xl font-semibold text-white sm:text-2xl">{featured("authorName")}</span><span className="mt-1 block">{featured("authorRole")}</span><span className="block">{featured("authorCompany")}</span></div>
              <Link href="/industries/construction" className="inline-flex min-h-11 items-center gap-3 font-heading text-base font-semibold text-white underline decoration-gold-300 underline-offset-8 hover:text-gold-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300 lg:text-lg"><span>{locale === "es" ? "Explore el apoyo para construcción" : "Explore construction support"}</span><ArrowRight className="size-7 shrink-0 text-gold-300" strokeWidth={1.5} aria-hidden="true" /></Link>
            </figcaption>
          </figure>
        </div>
        <aside aria-labelledby={`${id}-outcome`} className="flex min-w-0 flex-col bg-[#fbf7ed] p-6 text-[#0d4941] sm:p-8 lg:p-9">
          <div className="flex items-center gap-4"><p className="text-xs font-semibold uppercase tracking-[.1em] text-[#356f65] sm:text-sm">{t("summary.eyebrow")}</p><span className="h-px w-16 shrink-0 bg-gold-600" aria-hidden="true" /></div>
          <div className="mt-6 flex items-center gap-5">
            <span className="flex size-20 shrink-0 items-center justify-center rounded-full bg-[#e6e9df]" aria-hidden="true"><ChartNoAxesColumnIncreasing className="size-11 text-[#397b6e]" strokeWidth={1.7} /></span>
            <h3 id={`${id}-outcome`} className="font-heading text-2xl font-bold leading-[1.15] tracking-tight sm:text-3xl">{t("summary.title")}</h3>
          </div>
          <p className="mb-6 mt-6 text-base leading-relaxed text-slate-700 lg:text-lg">{t("summary.body")}</p>
          <ul className="mt-auto grid grid-cols-3 divide-x divide-[#d9d8cb] border-t border-[#d9d8cb] pt-5">
            {[Settings, UsersRound, TrendingUp].map((Icon, index) => <li key={index} className="flex min-w-0 flex-col items-center gap-3 px-2 text-center text-sm leading-snug text-slate-700 lg:text-base"><Icon className="size-7 shrink-0 text-[#397b6e]" strokeWidth={1.7} aria-hidden="true" /><span>{t(`summary.takeaways.${index}`)}</span></li>)}
          </ul>
        </aside>
      </div>
    </section>
  );

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-28 border-t border-gold-600/30 py-10 lg:py-12">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-12">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-gold-800">{t("eyebrow")}</p>
          <h2 id={`${id}-heading`} className="mt-3 max-w-[24ch] font-heading text-3xl font-bold leading-[1.08] tracking-[-.03em] text-brand-950 lg:text-4xl">{t("title")}</h2>
          <p className="mt-4 font-heading text-lg font-semibold text-brand-900">{featured("company")}</p>
          <p className="mt-2 max-w-[42rem] text-base leading-relaxed text-slate-600">{t("introduction")}</p>
          <dl className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
            {narrative.map(({ label, body }) => (
              <div key={label} className="grid gap-2 py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-5">
                <dt className="font-heading text-sm font-bold text-brand-950">{label}</dt>
                <dd className="text-sm leading-relaxed text-slate-600">{body}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="flex min-w-0 flex-col rounded-xl bg-[#05352f] p-6 text-white lg:p-8" aria-labelledby={`${id}-perspective`}>
          <Quote className="h-7 w-7 text-gold-300" strokeWidth={1.5} aria-hidden="true" />
          <h3 id={`${id}-perspective`} className="mt-4 text-xs font-bold uppercase tracking-[.16em] text-gold-300">{t("clientPerspective")}</h3>
          <figure className="mt-4">
            <blockquote className="font-heading text-xl leading-relaxed lg:text-2xl">“{featured("perspectiveQuote")}”</blockquote>
            <figcaption className="mt-5 text-sm leading-relaxed">
              <span className="block font-semibold">{featured("authorName")}</span>
              <span className="block text-white/75">{featured("authorRole")}</span>
              <span className="block text-white/75">{featured("authorCompany")}</span>
            </figcaption>
          </figure>
          <div className="mt-6 border-t border-white/20 pt-5">
            <p className="text-xs font-bold uppercase tracking-[.14em] text-gold-300">{t("servicesLabel")}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/85">{featured("serviceOne")} · {featured("serviceTwo")}</p>
          </div>
          <div className="mt-auto pt-6">
            <BookingCtaLink
              href={BOOKING_ROUTE}
              label={header("bookCall")}
              openingLabel={cta("openingSchedulingCalendar")}
              externalLabel={cta("opensInNewTab")}
              placement="industries_client_insight"
              descriptionId={`${id}-cta-support`}
              viewTargetId={id}
              showCalendarIcon={false}
            />
            <p id={`${id}-cta-support`} className="mt-3 text-sm leading-relaxed text-white/75">{t("ctaSupport")}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

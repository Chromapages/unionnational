"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, BriefcaseBusiness, Building2, Check, ChevronDown, Coins, Crown, ChartNoAxesCombined, ChartNoAxesColumnIncreasing, FileSpreadsheet, FileText, Info, MessagesSquare, Network, Phone, RefreshCw, Search, Settings, ShieldCheck, Sprout, Star, Target, UsersRound, type LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { BOOKING_ROUTE } from "@/lib/booking";
import { BookingCtaLink } from "@/components/home/BookingCtaLink";
import { getServiceHref } from "@/components/layout/navigationData";
import type { Service } from "./ServicesClient";
import type { PricingTier } from "@/components/pricing/PricingSection";

type ChallengeKey = "tax" | "numbers" | "decisions" | "operations";
type PackageKey = "foundation" | "growth" | "executive";

const challenges: { key: ChallengeKey; icon: LucideIcon; services: string[] }[] = [
  { key: "tax", icon: Coins, services: ["tax-planning", "s-corp-tax-advantage", "tax-preparation-and-filing"] },
  { key: "numbers", icon: ChartNoAxesCombined, services: ["strategic-bookkeeping", "fractional-cfo", "payroll-services"] },
  { key: "decisions", icon: BriefcaseBusiness, services: ["fractional-cfo", "strategic-bookkeeping", "tax-planning"] },
  { key: "operations", icon: Network, services: ["new-business-formation", "payroll-services", "tax-preparation-and-filing"] },
];
const serviceIcons: Record<string, LucideIcon> = {
  "tax-planning": ChartNoAxesCombined,
  "s-corp-tax-advantage": Building2,
  "tax-preparation-and-filing": FileText,
  "strategic-bookkeeping": FileSpreadsheet,
  "fractional-cfo": BriefcaseBusiness,
  "payroll-services": UsersRound,
  "new-business-formation": Network,
};
const recommendationRanks = ["start", "also", "later"] as const;
const processIcons = [Search, ChartNoAxesColumnIncreasing, Settings, RefreshCw];
const faqGuideIcons = [ChartNoAxesColumnIncreasing, UsersRound, FileText];
const packages: { key: PackageKey; icon: LucideIcon }[] = [
  { key: "foundation", icon: Sprout },
  { key: "growth", icon: ChartNoAxesCombined },
  { key: "executive", icon: Crown },
];
// The hotel benefit has its own qualified note; estate-review scope is not confirmed.
const separatePlanBenefits = /hotel|estate planning|patrimonial|sucesori/i;
const container = "mx-auto w-full max-w-[94rem] px-4 sm:px-6 lg:px-8";
const sectionHeading = "font-heading text-3xl font-bold leading-[1.12] tracking-[-.025em] text-brand-950 sm:text-4xl lg:text-[2.75rem]";

interface ServicesDesktopExperienceProps {
  services: Service[];
  tiers: PricingTier[];
  faqItems: { question: string; answer: string }[];
}

export function ServicesDesktopExperience({ services, tiers, faqItems }: ServicesDesktopExperienceProps) {
  const locale = useLocale();
  const t = useTranslations("ServicesPage.Desktop");
  const pageT = useTranslations("ServicesPage");
  const resultT = useTranslations("HomePage.TestimonialsSection.featured");
  const bookingT = useTranslations("HomePage.CTASection");
  const [selected, setSelected] = useState(0);
  const [activeFaq, setActiveFaq] = useState(0);
  const faqGuidePoints = pageT.raw(`FAQ.guide.points.${activeFaq}`) as { title: string; body: string }[];
  const active = challenges[selected];
  const advisoryTiers = tiers.filter(tier => tier.category === "advisory" || !tier.category);

  const priceFor = (service?: Service, includeFrom = true) => {
    const price = typeof service?.startingPrice === "string" ? service.startingPrice.trim() : undefined;
    if (!price || /custom|personalizad|cotiz/i.test(price)) return t("challenge.customPrice");
    const amount = price.replace(/^(?:from|desde)\s+/i, "").replace(/\+$/, "");
    if (!amount.startsWith("$")) return t("challenge.customPrice");
    const localizedAmount = amount.replace("/mo", `/${t("challenge.month")}`).replace(" and ", ` ${t("challenge.and")} `).replace("per employee", t("challenge.perEmployee"));
    return includeFrom ? t("challenge.fromPrice", { price: localizedAmount }) : localizedAmount;
  };

  return (
    <div data-testid="services-experience" className="bg-white text-brand-950">
      <section id="services-hero" aria-labelledby="services-desktop-heading" className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_28%_34%,#10473c_0%,#07372f_58%,#052c29_100%)] text-white">
        <div className="absolute inset-0 -z-10 bg-[url('/images/services-blueprint-hero.webp')] bg-cover bg-[center_68%] opacity-[.22]" aria-hidden="true" />
        <div className={`${container} flex items-center py-10 lg:py-12`}>
          <div className="max-w-[48rem]">
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-gold-200 sm:text-sm">{t("hero.eyebrow")}</p>
            <h1 id="services-desktop-heading" className="mt-4 font-heading text-[clamp(2.25rem,4vw,3.75rem)] font-bold leading-[1.08] tracking-[-.04em] text-balance">{t("hero.title")}</h1>
            <p className="mt-5 max-w-[44rem] text-lg leading-relaxed text-white/85 sm:text-xl">{t("hero.subtitle")}</p>
            <div className="mt-7 w-full max-w-[19rem]">
              <BookingCtaLink href={BOOKING_ROUTE} label={t("bookingLabel")} openingLabel={bookingT("openingSchedulingCalendar")} externalLabel={bookingT("opensInNewTab")} placement="services_hero" viewTargetId="services-hero" showCalendarIcon={false} />
            </div>
          </div>
        </div>
      </section>

      <section id="construction-services" aria-labelledby="challenge-heading" className={`${container} scroll-mt-28 py-10 lg:py-12`}>
        <div className="mb-3 flex items-center gap-3"><p className="text-xs font-semibold uppercase tracking-[.14em] text-gold-700 sm:text-sm">{t("challenge.eyebrow")}</p><span className="h-px w-20 bg-gold-600" aria-hidden="true" /></div>
        <h2 id="challenge-heading" className={sectionHeading}>{t("challenge.title")}</h2>
        <p className="mt-3 max-w-[45rem] text-base leading-relaxed text-slate-700 sm:text-lg">{t("challenge.subtitle")}</p>
        <div role="tablist" aria-label={t("challenge.title")} className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
          {challenges.map(({ key, icon: Icon }, index) => (
            <button key={key} id={`services-problem-${key}`} type="button" role="tab" aria-label={t(`challenge.options.${key}.title`)} aria-selected={selected === index} aria-controls="challenge-recommendations" tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)}
              onKeyDown={event => {
                let next: number | undefined;
                if (event.key === "ArrowRight") next = (index + 1) % challenges.length;
                else if (event.key === "ArrowLeft") next = (index - 1 + challenges.length) % challenges.length;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = challenges.length - 1;
                if (next === undefined) return;
                event.preventDefault();
                setSelected(next);
                document.getElementById(`services-problem-${challenges[next].key}`)?.focus();
              }}
              className={`flex min-h-20 min-w-0 items-center gap-3 rounded-xl border p-4 text-left text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600 sm:gap-5 sm:text-base lg:px-6 ${selected === index ? "border-brand-900 bg-[linear-gradient(125deg,#0c3931,#06352f)] text-white" : "border-slate-200 bg-white text-brand-950 hover:border-gold-600"}`}>
              <Icon className={`size-6 shrink-0 sm:size-8 ${selected === index ? "text-gold-200" : "text-gold-800"}`} strokeWidth={1.6} aria-hidden="true" />
              <span className="min-w-0 break-words sm:hidden">{t(`challenge.options.${key}.shortLabel`)}</span>
              <span className="hidden min-w-0 break-words sm:block">{t(`challenge.options.${key}.title`)}</span>
            </button>
          ))}
        </div>

        <div id="challenge-recommendations" role="tabpanel" tabIndex={0} aria-labelledby={`services-problem-${active.key}`} className="@container mt-6 rounded-xl bg-[#f4f8f5] p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600 sm:p-6">
          <div className="grid gap-6 @min-[56rem]:grid-cols-[minmax(0,1fr)_minmax(0,23rem)]">
            <div className="min-w-0">
              <div className="flex items-center gap-3"><p className="text-xs font-semibold uppercase tracking-[.12em] text-gold-700 sm:text-sm">{t("challenge.priorityLabel")}</p><span className="h-px w-20 bg-gold-600" aria-hidden="true" /></div>
              <h3 className="mt-3 font-heading text-[1.75rem] font-bold leading-[1.15] tracking-tight text-[#071923] sm:text-[2rem]">{t(`challenge.options.${active.key}.panelTitle`)}</h3>
              <p className="mt-2 max-w-[50rem] text-base leading-relaxed text-[#596d77] sm:text-lg">{t(`challenge.options.${active.key}.panelDescription`)}</p>
            </div>
            <div className="flex min-w-0 items-center gap-4 border-t border-[#cbd8d3] pt-5 @min-[56rem]:border-t-0 @min-[56rem]:border-l @min-[56rem]:pt-0 @min-[56rem]:pl-6">
              <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#dfeee7] text-[#0b5749]" aria-hidden="true"><Target className="size-9" strokeWidth={1.6} /></span>
              <div className="min-w-0"><p className="text-xs font-bold uppercase tracking-[.1em] text-[#294641]">{t("challenge.goalLabel")}</p><p className="mt-2 text-sm leading-relaxed text-[#596d77]">{t(`challenge.options.${active.key}.goal`)}</p></div>
            </div>
          </div>
          <div className="mt-6 grid gap-4 @min-[56rem]:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,1fr)]">
            {active.services.map((slug, index) => {
              const service = services.find(item => getServiceHref(item).replace(/^\//, "") === slug);
              const href = service ? getServiceHref(service) : `/${slug}`;
              const featured = index === 0;
              const rank = recommendationRanks[index];
              const Icon = serviceIcons[slug];
              const price = priceFor(service, !featured);
              return (
                <article key={`${active.key}-${slug}`} data-priority-service={rank} className={`flex min-w-0 flex-col overflow-hidden rounded-xl border bg-white ${featured ? "border-gold-500" : "border-slate-200"}`}>
                  <div className={`flex min-h-[3.25rem] flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b px-5 py-3 ${featured ? "border-brand-900 bg-[linear-gradient(125deg,#0c3931,#06352f)] text-white" : "border-slate-200 bg-[#f0f5f2] text-[#0b3531]"}`}>
                    <p className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.08em] ${featured ? "text-gold-200" : ""}`}>{featured ? <Star className="size-4 fill-current" aria-hidden="true" /> : null}{t(`challenge.ranks.${rank}.label`)}</p>
                    <p className={`text-xs leading-relaxed ${featured ? "text-white/80" : "text-[#596d77]"}`}>{t(`challenge.ranks.${rank}.detail`)}</p>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex min-w-0 items-start gap-4">
                      <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#dfeee7] text-[#0b5749]" aria-hidden="true"><Icon className="size-7" strokeWidth={1.6} /></span>
                      <div className="min-w-0"><h4 className="font-heading text-xl font-bold leading-[1.2] text-[#071923]">{t(`challenge.options.${active.key}.serviceNames.${index}`)}</h4><p className="mt-2 text-base leading-[1.5] text-[#596d77]">{t(`challenge.options.${active.key}.taglines.${index}`)}</p><p className="mt-3 text-sm leading-relaxed text-[#596d77]">{t(`challenge.options.${active.key}.serviceDescriptions.${index}`)}</p></div>
                    </div>
                    <div className="mt-auto pt-5">
                      <div className={`border-t border-slate-200 pt-4 ${featured ? "flex flex-wrap items-end justify-between gap-4" : ""}`}>
                        <div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-[.06em] text-[#596d77]">{t(featured && price.startsWith("$") ? "challenge.investmentLabel" : "challenge.pricingLabel")}</p><p data-service-price className={`mt-1 font-heading font-bold leading-tight tracking-tight text-[#071923] ${featured && price.startsWith("$") ? "text-4xl" : "text-2xl"}`}>{price}</p></div>
                        <Link href={href} data-service-href={slug} className={`inline-flex min-h-14 items-center justify-center gap-3 rounded-full px-5 py-3 text-center font-heading text-sm font-bold text-[#071923] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600 ${featured ? "bg-[linear-gradient(110deg,#f0c54b,#dfb236)] hover:brightness-105" : "mt-4 w-full border border-gold-500 hover:bg-gold-50"}`}><span className="min-w-0">{t(`challenge.actions.${slug}`)}</span><ArrowRight className="size-5 shrink-0" aria-hidden="true" /></Link>
                      </div>
                      {featured ? <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2">{([0, 1, 2] as const).map(benefit => <li key={benefit} className="flex items-start gap-1.5 text-xs leading-5 text-[#071923]"><span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-[#0b5749] text-white" aria-hidden="true"><Check className="size-3" /></span><span>{t(`challenge.options.${active.key}.benefits.${benefit}`)}</span></li>)}</ul> : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mt-7 grid gap-5 border-t border-[#d5e0db] pt-5 @min-[56rem]:grid-cols-[minmax(0,1.4fr)_minmax(0,2fr)]">
            <div><h4 className="font-heading text-xl font-bold text-[#071923]">{t("challenge.whyTitle")}</h4><p className="mt-2 text-sm leading-relaxed text-[#596d77]">{t(`challenge.options.${active.key}.whyBody`)}</p></div>
            <ul className="grid gap-4 sm:grid-cols-3">{active.services.map((slug, index) => { const Icon = serviceIcons[slug]; return <li key={slug} className="flex min-w-0 items-start gap-3 border-t border-[#d5e0db] pt-4 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-4"><Icon className="size-6 shrink-0 text-[#0b5749]" strokeWidth={1.6} aria-hidden="true" /><div className="min-w-0"><p className="text-sm font-semibold leading-snug text-[#071923]">{t(`challenge.options.${active.key}.serviceNames.${index}`)}</p><p className="mt-1 text-sm leading-relaxed text-[#596d77]">{t(`challenge.options.${active.key}.roles.${index}`)}</p></div></li>; })}</ul>
          </div>
          <p className="mt-5 flex items-start gap-3 border-t border-[#d5e0db] pt-4 text-sm leading-relaxed text-[#596d77]"><Info className="size-5 shrink-0 text-[#294641]" aria-hidden="true" />{t("challenge.priceScope")}</p>
        </div>
      </section>

      <section id="support-plans" aria-labelledby="packages-heading" className={`${container} @container border-t border-slate-200 py-10 lg:py-12`}>
        <div className="grid items-center gap-6 @min-[72rem]:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] @min-[72rem]:gap-10">
          <div className="min-w-0">
            <div className="mb-3 flex items-center gap-3"><p className="text-xs font-semibold uppercase tracking-[.12em] text-gold-700 sm:text-sm">{t("packages.title")}</p><span className="h-px w-24 shrink-0 bg-gold-600" aria-hidden="true" /></div>
            <h2 id="packages-heading" className={sectionHeading}>{t("packages.heading")}</h2>
            <p className="mt-3 text-base leading-relaxed text-slate-700 sm:text-lg">{t("packages.subtitle")}</p>
          </div>
          <div className="flex min-w-0 items-center gap-5">
            <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#e7f3ef] text-[#06473d] sm:size-20" aria-hidden="true"><ShieldCheck className="size-10" strokeWidth={1.6} /></span>
            <div className="min-w-0 border-l border-slate-300 pl-5"><h3 className="font-heading text-xl font-semibold leading-tight">{t("packages.assuranceTitle")}</h3><p className="mt-2 text-base leading-snug text-slate-700">{t("packages.assuranceBody")}</p></div>
          </div>
        </div>
        <div className="mt-8 grid gap-4 @min-[72rem]:grid-cols-3 @min-[72rem]:gap-5">
          {packages.map(({ key, icon: Icon }) => {
            const tier = advisoryTiers.find(item => item.slug?.current?.toLowerCase().includes(key) || item.name.toLowerCase().includes(key));
            const fallback = t.raw(`packages.${key}.fallbackFeatures`) as string[];
            const cms = tier?.features?.filter(feature => typeof feature === "string" && feature.trim());
            const allFeatures = locale === "es" ? fallback : cms?.length ? cms : fallback;
            const features = allFeatures.filter(feature => !/^(everything|todo|incluye todo)/i.test(feature) && !separatePlanBenefits.test(feature));
            const executive = key === "executive";
            const growth = key === "growth";
            const amount = (tier?.price || pageT(`ComparisonTable.investmentTiers.${key}`)).replace(/^(?:from|desde)\s+/i, "").replace(/\+$/, "");
            return (
              <article key={key} data-support-plan={key} className={`relative flex min-w-0 flex-col rounded-xl border p-5 pt-10 sm:p-7 sm:pt-10 ${executive ? "border-[#04372f] bg-[linear-gradient(125deg,#0c3931,#04372f)] text-white" : growth ? "border-gold-600 bg-[#fcf8ed]" : "border-slate-200 bg-white"}`}>
                {growth && <span className="absolute right-6 top-0 rounded-b-2xl bg-[linear-gradient(110deg,#f0c54b,#dfb236)] px-4 py-2 text-xs font-bold uppercase tracking-[.08em] text-brand-950">{t("packages.popular")}</span>}
                <div className="flex min-w-0 items-center gap-4">
                  <span className={`flex size-16 shrink-0 items-center justify-center rounded-full ${executive ? "bg-white/15 text-white" : growth ? "bg-[#f6efdb] text-gold-700" : "bg-[#e7f3ef] text-[#06473d]"}`} aria-hidden="true"><Icon className="size-9" strokeWidth={1.6} /></span>
                  <div className="min-w-0"><h3 className="font-heading text-[1.75rem] font-bold leading-tight tracking-tight">{t(`packages.${key}.name`)}</h3><p className="mt-1 text-base leading-snug">{t(`packages.${key}.tagline`)}</p></div>
                </div>
                <p className={`mt-4 text-base leading-relaxed @min-[72rem]:min-h-[4.5rem] ${executive ? "text-white/85" : "text-slate-700"}`}>{t(`packages.${key}.description`)}</p>
                <div className={`mt-5 border-t pt-4 ${executive ? "border-white/35" : growth ? "border-gold-200" : "border-slate-200"}`}>
                  <p className={`text-xs font-semibold uppercase tracking-[.1em] ${executive ? "text-white/85" : "text-slate-700"}`}>{t("packages.startingAt")}</p>
                  <p data-plan-price className="mt-1 flex flex-wrap items-baseline gap-x-3 font-heading leading-tight"><span className="text-[2.75rem] font-bold tracking-tight tabular-nums">{amount}</span><span className="text-lg">/ {t("packages.year")}</span></p>
                </div>
                <div className={`mt-5 rounded-lg ${key === "foundation" ? "py-2" : `p-4 ${executive ? "bg-[#e7f3ef] text-[#071923]" : "bg-[#f6efdb] text-[#071923]"}`}`}>
                  {key !== "foundation" && <p className="text-xs font-bold uppercase leading-relaxed tracking-[.08em]">{t(`packages.${key}.includes`)}</p>}
                  <ul className={`${key !== "foundation" ? "mt-3 " : ""}space-y-3`}>
                    {features.map(feature => <li key={feature} className="flex items-start gap-3 text-base leading-snug"><Check className={`mt-0.5 size-5 shrink-0 ${growth ? "text-gold-700" : "text-[#06473d]"}`} strokeWidth={2.5} aria-hidden="true" /><span className="min-w-0">{feature}</span></li>)}
                  </ul>
                </div>
                {growth && <p className="mt-4 text-sm leading-relaxed text-slate-700">{t("packages.growth.welcomeBenefit")}</p>}
                <div className="mt-auto pt-6"><div className={`border-t pt-5 ${executive ? "border-white/35" : growth ? "border-gold-200" : "border-slate-200"}`}><Link href="/pricing" className={`inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full px-4 py-3 text-center font-heading text-base font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600 ${executive ? "border border-white text-white hover:bg-white/10" : growth ? "bg-[linear-gradient(110deg,#f0c54b,#dfb236)] text-brand-950 hover:brightness-105" : "border border-[#06473d] text-[#06473d] hover:bg-[#e7f3ef]"}`}><span className="min-w-0">{t(`packages.${key}.details`)}</span><ArrowRight className="size-5 shrink-0" aria-hidden="true" /></Link></div></div>
              </article>
            );
          })}
        </div>
        <div className="mt-6 grid items-center gap-6 rounded-xl bg-[#fafcfb] p-5 sm:p-6 @min-[72rem]:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_22rem]">
          <div className="flex min-w-0 items-start gap-4"><span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#e7f3ef] text-[#06473d]" aria-hidden="true"><FileText className="size-7" strokeWidth={1.6} /></span><div className="min-w-0"><h3 className="font-heading text-lg font-bold">{t("packages.scopeTitle")}</h3><p className="mt-1 text-sm leading-relaxed text-slate-700">{t("packages.priceScope")}</p></div></div>
          <div className="flex min-w-0 items-center gap-4 border-t border-slate-200 pt-5 @min-[72rem]:border-t-0 @min-[72rem]:border-l @min-[72rem]:pt-0 @min-[72rem]:pl-6"><span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#e7f3ef] text-[#06473d]" aria-hidden="true"><MessagesSquare className="size-7" strokeWidth={1.6} /></span><div className="min-w-0"><h3 className="font-heading text-lg font-bold">{t("packages.helpTitle")}</h3><p className="mt-1 text-sm leading-relaxed text-slate-700">{t("packages.helpBody")}</p></div></div>
          <div className="w-full"><BookingCtaLink href={BOOKING_ROUTE} label={t("bookingLabel")} openingLabel={bookingT("openingSchedulingCalendar")} externalLabel={bookingT("opensInNewTab")} placement="services_support_plans" viewTargetId="support-plans" showCalendarIcon={false} /></div>
        </div>
      </section>

      <section id="services-process-results" aria-labelledby="process-heading" className="bg-[#faf9f6] py-10 lg:py-12">
        <div className={container}>
          <header className="grid items-end gap-5 2xl:grid-cols-[minmax(0,1fr)_27rem] 2xl:gap-8">
            <div>
              <div className="flex items-center gap-4"><p className="text-sm font-semibold uppercase tracking-[.18em] text-gold-800">{t("process.title")}</p><span className="h-px w-24 bg-gold-600 sm:w-32" aria-hidden="true" /></div>
              <h2 id="process-heading" className={`mt-4 ${sectionHeading}`}>{t("process.heading")}</h2>
            </div>
            <div className="hidden items-center divide-x divide-gold-300 border-l border-slate-300 2xl:flex">
              <div className="flex-1 px-6"><p className="whitespace-pre-line text-xs font-semibold uppercase leading-relaxed tracking-[.12em] text-brand-900">{t("process.planningCaption")}</p><span className="mt-4 block h-px w-9 bg-gold-700" aria-hidden="true" /></div>
              <p className="flex-1 pl-6 text-base leading-relaxed text-slate-700">{t("process.supportingCaption")}</p>
            </div>
          </header>
          <div className="mt-8 grid gap-7 lg:mt-10 lg:grid-cols-[minmax(0,.95fr)_minmax(0,2fr)] lg:gap-8">
            <div className="flex flex-col lg:border-r lg:border-gold-200 lg:pr-8">
              <ol className="relative grid flex-1 before:absolute before:bottom-12 before:left-9 before:top-9 before:border-l before:border-dashed before:border-gold-600 sm:before:left-12 sm:before:top-12">
                {processIcons.map((Icon, index) => <li key={index} className="relative grid grid-cols-[4.5rem_minmax(0,1fr)] items-start gap-5 border-b border-gold-300 py-5 first:pt-0 last:border-b-0 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-7 lg:py-6">
                  <span className="relative flex size-18 items-center justify-center rounded-full bg-[#eaf0e9] ring-8 ring-[#faf9f6] sm:size-24" aria-hidden="true"><Icon className="size-9 text-[#0d4640] sm:size-12" strokeWidth={1.6} /></span>
                  <div className="min-w-0 pt-1"><span className="text-base font-semibold tabular-nums text-gold-800">0{index + 1}</span><h3 className="mt-1 font-heading text-2xl font-bold leading-tight text-brand-950 sm:text-[1.75rem]">{t(`process.steps.${index}.title`)}</h3><p className="mt-2 text-base leading-snug text-slate-700 sm:text-lg">{t(`process.steps.${index}.description`)}</p></div>
                </li>)}
              </ol>
              <p className="mt-3 flex items-center gap-4 text-[.65rem] font-semibold uppercase tracking-[.2em] text-slate-700 sm:text-xs"><span className="h-px w-9 shrink-0 bg-gold-700" aria-hidden="true" />{t("process.footerCaption")}</p>
            </div>
            <article aria-labelledby="result-heading" className="grid min-w-0 gap-6 rounded-2xl border border-slate-200 bg-white/80 p-5 sm:p-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,.9fr)] lg:gap-7">
              <div className="flex min-w-0 flex-col lg:py-1">
                <div className="flex items-center gap-4"><p className="shrink-0 text-xs font-semibold uppercase tracking-[.16em] text-gold-800 sm:text-sm">{t("results.eyebrow")}</p><span className="h-px w-full max-w-48 bg-gold-600" aria-hidden="true" /></div>
                <h3 id="result-heading" className="mt-4 whitespace-pre-line font-heading text-[clamp(1.6rem,2.2vw,2.25rem)] font-bold leading-[1.18] tracking-[-.02em] text-brand-950">{t("results.title")}</h3>
                <p className="mt-3 text-base font-medium leading-snug text-slate-700 xl:text-lg">{resultT("company")}</p>
                <dl className="mt-6 space-y-4">
                  {(["beforeText", "afterText", "outcomeText"] as const).map((key, index) => <div key={key} className="grid gap-1 sm:grid-cols-[6.75rem_minmax(0,1fr)] sm:gap-4"><dt className="text-sm font-semibold text-brand-950">{t(`results.stages.${index}`)}</dt><dd className="text-sm leading-relaxed text-slate-700 sm:border-l sm:border-gold-300 sm:pl-5 xl:text-base">{index === 2 ? t("results.outcome") : resultT(key)}</dd></div>)}
                </dl>
                <figure className="m-0 mt-6 border-t border-gold-300 pt-5">
                  <blockquote className="font-body text-lg italic leading-snug text-brand-900 xl:text-xl">“{resultT("perspectiveQuote")}”</blockquote>
                  <figcaption className="mt-4 text-sm leading-relaxed"><span className="block font-semibold text-brand-950">{resultT("authorName")}</span><span className="block text-slate-700">{resultT("authorRole")}</span></figcaption>
                </figure>
                <div className="mt-auto pt-5">
                  <a href={`/${locale}/industries#torres-story`} className="hidden min-h-14 items-center justify-center gap-3 rounded-full bg-[#0d4640] px-7 py-3 text-center text-base font-semibold text-white hover:bg-brand-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600 xl:inline-flex">{t("results.readStory")}<ArrowRight className="size-5 shrink-0 text-gold-200" aria-hidden="true" /></a>
                  <a href={`/${locale}/industries#torres-story-mobile`} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#0d4640] px-7 py-3 text-center text-base font-semibold text-white hover:bg-brand-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600 xl:hidden">{t("results.readStory")}<ArrowRight className="size-5 shrink-0 text-gold-200" aria-hidden="true" /></a>
                </div>
              </div>
              <div className="relative hidden min-h-[34rem] overflow-hidden rounded-xl lg:block" aria-hidden="true">
                <Image src="/images/services-process-construction.webp" alt="" fill sizes="(min-width: 1536px) 340px, 28vw" className="object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(230,240,244,.88)_0%,rgba(230,240,244,.15)_38%,transparent_55%,rgba(4,27,24,.78)_100%)]" />
                <div className="absolute left-6 right-6 top-8"><p className="max-w-44 whitespace-pre-line text-lg font-semibold uppercase leading-[1.25] tracking-[.08em] text-brand-950">{t("results.imageHeadline")}</p><span className="mt-5 block h-px w-16 bg-gold-700" /></div>
                <div className="absolute bottom-6 left-6 right-6 text-right text-[.6rem] font-semibold uppercase leading-relaxed tracking-[.16em] text-white"><p>Union National Tax</p><p>{t("results.imageFooter")}</p><p className="mt-2 text-[.55rem] tracking-[.08em] text-white/85">{t("results.imageNote")}</p></div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="services-common-questions" aria-labelledby="services-faq-heading" className="bg-brand-50/10 py-10 lg:py-12">
        <div className={`${container} @container/questions`}>
          <div className="grid items-start gap-6 @min-[64rem]/questions:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
            <div className="min-w-0">
              <div className="flex items-center gap-5"><p className="text-sm font-semibold uppercase tracking-[.16em] text-gold-700">{pageT("FAQ.eyebrow")}</p><span className="h-px w-16 bg-gold-600" aria-hidden="true" /></div>
              <h2 id="services-faq-heading" className={`mt-4 ${sectionHeading}`}>{pageT("FAQ.title")}</h2>
              <p className="mt-3 text-base leading-relaxed text-slate-700 sm:text-xl">{pageT("FAQ.subtitle")}</p>
              <div className="mt-8 space-y-4">
                {faqItems.slice(0, 4).map((item, index) => <details key={index} name="services-faq" open={index === 0} onToggle={event => { if (event.currentTarget.open) setActiveFaq(index); }} className="group overflow-hidden rounded-xl border border-slate-200 bg-white open:border-brand-300 open:bg-brand-50/25">
                  <summary aria-controls={`services-faq-answer-${index}`} className="box-border! grid min-h-22 cursor-pointer list-none grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 p-4 font-heading text-base font-semibold leading-snug text-brand-950 hover:bg-brand-50/15 active:bg-brand-50/35 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-gold-700 sm:min-h-24 sm:gap-4 sm:p-6 sm:text-lg [&::-webkit-details-marker]:hidden">
                    <span className="flex size-10 items-center justify-center rounded-full bg-brand-50/60 font-body text-base font-medium sm:size-12" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <span className="min-w-0">{item.question}</span>
                    <span className="flex size-10 items-center justify-center rounded-full bg-brand-50/40 sm:size-12" aria-hidden="true"><ChevronDown className="size-5 transition-transform group-open:rotate-180 motion-reduce:transition-none" /></span>
                  </summary>
                  <div id={`services-faq-answer-${index}`} className="mx-4 border-t border-brand-100 py-5 sm:mx-6 sm:py-6"><p className="text-base leading-relaxed text-slate-700 sm:pl-16 sm:text-lg">{item.answer}</p></div>
                </details>)}
              </div>
            </div>
            <aside id="services-faq-guide" aria-labelledby="services-faq-guide-heading" aria-describedby="services-faq-guide-context" className="min-w-0 rounded-xl border border-brand-100 bg-white p-5 sm:p-7 @min-[64rem]/questions:mt-11">
              <div className="flex items-center gap-4"><p className="text-xs font-semibold uppercase tracking-[.16em] text-gold-700 sm:text-sm">{pageT("FAQ.guide.eyebrow")}</p><span className="h-px w-16 shrink-0 bg-gold-600" aria-hidden="true" /></div>
              <h3 id="services-faq-guide-heading" className="mt-4 font-heading text-2xl font-bold leading-[1.12] tracking-tight text-brand-950 sm:text-3xl">{pageT("FAQ.guide.title")}</h3>
              <p id="services-faq-guide-context" role="status" className="sr-only">{pageT("FAQ.guide.context", { question: faqItems[activeFaq]?.question || pageT("FAQ.title") })}</p>
              <ul className="mt-7 space-y-7">{faqGuidePoints.map((point, index) => { const Icon = faqGuideIcons[index] || FileText; return <li key={index} className="flex min-w-0 items-start gap-4"><span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-brand-50/40 text-brand-500" aria-hidden="true"><Icon className="size-7" strokeWidth={1.5} /></span><div className="min-w-0"><h4 className="font-heading text-base font-semibold leading-snug text-brand-950 sm:text-lg">{point.title}</h4><p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">{point.body}</p></div></li>; })}</ul>
              <div className="mt-7 border-t border-brand-100 pt-6">
                <div className="flex items-start gap-4"><span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-brand-50/40 text-brand-500" aria-hidden="true"><Phone className="size-7" strokeWidth={1.5} /></span><div className="min-w-0"><h4 className="font-heading text-lg font-semibold leading-snug text-brand-950">{pageT("FAQ.guide.supportTitle")}</h4><p id="services-faq-support-description" className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">{pageT("FAQ.guide.supportBody")}</p></div></div>
                <div className="mt-5 [&>a]:rounded-xl [&>a]:bg-gold-700 [&>a]:text-white [&>a]:tracking-normal [&>a:hover]:bg-gold-800 [&>a:active]:bg-gold-900 [&>a]:focus-visible:ring-offset-white"><BookingCtaLink href={BOOKING_ROUTE} label={t("bookingLabel")} openingLabel={bookingT("openingSchedulingCalendar")} externalLabel={bookingT("opensInNewTab")} placement="services_faq_guide" viewTargetId="services-common-questions" descriptionId="services-faq-support-description" showCalendarIcon={false} /></div>
                <Link href="#support-plans" className="mt-3 inline-flex min-h-11 items-center rounded-sm text-sm font-semibold text-brand-500 underline underline-offset-4 hover:text-brand-700 active:text-brand-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-700">{pageT("FAQ.guide.supportOptions")}</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

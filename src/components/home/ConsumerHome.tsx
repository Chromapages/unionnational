import Image from "next/image";
import {
    ArrowRight,
    ArrowUpRight,
    CalendarDays,
    ChartNoAxesColumnIncreasing,
    Clock3,
    FileText,
    Flag,
    Layers3,
    Lightbulb,
    ListChecks,
    Network,
    Percent,
    Target,
    TrendingUp,
    UserRound,
} from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BOOKING_ROUTE } from "@/lib/booking";
import { BookingCtaLink } from "./BookingCtaLink";
import { HomeOutcomeTabs } from "./HomeOutcomeTabs";
import { HomeHeroVideo } from "./HomeHeroVideo";
import { FinalBookingCTA } from "./FinalBookingCTA";
import { ConstructionBookFeature } from "./ConstructionBookFeature";
import { ClientLogoStrip, type ClientLogo } from "@/components/contact/ClientLogoStrip";

const reviewIcons = [Network, ChartNoAxesColumnIncreasing, FileText, Target] as const;
const evaluateIcons = [Percent, Layers3, CalendarDays, TrendingUp] as const;
const leaveWithIcons = [Lightbulb, ListChecks, Flag] as const;
const sectionHeading = "max-w-[32ch] font-heading text-3xl font-bold leading-[1.12] tracking-[-.025em] text-balance sm:text-4xl lg:text-[2.75rem]";
const sectionLabel = "font-body text-xs font-semibold uppercase leading-[1.4] tracking-[0.12em] md:text-[0.8125rem] lg:text-sm";
const sectionIntroduction = "mt-3 font-body text-base leading-relaxed sm:text-xl";
const googleReviewsHref = "https://www.google.com/maps?place_id=ChIJ2-O-k5KaTYcRGjTyVDLXczw&q=place_id%3AChIJ2-O-k5KaTYcRGjTyVDLXczw";

export async function ConsumerHome({ heroVideoSrc, heroVideoPoster, clientLogos = [] }: { heroVideoSrc?: string; heroVideoPoster?: string; clientLogos?: ClientLogo[] }): Promise<React.JSX.Element> {
    const locale = await getLocale();
    const homepageContainer = "mx-auto w-full max-w-[94rem] px-4 sm:px-6 lg:px-8";
    const t = await getTranslations("ConsumerHome");
    const cta = await getTranslations("HomePage.CTASection");

    return (
        <>
            <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden bg-brand-950 text-white">
                <Image src="/images/resources-hero-desk.webp" alt="" fill priority sizes="100vw" className="-z-20 object-cover object-[65%_center]" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950 via-brand-900/95 to-brand-950/60" aria-hidden="true" />
                <div className={`${homepageContainer} flex flex-wrap items-center gap-8 py-10 lg:gap-12 lg:py-12`}>
                    <div className="min-w-0 max-w-[45rem] flex-[1_1_24rem]">
                        <p className="font-heading text-xs font-bold uppercase tracking-[0.18em] text-gold-300">{t("hero.eyebrow")}</p>
                        <h1 id="hero-heading" className="mt-5 max-w-[16ch] font-heading text-[clamp(2.25rem,4vw,3.75rem)] font-bold leading-[1.08] tracking-[-.04em] text-balance">
                            {t("hero.titleLead")} <span className="text-gold-300">{t("hero.titleAccent")}</span>
                        </h1>
                        <p className="mt-5 max-w-[52ch] font-body text-lg leading-relaxed text-slate-100 sm:text-xl">{t("hero.subtitle")}</p>
                        <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                            <div className="w-full max-w-[19rem] sm:w-[18rem]">
                                <BookingCtaLink
                                    href={`${BOOKING_ROUTE}?returnTo=%2F`}
                                    label={t("hero.primaryCta")}
                                    openingLabel={cta("openingSchedulingCalendar")}
                                    externalLabel={cta("opensInNewTab")}
                                    placement="homepage_hero"
                                    viewTargetId="hero-heading"
                                />
                            </div>
                            <Link href="#how-it-works" data-analytics="hero_secondary_cta_click" className="inline-flex min-h-11 items-center font-heading text-sm font-semibold text-white underline decoration-gold-300 underline-offset-4 hover:text-gold-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300">
                                {t("hero.secondaryCta")}
                            </Link>
                        </div>
                        <p className="mt-5 font-body text-sm text-slate-200">{t("hero.microproof")}</p>
                    </div>
                    {heroVideoSrc ? (
                        <div className="min-w-0 flex-[1.35_1_29rem]" data-hero-video>
                            <HomeHeroVideo src={heroVideoSrc} poster={heroVideoPoster} />
                        </div>
                    ) : null}
                </div>
            </section>

            <ClientLogoStrip logos={clientLogos} />

            <section
                id="how-it-works"
                aria-labelledby="process-heading"
                className="scroll-mt-24 bg-[#fffefd] py-10 text-[#10151e] lg:py-12"
            >
                <div className={homepageContainer}>
                    <div className="text-center">
                        <p className={`${sectionLabel} text-[#806325]`}>{t("process.eyebrow")}</p>
                        <h2 id="process-heading" className={`${sectionHeading} mx-auto mt-4 text-[#082421]`}>
                            {t("process.title")}
                        </h2>
                        <p className={`${sectionIntroduction} mx-auto max-w-[70ch] text-[#29414f]`}>{t("process.subtitle")}</p>
                    </div>

                    <ol className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-5 xl:gap-x-16">
                        {([
                            { key: "review", icons: reviewIcons },
                            { key: "evaluate", icons: evaluateIcons },
                            { key: "leaveWith", icons: leaveWithIcons },
                        ] as const).map(({ key, icons }, stageIndex) => (
                            <li key={key} className="relative min-w-0 border-t border-[#e7d5ad] pt-6 first:border-t-0 first:pt-0 lg:row-span-3 lg:grid lg:grid-rows-subgrid lg:border-t-0 lg:pt-0 xl:pr-6 xl:pl-9 xl:first:pl-6">
                                <div className="flex items-center gap-5">
                                    <span className="font-heading text-[2.5rem] font-semibold leading-none text-[#8b6b2d] xl:text-[3.5rem]" aria-hidden="true">0{stageIndex + 1}</span>
                                    <span className="h-px flex-1 bg-[#d7b772]" aria-hidden="true" />
                                </div>
                                <div className="mt-4 lg:mt-0">
                                    <h3 className={`${sectionLabel} text-[#806325] xl:text-base xl:tracking-[0.16em]`}>{t(`process.${key}.label`)}</h3>
                                    <p className="mt-2 max-w-[35ch] font-body text-lg leading-[1.5] text-[#29414f] xl:text-xl xl:leading-[1.4]">{t(`process.${key}.description`)}</p>
                                </div>
                                <ul className={`mt-6 space-y-3 lg:mt-0 ${key === "leaveWith" ? "xl:space-y-4" : "xl:space-y-2"}`}>
                                    {icons.map((Icon, index) => (
                                        <li key={index} className={`flex items-center gap-4 xl:gap-6 ${key === "leaveWith" ? "min-h-16 xl:min-h-20" : "min-h-12 xl:min-h-16"}`}>
                                            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#f7f4ed] text-[#8b6b2d] xl:size-16" aria-hidden="true">
                                                <Icon className="size-6 xl:size-7" strokeWidth={1.6} />
                                            </span>
                                            {key === "leaveWith" ? (
                                                <div className="min-w-0">
                                                    <p className="font-heading text-lg font-semibold leading-[1.3] text-[#071923] lg:text-xl xl:text-[1.375rem]">{t(`process.leaveWith.${index + 1}`)}</p>
                                                    <p className="mt-1 font-body text-base leading-[1.4] text-[#29414f] xl:text-lg">{t(`process.leaveWith.details.${index + 1}`)}</p>
                                                </div>
                                            ) : (
                                                <span className="font-body text-lg leading-[1.4] text-[#101b2b] lg:text-xl xl:text-[1.375rem]">{t(`process.${key}.${index + 1}`)}</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                {stageIndex < 2 ? (
                                    <span className="absolute inset-y-3 -right-6 hidden w-px bg-[#e7d5ad] lg:block xl:-right-8" aria-hidden="true">
                                        <span className="absolute top-[48%] left-1/2 flex w-9 -translate-x-1/2 justify-center bg-[#fffefd] py-3 xl:w-12">
                                            <ArrowRight className="size-7 shrink-0 text-[#8b6b2d] xl:size-9" strokeWidth={1.6} />
                                        </span>
                                    </span>
                                ) : null}
                            </li>
                        ))}
                    </ol>

                    <div className="mt-8 flex flex-wrap items-center gap-6 rounded-xl border border-[#d7b772] bg-[#fdfbf7] p-6 lg:mt-10">
                        <div className="flex min-w-0 flex-[1_1_24rem] items-center gap-4">
                            <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#f7f4ed] text-[#8b6b2d] xl:size-20" aria-hidden="true"><CalendarDays className="size-7 xl:size-9" strokeWidth={1.6} /></span>
                            <div>
                                <h3 className="font-heading text-xl font-semibold leading-[1.3] text-[#071923]">{t("process.booking.title")}</h3>
                                <p className="mt-1 font-body text-base leading-[1.5] text-[#29414f]">{t("process.booking.subtitle")}</p>
                            </div>
                        </div>
                        <ul className="flex flex-wrap items-center gap-x-5 gap-y-4 border-t border-[#e7d5ad] pt-5 font-body text-sm leading-[1.4] text-[#29414f] xl:border-t-0 xl:border-l xl:pt-0 xl:pl-6">
                            {[
                                { icon: Clock3, label: t("process.booking.duration") },
                                { icon: FileText, label: t("process.booking.preparation") },
                                { icon: UserRound, label: t("process.booking.expert") },
                            ].map(({ icon: Icon, label }) => (
                                <li key={label} className="flex items-center gap-2">
                                    <Icon className="size-6 shrink-0 text-[#8b6b2d] xl:size-7" strokeWidth={1.6} aria-hidden="true" />
                                    <span className="max-w-[15ch]">{label}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="w-full sm:w-[20rem] xl:w-[18.5rem] [&>a]:min-h-[4.25rem] [&>a]:bg-[linear-gradient(110deg,#f3c550,#edb630)] [&>a]:text-lg [&>a]:tracking-normal">
                            <BookingCtaLink
                                href={`${BOOKING_ROUTE}?returnTo=%2F%23how-it-works`}
                                label={t("hero.primaryCta")}
                                openingLabel={cta("openingSchedulingCalendar")}
                                externalLabel={cta("opensInNewTab")}
                                placement="homepage_strategy_brief"
                                viewTargetId="how-it-works"
                                showCalendarIcon={false}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section id="outcomes" aria-labelledby="outcomes-heading" className="bg-[#fffdf9] py-10 lg:py-12">
                <div className={homepageContainer}>
                    <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
                        <div className="min-w-0 flex-[1_1_32rem]">
                            <p className={`${sectionLabel} text-[#806325]`}>{t("outcomes.eyebrow")}</p>
                            <h2 id="outcomes-heading" className={`${sectionHeading} mt-4 text-[#071923]`}>{t("outcomes.title")}</h2>
                            <p className={`${sectionIntroduction} max-w-[52rem] text-[#596d77]`}>{t("outcomes.subtitle")}</p>
                        </div>
                        <Link href="/services" className="group inline-flex min-h-11 items-center gap-3 self-start font-heading text-sm font-semibold text-[#071923] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-600 sm:text-base lg:mt-5">
                            <span className="border-b-2 border-[#c89d42] pb-1">{t("outcomes.allServices")}</span>
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </Link>
                    </div>

                    <HomeOutcomeTabs />

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-[#e9e4da] pt-4">
                        <div className="flex items-center gap-5">
                            <ChartNoAxesColumnIncreasing className="size-8 text-[#8a6b30]" strokeWidth={1.5} aria-hidden="true" />
                            <span className="h-8 w-px bg-[#c9b99a]" aria-hidden="true" />
                            <p className="font-body text-base italic text-[#263947] sm:text-lg">{t("outcomes.footerLine")}</p>
                        </div>
                        <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#806325]">{t("outcomes.footerMotto")}</p>
                    </div>
                </div>
            </section>

            <section id="client-results" aria-labelledby="reviews-heading" data-analytics="testimonials_section_view" className="scroll-mt-24 bg-[#fffefd] py-10 lg:py-12">
                <div className={homepageContainer}>
                    <p className={`${sectionLabel} text-[#806325]`}>{t("reviews.eyebrow")}</p>
                    <h2 id="reviews-heading" className={`${sectionHeading} mt-4 text-[#082421]`}>{t("reviews.title")}</h2>
                    <p className={`${sectionIntroduction} text-[#596d77]`}>{t("reviews.subtitle")}</p>

                    <div className="mt-7 grid gap-5 lg:grid-cols-3 lg:gap-6">
                        {([1, 2, 3] as const).map((review) => (
                            <figure key={review} className="m-0 flex min-h-[16rem] flex-col rounded-xl border border-[#e7e4db] bg-white p-6 lg:min-h-[17.5rem] lg:p-8">
                                <p className={`${sectionLabel} text-[#806325]`}>{t(`reviews.items.${review}.theme`)}</p>
                                <blockquote className="mt-5 font-body text-2xl leading-[1.35] tracking-[-.015em] text-[#082421]">“{t(`reviews.items.${review}.quote`)}”</blockquote>
                                <figcaption className="mt-auto border-t border-[#e7e4db] pt-5">
                                    <p className="font-heading text-lg font-semibold text-[#071923]">{t(`reviews.items.${review}.name`)}</p>
                                    <div className="mt-1 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs text-slate-600">
                                        <span>{t("reviews.sourceLabel")}</span>
                                        <a href={googleReviewsHref} target="_blank" rel="noopener noreferrer" data-analytics="testimonial_source_click" data-review-id={review} aria-label={`${t(`reviews.items.${review}.name`)} — ${t("reviews.viewSource")}`} className="inline-flex min-h-11 items-center gap-2 font-semibold text-[#082421] underline decoration-gold-600 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-600">
                                            {t("reviews.viewSource")}<ArrowUpRight className="size-4" aria-hidden="true" />
                                        </a>
                                    </div>
                                </figcaption>
                            </figure>
                        ))}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#e7e4db] pt-5">
                        <p className="font-body text-base text-[#596d77]">{t("reviews.storySupport")}</p>
                        {(["desktop", "mobile"] as const).map((layout) => (
                            <a key={layout} href={`/${locale}/industries#${layout === "desktop" ? "torres-story" : "torres-story-mobile"}`} data-analytics="testimonials_read_more_click" className={`${layout === "desktop" ? "hidden xl:inline-flex" : "inline-flex xl:hidden"} min-h-11 items-center gap-3 font-heading text-base font-semibold text-[#082421] underline decoration-gold-600 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-600`}>
                                {t("reviews.storyCta")}<ArrowRight className="size-5" aria-hidden="true" />
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {locale === "en" && <ConstructionBookFeature />}
            <FinalBookingCTA />
        </>
    );
}

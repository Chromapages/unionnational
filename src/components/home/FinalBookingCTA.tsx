"use client";

import { Clock3, FileText, UserRound } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { BOOKING_ROUTE } from "@/lib/booking";
import { BookingCtaLink } from "./BookingCtaLink";

export function FinalBookingCTA({ id = "contact", placement = "homepage_final_cta", label }: { id?: string; placement?: string; label?: string }) {
    const locale = useLocale();
    const t = useTranslations("ConsumerHome");
    const cta = useTranslations("HomePage.CTASection");
    const headingId = id === "contact" ? "final-cta-heading" : id + "-heading";
    const homepageContainer = "mx-auto w-full max-w-[94rem] px-4 sm:px-5 lg:px-8 " + (locale === "es" ? "min-[104rem]:max-w-[104rem]" : "");

    return (
    <section id={id} aria-labelledby={headingId} className="home-rhythm-section home-rhythm-pause bg-white py-6 md:py-9 lg:py-12">
        <div className={`${homepageContainer} @container`}>
            <div className="grid items-center gap-6 rounded-[14px] border border-[#e6e1d8] bg-[#fbf9f5] p-6 text-[#071923] shadow-[0_8px_24px_rgba(13,46,43,0.06)] sm:p-8 @min-[40rem]:grid-cols-2 @min-[84rem]:grid-cols-[minmax(0,1.3fr)_minmax(0,1.15fr)_minmax(0,1.8fr)_minmax(24rem,1fr)] @min-[84rem]:p-6">
                <div className="min-w-0">
                    <div className="flex items-center gap-3">
                        <p className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-[#806325] sm:text-sm">{t("final.eyebrow")}</p>
                        <span className="h-px w-16 bg-gold-400" aria-hidden="true" />
                    </div>
                    <h2 id={headingId} className="mt-3 font-heading text-[1.75rem] font-bold leading-[1.15] tracking-[-0.025em]">
                        {t("final.title")}{" "}<span className="block">{t("final.nextTitle")}</span>
                    </h2>
                </div>

                <div className="min-w-0 border-t border-[#e2cb9b] pt-6 @min-[40rem]:flex @min-[40rem]:self-stretch @min-[40rem]:items-center @min-[40rem]:border-t-0 @min-[40rem]:border-l @min-[40rem]:pt-0 @min-[40rem]:pl-6">
                    <p className="font-body text-base leading-[1.5] text-[#596d77]">{t("final.support")}</p>
                </div>

                <ul className="grid items-center gap-3 sm:grid-cols-3 @min-[40rem]:col-span-2 @min-[84rem]:col-span-1 @min-[84rem]:self-stretch @min-[84rem]:border-l @min-[84rem]:border-[#e2cb9b] @min-[84rem]:pl-4">
                    {([
                        { key: "duration", icon: Clock3 },
                        { key: "preparation", icon: FileText },
                        { key: "expert", icon: UserRound },
                    ] as const).map(({ key, icon: Icon }) => (
                        <li key={key} className="flex min-w-0 items-center gap-3 sm:flex-col sm:justify-center sm:gap-2 sm:border-l sm:border-[#e2cb9b] sm:pl-2 sm:text-center sm:first:border-l-0 sm:first:pl-0">
                            <Icon className="size-7 shrink-0 text-gold-500 sm:size-8" strokeWidth={1.8} aria-hidden="true" />
                            <div className="min-w-0">
                                <p className="font-body text-sm font-bold uppercase leading-[1.4] tracking-[0.04em]">{t(`final.${key}.label`)}</p>
                                <p className="mt-1 font-body text-sm leading-[1.4] text-[#596d77]">{t(`final.${key}.detail`)}</p>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="w-full max-w-[24rem] justify-self-center @min-[40rem]:col-span-2 @min-[84rem]:col-span-1 [&>a]:bg-[linear-gradient(105deg,#e1bc58,#d9ae3b)] [&>a:hover]:brightness-105 [&>a:active]:brightness-95 [&>a]:tracking-normal">
                    <BookingCtaLink
                        href={BOOKING_ROUTE}
                        label={label || t("hero.primaryCta")}
                        openingLabel={cta("openingSchedulingCalendar")}
                        externalLabel={cta("opensInNewTab")}
                        placement={placement}
                        viewTargetId={id}
                        descriptionId={`${id}-reassurance`}
                        showCalendarIcon={false}
                    />
                    <p id={`${id}-reassurance`} className="mt-3 text-center font-body text-sm leading-[1.5] text-[#596d77]">{t("final.reassurance")}</p>
                </div>
            </div>
        </div>
    </section>
    );
}

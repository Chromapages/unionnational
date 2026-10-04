"use client";

import { getBookingHref, isExternalBookingHref } from "@/lib/booking";
import { useTranslations } from "next-intl";
import { BookingCtaLink } from "./BookingCtaLink";
import { CtaTrustRow } from "./CtaTrustRow";

interface CTASectionProps {
    data?: {
        ctaTitle?: string;
        ctaSubtitle?: string;
        ctaButtonText?: string;
        ctaButtonUrl?: string;
        ctaBackgroundImage?: {
            asset?: unknown;
            alt?: string;
        };
    };
}

export function CTASection({ data }: CTASectionProps) {
    const t = useTranslations("HomePage.CTASection");

    // Fallbacks with translations
    const title = data?.ctaTitle || t("fallbackTitle");
    const subtitle = data?.ctaSubtitle || t("fallbackSubtitle");
    const buttonText = data?.ctaButtonText || t("fallbackButtonText");
    const buttonUrl = getBookingHref(data?.ctaButtonUrl);
    const schedulingNote = isExternalBookingHref(buttonUrl)
        ? t("externalBookingNote")
        : t("homepageSchedulingNote");
    const reassuranceItems = t("homepageReassurance").split(" · ").filter(Boolean);
    const trustItems = [
        { title: t("trustDurationTitle"), description: t("trustDurationDescription") },
        { title: t("trustObligationTitle"), description: t("trustObligationDescription") },
        { title: t("trustExpertTitle"), description: t("trustExpertDescription") },
    ];
    // ─── DEFAULT VARIANT ─────────────────────────────────────────────────────────
    return (
        <section id="contact" className="cta-decision-section relative bg-black">
            <div className="cta-decision-rail cta-decision-gutter mx-auto w-full max-w-screen-2xl">
                <div className="cta-decision-grid">
                    <div className="cta-decision-copy text-left">
                        <p className="cta-decision-eyebrow home-eyebrow text-gold-400">{t("globalEyebrow")}</p>
                        <h2 className="cta-decision-heading mt-4 max-w-[18ch] text-4xl font-bold leading-[1.08] tracking-tight text-white font-heading md:text-5xl">
                            {title}
                        </h2>
                        <p className="cta-decision-subtitle mt-4 max-w-[31rem] text-lg leading-relaxed text-slate-400 font-sans">{subtitle}</p>
                    </div>
                    <div className="cta-decision-action">
                        <BookingCtaLink
                            href={buttonUrl}
                            label={buttonText}
                            openingLabel={t("openingSchedulingCalendar")}
                            externalLabel={t("opensInNewTab")}
                            placement="sitewide_cta"
                            descriptionId="sitewide-scheduling-note"
                        />
                        <div className="mt-3">
                            <ul className="flex flex-wrap gap-x-3 gap-y-1 text-sm leading-6 text-slate-400 font-sans">
                                {reassuranceItems.map((item) => <li key={item}>{item}</li>)}
                            </ul>
                            <p id="sitewide-scheduling-note" className="mt-2 text-sm leading-5 text-slate-500 font-sans">{schedulingNote}</p>
                        </div>
                    </div>
                </div>
                <CtaTrustRow items={trustItems} />
            </div>
        </section>
    );
}

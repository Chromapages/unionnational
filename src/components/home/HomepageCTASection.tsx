import { getTranslations } from "next-intl/server";
import { getBookingHref, isExternalBookingHref } from "@/lib/booking";
import { BookingCtaLink } from "./BookingCtaLink";

interface HomepageCTASectionProps {
    data?: {
        ctaButtonUrl?: string;
    };
}

export async function HomepageCTASection({ data }: HomepageCTASectionProps) {
    const t = await getTranslations("HomePage.CTASection");
    const bookingHref = getBookingHref(data?.ctaButtonUrl);
    const schedulingNote = isExternalBookingHref(bookingHref)
        ? t("externalBookingNote")
        : t("homepageSchedulingNote");
    const reassuranceItems = t("homepageReassurance").split(" · ").filter(Boolean);

    return (
        <section id="contact" aria-labelledby="cta-heading" className="cta-decision-section relative bg-black">
            <div className="cta-decision-rail cta-decision-gutter mx-auto w-full max-w-screen-2xl">
                <div className="cta-decision-grid">
                    <div className="text-left">
                        <p className="max-w-[30rem] break-words text-pretty font-sans text-xs font-semibold uppercase leading-4 tracking-[0.12em] text-gold-300">
                            {t("homepageEyebrow")}
                        </p>
                        <h2 id="cta-heading" className="mt-4 max-w-[18ch] text-4xl font-bold leading-[1.08] tracking-tight text-white font-heading md:text-5xl">
                            {t("homepageTitle")}
                        </h2>
                        <p className="mt-4 max-w-[34ch] text-pretty text-lg leading-7 text-slate-400 font-sans sm:max-w-[31rem] sm:leading-relaxed">
                            {t("homepageSubtitle")}
                        </p>
                    </div>
                    <div className="cta-decision-action">
                        <BookingCtaLink
                            href={bookingHref}
                            label={t("homepageButtonText")}
                            openingLabel={t("openingSchedulingCalendar")}
                            externalLabel={t("opensInNewTab")}
                            placement="homepage_final_cta"
                            descriptionId="homepage-final-scheduling-note"
                        />
                        <div className="mt-3">
                            <ul className="flex flex-wrap gap-x-3 gap-y-1 text-sm leading-6 text-slate-400 font-sans">
                                {reassuranceItems.map((item) => <li key={item}>{item}</li>)}
                            </ul>
                            <p id="homepage-final-scheduling-note" className="mt-2 text-sm leading-5 text-slate-500 font-sans">{schedulingNote}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

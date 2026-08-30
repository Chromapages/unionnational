import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { InnerPageHeader } from "@/components/layout/InnerPageHeader";
import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { BookingReturnLink } from "@/components/booking/BookingReturnLink";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export const metadata = {
    title: "Choose a Time for Your Tax Strategy Call",
    description: "Choose an available date and time for your tax strategy call with Union National Tax.",
};

const CAMPAIGN_PARAMETER_NAMES = new Set(["gclid", "fbclid", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]);

export default async function BookPage(props: { params: Promise<{ locale: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
    await props.params;
    const t = await getTranslations("Booking");
    const searchParams = await props.searchParams;
    const returnTo = typeof searchParams.returnTo === "string" ? searchParams.returnTo : undefined;
    const returnsToStrategyOverview = returnTo === "/#contact";
    const safeReturnTo = returnsToStrategyOverview ? returnTo : "/";
    const campaignParams = Object.fromEntries(
        Object.entries(searchParams).filter(([key, value]) => CAMPAIGN_PARAMETER_NAMES.has(key) && typeof value === "string")
    ) as Record<string, string>;

    return (
        <>
            <link rel="preconnect" href="https://link.agent-crm.com" crossOrigin="anonymous" />
            <HeaderWrapper />
            <main id="main-content" className="min-h-screen bg-white selection:bg-gold-500/30">
                <InnerPageHeader
                    navigation={
                        <nav aria-label="Return navigation">
                            <BookingReturnLink
                                href={safeReturnTo}
                                label={returnsToStrategyOverview ? "Back to strategy overview" : "Back to home"}
                            />
                        </nav>
                    }
                    title={<>Choose a time for your <span className="text-gold-400 md:whitespace-nowrap">tax strategy call</span></>}
                    metadata={t("meetingMeta")}
                    description={t("calendarIntro")}
                />

                <section className="px-4 py-6 sm:px-6" aria-labelledby="booking-calendar-heading">
                    <div className="mx-auto max-w-screen-2xl">
                        <div className="overflow-hidden rounded-2xl border border-brand-900/20 bg-white shadow-[0_20px_50px_rgba(4,42,37,0.12)]">
                            <h2 id="booking-calendar-heading" className="sr-only">Appointment calendar</h2>
                            <BookingCalendar campaignParams={campaignParams} />
                        </div>
                        <p className="mt-4 text-sm leading-6 text-slate-600">
                            {t("calendarSupport")} {" "}
                            <Link href="/contact" className="font-semibold text-brand-900 underline decoration-gold-600 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600">
                                {t("calendarSupportLink")}
                            </Link>
                            <span aria-hidden="true"> · </span>
                            <Link href="/legal/privacy-policy" className="font-semibold text-brand-900 underline decoration-gold-600 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600">
                                {t("calendarPrivacyLink")}
                            </Link>
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

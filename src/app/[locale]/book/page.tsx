import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { InnerPageHeader } from "@/components/layout/InnerPageHeader";
import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { BookingReturnLink } from "@/components/booking/BookingReturnLink";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { normalizeBookingReturnTo } from "@/lib/booking";
import { localizedAlternates } from "@/lib/seo/localizedAlternates";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Booking" });
    return {
        title: `${t("pageTitle")} | Union National Tax`,
        description: t("calendarIntro"),
        alternates: localizedAlternates(locale, "/book"),
    };
}

const CAMPAIGN_PARAMETER_NAMES = new Set(["gclid", "fbclid", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]);

export default async function BookPage(props: { params: Promise<{ locale: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
    await props.params;
    const t = await getTranslations("Booking");
    const searchParams = await props.searchParams;
    const returnTo = typeof searchParams.returnTo === "string" ? searchParams.returnTo : undefined;
    const safeReturnTo = normalizeBookingReturnTo(returnTo) || "/";
    const returnsToStrategyOverview = safeReturnTo === "/#contact";
    const campaignParams = Object.fromEntries(
        Object.entries(searchParams).filter(([key, value]) => CAMPAIGN_PARAMETER_NAMES.has(key) && typeof value === "string")
    ) as Record<string, string>;

    return (
        <>
            <link rel="preconnect" href="https://link.agent-crm.com" crossOrigin="anonymous" />
            <HeaderWrapper />
            <main id="main-content" className="min-h-screen bg-white selection:bg-gold-500/30">
                <InnerPageHeader
                    headingId="booking-heading"
                    className="pt-6 md:pt-8 [&>div]:max-w-[94rem]"
                    navigation={<nav className="xl:hidden" aria-label={t("returnNavigation")}><BookingReturnLink href={safeReturnTo} label={returnsToStrategyOverview ? t("backStrategy") : safeReturnTo === "/" ? t("backHome") : t("backPage")} /></nav>}
                    title={t("pageTitle")}
                    metadata={t("meetingMeta")}
                />
                <section id="booking-calendar" className="scroll-mt-24 bg-white px-4 py-6 sm:px-6 lg:px-8" aria-labelledby="booking-calendar-heading">
                    <div className="mx-auto w-full max-w-[94rem]">
                        <div className="overflow-hidden rounded-2xl border border-brand-900/20 bg-white shadow-[0_20px_50px_rgba(4,42,37,0.12)]">
                            <h2 id="booking-calendar-heading" className="sr-only">{t("calendarHeading")}</h2>
                            <BookingCalendar campaignParams={campaignParams} />
                        </div>
                        <p className="mt-3 flex flex-wrap items-center gap-x-2 text-sm leading-6 text-slate-700"><span>{t("calendarSupport")}</span><Link href="/contact" className="inline-flex min-h-11 items-center rounded-sm font-semibold text-brand-900 underline decoration-gold-600 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-700">{t("calendarSupportLink")}</Link></p>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

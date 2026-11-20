import { sanityFetch } from "@/sanity/lib/live";
import { SERVICES_QUERY, HEADER_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { HeaderLayout } from "./HeaderLayout";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export async function HeaderWrapper({ bookingCta = false }: { bookingCta?: boolean }) {
    const locale = await getLocale();
    const [messages, siteSettingsResult, servicesResult] = await Promise.all([
        getMessages(),
        sanityFetch({ query: HEADER_SETTINGS_QUERY, params: { locale } }).catch(() => null),
        sanityFetch({ query: SERVICES_QUERY, params: { locale } }).catch(() => null),
    ]);
    const siteSettings = siteSettingsResult?.data;

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <HeaderLayout
                siteSettings={bookingCta && siteSettings ? { ...siteSettings, ctaButtonTextLocalized: undefined, ctaButtonUrl: undefined } : siteSettings}
                services={servicesResult?.data}
            />
        </NextIntlClientProvider>
    );
}

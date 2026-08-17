import { sanityFetch } from "@/sanity/lib/live";
import { SERVICES_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { HeaderLayout } from "./HeaderLayout";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export async function HeaderWrapper() {
    const locale = await getLocale();
    const [messages, siteSettingsResult, servicesResult] = await Promise.all([
        getMessages(),
        sanityFetch({ query: SITE_SETTINGS_QUERY, params: { locale } }).catch(() => null),
        sanityFetch({ query: SERVICES_QUERY, params: { locale } }).catch(() => null),
    ]);

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <HeaderLayout
                siteSettings={siteSettingsResult?.data}
                services={servicesResult?.data}
            />
        </NextIntlClientProvider>
    );
}

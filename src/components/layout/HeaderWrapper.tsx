import { sanityFetch } from "@/sanity/lib/live";
import { SERVICES_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { HeaderLayout } from "./HeaderLayout";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export async function HeaderWrapper() {
    const locale = await getLocale();
    const [siteSettingsResult, servicesResult] = await Promise.all([
        sanityFetch({ query: SITE_SETTINGS_QUERY, params: { locale } }),
        sanityFetch({ query: SERVICES_QUERY, params: { locale } })
    ]);

    const messages = await getMessages();

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <HeaderLayout siteSettings={siteSettingsResult.data} services={servicesResult.data} />
        </NextIntlClientProvider>
    );
}

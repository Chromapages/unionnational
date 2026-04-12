import { sanityFetch } from "@/sanity/lib/live";
import { SERVICES_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { HeaderLayout } from "./HeaderLayout";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export async function HeaderWrapper() {
    const locale = await getLocale();
    const messages = await getMessages();
    const { data: siteSettings } = await sanityFetch({ query: SITE_SETTINGS_QUERY, params: { locale } });
    const { data: services } = await sanityFetch({ query: SERVICES_QUERY, params: { locale } });

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <HeaderLayout siteSettings={siteSettings} services={services} />
        </NextIntlClientProvider>
    );
}

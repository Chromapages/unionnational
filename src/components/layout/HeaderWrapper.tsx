import { sanityFetch } from "@/sanity/lib/live";
import { SERVICES_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { HeaderLayout } from "./HeaderLayout";
import { getLocale } from "next-intl/server";

export async function HeaderWrapper() {
    const locale = await getLocale();
    const { data: siteSettings } = await sanityFetch({ query: SITE_SETTINGS_QUERY, params: { locale } });
    const { data: services } = await sanityFetch({ query: SERVICES_QUERY, params: { locale } });

    return <HeaderLayout siteSettings={siteSettings} services={services} />;
}

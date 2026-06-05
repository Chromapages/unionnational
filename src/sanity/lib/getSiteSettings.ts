import { sanityFetchWithLocale } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

export async function getSiteSettings(locale: string = 'en') {
    const { data } = await sanityFetchWithLocale(SITE_SETTINGS_QUERY, locale as "en" | "es");
    return data;
}

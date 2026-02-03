import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

export async function getSiteSettings(locale: string = 'en') {
    const { data } = await sanityFetch({
        query: SITE_SETTINGS_QUERY,
        params: { locale },
    });
    return data;
}

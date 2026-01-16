import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

export async function getSiteSettings() {
    const { data } = await sanityFetch({
        query: SITE_SETTINGS_QUERY,
    });
    return data;
}

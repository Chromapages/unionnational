import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { HeaderLayout } from "./HeaderLayout";

export async function HeaderWrapper() {
    const { data: siteSettings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });

    return <HeaderLayout siteSettings={siteSettings} />;
}

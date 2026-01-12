import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { Header } from "./Header";

export async function HeaderWrapper() {
    const { data: siteSettings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });

    return <Header siteSettings={siteSettings} />;
}

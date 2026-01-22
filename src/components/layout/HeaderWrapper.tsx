import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { VaultNavbar } from "./FloatingNavbar";

export async function HeaderWrapper() {
    const { data: siteSettings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });

    return <VaultNavbar siteSettings={siteSettings} />;
}

import { PLAYBOOKS_QUERY, INDUSTRY_VERTICALS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { HubHero } from "@/components/hub/HubHero";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Authority Hub | Union National Tax",
    description: "Access our comprehensive playbooks and industry-specific tax strategies to optimize your business finances.",
};

export default async function HubPage(props: { params: Promise<{ locale: string }> }) {
    const { locale } = await props.params;

    const [{ data: allPlaybooks }, { data: industries }] = await Promise.all([
        sanityFetch({ query: PLAYBOOKS_QUERY, params: { locale } }),
        sanityFetch({ query: INDUSTRY_VERTICALS_QUERY, params: { locale } }),
    ]);

    const featuredPlaybooks = allPlaybooks?.filter((p: { isFeatured: boolean }) => p.isFeatured).slice(0, 3) || [];
    const displayIndustries = industries || [];

    return (
        <main className="bg-surface min-h-screen">
            <HeaderWrapper />
            <HubHero
                title="Authority Hub"
                subtitle="Comprehensive guides, playbooks, and industry-specific strategies to help you optimize your business tax structure and maximize savings."
                featuredPlaybooks={featuredPlaybooks}
                industryVerticals={displayIndustries}
            />
            <Footer />
        </main>
    );
}

import { INDUSTRY_VERTICALS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { HubHero } from "@/components/hub/HubHero";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Industry Guides | Authority Hub",
    description: "Industry-specific tax strategies and playbooks for construction, real estate, e-commerce, and more.",
};

export default async function IndustriesPage(props: { params: Promise<{ locale: string }> }) {
    const { locale } = await props.params;

    const { data: industries } = await sanityFetch({
        query: INDUSTRY_VERTICALS_QUERY,
        params: { locale },
    });

    const featuredPlaybooks: { title: string }[] = [];

    return (
        <main className="bg-surface min-h-screen">
            <HeaderWrapper />
            <HubHero
                title="Industry Guides"
                subtitle="Tailored tax strategies and playbooks for your specific industry. Get the insights you need to maximize deductions and minimize liability."
                featuredPlaybooks={featuredPlaybooks}
                industryVerticals={industries || []}
            />
            <Footer />
        </main>
    );
}

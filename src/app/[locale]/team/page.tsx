import type { Metadata } from "next";
import type { TeamMember } from "@/types/sanity";
import { getTranslations } from "next-intl/server";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { TeamHero } from "@/components/team/TeamHero";
import { FounderSpotlight } from "@/components/team/FounderSpotlight";
import { TeamGrid } from "@/components/team/TeamGrid";
import { FinalBookingCTA } from "@/components/home/FinalBookingCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_PAGE_QUERY, FOUNDER_QUERY, SITE_SETTINGS_QUERY, TEAM_MEMBERS_QUERY, TEAM_PAGE_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { localizedAlternates } from "@/lib/seo/localizedAlternates";

export const revalidate = 60;

export function generateStaticParams() {
    return [{ locale: "en" }, { locale: "es" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const [{ data: settings }, t] = await Promise.all([
        sanityFetch({ query: TEAM_PAGE_QUERY, params: { locale } }),
        getTranslations({ locale, namespace: "TeamPage.metadata" }),
    ]);
    const title = t("title"), description = t("description");
    const images = settings?.seo?.openGraphImage
        ? [urlFor(settings.seo.openGraphImage).width(1200).height(630).url()]
        : undefined;
    return {
        title, description,
        alternates: localizedAlternates(locale, "/team"),
        openGraph: { title, description, images },
        twitter: { title, description, images },
    };
}

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const [directory, metadata, header, { data: founder }, { data: members }, { data: about }, { data: siteSettings }] = await Promise.all([
        getTranslations({ locale, namespace: "TeamPage.directory" }),
        getTranslations({ locale, namespace: "TeamPage.metadata" }),
        getTranslations({ locale, namespace: "Header" }),
        sanityFetch({ query: FOUNDER_QUERY, params: { locale } }),
        sanityFetch({ query: TEAM_MEMBERS_QUERY, params: { locale } }),
        sanityFetch({ query: ABOUT_PAGE_QUERY, params: { locale } }),
        sanityFetch({ query: SITE_SETTINGS_QUERY, params: { locale } }),
    ]);
    const directoryMembers = founder
        ? [{ ...founder, isFounder: true, role: directory("founderRole") }, ...(members || []).filter((member: TeamMember) => member._id !== founder._id)]
        : members || [];
    return <div className="min-h-dvh bg-white font-sans text-brand-950 antialiased selection:bg-gold-500 selection:text-white">
        <JsonLd siteSettings={siteSettings} teamPageData={{ heroSubtitle: directory("heroSubtitle"), seo: { metaDescription: metadata("description") } }} />
        <HeaderWrapper />
        <main id="main-content">
            <TeamHero badge={directory("eyebrow")} title={directory("heroTitle")} subtitle={directory("heroSubtitle")} />
            <FounderSpotlight founder={founder} approvedTitle={typeof about?.approvedFounderTitle === "string" ? about.approvedFounderTitle : undefined} />
            <TeamGrid members={directoryMembers} title={directory("rosterTitle")} subtitle={directory("rosterSubtitle")} />
            <div className="homepage-rhythm"><FinalBookingCTA id="team-next-step" placement="team_final_cta" label={header("bookCall")} /></div>
        </main>
        <Footer bookingCta />
    </div>;
}

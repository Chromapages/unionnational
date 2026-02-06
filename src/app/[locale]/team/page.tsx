import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/home/CTASection";
import { client } from "@/sanity/lib/client";
import { FOUNDER_QUERY, SITE_SETTINGS_QUERY, TEAM_MEMBERS_QUERY, TEAM_PAGE_QUERY } from "@/sanity/lib/queries";
import { TeamHero } from "@/components/team/TeamHero";
import { FounderSpotlight } from "@/components/team/FounderSpotlight";
import { TeamGrid } from "@/components/team/TeamGrid";
import { ValuesSection } from "@/components/team/ValuesSection";
import { FloatingStrategyButton } from "@/components/team/FloatingStrategyButton";
import { HiringSection } from "@/components/team/HiringSection";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import { getTranslations } from "next-intl/server";

// Types
interface TeamMember {
    _id: string;
    name: string;
    role: string;
    credentials?: string;
    description: string;
    image: any;
    linkedinUrl?: string;
    tags?: string[];
}

interface TeamPageData {
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    founderSectionTitle: string;
    teamSectionTitle: string;
    teamSectionSubtitle: string;
    values?: Array<{ title?: string; description?: string; iconName?: string }>;
    hiringBadge: string;
    hiringTitle: string;
    hiringDescription: string;
    hiringBenefits: string[];
    hiringCtaText: string;
    hiringCtaUrl: string;
    hiringImage: any;
    ctaTitle?: string;
    ctaSubtitle?: string;
    ctaButtonText?: string;
    ctaButtonUrl?: string;
    ctaBackgroundImage?: {
        asset?: any;
        alt?: string;
    };
    seo?: {
        metaTitle?: string;
        metaDescription?: string;
        openGraphImage?: unknown;
    };
}

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const params = await props.params;
    const locale = params.locale;
    const { data: pageSettings } = await sanityFetch({ query: TEAM_PAGE_QUERY, params: { locale } });
    const seo = pageSettings?.seo;
    const t = await getTranslations({ locale, namespace: "TeamPage.metadata" });

    const ogImage = seo?.openGraphImage
        ? urlFor(seo.openGraphImage).width(1200).height(630).url()
        : undefined;

    return {
        title: seo?.metaTitle || t("title"),
        description: seo?.metaDescription || t("description"),
        openGraph: {
            ...(seo?.metaTitle || t("title") ? { title: seo?.metaTitle || t("title") } : {}),
            ...(seo?.metaDescription || t("description") ? { description: seo?.metaDescription || t("description") } : {}),
            ...(ogImage ? { images: [ogImage] } : {}),
        },
        twitter: {
            ...(seo?.metaTitle || t("title") ? { title: seo?.metaTitle || t("title") } : {}),
            ...(seo?.metaDescription || t("description") ? { description: seo?.metaDescription || t("description") } : {}),
            ...(ogImage ? { images: [ogImage] } : {}),
        },
    };
}

export default async function TeamPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const locale = params.locale;
    const t = await getTranslations({ locale, namespace: "TeamPage.fallbacks" });
    // Fetch data in parallel
    const [
        { data: pageSettings },
        { data: founder },
        { data: teamMembers },
        { data: siteSettings }
    ] = await Promise.all([
        sanityFetch({ query: TEAM_PAGE_QUERY, params: { locale } }),
        sanityFetch({ query: FOUNDER_QUERY, params: { locale } }),
        sanityFetch({ query: TEAM_MEMBERS_QUERY, params: { locale } }),
        sanityFetch({ query: SITE_SETTINGS_QUERY, params: { locale } }),
    ]);

    // Fallbacks for page settings if not yet set in CMS
    const settings = {
        heroBadge: pageSettings?.heroBadge || t("heroBadge"),
        heroTitle: pageSettings?.heroTitle || t("heroTitle"),
        heroSubtitle: pageSettings?.heroSubtitle || t("heroSubtitle"),
        founderSectionTitle: pageSettings?.founderSectionTitle || t("founderSectionTitle"),
        teamSectionTitle: pageSettings?.teamSectionTitle || t("teamSectionTitle"),
        teamSectionSubtitle: pageSettings?.teamSectionSubtitle || t("teamSectionSubtitle"),
        values: pageSettings?.values || [
            {
                title: t("values.precision.title"),
                description: t("values.precision.description"),
                iconName: "Scale",
            },
            {
                title: t("values.integrity.title"),
                description: t("values.integrity.description"),
                iconName: "ShieldCheck",
            },
            {
                title: t("values.partnership.title"),
                description: t("values.partnership.description"),
                iconName: "Handshake",
            },
        ],
        hiringBadge: pageSettings?.hiringBadge || t("hiringBadge"),
        hiringTitle: pageSettings?.hiringTitle || t("hiringTitle"),
        hiringDescription: pageSettings?.hiringDescription || t("hiringDescription"),
        hiringBenefits: pageSettings?.hiringBenefits || t.raw("hiringBenefits"),
        hiringCtaText: pageSettings?.hiringCtaText || t("hiringCtaText"),
        hiringCtaUrl: pageSettings?.hiringCtaUrl || "#",
        hiringImage: pageSettings?.hiringImage,
        seo: pageSettings?.seo,
    };

    return (
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <JsonLd siteSettings={siteSettings} teamPageData={pageSettings} />
            <HeaderWrapper />

            <main className="pt-0"> {/* pt-0 because Hero has its own padding */}

                <TeamHero
                    badge={settings.heroBadge}
                    title={settings.heroTitle}
                    subtitle={settings.heroSubtitle}
                />

                <FounderSpotlight
                    founder={founder}
                    title={settings.founderSectionTitle}
                />

                {/* Sentinel: once this is above viewport, show floating CTA */}
                <div id="after-founder" aria-hidden className="h-px" />

                <FloatingStrategyButton afterSectionId="after-founder" href="/contact" />

                {/* Standards Before Staff */}
                <ValuesSection values={settings.values} />

                {teamMembers && teamMembers.length > 0 && (
                    <TeamGrid
                        members={teamMembers}
                        title={settings.teamSectionTitle}
                        subtitle={settings.teamSectionSubtitle}
                    />
                )}

                <HiringSection settings={settings} />

                <CTASection data={pageSettings} />

            </main>

            <Footer />
        </div>
    );
}

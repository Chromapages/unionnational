import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { client } from "@/sanity/lib/client";
import { FOUNDER_QUERY, SITE_SETTINGS_QUERY, TEAM_MEMBERS_QUERY, TEAM_PAGE_QUERY } from "@/sanity/lib/queries";
import { TeamHero } from "@/components/team/TeamHero";
import { FounderSpotlight } from "@/components/team/FounderSpotlight";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import dynamic from "next/dynamic";

// Lazy load below-the-fold components
const ValuesSection = dynamic(() => import("@/components/team/ValuesSection").then(mod => ({ default: mod.ValuesSection })), {
    loading: () => <div className="h-64 animate-pulse bg-slate-100" />,
});

const TeamGrid = dynamic(() => import("@/components/team/TeamGrid").then(mod => ({ default: mod.TeamGrid })), {
    loading: () => <div className="h-64 animate-pulse bg-slate-100" />,
});

const HiringSection = dynamic(() => import("@/components/team/HiringSection").then(mod => ({ default: mod.HiringSection })), {
    loading: () => <div className="h-64 animate-pulse bg-slate-100" />,
});

const CTASection = dynamic(() => import("@/components/home/CTASection").then(mod => ({ default: mod.CTASection })), {
    loading: () => <div className="h-64 animate-pulse bg-slate-100" />,
});

export const revalidate = 60; // Revalidate every 60 seconds

// Generate static params for SSG
export async function generateStaticParams() {
    return [
        { locale: 'en' },
        { locale: 'es' },
    ];
}
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

            <main className="pt-0">
                {/* Above the fold - load immediately */}
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

                {/* Below the fold - lazy loaded */}
                <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100" />}>
                    <ValuesSection values={settings.values} />
                </Suspense>

                {teamMembers && teamMembers.length > 0 && (
                    <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100" />}>
                        <TeamGrid
                            members={teamMembers}
                            title={settings.teamSectionTitle}
                            subtitle={settings.teamSectionSubtitle}
                        />
                    </Suspense>
                )}

                <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100" />}>
                    <HiringSection settings={settings} />
                </Suspense>

                <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100" />}>
                    <CTASection data={pageSettings} />
                </Suspense>
            </main>

            <Footer />
        </div>
    );
}

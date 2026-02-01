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
    const { data: pageSettings } = await sanityFetch({ query: TEAM_PAGE_QUERY });
    const seo = pageSettings?.seo;

    if (!seo) {
        return {};
    }

    const ogImage = seo.openGraphImage
        ? urlFor(seo.openGraphImage).width(1200).height(630).url()
        : undefined;

    return {
        title: seo.metaTitle,
        description: seo.metaDescription,
        openGraph: {
            ...(seo.metaTitle ? { title: seo.metaTitle } : {}),
            ...(seo.metaDescription ? { description: seo.metaDescription } : {}),
            ...(ogImage ? { images: [ogImage] } : {}),
        },
        twitter: {
            ...(seo.metaTitle ? { title: seo.metaTitle } : {}),
            ...(seo.metaDescription ? { description: seo.metaDescription } : {}),
            ...(ogImage ? { images: [ogImage] } : {}),
        },
    };
}

export default async function TeamPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const locale = params.locale;
    // Fetch data in parallel
    const [pageSettings, founder, teamMembers, siteSettings] = await Promise.all([
        client.fetch<TeamPageData>(TEAM_PAGE_QUERY),
        client.fetch<TeamMember>(FOUNDER_QUERY),
        client.fetch<TeamMember[]>(TEAM_MEMBERS_QUERY),
        client.fetch(SITE_SETTINGS_QUERY),
    ]);

    // Fallbacks for page settings if not yet set in CMS
    const settings = {
        heroBadge: pageSettings?.heroBadge || "Our People",
        heroTitle: pageSettings?.heroTitle || "The experts behind your strategy.",
        heroSubtitle: pageSettings?.heroSubtitle || "We are a team of CPAs, Enrolled Agents, and financial strategists united by a single mission: preserving wealth for the modern economy.",
        founderSectionTitle: pageSettings?.founderSectionTitle || "Founder & Director",
        teamSectionTitle: pageSettings?.teamSectionTitle || "Our Team",
        teamSectionSubtitle: pageSettings?.teamSectionSubtitle || "Dedicated professionals managing your accounts.",
        values: pageSettings?.values || [
            {
                title: "Precision",
                description: "We don't deal in estimates or guesswork. Every strategy is calculated to the penny and backed by tax code.",
                iconName: "Scale",
            },
            {
                title: "Integrity",
                description: "We operate with total transparency. Our strategies are aggressive but always compliant, designed to withstand scrutiny.",
                iconName: "ShieldCheck",
            },
            {
                title: "Partnership",
                description: "We aren't just your accountants; we are your financial co-pilots, proactive year-round rather than reactive at tax time.",
                iconName: "Handshake",
            },
        ],
        hiringBadge: pageSettings?.hiringBadge || "Join the team",
        hiringTitle: pageSettings?.hiringTitle || "Obsessed with details? We're hiring.",
        hiringDescription: pageSettings?.hiringDescription || "We don't hire typical accountants. We hire problem solvers who love the puzzle of the tax code. If you believe in precision over speed and strategy over data entry, you belong here.",
        hiringBenefits: pageSettings?.hiringBenefits || [
            "Fully remote culture",
            "Competitive salary & equity",
            "Continuous education stipend"
        ],
        hiringCtaText: pageSettings?.hiringCtaText || "View Open Positions",
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

import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/home/CTASection";
import { client } from "@/sanity/lib/client";
import { FOUNDER_QUERY, TEAM_MEMBERS_QUERY, TEAM_PAGE_QUERY } from "@/sanity/lib/queries";
import { TeamHero } from "@/components/team/TeamHero";
import { FounderSpotlight } from "@/components/team/FounderSpotlight";
import { TeamGrid } from "@/components/team/TeamGrid";
import { ValuesSection } from "@/components/team/ValuesSection";
import { FloatingStrategyButton } from "@/components/team/FloatingStrategyButton";

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
    hiringBadge: string;
    hiringTitle: string;
    hiringDescription: string;
    hiringBenefits: string[];
    hiringCtaText: string;
    hiringCtaUrl: string;
    hiringImage: any;
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function TeamPage() {
    // Fetch data in parallel
    const [pageSettings, founder, teamMembers] = await Promise.all([
        client.fetch<TeamPageData>(TEAM_PAGE_QUERY),
        client.fetch<TeamMember>(FOUNDER_QUERY),
        client.fetch<TeamMember[]>(TEAM_MEMBERS_QUERY)
    ]);

    // Fallbacks for page settings if not yet set in CMS
    const settings = {
        heroBadge: pageSettings?.heroBadge || "Our People",
        heroTitle: pageSettings?.heroTitle || "The experts behind your strategy.",
        heroSubtitle: pageSettings?.heroSubtitle || "We are a team of CPAs, Enrolled Agents, and financial strategists united by a single mission: preserving wealth for the modern economy.",
        founderSectionTitle: pageSettings?.founderSectionTitle || "Founder & Director",
        teamSectionTitle: pageSettings?.teamSectionTitle || "Our Team",
        teamSectionSubtitle: pageSettings?.teamSectionSubtitle || "Dedicated professionals managing your accounts.",
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
        hiringImage: pageSettings?.hiringImage
    };

    return (
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <HeaderWrapper />

            <main className="pt-0 pb-20"> {/* pt-0 because Hero has its own padding */}
                
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
                <ValuesSection />

                {teamMembers && teamMembers.length > 0 && (
                    <TeamGrid 
                        members={teamMembers} 
                        title={settings.teamSectionTitle} 
                        subtitle={settings.teamSectionSubtitle} 
                    />
                )}

                <CTASection />

            </main>

            <Footer />
        </div>
    );
}

import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/home/CTASection";
import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_PAGE_QUERY } from "@/sanity/lib/queries";
import { AboutHero } from "@/components/about/AboutHero";
import { ClientLogosSection } from "@/components/about/ClientLogosSection";
import { TrustVault } from "@/components/about/TrustVault";
import { ValuesBento } from "@/components/about/ValuesBento";
import { FounderSection } from "@/components/about/FounderSection";
import { CompanyTimeline } from "@/components/about/CompanyTimeline";
import { FAQSection } from "@/components/home/FAQSection";

export default async function AboutPage() {
    const { data: page } = await sanityFetch({ query: ABOUT_PAGE_QUERY });

    return (
        <div className="min-h-dvh bg-brand-900 flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <HeaderWrapper />

            <main>
                <AboutHero
                    title={page?.heroTitle || "The Architects of Modern Wealth."}
                    subtitle={page?.heroSubtitle || "Union National Tax bridges the gap between complex IRS regulations and the agile needs of modern consultants, creators, and agencies."}
                    badge={page?.heroBadge}
                />

                <FounderSection videoUrl={page?.founderVideoUrl} />


                <CompanyTimeline />

                <ValuesBento />


                <TrustVault />

                <FAQSection variant="dark" />

                {/* <ClientLogosSection logos={page?.clientLogos} /> */}

                <CTASection data={page} />
            </main>

            <Footer />
        </div>
    );
}

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
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "AboutPage.metadata" });
    return {
        title: t("title"),
        description: t("description"),
    };
}

export default async function AboutPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const locale = params.locale;
    const { data: page } = await sanityFetch({ query: ABOUT_PAGE_QUERY, params: { locale } });
    const t = await getTranslations({ locale, namespace: "AboutPage.hero" });

    return (
        <div className="min-h-dvh bg-brand-900 flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <HeaderWrapper />

            <main>
                <AboutHero
                    title={page?.heroTitle || t("fallbackTitle")}
                    subtitle={page?.heroSubtitle || t("fallbackSubtitle")}
                    badge={page?.heroBadge}
                />

                <FounderSection
                    videoUrl={page?.founderVideoUrl}
                    videoFileUrl={page?.founderVideoFileUrl}
                    imageUrl={page?.founderImage?.asset?.url}
                    imageAlt={page?.founderImage?.alt}
                />


                <CompanyTimeline />

                <ValuesBento
                    eyebrow={page?.valuesEyebrow}
                    title={page?.valuesTitle}
                    values={page?.values}
                    primaryValue={page?.primaryValue}
                />


                <TrustVault />

                <FAQSection variant="dark" />

                {/* <ClientLogosSection logos={page?.clientLogos} /> */}

                <CTASection data={page} />
            </main>

            <Footer />
        </div>
    );
}

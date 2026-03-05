import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { AboutHero } from "@/components/about/AboutHero";
import { FounderSection } from "@/components/about/FounderSection";
import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_PAGE_QUERY } from "@/sanity/lib/queries";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";

// Lazy load below-the-fold components
const CompanyTimeline = dynamic(() => import("@/components/about/CompanyTimeline").then(mod => ({ default: mod.CompanyTimeline })), {
  loading: () => <div className="h-64 animate-pulse bg-slate-100" />,
});

const ValuesBento = dynamic(() => import("@/components/about/ValuesBento").then(mod => ({ default: mod.ValuesBento })), {
  loading: () => <div className="h-64 animate-pulse bg-slate-100" />,
});

const TrustVault = dynamic(() => import("@/components/about/TrustVault").then(mod => ({ default: mod.TrustVault })), {
  loading: () => <div className="h-64 animate-pulse bg-slate-100" />,
});

const FAQSection = dynamic(() => import("@/components/home/FAQSection").then(mod => ({ default: mod.FAQSection })), {
  loading: () => <div className="h-64 animate-pulse bg-slate-100" />,
});

const CTASection = dynamic(() => import("@/components/home/CTASection").then(mod => ({ default: mod.CTASection })), {
  loading: () => <div className="h-64 animate-pulse bg-slate-100" />,
});

export const revalidate = 60; // Revalidate every minute

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
                {/* Above the fold - load immediately */}
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

                {/* Below the fold - lazy loaded */}
                <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100" />}>
                    <CompanyTimeline />
                </Suspense>

                <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100" />}>
                    <ValuesBento
                        eyebrow={page?.valuesEyebrow}
                        title={page?.valuesTitle}
                        values={page?.values}
                        primaryValue={page?.primaryValue}
                    />
                </Suspense>

                <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100" />}>
                    <TrustVault />
                </Suspense>

                <Suspense fallback={<div className="h-64 animate-pulse bg-slate-900" />}>
                    <FAQSection variant="dark" />
                </Suspense>

                <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100" />}>
                    <CTASection data={page} />
                </Suspense>
            </main>

            <Footer />
        </div>
    );
}

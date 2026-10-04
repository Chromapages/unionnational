import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_PAGE_QUERY, FOUNDER_QUERY, TEAM_MEMBERS_QUERY } from "@/sanity/lib/queries";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { AboutDesktopExperience, type AboutDesktopMember } from "@/components/about/AboutDesktopExperience";
import { localizedAlternates } from "@/lib/seo/localizedAlternates";

export const revalidate = 60; // Revalidate every minute

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const [t, { data: page }] = await Promise.all([
        getTranslations({ locale, namespace: "AboutPage.metadata" }),
        sanityFetch({ query: ABOUT_PAGE_QUERY, params: { locale } }).catch(() => ({ data: null })),
    ]);
    
    return {
        title: t("title"),
        description: t("description"),
        alternates: localizedAlternates(locale, "/about"),
        ...(page?.seo?.noIndex ? { robots: { index: false, follow: false } } : {}),
    };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [{ data: page }, { data: members }, { data: founder }] = await Promise.all([
    sanityFetch({ query: ABOUT_PAGE_QUERY, params: { locale } }),
    sanityFetch({ query: TEAM_MEMBERS_QUERY, params: { locale } }),
    sanityFetch({ query: FOUNDER_QUERY, params: { locale } }),
  ]);
  return <div className="min-h-dvh flex flex-col bg-white font-sans text-brand-950 antialiased selection:bg-gold-500 selection:text-white">
    <HeaderWrapper />
    <main id="main-content"><AboutDesktopExperience members={(members || []) as AboutDesktopMember[]} founder={founder as AboutDesktopMember | undefined} featuredMembers={(page?.approvedFeaturedMembers || []) as AboutDesktopMember[]} approvedFounderTitle={typeof page?.approvedFounderTitle === "string" ? page.approvedFounderTitle : undefined} /></main>
    <Footer bookingCta />
  </div>;
}

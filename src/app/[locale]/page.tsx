import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { ConsumerHome } from "@/components/home/ConsumerHome";
import { JsonLd } from "@/components/seo/JsonLd";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { locales, defaultLocale } from "@/i18n/config";

export const dynamicParams = true;
export const revalidate = 60;

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await props.params;
    const currentLocale = locales.includes(locale as typeof locales[number]) ? locale : defaultLocale;
    const [t, { data: homePage }] = await Promise.all([
        getTranslations({ locale: currentLocale, namespace: "ConsumerHome.seo" }),
        sanityFetch({ query: HOME_PAGE_QUERY, params: { locale: currentLocale } }).catch(() => ({ data: null })),
    ]);
    const baseUrl = "https://unionnationaltax.com";
    const canonicalUrl = `${baseUrl}/${currentLocale}`;

    return {
        title: t("title"),
        description: t("description"),
        ...(homePage?.seo?.noIndex ? { robots: { index: false, follow: false } } : {}),
        alternates: {
            canonical: canonicalUrl,
            languages: { en: `${baseUrl}/en`, es: `${baseUrl}/es` },
        },
        openGraph: {
            title: t("title"),
            description: t("description"),
            url: canonicalUrl,
        },
        twitter: {
            title: t("title"),
            description: t("description"),
        },
    };
}

export default async function Home(props: { params: Promise<{ locale: string }> }) {
    const { locale } = await props.params;
    if (!locales.includes(locale as typeof locales[number])) redirect(`/${defaultLocale}`);

    const [{ data: siteSettings }, { data: homePage }, seo] = await Promise.all([
        sanityFetch({ query: SITE_SETTINGS_QUERY, params: { locale } }).catch(() => ({ data: null })),
        sanityFetch({ query: HOME_PAGE_QUERY, params: { locale } }).catch(() => ({ data: null })),
        getTranslations({ locale, namespace: "ConsumerHome.seo" }),
    ]);
    const foregroundVideo = typeof homePage?.heroPlayerVideoUrl === "string" ? homePage.heroPlayerVideoUrl.trim() : undefined;
    const fallbackVideo = typeof homePage?.heroVideoUrl === "string" ? homePage.heroVideoUrl.trim() : undefined;
    const heroVideoPoster = typeof homePage?.heroPlayerPosterUrl === "string" ? homePage.heroPlayerPosterUrl : undefined;

    return (
        <>
            <main id="main-content" className="homepage-rhythm min-h-dvh bg-white">
                <JsonLd siteSettings={siteSettings} homePageData={{ seo: { metaDescription: seo("description") } }} />
                <ErrorBoundary name="Header"><HeaderWrapper /></ErrorBoundary>
                <ErrorBoundary name="Homepage"><ConsumerHome heroVideoSrc={foregroundVideo || fallbackVideo} heroVideoPoster={heroVideoPoster} clientLogos={homePage?.trustLogos || []} /></ErrorBoundary>
            </main>
            <ErrorBoundary name="Footer"><Footer /></ErrorBoundary>
        </>
    );
}

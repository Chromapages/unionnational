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
import type { ClientLogo } from "@/components/contact/ClientLogoStrip";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

export const dynamicParams = true;
export const revalidate = 60;

async function getHomeSeo(locale: string) {
    const fallback = locale === "es" ? es.ConsumerHome.seo : en.ConsumerHome.seo;
    const t = await getTranslations({ locale, namespace: "ConsumerHome.seo" }).catch(() => null);
    return {
        title: t?.has("title") ? t("title") : fallback.title,
        description: t?.has("description") ? t("description") : fallback.description,
    };
}

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await props.params;
    const currentLocale = locales.includes(locale as typeof locales[number]) ? locale : defaultLocale;
    const [seo, result] = await Promise.all([
        getHomeSeo(currentLocale),
        sanityFetch({ query: HOME_PAGE_QUERY, params: { locale: currentLocale } }).catch(() => null),
    ]);
    const homePage = result?.data;
    const baseUrl = "https://unionnationaltax.com";
    const canonicalUrl = `${baseUrl}/${currentLocale}`;

    return {
        title: seo.title,
        description: seo.description,
        ...(homePage?.seo?.noIndex ? { robots: { index: false, follow: false } } : {}),
        alternates: {
            canonical: canonicalUrl,
            languages: { en: `${baseUrl}/en`, es: `${baseUrl}/es` },
        },
        openGraph: {
            title: seo.title,
            description: seo.description,
            url: canonicalUrl,
        },
        twitter: {
            title: seo.title,
            description: seo.description,
        },
    };
}

export default async function Home(props: { params: Promise<{ locale: string }> }) {
    const { locale } = await props.params;
    if (!locales.includes(locale as typeof locales[number])) redirect(`/${defaultLocale}`);

    const [settingsResult, homeResult, seo] = await Promise.all([
        sanityFetch({ query: SITE_SETTINGS_QUERY, params: { locale } }).catch(() => null),
        sanityFetch({ query: HOME_PAGE_QUERY, params: { locale } }).catch(() => null),
        getHomeSeo(locale),
    ]);
    const siteSettings = settingsResult?.data;
    const homePage = homeResult?.data;
    const schemaSettings = siteSettings && typeof siteSettings === "object" && !Array.isArray(siteSettings)
        ? { ...siteSettings, sameAs: Array.isArray(siteSettings.sameAs) ? siteSettings.sameAs.filter((url: unknown) => typeof url === "string") : [] }
        : undefined;
    const clientLogos = Array.isArray(homePage?.trustLogos)
        ? homePage.trustLogos.filter((logo: ClientLogo | null) =>
            typeof logo?.asset?.url === "string" && logo.asset.url.trim() && typeof logo.alt === "string" && logo.alt.trim())
        : [];
    const foregroundVideo = typeof homePage?.heroPlayerVideoUrl === "string" ? homePage.heroPlayerVideoUrl.trim() : undefined;
    const fallbackVideo = typeof homePage?.heroVideoUrl === "string" ? homePage.heroVideoUrl.trim() : undefined;
    const heroVideoPoster = typeof homePage?.heroPlayerPosterUrl === "string" ? homePage.heroPlayerPosterUrl : undefined;

    return (
        <>
            <main id="main-content" className="homepage-rhythm min-h-dvh bg-white">
                <JsonLd siteSettings={schemaSettings} homePageData={{ seo: { metaDescription: seo.description } }} />
                <ErrorBoundary name="Header"><HeaderWrapper /></ErrorBoundary>
                <ErrorBoundary name="Homepage"><ConsumerHome heroVideoSrc={foregroundVideo || fallbackVideo} heroVideoPoster={heroVideoPoster} clientLogos={clientLogos} /></ErrorBoundary>
            </main>
            <ErrorBoundary name="Footer"><Footer /></ErrorBoundary>
        </>
    );
}

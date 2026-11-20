import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { cache } from "react";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { ConsumerHome } from "@/components/home/ConsumerHome";
import { JsonLd } from "@/components/seo/JsonLd";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { mapHomeTrustLogos } from "@/lib/home/trust-logos";
import { getMediaUrl } from "@/lib/security/content-urls";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { locales, defaultLocale } from "@/i18n/config";

export const dynamicParams = true;
export const revalidate = 60;

const getSanityHomePage = cache(async (locale: string) => {
    const { data } = await sanityFetch({ query: HOME_PAGE_QUERY, params: { locale } }).catch(() => ({ data: null }));
    return data;
});

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await props.params;
    const currentLocale = locales.includes(locale as typeof locales[number]) ? locale : defaultLocale;
    const [t, homePage] = await Promise.all([
        getTranslations({ locale: currentLocale, namespace: "ConsumerHome.seo" }),
        getSanityHomePage(currentLocale),
    ]);
    const baseUrl = "https://unionnationaltax.com";
    const canonicalUrl = `${baseUrl}/${currentLocale}`;

    return {
        title: t("title"),
        description: t("description"),
        ...(homePage?.seo?.noIndex === true ? { robots: { index: false, follow: false } } : {}),
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

    const [{ data: siteSettings }, homePage, seo] = await Promise.all([
        sanityFetch({ query: SITE_SETTINGS_QUERY, params: { locale } }).catch(() => ({ data: null })),
        getSanityHomePage(locale),
        getTranslations({ locale, namespace: "ConsumerHome.seo" }),
    ]);
    const heroVideoSrc = getMediaUrl(homePage?.heroPlayerVideoUrl) ?? getMediaUrl(homePage?.heroVideoUrl);
    const heroVideoPoster = getMediaUrl(homePage?.heroPlayerPosterUrl);

    return (
        <>
            <main id="main-content" className="homepage-rhythm min-h-dvh bg-white">
                <JsonLd
                    siteSettings={{
                        companyName: siteSettings?.companyName,
                        phone: siteSettings?.contactDetailsVerified === true ? siteSettings.phone : undefined,
                        address: siteSettings?.contactDetailsVerified === true && siteSettings.showOfficeAddressInFooter === true ? siteSettings.address : undefined,
                    }}
                    homePageData={{ seo: { metaDescription: seo("description") } }}
                />
                <ErrorBoundary name="Header"><HeaderWrapper /></ErrorBoundary>
                <ErrorBoundary name="Homepage">
                    <ConsumerHome heroVideoSrc={heroVideoSrc ?? undefined} heroVideoPoster={heroVideoPoster ?? undefined} clientLogos={mapHomeTrustLogos(homePage?.trustLogos)} />
                </ErrorBoundary>
            </main>
            <ErrorBoundary name="Footer"><Footer /></ErrorBoundary>
        </>
    );
}

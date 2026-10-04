import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { getCachedLegalPages } from "@/components/layout/Footer";
import { ALL_PRODUCTS_QUERY, SHOP_PAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import { ShopDesktopExperience, type ShopDesktopProduct } from "@/components/shop/ShopDesktopExperience";
import { localizedAlternates } from "@/lib/seo/localizedAlternates";

export const revalidate = 60; // Revalidate every minute

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
    const { data: shopSettings } = await sanityFetch({ query: SHOP_PAGE_QUERY, params: { locale } }).catch(() => ({ data: null }));
    const seo = shopSettings?.seo;
    const alternates = localizedAlternates(locale, "/shop");
    const t = await getTranslations({ locale, namespace: "Shop.Page" });

    if (!seo) {
        return {
            title: `${t("fallbackHeroTitle")} | Union National Tax`,
            description: t("fallbackHeroSubtitle"),
            alternates,
            openGraph: {
                title: `${t("fallbackHeroTitle")} | Union National Tax`,
                description: t("fallbackHeroSubtitle"),
            },
            twitter: {
                card: "summary_large_image",
                title: `${t("fallbackHeroTitle")} | Union National Tax`,
                description: t("fallbackHeroSubtitle"),
            },
        };
    }

    const ogImage = seo.openGraphImage
        ? urlFor(seo.openGraphImage).width(1200).height(630).url()
        : undefined;
    const metaTitle = locale === "es" ? (seo.spanishMetaTitle || `${t("fallbackHeroTitle")} | Union National Tax`) : seo.metaTitle;
    const metaDescription = locale === "es" ? (seo.spanishMetaDescription || t("fallbackHeroSubtitle")) : seo.metaDescription;

    return {
        title: metaTitle,
        description: metaDescription,
        alternates,
        ...(seo.noIndex ? { robots: { index: false, follow: false } } : {}),
        openGraph: {
            ...(metaTitle ? { title: metaTitle } : {}),
            ...(metaDescription ? { description: metaDescription } : {}),
            ...(ogImage ? { images: [ogImage] } : {}),
        },
        twitter: {
            ...(metaTitle ? { title: metaTitle } : {}),
            ...(metaDescription ? { description: metaDescription } : {}),
            ...(ogImage ? { images: [ogImage] } : {}),
        },
    };
}

export default async function ShopPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const locale = params.locale;
    const [
        { data: shopSettings },
        { data: products },
        { data: siteSettings },
        legalPages,
    ] = await Promise.all([
        sanityFetch({ query: SHOP_PAGE_QUERY, params: { locale } }).catch(() => ({ data: null })),
        sanityFetch({ query: ALL_PRODUCTS_QUERY, params: { locale } }).catch(() => ({ data: [] })),
        sanityFetch({ query: SITE_SETTINGS_QUERY, params: { locale } }).catch(() => ({ data: null })),
        getCachedLegalPages(locale as "en" | "es").catch(() => []),
    ]);
    const termsSlug = legalPages?.find((page) => page.pageType === "terms")?.slug;
    const typedProducts: ShopDesktopProduct[] = products || [];
    const faqCopy = await getTranslations({ locale, namespace: "Shop.Desktop.faq" });
    // Client-approved replacement answers; CMS delivery/refund statements conflict with fulfillment.
    const faqItems = [0, 1, 2, 3, 4].map((index) => ({ question: faqCopy(`items.${index}.question`), answer: faqCopy(`items.${index}.answer`) }));

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-brand-950">
            <JsonLd siteSettings={siteSettings} shopPageData={shopSettings} />
            <HeaderWrapper />

            <main id="main-content">
                <ShopDesktopExperience
                    products={typedProducts}
                    featuredProduct={shopSettings?.featuredProduct as ShopDesktopProduct | undefined}
                    faqItems={faqItems}
                    socialLinks={siteSettings?.socialLinks}
                    termsHref={termsSlug ? `/legal/${termsSlug}` : undefined}
                    logoUrl={siteSettings?.logo?.asset?.url || siteSettings?.logoAlt?.asset?.url}
                />
            </main>
        </div>
    );
}

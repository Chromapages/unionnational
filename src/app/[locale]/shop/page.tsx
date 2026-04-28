import { Suspense } from "react";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { ShopHero } from "@/components/shop/ShopHero";
import { FeaturedProduct } from "@/components/shop/FeaturedProduct";
import { ShopFAQ } from "@/components/shop/ShopFAQ";
import { ALL_PRODUCTS_QUERY, SHOP_PAGE_QUERY, SITE_SETTINGS_QUERY, TESTIMONIALS_QUERY } from "@/sanity/lib/queries";
import { ShopClient } from "@/components/shop/ShopClient";
import { ShopTestimonialStrip } from "@/components/shop/ShopTestimonialStrip";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import { Link } from "@/i18n/navigation";

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
    const { data: shopSettings } = await sanityFetch({ query: SHOP_PAGE_QUERY, params: { locale } });
    const seo = shopSettings?.seo;

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

type ShopProduct = {
    _id: string;
    title: string;
    slug: string;
    imageUrl: string;
    imageMetadata?: { lqip?: string } | null;
    price: number;
    compareAtPrice?: number;
    shortDescription: string;
    format: string;
    buyLink?: string;
    isFeatured?: boolean;
    badge?: string;
    category?: string;
    rating?: number;
};

export default async function ShopPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const locale = params.locale;
    const [
        { data: shopSettings },
        { data: products },
        { data: siteSettings },
        { data: testimonials }
    ] = await Promise.all([
        sanityFetch({ query: SHOP_PAGE_QUERY, params: { locale } }),
        sanityFetch({ query: ALL_PRODUCTS_QUERY, params: { locale } }),
        sanityFetch({ query: SITE_SETTINGS_QUERY, params: { locale } }),
        sanityFetch({ query: TESTIMONIALS_QUERY, params: { locale } }),
    ]);
    const typedProducts: ShopProduct[] = products || [];
    const shopTestimonials = testimonials?.slice(0, 3) || [];

    // Filter out the featured product from the main grid so it's not duplicated
    const featuredId = shopSettings?.featuredProduct?._id;
    const gridProducts = typedProducts.filter((p) => p._id !== featuredId);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <JsonLd siteSettings={siteSettings} shopPageData={shopSettings} />
            <HeaderWrapper />

            <main id="main-content">
                <ShopHero
                    title={shopSettings?.heroTitle || "Shop Our Resources"}
                    subtitle={shopSettings?.heroSubtitle || "Expert strategy to optimize your taxes and wealth."}
                    slides={shopSettings?.heroSlides}
                />

                <div className="relative z-10">
                    {shopSettings?.featuredProduct && (
                        <FeaturedProduct product={shopSettings.featuredProduct} />
                    )}

                    <div className="pt-12">
                        <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center">
                            <div className="w-8 h-8 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
                        </div>}>
                            <ShopClient products={gridProducts} />
                        </Suspense>
                    </div>

                    <div className="mb-24">
                        <ShopTestimonialStrip testimonials={shopTestimonials} />
                    </div>

                    {shopSettings?.faq && <ShopFAQ items={shopSettings.faq} />}

                    {shopSettings?.recoveryCTA?.buttonUrl && (
                        <section className="mx-auto mb-24 max-w-4xl px-6">
                            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm">
                                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-600">
                                    Need a different path?
                                </p>
                                <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-900">
                                    {shopSettings.recoveryCTA.title}
                                </h2>
                                <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
                                    {shopSettings.recoveryCTA.subtitle}
                                </p>
                                <Link
                                    href={shopSettings.recoveryCTA.buttonUrl}
                                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-900 px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-gold-400 transition-colors hover:bg-brand-800"
                                >
                                    {shopSettings.recoveryCTA.buttonText}
                                </Link>
                            </div>
                        </section>
                    )}

                </div>

            </main>

            <Footer />
        </div>
    );
}

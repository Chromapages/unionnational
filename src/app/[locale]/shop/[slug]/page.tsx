import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { PRODUCT_DETAIL_QUERY, PRODUCT_SLUGS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductHero } from "@/components/shop/ProductHero";
import { FeatureBento } from "@/components/shop/FeatureBento";
import { TransactionCard } from "@/components/shop/TransactionCard";
import { StrategistProfile } from "@/components/shop/StrategistProfile";

export const revalidate = 60;

export async function generateStaticParams() {
    const slugs = await client.fetch(PRODUCT_SLUGS_QUERY);
    const locales = ["en", "es"];

    return (slugs as any[]).flatMap((slug: any) =>
        locales.map((locale) => ({
            locale,
            slug: slug.slug,
        }))
    );
}

export async function generateMetadata(props: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
    const { slug, locale } = await props.params;
    const { data: product } = await sanityFetch({
        query: PRODUCT_DETAIL_QUERY,
        params: { slug, locale },
    });
    const seo = product?.seo;

    if (!seo && !product) {
        return {};
    }

    const ogImage = seo?.openGraphImage
        ? urlFor(seo.openGraphImage).width(1200).height(630).url()
        : product?.imageUrl;

    return {
        title: seo?.metaTitle || product?.title,
        description: seo?.metaDescription || product?.shortDescription,
        openGraph: {
            ...(seo?.metaTitle ? { title: seo.metaTitle } : product?.title ? { title: product.title } : {}),
            ...(seo?.metaDescription ? { description: seo.metaDescription } : product?.shortDescription ? { description: product.shortDescription } : {}),
            ...(ogImage ? { images: [ogImage] } : {}),
        },
        twitter: {
            ...(seo?.metaTitle ? { title: seo.metaTitle } : product?.title ? { title: product.title } : {}),
            ...(seo?.metaDescription ? { description: seo.metaDescription } : product?.shortDescription ? { description: product.shortDescription } : {}),
            ...(ogImage ? { images: [ogImage] } : {}),
        },
    };
}

export default async function ProductDetailPage(props: { params: Promise<{ locale: string; slug: string }> }) {
    const { slug, locale } = await props.params;
    const { data: product } = await sanityFetch({
        query: PRODUCT_DETAIL_QUERY,
        params: { slug, locale }
    });

    if (!product) {
        notFound();
    }

    const productJsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.title,
        description: product.shortDescription,
        image: product.imageUrl,
        offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            price: product.price,
            availability: "https://schema.org/InStock",
            url: product.buyLink || `https://unionnationaltax.com/shop/${product.slug}`,
        },
        brand: {
            "@type": "Brand",
            name: "Union National Tax",
        },
    };

    return (
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
            />
            <HeaderWrapper />

            <main className="pt-10 pb-24">
                <div className="max-w-7xl mx-auto px-6">

                    {/* Breadcrumb / Back Link */}
                    <div className="mb-8">
                        <Link href="/shop" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-gold-500 transition-colors font-sans group">
                            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Shop
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
                        <div className="flex flex-col gap-10">
                            <ProductHero
                                title={product.title}
                                subtitle={product.shortDescription}
                                imageUrl={product.imageUrl}
                                format={product.format}
                            />

                            <div>
                                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Strategic Highlights</div>
                                <h2 className="mt-3 text-2xl font-semibold text-brand-900 font-heading">
                                    A bento view of execution value.
                                </h2>
                                <div className="mt-6">
                                    <FeatureBento format={product.format} category={product.category} />
                                </div>
                            </div>

                            {product.fullDescription && (
                                <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 md:p-8 backdrop-blur-sm">
                                    <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Strategic Brief</h3>
                                    <div className="prose prose-slate prose-headings:font-heading prose-a:text-gold-600 hover:prose-a:text-gold-500 font-sans max-w-none mt-6">
                                        <PortableText value={product.fullDescription} />
                                    </div>
                                </div>
                            )}

                            <StrategistProfile />
                        </div>

                        <div className="lg:sticky lg:top-28 lg:self-start">
                            <TransactionCard
                                price={product.price}
                                compareAtPrice={product.compareAtPrice}
                                buyLink={product.buyLink}
                                features={product.features}
                            />
                        </div>
                    </div>
                </div>

                {product.relatedProducts && product.relatedProducts.length > 0 && (
                    <section className="max-w-7xl mx-auto px-6 mt-20">
                        <RevealOnScroll>
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-brand-900 tracking-tight font-heading">
                                    Related Resources
                                </h2>
                                <p className="text-slate-600 mt-4 text-sm font-sans max-w-2xl mx-auto">
                                    More tools to help you optimize your business finances.
                                </p>
                            </div>
                        </RevealOnScroll>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {product.relatedProducts.map((related: any) => (
                                <ProductCard
                                    key={related._id}
                                    title={related.title}
                                    slug={related.slug}
                                    coverImage={related.imageUrl}
                                    price={related.price}
                                    compareAtPrice={related.compareAtPrice}
                                    shortDescription={related.shortDescription}
                                    format={related.format}
                                    buyLink={related.buyLink}
                                    badge={related.badge}
                                    rating={related.rating}
                                    category={related.category}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
}

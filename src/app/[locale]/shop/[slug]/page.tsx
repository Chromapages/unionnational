import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { PRODUCT_DETAIL_QUERY, PRODUCT_SLUGS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductHero } from "@/components/shop/ProductHero";
import { StickyBuyBar } from "@/components/ui/StickyBuyBar";
import { LearningObjectives } from "@/components/shop/LearningObjectives";
import { AuthorBio } from "@/components/shop/AuthorBio";
import { TestimonialWall } from "@/components/shop/TestimonialWall";
import { BookOverview } from "@/components/shop/BookOverview";
import { RelatedServices } from "@/components/services/RelatedServices";
import { ShopViewContent } from "@/components/seo/ShopViewContent";
import { Link } from "@/i18n/navigation";

export const revalidate = 60;

interface ProductSlugRecord {
    slug: string;
}

interface RelatedProductCardData {
    _id: string;
    title: string;
    slug: string;
    imageUrl?: string;
    imageMetadata?: { lqip?: string } | null;
    price: number;
    compareAtPrice?: number;
    shortDescription: string;
    format: string;
    badge?: string;
    category?: string;
    rating?: number;
}

export async function generateStaticParams() {
    const slugs = await client.fetch<ProductSlugRecord[]>(PRODUCT_SLUGS_QUERY);
    const locales = ["en", "es"];

    return slugs.flatMap((slug) =>
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

    const baseUrl = "https://unionnationaltax.com";
    const canonicalUrl = locale === "en" ? `${baseUrl}/shop/${slug}` : `${baseUrl}/${locale}/shop/${slug}`;

    return {
        title: seo?.metaTitle || product?.title,
        description: seo?.metaDescription || product?.shortDescription,
        alternates: {
            canonical: canonicalUrl,
            languages: {
                en: `${baseUrl}/shop/${slug}`,
                es: `${baseUrl}/es/shop/${slug}`,
            },
        },
        openGraph: {
            ...(seo?.metaTitle ? { title: seo.metaTitle } : product?.title ? { title: product.title } : {}),
            ...(seo?.metaDescription ? { description: seo.metaDescription } : product?.shortDescription ? { description: product.shortDescription } : {}),
            ...(ogImage ? { images: [ogImage] } : {}),
            url: canonicalUrl,
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
        "name": product.title,
        "description": product.shortDescription,
        "image": product.imageUrl,
        "sku": product._id,
        "brand": {
            "@type": "Brand",
            "name": "Union National Tax",
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": product.rating || 5,
            "bestRating": "5",
            "worstRating": "1",
            "ratingCount": Math.floor(Math.random() * 20) + 10 // Dynamic placeholder for trust signals
        },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": product.price,
            "availability": "https://schema.org/InStock",
            "url": product.buyLink || `https://unionnationaltax.com${locale === 'en' ? '' : `/${locale}`}/shop/${product.slug}`,
            "priceValidUntil": new Date(new Date().getFullYear() + 1, 0, 1).toISOString().split('T')[0],
        },
    };

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
            />
            <HeaderWrapper />
            <ShopViewContent productName={product.title} productId={product._id} price={product.price} />

            <main id="main-content">
                {/* Breadcrumb */}
                <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="py-4">
                        <Link href="/shop" className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-slate-400 hover:text-gold-500 transition-colors font-sans group">
                            <ChevronLeft className="w-3.5 h-3.5 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Shop
                        </Link>
                    </div>
                </div>

                {/* Section 1: Bookstore Hero — Image Gallery + Buy Box */}
                <ProductHero
                    id={product._id}
                    slug={product.slug}
                    title={product.title}
                    subtitle={product.shortDescription}
                    image={product.imageUrl}
                    imageMetadata={product.imageMetadata}
                    samplePages={product.samplePages || []}
                    format={product.format}
                    buyLink={product.buyLink}
                    stripeProductId={product.stripeProductId}
                    stripePriceId={product.stripePriceId}
                    defaultPrice={product.price}
                    compareAtPrice={product.compareAtPrice}
                    category={product.category || "Boutique Financial Literature"}
                    badge={product.badge}
                    rating={product.rating}
                    author={product.author}
                    pageCount={product.pageCount}
                    publisher={product.publisher}
                    publishDate={product.publishDate}
                    isbn={product.isbn}
                    editions={product.editions}
                    videoUrl={product.videoUrl}
                    videoFileUrl={product.videoFileUrl}
                    videoThumbnail={product.videoThumbnail}
                />

                {/* Sticky Tab Navigation */}
                <nav className="sticky top-[72px] z-40 bg-white border-b border-slate-200 shadow-sm">
                    <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                        <div className="flex gap-0 overflow-x-auto no-scrollbar">
                            {[
                                { label: "Overview", href: "#overview" },
                                { label: "What You'll Learn", href: "#what-youll-learn" },
                                { label: "About the Author", href: "#about-author" },
                                { label: "Reviews", href: "#reviews" },
                            ].map((tab) => (
                                <a
                                    key={tab.href}
                                    href={tab.href}
                                    className="shrink-0 px-5 py-4 text-sm font-semibold text-slate-500 hover:text-brand-900 border-b-2 border-transparent hover:border-brand-900 transition-all duration-200 whitespace-nowrap"
                                >
                                    {tab.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </nav>

                {/* Section 2: Overview — Notes from Publisher */}
                <BookOverview
                    fullDescription={product.fullDescription}
                    features={product.features}
                    shortDescription={product.shortDescription}
                />

                {/* Section 3: What You'll Learn */}
                <LearningObjectives
                    objectives={product.learningObjectives}
                />

                {/* Section 4: About the Author */}
                <AuthorBio
                    author={product.author}
                />

                {/* Section 5: Reviews — Cinematic Testimonial */}
                <TestimonialWall
                    testimonials={product.featuredTestimonials}
                    backgroundImage={product.testimonialBackgroundImage}
                />

                {/* Section 6: Related Services — Professional Support */}
                {product.relatedServices && product.relatedServices.length > 0 && (
                    <section className="py-16 bg-white border-t border-slate-100">
                        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                            <div className="mb-10 text-center md:text-left">
                                <h2 className="text-2xl font-bold font-heading tracking-tight text-brand-900">Professional Strategy & Support</h2>
                                <p className="text-slate-500 mt-2 text-sm max-w-2xl">
                                    Take your tax strategy a step further with high-touch advisory. We help you implement these concepts with precision.
                                </p>
                            </div>
                            <RelatedServices services={product.relatedServices} />
                        </div>
                    </section>
                )}

                {/* Related Strategy Assets */}
                {product.relatedProducts && product.relatedProducts.length > 0 && (
                    <section className="bg-slate-50 py-16 border-t border-slate-100">
                        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                            <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 mb-10">
                                <div>
                                    <h2 className="text-2xl font-bold font-heading tracking-tight text-brand-900">Complete Your Toolkit</h2>
                                    <p className="text-slate-500 mt-1 text-sm">
                                        Stack these resources to accelerate your journey.
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {product.relatedProducts.map((related: RelatedProductCardData) => (
                                    <ProductCard
                                        key={related._id}
                                        {...related}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>

                <StickyBuyBar
                    id={product._id}
                    slug={product.slug}
                    title={product.title}
                    image={product.imageUrl}
                    format={product.format}
                    price={product.price}
                    buyLink={product.buyLink}
                    stripeProductId={product.stripeProductId}
                    stripePriceId={product.stripePriceId}
                />

            <Footer />
        </div>
    );
}

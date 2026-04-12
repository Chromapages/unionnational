import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { PRODUCT_DETAIL_QUERY, PRODUCT_SLUGS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
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
        <div className="min-h-screen bg-white flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
            />
            <HeaderWrapper />

            <main>
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
                    samplePages={product.samplePages || []}
                    format={product.format}
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
                />

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
                                {product.relatedProducts.map((related: any) => (
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
            />

            <Footer />
        </div>
    );
}

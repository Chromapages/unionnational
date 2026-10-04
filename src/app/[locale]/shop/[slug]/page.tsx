import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { PRODUCT_DETAIL_QUERY, PRODUCT_SLUGS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { ChevronLeft, ArrowRight, CalendarDays, Target, Users, CheckCircle2, ShieldCheck, ChartNoAxesColumnIncreasing } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductHero } from "@/components/shop/ProductHero";
import { BookOverview } from "@/components/shop/BookOverview";
import { ShopViewContent } from "@/components/seo/ShopViewContent";
import { Link } from "@/i18n/navigation";
import { localizedAlternates } from "@/lib/seo/localizedAlternates";
import { getDefaultProductEdition, hasPublishedProductDescription, storefrontBookCopyKeys } from "@/lib/shop/commerce";
import type { ProductEdition } from "@/lib/shop/types";

export const revalidate = 60;

interface RelatedProductCardData {
    _id: string;
    title: string;
    slug: string;
    imageUrl?: string;
    imageMetadata?: { lqip?: string } | null;
    price: number;
    shortDescription: string;
    format: string;
    editions?: ProductEdition[];
    category?: string;
}

export async function generateStaticParams() {
    const slugs = await client.fetch<Array<{ slug: string }>>(PRODUCT_SLUGS_QUERY);
    return slugs.flatMap(record => ["en", "es"].map(locale => ({ locale, slug: record.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
    const { slug, locale } = await params;
    const [{ data: product }, catalog] = await Promise.all([
        sanityFetch({ query: PRODUCT_DETAIL_QUERY, params: { slug, locale } }),
        getTranslations({ locale, namespace: "Shop.Desktop" }),
    ]);
    if (!product || !hasPublishedProductDescription(product.shortDescription)) return { robots: { index: false, follow: false } };
    const key = storefrontBookCopyKeys[slug];
    const copy = key ? catalog("books." + key + ".description") : product.shortDescription;
    const description = hasPublishedProductDescription(copy) ? copy : product.shortDescription;
    const image = product.seo?.openGraphImage ? urlFor(product.seo.openGraphImage).width(1200).height(630).url() : product.imageUrl;
    const alternates = localizedAlternates(locale, "/shop/" + slug);
    const languages = Object.fromEntries((["en", "es"] as const)
        .filter((language) => hasPublishedProductDescription(product.shopDescriptions?.[language]))
        .map((language) => [language, `https://unionnationaltax.com/${language}/shop/${slug}`]));
    return {
        title: product.title, description,
        alternates: { ...alternates, languages },
        ...(product.seo?.noIndex ? { robots: { index: false, follow: false } } : {}),
        openGraph: { title: product.title, description, images: image ? [image] : undefined },
        twitter: { title: product.title, description, images: image ? [image] : undefined },
    };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { slug, locale } = await params;
    const [{ data: product }, catalog, copy, header, homepage] = await Promise.all([
        sanityFetch({ query: PRODUCT_DETAIL_QUERY, params: { slug, locale } }),
        getTranslations({ locale, namespace: "Shop.Desktop" }),
        getTranslations({ locale, namespace: "Shop.ProductPage" }),
        getTranslations({ locale, namespace: "Header" }),
        getTranslations({ locale, namespace: "ConsumerHome" }),
    ]);
    if (!product || !hasPublishedProductDescription(product.shortDescription)) notFound();
    const key = storefrontBookCopyKeys[slug];
    const measured = key ? catalog("books." + key + ".description") : product.shortDescription;
    const promise = hasPublishedProductDescription(measured) ? measured : product.shortDescription;
    const related = (product.relatedProducts || []).filter((book: RelatedProductCardData) =>
        book && book._id !== product._id && /^[a-z0-9-]+$/.test(book.slug || "")
        && book.slug !== "undefined" && Number.isFinite(book.price)
        && hasPublishedProductDescription(book.shortDescription),
    ).filter((book: RelatedProductCardData, index: number, books: RelatedProductCardData[]) =>
        books.findIndex(other => other._id === book._id) === index,
    ).slice(0, 2);
    const defaultEdition = getDefaultProductEdition<ProductEdition>(product.editions || []);
    const offers = (product.editions || []).filter((edition: ProductEdition) => Number.isFinite(edition.price) && edition.price >= 0)
        .map((edition: ProductEdition) => ({ "@type": "Offer", name: edition.name, priceCurrency: "USD", price: edition.price, url: "https://unionnationaltax.com/" + locale + "/shop/" + slug }));
    const productJsonLd = {
        "@context": "https://schema.org", "@type": "Product",
        name: product.title, description: promise, image: product.imageUrl, sku: product._id,
        brand: { "@type": "Brand", name: "Union National Tax" },
        offers: offers.length ? offers : { "@type": "Offer", priceCurrency: "USD", price: product.price, url: "https://unionnationaltax.com/" + locale + "/shop/" + slug },
    };

    return <div className="min-h-dvh bg-white font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-brand-950">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c") }} />
        <HeaderWrapper />
        <ShopViewContent productName={product.title} productId={product._id} price={defaultEdition?.price ?? product.price} />
        <main id="main-content" className="pb-28 [&_a]:scroll-mb-28 [&_button]:scroll-mb-28">
            <div className="mx-auto w-full max-w-[94rem] px-4 py-4 sm:px-6 lg:px-8">
                <Link href="/shop" className="inline-flex min-h-11 items-center gap-2 rounded-sm font-heading text-sm font-semibold text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-700"><ChevronLeft className="size-5" aria-hidden="true" />{copy("backToShop")}</Link>
            </div>
            <ProductHero key={product._id} id={product._id} slug={product.slug} title={product.title} subtitle={promise}
                image={product.imageUrl} imageMetadata={product.imageMetadata} samplePages={product.samplePages || []}
                format={product.format} buyLink={product.buyLink} stripeProductId={product.stripeProductId} stripePriceId={product.stripePriceId}
                defaultPrice={product.price} category={key ? catalog("books." + key + ".category") : product.category}
                author={product.author} editions={product.editions}
                videoUrl={product.videoUrl} videoFileUrl={product.videoFileUrl} videoThumbnail={product.videoThumbnail} />
            <BookOverview growthGuide={slug === "the-3m-s-to-freedom"} features={product.features} learningObjectives={product.learningObjectives}
                summaryBullets={slug === "the-3m-s-to-freedom" ? [0, 1, 2].map(index => copy("growthBullets." + index)) : undefined} />
            {related.length > 0 ? <section id="book-related-section" aria-labelledby="related-books-heading" className="bg-slate-50/50 py-10 lg:py-12">
                <div className="mx-auto grid w-full max-w-[94rem] gap-8 px-4 sm:px-6 lg:px-8 xl:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)]">
                    <div className="min-w-0">
                        <p className="flex items-center gap-4 font-heading text-xs font-semibold uppercase tracking-[.15em] text-slate-700 after:h-px after:w-12 after:bg-slate-300">{copy("related.eyebrow")}</p>
                        <h2 id="related-books-heading" className="mt-4 font-heading text-3xl font-bold leading-[1.12] tracking-[-.025em] text-brand-900 sm:text-4xl lg:text-[2.75rem]">{copy("relatedTitle")}</h2>
                        <p className="mt-3 text-base leading-relaxed text-slate-700 sm:text-xl">{copy("related.intro")}</p>
                        <div data-related-books className="mt-6 grid items-stretch gap-5 sm:grid-cols-2">
                            {related.map((book: RelatedProductCardData) => {
                                const edition = getDefaultProductEdition(book.editions || []);
                                const relatedKey = storefrontBookCopyKeys[book.slug];
                                const description = relatedKey ? catalog("books." + relatedKey + ".description") : book.shortDescription;
                                return <ProductCard key={book._id} {...book} layout="related" price={edition?.price ?? book.price} format={edition?.name || book.format}
                                    category={relatedKey ? catalog("books." + relatedKey + ".category") : book.category}
                                    shortDescription={hasPublishedProductDescription(description) ? description : book.shortDescription} />;
                            })}
                        </div>
                    </div>
                    <div className="flex min-w-0 flex-col">
                        <p className="mb-5 font-heading text-xs font-semibold uppercase leading-relaxed tracking-[.15em] text-slate-700 xl:text-right">{copy("related.signature")}</p>
                        <aside id="book-guidance" aria-labelledby="book-guidance-heading" className="flex-1 rounded-xl border border-gold-100 bg-gold-50/40 p-6 shadow-sm sm:p-8">
                            <p className="flex items-center gap-3 font-heading text-xs font-semibold uppercase tracking-[.12em] text-slate-700 after:h-px after:w-12 after:bg-slate-300">{copy("related.guidanceLabel")}</p>
                            <h3 id="book-guidance-heading" className="mt-4 font-heading text-3xl font-bold leading-[1.1] tracking-tight text-brand-900 sm:text-4xl">{copy("related.guidanceTitle")}</h3>
                            <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">{copy("related.guidanceBody")}</p>
                            <ul className="mt-6 space-y-5">
                                {[Target, Users, CheckCircle2].map((Icon, index) => <li key={index} className="flex min-w-0 items-start gap-4">
                                    <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-500"><Icon className="size-7" aria-hidden="true" /></span>
                                    <div className="min-w-0"><p className="font-heading text-base font-semibold leading-snug text-brand-900">{copy("related.items." + index + ".title")}</p><p className="mt-1 text-sm leading-relaxed text-slate-700">{copy("related.items." + index + ".body")}</p></div>
                                </li>)}
                            </ul>
                            <div className="mt-6 border-t border-gold-100 pt-5">
                                <Link href="/book" className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-brand-500 px-4 py-4 font-heading text-base font-bold text-white hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-700"><CalendarDays className="size-6 shrink-0" aria-hidden="true" /><span>{header("bookCall")}</span><ArrowRight className="size-5 shrink-0" aria-hidden="true" /></Link>
                                <p className="mt-3 text-center text-xs leading-relaxed text-slate-700">{copy("related.duration")}<br />{homepage("final.reassurance")}</p>
                            </div>
                            <ul className="mt-5 grid gap-3 border-t border-gold-100 pt-5 sm:grid-cols-3 xl:gap-2">
                                {[ShieldCheck, ChartNoAxesColumnIncreasing, Users].map((Icon, index) => <li key={index} className="flex items-center gap-2 text-brand-500 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-slate-200 sm:[&:not(:first-child)]:pl-3"><Icon className="size-6 shrink-0" aria-hidden="true" /><span className="min-w-0 font-heading text-xs font-medium uppercase leading-snug text-slate-700">{copy("related.footerLabels." + index)}</span></li>)}
                            </ul>
                        </aside>
                    </div>
                </div>
            </section> : <section className="bg-white py-10 lg:py-12">
                <div className="mx-auto flex w-full max-w-[94rem] flex-wrap items-center gap-x-4 gap-y-2 px-4 text-base text-slate-700 sm:px-6 lg:px-8">
                    <p>{copy("applyHelp")}</p><Link href="/book" className="inline-flex min-h-11 items-center gap-3 rounded-sm font-heading font-semibold text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-700">{header("bookCall")}<ArrowRight className="size-5" aria-hidden="true" /></Link>
                </div>
            </section>}
        </main>
        <Footer bookingCta />
    </div>;
}

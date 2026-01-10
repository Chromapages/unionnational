import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { client } from "@/sanity/lib/client";
import { PRODUCT_DETAIL_QUERY, PRODUCT_SLUGS_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronLeft, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export const revalidate = 60;

export async function generateStaticParams() {
    const slugs = await client.fetch(PRODUCT_SLUGS_QUERY);
    return slugs.map((slug: any) => ({ slug: slug.slug }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = await client.fetch(PRODUCT_DETAIL_QUERY, { slug });

    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <Header />

            <main className="pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-6">

                    {/* Breadcrumb / Back Link */}
                    <div className="mb-8">
                        <Link href="/scorp-playbook" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-gold-500 transition-colors font-sans group">
                            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Shop
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                        {/* Left Column: Image */}
                        <div>
                            <RevealOnScroll className="relative sticky top-32">
                                <div className="aspect-[3/4] rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-white relative">
                                    {/* Format Badge */}
                                    <div className="absolute top-6 right-6 z-10 px-4 py-1.5 bg-brand-900 text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                                        {product.format}
                                    </div>

                                    {product.imageUrl && (
                                        <img
                                            src={product.imageUrl}
                                            alt={product.title}
                                            className="w-full h-full object-contain p-6"
                                        />
                                    )}
                                </div>

                                {/* Guarantee Badge */}
                                <div className="mt-8 flex items-center justify-center gap-3 text-sm font-medium text-slate-600 bg-slate-50 py-3 rounded-xl border border-slate-100">
                                    <ShieldCheck className="w-5 h-5 text-gold-500" />
                                    <span>Secure Checkout & Instant Delivery</span>
                                </div>
                            </RevealOnScroll>
                        </div>

                        {/* Right Column: Details */}
                        <div>
                            <RevealOnScroll delay={100}>
                                <h1 className="text-4xl lg:text-5xl font-bold text-brand-900 mb-4 font-heading leading-tight">
                                    {product.title}
                                </h1>
                                <p className="text-xl text-slate-600 mb-8 font-sans leading-relaxed">
                                    {product.shortDescription}
                                </p>

                                {/* Price block */}
                                <div className="flex items-end gap-4 mb-8 pb-8 border-b border-slate-100">
                                    <div className="text-4xl font-bold text-brand-900 font-sans">
                                        ${product.price}
                                    </div>
                                    {product.compareAtPrice && (
                                        <div className="text-xl text-slate-400 line-through mb-1 font-sans">
                                            ${product.compareAtPrice}
                                        </div>
                                    )}
                                    {product.compareAtPrice && (
                                        <div className="mb-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold uppercase rounded-md">
                                            Save ${(product.compareAtPrice - product.price).toFixed(0)}
                                        </div>
                                    )}
                                </div>

                                {/* CTA */}
                                {product.buyLink ? (
                                    <a
                                        href={product.buyLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full bg-gold-500 text-brand-900 text-center py-4 rounded-xl text-md font-bold hover:bg-gold-400 transition-colors shadow-lg shadow-gold-500/20 mb-6 font-sans"
                                    >
                                        Buy Now
                                    </a>
                                ) : (
                                    <button
                                        disabled
                                        className="block w-full bg-slate-200 text-slate-400 text-center py-4 rounded-xl text-md font-bold cursor-not-allowed mb-6 font-sans"
                                    >
                                        Coming Soon
                                    </button>
                                )}

                                <p className="text-xs text-center text-slate-400 mb-12 font-sans">
                                    One-time payment. Lifetime access.
                                </p>

                                {/* Features */}
                                {product.features && (
                                    <div className="mb-12">
                                        <h3 className="text-sm font-bold text-brand-900 uppercase tracking-widest mb-6 font-heading">
                                            What's Included
                                        </h3>
                                        <ul className="space-y-4">
                                            {product.features.map((feature: string, idx: number) => (
                                                <li key={idx} className="flex items-start gap-4 text-sm text-slate-700 font-sans">
                                                    <div className="bg-gold-50 rounded-full p-0.5 mt-0.5 shrink-0">
                                                        <Check className="w-3.5 h-3.5 text-gold-600" />
                                                    </div>
                                                    <span className="leading-relaxed">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Full Description / Portable Text */}
                                {product.fullDescription && (
                                    <div className="prose prose-slate prose-headings:font-heading prose-a:text-gold-600 hover:prose-a:text-gold-500 font-sans max-w-none">
                                        <PortableText value={product.fullDescription} />
                                    </div>
                                )}
                            </RevealOnScroll>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

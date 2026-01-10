"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ArrowRight, Check, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FeaturedProductProps {
    product: any; // Sanity product
}

export function FeaturedProduct({ product }: FeaturedProductProps) {
    if (!product) return null;

    return (
        <section id="featured" className="max-w-7xl mx-auto px-6 mb-32">
            <RevealOnScroll className="bg-brand-900 rounded-3xl overflow-hidden relative">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 lg:p-16 relative z-10">

                    {/* Content */}
                    <div className="order-2 lg:order-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-[10px] font-bold uppercase tracking-widest mb-6 font-sans">
                            <Star className="w-3 h-3 fill-gold-500" />
                            Editor's Choice
                        </div>

                        <Link href={`/shop/${product.slug}`} className="block group">
                            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 font-heading leading-tight group-hover:text-gold-500 transition-colors">
                                {product.title}
                            </h2>
                        </Link>

                        <p className="text-white/70 text-lg leading-relaxed mb-8 font-sans">
                            {product.shortDescription}
                        </p>

                        {product.features && (
                            <ul className="space-y-4 mb-10">
                                {product.features.map((feature: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-300 font-sans">
                                        <div className="bg-gold-500 rounded-full p-0.5 mt-0.5"><Check className="w-3 h-3 text-brand-900" /></div>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            {product.buyLink ? (
                                <a
                                    href={product.buyLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto bg-gold-500 text-brand-900 px-8 py-4 rounded-xl text-sm font-bold hover:bg-gold-400 transition-colors shadow-lg shadow-gold-500/20 flex items-center justify-center gap-2 font-sans"
                                >
                                    Get It For ${product.price} <ArrowRight className="w-4 h-4" />
                                </a>
                            ) : (
                                <Link
                                    href={`/shop/${product.slug}`}
                                    className="w-full sm:w-auto bg-gold-500 text-brand-900 px-8 py-4 rounded-xl text-sm font-bold hover:bg-gold-400 transition-colors shadow-lg shadow-gold-500/20 flex items-center justify-center gap-2 font-sans"
                                >
                                    View Details <ArrowRight className="w-4 h-4" />
                                </Link>
                            )}

                            {product.compareAtPrice && (
                                <div className="text-white/50 text-sm font-sans">
                                    <span className="line-through decoration-white/30 mr-2">${product.compareAtPrice}</span>
                                    <span className="text-white font-bold">Save ${(product.compareAtPrice - product.price).toFixed(0)}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Image */}
                    <div className="order-1 lg:order-2 flex justify-center">
                        <Link href={`/shop/${product.slug}`} className="relative w-full max-w-md aspect-[3/4] rotate-3 hover:rotate-0 transition-all duration-700 block">
                            {/* Glow */}
                            <div className="absolute inset-0 bg-gold-500/20 blur-2xl -z-10 rounded-3xl transform translate-y-4"></div>

                            <img
                                src={product.imageUrl}
                                alt={product.title}
                                className="w-full h-full object-contain bg-white rounded-2xl shadow-2xl border border-white/10"
                            />
                        </Link>
                    </div>
                </div>
            </RevealOnScroll>
        </section>
    );
}

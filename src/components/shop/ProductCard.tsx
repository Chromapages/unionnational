"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export interface ProductCardProps {
    title: string;
    coverImage: any; // Sanity Image
    price: number;
    compareAtPrice?: number;
    shortDescription: string;
    slug: string; // The full path or just the slug
    format: string;
    buyLink?: string;
}

// Helper to format currency
const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    }).format(price);
};

export function ProductCard({ title, coverImage, price, compareAtPrice, shortDescription, slug, format }: ProductCardProps) {
    // Assuming coverImage comes from Sanity, we'd normally use urlFor. 
    // For this component we'll assume the parent passes a valid URL string or we handle it if it's an object.

    // NOTE: This basic implementation assumes coverImage is a string URL. 
    // If it's a sanity object, we need the builder. 

    return (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full group">
            <Link href={`/scorp-playbook/${slug}`} className="relative aspect-[3/4] bg-slate-100 overflow-hidden block">
                {/* Badge/Format */}
                <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-bold uppercase tracking-wider text-brand-900 border border-slate-200">
                    {format}
                </div>

                <img
                    src={typeof coverImage === 'string' ? coverImage : ''}
                    alt={title}
                    className="w-full h-full object-contain p-4"
                />
            </Link>

            <div className="p-6 flex flex-col flex-1">
                <Link href={`/scorp-playbook/${slug}`} className="block">
                    <h3 className="text-xl font-bold text-brand-900 mb-2 font-heading leading-tight group-hover:text-gold-600 transition-colors">{title}</h3>
                </Link>
                <p className="text-sm text-slate-500 mb-6 font-sans line-clamp-2">{shortDescription}</p>

                <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                        {compareAtPrice && compareAtPrice > price && (
                            <span className="text-xs text-slate-400 line-through font-sans">{formatPrice(compareAtPrice)}</span>
                        )}
                        <span className="text-2xl font-bold text-brand-900 font-sans">{formatPrice(price)}</span>
                    </div>
                    <Link
                        href={`/scorp-playbook/${slug}`}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-900 text-white text-xs font-bold hover:bg-gold-500 hover:text-brand-900 transition-all font-sans"
                    >
                        View Details <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

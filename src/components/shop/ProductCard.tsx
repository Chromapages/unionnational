"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, FileText, PlayCircle, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { StarRating } from "@/components/ui/StarRating";
import { cn } from "@/lib/utils";

export interface ProductCardProps {
    title: string;
    coverImage: any;
    price: number;
    compareAtPrice?: number;
    shortDescription: string;
    slug: string;
    format: string; // 'ebook', 'template', 'course'
    category?: string;
    badge?: string; // 'bestseller', 'new', 'limited'
    rating?: number;
    buyLink?: string;
}

type BadgeType = 'bestseller' | 'new' | 'limited';

const formatLabels: Record<string, string> = {
    ebook: "PDF",
    template: "Template",
    course: "Video",
    bundle: "Bundle",
};

const formatBadgeStyles: Record<string, string> = {
    ebook: "bg-sky-50 text-sky-700 border-sky-200",
    template: "bg-violet-50 text-violet-700 border-violet-200",
    course: "bg-emerald-50 text-emerald-700 border-emerald-200",
    bundle: "bg-amber-50 text-amber-700 border-amber-200",
};

// Map badge styles
const badgeStyles: Record<BadgeType, string> = {
    bestseller: "bg-gold-500/10 text-gold-600 border-gold-500/20",
    new: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    limited: "bg-red-500/10 text-red-600 border-red-500/20",
};

// Map format to icon
const formatIcons: Record<string, any> = {
    ebook: BookOpen,
    template: FileText,
    course: PlayCircle,
    bundle: BookOpen,
};

// Helper for currency
const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    }).format(price);
};

export function ProductCard({
    title,
    coverImage,
    price,
    compareAtPrice,
    shortDescription,
    slug,
    format = 'ebook',
    badge,
    rating = 5,
    buyLink
}: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    const FormatIcon = formatIcons[format.toLowerCase()] || FileText;
    const badgeClass = badge ? badgeStyles[badge.toLowerCase() as BadgeType] || "" : "";

    return (
        <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative h-full flex flex-col bg-white rounded-2xl border border-slate-200 transition-all duration-300 hover:border-gold-400 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
        >
            {/* Quick View Overlay Button */}
            <div className={cn(
                "absolute inset-x-0 bottom-32 z-30 flex justify-center opacity-0 transition-opacity duration-300 pointer-events-none",
                isHovered && "opacity-100 pointer-events-auto"
            )}>
                <Link href={`/shop/${slug}`} className="bg-white text-brand-900 px-6 py-3 rounded-full shadow-lg border border-slate-200 font-bold text-sm flex items-center gap-2 hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-colors">
                    <Eye className="w-4 h-4" />
                    Quick View
                </Link>
            </div>

            <Link href={`/shop/${slug}`} className="flex flex-col h-full">
                {/* Image Section */}
                <div className="relative aspect-[4/5] bg-slate-50 overflow-hidden border-b border-slate-100">
                    {/* Badge */}
                    {badge && (
                        <div className={cn(
                            "absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border shadow-sm",
                            badgeClass
                        )}>
                            {badge}
                        </div>
                    )}

                    <img
                        src={typeof coverImage === 'string' ? coverImage : ''}
                        alt={title}
                        className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
                    />
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-1">
                    {/* Format & Rating Row */}
                    <div className="flex items-center justify-between mb-3 text-xs text-slate-500 transition-colors group-hover:text-gold-600">
                        <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                            <FormatIcon className="w-3.5 h-3.5" />
                            {format}
                        </div>
                        <StarRating rating={rating} size={12} />
                    </div>

                    <h3 className="text-xl font-bold text-brand-900 mb-2 font-heading leading-tight group-hover:text-gold-600 transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-slate-500 mb-6 font-sans line-clamp-2 leading-relaxed">
                        {shortDescription}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex flex-col">
                            {compareAtPrice && compareAtPrice > price && (
                                <span className="text-xs text-slate-400 line-through font-sans mb-0.5">
                                    {formatPrice(compareAtPrice)}
                                </span>
                            )}
                            <span className="text-2xl font-bold text-brand-900 font-sans tracking-tight">
                                {formatPrice(price)}
                            </span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 transition-all duration-300 group-hover:bg-gold-500 group-hover:text-white group-hover:border-gold-500">
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

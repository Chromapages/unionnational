"use client";

import { useState, type ComponentType } from "react";
import { Link } from "@/i18n/navigation";
import { ArrowRight, FileText, PlayCircle, BookOpen, Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Skeleton } from "@/components/ui/Skeleton";

import { useTranslations } from "next-intl";
import { trackMetaEvent } from "@/components/seo/MetaPixel";
import { formatProductPrice, hasPublishedProductDescription } from "@/lib/shop/commerce";

export interface ProductCardProps {
    title: string;
    coverImage?: string | null;
    imageUrl?: string | null;
    imageMetadata?: { lqip?: string } | null;
    price: number;
    compareAtPrice?: number;
    shortDescription: string;
    slug: string;
    format: string; // 'ebook', 'template', 'course'
    category?: string;
    badge?: string; // 'bestseller', 'new', 'limited'
    rating?: number;
    layout?: "catalog" | "related";
}

type BadgeType = 'bestseller' | 'new' | 'limited';

const badgeStyles: Record<BadgeType, string> = {
    bestseller: "bg-gold-500/10 text-gold-800 border-gold-500/20",
    new: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    limited: "bg-red-500/10 text-red-600 border-red-500/20",
};

const formatIcons: Record<string, ComponentType<{ className?: string }>> = {
    ebook: BookOpen,
    template: FileText,
    course: PlayCircle,
    bundle: BookOpen,
};

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
    imageUrl,
    imageMetadata,
    price,
    compareAtPrice,
    shortDescription,
    slug,
    format = 'ebook',
    badge,
    category,
    layout = 'catalog',
}: ProductCardProps) {
    const t = useTranslations("Shop.ProductCard");
    const [imageLoaded, setImageLoaded] = useState(false);
    if (!slug?.trim() || slug === "undefined" || !hasPublishedProductDescription(shortDescription)) return null;

    // Resolve the final display image from available props
    const finalImage = imageUrl || coverImage;
    const imageSrc = typeof finalImage === 'string' && finalImage.trim() !== '' ? finalImage : undefined;

    const relatedLayout = layout === "related";
    const FormatIcon = formatIcons[format.toLowerCase()] || FileText;
    const badgeClass = badge ? badgeStyles[badge.toLowerCase() as BadgeType] || "" : "";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("group relative h-full flex flex-col bg-white rounded-2xl border border-slate-200 transition-all duration-300 hover:border-gold-400 hover:shadow-xl hover:-translate-y-1 overflow-hidden", relatedLayout && "shadow-sm")}
        >
            <Link href={`/shop/${slug}`} aria-label={relatedLayout ? t("viewBook") + ": " + title : undefined} onClick={() => trackMetaEvent("SelectContent", { content_type: "product", content_id: slug, name: title })} className="flex flex-col h-full rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-gold-700">
                {/* Image Section */}
                <div className={cn("relative overflow-hidden border-b border-slate-100", relatedLayout ? "aspect-[6/5] bg-gradient-to-b from-white to-slate-50" : "aspect-[4/5] bg-slate-50")}>
                    {/* Badge */}
                    {badge && (
                        <div className={cn(
                            "absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border shadow-sm",
                            relatedLayout ? "inline-flex items-center gap-2 bg-gold-50 text-brand-950 border-gold-200 !text-xs !tracking-normal" : badgeClass
                        )}>
                            {relatedLayout && <Star className="size-3.5 fill-current" aria-hidden="true" />}{badge}
                        </div>
                    )}

                    {imageSrc && !imageLoaded && (
                        <Skeleton className="absolute inset-0 z-10 p-8" />
                    )}

                    {imageSrc ? (
                        <Image
                            src={imageSrc}
                            alt={title}
                            fill
                            className={cn(
                                "object-contain transition-all duration-700 group-hover:scale-105 mix-blend-multiply",
                                relatedLayout ? "px-5 pb-4 pt-12 drop-shadow-lg" : "p-8",
                                imageLoaded ? "opacity-100 blur-0" : "opacity-0 blur-lg"
                            )}
                            onLoad={() => setImageLoaded(true)}
                            placeholder={imageMetadata?.lqip ? "blur" : "empty"}
                            blurDataURL={imageMetadata?.lqip}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-100">
                            <BookOpen className="w-12 h-12 text-slate-300" />
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className={cn("flex flex-col flex-1", relatedLayout ? "p-5 sm:p-6" : "p-6")}>
                    {/* Format */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-3 text-xs text-slate-700 transition-colors group-hover:text-gold-800">
                        <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                            <FormatIcon className="w-3.5 h-3.5" aria-hidden="true" />
                            {format}
                        </div>
                        {relatedLayout && category && <span className="border-l border-slate-400 pl-3 font-heading font-semibold uppercase tracking-wide">{category}</span>}
                    </div>

                    <h3 className={cn("font-bold text-brand-900 mb-2 font-heading leading-tight group-hover:text-gold-800 transition-colors", relatedLayout ? "text-2xl" : "text-xl")}>
                        {title}
                    </h3>
                    <p className={cn("text-slate-700 mb-6 font-sans leading-relaxed", relatedLayout ? "text-base" : "text-sm line-clamp-2")}>
                        {shortDescription}
                    </p>

                    <div className={cn("mt-auto flex flex-wrap items-center justify-between gap-3 pt-4", !relatedLayout && "border-t border-slate-100")}>
                        <div className="flex flex-col">
                            {compareAtPrice && compareAtPrice > price && (
                                <span className="text-xs text-slate-700 line-through font-sans mb-0.5">
                                    {formatPrice(compareAtPrice)}
                                </span>
                            )}
                            <span className={cn("font-bold text-brand-900 tracking-tight", relatedLayout ? "font-data text-3xl" : "font-sans text-2xl")}>
                                {relatedLayout ? formatProductPrice(price) : formatPrice(price)}
                            </span>
                        </div>
                        {relatedLayout ? <span className="inline-flex min-h-11 items-center gap-3 font-heading text-base font-semibold text-brand-500">{t("viewBook")}<ArrowRight className="size-5" aria-hidden="true" /></span> : <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 transition-all duration-300 group-hover:bg-gold-500 group-hover:text-brand-950 group-hover:border-gold-500">
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </div>}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    ShoppingCart,
    Lock,
    BookOpen,
    Volume2,
    Tablet,
    Sparkles,
    ChevronRight,
    ShieldCheck,
    Award,
    Download
} from "lucide-react";

import { useCartStore } from "@/store/useCartStore";
import { buildCartItemKey, type FulfillmentType } from "@/lib/shop/types";
import { normalizeProductEdition } from "@/lib/shop/commerce";
import { trackMetaEvent } from "@/components/seo/MetaPixel";
import { cn } from "@/lib/utils";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export interface BookEdition {
    _key: string;
    name: string;
    price: number;
    format: string;
    stripePriceId?: string;
    stripeProductId?: string;
    description?: string;
}

interface CanonicalBookEdition extends BookEdition {
    id: string;
    fulfillmentType: FulfillmentType;
    requiresShipping: boolean;
}

export interface ConstructionBookSalesSectionProps {
    product: {
        _id: string;
        title: string;
        slug: string;
        imageUrl: string;
        price: number;
        compareAtPrice?: number;
        shortDescription: string;
        format: string;
        badge?: string;
        category?: string;
        rating?: number;
        author?: {
            name: string;
            role?: string;
        };
        pageCount?: number;
        publisher?: string;
        publishDate?: string;
        isbn?: string;
        editions?: BookEdition[];
        samplePages?: { url: string; metadata?: { lqip?: string } }[];
    };
}

export const ConstructionBookSalesSection = ({ product }: ConstructionBookSalesSectionProps) => {
    const {
        _id: id,
        title,
        slug,
        imageUrl,
        compareAtPrice,
        badge = "Contractor Edition",
        editions = [],
        samplePages = []
    } = product;

    const addItem = useCartStore((state) => state.addItem);
    const removeProductItems = useCartStore((state) => state.removeProductItems);
    const toggleCart = useCartStore((state) => state.toggleCart);

    const normalizedEditions = useMemo<CanonicalBookEdition[]>(() => {
        const sourceEditions = editions.length > 0
            ? editions
            : [{
                _key: "default",
                name: "Hardcover Book",
                price: 39,
                format: "physical",
                description: "Premium hardcover edition.",
            }];

        return sourceEditions.map((edition) => {
            const normalized = normalizeProductEdition(id, edition);
            const canonicalFormat =
                normalized.fulfillmentType === "unknown"
                    ? edition.format
                    : normalized.fulfillmentType;

            return {
                ...edition,
                id: normalized.id,
                _key: normalized.id,
                format: canonicalFormat,
                fulfillmentType: normalized.fulfillmentType,
                requiresShipping: normalized.requiresShipping,
            };
        });
    }, [editions, id]);

    const [selectedEdition, setSelectedEdition] = useState<CanonicalBookEdition>(normalizedEditions[0]);

    const [activeMediaUrl, setActiveMediaUrl] = useState<string>(imageUrl);
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    const handleEditionSelect = (edition: CanonicalBookEdition) => {
        setSelectedEdition(edition);
    };

    const handleThumbnailClick = (url: string) => {
        setImageLoaded(false);
        setActiveMediaUrl(url);
    };

    const handleThumbnailKeyDown = (event: React.KeyboardEvent, url: string) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleThumbnailClick(url);
        }
    };

    const handleAddToCart = useCallback(() => {
        if (!id) return;

        removeProductItems(id);
        addItem({
            id: buildCartItemKey(id, selectedEdition.id),
            productId: id,
            editionId: selectedEdition.id,
            editionName: selectedEdition.name,
            slug,
            title: `${title} — ${selectedEdition.name}`,
            price: selectedEdition.price,
            image: imageUrl,
            format: selectedEdition.format,
            fulfillmentType: selectedEdition.fulfillmentType,
            requiresShipping: selectedEdition.requiresShipping,
            stripeProductId: selectedEdition.stripeProductId,
            stripePriceId: selectedEdition.stripePriceId,
        });

        trackMetaEvent("AddToCart", {
            content_id: slug,
            content_type: "product",
            value: selectedEdition.price,
            currency: "USD",
        });

        toggleCart();
    }, [id, slug, title, imageUrl, selectedEdition, addItem, removeProductItems, toggleCart]);

    const handleAddToCartKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleAddToCart();
        }
    };

    // Helper to render format-specific icons
    const getFormatIcon = (format: string) => {
        if (format === "bundle") return <Sparkles className="w-5 h-5 text-gold-500" />;
        if (format === "physical" || format === "print") return <BookOpen className="w-5 h-5 text-slate-500" />;
        if (format === "digital" || format === "pdf") return <Tablet className="w-5 h-5 text-slate-500" />;
        if (format === "audio") return <Volume2 className="w-5 h-5 text-slate-500" />;
        return <BookOpen className="w-5 h-5 text-slate-500" />;
    };

    const discountPct = compareAtPrice && compareAtPrice > selectedEdition.price
        ? Math.round(((compareAtPrice - selectedEdition.price) / compareAtPrice) * 100)
        : null;

    const allMedia = [imageUrl, ...(samplePages?.filter(p => p && p.url).map(p => p.url) || [])].slice(0, 5);

    return (
        <section id="book-sales-offer" className="py-20 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <RevealOnScroll>
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-900 text-gold-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                Ultimate Contractor Resource
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-brand-900 tracking-[-0.03em] whitespace-nowrap">
                                Your Profit Blueprint. Step-by-Step.
                            </h2>
                        </div>
                        <p className="text-slate-500 text-base leading-[1.47] tracking-[-0.024px]">
                            The complete implementation guide to protecting your construction profit. Job costing, cash flow, and margin control — step by step.
                        </p>
                    </div>
                </RevealOnScroll>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    {/* LEFT COLUMN: Visual Media Showcase */}
                    <div className="lg:col-span-5 flex flex-col items-center gap-6 lg:sticky lg:top-24">
                        <div className="relative w-full max-w-lg aspect-[3/4] bg-transparent rounded-none shadow-[0_8px_30px_rgba(0,0,0,0.15)] group">
                            {badge && (
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-brand-900 text-gold-400 text-[9px] font-black uppercase tracking-widest rounded-md shadow-lg border border-brand-800">
                                        <Award className="w-3 h-3 text-gold-400" />
                                        {badge}
                                    </span>
                                </div>
                            )}

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeMediaUrl}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full h-full relative"
                                >
                                    <Image
                                        src={activeMediaUrl}
                                        alt={title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 40vw"
                                        className={cn(
                                            "object-contain p-3 transition-all duration-300",
                                            imageLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
                                        )}
                                        onLoadingComplete={() => setImageLoaded(true)}
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Interactive Thumbnails for Sample Pages Preview */}
                        {allMedia.length > 1 && (
                            <div className="w-full max-w-sm">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
                                    Click below to preview pages
                                </p>
                                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                                    {allMedia.map((mediaUrl, i) => (
                                        <div
                                            key={i}
                                            role="button"
                                            tabIndex={0}
                                            aria-label={`View cover page or sample preview page ${i + 1}`}
                                            onClick={() => handleThumbnailClick(mediaUrl)}
                                            onKeyDown={(e) => handleThumbnailKeyDown(e, mediaUrl)}
                                            className={cn(
                                                "w-16 h-20 shrink-0 relative rounded-lg border-2 bg-white overflow-hidden cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-gold-500",
                                                activeMediaUrl === mediaUrl
                                                    ? "border-gold-500 shadow-md scale-105"
                                                    : "border-slate-200 hover:border-slate-400"
                                            )}
                                        >
                                            <Image
                                                src={mediaUrl}
                                                alt={`Preview ${i + 1}`}
                                                fill
                                                sizes="64px"
                                                className="object-contain p-1"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        
                                            </div>

                    {/* RIGHT COLUMN: Buy Box & Strategic Details */}
                    <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 p-8 sm:p-10">
                        {/* Format Selection Cards */}
                        <div className="mb-8">
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                                Choose Format
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {normalizedEditions.map((ed) => {
                                    const isSelected = selectedEdition._key === ed._key;
                                    return (
                                        <button
                                            key={ed._key}
                                            type="button"
                                            onClick={() => handleEditionSelect(ed)}
                                            aria-pressed={isSelected}
                                            className={cn(
                                                "flex items-start gap-4 p-5 rounded-2xl border-2 transition-all text-left relative focus:outline-none focus:ring-2 focus:ring-gold-500",
                                                isSelected
                                                    ? "border-gold-500 bg-gold-50/20 shadow-md ring-2 ring-gold-500/5"
                                                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                                            )}
                                        >
                                            <div className="mt-1">
                                                {getFormatIcon(ed.format)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-baseline gap-2 mb-1">
                                                    <span className="font-bold text-brand-900 text-sm sm:text-base truncate">
                                                        {ed.name}
                                                    </span>
                                                    <span className="font-black text-brand-900 text-base sm:text-lg tabular-nums">
                                                        ${ed.price}
                                                    </span>
                                                </div>
                                                <p className="text-slate-500 text-xs leading-relaxed">
                                                    {ed.description}
                                                </p>
                                            </div>

                                            {ed.format === "bundle" && (
                                                <div className="absolute top-0 right-0 p-1.5 bg-gold-500 text-white rounded-bl-lg text-[9px] font-black uppercase tracking-wider">
                                                    Best Value
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Call to Action and Trust Info */}
                        <div className="space-y-4">
                            <div className="flex items-baseline gap-4 mb-2">
                                <span className="text-4xl font-extrabold text-brand-900 tabular-nums">
                                    ${selectedEdition.price.toFixed(2)}
                                </span>
                                {compareAtPrice && compareAtPrice > selectedEdition.price && (
                                    <span className="text-lg text-slate-400 line-through tabular-nums">
                                        ${compareAtPrice.toFixed(2)}
                                    </span>
                                )}
                                {discountPct && (
                                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded uppercase tracking-wider">
                                        Save {discountPct}%
                                    </span>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={handleAddToCart}
                                onKeyDown={handleAddToCartKeyDown}
                                tabIndex={0}
                                className="w-full bg-gold-500 text-brand-900 hover:bg-gold-400 active:scale-[0.98] transition-all font-black text-sm uppercase tracking-widest py-5 rounded-full flex items-center justify-center gap-3 shadow-[0_4px_12px_rgba(212,175,55,0.25)]"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Secure This Asset
                                <ChevronRight className="w-4 h-4" />
                            </button>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200 text-center">
                                <div className="flex flex-col items-center">
                                    <ShieldCheck className="w-5 h-5 text-gold-500 mb-1" />
                                    <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-slate-400">
                                        Secure Checkout
                                    </span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Lock className="w-5 h-5 text-gold-500 mb-1" />
                                    <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-slate-400">
                                        Encrypted Pay
                                    </span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Download className="w-5 h-5 text-gold-500 mb-1" />
                                    <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-slate-400">
                                        Instant Delivery
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

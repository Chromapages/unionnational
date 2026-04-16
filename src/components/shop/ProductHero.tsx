"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, ShoppingCart, Zap, ChevronRight, CheckCircle2, ChevronUp, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { cn } from "@/lib/utils";

export interface ProductEdition {
    id: string;
    name: string;
    price: number;
    format: string;
    description?: string;
}

interface ProductHeroProps {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    defaultPrice: number;
    compareAtPrice?: number;
    image: string;
    samplePages?: string[];
    format: string;
    category?: string;
    badge?: string;
    rating?: number;
    author?: {
        name: string;
        role?: string;
    };
    pageCount?: number;
    publisher?: string;
    publishDate?: string;
    isbn?: string;
    editions?: ProductEdition[];
}

export function ProductHero({
    id, slug, title, subtitle, defaultPrice, compareAtPrice,
    image, samplePages = [], format, category, badge, rating = 5,
    author, pageCount, publisher, publishDate, isbn,
    editions: initialEditions = [],
}: ProductHeroProps) {
    const addItem = useCartStore((state) => state.addItem);
    const toggleCart = useCartStore((state) => state.toggleCart);
    const toggleItem = useWishlistStore((state) => state.toggleItem);
    const isWishlisted = useWishlistStore((state) => state.isWishlisted);
    const wishlisted = isWishlisted(id);

    // Build editions from props, with a fallback for backwards compatibility
    const editions: ProductEdition[] = (initialEditions && initialEditions.length > 0)
        ? initialEditions.map(ed => ({ ...ed, id: ed.id || `${id}-${ed.name.toLowerCase().replace(/\s+/g, '-')}` }))
        : [
            {
                id: `${id}-digital`,
                name: "Digital PDF",
                price: defaultPrice,
                format: "Digital PDF",
                description: "Instant download. Read anywhere.",
            },
            {
                id: `${id}-hardcover`,
                name: "Hardcover",
                price: defaultPrice + 56, // Temporary fallback until Sanity is populated
                format: "Physical Book",
                description: "Premium hardbound edition.",
            },
        ];

    const [selectedEdition, setSelectedEdition] = useState<ProductEdition>(editions[0]);
    const [mainImage, setMainImage] = useState(image);
    const thumbnailRef = useCallback((node: HTMLDivElement | null) => {
        if (node !== null) {
            // Potential for future intersection observer or scroll logic if needed
        }
    }, []);

    const scrollThumbnails = (direction: "up" | "down") => {
        const container = document.getElementById("thumbnail-scroll-container");
        if (container) {
            const scrollAmount = 100;
            container.scrollBy({
                top: direction === "up" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            });
        }
    };

    // Build thumbnail list: cover image + sample pages (up to 8 for the scroll test)
    const allImages = [image, ...(samplePages?.filter(Boolean) || [])].slice(0, 8);

    const handleAddToCart = useCallback(() => {
        addItem({
            id: selectedEdition.id,
            slug,
            title: `${title} — ${selectedEdition.name}`,
            price: selectedEdition.price,
            image,
            format: selectedEdition.format,
        });
        toggleCart();
    }, [selectedEdition, slug, title, image, addItem, toggleCart]);

    const handleWishlist = useCallback(() => {
        toggleItem({ id, slug, title, price: selectedEdition.price, image, format: selectedEdition.format });
    }, [id, slug, title, image, selectedEdition, format, toggleItem]);

    const discountPct = compareAtPrice && compareAtPrice > selectedEdition.price
        ? Math.round(((compareAtPrice - selectedEdition.price) / compareAtPrice) * 100)
        : null;

    const starCount = Math.round(rating);
    const formattedDate = publishDate
        ? new Date(publishDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
        : null;

    return (
        <section className="bg-white border-b border-slate-100 pt-6 pb-12">
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-start">

                    {/* ─── LEFT COLUMN: Image Gallery ─────────────────────── */}
                    <div className="w-full lg:w-[45%] flex gap-4 lg:gap-6 lg:sticky lg:top-24 items-start">

                        {/* Thumbnail Strip (Bookstore Standard) */}
                        {allImages.length > 1 && (
                            <div className="hidden sm:flex flex-col items-center gap-2 shrink-0">
                                <button 
                                    onClick={() => scrollThumbnails("up")}
                                    className="p-1 text-slate-400 hover:text-brand-900 transition-colors"
                                    aria-label="Scroll thumbnails up"
                                >
                                    <ChevronUp className="w-5 h-5" />
                                </button>
                                
                                <div 
                                    id="thumbnail-scroll-container"
                                    className="flex flex-col gap-2 w-[72px] max-h-[400px] overflow-y-auto no-scrollbar scroll-smooth py-1"
                                >
                                    {allImages.map((src, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setMainImage(src)}
                                            aria-label={`View image ${i + 1}`}
                                            className={cn(
                                                "w-full aspect-[2/3] shrink-0 rounded-sm overflow-hidden border transition-all duration-200 bg-slate-50",
                                                mainImage === src
                                                    ? "border-brand-900 ring-1 ring-brand-900 shadow-sm"
                                                    : "border-slate-200 hover:border-slate-400 opacity-60 hover:opacity-100"
                                            )}
                                        >
                                            <img 
                                                src={src || undefined} 
                                                alt={`Thumbnail ${i + 1}`} 
                                                className="w-full h-full object-cover" 
                                            />
                                        </button>
                                    ))}
                                </div>

                                <button 
                                    onClick={() => scrollThumbnails("down")}
                                    className="p-1 text-slate-400 hover:text-brand-900 transition-colors"
                                    aria-label="Scroll thumbnails down"
                                >
                                    <ChevronDown className="w-5 h-5" />
                                </button>
                            </div>
                        )}

                        {/* Main Image Container */}
                        <div className="flex-1 flex flex-col items-center gap-6">
                            <div className="w-full">
                                {badge && (
                                    <div className="mb-4">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-900 text-gold-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-sm">
                                            {badge}
                                        </span>
                                    </div>
                                )}

                                <div className="relative group">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={mainImage}
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="w-full aspect-[2/3] max-w-sm mx-auto rounded-lg overflow-hidden shadow-[0_12px_50px_rgba(0,0,0,0.12)] border border-slate-100 bg-slate-50"
                                        >
                                            <img
                                                src={mainImage || undefined}
                                                alt={title}
                                                className="w-full h-full object-cover"
                                            />
                                        </motion.div>
                                    </AnimatePresence>
                                    
                                    {/* Zoom Prompt Overlay (Conceptual) */}
                                    <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="px-3 py-1.5 bg-white/90 backdrop-blur rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-900 shadow-xl border border-slate-200">
                                            Click to Enlarge
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions + mobile thumbnail strip */}
                            <div className="w-full max-w-sm mx-auto">
                                <button
                                    onClick={handleWishlist}
                                    aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                                    className={cn(
                                        "flex items-center gap-2 text-sm font-semibold mx-auto transition-all duration-200 py-2 px-4 rounded-full border border-transparent",
                                        wishlisted ? "text-red-600 bg-red-50 border-red-100" : "text-slate-500 hover:text-brand-900 hover:bg-slate-50"
                                    )}
                                >
                                    <Heart
                                        className={cn("w-4 h-4 transition-all", wishlisted && "fill-red-600")}
                                    />
                                    {wishlisted ? "Saved to Wishlist" : "Add to Wishlist"}
                                </button>

                                {/* Mobile: horizontal thumbnails */}
                                {allImages.length > 1 && (
                                    <div className="flex sm:hidden gap-3 mt-6 overflow-x-auto no-scrollbar scroll-smooth pb-2">
                                        {allImages.map((src, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setMainImage(src)}
                                                aria-label={`View image ${i + 1}`}
                                                className={cn(
                                                    "w-16 h-24 rounded-md overflow-hidden border-2 shrink-0 transition-all bg-slate-50",
                                                    mainImage === src ? "border-brand-900" : "border-slate-200 opacity-60"
                                                )}
                                            >
                                                <img src={src || undefined} alt="" className="w-full h-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ─── RIGHT COLUMN: Buy Box ──────────────────────────── */}
                    <div className="w-full lg:w-[58%] flex flex-col gap-0">

                        {/* Title, Author, Series */}
                        <div className="pb-5 border-b border-slate-100">
                            {category && (
                                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gold-600 mb-3">{category}</p>
                            )}
                            <h1 className="text-3xl md:text-4xl font-bold text-brand-900 font-heading leading-tight tracking-tight mb-2">
                                {title}
                            </h1>
                            {author?.name && (
                                <p className="text-base text-slate-600 mb-1">
                                    By <span className="text-brand-900 font-semibold hover:text-gold-600 cursor-pointer transition-colors">{author.name}</span>
                                    {author.role && <span className="text-slate-400 text-sm"> · {author.role}</span>}
                                </p>
                            )}

                            {/* Star Rating */}
                            <div className="flex items-center gap-3 mt-3">
                                <div className="flex gap-0.5" aria-label={`${starCount} out of 5 stars`}>
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star
                                            key={s}
                                            className={cn(
                                                "w-4 h-4 transition-colors",
                                                s <= starCount ? "fill-gold-500 text-gold-500" : "text-slate-200 fill-slate-200"
                                            )}
                                        />
                                    ))}
                                </div>
                                <a
                                    href="#reviews"
                                    className="text-sm text-brand-700 hover:text-gold-600 underline underline-offset-2 font-medium transition-colors"
                                >
                                    Write a Review
                                </a>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="py-5 border-b border-slate-100">
                            <div className="flex items-baseline gap-3 flex-wrap">
                                <span className="text-3xl font-bold text-brand-900">
                                    ${selectedEdition.price.toFixed(2)}
                                </span>
                                {compareAtPrice && compareAtPrice > selectedEdition.price && (
                                    <span className="text-lg text-slate-400 line-through">
                                        ${compareAtPrice.toFixed(2)}
                                    </span>
                                )}
                                {discountPct && (
                                    <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                        Save {discountPct}%
                                    </span>
                                )}
                            </div>

                            {/* Format Pills */}
                            <div className="mt-4">
                                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-2">Choose Format</p>
                                <div className="flex flex-wrap gap-2">
                                    {editions.map((ed) => (
                                        <button
                                            key={ed.id}
                                            onClick={() => setSelectedEdition(ed)}
                                            aria-pressed={selectedEdition.id === ed.id}
                                            className={cn(
                                                "flex flex-col items-start px-4 py-3 rounded-lg border-2 transition-all duration-200 text-left min-w-[110px]",
                                                selectedEdition.id === ed.id
                                                    ? "border-brand-900 bg-brand-900 text-white shadow-md"
                                                    : "border-slate-200 bg-white text-brand-900 hover:border-brand-400"
                                            )}
                                        >
                                            <span className="text-xs font-bold uppercase tracking-wide">{ed.name}</span>
                                            <span className={cn(
                                                "text-sm font-semibold mt-0.5",
                                                selectedEdition.id === ed.id ? "text-gold-400" : "text-slate-600"
                                            )}>
                                                ${ed.price.toFixed(2)}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                                <button className="mt-2 text-xs text-brand-600 hover:text-gold-600 underline underline-offset-2 transition-colors flex items-center gap-1">
                                    View All Available Formats & Editions
                                    <ChevronRight className="w-3 h-3" />
                                </button>
                            </div>

                        </div>

                        {/* Fulfillment Blocks */}
                        <div className="py-5 flex flex-col gap-3">
                            {/* Block 1: Digital Download */}
                            <div className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 px-5 py-4">
                                <div>
                                    <p className="text-sm font-bold text-brand-900 uppercase tracking-wide flex items-center gap-2">
                                        <Zap className="w-4 h-4 text-gold-500" /> Instant Digital Delivery
                                    </p>
                                    <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                        In stock. Delivered immediately.
                                    </p>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className="shrink-0 px-6 py-3 bg-brand-900 text-white font-bold text-sm uppercase tracking-widest rounded-md shadow-lg shadow-brand-900/20 hover:bg-brand-800 active:scale-[0.98] transition-all flex items-center gap-2"
                                >
                                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                                </button>
                            </div>

                            {/* Block 2: Physical / Book Now */}
                            <div className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 px-5 py-4">
                                <div>
                                    <p className="text-sm font-bold text-brand-900 uppercase tracking-wide">
                                        Ship This Item
                                    </p>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        Hardcover ships in 3–5 business days.
                                    </p>
                                </div>
                                <button
                                    onClick={() => {
                                        setSelectedEdition(editions[1]);
                                        handleAddToCart();
                                    }}
                                    className="shrink-0 px-6 py-3 bg-white border-2 border-brand-900 text-brand-900 font-bold text-sm uppercase tracking-widest rounded-md hover:bg-brand-900 hover:text-white active:scale-[0.98] transition-all"
                                >
                                    Order Print
                                </button>
                            </div>
                        </div>

                        {/* Product Specs */}
                        {(pageCount || publisher || formattedDate || isbn) && (
                            <div className="pt-5 border-t border-slate-100">
                                <dl className="grid grid-cols-2 gap-x-8 gap-y-2.5 text-sm">
                                    {publisher && (
                                        <>
                                            <dt className="text-slate-400 font-medium">Publisher</dt>
                                            <dd className="text-brand-900 font-semibold">{publisher}</dd>
                                        </>
                                    )}
                                    {formattedDate && (
                                        <>
                                            <dt className="text-slate-400 font-medium">Published</dt>
                                            <dd className="text-brand-900 font-semibold">{formattedDate}</dd>
                                        </>
                                    )}
                                    {pageCount && (
                                        <>
                                            <dt className="text-slate-400 font-medium">Page Count</dt>
                                            <dd className="text-brand-900 font-semibold">{pageCount} pages</dd>
                                        </>
                                    )}
                                    {isbn && (
                                        <>
                                            <dt className="text-slate-400 font-medium">ISBN-13</dt>
                                            <dd className="text-brand-900 font-semibold font-mono text-xs">{isbn}</dd>
                                        </>
                                    )}
                                    <dt className="text-slate-400 font-medium">Format</dt>
                                    <dd className="text-brand-900 font-semibold capitalize">{format}</dd>
                                </dl>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

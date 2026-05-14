"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    ChevronUp,
    Heart,
    ShoppingCart,
    Star,
    Zap,
    Trophy,
    ShieldCheck,
    Award,
} from "lucide-react";

import { Skeleton } from "@/components/ui/Skeleton";
import { normalizeProductEdition } from "@/lib/shop/commerce";
import { trackMetaEvent } from "@/components/seo/MetaPixel";
import { buildCartItemKey } from "@/lib/shop/types";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

export interface ProductEdition {
    id: string;
    _key?: string;
    name: string;
    price: number;
    format: string;
    description?: string;
    stripePriceId?: string;
    fulfillmentType?: "digital" | "physical" | "audio" | "bundle" | "unknown";
    requiresShipping?: boolean;
}

interface ProductHeroProps {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    defaultPrice: number;
    compareAtPrice?: number;
    image: string;
    imageMetadata?: { lqip?: string } | null;
    buyLink?: string;
    stripeProductId?: string;
    stripePriceId?: string;
    samplePages?: { url: string; metadata?: { lqip?: string } }[];
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
    videoUrl?: string;
    videoFileUrl?: string;
    videoThumbnail?: {
        url?: string;
        alt?: string;
    };
}

export function ProductHero({
    id, slug, title, subtitle, defaultPrice, compareAtPrice,
    image, imageMetadata, buyLink, stripeProductId, stripePriceId, samplePages = [], category, badge, rating = 5,
    author,
    editions: initialEditions = [],
    videoUrl, videoFileUrl, videoThumbnail,
}: ProductHeroProps) {
    const addItem = useCartStore((state) => state.addItem);
    const toggleCart = useCartStore((state) => state.toggleCart);
    const toggleItem = useWishlistStore((state) => state.toggleItem);
    const isWishlisted = useWishlistStore((state) => state.isWishlisted);
    const wishlisted = isWishlisted(id);

    // Build editions from props, with a fallback for backwards compatibility
    const editions: ProductEdition[] = (initialEditions && initialEditions.length > 0)
        ? initialEditions.map(ed => normalizeProductEdition(id, ed))
        : [
            normalizeProductEdition(id, {
                id: `${id}-digital`,
                name: "Digital PDF",
                price: defaultPrice,
                format: "Digital PDF",
                description: "Instant download. Read anywhere.",
            }),
            normalizeProductEdition(id, {
                id: `${id}-hardcover`,
                name: "Hardcover",
                price: defaultPrice + 56, // Temporary fallback until Sanity is populated
                format: "Physical Book",
                description: "Premium hardbound edition.",
            }),
        ];

    const [selectedEdition, setSelectedEdition] = useState<ProductEdition>(editions[0]);
    const [mainContent, setMainContent] = useState<{ type: 'image' | 'video', url: string, metadata?: { lqip?: string } }>({ 
        type: 'image', 
        url: image,
        metadata: imageMetadata || undefined
    });
    
    const [imageLoaded, setImageLoaded] = useState(false);

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

    // Build thumbnail list: video (if exists) + cover image + sample pages
    const effectiveVideo = videoFileUrl || videoUrl;
    const allMedia = [
        ...(effectiveVideo ? [{ type: 'video' as const, url: effectiveVideo }] : []),
        { type: 'image' as const, url: image, metadata: imageMetadata || undefined },
        ...(samplePages?.filter(p => p && p.url).map(p => ({ type: 'image' as const, url: p.url, metadata: p.metadata })) || [])
    ].slice(0, 9);

    const handleAddToCart = useCallback((editionOverride?: ProductEdition) => {
        const targetEdition = editionOverride || selectedEdition;
        addItem({
            id: buildCartItemKey(id, targetEdition.id),
            productId: id,
            editionId: targetEdition.id,
            editionName: targetEdition.name,
            slug,
            title: `${title} — ${targetEdition.name}`,
            price: targetEdition.price,
            image,
            format: targetEdition.format,
            fulfillmentType: targetEdition.fulfillmentType,
            requiresShipping: targetEdition.requiresShipping,
            buyLink,
            stripeProductId: stripeProductId || undefined,
            stripePriceId: targetEdition.stripePriceId || stripePriceId || undefined,
        });
        trackMetaEvent("AddToCart", {
            content_id: slug,
            content_type: "product",
            value: targetEdition.price,
            currency: "USD",
        });
        toggleCart();
    }, [selectedEdition, id, slug, title, image, buyLink, stripeProductId, stripePriceId, addItem, toggleCart]);

    const handleWishlist = useCallback(() => {
        toggleItem({ id, slug, title, price: selectedEdition.price, image, format: selectedEdition.format });
    }, [id, slug, title, image, selectedEdition, toggleItem]);

    const discountPct = compareAtPrice && compareAtPrice > selectedEdition.price
        ? Math.round(((compareAtPrice - selectedEdition.price) / compareAtPrice) * 100)
        : null;

    const starCount = Math.round(rating);
    return (
        <section className="bg-slate-50 border-b border-slate-200 pt-10 pb-16">
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

                    {/* ─── LEFT COLUMN: Image Gallery ─────────────────────── */}
                    <div className="w-full lg:w-[45%] flex gap-4 lg:gap-6 lg:sticky lg:top-24 items-start">

                        {/* Thumbnail Strip (Institutional Standard) */}
                        {allMedia.length > 1 && (
                            <div className="hidden sm:flex flex-col items-center gap-3 shrink-0">
                                <button 
                                    onClick={() => scrollThumbnails("up")}
                                    className="p-1.5 text-slate-400 hover:text-brand-900 transition-colors bg-white border border-slate-200 rounded-md shadow-sm"
                                    aria-label="Scroll thumbnails up"
                                >
                                    <ChevronUp className="w-4 h-4" />
                                </button>
                                
                                <div 
                                    id="thumbnail-scroll-container"
                                    className="flex flex-col gap-3 w-[80px] max-h-[450px] overflow-y-auto no-scrollbar scroll-smooth py-1"
                                >
                                    {allMedia.map((media, i) => (
                                        <button
                                            key={i}
                                            onClick={() => {
                                                setImageLoaded(false);
                                                setMainContent({ 
                                                    type: media.type, 
                                                    url: media.url, 
                                                    metadata: 'metadata' in media ? media.metadata : undefined 
                                                });
                                            }}
                                            aria-label={`View ${media.type} ${i + 1}`}
                                            className={cn(
                                                "w-full aspect-[3/4] shrink-0 rounded-md overflow-hidden border-2 transition-all duration-300 bg-white relative",
                                                mainContent.url === media.url
                                                    ? "border-gold-500 shadow-md ring-1 ring-gold-500/20"
                                                    : "border-slate-100 hover:border-slate-300 opacity-70 hover:opacity-100"
                                            )}
                                        >
                                            {media.type === 'video' ? (
                                                <div className="w-full h-full bg-brand-900 flex items-center justify-center">
                                                    <Zap className="w-5 h-5 text-gold-500 fill-gold-500" />
                                                </div>
                                            ) : (
                                                <Image 
                                                    src={media.url} 
                                                    alt={`Thumbnail ${i + 1}`} 
                                                    fill
                                                    className="object-contain p-1"
                                                    sizes="80px"
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>

                                <button 
                                    onClick={() => scrollThumbnails("down")}
                                    className="p-1.5 text-slate-400 hover:text-brand-900 transition-colors bg-white border border-slate-200 rounded-md shadow-sm"
                                    aria-label="Scroll thumbnails down"
                                >
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        {/* Main Image Container */}
                        <div className="flex-1 flex flex-col items-center gap-8">
                            <div className="w-full relative">
                                {badge && (
                                    <div className="absolute -top-4 -left-4 z-20">
                                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-brand-900 text-gold-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-md shadow-xl border border-brand-800">
                                            <Trophy className="w-3.5 h-3.5" />
                                            {badge}
                                        </span>
                                    </div>
                                )}

                                <div className="relative group perspective-1000">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={mainContent.url}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.4, ease: "easeOut" }}
                                            className="w-full aspect-[3/4] max-w-sm mx-auto rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(13,46,43,0.15)] border border-slate-200 bg-white relative"
                                        >
                                            {mainContent.type === 'video' ? (
                                                <div className="w-full h-full bg-brand-900">
                                                    {mainContent.url.includes('cdn.sanity.io/files') || mainContent.url.endsWith('.mp4') ? (
                                                        <video
                                                            src={mainContent.url}
                                                            className="w-full h-full object-contain"
                                                            controls
                                                            autoPlay
                                                            poster={videoThumbnail?.url}
                                                        />
                                                    ) : (
                                                        <iframe
                                                            src={mainContent.url.includes('youtube.com') || mainContent.url.includes('youtu.be') 
                                                                ? `https://www.youtube.com/embed/${mainContent.url.split('v=')[1]?.split('&')[0] || mainContent.url.split('/').pop()}?autoplay=1&rel=0`
                                                                : mainContent.url
                                                            }
                                                            className="w-full h-full"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                        />
                                                    )}
                                                </div>
                                            ) : (
                                                <>
                                                    {!imageLoaded && (
                                                        <Skeleton className="absolute inset-0 z-10" />
                                                    )}
                                                    <Image
                                                        src={mainContent.url}
                                                        alt={title}
                                                        fill
                                                        className={cn(
                                                            "object-contain p-4 transition-all duration-700 hover:scale-105",
                                                            imageLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
                                                        )}
                                                        onLoadingComplete={() => setImageLoaded(true)}
                                                        placeholder={mainContent.metadata?.lqip ? "blur" : "empty"}
                                                        blurDataURL={mainContent.metadata?.lqip}
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                                                        priority
                                                    />
                                                </>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>
                                    
                                    {/* Interaction Prompts */}
                                    <div className="absolute inset-x-0 bottom-6 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                        <button className="px-4 py-2 bg-white/95 backdrop-blur rounded-lg text-[10px] font-bold uppercase tracking-widest text-brand-900 shadow-2xl border border-slate-200 hover:bg-gold-500 hover:text-white transition-colors">
                                            Quick View
                                        </button>
                                        <button 
                                            onClick={handleWishlist}
                                            className={cn(
                                                "p-2 bg-white/95 backdrop-blur rounded-lg shadow-2xl border border-slate-200 transition-colors",
                                                wishlisted ? "text-red-600" : "text-brand-900 hover:text-red-600"
                                            )}
                                        >
                                            <Heart className={cn("w-4 h-4", wishlisted && "fill-red-600")} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Elements */}
                            <div className="w-full max-w-sm mx-auto flex items-center justify-center gap-8 py-2 border-y border-slate-200/60">
                                <div className="flex flex-col items-center gap-1">
                                    <ShieldCheck className="w-5 h-5 text-gold-600" />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Secure Vault</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <Award className="w-5 h-5 text-gold-600" />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Expert Choice</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <Zap className="w-5 h-5 text-gold-600" />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Instant Access</span>
                                </div>
                            </div>

                            {/* Strategic Insights Carousel (Sneak Peek) */}
                            {samplePages.length > 0 && (
                                <div className="w-full max-w-sm mx-auto mt-10">
                                    <div className="flex items-center justify-between mb-4 px-1">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                            Strategic Insights
                                        </h3>
                                        <span className="text-[10px] font-bold text-gold-600 flex items-center gap-1">
                                            Sneak Peek <ChevronRight className="w-3 h-3" />
                                        </span>
                                    </div>
                                    <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
                                        {samplePages.map((page, i) => (
                                            <button
                                                key={i}
                                                onClick={() => {
                                                    setImageLoaded(false);
                                                    setMainContent({ type: 'image', url: page.url, metadata: page.metadata });
                                                }}
                                                className={cn(
                                                    "w-24 aspect-[3/4] shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300 bg-white relative group/sample",
                                                    mainContent.url === page.url
                                                        ? "border-gold-500 shadow-md scale-105"
                                                        : "border-slate-100 hover:border-slate-300"
                                                )}
                                            >
                                                <Image 
                                                    src={page.url} 
                                                    alt={`Sample Page ${i + 1}`} 
                                                    fill
                                                    className="object-cover group-hover/sample:scale-110 transition-transform duration-500"
                                                    sizes="96px"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover/sample:bg-black/5 transition-colors" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ─── RIGHT COLUMN: Buy Box (The Vault Card) ──────────── */}
                    <div className="w-full lg:w-[55%]">
                        <div className="bg-white border border-slate-200 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.04)] overflow-hidden">
                            
                            {/* Product Info Section */}
                            <div className="p-8 lg:p-10 border-b border-slate-100">
                                {category && (
                                    <span className="inline-block text-[10px] font-black uppercase tracking-[0.3em] text-gold-600 mb-4 bg-gold-50 px-3 py-1 rounded-full">
                                        {category}
                                    </span>
                                )}
                                <h1 className="text-4xl lg:text-5xl font-bold text-brand-900 font-heading leading-[1.1] tracking-tighter mb-4">
                                    {title}
                                </h1>
                                {subtitle && (
                                    <p className="text-lg leading-relaxed text-slate-600 mb-6 font-sans">
                                        {subtitle}
                                    </p>
                                )}
                                
                                <div className="flex flex-wrap items-center gap-6">
                                    {author?.name && (
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-brand-900 font-bold">
                                                {author.name.charAt(0)}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider leading-none mb-1">Author</span>
                                                <span className="text-sm text-brand-900 font-bold">{author.name}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Star Rating Block */}
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider leading-none mb-1">Reader Rating</span>
                                        <div className="flex items-center gap-2">
                                            <div className="flex gap-0.5" aria-label={`${starCount} out of 5 stars`}>
                                                {[1, 2, 3, 4, 5].map((s) => (
                                                    <Star
                                                        key={s}
                                                        className={cn(
                                                            "w-3.5 h-3.5 transition-colors",
                                                            s <= starCount ? "fill-gold-500 text-gold-500" : "text-slate-200 fill-slate-200"
                                                        )}
                                                    />
                                                ))}
                                            </div>
                                            <a href="#reviews" className="text-xs text-brand-700 font-bold hover:text-gold-600 transition-colors border-b border-brand-700/30">
                                                Verified Reviews
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Transactional Section (Choice & Action) */}
                            <div id="product-purchase" className="p-8 lg:p-10 bg-slate-50/50 scroll-mt-28">
                                {/* Price Display */}
                                <div className="mb-8">
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-3">Investment</p>
                                    <div className="flex items-center gap-4">
                                        <span className="text-5xl font-bold text-brand-900 font-sans tracking-tight tabular-nums">
                                            ${selectedEdition.price.toFixed(2)}
                                        </span>
                                        <div className="flex flex-col">
                                            {compareAtPrice && compareAtPrice > selectedEdition.price && (
                                                <span className="text-lg text-slate-400 line-through font-sans tabular-nums">
                                                    ${compareAtPrice.toFixed(2)}
                                                </span>
                                            )}
                                            {discountPct && (
                                                <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">
                                                    Institutional Savings {discountPct}%
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Format Tiles (Tactile) */}
                                <div className="mb-10">
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">Select Access Format</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {editions.map((ed) => (
                                            <button
                                                key={ed.id}
                                                onClick={() => setSelectedEdition(ed)}
                                                aria-pressed={selectedEdition.id === ed.id}
                                                className={cn(
                                                    "flex items-center justify-between px-6 py-5 rounded-xl border-2 transition-all duration-300 text-left relative overflow-hidden group/tile",
                                                    selectedEdition.id === ed.id
                                                        ? "border-gold-500 bg-white shadow-lg ring-4 ring-gold-500/5"
                                                        : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                                                )}
                                            >
                                                <div className="flex flex-col relative z-10">
                                                    <span className={cn(
                                                        "text-[10px] font-black uppercase tracking-widest mb-1",
                                                        selectedEdition.id === ed.id ? "text-gold-600" : "text-slate-400"
                                                    )}>
                                                        {ed.format}
                                                    </span>
                                                    <span className="text-base font-bold text-brand-900">{ed.name}</span>
                                                </div>
                                                <div className="text-right relative z-10">
                                                    <span className={cn(
                                                        "text-lg font-bold font-sans tabular-nums",
                                                        selectedEdition.id === ed.id ? "text-brand-900" : "text-slate-600"
                                                    )}>
                                                        ${ed.price.toFixed(0)}
                                                    </span>
                                                </div>
                                                {selectedEdition.id === ed.id && (
                                                    <div className="absolute top-0 right-0 p-1.5 bg-gold-500 text-white rounded-bl-lg">
                                                        <CheckCircle2 className="w-3 h-3" />
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Main CTA Block */}
                                <div className="space-y-4">
                                    <button
                                        onClick={() => handleAddToCart()}
                                        className="w-full bg-gold-500 text-brand-900 py-6 rounded-xl font-black text-sm uppercase tracking-[0.2em] shadow-[0_10px_25px_rgba(212,175,55,0.25)] hover:bg-gold-600 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                                    >
                                        <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        Secure This Asset
                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                    
                                    <div className="flex items-center justify-center gap-6">
                                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            Instant Digital Vault Access
                                        </div>
                                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            Expert-Backed Strategies
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

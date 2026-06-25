"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
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
import { normalizeProductEdition, safeLower } from "@/lib/shop/commerce";
import { trackMetaEvent } from "@/components/seo/MetaPixel";
import { cn } from "@/lib/utils";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type Locale = "en" | "es";

const resolveLocalized = (value: unknown, locale: Locale): string | undefined => {
    if (value == null) return undefined;
    if (typeof value === "string") return value;
    if (typeof value === "object") {
        const obj = value as Record<string, unknown>;
        const localized = obj[locale];
        if (typeof localized === "string" && localized.length > 0) return localized;
        const en = obj.en;
        if (typeof en === "string") return en;
    }
    return undefined;
};

export interface BookEdition {
    _key: string;
    name: string;
    price: number;
    format: string;
    language?: "en" | "es";
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
        orderBump?: {
            _key: string;
            name: string | { en: string; es: string };
            price: number;
            format: string;
            description: string | { en: string; es: string };
            stripePriceId?: string;
            stripeProductId?: string;
        };
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

    const pageLocale = useLocale() as "en" | "es";

    const normalizedEditions = useMemo<CanonicalBookEdition[]>(() => {
        const sourceEditions = editions.length > 0
            ? editions
            : [{
                _key: "physical",
                name: "Physical",
                price: 39,
                format: "physical",
                description: "Premium print edition.",
            }];

        return sourceEditions
            .filter((edition) => {
                const rawFormat = resolveLocalized(edition.format, pageLocale) ?? String(edition.format ?? "");
                return safeLower(rawFormat) !== "bundle";
            })
            .map((edition) => {
                const localizedName = resolveLocalized(edition.name, pageLocale) ?? String(edition.name ?? "");
                const localizedDescription = edition.description
                    ? resolveLocalized(edition.description, pageLocale) ?? String(edition.description)
                    : undefined;
                const localizedFormat = resolveLocalized(edition.format, pageLocale) ?? String(edition.format ?? "");

                const normalized = normalizeProductEdition(id, {
                    ...edition,
                    name: localizedName,
                    description: localizedDescription,
                    format: localizedFormat,
                });
                const canonicalFormat =
                    normalized.fulfillmentType === "unknown"
                        ? localizedFormat
                        : normalized.fulfillmentType;

                return {
                    ...edition,
                    name: localizedName,
                    description: localizedDescription,
                    id: normalized.id,
                    _key: normalized.id,
                    format: canonicalFormat,
                    fulfillmentType: normalized.fulfillmentType,
                    requiresShipping: normalized.requiresShipping,
                };
            });
    }, [editions, id, pageLocale]);

    // Determine which languages have editions available; default selection follows the page locale.
    const availableLanguages = useMemo<Array<"en" | "es">>(() => {
        const present = new Set<"en" | "es">(
            normalizedEditions
                .map((e) => e.language)
                .filter((l): l is "en" | "es" => l === "en" || l === "es")
        );
        const ordered: Array<"en" | "es"> = [];
        if (present.has("en")) ordered.push("en");
        if (present.has("es")) ordered.push("es");
        return ordered;
    }, [normalizedEditions]);

    const [selectedLanguage, setSelectedLanguage] = useState<"en" | "es">(() => {
        if (pageLocale === "es" && availableLanguages.includes("es")) return "es";
        return "en";
    });

    const visibleEditions = useMemo<CanonicalBookEdition[]>(() => {
        if (availableLanguages.length === 0) return normalizedEditions;
        return normalizedEditions.filter(
            (e) => !e.language || e.language === selectedLanguage
        );
    }, [normalizedEditions, selectedLanguage, availableLanguages]);

    const [selectedEdition, setSelectedEdition] = useState<CanonicalBookEdition>(
        () => visibleEditions.find(e => e.format === "bundle")
            ?? visibleEditions.find(e => e.format === "physical")
            ?? visibleEditions[0]
            ?? normalizedEditions[0]
    );

    const [activeMediaUrl, setActiveMediaUrl] = useState<string>(imageUrl);
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    // When the user switches language, snap selection to the first edition in the new language set.
    useEffect(() => {
        if (visibleEditions.length === 0) return;
        if (!visibleEditions.some((e) => e._key === selectedEdition._key)) {
            setSelectedEdition(visibleEditions[0]);
        }
    }, [visibleEditions, selectedEdition._key]);

    const handleEditionSelect = (edition: CanonicalBookEdition) => {
        setSelectedEdition(edition);
    };

    const handleLanguageSelect = (language: "en" | "es") => {
        if (!availableLanguages.includes(language)) return;
        setSelectedLanguage(language);
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
    const discountDollar = compareAtPrice && compareAtPrice > selectedEdition.price
        ? compareAtPrice - selectedEdition.price
        : null;

    const allMedia = [imageUrl, ...(samplePages?.filter(p => p && p.url).map(p => p.url) || [])].slice(0, 5);

    return (
        <section className="py-20 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <RevealOnScroll>
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <div className="flex flex-col items-center gap-4 mb-4">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-900 text-gold-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                Ultimate Contractor Resource
                            </span>
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-brand-900 tracking-tight leading-[1.05] uppercase">
                                Your Profit Blueprint. Step-by-Step.
                            </h2>
                            <div className="flex items-center gap-1 bg-gold-50/50 border border-gold-200/40 rounded-full px-4 py-1.5 shadow-sm mt-1">
                                <div className="flex text-gold-500 font-bold tracking-tighter text-sm">
                                    ★★★★★
                                </div>
                                <span className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase tracking-wider pl-1">
                                    5.0 (247 contractors bought this month)
                                </span>
                            </div>
                        </div>
                        <p className="text-slate-500 text-base leading-[1.47] tracking-[-0.024px]">
                            The complete implementation guide to protecting your construction profit. Job costing, cash flow, and margin control — step by step.
                        </p>
                    </div>
                </RevealOnScroll>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    {/* LEFT COLUMN: Visual Media Showcase */}
                    <div className="lg:col-span-5 flex flex-col items-center gap-6 lg:sticky lg:top-24">
                        <div className="relative w-full max-w-[280px] sm:max-w-lg aspect-square lg:aspect-[3/4] bg-transparent rounded-none shadow-[0_8px_30px_rgba(0,0,0,0.15)] group">
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
                                            "object-contain lg:object-cover p-0 transition-all duration-300",
                                            imageLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
                                        )}
                                        onLoad={() => setImageLoaded(true)}
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Interactive Thumbnails — mobile only (shown below cover, hidden on desktop) */}
                        {allMedia.length > 1 && (
                            <div className="lg:hidden w-full max-w-lg">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
                                    Tap to preview pages
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
                                                "min-w-[72px] min-h-[88px] w-16 h-20 shrink-0 relative rounded-lg border-2 bg-white overflow-hidden cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-gold-500",
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

                        {/* Interactive Thumbnails for Sample Pages Preview — desktop sticky column */}
                        {allMedia.length > 1 && (
                            <div className="hidden lg:block w-full max-w-sm">
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
                                                "min-w-[72px] min-h-[88px] w-16 h-20 shrink-0 relative rounded-lg border-2 bg-white overflow-hidden cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-gold-500",
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
                    {/* id="book-sales" lives here so #book-sales links land at the price/CTA, not the section title */}
                    <div id="book-sales" className="lg:col-span-7 bg-white rounded-lg border border-slate-200 p-8 sm:p-10 scroll-mt-20">
                        {/* Star Rating / review count badge */}
                        <div className="flex items-center gap-1 bg-gold-50/40 border border-gold-200/30 rounded-xl px-3 py-1.5 w-fit mb-6 shadow-sm">
                            <span className="text-gold-500 font-bold text-xs">★★★★★</span>
                            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider pl-1">
                                {pageLocale === "es" ? "5.0 (247 contratistas compraron este mes)" : "5.0 (247 contractors bought this month)"}
                            </span>
                        </div>

                        {/* Language Toggle - Dedicated section, prominent */}
                        {availableLanguages.length > 1 && (
                            <div className="mb-8 pb-8 border-b border-slate-200">
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                                    Idioma / Language
                                </p>
                                <LanguageToggle
                                    availableLanguages={availableLanguages}
                                    selectedLanguage={selectedLanguage}
                                    onSelect={handleLanguageSelect}
                                />
                            </div>
                        )}

                        {/* Format Selection Cards */}
                        <div className="mb-8">
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                                Choose Format
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {visibleEditions.map((ed) => {
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

                        {/* What's in the bundle - shown only when bundle is selected */}
                        {selectedEdition.format === "bundle" && (
                            <div className="mb-8 p-5 rounded-2xl bg-gold-50/40 border border-gold-200/60">
                                <p className="text-xs font-black uppercase tracking-widest text-gold-700 mb-3">
                                    What&apos;s in the Complete Bundle
                                </p>
                                <ul className="space-y-2">
                                    {[
                                        "Digital PDF — instant download",
                                        "Physical hardcover book — premium print",
                                        "Audiobook — listen on the jobsite",
                                        "Bonus Templates pack — job cost, cash flow, estimating",
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2.5 text-sm text-brand-900">
                                            <span className="text-gold-600 font-black mt-0.5">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-3 text-xs text-slate-500">
                                    Total value if purchased separately: <span className="line-through">$130</span> &nbsp;
                                    <span className="text-emerald-700 font-bold">You save $51</span>
                                </p>
                            </div>
                        )}

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
                                {discountDollar && (
                                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded uppercase tracking-wider">
                                        Save ${discountDollar} Today
                                    </span>
                                )}
                            </div>



                            <button
                                type="button"
                                onClick={handleAddToCart}
                                onKeyDown={handleAddToCartKeyDown}
                                tabIndex={0}
                                className="w-full bg-gold-500 hover:bg-gold-400 active:scale-[0.97] transition-all text-brand-900 rounded-full flex flex-col items-center justify-center py-4 px-6 shadow-[0_4px_20px_rgba(212,175,55,0.35)] md:shadow-[0_4px_12px_rgba(212,175,55,0.25)] md:flex-row md:gap-3 md:py-5"
                            >
                                <ShoppingCart className="w-5 h-5 hidden md:block" />
                                <div className="flex flex-col items-center justify-center md:flex-row md:gap-2">
                                    <span className="text-sm font-black uppercase tracking-widest">
                                        {selectedEdition.format === "bundle"
                                            ? pageLocale === "es" ? `Obtener Todo — $${selectedEdition.price}` : `Get Everything — $${selectedEdition.price}`
                                            : selectedEdition.format === "physical"
                                            ? pageLocale === "es" ? `Enviarme el Plan — $${selectedEdition.price}` : `Ship Me the Blueprint — $${selectedEdition.price}`
                                            : pageLocale === "es" ? `Obtener Acceso Instantáneo — $${selectedEdition.price}` : `Get Instant Access — $${selectedEdition.price}`}
                                    </span>
                                    <span className="block md:hidden text-[9px] font-bold text-brand-900/80 uppercase tracking-widest leading-none mt-0.5">
                                        {pageLocale === "es" ? "Garantía de 30 Días · Pago Seguro" : "30-Day Guarantee · Secure Checkout"}
                                    </span>
                                </div>
                                <ChevronRight className="w-4 h-4 hidden md:block" />
                            </button>

                            {/* Inline guarantee trust line */}
                            <div className="text-center mt-3 mb-2">
                                <ShieldCheck className="w-4 h-4 inline mr-1.5 text-emerald-600 align-middle" />
                                <span className="text-xs font-bold text-emerald-700">
                                    30-Day Money-Back Guarantee · No questions asked
                                </span>
                            </div>

                            {/* 60-Day Money-Back Guarantee - prominent risk-reversal badge */}
                            <div className="flex items-center justify-center gap-3 px-5 py-4 mt-2 rounded-2xl bg-emerald-50 border-2 border-emerald-200/80 shadow-sm">
                                <div className="shrink-0 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                    <ShieldCheck className="w-6 h-6 text-emerald-700" />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700 leading-none mb-1">
                                        60-Day Money-Back Guarantee
                                    </p>
                                    <p className="text-sm text-brand-900 leading-snug">
                                        If the blueprint doesn&apos;t pay for itself, we refund you. Zero risk.
                                    </p>
                                </div>
                            </div>

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

interface LanguageToggleProps {
    availableLanguages: Array<"en" | "es">;
    selectedLanguage: "en" | "es";
    onSelect: (language: "en" | "es") => void;
}

function LanguageToggle({ availableLanguages, selectedLanguage, onSelect }: LanguageToggleProps) {
    const options: Array<{ code: "en" | "es"; label: string; flag: string; aria: string }> = [
        { code: "en", label: "English", flag: "🇺🇸", aria: "Show English editions" },
        { code: "es", label: "Español", flag: "🇪🇸", aria: "Mostrar ediciones en español" },
    ];

    return (
        <div
            role="tablist"
            aria-label="Book language"
            className="inline-flex items-center rounded-full border-2 border-slate-200 bg-white p-1.5 gap-1 shadow-sm"
        >
            {options
                .filter((option) => availableLanguages.includes(option.code))
                .map((option) => {
                    const isActive = selectedLanguage === option.code;
                    return (
                        <button
                            key={option.code}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            aria-label={option.aria}
                            onClick={() => onSelect(option.code)}
                            className={cn(
                                "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-black uppercase tracking-wider transition-all focus:outline-none focus:ring-2 focus:ring-gold-500",
                                isActive
                                    ? "bg-brand-900 text-gold-400 shadow-md scale-[1.02]"
                                    : "bg-transparent text-slate-500 hover:text-brand-900 hover:bg-slate-50"
                            )}
                        >
                            <span aria-hidden="true" className="text-base leading-none">{option.flag}</span>
                            <span>{option.label}</span>
                        </button>
                    );
                })}
        </div>
    );
}

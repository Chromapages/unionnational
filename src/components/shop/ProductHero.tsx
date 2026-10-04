"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useMemo, useState } from "react";
import { BookOpen, ShoppingCart, Play, ChartNoAxesColumnIncreasing, Settings, Users, Package, ShieldCheck, ArrowRight, Building2, Coins, Target, CalendarDays, HardHat, Truck, Utensils, MessageCircle, type LucideIcon } from "lucide-react";
import VideoEmbed from "@/components/ui/VideoEmbed";
import { StickyBuyBar } from "@/components/ui/StickyBuyBar";
import { ProductOfferSelector } from "./ProductOfferSelector";
import { Link } from "@/i18n/navigation";
import { normalizeProductEdition, getDefaultProductEdition, formatProductPrice, storefrontBookCopyKeys } from "@/lib/shop/commerce";
import { extractString, cn } from "@/lib/utils";
import { trackMetaEvent } from "@/components/seo/MetaPixel";
import { buildCartItemKey } from "@/lib/shop/types";
import { useCartStore } from "@/store/useCartStore";

export interface ProductEdition {
    id: string;
    _key?: string;
    name: string;
    price: number;
    format: string;
    description?: string;
    stripePriceId?: string;
    stripeProductId?: string;
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
    samplePages?: { url: string; metadata?: { lqip?: string } }[] | null;
    format: string;
    category?: string;
    badge?: string;
    author?: { name: string; role?: string };
    pageCount?: number;
    publisher?: string;
    publishDate?: string;
    isbn?: string;
    editions?: ProductEdition[] | null;
    videoUrl?: string;
    videoFileUrl?: string;
    videoThumbnail?: { url?: string; alt?: string };
}

const formatOrder = { digital: 0, audio: 1, physical: 2, bundle: 3, service: 4, unknown: 5 };
const bookHighlightIcons: Record<string, LucideIcon[]> = {
    growth: [ChartNoAxesColumnIncreasing, Settings, Users],
    scorp: [Building2, Users, ChartNoAxesColumnIncreasing],
    cfo: [ChartNoAxesColumnIncreasing, Coins, Target],
    retirement: [CalendarDays, Coins, ShieldCheck],
    construction: [HardHat, Truck, ChartNoAxesColumnIncreasing],
    restaurant: [Settings, Utensils, ChartNoAxesColumnIncreasing],
    general: [BookOpen, Package, MessageCircle],
};

export function ProductHero({
    id, slug, title, subtitle, defaultPrice, image, imageMetadata, buyLink,
    stripeProductId, stripePriceId, samplePages = [], format, category, author,
    editions: initialEditions = [], videoUrl, videoFileUrl, videoThumbnail,
}: ProductHeroProps) {
    const locale = useLocale();
    const t = useTranslations("Shop.ProductHero");
    const page = useTranslations("Shop.ProductPage");
    const bookKey = storefrontBookCopyKeys[slug] || "general";
    const highlightGroup = bookHighlightIcons[bookKey] ? bookKey : "general";
    const highlightPrefix = highlightGroup === "growth" ? "growthHighlights" : "bookHighlights." + highlightGroup;
    const addItem = useCartStore(state => state.addItem);
    const setCartOpen = useCartStore(state => state.setIsOpen);
    const editions = useMemo(() => {
        const source = initialEditions?.length ? initialEditions : [{
            id: id + "-default", name: format, format, price: defaultPrice, stripePriceId,
        }];
        return source.filter(edition => Number.isFinite(edition.price) && edition.price >= 0).map(edition => {
            const normalized = normalizeProductEdition(id, edition);
            const name = extractString(edition.name, locale);
            let description = extractString(edition.description, locale).trim();
            // Only the generic, unitemized bonus suffix is omitted; named CMS extras remain.
            description = description.replace(/\s*\+\s*bonuses\.?$/i, ".");
            if (normalized.fulfillmentType === "digital" && /pdf/i.test(name)) description = page("contents.pdf");
            return { ...normalized, name, description, format: extractString(edition.format, locale) };
        });
    }, [initialEditions, id, format, defaultPrice, stripePriceId, locale, page]);
    const defaultEdition = getDefaultProductEdition(editions);
    const [selectedId, setSelectedId] = useState(defaultEdition?.id || "");
    const selectedEdition = editions.find(edition => edition.id === selectedId) || defaultEdition;
    const sortedEditions = [...editions].sort((a, b) => formatOrder[a.fulfillmentType] - formatOrder[b.fulfillmentType]);
    const canAdd = !!selectedEdition && !!(selectedEdition.stripePriceId || stripePriceId || buyLink);

    const media = [
        ...(image ? [{ type: "image" as const, url: image, metadata: imageMetadata || undefined }] : []),
        ...(samplePages || []).filter(sample => sample?.url).map(sample => ({ type: "image" as const, ...sample })),
        ...((videoFileUrl || videoUrl) ? [{ type: "video" as const, url: (videoFileUrl || videoUrl)! }] : []),
    ];
    const [mediaIndex, setMediaIndex] = useState(0);
    const activeMedia = media[mediaIndex] || media[0];

    const handleAddToCart = useCallback(() => {
        if (!selectedEdition || !canAdd) return;
        addItem({
            id: buildCartItemKey(id, selectedEdition.id), productId: id,
            editionId: selectedEdition.id, editionName: selectedEdition.name,
            slug, title: title + " — " + selectedEdition.name,
            price: selectedEdition.price, image, format: selectedEdition.format,
            fulfillmentType: selectedEdition.fulfillmentType, requiresShipping: selectedEdition.requiresShipping,
            buyLink, stripeProductId: selectedEdition.stripeProductId || stripeProductId,
            stripePriceId: selectedEdition.stripePriceId || stripePriceId,
        });
        trackMetaEvent("AddToCart", { content_id: slug, content_type: "product", value: selectedEdition.price, currency: "USD" });
        setCartOpen(true);
    }, [selectedEdition, canAdd, addItem, setCartOpen, id, slug, title, image, buyLink, stripeProductId, stripePriceId]);

    return <section className="border-b border-slate-200 bg-white py-10 lg:py-12">
        <div className="mx-auto grid w-full max-w-[94rem] min-w-0 gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8 xl:gap-12">
            <div className="min-w-0">
                <div data-book-cover-stage className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-gold-50 to-slate-200 p-6 sm:p-8 lg:min-h-[36rem]">
                    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/5 border-t border-white/70 bg-white/60" />
                    <div className={cn("relative aspect-[512/800] w-[78%] max-w-[22rem]", activeMedia?.type !== "video" && "[transform:perspective(1200px)_rotateY(-8deg)] drop-shadow-[14px_20px_18px_rgba(5,26,24,.25)]")}>
                        {activeMedia?.type === "video" ? <VideoEmbed videoUrl={activeMedia.url} posterImage={videoThumbnail?.url} /> : activeMedia ? <Image src={activeMedia.url} alt={title} fill priority sizes="(max-width: 768px) 70vw, 352px" className="object-contain" placeholder={activeMedia.metadata?.lqip ? "blur" : "empty"} blurDataURL={activeMedia.metadata?.lqip} /> : <BookOpen className="absolute inset-0 m-auto size-16 text-brand-500" aria-hidden="true" />}
                    </div>
                </div>
                {media.length > 1 && <div className="mt-4 flex flex-wrap justify-center gap-3">{media.map((entry, index) => <button key={entry.url} type="button" aria-label={t("viewMedia", { type: entry.type === "video" ? t("video") : t("image"), number: index + 1 })} aria-pressed={mediaIndex === index} onClick={() => setMediaIndex(index)} className={cn("relative min-h-14 w-14 overflow-hidden rounded-lg border-2 bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-700", mediaIndex === index ? "border-brand-500" : "border-slate-600")}>
                    {entry.type === "video" ? <Play className="m-auto size-6 text-brand-500" aria-hidden="true" /> : <Image src={entry.url} alt="" fill sizes="56px" className="object-contain p-1" />}
                </button>)}</div>}
                <ul data-book-highlights className="grid grid-cols-3 gap-2 py-6 sm:gap-4 sm:py-8">
                    {bookHighlightIcons[highlightGroup].map((Icon, index) => <li key={index} className="min-w-0 px-1 text-center [&:not(:first-child)]:border-l [&:not(:first-child)]:border-slate-200 sm:px-3">
                        <span className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-brand-50 text-brand-500 sm:size-16"><Icon className="size-6 sm:size-8" aria-hidden="true" /></span>
                        <p className="font-heading text-sm font-bold leading-snug text-brand-900 sm:text-base">{page(highlightPrefix + "." + index + ".title")}</p>
                        <p className="mt-1.5 text-xs leading-relaxed text-slate-700 sm:text-sm">{page(highlightPrefix + "." + index + ".body")}</p>
                    </li>)}
                </ul>
            </div>
            <div className="min-w-0 pt-2 lg:pt-6">
                {category && <p className="font-heading text-sm font-semibold uppercase tracking-[.08em] text-brand-900 after:mt-3 after:block after:h-px after:w-20 after:bg-gold-600">{category}</p>}
                <h1 className="mt-5 font-heading text-[clamp(2.25rem,4vw,3.75rem)] font-bold leading-[1.08] tracking-[-.04em] text-brand-900">{title}</h1>
                {subtitle && <p className="mt-5 text-lg leading-[1.45] text-slate-700 sm:text-xl">{subtitle}</p>}
                {author?.name && <p className="mt-4 text-sm text-slate-700">{t("author")}: {author.name}</p>}
                <div id="product-purchase" className="mt-6 scroll-mt-28 border-t border-slate-200 pt-5">
                    {selectedEdition && <div className="mb-4"><span data-selected-price={selectedEdition.price} className="font-data text-4xl font-bold tabular-nums text-brand-900 sm:text-5xl">{formatProductPrice(selectedEdition.price)}</span><span data-selected-format className="sr-only">{selectedEdition.name}</span></div>}
                    <ProductOfferSelector editions={sortedEditions} selectedId={selectedEdition?.id || ""} groupId={"format-" + id} onSelect={setSelectedId} />
                    <button id="product-add-to-cart" type="button" disabled={!canAdd} onClick={handleAddToCart} className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl border border-gold-800 bg-gold-500 px-6 py-4 font-heading text-lg font-bold text-brand-950 hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-700">
                        <ShoppingCart className="size-6" aria-hidden="true" />{t("addToCart")}
                    </button>
                    {!canAdd && <p className="mt-3 text-sm leading-relaxed text-slate-700">{page("purchaseUnavailable")}</p>}
                    {selectedEdition && <div data-purchase-support className="mt-6 grid gap-5 sm:grid-cols-2">
                        <div className="flex min-w-0 items-start gap-3"><Package className="mt-1 size-7 shrink-0 text-brand-500" aria-hidden="true" /><div><p className="font-heading text-sm font-bold text-brand-900">{page("editionContents")}</p><p className="mt-1 text-sm leading-relaxed text-slate-700">{selectedEdition.description || selectedEdition.name}</p></div></div>
                        {(selectedEdition.stripePriceId || stripePriceId) && <div className="flex min-w-0 items-start gap-3"><ShieldCheck className="mt-1 size-7 shrink-0 text-brand-500" aria-hidden="true" /><div><p className="font-heading text-sm font-bold text-brand-900">{page("stripeCheckout")}</p><p className="mt-1 text-sm leading-relaxed text-slate-700">{page("cartCheckout")}</p></div></div>}
                    </div>}
                    <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-slate-200 pt-4 text-sm text-slate-700"><span>{page("question")}</span><Link href="/faq" className="inline-flex min-h-11 items-center gap-2 rounded-sm font-heading font-semibold text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-700">{page("faqLink")}<ArrowRight className="size-4" aria-hidden="true" /></Link></div>
                </div>
            </div>
        </div>
        {selectedEdition && <StickyBuyBar price={selectedEdition.price} format={selectedEdition.name} disabled={!canAdd} onAddToCart={handleAddToCart} />}
    </section>;
}

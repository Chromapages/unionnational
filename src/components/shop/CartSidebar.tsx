"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Lock, Phone, Sparkles, Download, Truck, ShieldCheck, CreditCard, Package } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

import { beginCheckout } from "@/lib/shop/checkout-client";
import { trackMetaEvent } from "@/components/seo/MetaPixel";
import { cn } from "@/lib/utils";
import { classifyFulfillment, requiresShippingForFulfillment, formatProductPrice, storefrontBookCopyKeys, hasPublishedProductDescription } from "@/lib/shop/commerce";
import { buildCartItemKey, type CartLineItem } from "@/lib/shop/types";

// TODO: replace with real Stripe price/product IDs for the strategy call offer
// TODO: when order bump is configured in Sanity per-product, source these from the product data instead of hardcoding
const ORDER_BUMP = {
    productId: "construction-strategy-call",
    name: "30-Min Tax Strategy Call with Jason",
    price: 97,
    image: "/images/og-construction.png",
    format: "service",
    fulfillmentType: "service" as const,
    requiresShipping: false,
    stripePriceId: "price_1STRATEGY_STRATEGY_STRATEGY",
    stripeProductId: "prod_STRATEGY_STRATEGY_STRATEGY",
    description: "Apply the blueprint to your business. 30 minutes with Jason, focused on your numbers.",
};

const hasConfiguredOrderBumpPrice = !ORDER_BUMP.stripePriceId.includes("STRATEGY_STRATEGY");

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
};

const sidebarVariants = {
    hidden: { x: "100%" },
    visible: {
        x: 0,
        transition: {
            type: "spring" as const,
            damping: 25,
            stiffness: 200,
            staggerChildren: 0.05,
            delayChildren: 0.1,
        },
    },
    exit: {
        x: "100%",
        transition: {
            type: "spring" as const,
            damping: 30,
            stiffness: 250,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
};

const getImageSrc = (image: string) => {
    const trimmedImage = image.trim();
    return trimmedImage.length > 0 ? trimmedImage : null;
};

export function CartSidebar() {
    const t_cart = useTranslations("Shop.Cart");
    const catalog = useTranslations("Shop.Desktop");
    const items = useCartStore((state) => state.items);
    const isOpen = useCartStore((state) => state.isOpen);
    const setIsOpen = useCartStore((state) => state.setIsOpen);
    const addItem = useCartStore((state) => state.addItem);
    const removeItem = useCartStore((state) => state.removeItem);
    const updateQuantityByAmount = useCartStore((state) => state.updateQuantity);
    const totalPrice = useCartStore((state) => state.totalPrice);
    const totalItems = useCartStore((state) => state.totalItems);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null);
    const dialogRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!isOpen || !dialogRef.current) return;
        const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        const previousOverflow = document.body.style.overflow;
        const inerted: HTMLElement[] = [];
        for (let node: HTMLElement | null = dialogRef.current; node?.parentElement; node = node.parentElement) {
            for (const sibling of node.parentElement.children) {
                if (sibling !== node && !sibling.hasAttribute("data-cart-overlay") && sibling instanceof HTMLElement && !sibling.hasAttribute("inert")) {
                    sibling.setAttribute("inert", "");
                    inerted.push(sibling);
                }
            }
        }
        document.body.style.overflow = "hidden";
        closeRef.current?.focus();
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
                setIsOpen(false);
            }
            if (event.key !== "Tab") return;
            const controls = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])');
            if (!controls?.length) return event.preventDefault();
            const first = controls[0];
            const last = controls[controls.length - 1];
            if (event.shiftKey && (document.activeElement === first || !dialogRef.current?.contains(document.activeElement))) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && (document.activeElement === last || !dialogRef.current?.contains(document.activeElement))) {
                event.preventDefault();
                first.focus();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = previousOverflow;
            inerted.forEach(element => element.removeAttribute("inert"));
            previousFocus?.focus();
        };
    }, [isOpen, setIsOpen]);

    const fulfillmentTypes = items.map(item => item.fulfillmentType || classifyFulfillment(item.format, item.editionName || item.title));
    const hasPrint = items.some((item, index) => item.requiresShipping || requiresShippingForFulfillment(fulfillmentTypes[index] || "unknown"));
    const digitalOnly = items.length > 0 && !hasPrint && fulfillmentTypes.every(type => type === "digital" || type === "audio");
    const fulfillmentLabels = {
        digital: "digitalEdition", physical: "printEdition", audio: "audioEdition",
        bundle: "bundleEdition", service: "serviceEdition", unknown: "resourceEdition",
    } as const;

    const handleCheckout = () => {
        void (async () => {
            setCheckoutMessage(null);
            setIsSubmitting(true);
            try {
                trackMetaEvent("InitiateCheckout", { value: totalPrice, currency: "USD", num_items: items.length });
                const result = await beginCheckout(items);
                if (result.ok && result.redirectUrl) {
                    window.location.assign(result.redirectUrl);
                    return;
                }
                setCheckoutMessage(result.message || t_cart("checkoutError"));
            } catch {
                setCheckoutMessage(t_cart("checkoutError"));
            } finally {
                setIsSubmitting(false);
            }
        })();
    };

    return <AnimatePresence>
        {isOpen && <>
            <motion.div key="cart-overlay" data-cart-overlay="true" aria-hidden="true" variants={overlayVariants} initial="hidden" animate="visible" exit="exit" onClick={() => setIsOpen(false)} className="fixed inset-0 z-[1300] bg-black/40 backdrop-blur-sm" />
            <motion.div key="cart-sidebar" ref={dialogRef} variants={sidebarVariants} initial="hidden" animate="visible" exit="exit" role="dialog" aria-modal="true" aria-labelledby="cart-sidebar-title" aria-describedby="cart-sidebar-status"
                className="fixed inset-y-0 right-0 z-[1310] flex w-full max-w-[32rem] flex-col overflow-hidden bg-white text-brand-900 shadow-2xl sm:rounded-l-3xl">
                <header className="flex shrink-0 items-start justify-between gap-3 border-b border-slate-200 px-4 pb-5 pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-8 sm:py-6">
                    <div className="flex min-w-0 items-center gap-3 sm:gap-5">
                        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gold-50 text-gold-700 sm:size-16"><ShoppingBag className="size-7 sm:size-8" aria-hidden="true" /></span>
                        <div className="min-w-0"><h2 id="cart-sidebar-title" className="font-heading text-2xl font-bold leading-tight text-brand-950 sm:text-3xl">{t_cart("title")}</h2><p className="mt-1 text-sm leading-relaxed text-slate-700 sm:text-base">{t_cart("drawerCount", { count: totalItems })}</p></div>
                    </div>
                    <button ref={closeRef} type="button" onClick={() => setIsOpen(false)} aria-label={t_cart("closeCart")} className="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl text-slate-700 hover:bg-slate-50 hover:text-brand-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-700"><X className="size-7" aria-hidden="true" /></button>
                </header>
                <p id="cart-sidebar-status" role="status" aria-live="polite" aria-atomic="true" className="sr-only">{t_cart("itemCount", { count: totalItems })}</p>
                <div data-cart-scroll className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-8 sm:py-5">
                    {items.length === 0 ? <div className="flex min-h-60 flex-col items-center justify-center py-10 text-center">
                        <ShoppingBag className="mb-5 size-14 text-brand-200" aria-hidden="true" /><p className="font-heading text-lg font-semibold">{t_cart("empty")}</p><p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-700">{t_cart("emptyBody")}</p>
                        <button type="button" onClick={() => setIsOpen(false)} className="mt-5 inline-flex min-h-11 items-center justify-center gap-3 rounded-sm font-heading font-semibold text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-700">{t_cart("continueShopping")}<ArrowRight className="size-5" aria-hidden="true" /></button>
                    </div> : <>
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-2"><h3 className="font-heading text-sm font-bold uppercase tracking-[.12em] text-slate-700">{t_cart("itemHeading", { count: totalItems })}</h3><button type="button" onClick={() => setIsOpen(false)} className="inline-flex min-h-11 items-center gap-2 rounded-sm font-heading text-sm font-semibold text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-700">{t_cart("continueShopping")}<ArrowRight className="size-5" aria-hidden="true" /></button></div>
                        <ul className="space-y-4"><AnimatePresence mode="popLayout">{items.map((item, index) => {
                            const imageSrc = getImageSrc(item.image);
                            const type = fulfillmentTypes[index] || "unknown";
                            const editionSuffix = item.editionName ? " — " + item.editionName : "";
                            const name = editionSuffix && item.title.endsWith(editionSuffix) ? item.title.slice(0, -editionSuffix.length) : item.title;
                            const copyKey = storefrontBookCopyKeys[item.slug];
                            const description = copyKey ? catalog("books." + copyKey + ".description") : "";
                            const ItemIcon = type === "digital" || type === "audio" ? Download : type === "physical" || type === "bundle" ? Truck : Package;
                            return <motion.li key={item.id} variants={itemVariants} layout exit={{ opacity: 0, scale: .95 }} data-cart-line={item.id} className="rounded-2xl border border-slate-200 bg-gold-50/15 p-4 sm:p-5">
                                <div className="grid min-w-0 grid-cols-[5rem_minmax(0,1fr)] gap-4 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-5">
                                    <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-white shadow-sm">{imageSrc ? <Image src={imageSrc} alt={name} fill sizes="(min-width:640px)128px,80px" className="object-contain p-1" /> : <ShoppingBag className="absolute inset-0 m-auto size-8 text-brand-200" aria-hidden="true" />}</div>
                                    <div className="min-w-0"><h4 className="font-heading text-lg font-bold leading-snug text-brand-950 sm:text-2xl">{name}</h4><p className="mt-2 font-heading text-xs font-semibold uppercase tracking-[.08em] text-slate-700 sm:text-sm">{item.editionName || item.format}</p>{hasPublishedProductDescription(description) && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-700 sm:text-base">{description}</p>}<div className="mt-3 flex items-center gap-2 text-sm font-semibold text-brand-500"><ItemIcon className="size-5 shrink-0" aria-hidden="true" /><span>{t_cart(fulfillmentLabels[type])}</span></div></div>
                                </div>
                                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-3">
                                    <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white"><button type="button" onClick={() => updateQuantityByAmount(item.id, item.quantity - 1)} aria-label={t_cart("decreaseQuantity", { title: item.title })} className="flex min-h-11 min-w-11 items-center justify-center rounded-l-xl text-brand-500 hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-700"><Minus className="size-4" aria-hidden="true" /></button><span className="min-w-5 text-center font-data text-sm font-semibold tabular-nums">{item.quantity}</span><button type="button" onClick={() => updateQuantityByAmount(item.id, item.quantity + 1)} aria-label={t_cart("increaseQuantity", { title: item.title })} className="flex min-h-11 min-w-11 items-center justify-center rounded-r-xl text-brand-500 hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-700"><Plus className="size-4" aria-hidden="true" /></button></div>
                                    <span data-cart-line-total={item.price * item.quantity} className="font-data text-2xl font-bold tabular-nums text-brand-950 sm:text-3xl">{formatProductPrice(item.price * item.quantity)}</span>
                                    <button type="button" onClick={() => removeItem(item.id)} aria-label={t_cart("removeItem", { title: item.title })} className="inline-flex min-h-11 items-center gap-2 rounded-sm px-1 text-sm text-slate-700 underline underline-offset-4 hover:text-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-700"><Trash2 className="size-5" aria-hidden="true" />{t_cart("removeLabel")}</button>
                                </div>
                            </motion.li>;
                        })}</AnimatePresence></ul>
                        {(digitalOnly || hasPrint) && <div data-cart-delivery className="mt-5 flex items-start gap-4 rounded-2xl bg-brand-50/60 p-4 sm:p-5"><span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-100/60 text-brand-500">{digitalOnly ? <Download className="size-6" aria-hidden="true" /> : <Truck className="size-6" aria-hidden="true" />}</span><div className="min-w-0"><p className="font-heading text-base font-semibold">{t_cart(digitalOnly ? "digitalDelivery" : "printDelivery")}</p><p className="mt-1 text-sm leading-relaxed text-slate-700">{t_cart(digitalOnly ? "digitalDeliveryBody" : "printDeliveryBody")}</p></div></div>}
                        {hasConfiguredOrderBumpPrice && items.some(item => item.slug === "the-money-making-blueprint-for-construction-companies") && <OrderBumpCard items={items} addItem={addItem} removeItem={removeItem} />}
                        <section aria-labelledby="cart-summary-heading" className="mt-6 border-t border-slate-200 pt-5"><h3 id="cart-summary-heading" className="font-heading text-sm font-bold uppercase tracking-[.12em] text-slate-700">{t_cart("orderSummary")}</h3><dl className="mt-4 space-y-3 text-base text-slate-700"><div className="flex items-center justify-between gap-4"><dt>{t_cart("subtotal")}</dt><dd className="font-data tabular-nums">{formatProductPrice(totalPrice)}</dd></div><div className="flex items-center justify-between gap-4"><dt>{t_cart(digitalOnly ? "digitalDelivery" : "shipping")}</dt><dd className="font-semibold text-brand-500">{t_cart(digitalOnly ? "included" : hasPrint ? "free" : "notRequired")}</dd></div><div className="flex items-center justify-between gap-4 border-t border-slate-200 pt-4 font-heading text-2xl font-bold text-brand-950"><dt>{t_cart("total")}</dt><dd data-cart-total={totalPrice} className="font-data tabular-nums">{formatProductPrice(totalPrice)}</dd></div></dl></section>
                    </>}
                </div>
                {items.length > 0 && <footer className="shrink-0 border-t border-slate-200 bg-white px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-8 sm:pt-5">
                    {checkoutMessage && <p className="mb-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900" role="alert">{checkoutMessage}</p>}
                    <button type="button" onClick={handleCheckout} disabled={isSubmitting} className="flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-brand-900 px-4 py-4 font-heading text-sm font-bold uppercase leading-snug tracking-[.08em] text-gold-300 shadow-lg hover:bg-brand-800 disabled:cursor-wait disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-700 sm:text-lg">{isSubmitting ? t_cart("startingCheckout") : t_cart("checkout")}<Lock className="size-5 shrink-0" aria-hidden="true" /></button>
                    <ul className="mt-4 grid grid-cols-3 gap-2 border-b border-slate-200 pb-4 text-slate-700"><li className="flex min-w-0 items-center gap-2"><ShieldCheck className="size-5 shrink-0" aria-hidden="true" /><span className="text-xs leading-snug">{t_cart("secureCheckout")}</span></li><li className="flex min-w-0 items-center gap-2 border-l border-slate-200 pl-2">{digitalOnly ? <Download className="size-5 shrink-0" aria-hidden="true" /> : <Package className="size-5 shrink-0" aria-hidden="true" />}<span className="text-xs leading-snug">{t_cart(digitalOnly ? "deliveryFormat" : "selectedEditions")}</span></li><li className="flex min-w-0 items-center gap-2 border-l border-slate-200 pl-2"><CreditCard className="size-5 shrink-0" aria-hidden="true" /><span className="text-xs leading-snug">{t_cart("cardPayments")}</span></li></ul>
                    <Link href="/shop/cart" onClick={() => setIsOpen(false)} className="mt-2 flex min-h-11 items-center justify-center gap-3 rounded-sm font-heading text-sm font-semibold text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-700">{t_cart("viewFullCart")}<ArrowRight className="size-5" aria-hidden="true" /></Link>
                </footer>}
            </motion.div>
        </>}
    </AnimatePresence>;
}

interface OrderBumpCardProps {
    items: CartLineItem[];
    addItem: (item: Omit<CartLineItem, "quantity">) => void;
    removeItem: (id: string) => void;
}

function OrderBumpCard({ items, addItem, removeItem }: OrderBumpCardProps) {
    const bookItem = items.find((item) => item.slug === "the-money-making-blueprint-for-construction-companies");
    const bookProductId = bookItem?.productId || "038a9b49-ee53-4e6a-9897-e9fe51693396";
    const bookSlug = bookItem?.slug || "the-money-making-blueprint-for-construction-companies";
    const bookTitle = bookItem?.title ? bookItem.title.split(" — ")[0] : "The Money-Making Blueprint for Construction Companies";

    const bumpCartId = buildCartItemKey(bookProductId, "strategy-call");
    const isChecked = items.some((i) => i.id === bumpCartId);

    const handleToggle = () => {
        if (isChecked) {
            removeItem(bumpCartId);
        } else {
            addItem({
                id: bumpCartId,
                productId: bookProductId,
                slug: bookSlug,
                editionId: "strategy-call",
                editionName: ORDER_BUMP.name,
                title: `${bookTitle} — ${ORDER_BUMP.name}`,
                price: ORDER_BUMP.price,
                image: ORDER_BUMP.image,
                format: ORDER_BUMP.format,
                fulfillmentType: ORDER_BUMP.fulfillmentType,
                requiresShipping: ORDER_BUMP.requiresShipping,
                stripePriceId: ORDER_BUMP.stripePriceId,
                stripeProductId: ORDER_BUMP.stripeProductId,
            });
            trackMetaEvent("AddToCart", {
                content_id: bookSlug,
                content_type: "service",
                value: ORDER_BUMP.price,
                currency: "USD",
            });
        }
    };

    return (
        <div className="px-6 py-4 border-t border-slate-100 bg-gradient-to-br from-gold-50/60 to-white">
            <div className="flex items-start gap-3">
                <button
                    type="button"
                    role="checkbox"
                    aria-checked={isChecked}
                    onClick={handleToggle}
                    className={cn(
                        "shrink-0 mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
                        isChecked
                            ? "bg-gold-500 border-gold-500"
                            : "bg-white border-slate-300 hover:border-gold-500"
                    )}
                >
                    {isChecked && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                </button>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-gold-700">
                            Recommended Add-On
                        </span>
                    </div>
                    <p className="text-sm font-bold text-brand-900 leading-snug">
                        {ORDER_BUMP.name}
                    </p>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {ORDER_BUMP.description}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-slate-700" />
                        <span className="text-sm font-black text-brand-900">${ORDER_BUMP.price}</span>
                        <span className="text-xs text-slate-700 line-through">$197</span>
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                            Save 50%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

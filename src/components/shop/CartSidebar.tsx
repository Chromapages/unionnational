"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Lock, Phone, Sparkles } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

import { beginCheckout } from "@/lib/shop/checkout-client";
import { trackMetaEvent } from "@/components/seo/MetaPixel";
import { cn } from "@/lib/utils";
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
    const items = useCartStore((state) => state.items);
    const isOpen = useCartStore((state) => state.isOpen);
    const setIsOpen = useCartStore((state) => state.setIsOpen);
    const addItem = useCartStore((state) => state.addItem);
    const removeItem = useCartStore((state) => state.removeItem);
    const updateQuantityByAmount = useCartStore((state) => state.updateQuantity);
    const totalPrice = useCartStore((state) => state.totalPrice);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null);

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) setIsOpen(false);
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [isOpen, setIsOpen]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handleCheckout = () => {
        void (async () => {
            setCheckoutMessage(null);
            setIsSubmitting(true);

            try {
                trackMetaEvent("InitiateCheckout", {
                    value: totalPrice,
                    currency: "USD",
                    num_items: items.length,
                });

                const result = await beginCheckout(items);
                if (result.ok && result.redirectUrl) {
                    window.location.assign(result.redirectUrl);
                    return;
                }

                setCheckoutMessage(result.message || "Unable to start checkout.");
            } catch {
                setCheckoutMessage("Unable to start checkout right now. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        })();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        key="cart-overlay"
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
                    />

                    {/* Sidebar */}
                    <motion.div
                        key="cart-sidebar"
                        variants={sidebarVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="cart-sidebar-title"
                        className="fixed top-0 right-0 bottom-0 z-[110] w-full max-w-md bg-white shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gold-50 rounded-xl text-gold-600">
                                    <ShoppingBag className="w-5 h-5" />
                                </div>
                                <h2 id="cart-sidebar-title" className="text-xl font-bold text-brand-900 font-heading">
                                    {t_cart("title") || "Shopping Cart"}
                                </h2>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                aria-label="Close shopping cart"
                                className="p-2 text-slate-400 hover:text-brand-900 hover:bg-slate-50 rounded-xl transition-all"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                                        <ShoppingBag className="w-10 h-10 text-slate-300" />
                                    </div>
                                    <p className="text-slate-500 font-medium mb-6">
                                        {t_cart("empty") || "Your cart is empty"}
                                    </p>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="text-gold-600 font-bold hover:text-gold-500 flex items-center gap-2"
                                    >
                                        {t_cart("continueShopping") || "Continue Shopping"}
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <ul className="space-y-6">
                                    <AnimatePresence mode="popLayout">
                                        {items.map((item) => {
                                            const imageSrc = getImageSrc(item.image);

                                            return (
                                                <motion.li
                                                    key={item.id}
                                                    variants={itemVariants}
                                                    layout
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    className="flex gap-4 p-3 rounded-2xl border border-slate-50 hover:border-slate-100 transition-colors bg-white group"
                                                >
                                                    <div className="relative w-24 h-24 bg-slate-50 rounded-xl overflow-hidden shrink-0">
                                                        {imageSrc ? (
                                                            <Image
                                                                src={imageSrc}
                                                                alt={item.title}
                                                                fill
                                                                className="object-contain p-2"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center text-slate-300">
                                                                <ShoppingBag className="h-8 w-8" aria-hidden="true" />
                                                            </div>
                                                        )}
                                                    </div>
                                                <div className="flex flex-col flex-1">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <h3 className="font-bold text-brand-900 line-clamp-1 text-sm group-hover:text-gold-600 transition-colors">
                                                            {item.title}
                                                        </h3>
                                                        <button
                                                            onClick={() => removeItem(item.id)}
                                                            className="text-slate-300 hover:text-red-500 p-1"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-auto">
                                                        {item.format}
                                                    </p>
                                                    <div className="flex justify-between items-center mt-2">
                                                        <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-2 py-1">
                                                            <button
                                                                onClick={() => updateQuantityByAmount(item.id, item.quantity - 1)}
                                                                className="text-slate-500 hover:text-brand-900 p-1"
                                                            >
                                                                <Minus className="w-3 h-3" />
                                                            </button>
                                                            <span className="text-sm font-bold w-4 text-center">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => updateQuantityByAmount(item.id, item.quantity + 1)}
                                                                className="text-slate-500 hover:text-brand-900 p-1"
                                                            >
                                                                <Plus className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                        <span className="font-bold text-brand-900">
                                                            {formatPrice(item.price * item.quantity)}
                                                        </span>
                                                    </div>
                                                </div>
                                                </motion.li>
                                            );
                                        })}
                                    </AnimatePresence>
                                </ul>
                            )}
                        </div>

                        {/* Order Bump - shown only when construction blueprint book is in cart */}
                        {items.some((item) => item.slug === "the-money-making-blueprint-for-construction-companies") && (
                            <OrderBumpCard items={items} addItem={addItem} removeItem={removeItem} />
                        )}

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                                <div className="space-y-2 mb-6 text-sm">
                                    <div className="flex justify-between text-slate-500">
                                        <span>{t_cart("subtotal") || "Subtotal"}</span>
                                        <span>{formatPrice(totalPrice)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500">
                                        <span>{t_cart("shipping") || "Shipping"}</span>
                                        <span className="text-emerald-600 font-bold">
                                            {t_cart("free") || "FREE"}
                                        </span>
                                    </div>
                                    <div className="pt-4 border-t border-slate-200 flex justify-between text-xl font-bold text-brand-900">
                                        <span>{t_cart("total") || "Total"}</span>
                                        <span>{formatPrice(totalPrice)}</span>
                                    </div>
                                </div>
                                {checkoutMessage && (
                                    <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                                        {checkoutMessage}
                                    </div>
                                )}
                                <Link
                                    href="/shop/cart"
                                    onClick={() => setIsOpen(false)}
                                    className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-900 transition-colors hover:bg-slate-50"
                                >
                                    Review Cart
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <button
                                    onClick={handleCheckout}
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-brand-900 text-gold-400 font-black uppercase tracking-[0.2em] rounded-xl shadow-xl shadow-brand-900/20 hover:bg-brand-800 hover:shadow-brand-900/40 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                                >
                                    {isSubmitting ? "Starting checkout..." : t_cart("checkout") || "Proceed to Checkout"}
                                    <Lock className="w-4 h-4" />
                                </button>
                                <p className="mt-4 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center justify-center gap-2">
                                    <ShoppingBag className="w-3 h-3" /> {t_cart("secureNote") || "Secure Cloud Checkout"}
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
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
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-sm font-black text-brand-900">${ORDER_BUMP.price}</span>
                        <span className="text-xs text-slate-400 line-through">$197</span>
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                            Save 50%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

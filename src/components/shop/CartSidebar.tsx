"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Lock } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

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

export function CartSidebar() {
    const t_shop = useTranslations("Shop");
    const t_cart = useTranslations("Shop.Cart");
    const items = useCartStore((state) => state.items);
    const isOpen = useCartStore((state) => state.isOpen);
    const setIsOpen = useCartStore((state) => state.setIsOpen);
    const removeItem = useCartStore((state) => state.removeItem);
    const updateQuantityByAmount = useCartStore((state) => state.updateQuantity);
    const totalPrice = useCartStore((state) => state.totalPrice);

    const cartRef = useRef<HTMLDivElement>(null);

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
        // Placeholder for Stripe Redirect
        console.log("Redirecting to Stripe with items:", items);
        alert("Redirecting to Stripe Checkout... (API integration pending)");
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
                        className="fixed top-0 right-0 bottom-0 z-[110] w-full max-w-md bg-white shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gold-50 rounded-xl text-gold-600">
                                    <ShoppingBag className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-bold text-brand-900 font-heading">
                                    {t_cart("title") || "Shopping Cart"}
                                </h2>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
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
                                        {items.map((item) => (
                                            <motion.li
                                                key={item.id}
                                                variants={itemVariants}
                                                layout
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="flex gap-4 p-3 rounded-2xl border border-slate-50 hover:border-slate-100 transition-colors bg-white group"
                                            >
                                                <div className="relative w-24 h-24 bg-slate-50 rounded-xl overflow-hidden shrink-0">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.title}
                                                        fill
                                                        className="object-contain p-2"
                                                    />
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
                                        ))}
                                    </AnimatePresence>
                                </ul>
                            )}
                        </div>

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
                                <button
                                    onClick={handleCheckout}
                                    className="w-full py-4 bg-brand-900 text-gold-400 font-black uppercase tracking-[0.2em] rounded-xl shadow-xl shadow-brand-900/20 hover:bg-brand-800 hover:shadow-brand-900/40 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                                >
                                    {t_cart("checkout") || "Proceed to Checkout"}
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

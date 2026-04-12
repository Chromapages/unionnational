"use client";

import { useCartStore } from "@/store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Lock, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface StickyBuyBarProps {
    id: string;
    slug: string;
    title: string;
    price: number;
    image: string;
    format: string;
}

export function StickyBuyBar({ id, slug, title, price, image, format }: StickyBuyBarProps) {
    const [isVisible, setIsVisible] = useState(false);
    const addItem = useCartStore((state) => state.addItem);
    const toggleCart = useCartStore((state) => state.toggleCart);

    useEffect(() => {
        const handleScroll = () => {
            // Show bar when scrolled past 600px (roughly when the main hero CTA is off-screen)
            setIsVisible(window.scrollY > 600);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleAddToCart = () => {
        addItem({ id, slug, title, price, image, format });
        toggleCart();
    };

    const formatPrice = (p: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        }).format(p);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0, x: "-50%" }}
                    animate={{ y: 0, opacity: 1, x: "-50%" }}
                    exit={{ y: 100, opacity: 0, x: "-50%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed bottom-8 left-1/2 z-[80] w-[95%] max-w-lg bg-brand-900 py-3.5 px-6 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.5)] border border-white/10"
                >
                    <div className="flex items-center justify-between gap-8">
                        {/* Product Intent */}
                        <div className="flex items-center gap-4 min-w-0">
                            <div className="h-10 w-10 rounded-lg bg-brand-800 flex items-center justify-center shrink-0 border border-white/5 overflow-hidden">
                                <img src={image} alt={title} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <h3 className="font-heading font-bold text-[13px] text-white tracking-tight truncate leading-tight">
                                    {title}
                                </h3>
                                <span className="font-sans text-[8px] font-black uppercase tracking-[0.2em] text-gold-500/80">
                                    {format}
                                </span>
                            </div>
                        </div>

                        {/* Transaction Layer */}
                        <div className="flex items-center gap-6 shrink-0">
                            <div className="flex flex-col items-end">
                                <span className="font-sans text-[8px] font-black uppercase tracking-widest text-white/30">Total Value</span>
                                <span className="text-lg font-bold text-white tabular-nums leading-none mt-0.5">{formatPrice(price)}</span>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="bg-gold-500 text-brand-900 hover:bg-gold-400 font-sans font-bold uppercase tracking-[0.1em] text-[10px] py-2.5 px-6 rounded-md shadow-sm active:scale-[0.96] transition-all flex items-center gap-2"
                            >
                                <ShoppingBag className="w-3.5 h-3.5" />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

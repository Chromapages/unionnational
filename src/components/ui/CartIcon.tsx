"use client";

import { useCartStore } from "@/store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function CartIcon() {
    const pathname = usePathname();
    const totalItems = useCartStore((state) => state.totalItems);
    const toggleCart = useCartStore((state) => state.toggleCart);

    // Local state to handle hydration and visibility
    const [mounted, setMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Only show cart icon on shop route and sub-routes
        setIsVisible(pathname.includes("/shop"));
    }, [pathname]);

    if (!mounted || !isVisible) return null;

    return (
        <AnimatePresence>
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleCart}
                className="fixed bottom-8 left-8 z-[90] flex h-16 w-16 items-center justify-center rounded-full bg-brand-900 text-gold-400 shadow-2xl shadow-brand-900/40 border border-gold-500/20 backdrop-blur-xl group transition-all hover:bg-brand-800"
            >
                <ShoppingBag className="w-7 h-7" />
                
                {totalItems > 0 && (
                    <motion.span
                        key={totalItems}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-[10px] font-black text-brand-950 shadow-md ring-2 ring-white"
                    >
                        {totalItems}
                    </motion.span>
                )}
            </motion.button>
        </AnimatePresence>
    );
}

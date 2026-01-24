"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface StickyServiceNavProps {
    categories: string[];
    activeCategory: string;
    onCategorySelect: (category: string) => void;
}

export function StickyServiceNav({ categories, activeCategory, onCategorySelect }: StickyServiceNavProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling past hero (approx 400px)
            setIsVisible(window.scrollY > 400);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-[72px] left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-sm"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3">
                            <button
                                onClick={() => onCategorySelect("All")}
                                className={cn(
                                    "text-sm font-medium whitespace-nowrap transition-colors px-4 py-2 rounded-full border",
                                    activeCategory === "All"
                                        ? "bg-brand-900 text-white border-brand-900"
                                        : "bg-white text-zinc-600 border-zinc-200 hover:border-brand-300 hover:bg-zinc-50"
                                )}
                            >
                                All Services
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => onCategorySelect(cat)}
                                    className={cn(
                                        "text-sm font-medium whitespace-nowrap transition-colors px-4 py-2 rounded-full border",
                                        activeCategory === cat
                                            ? "bg-brand-900 text-white border-brand-900"
                                            : "bg-white text-zinc-600 border-zinc-200 hover:border-brand-300 hover:bg-zinc-50"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

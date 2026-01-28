"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CategoryFilterProps {
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

const categories = [
    { id: "all", label: "All Resources" },
    { id: "tax-plans", label: "Tax Plans" },
    { id: "templates", label: "Templates" },
    { id: "ebooks", label: "Guides & eBooks" },
    { id: "courses", label: "Video Courses" },
];

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
    return (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onCategoryChange(category.id)}
                    className={cn(
                        "relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap border",
                        activeCategory === category.id
                            ? "bg-brand-900 text-gold-400 border-brand-900 shadow-lg shadow-brand-900/20"
                            : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-brand-900 hover:border-slate-300"
                    )}
                >
                    {category.label}
                    {activeCategory === category.id && (
                        <motion.div
                            layoutId="activePill"
                            className="absolute inset-0 rounded-full bg-white/20"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            style={{ mixBlendMode: "overlay" }}
                        />
                    )}
                </button>
            ))}
        </div>
    );
}

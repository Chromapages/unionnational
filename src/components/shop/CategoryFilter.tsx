"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

const categories = [
    { id: "all", label: "All Resources" },
    { id: "ebook", label: "Ebooks" },
    { id: "template", label: "Templates" },
    { id: "course", label: "Courses" },
];

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
    return (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onCategoryChange(category.id)}
                    className={cn(
                        "relative px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap",
                        activeCategory === category.id
                            ? "text-brand-900"
                            : "text-brand-400 hover:text-brand-700 hover:bg-white/50"
                    )}
                >
                    {activeCategory === category.id && (
                        <motion.div
                            layoutId="activeCategory"
                            className="absolute inset-0 bg-gold-400 rounded-full shadow-lg shadow-gold-500/20"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10">{category.label}</span>
                </button>
            ))}
        </div>
    );
}

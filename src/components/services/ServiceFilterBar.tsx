"use client";

import { cn } from "@/lib/utils";

interface ServiceFilterBarProps {
    categories: string[];
    activeCategory: string;
    onCategorySelect: (category: string) => void;
}

export function ServiceFilterBar({ categories, activeCategory, onCategorySelect }: ServiceFilterBarProps) {
    return (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
                onClick={() => onCategorySelect("All")}
                className={cn(
                    "text-sm md:text-base font-medium whitespace-nowrap transition-all px-6 py-2.5 rounded-full border-2",
                    activeCategory === "All"
                        ? "bg-brand-900 text-white border-brand-900 shadow-lg shadow-brand-900/10"
                        : "bg-white text-zinc-500 border-zinc-200 hover:border-brand-300 hover:text-brand-700 hover:shadow-sm"
                )}
            >
                All Services
            </button>
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onCategorySelect(cat)}
                    className={cn(
                        "text-sm md:text-base font-medium whitespace-nowrap transition-all px-6 py-2.5 rounded-full border-2",
                        activeCategory === cat
                            ? "bg-brand-900 text-white border-brand-900 shadow-lg shadow-brand-900/10"
                            : "bg-white text-zinc-500 border-zinc-200 hover:border-brand-300 hover:text-brand-700 hover:shadow-sm"
                    )}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}

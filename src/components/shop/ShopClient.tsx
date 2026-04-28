"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { ProductGrid } from "./ProductGrid";
import { motion, AnimatePresence } from "framer-motion";
import { CategoryFilter } from "./CategoryFilter";
import { SearchBar } from "./SearchBar";

interface ShopClientProduct {
    _id: string;
    title: string;
    slug: string;
    shortDescription: string;
    category?: string;
    price: number;
    format: string;
    rating?: number;
    isFeatured?: boolean;
    compareAtPrice?: number;
    imageUrl?: string;
    imageMetadata?: { lqip?: string } | null;
    badge?: string;
}

interface ShopClientProps {
    products: ShopClientProduct[];
}

export function ShopClient({ products }: ShopClientProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    // Local state for immediate UI feedback (debounce-like)
    const [isMounted, setIsMounted] = useState(false);
    
    // Source of truth from URL
    const activeCategory = searchParams.get("category") || "all";
    const searchQuery = searchParams.get("q") || "";
    const sortOrder = searchParams.get("sort") || "featured";

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const updateQueryParams = useCallback((updates: Record<string, string | null>) => {
        const nextParams = new URLSearchParams(searchParams.toString());
        
        Object.entries(updates).forEach(([key, value]) => {
            if (value === null || value === "all" || (key === "sort" && value === "featured")) {
                nextParams.delete(key);
            } else {
                nextParams.set(key, value);
            }
        });

        const queryString = nextParams.toString();
        router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    }, [pathname, router, searchParams]);

    const handleCategoryChange = (category: string) => {
        updateQueryParams({ category, q: searchQuery }); // Keep search, change category
    };

    const handleSearchChange = (q: string) => {
        updateQueryParams({ q });
    };

    const handleSortChange = (sort: string) => {
        updateQueryParams({ sort });
    };

    const filteredProducts = useMemo(() => {
        const visibleProducts = products.filter((product) => {
            const matchesCategory = activeCategory === "all" || product.category === activeCategory;
            const matchesSearch = !searchQuery || 
                product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        return [...visibleProducts].sort((left, right) => {
            switch (sortOrder) {
                case "price-asc":
                    return left.price - right.price;
                case "price-desc":
                    return right.price - left.price;
                case "rating":
                    return (right.rating || 0) - (left.rating || 0);
                case "title":
                    return left.title.localeCompare(right.title);
                case "featured":
                default:
                    return Number(right.isFeatured) - Number(left.isFeatured);
            }
        });
    }, [products, activeCategory, searchQuery, sortOrder]);

    if (!isMounted) {
        return (
            <div className="max-w-7xl mx-auto px-6 mb-32 min-h-[600px]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 bg-white/50 backdrop-blur-md p-6 rounded-3xl border border-slate-200">
                    <div className="h-10 w-64 bg-slate-100 animate-pulse rounded-xl" />
                    <div className="h-10 w-48 bg-slate-100 animate-pulse rounded-xl" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-96 bg-slate-50 animate-pulse rounded-2xl border border-slate-200" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <section id="browse" className="max-w-7xl mx-auto px-6 mb-32 relative z-10">
            {/* Filters Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 bg-white/50 backdrop-blur-md p-6 rounded-3xl border border-slate-200 shadow-sm">
                <CategoryFilter 
                    activeCategory={activeCategory} 
                    onCategoryChange={handleCategoryChange} 
                />
                <div className="flex items-center gap-4">
                    <SearchBar 
                        value={searchQuery} 
                        onChange={handleSearchChange} 
                    />
                    <select
                        value={sortOrder}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className="bg-white border border-brand-100 rounded-xl px-4 py-2.5 text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-all cursor-pointer shadow-sm"
                    >
                        <option value="featured">Featured</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating">Top Rated</option>
                        <option value="title">A-Z</option>
                    </select>
                </div>
            </div>

            <motion.div layout className="min-h-[400px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${activeCategory}-${searchQuery}-${sortOrder}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ProductGrid products={filteredProducts} />

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-20 text-slate-400 bg-white/30 rounded-3xl border border-dashed border-slate-200">
                                <p className="text-lg font-medium">No products found matching your criteria.</p>
                                <button 
                                    onClick={() => updateQueryParams({ category: "all", q: "" })}
                                    className="mt-4 text-gold-600 font-bold hover:text-gold-700 transition-colors"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </section>
    );
}

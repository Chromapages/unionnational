"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CategoryFilter } from "./CategoryFilter";
import { SearchBar } from "./SearchBar";
import { ProductGrid } from "./ProductGrid";
import { motion } from "framer-motion";

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
    badge?: string;
}

interface ShopClientProps {
    products: ShopClientProduct[];
}

export function ShopClient({ products }: ShopClientProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "all");
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
    const [sortOrder, setSortOrder] = useState(searchParams.get("sort") || "featured");

    useEffect(() => {
        const nextParams = new URLSearchParams(searchParams.toString());

        if (activeCategory === "all") {
            nextParams.delete("category");
        } else {
            nextParams.set("category", activeCategory);
        }

        if (searchQuery.trim()) {
            nextParams.set("q", searchQuery.trim());
        } else {
            nextParams.delete("q");
        }

        if (sortOrder === "featured") {
            nextParams.delete("sort");
        } else {
            nextParams.set("sort", sortOrder);
        }

        const queryString = nextParams.toString();
        router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    }, [activeCategory, pathname, router, searchParams, searchQuery, sortOrder]);

    const filteredProducts = useMemo(() => {
        const visibleProducts = products.filter((product) => {
            const matchesCategory = activeCategory === "all" || product.category === activeCategory;
            const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

    return (
        <section id="browse" className="max-w-7xl mx-auto px-6 mb-32 relative z-10">
            <div className="flex flex-col gap-4 mb-12 sticky top-24 bg-white/80 backdrop-blur-xl p-4 rounded-2xl border border-slate-200 shadow-lg z-30 transition-all duration-300">
                <CategoryFilter
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                />
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                    />
                    <div className="flex items-center gap-3 text-sm">
                        <label htmlFor="shop-sort" className="font-semibold text-slate-600">
                            Sort
                        </label>
                        <select
                            id="shop-sort"
                            value={sortOrder}
                            onChange={(event) => setSortOrder(event.target.value)}
                            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-brand-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                        >
                            <option value="featured">Featured</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="rating">Top Rated</option>
                            <option value="title">Alphabetical</option>
                        </select>
                    </div>
                </div>
            </div>

            <motion.div layout>
                <div className="text-center mb-12">
                    <p className="text-sm font-medium text-slate-500">
                        {filteredProducts.length} resource{filteredProducts.length === 1 ? "" : "s"} found
                    </p>
                </div>

                <ProductGrid products={filteredProducts} />

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20 text-slate-400">
                        <p className="text-lg">No products found matching your criteria.</p>
                        <button
                            onClick={() => { setActiveCategory("all"); setSearchQuery(""); }}
                            className="mt-4 text-gold-600 hover:text-gold-500 font-bold underline underline-offset-4"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </motion.div>
        </section>
    );
}

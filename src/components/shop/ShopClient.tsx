"use client";

import { useState, useMemo } from "react";
import { CategoryFilter } from "./CategoryFilter";
import { SearchBar } from "./SearchBar";
import { ProductGrid } from "./ProductGrid";
import { motion } from "framer-motion";

interface ShopClientProps {
    products: any[];
}

export function ShopClient({ products }: ShopClientProps) {
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesCategory = activeCategory === "all" || product.category === activeCategory;
            const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [products, activeCategory, searchQuery]);

    return (
        <section id="browse" className="max-w-7xl mx-auto px-6 mb-32 relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 sticky top-24 bg-white/80 backdrop-blur-xl p-4 rounded-2xl border border-slate-200 shadow-lg z-30 transition-all duration-300">
                <CategoryFilter
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                />
                <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                />
            </div>

            <motion.div layout>
                <div className="text-center mb-12">
                    {/* Removed redundant header text to keep it minimal as per plan */}
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

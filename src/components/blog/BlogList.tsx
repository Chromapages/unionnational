"use client";

import { useState, useMemo } from "react";
import { SanityBlogPost } from "@/types/sanity";
import { BlogCard } from "./BlogCard";
import { Search } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface BlogListProps {
    initialPosts: SanityBlogPost[];
}

const CATEGORIES = ["All Strategy", "Tax Planning", "S-Corp", "Compliance"];

export const BlogList = ({ initialPosts }: BlogListProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All Strategy");

    const filteredPosts = useMemo(() => {
        return initialPosts.filter((post) => {
            const matchesSearch =
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory =
                activeCategory === "All Strategy" ||
                post.categories?.some(cat => cat.title.toLowerCase() === activeCategory.toLowerCase());

            return matchesSearch && matchesCategory;
        });
    }, [initialPosts, searchQuery, activeCategory]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
    };

    return (
        <>
            {/* Filter / Search Bar */}
            <div className="max-w-7xl mx-auto px-6 -translate-y-1/2 relative z-20">
                <div className="bg-white rounded-2xl shadow-xl shadow-brand-900/10 border border-slate-100 p-4 md:p-6 flex flex-col md:flex-row items-center gap-4">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="Search articles..." 
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-gold-500/50 transition-all font-sans"
                        />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                        {CATEGORIES.map((cat) => (
                            <button 
                                key={cat} 
                                onClick={() => handleCategoryClick(cat)}
                                className={`whitespace-nowrap px-6 py-3 rounded-xl text-sm font-bold border transition-all font-heading ${
                                    activeCategory === cat 
                                    ? "bg-gold-500 text-brand-900 border-gold-500 shadow-lg shadow-gold-500/20" 
                                    : "bg-white text-slate-600 border-slate-100 hover:border-gold-500/30 hover:bg-gold-50/50"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Blog Grid */}
            <section className="pb-32 pt-10 px-6">
                <div className="max-w-7xl mx-auto">
                    {filteredPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                            {filteredPosts.map((post, index) => (
                                <BlogCard key={post._id} post={post} index={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-32 text-center rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200">
                            <RevealOnScroll>
                                <h3 className="text-2xl font-bold text-brand-900 mb-4 font-heading">No insights found.</h3>
                                <p className="text-slate-500 max-w-sm mx-auto mb-8">
                                    We could not find any articles matching your search or category filter.
                                </p>
                                <button 
                                    onClick={() => { setSearchQuery(""); setActiveCategory("All Strategy"); }}
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-brand-900 text-white font-bold rounded-xl hover:bg-brand-800 transition-all font-heading"
                                >
                                    Clear Filters
                                </button>
                            </RevealOnScroll>
                        </div>
                    )}
                    
                    {/* Pagination Placeholder */}
                    {filteredPosts.length > 0 && filteredPosts.length < initialPosts.length && (
                        <div className="mt-20 flex justify-center">
                            <p className="text-slate-400 font-sans italic">Showing {filteredPosts.length} of {initialPosts.length} insights</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

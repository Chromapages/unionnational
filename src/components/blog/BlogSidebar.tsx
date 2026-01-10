"use client";

import Link from "next/link";
import { Search, ArrowRight, Tag } from "lucide-react";

interface Category {
    _id: string;
    title: string;
    slug: { current: string };
}

interface BlogSidebarProps {
    categories: Category[];
    newsletterTitle?: string;
    newsletterDescription?: string;
}

export function BlogSidebar({ categories, newsletterTitle, newsletterDescription }: BlogSidebarProps) {
    return (
        <aside className="space-y-8 lg:sticky lg:top-24">
            {/* Search (Visual only for now) */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-900/40" />
                <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-md text-sm text-brand-900 placeholder:text-brand-900/40 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all font-sans"
                />
            </div>

            {/* Categories */}
            <div className="bg-white rounded-md border border-slate-100 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-brand-900 font-heading mb-4 border-b border-slate-100 pb-2">
                    Categories
                </h3>
                <ul className="space-y-2">
                    {categories.map((category) => (
                        <li key={category._id}>
                            <Link
                                href={`/blog/category/${category.slug.current}`}
                                className="flex items-center justify-between py-2 text-sm text-brand-900/60 hover:text-gold-600 hover:pl-1 transition-all group font-sans"
                            >
                                <div className="flex items-center gap-2">
                                    <Tag className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                                    {category.title}
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0" />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Newsletter */}
            <div className="bg-brand-900 rounded-md p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />

                <h3 className="text-lg font-bold font-heading mb-2 relative z-10">
                    {newsletterTitle || "Join the Inner Circle"}
                </h3>
                <p className="text-sm text-white/70 mb-6 font-sans relative z-10 leading-relaxed">
                    {newsletterDescription || "Get strategic tax insights delivered to your inbox weekly."}
                </p>

                <form className="space-y-3 relative z-10" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="email"
                        placeholder="Email address"
                        className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-md text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-gold-500 transition-all font-sans"
                    />
                    <button className="w-full bg-gold-500 hover:bg-gold-400 text-brand-900 font-bold py-2.5 rounded-md text-sm transition-colors font-sans uppercase tracking-wide">
                        Subscribe Free
                    </button>
                </form>
            </div>
        </aside>
    );
}

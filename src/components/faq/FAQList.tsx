"use client";

import { useState, useMemo } from "react";
import { FAQAccordion } from "@/components/home/FAQAccordion";
import { Search, Filter, X } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";

interface FAQItem {
    _id: string;
    question: string;
    answer: any;
    category: string;
}

interface FAQListProps {
    items: FAQItem[];
}

export const FAQList = ({ items }: FAQListProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<string>("All");

    const categories = useMemo(() => {
        const cats = Array.from(new Set(items.map((item) => item.category)));
        return ["All", ...cats];
    }, [items]);

    const filteredItems = useMemo(() => {
        return items.filter((item) => {
            const matchesSearch = 
                item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (typeof item.answer === "string" && item.answer.toLowerCase().includes(searchQuery.toLowerCase()));
            
            const matchesCategory = activeCategory === "All" || item.category === activeCategory;
            
            return matchesSearch && matchesCategory;
        });
    }, [items, searchQuery, activeCategory]);

    return (
        <div className="w-full">
            {/* Search and Filter Bar */}
            <div className="max-w-4xl mx-auto mb-12 space-y-6">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400 group-focus-within:text-gold-500 transition-colors" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for answers (e.g. S-Corp, Deductions, Payroll)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border-2 border-slate-100 focus:border-gold-500/50 focus:ring-4 focus:ring-gold-500/5 outline-none rounded-2xl pl-14 pr-12 py-5 text-brand-900 placeholder:text-slate-400 transition-all shadow-sm"
                    />
                    {searchQuery && (
                        <button 
                            onClick={() => setSearchQuery("")}
                            className="absolute inset-y-0 right-5 flex items-center text-slate-300 hover:text-slate-500 transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    )}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                    <div className="flex items-center gap-2 mr-2 text-[10px] font-black text-brand-900/40 uppercase tracking-[0.2em]">
                        <Filter className="h-3 w-3" /> Filter:
                    </div>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={cn(
                                "px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 uppercase tracking-wider",
                                activeCategory === cat
                                    ? "bg-brand-900 text-white shadow-lg shadow-brand-900/20 scale-105"
                                    : "bg-white border border-slate-200 text-slate-500 hover:border-gold-500/50 hover:text-brand-900"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results Grid */}
            <div className="relative min-h-[400px]">
                {filteredItems.length > 0 ? (
                    <FAQAccordion items={filteredItems} />
                ) : (
                    <RevealOnScroll className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                            <Search className="h-8 w-8 text-slate-200" />
                        </div>
                        <h3 className="text-xl font-bold text-brand-900 mb-2">No answers found</h3>
                        <p className="text-slate-500 max-w-xs mx-auto">
                            We couldn't find anything matching "{searchQuery}". Try a different term or contact us for help.
                        </p>
                    </RevealOnScroll>
                )}
            </div>
        </div>
    );
};

"use client";

import { useState, useMemo, useRef } from "react";
import { FAQAccordion } from "@/components/home/FAQAccordion";
import { Search, Filter, X } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { cn, extractString } from "@/lib/utils";
import { useLocale } from "next-intl";
import { faqAnswerText, normalizeFaqAnswer } from "./faqContent";

interface FAQItem {
    _id: string;
    question: unknown;
    answer: unknown;
    category: unknown;
}

interface FAQListProps {
    items: FAQItem[];
}

export const FAQList = ({ items }: FAQListProps) => {
    const locale = useLocale();
    const copy = locale === "es" ? {
        all: "Todas", search: "Buscar respuestas", placeholder: "Buscar respuestas (p. ej., S-Corp, deducciones, nómina)...",
        clear: "Borrar búsqueda", filter: "Filtrar:", empty: "No se encontraron respuestas",
        noMatch: "No encontramos resultados para", help: "Prueba otro término o contáctanos para obtener ayuda.",
    } : {
        all: "All", search: "Search answers", placeholder: "Search for answers (e.g. S-Corp, Deductions, Payroll)...",
        clear: "Clear search", filter: "Filter:", empty: "No answers found",
        noMatch: "We couldn't find anything matching", help: "Try a different term or contact us for help.",
    };
    const [searchQuery, setSearchQuery] = useState("");
    const searchRef = useRef<HTMLInputElement>(null);
    const [activeCategory, setActiveCategory] = useState<string>("All");

    const normalizedItems = useMemo(() => items.map(item => ({
        ...item,
        question: extractString(item.question, locale),
        answer: normalizeFaqAnswer(item.answer, locale),
        category: extractString(item.category, locale, "General"),
    })).filter(item => item.question.trim()), [items, locale]);

    const categories = useMemo(() => {
        const cats = Array.from(new Set(normalizedItems.map((item) => item.category)));
        return ["All", ...cats];
    }, [normalizedItems]);

    const filteredItems = useMemo(() => {
        const query = searchQuery.trim().toLocaleLowerCase(locale);
        return normalizedItems.filter((item) => {
            const answerText = faqAnswerText(item.answer);
            const matchesSearch = item.question.toLocaleLowerCase(locale).includes(query) || answerText.toLocaleLowerCase(locale).includes(query);
            
            const matchesCategory = activeCategory === "All" || item.category === activeCategory;
            
            return matchesSearch && matchesCategory;
        });
    }, [normalizedItems, searchQuery, activeCategory, locale]);

    return (
        <div className="w-full">
            {/* Search and Filter Bar */}
            <div className="max-w-4xl mx-auto mb-12 space-y-6">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400 group-focus-within:text-gold-500 transition-colors" />
                    </div>
                    <input
                        ref={searchRef}
                        type="search"
                        aria-label={copy.search}
                        placeholder={copy.placeholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border-2 border-slate-100 focus:border-gold-500/50 focus:ring-4 focus:ring-gold-500/5 outline-none rounded-2xl pl-14 pr-12 py-5 text-brand-900 placeholder:text-slate-400 transition-all shadow-sm"
                    />
                    {searchQuery && (
                        <button 
                            type="button"
                            aria-label={copy.clear}
                            onClick={() => { setSearchQuery(""); searchRef.current?.focus(); }}
                            className="absolute inset-y-0 right-3 flex min-h-11 min-w-11 items-center justify-center text-slate-700 hover:text-brand-900 transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    )}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                    <div className="flex items-center gap-2 mr-2 text-[10px] font-black text-brand-900/40 uppercase tracking-[0.2em]">
                        <Filter className="h-3 w-3" aria-hidden="true" /> {copy.filter}
                    </div>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            aria-pressed={activeCategory === cat}
                            onClick={() => setActiveCategory(cat)}
                            className={cn(
                                "min-h-11 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 uppercase tracking-wider",
                                activeCategory === cat
                                    ? "bg-brand-900 text-white shadow-lg shadow-brand-900/20 scale-105"
                                    : "bg-white border border-slate-200 text-slate-700 hover:border-gold-500/50 hover:text-brand-900"
                            )}
                        >
                            {cat === "All" ? copy.all : cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results Grid */}
            <div className="relative min-h-[400px]">
                {filteredItems.length > 0 ? (
                    <FAQAccordion items={filteredItems} showCategoryFilters={false} locale={locale} />
                ) : (
                    <RevealOnScroll className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                            <Search className="h-8 w-8 text-slate-200" />
                        </div>
                        <h3 className="text-xl font-bold text-brand-900 mb-2">{copy.empty}</h3>
                        <p className="text-slate-700 max-w-xs mx-auto" role="status">
                            {copy.noMatch} &quot;{searchQuery}&quot;. {copy.help}
                        </p>
                    </RevealOnScroll>
                )}
            </div>
        </div>
    );
};

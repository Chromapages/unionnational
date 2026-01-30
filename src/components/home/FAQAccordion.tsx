"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PortableText } from "@portabletext/react";

interface FAQItem {
    _id: string;
    question: string;
    answer: any; // Can be string or Portable Text blocks
    category: string;
}

interface FAQAccordionProps {
    items: FAQItem[];
    variant?: "light" | "dark";
}

export function FAQAccordion({ items, variant = "light" }: FAQAccordionProps) {
    // Unique categories
    const categories = Array.from(new Set(items.map(item => item.category)));
    const [activeCategory, setActiveCategory] = useState<string>(categories[0] || "General");
    const [openItemId, setOpenItemId] = useState<string | null>(null);

    const filteredItems = items.filter(item => item.category === activeCategory);

    const toggleItem = (id: string) => {
        setOpenItemId(openItemId === id ? null : id);
    };

    const isDark = variant === "dark";

    const components = {
        block: {
            normal: ({ children }: any) => <p className="mb-4 last:mb-0">{children}</p>,
        },
        list: {
            bullet: ({ children }: any) => <ul className="list-disc pl-5 mb-4 space-y-1">{children}</ul>,
            number: ({ children }: any) => <ol className="list-decimal pl-5 mb-4 space-y-1">{children}</ol>,
        },
        listItem: {
            bullet: ({ children }: any) => <li>{children}</li>,
            number: ({ children }: any) => <li>{children}</li>,
        },
        marks: {
            strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
            em: ({ children }: any) => <em className="italic">{children}</em>,
            link: ({ children, value }: any) => {
                const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
                return (
                    <a
                        href={value.href}
                        rel={rel}
                        className="text-gold-500 underline hover:text-gold-400 transition-colors"
                    >
                        {children}
                    </a>
                );
            },
        },
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Category Tabs */}
            {categories.length > 1 && (
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setActiveCategory(cat);
                                setOpenItemId(null);
                            }}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                                ? "bg-gold-500 text-brand-900 shadow-md"
                                : isDark
                                    ? "bg-white/5 border border-white/10 text-slate-300 hover:border-gold-500/50 hover:text-white"
                                    : "bg-white border border-slate-200 text-slate-600 hover:border-gold-500/50 hover:text-brand-900"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            )}

            {/* Accordion Items */}
            <div className="space-y-4">
                {filteredItems.map((item) => (
                    <div
                        key={item._id}
                        className={`rounded-lg border transition-all duration-300 overflow-hidden ${isDark
                            ? `bg-white/5 ${openItemId === item._id ? "border-gold-500/50" : "border-white/10 hover:border-gold-500/30"}`
                            : `bg-white ${openItemId === item._id ? "border-gold-500 shadow-md" : "border-slate-100 hover:border-gold-500/30"}`
                            }`}
                    >
                        <button
                            onClick={() => toggleItem(item._id)}
                            className="w-full flex items-center justify-between p-6 text-left group"
                        >
                            <span className={`text-lg font-medium pr-8 font-heading transition-colors ${isDark
                                ? (openItemId === item._id ? "text-gold-400" : "text-white")
                                : (openItemId === item._id ? "text-brand-900" : "text-brand-800")
                                }`}>
                                {item.question}
                            </span>
                            <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isDark
                                ? (openItemId === item._id ? "bg-gold-500 text-brand-900 rotate-180" : "bg-white/10 text-white group-hover:bg-gold-500/20 group-hover:text-gold-400")
                                : (openItemId === item._id ? "bg-gold-500 text-brand-900 rotate-180" : "bg-slate-100 text-brand-900 group-hover:bg-gold-100")
                                }`}>
                                <ChevronDown className="w-5 h-5" />
                            </span>
                        </button>

                        <AnimatePresence>
                            {openItemId === item._id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <div className={`px-6 pb-6 leading-relaxed font-sans border-t pt-4 ${isDark
                                        ? "text-slate-300 border-white/5"
                                        : "text-slate-600 border-slate-100/50"
                                        }`}>
                                        {typeof item.answer === "string" ? (
                                            <p>{item.answer}</p>
                                        ) : (
                                            <PortableText value={item.answer} components={components} />
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}

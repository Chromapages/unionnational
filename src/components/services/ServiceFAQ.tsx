"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
    question: string;
    answer: string;
}

interface ServiceFAQProps {
    items: FAQItem[];
}

export function ServiceFAQ({ items }: ServiceFAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    if (!items || items.length === 0) return null;

    return (
        <div className="space-y-4">
            {items.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                    <div
                        key={index}
                        className={cn(
                            "border rounded-xl transition-all duration-300 overflow-hidden",
                            isOpen
                                ? "border-brand-200 bg-brand-50/30"
                                : "border-zinc-200 bg-white hover:border-zinc-300"
                        )}
                    >
                        <button
                            onClick={() => setOpenIndex(isOpen ? null : index)}
                            className="w-full flex items-center justify-between p-6 text-left"
                        >
                            <span className={cn(
                                "font-medium text-lg pr-8",
                                isOpen ? "text-brand-900" : "text-zinc-700"
                            )}>
                                {item.question}
                            </span>
                            <span className={cn(
                                "shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                                isOpen ? "bg-brand-900 text-white" : "bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200"
                            )}>
                                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                            </span>
                        </button>

                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <div className="px-6 pb-6 pt-0 text-zinc-600 leading-relaxed">
                                        {item.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}

"use client";

import { useId, useState } from "react";
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
    const id = useId();
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
                        <h3><button
                            type="button"
                            id={`${id}-question-${index}`}
                            onClick={() => setOpenIndex(isOpen ? null : index)}
                            aria-expanded={isOpen}
                            aria-controls={`${id}-panel-${index}`}
                            className="w-full min-h-11 flex items-center justify-between p-6 text-left focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-brand-900"
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
                                {isOpen ? <Minus className="w-4 h-4" aria-hidden="true" /> : <Plus className="w-4 h-4" aria-hidden="true" />}
                            </span>
                        </button></h3>

                                <div
                                    id={`${id}-panel-${index}`}
                                    role="region"
                                    aria-labelledby={`${id}-question-${index}`}
                                    hidden={!isOpen}
                                >
                                    <div className="px-6 pb-6 pt-0 text-zinc-600 leading-relaxed">
                                        {item.answer}
                                    </div>
                                </div>
                    </div>
                );
            })}
        </div>
    );
}

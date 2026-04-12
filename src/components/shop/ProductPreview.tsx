"use client";

import { motion } from "framer-motion";
import { BookOpen, ChevronRight, ChevronLeft } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ProductPreviewProps {
    images?: string[];
    title: string;
}

export function ProductPreview({ images = [], title }: ProductPreviewProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;
        const { clientWidth } = scrollRef.current;
        const scrollAmount = direction === "left" ? -clientWidth / 1.5 : clientWidth / 1.5;
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    // If no images, we'll show a placeholder "Look Inside" state
    const hasImages = images.length > 0;
    const items = hasImages ? images : [1, 2, 3, 4]; // Placeholder boxes

    return (
        <section className="py-20 border-t border-slate-100 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex items-end justify-between mb-12">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-gold-200 bg-gold-50/50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold-700 mb-4">
                            <BookOpen className="h-3.5 w-3.5" />
                            Tangible Value
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-900 font-heading mb-4">
                            Look Inside the Playbook
                        </h2>
                        <p className="text-lg text-slate-600 font-sans">
                            Get a glimpse of the high-fidelity strategy, execution checklists, and professional data visualization included in this asset.
                        </p>
                    </div>

                    <div className="hidden md:flex gap-2">
                        <button
                            onClick={() => scroll("left")}
                            disabled={!canScrollLeft}
                            className={cn(
                                "p-3 rounded-full border border-slate-200 transition-all",
                                canScrollLeft ? "bg-white text-brand-900 hover:bg-slate-50 shadow-sm" : "bg-slate-50 text-slate-300 cursor-not-allowed"
                            )}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            disabled={!canScrollRight}
                            className={cn(
                                "p-3 rounded-full border border-slate-200 transition-all",
                                canScrollRight ? "bg-white text-brand-900 hover:bg-slate-50 shadow-sm" : "bg-slate-50 text-slate-300 cursor-not-allowed"
                            )}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div 
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing"
                >
                    {items.map((img, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative min-w-[280px] md:min-w-[400px] aspect-[3/4] rounded-2xl border border-slate-200 bg-slate-50 shadow-sm overflow-hidden snap-center group"
                        >
                            {hasImages ? (
                                <img
                                    src={img as string}
                                    alt={`${title} Preview ${idx + 1}`}
                                    className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500"
                                />
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                                    <div className="w-full h-full border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center bg-white/50">
                                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Sample Page {idx + 1}</span>
                                    </div>
                                </div>
                            )}
                            
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
                
                <p className="mt-8 text-center text-sm font-medium text-slate-400 italic">
                    * Sample pages represent the actual layout and content quality of the digital asset.
                </p>
            </div>
        </section>
    );
}

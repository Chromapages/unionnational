"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProductEdition {
    id: string; // SKU or specific ID
    name: string;
    description: string;
    price: number;
    format: string;
}

interface ProductOfferSelectorProps {
    editions: ProductEdition[];
    selectedId: string;
    onSelect: (id: string) => void;
}

export function ProductOfferSelector({ editions, selectedId, onSelect }: ProductOfferSelectorProps) {
    return (
        <div className="flex flex-col gap-4 w-full">
            {editions.map((edition) => {
                const isSelected = selectedId === edition.id;
                
                return (
                    <button
                        key={edition.id}
                        onClick={() => onSelect(edition.id)}
                        className={cn(
                            "group relative flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-300 text-left",
                            isSelected 
                                ? "border-gold-500 bg-gold-50 shadow-lg shadow-gold-500/5" 
                                : "border-slate-100 bg-white hover:border-slate-200"
                        )}
                    >
                        <div className="flex items-start gap-4">
                            <div className={cn(
                                "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                                isSelected 
                                    ? "border-gold-500 bg-gold-500 text-white" 
                                    : "border-slate-200 bg-white"
                            )}>
                                {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                            </div>
                            
                            <div>
                                <h4 className={cn(
                                    "text-sm font-bold uppercase tracking-tight transition-colors",
                                    isSelected ? "text-brand-900" : "text-brand-900/60"
                                )}>
                                    {edition.name}
                                </h4>
                                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                                    {edition.description}
                                </p>
                            </div>
                        </div>

                        <div className="text-right">
                            <span className={cn(
                                "text-lg font-bold font-heading",
                                isSelected ? "text-brand-900" : "text-brand-400"
                            )}>
                                ${edition.price}
                            </span>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}

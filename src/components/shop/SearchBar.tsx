"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <div className="relative w-full md:w-64 group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-brand-400 group-focus-within:text-gold-500 transition-colors" />
            </div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search resources..."
                className="w-full pl-10 pr-10 py-2.5 bg-white/50 border border-brand-100 rounded-xl text-sm text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-all shadow-sm group-hover:bg-white group-hover:shadow-md"
            />
            {value && (
                <button
                    onClick={() => onChange("")}
                    className="absolute inset-y-0 right-3 flex items-center text-brand-400 hover:text-brand-900 transition-colors"
                >
                    <X className="h-3 w-3" />
                </button>
            )}
        </div>
    );
}

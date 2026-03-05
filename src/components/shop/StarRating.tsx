"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
    rating: number;
    className?: string;
}

export function StarRating({ rating, className }: StarRatingProps) {
    const rounded = Math.max(0, Math.min(5, Math.round(rating)));
    return (
        <div className={cn("flex gap-0.5", className)}>
            {[1, 2, 3, 4, 5].map((i) => (
                <Star
                    key={i}
                    className={cn(
                        "w-4 h-4",
                        i <= rounded ? "fill-gold-400 text-gold-400" : "fill-zinc-200 text-zinc-200"
                    )}
                />
            ))}
        </div>
    );
}

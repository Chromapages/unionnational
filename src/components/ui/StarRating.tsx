"use client";

import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
    rating: number; // 0 to 5
    size?: number;
    className?: string;
}

export function StarRating({ rating, size = 16, className }: StarRatingProps) {
    // Clamp rating between 0 and 5
    const clampedRating = Math.max(0, Math.min(5, rating));
    const fullStars = Math.floor(clampedRating);
    const hasHalfStar = clampedRating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className={cn("flex items-center gap-0.5", className)}>
            {[...Array(fullStars)].map((_, i) => (
                <Star key={`full-${i}`} size={size} className="fill-gold-500 text-gold-500" />
            ))}
            {hasHalfStar && (
                <div className="relative">
                    <StarHalf size={size} className="fill-gold-500 text-gold-500 absolute top-0 left-0" />
                    <Star size={size} className="text-gold-500 opacity-20" />
                </div>
            )}
            {[...Array(emptyStars)].map((_, i) => (
                <Star key={`empty-${i}`} size={size} className="text-gold-500 opacity-20" />
            ))}
        </div>
    );
}

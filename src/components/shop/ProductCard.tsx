"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, FileText, PlayCircle, BookOpen } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { StarRating } from "@/components/ui/StarRating";
import { cn } from "@/lib/utils";

export interface ProductCardProps {
    title: string;
    coverImage: any;
    price: number;
    compareAtPrice?: number;
    shortDescription: string;
    slug: string;
    format: string; // 'ebook', 'template', 'course'
    category?: string;
    badge?: string; // 'bestseller', 'new', 'limited'
    rating?: number;
}

// Map format to icon
const formatIcons = {
    ebook: BookOpen,
    template: FileText,
    course: PlayCircle,
    bundle: BookOpen,
};

// Map badge styles
const badgeStyles = {
    bestseller: "bg-gold-500/10 text-gold-600 border-gold-500/20",
    new: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    limited: "bg-red-500/10 text-red-600 border-red-500/20",
};

// Helper for currency
const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    }).format(price);
};

export function ProductCard({
    title,
    coverImage,
    price,
    compareAtPrice,
    shortDescription,
    slug,
    format = 'ebook',
    badge,
    rating = 5
}: ProductCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXPos = e.clientX - rect.left;
        const mouseYPos = e.clientY - rect.top;
        const xPct = mouseXPos / width - 0.5;
        const yPct = mouseYPos / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    // @ts-expect-error - Format key
    const FormatIcon = formatIcons[format.toLowerCase()] || FileText;
    // @ts-expect-error - Badge key
    const badgeClass = badge ? badgeStyles[badge.toLowerCase()] : "";

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="group relative h-full bg-white rounded-[2rem] border border-slate-100 transition-all duration-300 hover:shadow-2xl hover:shadow-gold-500/10 hover:border-gold-200/50"
        >
            {/* Quick View Overlay Button */}
            <div className={cn(
                "absolute inset-x-0 bottom-32 z-30 flex justify-center opacity-0 transition-all duration-300 transform translate-y-4 pointer-events-none",
                isHovered && "opacity-100 translate-y-0 pointer-events-auto"
            )}>
                <Link href={`/shop/${slug}`} className="bg-white/90 backdrop-blur text-brand-900 px-6 py-3 rounded-full shadow-lg border border-slate-100 font-bold text-sm flex items-center gap-2 hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-colors">
                    <Eye className="w-4 h-4" />
                    Quick View
                </Link>
            </div>

            <Link href={`/shop/${slug}`} className="flex flex-col h-full">
                {/* Image Section */}
                <div
                    style={{ transform: "translateZ(20px)" }}
                    className="relative aspect-[4/5] bg-slate-50 overflow-hidden rounded-t-[2rem] m-2 mb-0"
                >
                    {/* Badge */}
                    {badge && (
                        <div className={cn(
                            "absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border",
                            badgeClass
                        )}>
                            {badge}
                        </div>
                    )}

                    <img
                        src={typeof coverImage === 'string' ? coverImage : ''}
                        alt={title}
                        className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                    />
                </div>

                {/* Content Section */}
                <div
                    style={{ transform: "translateZ(10px)" }}
                    className="p-6 flex flex-col flex-1"
                >
                    {/* Format & Rating Row */}
                    <div className="flex items-center justify-between mb-3 text-xs text-brand-300">
                        <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                            <FormatIcon className="w-3.5 h-3.5" />
                            {format}
                        </div>
                        <StarRating rating={rating} size={12} />
                    </div>

                    <h3 className="text-xl font-bold text-brand-900 mb-2 font-heading leading-tight group-hover:text-gold-600 transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-slate-500 mb-6 font-sans line-clamp-2 leading-relaxed">
                        {shortDescription}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                        <div className="flex flex-col">
                            {compareAtPrice && compareAtPrice > price && (
                                <span className="text-xs text-slate-400 line-through font-sans mb-0.5">
                                    {formatPrice(compareAtPrice)}
                                </span>
                            )}
                            <span className="text-2xl font-bold text-brand-900 font-sans">
                                {formatPrice(price)}
                            </span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-900 transition-all duration-300 group-hover:bg-brand-900 group-hover:text-white">
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

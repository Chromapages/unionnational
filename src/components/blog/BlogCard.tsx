"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";
import type { SanityBlogPost } from "@/types/sanity";
import { format } from "date-fns";

interface BlogCardProps {
    post: SanityBlogPost;
    index?: number;
    locale?: string;
}

export const BlogCard = ({ post, index = 0 }: BlogCardProps) => {
    const publishDate = post.publishedAt ? new Date(post.publishedAt) : new Date();
    const imageUrl = post.featuredImage?.asset?.url || post.featuredImage?.asset?._ref;

    return (
        <RevealOnScroll delay={index * 100}>
            <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-gold-500/50 hover:shadow-2xl hover:shadow-gold-500/10 transition-all duration-300 h-full"
            >
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full bg-brand-500 flex items-center justify-center p-8">
                            <span className="text-gold-500 font-heading font-black text-4xl opacity-20">UNT</span>
                        </div>
                    )}

                    {/* Category Badges */}
                    {post.categories && post.categories.length > 0 && (
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                            {post.categories.slice(0, 2).map((cat) => (
                                <span key={cat.slug || cat.title} className="px-3 py-1 bg-white/90 backdrop-blur-sm text-brand-900 text-[10px] font-bold uppercase tracking-widest rounded-full border border-slate-100 shadow-sm">
                                    {cat.title}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-slate-400 text-xs mb-6 font-medium">
                        <span className="flex items-center gap-1.5">
                            <Calendar size={14} className="text-gold-600" />
                            {format(publishDate, "MMM dd, yyyy")}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <User size={14} className="text-gold-600" />
                            {post.author?.name || "Union National Team"}
                        </span>
                    </div>

                    <h3 className="text-2xl font-bold mb-4 font-heading text-brand-900 group-hover:text-gold-600 transition-colors leading-tight">
                        {post.title}
                    </h3>

                    <p className="text-slate-600 mb-8 line-clamp-3 leading-relaxed flex-1 font-sans text-base">
                        {post.excerpt}
                    </p>

                    <div className="inline-flex items-center gap-2 text-gold-600 font-bold group-hover:gap-4 transition-all uppercase tracking-widest text-xs">
                        Read Full Article <ArrowRight size={18} />
                    </div>
                </div>
            </Link>
        </RevealOnScroll>
    );
};

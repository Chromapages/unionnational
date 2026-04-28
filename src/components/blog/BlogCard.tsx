"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";
import type { GhlBlogPost } from "@/lib/ghl/blogs";
import { format } from "date-fns";

interface BlogCardProps {
    post: GhlBlogPost;
    index?: number;
    locale?: string;
}

export const BlogCard = ({ post, index = 0 }: BlogCardProps) => {
    // Ensure we have a valid date for formatting
    const publishDate = post.publishedDate ? new Date(post.publishedDate) : new Date();

    return (
        <RevealOnScroll delay={index * 100}>
            <Link 
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-gold-500/50 hover:shadow-2xl hover:shadow-gold-500/10 transition-all duration-300 h-full"
            >
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden">
                    {post.featuredImage ? (
                        <img 
                            src={post.featuredImage} 
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
                                <span key={cat} className="px-3 py-1 bg-white/90 backdrop-blur-sm text-brand-900 text-[10px] font-bold uppercase tracking-widest rounded-full border border-slate-100 shadow-sm">
                                    {cat}
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
                            {post.authorName || "Union National Team"}
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

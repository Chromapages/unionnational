import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Calendar, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogCardProps {
    post: any;
    className?: string;
}

export function BlogCard({ post, className }: BlogCardProps) {
    return (
        <article className={cn("group flex flex-col bg-white rounded-md border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden", className)}>
            {/* Image */}
            <Link href={`/blog/${post.slug.current}`} className="relative h-48 sm:h-56 w-full overflow-hidden block">
                {post.featuredImage ? (
                    <Image
                        src={urlFor(post.featuredImage).url()}
                        alt={post.featuredImage.alt || post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                        No Image
                    </div>
                )}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
            </Link>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-brand-900/60 font-medium mb-3 font-sans">
                    {post.categories && post.categories.length > 0 && (
                        <span className="text-gold-600 uppercase tracking-wider font-bold">
                            {post.categories[0].title}
                        </span>
                    )}
                    <div className="flex items-center gap-1.5 ml-auto">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                        })}
                    </div>
                </div>

                {/* Title */}
                <Link href={`/blog/${post.slug.current}`} className="block mb-3">
                    <h3 className="text-xl font-bold text-brand-900 font-heading leading-tight group-hover:text-brand-700 transition-colors">
                        {post.title}
                    </h3>
                </Link>

                {/* Excerpt */}
                {post.excerpt && (
                    <p className="text-sm text-brand-900/60 leading-relaxed font-sans mb-4 line-clamp-3 flex-1">
                        {post.excerpt}
                    </p>
                )}

                {/* Footer */}
                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                    {post.author && (
                        <div className="flex items-center gap-2">
                            {post.author.image ? (
                                <div className="relative w-6 h-6 rounded-full overflow-hidden">
                                    <Image
                                        src={urlFor(post.author.image).url()}
                                        alt={post.author.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                                    <User className="w-3 h-3 text-brand-900/40" />
                                </div>
                            )}
                            <span className="text-xs font-medium text-brand-900 font-sans">{post.author.name}</span>
                        </div>
                    )}

                    {post.readingTime && (
                        <div className="flex items-center gap-1.5 text-[10px] text-brand-900/40 font-bold uppercase tracking-wider font-sans">
                            <Clock className="w-3 h-3" />
                            {post.readingTime} Min Read
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}

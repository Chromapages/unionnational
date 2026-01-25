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
    const publishedDate = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
        : null;
    const primaryCategory = post.categories?.[0];

    return (
        <article
            className={cn(
                "group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-100/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-gold",
                className
            )}
        >
            <Link href={`/blog/${post.slug.current}`} className="relative aspect-[16/9] w-full overflow-hidden">
                {post.featuredImage ? (
                    <Image
                        src={urlFor(post.featuredImage).url()}
                        alt={post.featuredImage.alt || post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-100 text-sm text-slate-400">
                        No Image
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60" />
            </Link>

            <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-brand-900/60 font-sans">
                    {primaryCategory && (
                        <span className="inline-flex items-center rounded-full border border-gold-200/60 bg-gold-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-700">
                            {primaryCategory.title}
                        </span>
                    )}
                    {publishedDate && (
                        <span className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            {publishedDate}
                        </span>
                    )}
                </div>

                <Link href={`/blog/${post.slug.current}`} className="mt-4 block">
                    <h3 className="text-xl font-semibold text-brand-900 font-heading leading-tight transition-colors duration-300 group-hover:text-brand-700">
                        {post.title}
                    </h3>
                </Link>

                {post.excerpt && (
                    <p className="mt-3 text-sm text-brand-900/60 leading-relaxed font-sans line-clamp-3">
                        {post.excerpt}
                    </p>
                )}

                <div className="mt-auto flex items-center justify-between gap-3 pt-6 text-xs text-brand-900/70">
                    {post.author && (
                        <div className="flex items-center gap-2">
                            {post.author.image ? (
                                <div className="relative h-7 w-7 overflow-hidden rounded-full border border-white">
                                    <Image
                                        src={urlFor(post.author.image).url()}
                                        alt={post.author.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">
                                    <User className="h-3.5 w-3.5 text-brand-900/40" />
                                </div>
                            )}
                            <span className="font-medium text-brand-900 font-sans">{post.author.name}</span>
                        </div>
                    )}

                    {post.readingTime && (
                        <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-900/40">
                            <Clock className="h-3 w-3" />
                            {post.readingTime} Min Read
                        </span>
                    )}
                </div>
            </div>
        </article>
    );
}

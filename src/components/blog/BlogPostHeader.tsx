import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Calendar, Clock, User, Tag } from "lucide-react";

interface BlogPostHeaderProps {
    post: any;
}

export function BlogPostHeader({ post }: BlogPostHeaderProps) {
    return (
        <header className="mb-12">
            {/* Meta Top */}
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-brand-900/60 mb-6 font-sans">
                {post.categories && post.categories.length > 0 && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-50 text-gold-700 text-xs font-bold uppercase tracking-wider border border-gold-100">
                        <Tag className="w-3 h-3" />
                        {post.categories[0].title}
                    </span>
                )}
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.publishedAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </div>
                {post.readingTime && (
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {post.readingTime} min read
                    </div>
                )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-brand-900 font-heading mb-8 leading-tight">
                {post.title}
            </h1>

            {/* Author */}
            {post.author && (
                <div className="flex items-center gap-4 mb-10 pb-10 border-b border-slate-100">
                    {post.author.image ? (
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-100">
                            <Image
                                src={urlFor(post.author.image).url()}
                                alt={post.author.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center ring-1 ring-slate-200">
                            <User className="w-6 h-6 text-brand-900/40" />
                        </div>
                    )}
                    <div>
                        <div className="text-base font-bold text-brand-900 font-heading">{post.author.name}</div>
                        <div className="text-xs text-brand-900/60 font-medium uppercase tracking-wide font-sans">{post.author.role}</div>
                    </div>
                </div>
            )}

            {/* Featured Image */}
            {post.featuredImage && (
                <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden shadow-lg border border-slate-100">
                    <Image
                        src={urlFor(post.featuredImage).url()}
                        alt={post.featuredImage.alt || post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            )}
        </header>
    );
}

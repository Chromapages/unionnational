import Image from "next/image";
import { Calendar, Clock, User } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

interface BlogHeaderProps {
    post: any;
}

export function BlogHeader({ post }: BlogHeaderProps) {
    const publishedDate = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : null;
    const primaryCategory = post.categories?.[0];

    return (
        <header className="relative min-h-[70vh] overflow-hidden text-white">
            {post.featuredImage ? (
                <Image
                    src={urlFor(post.featuredImage).url()}
                    alt={post.featuredImage.alt || post.title}
                    fill
                    className="object-cover"
                    priority
                />
            ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,53,63,0.7),_rgba(10,16,20,0.95))]" />
            )}

            <div className="absolute inset-0 bg-gradient-to-b from-brand-900/30 via-brand-900/70 to-brand-900/95" />
            <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(15,23,32,0.65),rgba(15,23,32,0.2))]" />

            <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-end px-6 pb-16 pt-36">
                <div className="max-w-3xl">
                    <div className="flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold-200 font-sans">
                        {primaryCategory && (
                            <span className="rounded-full border border-gold-300/40 bg-gold-500/10 px-3 py-1 text-gold-100">
                                {primaryCategory.title}
                            </span>
                        )}
                        {publishedDate && (
                            <span className="flex items-center gap-2 text-white/70">
                                <Calendar className="h-4 w-4" />
                                {publishedDate}
                            </span>
                        )}
                        {post.readingTime && (
                            <span className="flex items-center gap-2 text-white/70">
                                <Clock className="h-4 w-4" />
                                {post.readingTime} min read
                            </span>
                        )}
                    </div>

                    <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl font-heading">
                        {post.title}
                    </h1>
                    {post.excerpt && (
                        <p className="mt-6 text-lg text-white/80 font-sans leading-relaxed">
                            {post.excerpt}
                        </p>
                    )}

                    {post.author && (
                        <div className="mt-8 flex items-center gap-4">
                            {post.author.image ? (
                                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/20">
                                    <Image
                                        src={urlFor(post.author.image).url()}
                                        alt={post.author.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                                    <User className="h-5 w-5 text-white/70" />
                                </div>
                            )}
                            <div>
                                <div className="text-base font-semibold text-white font-heading">
                                    {post.author.name}
                                </div>
                                {post.author.role && (
                                    <div className="text-xs uppercase tracking-[0.2em] text-white/60 font-sans">
                                        {post.author.role}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

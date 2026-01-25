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
        <header className="relative overflow-hidden bg-forest-gradient text-white">
            <div className="absolute inset-0">
                <div className="absolute -top-32 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[140px]" />
                <div className="absolute bottom-0 right-0 h-[220px] w-[220px] translate-x-1/3 translate-y-1/3 rounded-full bg-gold-500/20 blur-[120px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-16">
                <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
                    <div className="lg:col-span-7">
                        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-200 font-sans">
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
                            <p className="mt-6 max-w-xl text-lg text-white/70 font-sans leading-relaxed">
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

                    <div className="lg:col-span-5">
                        {post.featuredImage && (
                            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/20 shadow-xl">
                                <Image
                                    src={urlFor(post.featuredImage).url()}
                                    alt={post.featuredImage.alt || post.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

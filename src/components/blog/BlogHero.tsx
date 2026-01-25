import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

interface BlogHeroProps {
    title: string;
    subtitle: string;
    featuredPosts?: any[];
}

interface BlogHeroCardProps {
    post: any;
    size?: "large" | "small";
    className?: string;
}

function BlogHeroCard({ post, size = "small", className }: BlogHeroCardProps) {
    const publishedDate = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        })
        : null;
    const primaryCategory = post.categories?.[0];

    return (
        <Link
            href={`/blog/${post.slug.current}`}
            className={cn(
                "group relative flex h-full flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-brand-950/40 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-gold",
                className
            )}
        >
            {post.featuredImage ? (
                <Image
                    src={urlFor(post.featuredImage).url()}
                    alt={post.featuredImage.alt || post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
            ) : (
                <div className="absolute inset-0 bg-brand-900/60" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/40 to-transparent" />

            <div className="relative z-10 flex h-full flex-col justify-end p-6">
                <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-gold-200">
                    {primaryCategory && <span className="font-semibold">{primaryCategory.title}</span>}
                    {publishedDate && (
                        <span className="flex items-center gap-1 text-white/70">
                            <Calendar className="h-3.5 w-3.5" />
                            {publishedDate}
                        </span>
                    )}
                </div>
                <h3
                    className={cn(
                        "mt-3 font-heading font-semibold leading-tight text-white transition-colors duration-300 group-hover:text-gold-200",
                        size === "large" ? "text-2xl md:text-3xl" : "text-xl"
                    )}
                >
                    {post.title}
                </h3>
                {size === "large" && post.excerpt && (
                    <p className="mt-3 text-sm leading-relaxed text-white/70 line-clamp-3 font-sans">
                        {post.excerpt}
                    </p>
                )}
                <div className="mt-5 flex items-center justify-between text-[11px] text-white/70">
                    {post.readingTime && (
                        <span className="flex items-center gap-1.5 font-bold uppercase tracking-[0.2em]">
                            <Clock className="h-3 w-3" />
                            {post.readingTime} Min Read
                        </span>
                    )}
                    <span className="flex items-center gap-1 text-gold-200">
                        Read
                        <ArrowUpRight className="h-4 w-4" />
                    </span>
                </div>
            </div>
        </Link>
    );
}

export function BlogHero({ title, subtitle, featuredPosts = [] }: BlogHeroProps) {
    const heroPosts = featuredPosts.slice(0, 3);

    return (
        <section className="relative overflow-hidden bg-forest-gradient pt-32 pb-20 text-white">
            <div className="absolute inset-0">
                <div className="absolute -top-32 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[140px]" />
                <div className="absolute bottom-0 right-0 h-[260px] w-[260px] translate-x-1/3 translate-y-1/3 rounded-full bg-gold-500/15 blur-[120px]" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
                    <RevealOnScroll>
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-gold-100 font-sans">
                                <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                                Forest Bento Hub
                            </div>
                            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl font-heading">
                                {title}
                            </h1>
                            <p className="max-w-xl text-lg text-white/70 font-sans leading-relaxed">
                                {subtitle}
                            </p>
                        </div>
                    </RevealOnScroll>

                    {heroPosts.length > 0 && (
                        <RevealOnScroll>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 lg:grid-rows-2">
                                {heroPosts.map((post, index) => (
                                    <BlogHeroCard
                                        key={post._id}
                                        post={post}
                                        size={index === 0 ? "large" : "small"}
                                        className={
                                            index === 0
                                                ? "min-h-[280px] md:col-span-2 lg:col-span-1 lg:row-span-2 lg:min-h-[420px]"
                                                : "min-h-[220px]"
                                        }
                                    />
                                ))}
                            </div>
                        </RevealOnScroll>
                    )}
                </div>
            </div>
        </section>
    );
}

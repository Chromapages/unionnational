import { BlogCard } from "./BlogCard";

interface BlogGridProps {
    title: string;
    subtitle?: string;
    summary?: string;
    posts: any[];
}

export function BlogGrid({ title, subtitle, summary, posts }: BlogGridProps) {
    return (
        <section>
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-semibold text-brand-900 font-heading md:text-3xl">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="mt-2 text-sm text-brand-900/60 font-sans max-w-2xl">
                            {subtitle}
                        </p>
                    )}
                </div>
                {summary && (
                    <span className="text-xs uppercase tracking-[0.25em] text-brand-900/40 font-sans">
                        {summary}
                    </span>
                )}
            </div>

            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <BlogCard key={post._id} post={post} />
                ))}
            </div>
        </section>
    );
}

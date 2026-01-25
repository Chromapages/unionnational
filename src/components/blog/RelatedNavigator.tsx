import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BlogCard } from "./BlogCard";

interface RelatedNavigatorProps {
    posts: any[];
}

export function RelatedNavigator({ posts }: RelatedNavigatorProps) {
    if (!posts || posts.length === 0) return null;

    return (
        <section className="mt-20 border-t border-brand-100/60 pt-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-semibold text-brand-900 font-heading md:text-3xl">
                        Continue the research
                    </h2>
                    <p className="mt-2 text-sm text-brand-900/60 font-sans">
                        Explore related articles hand-picked by our editorial team.
                    </p>
                </div>
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gold-600 hover:text-gold-500 transition-colors"
                >
                    All insights
                    <ArrowUpRight className="h-4 w-4" />
                </Link>
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <BlogCard key={post._id} post={post} />
                ))}
            </div>

            <div className="mt-12 rounded-2xl border border-brand-900/10 bg-brand-900 p-8 text-white shadow-lg">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <div className="text-xs uppercase tracking-[0.3em] text-gold-200 font-sans">
                            Ready for a plan?
                        </div>
                        <h3 className="mt-3 text-xl font-semibold font-heading">
                            Talk with a Union National tax strategist.
                        </h3>
                        <p className="mt-2 text-sm text-white/70 font-sans">
                            Get a custom roadmap for entity structuring, tax efficiency, and wealth defense.
                        </p>
                    </div>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-full bg-gold-500 px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-brand-900 transition-colors hover:bg-gold-400"
                    >
                        Book a Strategy Call
                    </Link>
                </div>
            </div>
        </section>
    );
}

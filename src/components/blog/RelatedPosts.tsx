import { BlogCard } from "./BlogCard";

interface RelatedPostsProps {
    posts: any[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
    if (!posts || posts.length === 0) return null;

    return (
        <section className="border-t border-slate-100 py-20 mt-12">
            <h2 className="text-2xl font-bold text-brand-900 font-heading mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <BlogCard key={post._id} post={post} />
                ))}
            </div>
        </section>
    );
}

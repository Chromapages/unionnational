import { client } from "@/sanity/lib/client";
import { BLOG_POST_QUERY, RELATED_POSTS_QUERY, BLOG_POSTS_QUERY } from "@/sanity/lib/queries";
import { BlogPostHeader } from "@/components/blog/BlogPostHeader";
import { BlogContent } from "@/components/blog/BlogContent";
import { BlogAuthorCard } from "@/components/blog/BlogAuthorCard";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const revalidate = 60;

export async function generateStaticParams() {
    const posts = await client.fetch(BLOG_POSTS_QUERY, { limit: 100 });
    return posts.map((post: any) => ({
        slug: post.slug.current,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = await client.fetch(BLOG_POST_QUERY, { slug: params.slug });
    if (!post) return { title: "Post Not Found" };

    return {
        title: `${post.title} | Union National Tax`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: post.featuredImage ? [post.featuredImage.asset?.url] : [],
        },
    };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = await client.fetch(BLOG_POST_QUERY, { slug: params.slug });

    if (!post) {
        notFound();
    }

    // Fetch related posts based on categories
    const categorySlugs = post.categories?.map((c: any) => c.slug.current) || [];
    const relatedPosts = await client.fetch(RELATED_POSTS_QUERY, {
        currentId: post._id,
        categorySlugs
    });

    return (
        <main className="bg-surface min-h-screen">
            <Header />
            <div className="pt-32 pb-20">
                <article className="max-w-4xl mx-auto px-6">
                    <BlogPostHeader post={post} />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-12">
                            <BlogContent value={post.body} />
                            <BlogAuthorCard author={post.author} />
                        </div>
                    </div>

                    <RelatedPosts posts={relatedPosts} />
                </article>
            </div>
            <Footer />
        </main>
    );
}

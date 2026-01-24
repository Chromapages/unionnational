import { client } from "@/sanity/lib/client";
import { BLOG_POST_QUERY, RELATED_POSTS_QUERY, BLOG_POSTS_QUERY } from "@/sanity/lib/queries";
import { BlogPostHeader } from "@/components/blog/BlogPostHeader";
import { BlogContent } from "@/components/blog/BlogContent";
import { BlogAuthorCard } from "@/components/blog/BlogAuthorCard";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await client.fetch(BLOG_POST_QUERY, { slug });
    if (!post) return { title: "Post Not Found" };

    const ogUrl = new URL(`https://unionnationaltax.com/api/og`);
    ogUrl.searchParams.set("title", post.title);
    ogUrl.searchParams.set("subtitle", "Union National Tax Blog");
    ogUrl.searchParams.set("type", "article");
    if (post.publishedAt) {
        ogUrl.searchParams.set("date", new Date(post.publishedAt).toLocaleDateString());
    }

    const images = post.featuredImage?.asset?.url
        ? [post.featuredImage.asset.url]
        : [{ url: ogUrl.toString(), width: 1200, height: 630, alt: post.title }];

    return {
        title: `${post.title} | Union National Tax`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.publishedAt,
            authors: [post.author?.name || "Union National Tax"],
            url: `https://unionnationaltax.com/blog/${slug}`,
            images: images,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: images,
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await client.fetch(BLOG_POST_QUERY, { slug });

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
            <HeaderWrapper />
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

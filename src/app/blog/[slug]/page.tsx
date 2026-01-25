import { client } from "@/sanity/lib/client";
import { BLOG_POST_QUERY, RELATED_POSTS_QUERY, BLOG_POSTS_QUERY } from "@/sanity/lib/queries";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { RichText } from "@/components/blog/RichText";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { BlogAuthorCard } from "@/components/blog/BlogAuthorCard";
import { RelatedNavigator } from "@/components/blog/RelatedNavigator";
import { getPortableTextHeadings } from "@/components/blog/richTextUtils";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";

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

    const headings = getPortableTextHeadings(post.body || []);
    const takeaways = headings.slice(0, 3).map((heading) => heading.text);

    return (
        <main className="bg-surface min-h-screen">
            <HeaderWrapper />
            <BlogHeader post={post} />
            <div className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid gap-12 lg:grid-cols-12">
                    <article className="space-y-10 lg:col-span-8">
                        <div className="rounded-2xl border border-gold-200/60 bg-gold-50/70 p-8 shadow-sm">
                            <div className="text-xs font-bold uppercase tracking-[0.3em] text-brand-900/60 font-sans">
                                Key Takeaways
                            </div>
                            {takeaways.length > 0 ? (
                                <ul className="mt-4 space-y-3 text-base text-brand-900 font-sans">
                                    {takeaways.map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <span className="mt-1 h-2 w-2 rounded-full bg-gold-500" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="mt-4 text-base text-brand-900/70 font-sans leading-relaxed">
                                    {post.excerpt || "Actionable insights and structured guidance for smarter tax strategy."}
                                </p>
                            )}
                        </div>

                        <RichText value={post.body} headings={headings} />
                        <BlogAuthorCard author={post.author} />
                    </article>

                    <aside className="lg:col-span-4">
                        <div className="space-y-8 lg:sticky lg:top-28">
                            <TableOfContents headings={headings} />
                            <div className="rounded-2xl border border-brand-100/60 bg-white p-6 shadow-sm">
                                <div className="text-xs font-bold uppercase tracking-[0.3em] text-brand-900/50 font-sans">
                                    Weekly Insights
                                </div>
                                <h3 className="mt-4 text-lg font-semibold text-brand-900 font-heading">
                                    Join the tax strategy brief.
                                </h3>
                                <p className="mt-2 text-sm text-brand-900/60 font-sans">
                                    A short, actionable newsletter built for founders and high earners.
                                </p>
                                <form className="mt-5 space-y-3">
                                    <input
                                        type="email"
                                        placeholder="Email address"
                                        className="w-full rounded-full border border-brand-100/80 px-4 py-2.5 text-sm text-brand-900 placeholder:text-brand-900/40 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 font-sans"
                                    />
                                    <button className="w-full rounded-full bg-brand-900 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.3em] text-gold-200 transition-colors hover:bg-brand-800">
                                        Get the Brief
                                    </button>
                                </form>
                            </div>
                            <div className="rounded-2xl border border-brand-900/10 bg-brand-950 p-6 text-white shadow-lg">
                                <div className="text-xs uppercase tracking-[0.3em] text-gold-200 font-sans">
                                    Need a plan?
                                </div>
                                <h3 className="mt-4 text-lg font-semibold font-heading">
                                    Book a confidential strategy call.
                                </h3>
                                <p className="mt-2 text-sm text-white/70 font-sans">
                                    Let us build a compliant tax roadmap for your business.
                                </p>
                                <Link
                                    href="/contact"
                                    className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-gold-500 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.3em] text-brand-900 transition-colors hover:bg-gold-400"
                                >
                                    Schedule Now
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>

                <RelatedNavigator posts={relatedPosts} />
            </div>
            <Footer />
        </main>
    );
}

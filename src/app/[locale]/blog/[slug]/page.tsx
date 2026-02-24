import { BLOG_POST_QUERY, RELATED_POSTS_QUERY, BLOG_POSTS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
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
import { NewsletterCta } from "@/components/blog/NewsletterCta";
import { extractString } from "@/lib/utils";

export const revalidate = 60;

export async function generateStaticParams() {
    const posts = await client.fetch(BLOG_POSTS_QUERY, { limit: 100, locale: 'en' });
    const locales = ["en", "es"];

    if (!posts || !Array.isArray(posts)) return [];

    return posts.filter(post => post && post.slug).flatMap((post: any) =>
        locales.map((locale) => ({
            locale,
            slug: post.slug,
        }))
    );
}

export async function generateMetadata(props: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
    const { slug, locale } = await props.params;
    const { data: post } = await sanityFetch({ query: BLOG_POST_QUERY, params: { slug, locale } });
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
        title: `${extractString(post.title, locale)} | Union National Tax`,
        description: extractString(post.excerpt, locale),
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

export default async function BlogPostPage(props: { params: Promise<{ locale: string; slug: string }> }) {
    const params = await props.params;
    const { slug, locale } = params;
    const { data: post } = await sanityFetch({ query: BLOG_POST_QUERY, params: { slug, locale } });

    if (!post) {
        notFound();
    }

    // Fetch related posts based on categories
    const categorySlugs = post.categories?.filter(Boolean).map((c: any) => c.slug).filter(Boolean) || [];
    const { data: relatedPosts } = await sanityFetch({
        query: RELATED_POSTS_QUERY,
        params: {
            currentId: post._id,
            categorySlugs,
            locale
        }
    });

    const headings = getPortableTextHeadings(post.body || []);
    const takeaways = headings.slice(0, 3).map((heading) => heading.text);

    return (
        <main className="bg-slate-50 min-h-screen">
            <HeaderWrapper />
            <BlogHeader post={post} locale={locale} />
            <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-32 -mt-20">
                <div className="grid gap-12 lg:grid-cols-12">
                    <article className="space-y-10 lg:col-span-8">
                        <div className="rounded-3xl border border-gold-200/70 bg-gradient-to-br from-gold-50 via-white to-white p-8 shadow-lg shadow-gold-200/40">
                            <div className="text-xs font-bold uppercase tracking-[0.3em] text-brand-900/60 font-sans">
                                Key Takeaways
                            </div>
                            {takeaways.length > 0 ? (
                                <ul className="mt-4 space-y-3 text-base text-brand-900 font-sans">
                                    {takeaways.map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <span className="mt-1 h-2 w-2 rounded-full bg-gold-500" />
                                            <span>{extractString(item, locale)}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="mt-4 text-base text-brand-900/70 font-sans leading-relaxed">
                                    {extractString(post.excerpt, locale, "Actionable insights and structured guidance for smarter tax strategy.")}
                                </p>
                            )}
                        </div>

                        <RichText value={post.body} headings={headings} locale={locale} />
                        <BlogAuthorCard author={post.author} locale={locale} />
                    </article>

                    <aside className="lg:col-span-4">
                        <div className="space-y-8 lg:sticky lg:top-36">
                            <TableOfContents headings={headings} locale={locale} />

                            <NewsletterCta />

                            <div className="rounded-3xl border border-brand-900/10 bg-brand-950 p-6 text-white shadow-xl shadow-brand-900/30">
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

                <RelatedNavigator posts={relatedPosts} locale={locale} />
            </div>
            <Footer />
        </main>
    );
}

import { client } from "@/sanity/lib/client";
import { BLOG_POSTS_QUERY, BLOG_SETTINGS_QUERY, BLOG_CATEGORIES_QUERY, FEATURED_POSTS_QUERY } from "@/sanity/lib/queries";
import { BlogHero } from "@/components/blog/BlogHero";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";

export const revalidate = 60; // Revalidate every minute

export const metadata: Metadata = {
    title: "Blog | Union National Tax",
    description: "Insights and strategies for tax optimization and wealth building from our expert team.",
};

export default async function BlogPage({ searchParams }: { searchParams: { page?: string } }) {
    // Parallel data fetching
    const [settings, categories, featuredPosts, allPosts] = await Promise.all([
        client.fetch(BLOG_SETTINGS_QUERY),
        client.fetch(BLOG_CATEGORIES_QUERY),
        client.fetch(FEATURED_POSTS_QUERY), // Separating featured posts
        client.fetch(BLOG_POSTS_QUERY, { limit: 100 }), // Fetch more and paginate on client/server effectively or implement true cursor pagination later
    ]);

    const page = Number(searchParams.page) || 1;
    const postsPerPage = settings?.postsPerPage || 9;

    // Filter out featured posts from the main list if needed, or just display all. 
    // For now, displaying all in grid, but usually you'd exclude featured ones if they are prominently displayed at top.
    // Let's exclude the featured posts from the main grid if we have a dedicated featured section.

    const featuredIds = new Set(featuredPosts.map((p: any) => p._id));
    const mainPosts = allPosts.filter((p: any) => !featuredIds.has(p._id));

    const totalPosts = mainPosts.length;
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    const start = (page - 1) * postsPerPage;
    const end = start + postsPerPage;
    const currentPosts = mainPosts.slice(start, end);

    return (
        <main className="bg-surface min-h-screen">
            <Header />
            <BlogHero
                title={settings?.heroTitle || "Union National Blog"}
                subtitle={settings?.heroSubtitle || "Expert insights on tax strategy, S-Corps, and wealth preservation."}
            />

            <div className="max-w-7xl mx-auto px-6 py-20">

                {/* Featured Section (if page 1) */}
                {page === 1 && featuredPosts.length > 0 && (
                    <section className="mb-24">
                        <h2 className="text-2xl font-bold text-brand-900 font-heading mb-8 flex items-center gap-3">
                            <span className="w-8 h-px bg-gold-500"></span>
                            Featured Articles
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredPosts.map((post: any) => (
                                <BlogCard key={post._id} post={post} />
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-brand-900 font-heading">Latest Articles</h2>
                            <div className="text-sm text-brand-900/60 font-sans">
                                Showing {start + 1}-{Math.min(end, totalPosts)} of {totalPosts}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {currentPosts.map((post: any) => (
                                <BlogCard key={post._id} post={post} />
                            ))}
                        </div>

                        <BlogPagination
                            currentPage={page}
                            totalPages={totalPages}
                            basePath="/blog"
                        />
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4">
                        <BlogSidebar
                            categories={categories}
                            newsletterTitle={settings?.newsletterTitle}
                            newsletterDescription={settings?.newsletterDescription}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}

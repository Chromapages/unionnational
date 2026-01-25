import { client } from "@/sanity/lib/client";
import { BLOG_RECENT_POSTS_QUERY, BLOG_SETTINGS_QUERY, BLOG_CATEGORIES_QUERY, FEATURED_POSTS_QUERY } from "@/sanity/lib/queries";
import { BlogHero } from "@/components/blog/BlogHero";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";

export const revalidate = 60; // Revalidate every minute

export const metadata: Metadata = {
    title: "Blog | Union National Tax",
    description: "Insights and strategies for tax optimization and wealth building from our expert team.",
};

export default async function BlogPage({ searchParams }: { searchParams: { page?: string } }) {
    // Parallel data fetching
    const [settings, categories, featuredPosts, recentPosts] = await Promise.all([
        client.fetch(BLOG_SETTINGS_QUERY),
        client.fetch(BLOG_CATEGORIES_QUERY),
        client.fetch(FEATURED_POSTS_QUERY), // Separating featured posts
        client.fetch(BLOG_RECENT_POSTS_QUERY, { limit: 100 }), // Fetch more and paginate on client/server effectively or implement true cursor pagination later
    ]);

    const page = Number(searchParams.page) || 1;
    const postsPerPage = settings?.postsPerPage || 9;

    const totalPosts = recentPosts.length;
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    const start = (page - 1) * postsPerPage;
    const end = start + postsPerPage;
    const currentPosts = recentPosts.slice(start, end);
    const summary = totalPosts > 0
        ? `Showing ${start + 1}-${Math.min(end, totalPosts)} of ${totalPosts}`
        : undefined;

    return (
        <main className="bg-surface min-h-screen">
            <HeaderWrapper />
            <BlogHero
                title={settings?.heroTitle || "Union National Blog"}
                subtitle={settings?.heroSubtitle || "Expert insights on tax strategy, S-Corps, and wealth preservation."}
                featuredPosts={featuredPosts}
            />

            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
                    <div className="space-y-10">
                        <BlogGrid
                            title="Latest Articles"
                            subtitle="Fresh perspectives on tax efficiency, entity structuring, and wealth protection strategies."
                            summary={summary}
                            posts={currentPosts}
                        />
                        <BlogPagination
                            currentPage={page}
                            totalPages={totalPages}
                            basePath="/blog"
                        />
                    </div>

                    <div>
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

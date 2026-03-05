import { BLOG_RECENT_POSTS_QUERY, BLOG_SETTINGS_QUERY, BLOG_CATEGORIES_QUERY, FEATURED_POSTS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { BlogHero } from "@/components/blog/BlogHero";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { extractString } from "@/lib/utils";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";

export const revalidate = 60; // Revalidate every minute

export const metadata: Metadata = {
    title: "Blog | Union National Tax",
    description: "Insights and strategies for tax optimization and wealth building from our expert team.",
};

export default async function BlogPage(props: { params: Promise<{ locale: string }>, searchParams: Promise<{ page?: string }> }) {
    const { locale } = await props.params;
    const searchParams = await props.searchParams;
    // Parallel data fetching
    const [
        { data: settings },
        { data: categories },
        { data: featuredPosts },
        { data: recentPosts }
    ] = await Promise.all([
        sanityFetch({ query: BLOG_SETTINGS_QUERY, params: { locale } }),
        sanityFetch({ query: BLOG_CATEGORIES_QUERY, params: { locale } }),
        sanityFetch({ query: FEATURED_POSTS_QUERY, params: { locale } }),
        sanityFetch({ query: BLOG_RECENT_POSTS_QUERY, params: { limit: 100, locale } }),
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
                title={extractString(settings?.heroTitle, locale, "Union National Blog")}
                subtitle={extractString(settings?.heroSubtitle, locale, "Expert insights on tax strategy, S-Corps, and wealth preservation.")}
                featuredPosts={featuredPosts}
                locale={locale}
            />

            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
                    <div className="space-y-10">
                        <BlogGrid
                            title="Latest Articles"
                            subtitle="Fresh perspectives on tax efficiency, entity structuring, and wealth protection strategies."
                            summary={summary}
                            posts={currentPosts}
                            locale={locale}
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
                            locale={locale}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}

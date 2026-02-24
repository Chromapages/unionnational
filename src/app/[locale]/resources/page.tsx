import { sanityFetch } from "@/sanity/lib/live";
import { RESOURCES_PAGE_QUERY, RESOURCES_PLAYBOOKS_QUERY, RESOURCES_BLOG_POSTS_QUERY, BLOG_CATEGORIES_QUERY } from "@/sanity/lib/queries";
import { ResourceHero } from "@/components/resources/ResourceHero";
import { ResourceGrid } from "@/components/resources/ResourceGrid";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await props.params;

    return {
        title: "Resources Hub | Union National Tax",
        description: "Explore guides, playbooks, and insights to help you optimize your tax strategy.",
    };
}

export default async function ResourcesPage(props: { params: Promise<{ locale: string }> }) {
    const { locale } = await props.params;

    const [
        { data: pageData },
        { data: playbooks },
        { data: blogPosts },
        { data: categories }
    ] = await Promise.all([
        sanityFetch({ query: RESOURCES_PAGE_QUERY, params: { locale } }),
        sanityFetch({ query: RESOURCES_PLAYBOOKS_QUERY, params: { locale } }),
        sanityFetch({ query: RESOURCES_BLOG_POSTS_QUERY, params: { locale } }),
        sanityFetch({ query: BLOG_CATEGORIES_QUERY, params: { locale } }),
    ]);

    return (
        <main id="main-content" className="bg-surface min-h-screen">
            <HeaderWrapper />
            <ResourceHero
                title={pageData?.heroTitle || "Resources Hub"}
                subtitle={pageData?.heroSubtitle || "Explore our collection of guides, playbooks, and insights to help you optimize your tax strategy."}
                featuredResource={pageData?.featuredResource}
            />
            <ResourceGrid
                playbooks={playbooks || []}
                blogPosts={blogPosts || []}
                categories={pageData?.categories || categories || []}
                showLeadMagnets={pageData?.showPlaybooks ?? true}
                showBlogPosts={pageData?.showBlogPosts ?? true}
                showTools={pageData?.showTools ?? true}
            />
            <Footer />
        </main>
    );
}

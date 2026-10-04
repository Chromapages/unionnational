import { sanityFetch } from "@/sanity/lib/live";
import { RESOURCES_PAGE_QUERY, RESOURCES_PLAYBOOKS_QUERY, RESOURCES_BLOG_POSTS_QUERY } from "@/sanity/lib/queries";
import { ResourcesDesktopExperience } from "@/components/resources/ResourcesDesktopExperience";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";
import { localizedAlternates } from "@/lib/seo/localizedAlternates";

type DesktopResource = Parameters<typeof ResourcesDesktopExperience>[0]["blogPosts"][number];

export const revalidate = 60;

// Generate static params for SSG
export async function generateStaticParams() {
    return [
        { locale: 'en' },
        { locale: 'es' },
    ];
}

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await props.params;
    const { data: page } = await sanityFetch({ query: RESOURCES_PAGE_QUERY, params: { locale } }).catch(() => ({ data: null }));

    return {
        title: "Resources Hub | Union National Tax",
        description: locale === "es" ? "Artículos y guías fiscales y empresariales para dueños de negocios." : "Tax and business articles and guides for business owners.",
        alternates: localizedAlternates(locale, "/resources"),
        ...(page?.seo?.noIndex ? { robots: { index: false, follow: false } } : {}),
    };
}

export default async function ResourcesPage(props: { params: Promise<{ locale: string }> }) {
    const { locale } = await props.params;

    const [
        { data: pageData },
        { data: playbooks },
        { data: blogPosts }
    ] = await Promise.all([
        sanityFetch({ query: RESOURCES_PAGE_QUERY, params: { locale } }),
        sanityFetch({ query: RESOURCES_PLAYBOOKS_QUERY, params: { locale } }),
        sanityFetch({ query: RESOURCES_BLOG_POSTS_QUERY, params: { locale } }),
    ]);

    return (
        <main id="main-content" className="bg-surface xl:bg-[#06342f] min-h-screen">
            <HeaderWrapper />
                <ResourcesDesktopExperience
                    blogPosts={(blogPosts || []).map((post: Omit<DesktopResource, "_type">) => ({ ...post, _type: "blogPost" as const }))}
                    playbooks={(playbooks || []).map((playbook: Omit<DesktopResource, "_type">) => ({ ...playbook, _type: "playbook" as const }))}
                    showBlogPosts={pageData?.showBlogPosts ?? true}
                    showPlaybooks={pageData?.showPlaybooks ?? true}
                />
            <Footer />
        </main>
    );
}

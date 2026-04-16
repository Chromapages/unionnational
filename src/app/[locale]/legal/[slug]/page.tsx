import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { sanityFetch } from "@/sanity/lib/live";
import { LEGAL_PAGE_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { client } from "@/sanity/lib/client";
import { LegalContentClient } from "@/components/legal/LegalContentClient";
import { PRIVACY_POLICY_DATA } from "@/data/privacy-policy-content";

const LEGAL_SLUGS_QUERY = `*[_type == "legalPage"]{ "slug": slug.current }`;

export async function generateStaticParams() {
    const pages = await client.fetch(LEGAL_SLUGS_QUERY);
    const locales = ["en", "es"];

    // Add default privacy-policy to static params if not already there
    const slugs = pages.map((p: any) => p.slug);
    if (!slugs.includes("privacy-policy")) slugs.push("privacy-policy");

    return slugs.flatMap((slug: string) =>
        locales.map((locale) => ({
            locale,
            slug,
        }))
    );
}

export async function generateMetadata(props: { params: Promise<{ locale: string; slug: string }> }) {
    const { slug, locale } = await props.params;
    let { data: page } = await sanityFetch({
        query: LEGAL_PAGE_QUERY,
        params: { slug, locale }
    });

    // Fallback metadata for privacy policy
    if (!page && slug === "privacy-policy") {
        page = PRIVACY_POLICY_DATA;
    }

    if (!page) return { title: 'Page Not Found' };

    return {
        title: `${page.title} | Union National Tax`,
        description: `Legal documentation: ${page.title} for Union National Tax.`,
    };
}

export default async function LegalPage(props: { params: Promise<{ locale: string; slug: string }> }) {
    const { slug, locale } = await props.params;
    let { data: page } = await sanityFetch({
        query: LEGAL_PAGE_QUERY,
        params: { slug, locale }
    });

    // Fallback content for privacy policy if not in Sanity
    if (!page && slug === "privacy-policy") {
        page = PRIVACY_POLICY_DATA;
    }

    if (!page) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased overflow-x-hidden">
            <HeaderWrapper />

            <main id="main-content" className="pt-20 pb-24 flex-grow">
                <div className="max-w-6xl mx-auto px-6">
                    <RevealOnScroll>
                        <header className="mb-16 border-b border-slate-200 pb-12 max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 font-sans">
                                Legal Documentation
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-bold text-brand-900 tracking-tight mb-6 font-heading leading-[1.1]">
                                {page.title}
                            </h1>
                            {page.lastUpdated && (
                                <div className="flex items-center gap-4 text-sm text-brand-900/50 font-sans">
                                    <span className="w-8 h-px bg-slate-200" />
                                    <span>Last Updated: {format(new Date(page.lastUpdated), 'MMMM d, yyyy')}</span>
                                </div>
                            )}
                        </header>

                        <LegalContentClient body={page.body} title={page.title} />
                    </RevealOnScroll>
                </div>
            </main>

            <Footer />
        </div>
    );
}

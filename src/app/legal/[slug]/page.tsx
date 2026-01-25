import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { sanityFetch } from "@/sanity/lib/live";
import { LEGAL_PAGE_QUERY } from "@/sanity/lib/queries";
import { PortableText } from "next-sanity";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { data: page } = await sanityFetch({
        query: LEGAL_PAGE_QUERY,
        params: { slug }
    });

    if (!page) return { title: 'Page Not Found' };

    return {
        title: `${page.title} | Union National Tax`,
        description: `Legal documentation: ${page.title} for Union National Tax.`,
    };
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { data: page } = await sanityFetch({
        query: LEGAL_PAGE_QUERY,
        params: { slug }
    });

    if (!page) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased overflow-x-hidden">
            <HeaderWrapper />

            <main className="pt-12 pb-20 flex-grow">
                <article className="max-w-3xl mx-auto px-6 mb-24">
                    <RevealOnScroll>
                        <header className="mb-12 border-b border-slate-200 pb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-500 text-[10px] font-semibold uppercase tracking-widest mb-6 font-sans">
                                Legal
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-brand-900 tracking-tight mb-4 font-heading">{page.title}</h1>
                            {page.lastUpdated && (
                                <p className="text-sm text-brand-900/60 font-sans">
                                    Last Updated: {format(new Date(page.lastUpdated), 'MMMM d, yyyy')}
                                </p>
                            )}
                        </header>

                        <div className="prose prose-slate max-w-none text-brand-900/80 font-sans ProseMirror">
                            <PortableText value={page.body} />
                        </div>
                    </RevealOnScroll>
                </article>
            </main>

            <Footer />
        </div>
    );
}

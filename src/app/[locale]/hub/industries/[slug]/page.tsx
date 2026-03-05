import { INDUSTRY_VERTICAL_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { VerticalHero } from "@/components/hub/VerticalHero";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { ArrowRight, BookOpen, FileText } from "lucide-react";

export const revalidate = 60;

interface PageProps {
    params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const { locale, slug } = await props.params;
    const { data: industry } = await sanityFetch({
        query: INDUSTRY_VERTICAL_QUERY,
        params: { slug, locale },
    });

    if (!industry) {
        return { title: "Industry Not Found" };
    }

    return {
        title: `${industry.title} | Industry Guides`,
        description: industry.description,
    };
}

export default async function IndustryPage(props: PageProps) {
    const { locale, slug } = await props.params;

    const { data: industry } = await sanityFetch({
        query: INDUSTRY_VERTICAL_QUERY,
        params: { slug, locale },
    });

    if (!industry) {
        notFound();
    }

    const featuredChapters = industry.featuredPlaybookChapters || [];
    const relatedPlaybooks = industry.relatedPlaybooks || [];

    return (
        <main className="bg-surface min-h-screen">
            <HeaderWrapper />
            
            <VerticalHero
                title={industry.title}
                description={industry.description}
                heroImage={industry.heroImage}
                heroVideo={industry.heroVideo}
                painPoints={industry.painPoints}
                stats={industry.stats}
                testimonials={industry.clientTestimonials}
            />

            {featuredChapters.length > 0 && (
                <section className="mx-auto max-w-7xl px-6 py-16">
                    <h2 className="mb-8 text-2xl font-semibold text-white font-heading">Relevant Chapters</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {featuredChapters.map((chapter: any) => (
                            <Link
                                key={chapter._id}
                                href={`/hub/s-corp-playbook/${chapter.slug}`}
                                className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10 hover:border-gold-500/30"
                            >
                                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/20 text-gold-300 text-lg font-bold">
                                    {chapter.chapterNumber}
                                </span>
                                <div className="flex-1">
                                    <h3 className="font-medium text-white group-hover:text-gold-200 transition-colors">
                                        {chapter.title}
                                    </h3>
                                    <span className="flex items-center gap-1 text-xs text-white/50 mt-1">
                                        <FileText className="h-3 w-3" />
                                        Read Chapter
                                    </span>
                                </div>
                                <ArrowRight className="h-4 w-4 text-white/30 group-hover:translate-x-1 group-hover:text-gold-300 transition-all" />
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {relatedPlaybooks.length > 0 && (
                <section className="mx-auto max-w-7xl px-6 py-16">
                    <h2 className="mb-8 text-2xl font-semibold text-white font-heading">Related Playbooks</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {relatedPlaybooks.map((playbook: any) => (
                            <Link
                                key={playbook._id}
                                href={`/hub/${playbook.slug}`}
                                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-brand-950/40 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-gold"
                            >
                                {playbook.coverImage ? (
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={urlFor(playbook.coverImage).url()}
                                            alt={playbook.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/40 to-transparent" />
                                    </div>
                                ) : (
                                    <div className="h-48 bg-brand-900/60" />
                                )}
                                <div className="flex flex-1 flex-col p-6">
                                    <h3 className="font-heading text-xl font-semibold text-white transition-colors duration-300 group-hover:text-gold-200">
                                        {playbook.title}
                                    </h3>
                                    <span className="mt-auto flex items-center gap-2 pt-4 text-sm font-medium text-gold-200">
                                        <BookOpen className="h-4 w-4" />
                                        View Playbook
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            <Footer />
        </main>
    );
}

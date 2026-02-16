import { PLAYBOOK_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { PlaybookNav } from "@/components/hub/PlaybookNav";
import { GatedPdfButton } from "@/components/hub/GatedContentBox";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { BookOpen, ArrowRight, Lock } from "lucide-react";

export const revalidate = 60;

interface PageProps {
    params: Promise<{ locale: string; slug?: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const { locale } = await props.params;
    const { data: playbook } = await sanityFetch({
        query: PLAYBOOK_QUERY,
        params: { slug: "s-corp-playbook", locale },
    });

    if (!playbook) {
        return { title: "Playbook Not Found" };
    }

    return {
        title: `${playbook.title} | Authority Hub`,
        description: playbook.description,
    };
}

interface Chapter {
    _id: string;
    title: string;
    slug: string;
    chapterNumber: number;
    isGated?: boolean;
}

export default async function PlaybookPage(props: PageProps) {
    const { locale } = await props.params;

    const [{ data: playbook }] = await Promise.all([
        sanityFetch({ query: PLAYBOOK_QUERY, params: { slug: "s-corp-playbook", locale } }),
    ]);

    if (!playbook) {
        notFound();
    }

    const chapters: Chapter[] = playbook.chapters || [];

    return (
        <main className="bg-surface min-h-screen">
            <HeaderWrapper />
            
            <section className="relative overflow-hidden bg-forest-gradient pt-32 pb-16 text-white">
                <div className="absolute inset-0">
                    <div className="absolute -top-32 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[140px]" />
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-6">
                    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-gold-100">
                                <BookOpen className="h-3.5 w-3.5" />
                                Playbook
                            </div>
                            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl font-heading">
                                {playbook.title}
                            </h1>
                            {playbook.description && (
                                <p className="max-w-2xl text-lg text-white/70 font-sans leading-relaxed">
                                    {playbook.description}
                                </p>
                            )}
                            <div className="flex flex-wrap items-center gap-6 pt-4">
                                <div className="flex items-center gap-2 text-sm text-white/60">
                                    <span className="rounded-full bg-white/10 px-3 py-1">
                                        {chapters.length} Chapters
                                    </span>
                                </div>
                                {playbook.gatedPdfUrl && (
                                    <GatedPdfButton pdfUrl={playbook.gatedPdfUrl} />
                                )}
                            </div>
                        </div>

                        {playbook.coverImage && (
                            <div className="relative hidden lg:block">
                                <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-brand-950/40 shadow-2xl">
                                    <Image
                                        src={urlFor(playbook.coverImage).url()}
                                        alt={playbook.coverImage.alt || playbook.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
                    <div>
                        <h2 className="mb-8 text-2xl font-semibold text-white font-heading">Table of Contents</h2>
                        <div className="space-y-4">
                            {chapters.map((chapter: any, index: number) => (
                                <a
                                    key={chapter._id}
                                    href={`/hub/s-corp-playbook/${chapter.slug}`}
                                    className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10 hover:border-gold-500/30"
                                >
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/20 text-gold-300 text-sm font-bold">
                                        {chapter.chapterNumber}
                                    </span>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-white group-hover:text-gold-200 transition-colors">
                                            {chapter.title}
                                        </h3>
                                        {chapter.isGated && (
                                            <span className="flex items-center gap-1 text-xs text-white/50 mt-1">
                                                <Lock className="h-3 w-3" />
                                                Premium Content
                                            </span>
                                        )}
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-white/30 group-hover:translate-x-1 group-hover:text-gold-300 transition-all" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="hidden lg:block">
                        <div className="sticky top-24">
                            <PlaybookNav
                                playbookTitle={playbook.title}
                                chapters={chapters}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

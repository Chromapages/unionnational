import { PLAYBOOK_QUERY, PLAYBOOK_CHAPTER_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { PlaybookNav } from "@/components/hub/PlaybookNav";
import { KeyTakeaways, ToolReferences } from "@/components/hub/ImpactCard";
import { GatedContentBox } from "@/components/hub/GatedContentBox";
import { RichText } from "@/components/blog/RichText";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Play, ArrowLeft } from "lucide-react";
import { extractString } from "@/lib/utils";
import Link from "next/link";

export const revalidate = 60;

interface PageProps {
    params: Promise<{ locale: string; chapter: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const { locale, chapter } = await props.params;
    const { data: chapterData } = await sanityFetch({
        query: PLAYBOOK_CHAPTER_QUERY,
        params: { slug: chapter, locale },
    });

    if (!chapterData) {
        return { title: "Chapter Not Found" };
    }

    return {
        title: `${extractString(chapterData.title, locale)} | S-Corp Playbook`,
        description: `Chapter ${chapterData.chapterNumber}: ${extractString(chapterData.title, locale)}`,
    };
}

export default async function ChapterPage(props: PageProps) {
    const { locale, chapter: chapterSlug } = await props.params;

    const [{ data: playbook }, { data: chapter }] = await Promise.all([
        sanityFetch({ query: PLAYBOOK_QUERY, params: { slug: "s-corp-playbook", locale } }),
        sanityFetch({ query: PLAYBOOK_CHAPTER_QUERY, params: { slug: chapterSlug, locale } }),
    ]);

    if (!playbook || !chapter) {
        notFound();
    }

    const chapters = playbook.chapters || [];
    const currentIndex = chapters.findIndex((c: any) => c.slug === chapterSlug);
    const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
    const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

    return (
        <main className="bg-surface min-h-screen">
            <HeaderWrapper />

            <section className="relative overflow-hidden bg-forest-gradient pt-32 pb-8 text-white">
                <div className="absolute inset-0">
                    <div className="absolute -top-32 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[140px]" />
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-6">
                    <Link
                        href="/hub/s-corp-playbook"
                        className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-gold-200 transition-colors mb-8"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Playbook
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500 text-lg font-bold text-brand-950">
                            {chapter.chapterNumber}
                        </span>
                        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl font-heading">
                            {extractString(chapter.title, locale)}
                        </h1>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-12">
                <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
                    <div className="space-y-12">
                        {chapter.videoEmbed && (
                            <div className="relative aspect-video overflow-hidden rounded-2xl bg-brand-900">
                                <iframe
                                    src={chapter.videoEmbed}
                                    className="absolute inset-0 h-full w-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        )}

                        {chapter.videoThumbnail && !chapter.videoEmbed && (
                            <div className="relative aspect-video overflow-hidden rounded-2xl bg-brand-900">
                                <Image
                                    src={urlFor(chapter.videoThumbnail).url()}
                                    alt={chapter.videoThumbnail.alt || extractString(chapter.title, locale)}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-500/90 hover:bg-gold-400 transition-colors cursor-pointer">
                                        <Play className="h-8 w-8 text-brand-950 ml-1" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {chapter.content && (
                            <div className="prose prose-invert max-w-none">
                                <RichText value={chapter.content} locale={locale} />
                            </div>
                        )}

                        {chapter.isGated && !chapter.gatedContent ? (
                            <GatedContentBox
                                title="Unlock Advanced Strategies"
                                description="This section contains advanced tactics. Enter your email to unlock this premium content."
                            />
                        ) : chapter.isGated && chapter.gatedContent ? (
                            <div>
                                <GatedContentBox
                                    title="Advanced Strategies Unlocked"
                                    description="Thanks for subscribing! Here are the advanced tactics for this chapter."
                                />
                                <div className="mt-8 prose prose-invert max-w-none">
                                    <RichText value={chapter.gatedContent} locale={locale} />
                                </div>
                            </div>
                        ) : null}

                        <KeyTakeaways takeaways={chapter.keyTakeaways?.map((t: any) => extractString(t, locale))} />
                        <ToolReferences tools={chapter.tools?.map((t: any) => extractString(t, locale))} />

                        <div className="flex items-center justify-between border-t border-white/10 pt-8">
                            {prevChapter ? (
                                <Link
                                    href={`/hub/s-corp-playbook/${prevChapter.slug}`}
                                    className="group flex items-center gap-2 text-sm text-white/60 hover:text-gold-200 transition-colors"
                                >
                                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                                    <span className="font-medium">Previous: {extractString(prevChapter.title, locale)}</span>
                                </Link>
                            ) : (
                                <div />
                            )}
                            {nextChapter && (
                                <Link
                                    href={`/hub/s-corp-playbook/${nextChapter.slug}`}
                                    className="group flex items-center gap-2 text-sm text-white/60 hover:text-gold-200 transition-colors"
                                >
                                    <span className="font-medium">Next: {extractString(nextChapter.title, locale)}</span>
                                    <ArrowLeft className="h-4 w-4 rotate-180 transition-transform group-hover:translate-x-1" />
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="hidden lg:block">
                        <div className="sticky top-24 space-y-6">
                            <PlaybookNav
                                playbookTitle={extractString(playbook.title, locale)}
                                chapters={chapters}
                                currentChapterSlug={chapterSlug}
                                locale={locale}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

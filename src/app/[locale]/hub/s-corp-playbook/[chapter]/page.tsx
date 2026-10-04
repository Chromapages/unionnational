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
import { ArrowLeft } from "lucide-react";
import { extractString } from "@/lib/utils";
import Link from "next/link";
import { Playbook, PlaybookChapter } from "@/types/sanity";
import { localizedAlternates } from "@/lib/seo/localizedAlternates";

export const revalidate = 60;

interface PageProps {
    params: Promise<{ locale: string; chapter: string }>;
}

async function getChapterJourney(chapterSlug: string, locale: string) {
    const [{ data: playbook }, { data: chapter }] = await Promise.all([
        sanityFetch({ query: PLAYBOOK_QUERY, params: { slug: "s-corp-playbook", locale } }),
        sanityFetch({ query: PLAYBOOK_CHAPTER_QUERY, params: { slug: chapterSlug, locale } }),
    ]);
    const typedPlaybook = playbook as Playbook | null;
    const chapters = (typedPlaybook?.chapters || []).filter(Boolean).map((c) => ({
        ...c,
        slug: typeof c.slug === "string" ? c.slug : c.slug?.current,
    }));
    const currentIndex = chapters.findIndex((c) => c.slug === chapterSlug);
    const typedChapter = currentIndex >= 0 ? chapter as PlaybookChapter | null : null;
    return { typedPlaybook, typedChapter, chapters, currentIndex };
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const { locale, chapter } = await props.params;
    const { typedChapter } = await getChapterJourney(chapter, locale);

    if (!typedChapter) {
        return { title: "Chapter Not Found" };
    }

    return {
        title: `${extractString(typedChapter.title, locale)} | S-Corp Playbook`,
        description: `Chapter ${typedChapter.chapterNumber}: ${extractString(typedChapter.title, locale)}`,
        alternates: localizedAlternates(locale, `/hub/s-corp-playbook/${chapter}`),
        ...(typedChapter.isGated ? { robots: { index: false, follow: false } } : {}),
    };
}

export default async function ChapterPage(props: PageProps) {
    const { locale, chapter: chapterSlug } = await props.params;

    const { typedPlaybook, typedChapter, chapters, currentIndex } = await getChapterJourney(chapterSlug, locale);

    if (!typedPlaybook || !typedChapter) {
        notFound();
    }

    const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
    const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;
    const hasVideoEmbed = typedChapter.videoEmbed?.startsWith("https://");

    return (
        <main id="main-content" className="bg-surface min-h-screen">
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
                            {typedChapter.chapterNumber}
                        </span>
                        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl font-heading">
                            {extractString(typedChapter.title, locale)}
                        </h1>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-12">
                <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
                    <div className="space-y-12">
                        {hasVideoEmbed && (
                            <div className="relative aspect-video overflow-hidden rounded-2xl bg-brand-900">
                                <iframe
                                    src={typedChapter.videoEmbed}
                                    title={`${extractString(typedChapter.title, locale)} — video`}
                                    className="absolute inset-0 h-full w-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    loading="lazy"
                                />
                            </div>
                        )}

                        {typedChapter.videoThumbnail && !hasVideoEmbed && (
                            <figure>
                            <div className="relative aspect-video overflow-hidden rounded-2xl bg-brand-900">
                                <Image
                                    src={urlFor(typedChapter.videoThumbnail).url()}
                                    alt={typedChapter.videoThumbnail.alt || extractString(typedChapter.title, locale)}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <figcaption className="mt-2 text-sm text-slate-500">
                                {locale === "es" ? "Video no disponible por ahora." : "Video unavailable for now."}
                            </figcaption>
                            </figure>
                        )}

                        {!hasVideoEmbed && !typedChapter.videoThumbnail && (
                            <p className="text-sm text-slate-500">
                                {locale === "es" ? "No hay video para este capítulo." : "No video is available for this chapter."}
                            </p>
                        )}

                        {typedChapter.content && (
                            <div className="prose prose-invert max-w-none">
                                <RichText value={typedChapter.content} locale={locale} />
                            </div>
                        )}

                        {typedChapter.isGated && <GatedContentBox locale={locale} />}

                        <KeyTakeaways takeaways={typedChapter.keyTakeaways?.map((t: string) => extractString(t, locale)) || []} />
                        <ToolReferences tools={typedChapter.tools?.map((t: string) => extractString(t, locale)) || []} />

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
                                playbookTitle={extractString(typedPlaybook.title, locale)}
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

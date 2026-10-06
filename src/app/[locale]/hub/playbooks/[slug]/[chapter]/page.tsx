import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { RichText } from "@/components/blog/RichText";
import { GatedContentBox } from "@/components/hub/GatedContentBox";
import { KeyTakeaways, ToolReferences } from "@/components/hub/ImpactCard";
import { PlaybookNav } from "@/components/hub/PlaybookNav";
import { Footer } from "@/components/layout/Footer";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { localizedAlternates } from "@/lib/seo/localizedAlternates";
import { extractString } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { PLAYBOOK_CHAPTER_QUERY, PLAYBOOK_QUERY } from "@/sanity/lib/queries";
import type { ChapterData, PlaybookData } from "../playbook-data";
import { getVideoEmbedUrl } from "@/lib/security/content-urls";

export const revalidate = 60;

type PageProps = { params: Promise<{ locale: string; slug: string; chapter: string }> };

async function getJourney(slug: string, chapterSlug: string, locale: string) {
    const [{ data: playbookData }, { data: chapterData }] = await Promise.all([
        sanityFetch({ query: PLAYBOOK_QUERY, params: { slug, locale } }),
        sanityFetch({ query: PLAYBOOK_CHAPTER_QUERY, params: { slug: chapterSlug, locale } }),
    ]);
    const playbook = playbookData as PlaybookData | null;
    const chapter = chapterData as ChapterData | null;
    const chapters = playbook?.chapters || [];
    const currentIndex = chapters.findIndex((item) => item.slug === chapterSlug);
    return { playbook, chapter: currentIndex >= 0 ? chapter : null, chapters, currentIndex };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale, slug, chapter: chapterSlug } = await params;
    if (slug === "s-corp-playbook") return { alternates: localizedAlternates(locale, `/hub/s-corp-playbook/${encodeURIComponent(chapterSlug)}`) };
    const { playbook, chapter } = await getJourney(slug, chapterSlug, locale);
    if (!playbook || !chapter) return { title: "Chapter Not Found" };

    return {
        title: `${extractString(chapter.title, locale)} | ${extractString(playbook.title, locale)}`,
        description: `${locale === "es" ? "Capítulo" : "Chapter"} ${chapter.chapterNumber}: ${extractString(chapter.title, locale)}`,
        alternates: localizedAlternates(locale, `/hub/playbooks/${encodeURIComponent(slug)}/${encodeURIComponent(chapterSlug)}`),
    };
}

export default async function ChapterPage({ params }: PageProps) {
    const { locale, slug, chapter: chapterSlug } = await params;
    if (slug === "s-corp-playbook") permanentRedirect(`/${locale}/hub/s-corp-playbook/${encodeURIComponent(chapterSlug)}`);
    const { playbook, chapter, chapters, currentIndex } = await getJourney(slug, chapterSlug, locale);
    if (!playbook || !chapter) notFound();

    const basePath = `/hub/playbooks/${encodeURIComponent(slug)}`;
    const prevChapter = chapters[currentIndex - 1];
    const nextChapter = chapters[currentIndex + 1];
    const videoEmbed = getVideoEmbedUrl(chapter.videoEmbed);
    const hasVideoEmbed = Boolean(videoEmbed);

    return (
        <main id="main-content" className="min-h-screen bg-surface">
            <HeaderWrapper />
            <section className="bg-forest-gradient px-6 pb-10 pt-32 text-white">
                <div className="mx-auto max-w-7xl">
                    <Link href={`/${locale}${basePath}`} className="mb-8 inline-flex items-center gap-2 text-sm text-white/70 hover:text-gold-200">
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                        {locale === "es" ? "Volver a la guía" : "Back to Playbook"}
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-500 text-lg font-bold text-brand-950">
                            {chapter.chapterNumber}
                        </span>
                        <h1 className="font-heading text-3xl font-semibold tracking-tight md:text-5xl">{extractString(chapter.title, locale)}</h1>
                    </div>
                </div>
            </section>
            <section className="mx-auto grid max-w-7xl gap-12 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_340px]">
                <div className="space-y-12">
                    {hasVideoEmbed ? (
                        <div className="relative aspect-video overflow-hidden rounded-2xl bg-brand-900">
                            <iframe
                                src={videoEmbed!}
                                title={`${extractString(chapter.title, locale)} — video`}
                                className="absolute inset-0 h-full w-full"
                                allow="autoplay; encrypted-media; picture-in-picture"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                                loading="lazy"
                            />
                        </div>
                    ) : chapter.videoThumbnail ? (
                        <figure>
                            <div className="relative aspect-video overflow-hidden rounded-2xl bg-brand-900">
                                <Image
                                    src={urlFor(chapter.videoThumbnail).url()}
                                    alt={chapter.videoThumbnail.alt || extractString(chapter.title, locale)}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <figcaption className="mt-2 text-sm text-slate-500">
                                {locale === "es" ? "Video no disponible por ahora." : "Video unavailable for now."}
                            </figcaption>
                        </figure>
                    ) : (
                        <p className="text-sm text-slate-500">
                            {locale === "es" ? "No hay video para este capítulo." : "No video is available for this chapter."}
                        </p>
                    )}

                    {chapter.content && <div className="prose prose-invert max-w-none"><RichText value={chapter.content} locale={locale} /></div>}
                    {chapter.isGated && <GatedContentBox locale={locale} />}
                    <KeyTakeaways takeaways={chapter.keyTakeaways?.map((item) => extractString(item, locale)) || []} />
                    <ToolReferences tools={chapter.tools?.map((item) => extractString(item, locale)) || []} />

                    <nav aria-label={locale === "es" ? "Navegación de capítulos" : "Chapter navigation"} className="flex items-center justify-between border-t border-white/10 pt-8">
                        {prevChapter ? (
                            <Link href={`/${locale}${basePath}/${encodeURIComponent(prevChapter.slug)}`} className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-gold-200">
                                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                                {locale === "es" ? "Anterior" : "Previous"}: {extractString(prevChapter.title, locale)}
                            </Link>
                        ) : <span />}
                        {nextChapter && (
                            <Link href={`/${locale}${basePath}/${encodeURIComponent(nextChapter.slug)}`} className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-gold-200">
                                {locale === "es" ? "Siguiente" : "Next"}: {extractString(nextChapter.title, locale)}
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                        )}
                    </nav>
                </div>
                <div className="hidden lg:block">
                    <div className="sticky top-24">
                        <PlaybookNav playbookTitle={extractString(playbook.title, locale)} chapters={chapters} currentChapterSlug={chapterSlug} locale={locale} basePath={basePath} />
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}

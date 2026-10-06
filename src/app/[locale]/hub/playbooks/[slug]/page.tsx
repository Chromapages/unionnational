import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowRight, BookOpen, MessageCircle } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { GatedPdfButton } from "@/components/hub/GatedContentBox";
import { PlaybookNav } from "@/components/hub/PlaybookNav";
import { localizedAlternates } from "@/lib/seo/localizedAlternates";
import { extractString } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { PLAYBOOK_QUERY } from "@/sanity/lib/queries";
import type { PlaybookData } from "./playbook-data";

export const revalidate = 60;

type PageProps = { params: Promise<{ locale: string; slug: string }> };

async function getPlaybook(slug: string, locale: string) {
    const { data } = await sanityFetch({ query: PLAYBOOK_QUERY, params: { slug, locale } });
    return data as PlaybookData | null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale, slug } = await params;
    if (slug === "s-corp-playbook") return { alternates: localizedAlternates(locale, "/hub/s-corp-playbook") };
    const playbook = await getPlaybook(slug, locale);
    if (!playbook) return { title: "Playbook Not Found" };

    return {
        title: `${extractString(playbook.title, locale)} | Authority Hub`,
        description: extractString(playbook.description, locale),
        alternates: localizedAlternates(locale, `/hub/playbooks/${encodeURIComponent(slug)}`),
        ...(playbook.seo?.noIndex ? { robots: { index: false, follow: false } } : {}),
    };
}

export default async function PlaybookPage({ params }: PageProps) {
    const { locale, slug } = await params;
    if (slug === "s-corp-playbook") permanentRedirect(`/${locale}/hub/s-corp-playbook`);
    const playbook = await getPlaybook(slug, locale);
    if (!playbook) notFound();

    const chapters = playbook.chapters || [];
    const basePath = `/hub/playbooks/${encodeURIComponent(slug)}`;

    return (
        <main id="main-content" className="min-h-screen bg-surface">
            <HeaderWrapper />
            <section className="bg-forest-gradient px-6 pb-16 pt-32 text-white">
                <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
                    <div className="space-y-6">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-gold-100">
                            <BookOpen className="h-4 w-4" aria-hidden="true" />
                            {locale === "es" ? "Guía" : "Playbook"}
                        </span>
                        <h1 className="font-heading text-4xl font-bold tracking-tight md:text-6xl">{extractString(playbook.title, locale)}</h1>
                        {playbook.description && <p className="max-w-2xl text-lg text-white/70">{extractString(playbook.description, locale)}</p>}
                        <div className="flex flex-wrap items-center gap-5">
                            <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/70">
                                {chapters.length} {locale === "es" ? "capítulos" : "chapters"}
                            </span>
                            {playbook.gatedPdfUrl && <GatedPdfButton pdfUrl={playbook.gatedPdfUrl} locale={locale} />}
                        </div>
                    </div>
                    {playbook.coverImage && (
                        <div className="relative hidden aspect-[3/4] overflow-hidden rounded-2xl lg:block">
                            <Image
                                src={urlFor(playbook.coverImage).url()}
                                alt={playbook.coverImage.alt || extractString(playbook.title, locale)}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                </div>
            </section>
            <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_340px]">
                <div>
                    <h2 className="mb-8 font-heading text-2xl font-bold text-white">
                        {locale === "es" ? "Contenido" : "Table of Contents"}
                    </h2>
                    <div className="space-y-4">
                        {chapters.map((chapter) => (
                            <Link
                                key={chapter._id}
                                href={`/${locale}${basePath}/${encodeURIComponent(chapter.slug)}`}
                                className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 text-white transition-colors hover:border-gold-500/30 hover:bg-white/10"
                            >
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-sm font-bold text-gold-300">
                                    {chapter.chapterNumber}
                                </span>
                                <span className="flex-1">
                                    <span className="block font-medium group-hover:text-gold-200">{extractString(chapter.title, locale)}</span>
                                    {chapter.isGated && (
                                        <span className="mt-1 flex items-center gap-1 text-xs text-white/50">
                                            <MessageCircle className="h-3 w-3" aria-hidden="true" />
                                            {locale === "es" ? "Orientación opcional" : "Optional guidance"}
                                        </span>
                                    )}
                                </span>
                                <ArrowRight className="h-4 w-4 text-white/40" aria-hidden="true" />
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="hidden lg:block">
                    <div className="sticky top-24">
                        <PlaybookNav playbookTitle={extractString(playbook.title, locale)} chapters={chapters} locale={locale} basePath={basePath} />
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}

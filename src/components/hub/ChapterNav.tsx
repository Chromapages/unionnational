"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { useState } from "react";

interface Chapter {
    _id: string;
    title: string;
    slug: string;
    chapterNumber: number;
    isGated?: boolean;
}

interface ChapterNavProps {
    chapters: Chapter[];
    currentChapterSlug: string;
    playbookTitle: string;
    className?: string;
}

export function ChapterNav({ chapters, currentChapterSlug, playbookTitle, className }: ChapterNavProps) {
    const [isOpen, setIsOpen] = useState(false);
    const currentIndex = chapters.findIndex((c) => c.slug === currentChapterSlug);
    const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
    const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className={cn(
                    "lg:hidden fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-gold-500 px-4 py-3 text-sm font-semibold text-brand-950 shadow-lg hover:bg-gold-400 transition-all",
                    className
                )}
            >
                <Menu className="h-4 w-4" />
                Chapters
            </button>

            {isOpen && (
                <div className="lg:hidden fixed inset-0 z-50 bg-brand-950/95 backdrop-blur-sm">
                    <div className="flex h-full flex-col">
                        <div className="flex items-center justify-between border-b border-white/10 p-4">
                            <span className="text-sm font-bold uppercase tracking-[0.2em] text-gold-400">
                                {playbookTitle}
                            </span>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="rounded-full p-2 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                            {chapters.map((chapter) => (
                                <Link
                                    key={chapter._id}
                                    href={`/hub/s-corp-playbook/${chapter.slug}`}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-all",
                                        chapter.slug === currentChapterSlug
                                            ? "bg-gold-500/20 text-gold-200"
                                            : "text-white/70 hover:bg-white/5 hover:text-white"
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                                            chapter.slug === currentChapterSlug
                                                ? "bg-gold-500 text-brand-950"
                                                : "bg-white/10 text-white/50"
                                        )}
                                    >
                                        {chapter.chapterNumber}
                                    </span>
                                    <span className="flex-1 line-clamp-1">{chapter.title}</span>
                                </Link>
                            ))}
                        </nav>

                        <div className="border-t border-white/10 p-4">
                            <div className="flex items-center justify-between">
                                {prevChapter ? (
                                    <Link
                                        href={`/hub/s-corp-playbook/${prevChapter.slug}`}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-1 text-sm text-white/60 hover:text-gold-200"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                        Previous
                                    </Link>
                                ) : (
                                    <div />
                                )}
                                {nextChapter && (
                                    <Link
                                        href={`/hub/s-corp-playbook/${nextChapter.slug}`}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-1 text-sm text-white/60 hover:text-gold-200"
                                    >
                                        Next
                                        <ChevronRight className="h-4 w-4" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

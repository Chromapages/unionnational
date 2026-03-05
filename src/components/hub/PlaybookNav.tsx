"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronRight, Lock, BookOpen } from "lucide-react";
import { extractString } from "@/lib/utils";

interface Chapter {
    _id: string;
    title: string;
    slug: string;
    chapterNumber: number;
    isGated?: boolean;
}

interface PlaybookNavProps {
    playbookTitle: string;
    chapters: Chapter[];
    currentChapterSlug?: string;
    className?: string;
    locale: string;
}

export function PlaybookNav({ playbookTitle, chapters, currentChapterSlug, className, locale }: PlaybookNavProps) {
    const pathname = usePathname();

    return (
        <nav className={cn("rounded-2xl border border-white/10 bg-brand-950/60 p-6", className)}>
            <div className="mb-6">
                <Link
                    href="/hub/s-corp-playbook"
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold-400 transition-colors hover:text-gold-300"
                >
                    <BookOpen className="h-4 w-4" />
                    {playbookTitle}
                </Link>
            </div>

            <div className="space-y-1">
                {chapters.map((chapter, index) => {
                    const isActive = currentChapterSlug === chapter.slug;
                    const chapterHref = `/hub/s-corp-playbook/${chapter.slug}`;

                    return (
                        <Link
                            key={chapter._id}
                            href={chapterHref}
                            className={cn(
                                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                                isActive
                                    ? "bg-gold-500/20 text-gold-200"
                                    : "text-white/70 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <span
                                className={cn(
                                    "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                                    isActive
                                        ? "bg-gold-500 text-brand-950"
                                        : "bg-white/10 text-white/50 group-hover:bg-white/20"
                                )}
                            >
                                {chapter.chapterNumber}
                            </span>
                            <span className="flex-1 line-clamp-1">{extractString(chapter.title, locale)}</span>
                            {chapter.isGated ? (
                                <Lock className="h-3.5 w-3.5 text-white/30" />
                            ) : (
                                <ChevronRight
                                    className={cn(
                                        "h-3.5 w-3.5 text-white/30 transition-transform duration-200",
                                        isActive && "rotate-90",
                                        "group-hover:translate-x-0.5"
                                    )}
                                />
                            )}
                        </Link>
                    );
                })}
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs text-white/50">
                    {chapters.length} chapters • Complete guide
                </p>
            </div>
        </nav>
    );
}

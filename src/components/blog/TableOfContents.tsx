"use client";

import { useEffect, useMemo, useState } from "react";
import { HeadingItem } from "./richTextUtils";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
    headings: HeadingItem[];
    className?: string;
}

export function TableOfContents({ headings, className }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string | null>(headings[0]?.id || null);

    const headingIds = useMemo(() => headings.map((heading) => heading.id), [headings]);

    useEffect(() => {
        if (headingIds.length === 0) return;

        const elements = headingIds
            .map((id) => document.getElementById(id))
            .filter((element): element is HTMLElement => Boolean(element));

        if (elements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "-30% 0px -60% 0px" }
        );

        elements.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, [headingIds]);

    if (headings.length === 0) return null;

    return (
        <nav
            className={cn(
                "rounded-3xl border border-brand-100/70 bg-white/90 p-6 shadow-lg shadow-brand-900/5 backdrop-blur",
                className
            )}
        >
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-brand-900/50 font-sans">
                Table of Contents
            </div>
            <div className="mt-4 space-y-3 text-sm font-sans">
                {headings.map((heading) => (
                    <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className={cn(
                            "block transition-colors",
                            heading.level === 3 ? "pl-4" : "pl-0",
                            activeId === heading.id
                                ? "text-gold-600 font-semibold"
                                : "text-brand-900/60 hover:text-brand-900"
                        )}
                    >
                        {heading.text}
                    </a>
                ))}
            </div>
        </nav>
    );
}

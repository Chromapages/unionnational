"use client";

import type { MouseEvent } from "react";

export function SkipLink({ label }: { label: string }) {
    const skip = (event: MouseEvent<HTMLAnchorElement>) => {
        const main = document.getElementById("main-content");
        if (!main) return;
        event.preventDefault();
        main.tabIndex = -1;
        main.focus({ preventScroll: true });
        main.scrollIntoView();
    };

    return (
        <a
            href="#main-content"
            onClick={skip}
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[1250] focus:inline-flex focus:min-h-11 focus:items-center focus:bg-gold-500 focus:text-brand-900 focus:px-4 focus:py-2 focus:rounded-lg"
        >
            {label}
        </a>
    );
}

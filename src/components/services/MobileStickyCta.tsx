"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type MobileStickyCtaProps = {
    anchorId: string;
    href: string;
    label: string;
};

export function MobileStickyCta({ anchorId, href, label }: MobileStickyCtaProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const anchor = document.getElementById(anchorId);
        const footer = document.getElementById("site-footer");
        if (!anchor) return;

        let anchorIsVisible = true;
        let footerIsVisible = false;
        const updateVisibility = () => setIsVisible(!anchorIsVisible && !footerIsVisible);

        const anchorObserver = new IntersectionObserver(([entry]) => {
            anchorIsVisible = entry.isIntersecting;
            updateVisibility();
        });
        anchorObserver.observe(anchor);

        const footerObserver = new IntersectionObserver(([entry]) => {
                footerIsVisible = entry.isIntersecting;
                updateVisibility();
            }, { rootMargin: "0px 0px -72px" });
        if (footer) footerObserver.observe(footer);

        return () => {
            anchorObserver.disconnect();
            footerObserver.disconnect();
        };
    }, [anchorId]);

    return (
        <div data-mobile-sticky-cta className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-brand-950/95 p-3 backdrop-blur md:hidden ${isVisible ? "flex" : "hidden"}`}>
            <Link
                href={href}
                className="flex min-h-12 w-full items-center justify-center rounded-md bg-gold-500 px-5 font-heading font-bold text-brand-900 transition-colors hover:bg-gold-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
            >
                {label}
            </Link>
        </div>
    );
}

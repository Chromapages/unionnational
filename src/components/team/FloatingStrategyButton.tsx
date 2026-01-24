"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface FloatingStrategyButtonProps {
    afterSectionId: string;
    href: string;
    label?: string;
}

export function FloatingStrategyButton({ afterSectionId, href, label = "Book Strategy Session" }: FloatingStrategyButtonProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = document.getElementById(afterSectionId);
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Only show once the sentinel has moved above the viewport.
                // (Not intersecting can also mean "below the fold" when you're at the top.)
                if (entry.isIntersecting) {
                    setVisible(false);
                    return;
                }
                setVisible(entry.boundingClientRect.top < 0);
            },
            { root: null, threshold: 0 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [afterSectionId]);

    return (
        <div
            className={
                "fixed bottom-6 right-6 z-[1300] transition-all duration-300 " +
                (visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none")
            }
        >
            <Link
                href={href}
                className="group inline-flex items-center gap-2 rounded-full bg-gold-500 text-brand-900 px-5 py-3 font-bold shadow-xl shadow-black/20 hover:bg-gold-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
            >
                {label}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
        </div>
    );
}

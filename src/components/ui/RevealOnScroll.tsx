"use client";

import { useEffect, useRef, ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealOnScrollProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    delay?: number; // delay in ms
}

// Custom hook to detect media query match
function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        window.addEventListener("resize", listener);
        media.addEventListener("change", listener); // Standard way to listen
        return () => {
            window.removeEventListener("resize", listener);
            media.removeEventListener("change", listener);
        };
    }, [matches, query]);

    return matches;
}

export function RevealOnScroll({ children, className, delay = 0, ...props }: RevealOnScrollProps) {
    const ref = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

    useEffect(() => {
        if (prefersReducedMotion || !ref.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Add a small delay if specified
                        setTimeout(() => {
                            entry.target.classList.add("active");
                        }, delay);
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px",
            }
        );

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [delay, prefersReducedMotion]);

    // If reduced motion is preferred, render without the 'reveal' class so it's always visible (assuming base styles handle non-reveal state correctly or we override)
    // Actually, usually 'reveal' class sets opacity: 0. We should probably just add 'active' immediately or not use 'reveal' class.
    // Let's assume 'reveal' sets initial hidden state. We'll simply NOT apply 'reveal' if reduced motion.

    return (
        <div
            ref={ref}
            className={cn(prefersReducedMotion ? "" : "reveal", className)}
            {...props}
        >
            {children}
        </div>
    );
}

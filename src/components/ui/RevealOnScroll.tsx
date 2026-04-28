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
    const [mounted, setMounted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || prefersReducedMotion || !ref.current) return;

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
    }, [delay, prefersReducedMotion, mounted]);

    // During hydration and initial render, we want to match the server output.
    // On the server, prefersReducedMotion (from useState(false)) is false.
    // So we render "reveal" on server and initial client render.
    // Once mounted and effect runs, if prefersReducedMotion is true, we'd remove it.
    // But usually we just want it to NOT animate.
    
    return (
        <div
            ref={ref}
            className={cn(
                (!mounted || !prefersReducedMotion) ? "reveal" : "", 
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

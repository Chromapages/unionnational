"use client";

import { useEffect, useRef, ReactNode, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

interface RevealOnScrollProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    delay?: number;
}

const noopSubscribe = () => () => {};

function useHydrated(): boolean {
    return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

function subscribeToMediaQuery(query: string, callback: () => void): () => void {
    const media = window.matchMedia(query);
    media.addEventListener("change", callback);
    return () => media.removeEventListener("change", callback);
}

function getServerSnapshot(): boolean {
    return false;
}

function useMediaQuery(query: string): boolean {
    return useSyncExternalStore(
        (callback) => subscribeToMediaQuery(query, callback),
        () => window.matchMedia(query).matches,
        getServerSnapshot
    );
}

export function RevealOnScroll({ children, className, delay = 0, ...props }: RevealOnScrollProps) {
    const mounted = useHydrated();
    const ref = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

    useEffect(() => {
        if (!mounted || prefersReducedMotion || !ref.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
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

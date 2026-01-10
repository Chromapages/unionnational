"use client";

import { useEffect, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealOnScrollProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    delay?: number; // delay in ms
}

export function RevealOnScroll({ children, className, delay = 0, ...props }: RevealOnScrollProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
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

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [delay]);

    return (
        <div ref={ref} className={cn("reveal", className)} {...props}>
            {children}
        </div>
    );
}

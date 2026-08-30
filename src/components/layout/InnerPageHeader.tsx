import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InnerPageHeaderProps {
    title: ReactNode;
    description?: ReactNode;
    eyebrow?: ReactNode;
    metadata?: ReactNode;
    navigation?: ReactNode;
    headingId?: string;
    className?: string;
}

/**
 * Shared, server-rendered header for informational inner pages.
 * Keep campaign, product, service, and homepage heroes bespoke when they have
 * unique media, tools, or conversion mechanics.
 */
export function InnerPageHeader({
    title,
    description,
    eyebrow,
    metadata,
    navigation,
    headingId,
    className,
}: InnerPageHeaderProps) {
    return (
        <section className={cn("bg-brand-900 px-4 pb-7 pt-12 text-white sm:px-6 md:pb-8 md:pt-12", className)}>
            <div className="mx-auto max-w-screen-2xl">
                {navigation}
                <div className={cn("max-w-[54rem]", navigation && "mt-4")}>
                    {eyebrow ? <p className="text-sm font-semibold text-brand-100 md:text-base">{eyebrow}</p> : null}
                    <h1 id={headingId} className={cn("font-heading text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-[2.75rem]", eyebrow && "mt-3")}>
                        {title}
                    </h1>
                    {metadata ? <p className="mt-3 text-sm font-semibold text-brand-100 md:text-base">{metadata}</p> : null}
                    {description ? <p className="mt-4 max-w-[46rem] text-base leading-relaxed text-brand-100/80 md:text-lg">{description}</p> : null}
                </div>
            </div>
        </section>
    );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServicePageContainer } from "@/components/services/ServicePageContainer";
import type { ServicePage } from "@/types/sanity";

type ComparisonSectionProps = {
    comparison: ServicePage["comparison"];
    sectionId: string;
};

export function ComparisonSection({ comparison, sectionId }: ComparisonSectionProps) {
    if (!comparison.heading || !comparison.pairs?.length) return null;

    const headingId = `${sectionId}-heading`;
    return (
        <section id={sectionId} aria-labelledby={headingId} className="scroll-mt-[calc(var(--header-height)+1rem)] border-b border-zinc-200 bg-zinc-50 py-16 md:py-20">
            <ServicePageContainer className="max-w-[76.5rem]">
                <div className="grid items-start gap-10 min-[901px]:grid-cols-[minmax(300px,360px)_minmax(0,1fr)] min-[901px]:gap-[clamp(2rem,5vw,5rem)]">
                    <div className="max-w-xl min-[901px]:sticky min-[901px]:top-[6.5rem]">
                        {comparison.eyebrow && <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-800">{comparison.eyebrow}</p>}
                        <h2 id={headingId} className="mt-3 font-heading text-3xl font-bold tracking-tight text-brand-950 md:text-4xl">{comparison.heading}</h2>
                        {comparison.description && <p className="mt-5 text-base leading-relaxed text-zinc-700 md:text-lg">{comparison.description}</p>}
                        {comparison.href && comparison.linkLabel && (
                            <Link href={comparison.href} className="mt-7 hidden min-h-11 items-center gap-2 font-semibold text-brand-900 underline decoration-gold-600 underline-offset-4 transition-colors hover:text-gold-800 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-600 min-[901px]:inline-flex">
                                {comparison.linkLabel}
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                        )}
                    </div>

                    <div className="min-w-0">
                        <div className="space-y-5">
                            {comparison.pairs.map((pair, index) => (
                                <article key={`${pair.category || index}-${pair.problem}-${pair.solution}`} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_18px_45px_-38px_rgba(24,24,27,0.35)] sm:p-6">
                                    <h3 className="font-heading text-sm font-bold uppercase tracking-[0.08em] text-zinc-600">{pair.category || `Difference ${index + 1}`}</h3>
                                    <div className="mt-3 grid gap-3 min-[901px]:grid-cols-2">
                                        <div className="rounded-xl bg-zinc-100 px-4 py-3.5 text-zinc-600">
                                            <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-600">{comparison.withoutLabel}</p>
                                            <p className="mt-1.5 text-sm leading-relaxed sm:text-base">{pair.problem}</p>
                                        </div>
                                        <div className="rounded-xl border border-gold-200 bg-gold-50 px-4 py-3.5 text-brand-950">
                                            <p className="text-xs font-bold uppercase tracking-[0.12em] text-gold-900">{comparison.withLabel}</p>
                                            <p className="mt-1.5 text-sm font-semibold leading-relaxed sm:text-base">{pair.solution}</p>
                                        </div>
                                    </div>
                                    {pair.outcome && <p className="mt-4 border-t border-zinc-200 pt-3.5 text-[0.95rem] font-medium leading-relaxed text-zinc-700">{pair.outcome}</p>}
                                </article>
                            ))}
                        </div>

                        {(comparison.conclusion || (comparison.href && comparison.linkLabel)) && (
                            <div className="mt-8 border-t border-zinc-300 pt-7">
                                {comparison.conclusion && <p className="max-w-2xl font-heading text-xl font-bold leading-snug text-brand-950 md:text-2xl">{comparison.conclusion}</p>}
                                {comparison.href && comparison.linkLabel && (
                                    <Link href={comparison.href} className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-brand-900 underline decoration-gold-600 underline-offset-4 transition-colors hover:text-gold-800 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-600">
                                        {comparison.linkLabel}
                                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </ServicePageContainer>
        </section>
    );
}

import Link from "next/link";
import { ArrowRight, Check, CheckCircle2 } from "lucide-react";
import { ServicePageContainer } from "@/components/services/ServicePageContainer";
import type { ServicePage } from "@/types/sanity";

type QualificationCheckpointProps = {
    eligibility: NonNullable<ServicePage["eligibility"]>;
    sectionId: string;
};

export function QualificationCheckpoint({ eligibility, sectionId }: QualificationCheckpointProps) {
    const headingId = `${sectionId}-heading`;
    const primaryGroup = eligibility.primaryGroup;
    const secondaryGroup = eligibility.secondaryGroup;
    const hasGroupedContent = Boolean(
        primaryGroup?.heading
        && primaryGroup.items?.length
        && secondaryGroup?.heading
        && secondaryGroup.items?.length,
    );

    if (!eligibility.heading) return null;

    const qualificationCta = eligibility.cta?.label && eligibility.cta.href ? (
        <div className="flex max-w-sm flex-col items-start gap-3">
            <Link href={eligibility.cta.href} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-brand-900 px-6 py-3 font-heading font-bold text-white transition-colors hover:bg-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-600">
                {eligibility.cta.label}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            {eligibility.cta.microcopy && <p className="text-sm leading-relaxed text-zinc-600">{eligibility.cta.microcopy}</p>}
        </div>
    ) : null;

    if (!hasGroupedContent) {
        if (!eligibility.items?.length) return null;

        return (
            <section id={sectionId} aria-labelledby={headingId} className="scroll-mt-[calc(var(--header-height)+1rem)] border-b border-zinc-200 bg-white py-12 md:py-16">
                <ServicePageContainer>
                    <div className="mx-auto max-w-4xl">
                        {eligibility.eyebrow && <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-800">{eligibility.eyebrow}</p>}
                        <h2 id={headingId} className="mt-3 font-heading text-3xl font-bold tracking-tight text-brand-900 md:text-4xl">{eligibility.heading}</h2>
                        {eligibility.description && <p className="mt-5 max-w-3xl text-base leading-relaxed text-zinc-700 md:text-lg">{eligibility.description}</p>}
                        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                            {eligibility.items.map((item) => (
                                <li key={item} className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm leading-relaxed text-zinc-700">
                                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" aria-hidden="true" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </ServicePageContainer>
            </section>
        );
    }

    return (
        <section id={sectionId} aria-labelledby={headingId} className="scroll-mt-[calc(var(--header-height)+1rem)] border-b border-zinc-200 bg-white py-16 min-[1180px]:py-24">
            <ServicePageContainer className="max-w-[78rem]">
                <div className="grid items-start gap-10 min-[1180px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] min-[1180px]:gap-16">
                    <div className="max-w-[34rem] min-[1180px]:sticky min-[1180px]:top-[6.5rem]">
                        {eligibility.eyebrow && <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-800">{eligibility.eyebrow}</p>}
                        <h2 id={headingId} className="mt-3 font-heading text-3xl font-bold tracking-tight text-brand-900 md:text-4xl">{eligibility.heading}</h2>
                        {eligibility.badge && <p className="mt-5 inline-flex rounded-full border border-gold-300 bg-gold-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-gold-900">{eligibility.badge}</p>}
                        {eligibility.description && <p className="mt-5 max-w-[32rem] text-base leading-relaxed text-zinc-700 md:text-lg">{eligibility.description}</p>}
                        {qualificationCta && <div className="mt-8 hidden min-[1180px]:block">{qualificationCta}</div>}
                    </div>

                    <div className="grid min-w-0 gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border border-gold-300 bg-gold-50 p-6 shadow-[0_18px_45px_-32px_rgba(113,82,11,0.55)]">
                            <h3 className="font-heading text-xl font-bold text-brand-900">{primaryGroup!.heading}</h3>
                            <ul className="mt-5 divide-y divide-gold-200">
                                {primaryGroup!.items!.map((item, index) => (
                                    <li key={item} className={`flex items-start gap-3 py-4 first:pt-0 last:pb-0 ${index === 0 ? "font-semibold text-brand-900" : "text-zinc-700"}`}>
                                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500 text-brand-950" aria-hidden="true"><Check className="h-4 w-4" strokeWidth={2.5} /></span>
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_18px_45px_-36px_rgba(24,24,27,0.4)]">
                            <h3 className="font-heading text-xl font-bold text-brand-900">{secondaryGroup!.heading}</h3>
                            <ul className="mt-5 divide-y divide-zinc-200">
                                {secondaryGroup!.items!.map((item) => (
                                    <li key={item} className="flex items-start gap-3 py-4 text-zinc-700 first:pt-0 last:pb-0">
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" aria-hidden="true" />
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {eligibility.disqualifier && (
                            <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-100 p-6 md:col-span-2">
                                {eligibility.disqualifierHeading && <h3 className="font-heading text-lg font-bold text-brand-900">{eligibility.disqualifierHeading}</h3>}
                                <p className={`${eligibility.disqualifierHeading ? "mt-2" : ""} max-w-2xl text-sm leading-relaxed text-zinc-700`}>
                                    {eligibility.disqualifier}
                                </p>
                            </div>
                        )}

                        {qualificationCta && (
                            <div className="mt-4 border-t border-zinc-200 pt-8 md:col-span-2 min-[1180px]:hidden">
                                {qualificationCta}
                            </div>
                        )}
                    </div>
                </div>
            </ServicePageContainer>
        </section>
    );
}

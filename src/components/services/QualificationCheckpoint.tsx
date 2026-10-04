import { Link } from "@/i18n/navigation";
import { ArrowRight, ChartNoAxesColumnIncreasing, FileText, ShieldCheck, UserRound } from "lucide-react";
import type { ServicePage } from "@/types/sanity";

type FitCard = { title: string; detail?: string };
type QualificationCheckpointProps = {
    eligibility: NonNullable<ServicePage["eligibility"]>;
    sectionId: string;
    heading?: React.ReactNode;
    cards?: FitCard[];
};

const fitIcons = [ChartNoAxesColumnIncreasing, FileText, UserRound, ShieldCheck];

export function QualificationCheckpoint({ eligibility, sectionId, heading, cards }: QualificationCheckpointProps) {
    const headingId = sectionId + "-heading";
    const primaryGroup = eligibility.primaryGroup;
    const secondaryGroup = eligibility.secondaryGroup;
    const hasGroupedContent = !cards?.length && Boolean(
        primaryGroup?.heading && primaryGroup.items?.length
        && secondaryGroup?.heading && secondaryGroup.items?.length,
    );
    const flatCards = cards || (eligibility.items || []).map(title => ({ title }));
    if (!eligibility.heading || (!hasGroupedContent && !flatCards.length)) return null;

    const renderCards = (items: FitCard[], offset = 0) => (
        <ol start={offset + 1} className="grid auto-rows-fr gap-4 md:grid-cols-2">
            {items.map((item, index) => {
                const Icon = fitIcons[(index + offset) % fitIcons.length];
                return <li key={index + "-" + item.title} className="flex min-w-0 items-start gap-5 rounded-xl border border-slate-200 bg-brand-50/15 p-5 sm:gap-7 sm:p-7">
                    <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-brand-50/70 text-brand-500 sm:size-20" aria-hidden="true"><Icon className="size-8 sm:size-10" strokeWidth={1.5} /></span>
                    <div className="min-w-0"><p className="font-heading text-xl font-bold tabular-nums text-gold-700 sm:text-2xl" aria-hidden="true">{String(index + offset + 1).padStart(2, "0")}</p><h3 className="mt-2 font-heading text-xl font-bold leading-snug tracking-tight text-brand-950 sm:text-2xl">{item.title}</h3>{item.detail && <p className="mt-2 text-base leading-relaxed text-slate-700 sm:text-lg">{item.detail}</p>}</div>
                </li>;
            })}
        </ol>
    );

    return (
        <section id={sectionId} data-service-suitability aria-labelledby={headingId} className="scroll-mt-[calc(var(--header-height)+1rem)] bg-white py-10 lg:py-12">
            <div className="mx-auto w-full max-w-[94rem] px-4 sm:px-6 lg:px-8">
                {eligibility.eyebrow && <p className="flex items-center gap-4 font-heading text-sm font-bold uppercase tracking-[.14em] text-brand-500"><span className="h-px w-10 bg-gold-600" aria-hidden="true" />{eligibility.eyebrow}</p>}
                <h2 id={headingId} className="mt-5 font-heading text-3xl font-bold leading-[1.12] tracking-[-.025em] text-brand-950 sm:text-4xl lg:text-[2.75rem]">{heading || eligibility.heading}</h2>
                {hasGroupedContent && eligibility.badge && <p className="mt-4 inline-flex rounded-lg border border-gold-300 bg-gold-50 px-3 py-2 text-sm font-semibold text-gold-900">{eligibility.badge}</p>}
                {eligibility.description && <p className="mt-5 max-w-[85ch] text-base leading-relaxed text-slate-700 sm:text-xl">{eligibility.description}</p>}
                <div className="mt-8">
                    {hasGroupedContent ? <>
                        <h3 className="mb-5 font-heading text-2xl font-bold text-brand-950">{primaryGroup!.heading}</h3>
                        {renderCards(primaryGroup!.items!.map(title => ({ title })))}
                        <h3 className="mb-5 mt-8 font-heading text-2xl font-bold text-brand-950">{secondaryGroup!.heading}</h3>
                        {renderCards(secondaryGroup!.items!.map(title => ({ title })), primaryGroup!.items!.length)}
                    </> : renderCards(flatCards)}
                </div>
                {hasGroupedContent && eligibility.disqualifier && <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6">{eligibility.disqualifierHeading && <h3 className="font-heading text-lg font-bold text-brand-950">{eligibility.disqualifierHeading}</h3>}<p className="mt-2 text-base leading-relaxed text-slate-700">{eligibility.disqualifier}</p></div>}
                {eligibility.cta?.label && eligibility.cta.href && <div className="mt-7 flex flex-col items-center text-center"><Link href={eligibility.cta.href} className="inline-flex min-h-11 max-w-full items-center justify-center gap-5 rounded-sm font-heading text-base font-semibold text-brand-500 underline decoration-gold-600 underline-offset-8 hover:text-brand-700 active:text-brand-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-700 sm:text-lg"><span className="min-w-0">{eligibility.cta.label}</span><ArrowRight className="size-6 shrink-0 text-gold-600" aria-hidden="true" /></Link>{eligibility.cta.microcopy && <p className="mt-2 text-sm leading-relaxed text-slate-700">{eligibility.cta.microcopy}</p>}</div>}
            </div>
        </section>
    );
}

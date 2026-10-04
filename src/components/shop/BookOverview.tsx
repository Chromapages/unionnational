"use client";

import { useLocale, useTranslations } from "next-intl";
import { Users, Tag, Settings, ChartNoAxesColumnIncreasing, BookOpen, ArrowRight } from "lucide-react";
import { extractString } from "@/lib/utils";

interface BookOverviewProps {
    features?: unknown[] | null;
    summaryBullets?: string[];
    growthGuide?: boolean;
    shortDescription?: string;
    learningObjectives?: Array<{ title?: string; description?: string }> | null;
}

const topicIcons = [Users, Tag, Settings];
const backgroundIcons = [ChartNoAxesColumnIncreasing, Tag, Settings];

export function BookOverview({ features = [], summaryBullets = [], growthGuide = false, learningObjectives = [] }: BookOverviewProps) {
    const locale = useLocale();
    const t = useTranslations("Shop.ProductPage");
    const sourceFeatures = (features || []).map(feature => extractString(feature, locale).trim())
        .filter(feature => feature && !/^(localizedString|localizedText)$/.test(feature));
    const objectives = (learningObjectives || []).filter(objective => objective && typeof objective.title === "string" && objective.title.trim() && typeof objective.description === "string" && objective.description.trim());
    const primaryPoints = summaryBullets.length ? summaryBullets : sourceFeatures.slice(0, 3);
    const takeaways = summaryBullets.length ? sourceFeatures : sourceFeatures.slice(primaryPoints.length);
    if (!primaryPoints.length && !objectives.length) return null;

    return <section id="what-youll-learn" aria-labelledby="book-learning-heading" className="scroll-mt-28 border-b border-slate-200 bg-white py-10 lg:py-12">
        <div className="mx-auto w-full max-w-[94rem] px-4 sm:px-6 lg:px-8">
            <header>
                <p className="flex items-center gap-4 font-heading text-sm font-bold uppercase tracking-[.1em] text-gold-700 after:h-px after:w-16 after:shrink-0 after:bg-gold-600">{t("learnTitle")}</p>
                <h2 id="book-learning-heading" className="mt-4 font-heading text-3xl font-bold leading-[1.12] tracking-[-.025em] text-brand-900 sm:text-4xl lg:text-[2.75rem]">{growthGuide ? t("coverage.headline") : t("learnTitle")}</h2>
                {growthGuide && <p className="mt-3 max-w-[58ch] text-base leading-relaxed text-slate-700 sm:text-xl">{t("coverage.intro")}</p>}
            </header>

            {primaryPoints.length > 0 && <ul data-book-summary className="mt-7 grid items-stretch gap-5 lg:grid-cols-3 lg:gap-6">
                {primaryPoints.map((point, index) => {
                    const Icon = topicIcons[index % topicIcons.length];
                    const BackgroundIcon = backgroundIcons[index % backgroundIcons.length];
                    return <li key={point} className="relative flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-gold-50/20 p-6 shadow-sm">
                        <BackgroundIcon className="pointer-events-none absolute right-4 top-9 size-32 text-brand-100 opacity-15 xl:size-40" aria-hidden="true" strokeWidth={1.75} />
                        <div className="relative flex items-center gap-5">
                            <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-500"><Icon className="size-8" aria-hidden="true" /></span>
                            <div><p className="font-data text-xl font-bold tabular-nums text-gold-700">{String(index + 1).padStart(2, "0")}</p>{growthGuide && <p className="mt-1 font-heading text-xs font-semibold uppercase tracking-[.1em] text-slate-700 sm:text-sm">{t("coverage.cards." + index + ".label")}</p>}</div>
                        </div>
                        <h3 className="relative mt-5 font-heading text-2xl font-bold leading-[1.18] tracking-tight text-brand-900">{point}</h3>
                        {growthGuide && <>
                            <p className="relative mt-4 text-base leading-relaxed text-slate-700 xl:text-lg">{t("coverage.cards." + index + ".description")}</p>
                            <p className="relative mt-auto flex items-center gap-4 pt-7 font-heading text-xs font-semibold uppercase tracking-[.15em] text-gold-700 after:h-px after:w-12 after:bg-gold-600 sm:text-sm">{t("coverage.cards." + index + ".outcome")}</p>
                        </>}
                    </li>;
                })}
            </ul>}

            {takeaways.length > 0 && <details className="group mt-5 overflow-hidden rounded-xl border border-brand-200 bg-brand-50/60">
                <summary className="flex min-h-14 cursor-pointer list-none items-center gap-4 rounded-xl px-5 py-5 text-brand-500 [&::-webkit-details-marker]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-gold-700 sm:gap-6 sm:px-8">
                    <BookOpen className="size-8 shrink-0 sm:size-10" aria-hidden="true" />
                    <span className="min-w-0 flex-1"><span className="block font-heading text-lg font-bold leading-snug sm:text-xl">{t("sourceTakeaways")}</span><span className="mt-1 block text-sm leading-relaxed text-slate-700 sm:text-base">{t("coverage.disclosureBody")}</span></span>
                    <ArrowRight className="size-6 shrink-0 group-open:rotate-90 sm:size-8" aria-hidden="true" />
                </summary>
                <ul data-publisher-takeaways className="mx-5 border-t border-brand-200 py-5 pl-5 text-base leading-relaxed text-slate-700 sm:mx-8">{takeaways.map(feature => <li key={feature} className="list-disc py-1.5">{feature}</li>)}</ul>
            </details>}
            {objectives.length > 0 && <details className="mt-5 rounded-xl border border-slate-200 px-5">
                <summary className="min-h-11 cursor-pointer rounded-sm py-4 font-heading font-semibold text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-700">{t("sourceObjectives")}</summary>
                <ul className="mb-5 space-y-3">{objectives.map(objective => <li key={objective.title} className="text-base leading-relaxed text-slate-700"><strong>{objective.title}</strong>{" "}{objective.description}</li>)}</ul>
            </details>}
        </div>
    </section>;
}

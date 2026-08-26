import React from "react";
import { ArrowRight, RefreshCw } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export interface HowItWorksStep {
    id: number;
    title: string;
    description: string;
    outcomeLabel?: string;
    outcomeValue: string;
}

export interface HowItWorksSectionProps {
    steps?: HowItWorksStep[];
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    ctaText?: string;
    ctaHref?: string;
    ctaSupport?: string;
    cadenceLoop?: string;
    swipeHint?: string;
    listLabel?: string;
}

const defaultStepKeys = ["start", "opportunities", "plan"] as const;

export const HowItWorksSection = async (
    props: HowItWorksSectionProps = {}
): Promise<React.JSX.Element> => {
    const t = await getTranslations("HomePage.HowItWorksSection");

    const resolvedEyebrow = props.eyebrow || t("eyebrow");
    const resolvedTitle = props.title || t("title");
    const resolvedSubtitle = props.subtitle || t("subtitle");
    const resolvedCtaText = props.ctaText || t("cta");
    const resolvedCtaHref = props.ctaHref || "/book";
    const resolvedCtaSupport = props.ctaSupport || t("ctaSupport");
    const resolvedCadenceLoop = props.cadenceLoop || t("cadenceLoop");
    const resolvedSwipeHint = props.swipeHint || t("swipeHint");
    const resolvedListLabel = props.listLabel || t("listLabel");
    const resolvedOutcomeLabel = t("outcomeLabel");

    const stepsList: HowItWorksStep[] =
        props.steps && props.steps.length > 0
            ? props.steps
            : defaultStepKeys.map((key, index) => ({
                  id: index + 1,
                  title: t(`steps.${key}.title`),
                  description: t(`steps.${key}.description`),
                  outcomeLabel: resolvedOutcomeLabel,
                  outcomeValue: t(`steps.${key}.outcome`),
              }));

    return (
        <section
            id="how-it-works"
            className="bg-white py-14 sm:py-20 lg:py-24"
            aria-labelledby="how-it-works-heading"
            data-analytics="how_it_works_section"
            data-section="how-it-works"
        >
            <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-6">
                <div className="grid grid-cols-1 items-start gap-10 sm:gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-20 xl:gap-24">
                    {/* Left Column: Heading & Sticky CTA (Shared top baseline on desktop) */}
                    <div className="max-w-xl lg:sticky lg:top-28">
                        <p className="home-eyebrow text-gold-800">{resolvedEyebrow}</p>
                        <h2
                            id="how-it-works-heading"
                            className="home-section-heading mt-3.5 sm:mt-4 text-brand-900"
                        >
                            {resolvedTitle}
                        </h2>
                        <p className="home-supporting-copy mt-4 sm:mt-6 text-slate-700">{resolvedSubtitle}</p>

                        <Link
                            href={resolvedCtaHref}
                            className="group mt-7 sm:mt-8 inline-flex min-h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-brand-900 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                            data-analytics="how_it_works_cta_click"
                            data-cta-placement="how_it_works_section"
                            data-cta-destination={resolvedCtaHref}
                        >
                            <span>{resolvedCtaText}</span>
                            <ArrowRight
                                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                                aria-hidden="true"
                            />
                        </Link>
                        <p className="mt-3.5 w-full max-w-sm text-xs leading-relaxed text-slate-600 sm:max-w-[18.5rem] sm:text-sm">
                            {resolvedCtaSupport}
                        </p>
                    </div>

                    {/* Right Column: Timeline Cards (Swipeable Carousel on Mobile) & Cadence Loop */}
                    <div className="w-full min-w-0">
                        {/* Mobile Swipe Hint Cue */}
                        <div
                            className="flex items-center justify-between pb-3 sm:hidden text-xs text-slate-500 font-medium"
                            aria-hidden="true"
                        >
                            <span className="inline-flex items-center gap-1.5 text-slate-600">
                                <ArrowRight className="h-3.5 w-3.5 text-gold-700 animate-pulse" />
                                {resolvedSwipeHint}
                            </span>
                            <span className="font-mono text-slate-400">
                                1–{stepsList.length}
                            </span>
                        </div>

                        <ol
                            className="relative flex overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-4 gap-4 no-scrollbar sm:flex-col sm:overflow-visible sm:mx-0 sm:px-0 sm:pb-0 sm:gap-0"
                            aria-label={resolvedListLabel}
                        >
                            {stepsList.map((step, index) => {
                                const isLast = index === stepsList.length - 1;
                                const stepNumber = step.id || index + 1;
                                const stepOutcomeLabel = step.outcomeLabel || resolvedOutcomeLabel;

                                return (
                                    <li
                                        key={step.id || index}
                                        className="relative flex shrink-0 snap-center w-[85vw] max-w-[340px] sm:w-full sm:max-w-none items-start gap-0 sm:gap-8 pb-0 sm:pb-8 last:pb-0"
                                    >
                                        {/* Desktop/Tablet Badge Column with Dynamic Connecting Line */}
                                        <div className="relative hidden sm:flex shrink-0 flex-col items-center">
                                            <span
                                                className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-brand-900 font-heading text-sm font-bold text-gold-300 shadow-[0_10px_24px_-14px_rgba(3,16,14,0.7)] sm:h-14 sm:w-14 sm:text-base"
                                                aria-hidden="true"
                                            >
                                                {String(stepNumber).padStart(2, "0")}
                                            </span>
                                            {!isLast ? (
                                                <div
                                                    className="absolute top-6 bottom-[-1.5rem] w-px bg-gold-300 sm:top-7 sm:bottom-[-2rem]"
                                                    aria-hidden="true"
                                                />
                                            ) : null}
                                        </div>

                                        {/* Content Card with Consistent Internal Rhythm */}
                                        <div className="flex min-w-0 w-full flex-1 flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-8 min-h-[190px] sm:min-h-[200px] shadow-[0_18px_42px_-36px_rgba(24,24,27,0.4)]">
                                            <div>
                                                <div className="flex items-center gap-3">
                                                    {/* Mobile Badge: Inline with Heading */}
                                                    <span
                                                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-white bg-brand-900 font-heading text-xs font-bold text-gold-300 shadow-sm sm:hidden"
                                                        aria-hidden="true"
                                                    >
                                                        {String(stepNumber).padStart(2, "0")}
                                                    </span>
                                                    <h3 className="home-card-heading text-brand-900 break-words">
                                                        <span className="sr-only">
                                                            {t("stepLabel", {
                                                                number: stepNumber,
                                                                total: stepsList.length,
                                                            })}
                                                            :{" "}
                                                        </span>
                                                        {step.title}
                                                    </h3>
                                                </div>
                                                <p className="mt-2.5 text-sm leading-relaxed text-slate-700 sm:text-base break-words">
                                                    {step.description}
                                                </p>
                                            </div>

                                            {/* Semantic Outcome Definition List */}
                                            <div className="mt-5 border-t border-slate-200 pt-4">
                                                <dl className="flex flex-wrap items-baseline gap-x-2 text-sm leading-relaxed">
                                                    <dt className="font-bold uppercase tracking-[0.08em] text-brand-950">
                                                        {stepOutcomeLabel}:
                                                    </dt>
                                                    <dd className="text-slate-800 break-words">
                                                        {step.outcomeValue}
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ol>

                        {/* Closing Loop: Cadence Reiteration */}
                        <div className="mt-4 sm:mt-8 flex items-start gap-3.5 rounded-xl border border-gold-200/80 bg-gold-50/70 p-4 sm:p-5 text-xs sm:text-sm text-brand-900 shadow-sm">
                            <RefreshCw className="mt-0.5 h-4 w-4 shrink-0 text-gold-700 sm:h-5 sm:w-5" aria-hidden="true" />
                            <p className="leading-relaxed font-medium">
                                {resolvedCadenceLoop}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


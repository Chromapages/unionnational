import React from "react";
import {
    ArrowRight,
    RefreshCw,
    Clock,
    FileText,
    UserCheck,
    Check,
    BarChart3,
    CheckSquare,
    MessageCircleMore,
    Settings,
    MapPinned,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export interface HowItWorksStep {
    id: number;
    title: string;
    description: string;
    outcomeLabel?: string;
    outcomeValue: string;
    eyebrow?: string;
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

const defaultWhyItWorksPoints = [
    "Understand your current tax position",
    "Identify opportunities before deadlines",
    "Get a clear, actionable plan",
    "Keep your strategy current year-round",
];

const getStepIcon = (index: number) => {
    switch (index) {
        case 0:
            return FileText;
        case 1:
            return MapPinned;
        case 2:
            return CheckSquare;
        default:
            return FileText;
    }
};

const getStageIcon = (index: number) => [MessageCircleMore, BarChart3, Settings][index] ?? MessageCircleMore;

export const HowItWorksSection = async (
    props: HowItWorksSectionProps = {}
): Promise<React.JSX.Element> => {
    const t = await getTranslations("HomePage.HowItWorksSection");

    const resolvedEyebrow = props.eyebrow || t("eyebrow");
    const resolvedTitle = props.title || t("title");
    const resolvedSubtitle = props.subtitle || t("subtitle");
    const resolvedCtaText = props.ctaText || t("cta");
    const resolvedCtaHref = props.ctaHref || "/book";
    const resolvedCadenceLoop = props.cadenceLoop || t("cadenceLoop");
    const resolvedSwipeHint = props.swipeHint || t("swipeHint");
    const resolvedListLabel = props.listLabel || t("listLabel");
    const resolvedOutcomeLabel = t("outcomeLabel");
    const desktopOutcomeLabel = t("desktopOutcomeLabel");
    const planningPathEyebrow = t("planningPathEyebrow");
    const planningPathTagline = t("planningPathTagline");
    const desktopCadenceEyebrow = t("desktopCadenceEyebrow");
    const cadenceSupport = t("cadenceSupport");

    const metaDuration = t("metaDuration") !== "metaDuration" ? t("metaDuration") : "30 minutes";
    const metaPrep = t("metaPrep") !== "metaPrep" ? t("metaPrep") : "No preparation required";
    const metaAdvisor = t("metaAdvisor") !== "metaAdvisor" ? t("metaAdvisor") : "Direct with an Enrolled Agent";
    const whyItWorksEyebrow = t("whyItWorksEyebrow") !== "whyItWorksEyebrow" ? t("whyItWorksEyebrow") : "Why it works";
    const whyItWorksTitle = t("whyItWorksTitle") !== "whyItWorksTitle" ? t("whyItWorksTitle") : "More clarity. More options. Fewer last-minute decisions.";
    const cadenceEyebrow = t("cadenceEyebrow") !== "cadenceEyebrow" ? t("cadenceEyebrow") : "Ongoing cadence";
    const cadenceTitle = t("cadenceTitle") !== "cadenceTitle" ? t("cadenceTitle") : "Review. Adjust. Repeat.";
    const cadenceDescription = t("cadenceDescription") !== "cadenceDescription" ? t("cadenceDescription") : "We revisit your numbers every quarter to adapt your strategy as revenue, operations, and tax laws evolve.";
    const cadenceTagline = t("cadenceTagline") !== "cadenceTagline" ? t("cadenceTagline") : "A plan that stays with you.";

    const stepsList: HowItWorksStep[] =
        props.steps && props.steps.length > 0
            ? props.steps
            : defaultStepKeys.map((key, index) => {
                  const rawEyebrow = t(`steps.${key}.eyebrow`);
                  return {
                      id: index + 1,
                      eyebrow: rawEyebrow !== `steps.${key}.eyebrow` ? rawEyebrow : undefined,
                      title: t(`steps.${key}.title`),
                      description: t(`steps.${key}.description`),
                      outcomeLabel: resolvedOutcomeLabel,
                      outcomeValue: t(`steps.${key}.outcome`),
                  };
              });

    const whyItWorksPoints = [
        t("whyItWorksPoints.0") !== "whyItWorksPoints.0" ? t("whyItWorksPoints.0") : defaultWhyItWorksPoints[0],
        t("whyItWorksPoints.1") !== "whyItWorksPoints.1" ? t("whyItWorksPoints.1") : defaultWhyItWorksPoints[1],
        t("whyItWorksPoints.2") !== "whyItWorksPoints.2" ? t("whyItWorksPoints.2") : defaultWhyItWorksPoints[2],
        t("whyItWorksPoints.3") !== "whyItWorksPoints.3" ? t("whyItWorksPoints.3") : defaultWhyItWorksPoints[3],
    ];

    const strategyWord = t("whyItWorksPillars.strategy") !== "whyItWorksPillars.strategy" ? t("whyItWorksPillars.strategy") : "STRATEGY";
    const createsWord = t("whyItWorksPillars.creates") !== "whyItWorksPillars.creates" ? t("whyItWorksPillars.creates") : "CREATES";
    const optionsWord = t("whyItWorksPillars.options") !== "whyItWorksPillars.options" ? t("whyItWorksPillars.options") : "OPTIONS";

    return (
        <section
            id="how-it-works"
            className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24 xl:pt-6 xl:pb-11"
            aria-labelledby="how-it-works-heading"
            data-analytics="how_it_works_section"
            data-section="how-it-works"
        >
            <div className="mx-auto w-full max-w-screen-2xl px-5 sm:px-6 lg:px-8 xl:px-16">
                <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-16 xl:block">
                    {/* Left Column: Heading, CTA, Meta Strip, Why It Works, Brand Tags */}
                    <div className="max-w-xl lg:sticky lg:top-28 xl:static xl:grid xl:max-w-none xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] xl:gap-x-12">
                        <div>
                            <p className="font-body text-xs font-bold uppercase tracking-[0.16em] text-gold-800 xl:flex xl:items-center xl:gap-4 xl:text-sm">
                                <span className="hidden h-px w-9 bg-gold-600 xl:block" aria-hidden="true" />
                                {resolvedEyebrow}
                            </p>
                        <h2
                            id="how-it-works-heading"
                            className="font-heading text-3xl font-extrabold tracking-tight text-brand-950 sm:text-4xl lg:text-[2.65rem] leading-[1.12] mt-3 sm:mt-4 text-balance xl:mt-2 xl:max-w-[44rem] xl:text-[3.25rem] xl:leading-[1.08]"
                        >
                            {resolvedTitle}
                        </h2>
                        <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 xl:mt-5 xl:max-w-[48rem] xl:text-xl">
                            {resolvedSubtitle}
                        </p>
                        </div>

                        <div className="xl:pt-9">
                        {/* Primary CTA */}
                        <div className="mt-6 sm:mt-7 xl:mt-0">
                            <Link
                                href={resolvedCtaHref}
                                className="group inline-flex min-h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-brand-950 px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-brand-900 active:bg-black focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-gold-500 focus-visible:ring-offset-2 xl:min-h-16 xl:w-full xl:text-lg"
                                data-analytics="how_it_works_cta_click"
                                data-cta-placement="how_it_works_section"
                                data-cta-destination={resolvedCtaHref}
                            >
                                <span>{resolvedCtaText}</span>
                                <ArrowRight
                                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 stroke-[2.5] xl:h-5 xl:w-5"
                                    aria-hidden="true"
                                />
                            </Link>
                        </div>

                        {/* Discovery Call Meta Strip */}
                        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-700 xl:mt-9 xl:flex-nowrap xl:gap-x-4 xl:text-sm">
                            <div className="flex items-center gap-1.5">
                                <Clock className="h-4 w-4 text-slate-600 shrink-0 xl:h-5 xl:w-5" aria-hidden="true" />
                                <span className="xl:whitespace-nowrap">{metaDuration}</span>
                            </div>
                            <div className="hidden sm:block h-3.5 w-px bg-slate-300 xl:h-9" aria-hidden="true" />
                            <div className="flex items-center gap-1.5">
                                <FileText className="h-4 w-4 text-slate-600 shrink-0 xl:h-5 xl:w-5" aria-hidden="true" />
                                <span className="xl:whitespace-nowrap">{metaPrep}</span>
                            </div>
                            <div className="hidden sm:block h-3.5 w-px bg-slate-300 xl:h-9" aria-hidden="true" />
                            <div className="flex items-center gap-1.5">
                                <UserCheck className="h-4 w-4 text-slate-600 shrink-0 xl:h-5 xl:w-5" aria-hidden="true" />
                                <span>{metaAdvisor}</span>
                            </div>
                        </div>
                        </div>

                        {/* Why It Works Module */}
                        <div className="mt-10 sm:mt-12 pt-8 border-t-2 border-gold-200/80 xl:hidden">
                            <p className="font-body text-xs font-bold uppercase tracking-[0.16em] text-gold-800">
                                {whyItWorksEyebrow}
                            </p>
                            <h3 className="font-heading text-lg sm:text-xl font-bold text-brand-950 mt-1.5 leading-snug">
                                {whyItWorksTitle}
                            </h3>
                            <div className="mt-4 space-y-2.5">
                                {whyItWorksPoints.map((point, index) => (
                                    <div key={index} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                                        <span
                                            className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#f3ebd7] text-[#806921]"
                                            aria-hidden="true"
                                        >
                                            <Check className="h-2.5 w-2.5 stroke-[3]" />
                                        </span>
                                        <span>{point}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Strategy Creates Options Pillars */}
                        <div className="mt-10 sm:mt-12 flex flex-col space-y-0.5 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400 xl:hidden">
                            <span>{strategyWord}</span>
                            <span>{createsWord}</span>
                            <span>{optionsWord}</span>
                            <div className="w-5 h-[2px] bg-gold-500 mt-2" aria-hidden="true" />
                        </div>
                    </div>

                    <div className="hidden xl:mt-12 xl:flex xl:items-center xl:justify-between xl:border-b xl:border-slate-300 xl:pb-4">
                        <p className="flex items-center gap-4 font-body text-sm font-bold uppercase tracking-[0.18em] text-gold-800">
                            <span className="h-px w-9 bg-gold-600" aria-hidden="true" />
                            {planningPathEyebrow}
                        </p>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">{planningPathTagline}</p>
                    </div>

                    {/* Right Column: Timeline Cards & Ongoing Cadence Card */}
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
                            <span className="font-data tabular-nums text-slate-400">
                                1–{stepsList.length}
                            </span>
                        </div>

                        <ol
                            className="relative flex overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-4 gap-4 no-scrollbar sm:flex-col sm:overflow-visible sm:mx-0 sm:px-0 sm:pb-0 sm:gap-0 xl:block"
                            aria-label={resolvedListLabel}
                        >
                            {stepsList.map((step, index) => {
                                const isLast = index === stepsList.length - 1;
                                const stepNumber = step.id || index + 1;
                                const stepOutcomeLabel = step.outcomeLabel || resolvedOutcomeLabel;
                                const Icon = getStepIcon(index);
                                const StageIcon = getStageIcon(index);

                                return (
                                    <li
                                        key={step.id || index}
                                        className="relative flex shrink-0 snap-center w-[85vw] max-w-[360px] sm:w-full sm:max-w-none items-stretch sm:items-start gap-0 sm:gap-8 pb-0 sm:pb-8 xl:grid xl:min-h-[10rem] xl:grid-cols-[4rem_5rem_minmax(0,0.83fr)_minmax(0,1fr)] xl:items-center xl:gap-12 xl:border-b xl:border-slate-200 xl:py-4"
                                    >
                                        {/* Desktop Spine Node with Connecting Gold Line */}
                                        <div className="relative hidden sm:flex shrink-0 flex-col items-center self-stretch xl:self-auto xl:-translate-y-2">
                                            <span
                                                className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-brand-950 font-heading text-sm font-bold text-gold-300 shadow-md sm:h-13 sm:w-13 sm:text-base xl:h-16 xl:w-16 xl:border-0 xl:text-xl"
                                                aria-hidden="true"
                                            >
                                                {String(stepNumber).padStart(2, "0")}
                                            </span>
                                            {/* Line down to next card or dashed to cadence */}
                                            <div
                                                className={
                                                    isLast
                                                        ? "w-px flex-1 border-l border-dashed border-gold-400 mt-2 xl:hidden"
                                                        : "w-px flex-1 bg-gold-300 mt-2 xl:hidden"
                                                }
                                                aria-hidden="true"
                                            />
                                        </div>

                                        <div className="hidden h-20 w-20 items-center justify-center rounded-full border border-gold-100 bg-gold-50 text-gold-800 xl:-translate-y-2 xl:flex" aria-hidden="true">
                                            <StageIcon className="h-10 w-10 stroke-[1.75]" />
                                        </div>

                                        {/* Step Card with Top Content + Bottom Outcome Tray */}
                                        <div className="flex min-w-0 w-full flex-1 flex-col justify-between rounded-2xl border border-slate-200/90 bg-white shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] overflow-hidden xl:contents">
                                            <div className="p-6 sm:p-7 xl:p-0">
                                                <div className="flex items-center gap-3">
                                                    {/* Mobile Inline Badge */}
                                                    <span
                                                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-white bg-brand-950 font-heading text-xs font-bold text-gold-300 shadow-sm sm:hidden"
                                                        aria-hidden="true"
                                                    >
                                                        {String(stepNumber).padStart(2, "0")}
                                                    </span>
                                                    <div>
                                                        {step.eyebrow ? (
                                                            <p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-gold-800 xl:text-sm">
                                                                {step.eyebrow}
                                                            </p>
                                                        ) : null}
                                                        <h3 className="font-heading text-base sm:text-lg font-bold text-brand-950 break-words mt-0.5 xl:text-2xl xl:leading-tight">
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
                                                </div>
                                                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600 break-words xl:text-lg xl:leading-snug">
                                                    {step.description}
                                                </p>
                                            </div>

                                            {/* Semantic Outcome Tray */}
                                            <div className="border-t border-[#f0e8d6] bg-[#fcfaf4] px-6 py-4 flex items-center gap-3.5 xl:min-h-[7.5rem] xl:gap-8 xl:rounded-xl xl:border xl:border-gold-200 xl:bg-gold-50 xl:px-8 xl:py-5">
                                                <div className="text-slate-700 shrink-0 xl:text-gold-800" aria-hidden="true">
                                                    <Icon className="h-5 w-5 stroke-[1.75] xl:h-9 xl:w-9" />
                                                </div>
                                                <div className="h-6 w-px bg-[#e8deca] shrink-0 xl:h-16" aria-hidden="true" />
                                                <dl className="flex flex-wrap items-baseline gap-x-2 text-xs sm:text-sm leading-relaxed xl:flex-col xl:items-start xl:gap-1">
                                                    <dt className="font-bold uppercase tracking-[0.08em] text-gold-900 xl:text-sm">
                                                        <span className="xl:hidden">{stepOutcomeLabel}:</span>
                                                        <span className="hidden xl:inline">{desktopOutcomeLabel}</span>
                                                    </dt>
                                                    <dd className="text-slate-700 break-words xl:text-lg xl:leading-snug">
                                                        {step.outcomeValue}
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ol>

                        {/* Ongoing Cadence Node + Card */}
                        <div className="relative flex items-stretch sm:items-start gap-0 sm:gap-8 mt-4 sm:mt-0 xl:mt-5 xl:block">
                            {/* Desktop Cadence Icon Badge */}
                            <div className="relative hidden sm:flex shrink-0 flex-col items-center xl:absolute xl:left-12 xl:top-9 xl:z-10">
                                <span
                                    className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-[#f3ebd7] text-[#806921] shadow-sm sm:h-13 sm:w-13 xl:h-20 xl:w-20 xl:border xl:border-gold-100 xl:bg-gold-50 xl:text-gold-800"
                                    aria-hidden="true"
                                >
                                    <RefreshCw className="h-5 w-5 stroke-[2.2] xl:h-9 xl:w-9" />
                                </span>
                            </div>

                            {/* Ongoing Cadence Card */}
                            <div className="flex min-w-0 w-full flex-1 flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-2xl border border-[#e2e5dc] bg-[#f6f7f2] p-6 sm:p-7 shadow-sm xl:grid xl:min-h-[10.5rem] xl:grid-cols-[minmax(0,1.28fr)_minmax(0,1fr)] xl:gap-0 xl:rounded-xl xl:bg-white xl:pl-[11.5rem] xl:pr-12 xl:py-7">
                                <div className="max-w-md xl:max-w-[36rem]">
                                    <p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-gold-800">
                                        <span className="xl:hidden">{cadenceEyebrow}</span>
                                        <span className="hidden xl:inline">{desktopCadenceEyebrow}</span>
                                    </p>
                                    <h3 className="font-heading text-base sm:text-lg font-bold text-brand-950 mt-1 xl:mt-3 xl:text-2xl">
                                        {cadenceTitle}
                                    </h3>
                                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 xl:text-lg xl:leading-snug">
                                        {cadenceDescription}
                                    </p>
                                    {/* Accessible full cadence loop text for screen readers and tests */}
                                    <span className="sr-only">
                                        {resolvedCadenceLoop}
                                    </span>
                                </div>

                                <div className="hidden sm:flex flex-col justify-center border-l border-slate-300/80 pl-6 shrink-0 xl:self-stretch xl:shrink xl:pl-28">
                                    <p className="font-heading text-xs sm:text-sm font-bold text-brand-950 leading-snug xl:text-lg">
                                        {cadenceTagline}
                                    </p>
                                    <p className="mt-2 hidden text-base leading-snug text-slate-600 xl:block">{cadenceSupport}</p>
                                    <div className="w-6 h-[2px] bg-gold-500 mt-2 xl:order-first xl:mb-3 xl:mt-0" aria-hidden="true" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

import React from "react";
import { getTranslations } from "next-intl/server";
import { Clock, FileText, Calendar, BarChart3, Star, type LucideIcon } from "lucide-react";
import { WhyUsConversionArea } from "./WhyUsConversionArea";
import { WhyUsEvidenceModule, type WhyUsEvidenceModuleProps } from "./WhyUsEvidenceModule";

export interface ComparisonRow {
    id: string;
    label: string;
    traditionalText: string;
    proactiveText: string;
    traditionalDetail?: string;
    desktopProactiveText?: string;
    proactiveDetail?: string;
    priority?: number;
    optionalTraditionalIcon?: LucideIcon;
    optionalProactiveIcon?: LucideIcon;
}

export interface WhyUsSectionProps {
    customRows?: ComparisonRow[];
    emptyFallbackMessage?: string;
    showRecommendedBadge?: boolean;
    primaryHref?: string;
    secondaryHref?: string;
    evidenceModule?: WhyUsEvidenceModuleProps | null;
}

const comparisonKeys = ["timing", "scope", "cadence", "decisionSupport"] as const;

const getDefaultRowIcon = (id: string): LucideIcon => {
    switch (id) {
        case "timing":
            return Clock;
        case "scope":
            return FileText;
        case "cadence":
            return Calendar;
        case "decisionSupport":
            return BarChart3;
        default:
            return Clock;
    }
};

export const WhyUsSection = async ({
    customRows,
    emptyFallbackMessage,
    showRecommendedBadge = true,
    primaryHref = "/tax-planning",
    secondaryHref = "/scorp-estimator",
    evidenceModule,
}: WhyUsSectionProps = {}): Promise<React.JSX.Element> => {
    const t = await getTranslations("HomePage.WhyUsSection");

    const resolvedRows: ComparisonRow[] =
        customRows !== undefined
            ? [...customRows].sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0))
            : comparisonKeys.map((key) => ({
                  id: key,
                  label: t(`rows.${key}.dimension`),
                  traditionalText: t(`rows.${key}.traditional`),
                  proactiveText: t(`rows.${key}.proactive`),
                  traditionalDetail: t(`rows.${key}.traditionalDetail`),
                  desktopProactiveText: t(`rows.${key}.proactiveDesktop`),
                  proactiveDetail: t(`rows.${key}.proactiveDetail`),
              }));

    const hasRows = resolvedRows.length > 0;
    const fallbackMessage = emptyFallbackMessage || t("emptyFallback");
    const recommendedLabel = t("recommendedBadge");

    return (
        <section
            id="proactive-by-design"
            className="border-y border-slate-200 bg-[#fbfbfb] pt-16 pb-12 sm:py-20 lg:bg-white lg:pt-10 lg:pb-16"
            aria-labelledby="why-us-heading"
        >
            <div className="mx-auto w-full max-w-screen-2xl px-5 sm:px-6 lg:px-[clamp(3rem,4.5vw,4rem)]">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-6">
                    {/* Top Split Header */}
                    <div className="col-span-1 grid grid-cols-1 gap-6 lg:col-span-12 lg:block lg:mb-0">
                        <div className="lg:max-w-[50rem]">
                            <div className="flex items-center gap-2.5 mb-3">
                                <span className="h-[2px] w-8 bg-gold-600 shrink-0" aria-hidden="true" />
                                <p className="font-body text-xs font-bold uppercase tracking-[0.16em] text-gold-800 sm:text-sm">
                                    {t("eyebrow")}
                                </p>
                            </div>
                            <h2 id="why-us-heading" className="font-heading text-3xl font-bold tracking-tight text-brand-950 sm:text-4xl lg:text-[2.65rem] leading-[1.12]">
                                {t("title")}
                            </h2>
                            <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed lg:max-w-[34rem]">
                                {t("subtitle")}
                            </p>
                        </div>

                        <div className="border-l border-slate-300 pl-6 py-1 lg:hidden">
                            <p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-slate-600">
                                {t("headerInsightEyebrow1")}
                            </p>
                            <p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-slate-600">
                                {t("headerInsightEyebrow2")}
                            </p>
                            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                                {t("headerInsightBody")}
                            </p>
                        </div>
                    </div>

                    {/* Advantage Eyebrow Bar */}
                    <div className="col-span-1 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between lg:col-span-12">
                        <div className="flex items-center gap-2.5">
                            <span className="h-[2px] w-8 bg-gold-600 shrink-0" aria-hidden="true" />
                            <p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-gold-800 sm:text-sm">
                                {t("advantageEyebrow")}
                            </p>
                        </div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600 lg:hidden">
                            {t("advantageTagline")}
                        </p>
                    </div>

                    {/* Comparison Area: Side-by-Side Cards */}
                    <div className="col-span-1 lg:col-span-12 lg:-mt-4">
                        {!hasRows ? (
                            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
                                <p className="text-sm font-medium">{fallbackMessage}</p>
                            </div>
                        ) : (
                            <div
                                role="region"
                                aria-label={t("caption")}
                                className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:gap-6"
                            >
                                {/* Left Card: Traditional Tax Support */}
                                <div
                                    data-testid="traditional-tax-card"
                                    className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-[#f6f7f8] shadow-sm lg:min-h-[28.75rem] lg:rounded-xl lg:bg-white"
                                >
                                    <div className="border-b border-slate-200/80 bg-white/70 px-6 py-5">
                                        <h3 className="font-heading text-sm sm:text-base font-bold uppercase tracking-wider text-slate-900">
                                            {t("traditionalLabel")}
                                        </h3>
                                        <p className="mt-1 text-xs sm:text-sm text-slate-600">
                                            {t("traditionalSubtitle")}
                                        </p>
                                    </div>
                                    <dl className="flex flex-1 flex-col justify-between divide-y divide-slate-200/80 p-3 sm:p-5 lg:px-4 lg:py-3">
                                        {resolvedRows.map((item) => {
                                            const Icon = item.optionalTraditionalIcon ?? getDefaultRowIcon(item.id);
                                            return (
                                                <div key={item.id} className="flex items-start gap-4 p-3 sm:p-4 lg:gap-6 lg:px-2 lg:py-3">
                                                    <div
                                                        aria-hidden="true"
                                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200/80 text-slate-600 lg:h-12 lg:w-12"
                                                    >
                                                        <Icon className="h-4 w-4 stroke-[2] lg:h-5 lg:w-5" />
                                                    </div>
                                                    <dt className="w-28 sm:w-36 shrink-0 pt-0.5 font-body text-xs font-bold uppercase tracking-wider text-slate-700 lg:min-h-11 lg:w-24 lg:border-r lg:border-slate-200 lg:pr-4">
                                                        {String(item.label)}
                                                    </dt>
                                                    <dd className="flex-1 pt-0.5 text-xs sm:text-sm text-slate-600 leading-relaxed break-words lg:text-base lg:leading-snug">
                                                        <span className="block lg:text-brand-900">{String(item.traditionalText)}</span>
                                                        {item.traditionalDetail ? <span className="mt-1 hidden text-sm text-slate-600 lg:block">{item.traditionalDetail}</span> : null}
                                                    </dd>
                                                </div>
                                            );
                                        })}
                                    </dl>
                                </div>

                                {/* Right Card: Proactive Tax Strategy */}
                                <div
                                    data-testid="proactive-tax-card"
                                    className="flex flex-col overflow-hidden rounded-2xl border-2 border-[#caa866] bg-[#fcfaf4] shadow-md lg:min-h-[28.75rem] lg:rounded-xl lg:border-gold-500"
                                >
                                    <div className="bg-brand-950 px-6 py-5 text-white lg:bg-brand-500">
                                        <div className="flex items-center justify-between gap-3">
                                            <h3 className="font-heading text-sm sm:text-base font-bold uppercase tracking-wider text-white">
                                                {t("proactiveLabel")}
                                            </h3>
                                            {showRecommendedBadge ? (
                                                <span
                                                    className="inline-flex items-center gap-1.5 rounded-full border border-gold-400/40 bg-brand-900 px-3 py-0.5 text-xs font-semibold text-gold-300"
                                                    aria-label={`${t("proactiveLabel")} (${recommendedLabel})`}
                                                >
                                                    <Star className="h-3 w-3 fill-gold-400 text-gold-400" aria-hidden="true" />
                                                    {recommendedLabel}
                                                </span>
                                            ) : null}
                                        </div>
                                        <p className="mt-1.5 text-xs sm:text-sm text-gold-200/80 font-normal">
                                            {t("proactiveSubtitle")}
                                        </p>
                                    </div>
                                    <dl className="flex flex-1 flex-col justify-between divide-y divide-[#ede2cb] p-3 sm:p-5 lg:px-4 lg:py-3">
                                        {resolvedRows.map((item) => {
                                            const Icon = item.optionalProactiveIcon ?? getDefaultRowIcon(item.id);
                                            return (
                                                <div key={item.id} className="flex items-start gap-4 p-3 sm:p-4 lg:gap-6 lg:px-2 lg:py-3">
                                                    <div
                                                        aria-hidden="true"
                                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100/90 text-amber-800 lg:h-12 lg:w-12"
                                                    >
                                                        <Icon className="h-4 w-4 stroke-[2] lg:h-5 lg:w-5" />
                                                    </div>
                                                    <dt className="w-28 sm:w-36 shrink-0 pt-0.5 font-body text-xs font-bold uppercase tracking-wider text-slate-900 lg:min-h-11 lg:w-24 lg:border-r lg:border-gold-200 lg:pr-4">
                                                        {String(item.label)}
                                                    </dt>
                                                    <dd className="flex-1 pt-0.5 text-xs sm:text-sm font-medium text-slate-800 leading-relaxed break-words lg:text-base lg:leading-snug">
                                                        <span className="lg:hidden">{String(item.proactiveText)}</span>
                                                        <span className="hidden lg:block">{String(item.desktopProactiveText ?? item.proactiveText)}</span>
                                                        {item.proactiveDetail ? <span className="mt-1 hidden text-sm font-normal text-slate-700 lg:block">{item.proactiveDetail}</span> : null}
                                                    </dd>
                                                </div>
                                            );
                                        })}
                                    </dl>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Process / Evidence Module */}
                    {evidenceModule !== null && (
                        <WhyUsEvidenceModule
                            enabled={evidenceModule?.enabled ?? true}
                            variant={evidenceModule?.variant ?? "process_strip"}
                            eyebrow={evidenceModule?.eyebrow ?? t("evidence.eyebrow")}
                            tagline={t("evidence.tagline")}
                            heading={evidenceModule?.heading ?? t("evidence.heading")}
                            items={
                                evidenceModule?.items ?? [
                                    {
                                        id: "step-1",
                                        stepEyebrow: t("evidence.step1.eyebrow"),
                                        label: t("evidence.step1.label"),
                                        body: t("evidence.step1.body"),
                                    },
                                    {
                                        id: "step-2",
                                        stepEyebrow: t("evidence.step2.eyebrow"),
                                        label: t("evidence.step2.label"),
                                        body: t("evidence.step2.body"),
                                    },
                                    {
                                        id: "step-3",
                                        stepEyebrow: t("evidence.step3.eyebrow"),
                                        label: t("evidence.step3.label"),
                                        body: t("evidence.step3.body"),
                                    },
                                ]
                            }
                            legalDisclaimer={
                                evidenceModule?.legalDisclaimer ?? t("evidence.disclaimer")
                            }
                            trackingId={evidenceModule?.trackingId ?? "why_us_planning_process_strip"}
                            isLoading={evidenceModule?.isLoading}
                            hasError={evidenceModule?.hasError}
                            errorMessage={evidenceModule?.errorMessage}
                        />
                    )}

                    {/* Desktop/Tablet Conversion Banner */}
                    <div className="hidden md:contents">
                        <WhyUsConversionArea
                            conclusion={t("conclusion")}
                            primaryCtaText={t("primaryCta")}
                            secondaryCtaText={t("secondaryCta")}
                            secondaryPreText={t("secondaryPreText")}
                            eyebrow={t("bannerEyebrow")}
                            subtitle={t("bannerSubtitle")}
                            primaryHref={primaryHref}
                            secondaryHref={secondaryHref}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

import React from "react";
import { getTranslations } from "next-intl/server";
import { WhyUsConversionArea } from "./WhyUsConversionArea";
import { WhyUsEvidenceModule, type WhyUsEvidenceModuleProps } from "./WhyUsEvidenceModule";
import { MobileCarouselPagination } from "./MobileCarouselPagination";
import type { LucideIcon } from "lucide-react";

export interface ComparisonRow {
    id: string;
    label: string;
    traditionalText: string;
    proactiveText: string;
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
              }));

    const hasRows = resolvedRows.length > 0;
    const fallbackMessage = emptyFallbackMessage || t("emptyFallback");
    const recommendedLabel = t("recommendedBadge");

    return (
        <section
            id="proactive-by-design"
            className="border-y border-slate-200 bg-slate-50 pt-16 pb-8 sm:py-20 lg:py-24"
            aria-labelledby="why-us-heading"
        >
            <div className="mx-auto w-full max-w-screen-2xl px-5 sm:px-6 lg:px-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12">
                    {/* Header */}
                    <div className="col-span-1 mb-2 lg:col-span-12 lg:mb-0">
                        <p className="home-eyebrow text-gold-800">{t("eyebrow")}</p>
                        <h2 id="why-us-heading" className="home-section-heading mt-4 max-w-4xl text-brand-900">
                            {t("title")}
                        </h2>
                        <p className="home-supporting-copy mt-4 max-w-3xl text-slate-700">
                            {t("subtitle")}
                        </p>
                    </div>

                    {/* Comparison Area */}
                    <div className="col-span-1 lg:col-span-12">
                        {!hasRows ? (
                            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
                                <p className="text-sm font-medium">{fallbackMessage}</p>
                            </div>
                        ) : (
                            <>
                                {/* Desktop Semantic Table */}
                                <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white md:block">
                                    <table className="w-full table-fixed border-collapse">
                                        <caption className="sr-only">{t("caption")}</caption>
                                        <colgroup>
                                            <col className="w-[20%]" />
                                            <col className="w-[40%]" />
                                            <col className="w-[40%]" />
                                        </colgroup>
                                        <thead className="bg-brand-900 text-left text-sm font-bold">
                                            <tr>
                                                <th scope="col" className="px-5 py-5 text-slate-200 lg:px-6">
                                                    {t("dimensionLabel")}
                                                </th>
                                                <th scope="col" className="border-l border-white/10 px-5 py-5 text-slate-200 lg:px-6">
                                                    {t("traditionalLabel")}
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="border-l border-gold-400/30 bg-brand-950 px-5 py-5 text-gold-300 lg:px-6"
                                                >
                                                    <div className="flex flex-col gap-1.5 xl:flex-row xl:items-center xl:justify-between xl:gap-3">
                                                        <span>{t("proactiveLabel")}</span>
                                                        {showRecommendedBadge ? (
                                                            <span
                                                                className="inline-flex min-h-6 w-fit items-center rounded-full border border-gold-400/30 bg-gold-500/20 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-gold-300"
                                                                aria-label={`${t("proactiveLabel")} (${recommendedLabel})`}
                                                            >
                                                                {recommendedLabel}
                                                            </span>
                                                        ) : null}
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {resolvedRows.map((item) => (
                                                <tr
                                                    key={item.id}
                                                    className="border-t border-slate-200 first:border-t-0"
                                                >
                                                    <th
                                                        scope="row"
                                                        className="bg-slate-50 px-5 py-5 text-left font-heading text-sm font-bold uppercase tracking-[0.08em] text-slate-700 align-middle lg:px-6 lg:py-6"
                                                    >
                                                        {String(item.label)}
                                                    </th>
                                                    <td className="max-w-md break-words border-l border-slate-200 px-5 py-5 text-sm leading-relaxed text-slate-700 align-middle lg:px-6 lg:py-6 lg:text-base">
                                                        {String(item.traditionalText)}
                                                    </td>
                                                    <td className="max-w-md break-words border-l border-gold-200 bg-gold-50/50 px-5 py-5 text-sm leading-relaxed text-slate-800 align-middle lg:px-6 lg:py-6 lg:text-base">
                                                        {String(item.proactiveText)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile Semantic Key-Value Cards */}
                                <ul
                                    role="list"
                                    id="why-us-mobile-comparison-carousel"
                                    className="-mx-4 flex snap-x snap-mandatory items-stretch gap-6 overflow-x-auto px-4 touch-pan-x no-scrollbar md:hidden"
                                    aria-label={t("caption")}
                                >
                                    {resolvedRows.map((item, index) => {
                                        const titleId = `why-us-card-title-${item.id}`;
                                        const isFirstCard = index === 0;
                                        return (
                                            <li
                                                key={item.id}
                                                data-carousel-item
                                                aria-labelledby={titleId}
                                                className="w-[85vw] max-w-[340px] shrink-0 snap-center rounded-xl border border-slate-200 bg-white p-4"
                                            >
                                                <h3 id={titleId} className="font-heading text-base font-bold text-brand-900">
                                                    {String(item.label)}
                                                </h3>
                                                <dl className="mt-4 space-y-4">
                                                    <div className="rounded-xl bg-slate-100 p-4">
                                                        <dt className={isFirstCard
                                                            ? "text-xs font-bold uppercase tracking-[0.1em] text-slate-700"
                                                            : "text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-700"
                                                        }>
                                                            {t("traditionalLabel")}
                                                        </dt>
                                                        <dd className="mt-1.5 break-words text-sm leading-relaxed text-slate-700">
                                                            {String(item.traditionalText)}
                                                        </dd>
                                                    </div>
                                                    <div className="rounded-xl bg-gold-50/70 p-4">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <dt className={isFirstCard
                                                                ? "text-xs font-bold uppercase tracking-[0.1em] text-gold-900"
                                                                : "text-[11px] font-semibold uppercase tracking-[0.08em] text-gold-800"
                                                            }>
                                                                {t("proactiveLabel")}
                                                            </dt>
                                                            {showRecommendedBadge ? (
                                                                <span className={isFirstCard
                                                                    ? "inline-flex min-h-6 items-center rounded-full bg-gold-200/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-950"
                                                                    : "inline-flex min-h-6 items-center rounded-full bg-gold-100 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-gold-900"
                                                                }>
                                                                    <span aria-hidden="true">{recommendedLabel}</span>
                                                                    <span className="sr-only">{recommendedLabel}</span>
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                        <dd className="mt-1.5 break-words text-sm leading-relaxed text-slate-800">
                                                            {String(item.proactiveText)}
                                                        </dd>
                                                    </div>
                                                </dl>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <MobileCarouselPagination
                                    carouselId="why-us-mobile-comparison-carousel"
                                    items={resolvedRows.map((item) => ({ id: item.id, label: String(item.label) }))}
                                />
                            </>
                        )}
                    </div>

                    {/* Optional Evidence Module */}
                    {evidenceModule !== null && (
                        <WhyUsEvidenceModule
                            enabled={evidenceModule?.enabled ?? true}
                            variant={evidenceModule?.variant ?? "process_strip"}
                            eyebrow={evidenceModule?.eyebrow ?? t("evidence.eyebrow")}
                            heading={evidenceModule?.heading ?? t("evidence.heading")}
                            items={
                                evidenceModule?.items ?? [
                                    {
                                        id: "step-1",
                                        label: t("evidence.step1.label"),
                                        body: t("evidence.step1.body"),
                                    },
                                    {
                                        id: "step-2",
                                        label: t("evidence.step2.label"),
                                        body: t("evidence.step2.body"),
                                    },
                                    {
                                        id: "step-3",
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

                    {/* Desktop-only conversion area; mobile continues directly into the next named section. */}
                    <div className="hidden md:contents">
                        <WhyUsConversionArea
                            conclusion={t("conclusion")}
                            primaryCtaText={t("primaryCta")}
                            secondaryCtaText={t("secondaryCta")}
                            primaryHref={primaryHref}
                            secondaryHref={secondaryHref}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

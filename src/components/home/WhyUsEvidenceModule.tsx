import React from "react";
import { ArrowRight, Info } from "lucide-react";
import { Link } from "@/i18n/navigation";

export type EvidenceVariant = "process_strip" | "credentials" | "outcome" | "qualification";

export interface EvidenceItem {
    id: string;
    label: string;
    body: string;
    stepEyebrow?: string;
    optionalApprovedLink?: {
        href: string;
        label: string;
    };
}

export interface WhyUsEvidenceModuleProps {
    enabled?: boolean;
    variant?: EvidenceVariant;
    eyebrow?: string;
    tagline?: string;
    heading?: string;
    items?: EvidenceItem[];
    legalDisclaimer?: string;
    trackingId?: string;
    isLoading?: boolean;
    hasError?: boolean;
    errorMessage?: string;
}

export const WhyUsEvidenceModule = ({
    enabled = true,
    variant = "process_strip",
    eyebrow,
    tagline,
    heading,
    items = [],
    legalDisclaimer,
    trackingId = "why_us_evidence_strip",
    isLoading = false,
    hasError = false,
    errorMessage = "Evidence details are temporarily unavailable.",
}: WhyUsEvidenceModuleProps): React.JSX.Element | null => {
    if (!enabled) {
        return null;
    }

    if (hasError) {
        return (
            <div
                role="alert"
                data-testid="evidence-error-state"
                data-tracking-id={trackingId}
                className="col-span-1 rounded-xl border border-rose-200 bg-rose-50/60 p-4 text-center text-xs text-rose-800 lg:col-span-12"
            >
                <p>{errorMessage}</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div
                data-testid="evidence-loading-state"
                className="col-span-1 grid animate-pulse grid-cols-1 gap-4 md:grid-cols-3 lg:col-span-12 lg:gap-6"
                aria-label="Loading evidence details"
            >
                {[1, 2, 3].map((skeletonIdx) => (
                    <div
                        key={skeletonIdx}
                        className="h-28 rounded-xl border border-slate-200 bg-slate-100/70 p-5"
                    />
                ))}
            </div>
        );
    }

    const visibleItems = items.slice(0, 3);
    if (visibleItems.length === 0) {
        return null;
    }

    const headingId = `${trackingId}-heading`;

    return (
        <section
            data-testid="why-us-evidence-module"
            data-evidence-variant={variant}
            data-tracking-id={trackingId}
            aria-label={heading ? undefined : "Planning process and evidence"}
            aria-labelledby={heading ? headingId : undefined}
            className="col-span-1 pt-12 pb-4 lg:col-span-12 lg:pt-6"
        >
            {/* Process Header Eyebrow Row */}
            <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between lg:mb-4">
                <div className="flex items-center gap-2.5">
                    <span className="h-[2px] w-8 bg-gold-600 shrink-0" aria-hidden="true" />
                    <p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-gold-800 sm:text-sm">
                        {eyebrow || "How proactive planning works"}
                    </p>
                </div>
                {tagline ? (
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600 lg:hidden">
                        {tagline}
                    </p>
                ) : null}
            </div>

            {heading ? (
                <h2 id={headingId} className="sr-only">
                    {heading}
                </h2>
            ) : null}

            {/* 3 Step Process Cards connected by Arrows */}
            <ol className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-4 lg:gap-8 items-start">
                {visibleItems.map((item, index) => {
                    const stepNumber = String(index + 1).padStart(2, "0");
                    const isNotLast = index < visibleItems.length - 1;
                    return (
                        <li
                            key={item.id}
                            className="relative flex flex-col justify-between"
                        >
                            <div className="flex items-start gap-4 lg:gap-3">
                                <span
                                    aria-hidden="true"
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-100 text-sm font-bold text-gold-800 lg:h-12 lg:w-12 lg:text-base"
                                >
                                    {stepNumber}
                                </span>
                                <div className="flex-1">
                                    {item.stepEyebrow ? (
                                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a6828]">
                                            {item.stepEyebrow}
                                        </p>
                                    ) : null}
                                    <h3 className="font-heading text-base font-bold text-slate-900 mt-1 lg:text-[17px] lg:leading-[1.2]">
                                        {item.label}
                                    </h3>
                                    <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm lg:text-[15px] lg:leading-[1.35]">
                                        {item.body}
                                    </p>
                                </div>
                                {isNotLast ? (
                                    <div className="hidden md:flex items-center justify-center pl-2 pt-2 text-slate-400 lg:pl-0" aria-hidden="true">
                                        <ArrowRight className="h-5 w-5 stroke-[1.5]" />
                                    </div>
                                ) : null}
                            </div>

                            {item.optionalApprovedLink ? (
                                <div className="mt-3.5 pl-14">
                                    <Link
                                        href={item.optionalApprovedLink.href}
                                        className="inline-flex items-center text-xs font-semibold text-brand-900 underline decoration-gold-600 underline-offset-2 hover:text-gold-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                                    >
                                        {item.optionalApprovedLink.label}
                                    </Link>
                                </div>
                            ) : null}
                        </li>
                    );
                })}
            </ol>

            {legalDisclaimer ? (
                <div className="mt-8 flex items-center gap-2 text-xs text-slate-600">
                    <Info className="h-4 w-4 shrink-0 text-slate-600" aria-hidden="true" />
                    <p className="leading-normal">
                        {legalDisclaimer}
                    </p>
                </div>
            ) : null}
        </section>
    );
};

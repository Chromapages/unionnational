import React from "react";
import { Link } from "@/i18n/navigation";

export type EvidenceVariant = "process_strip" | "credentials" | "outcome" | "qualification";

export interface EvidenceItem {
    id: string;
    label: string;
    body: string;
    optionalApprovedLink?: {
        href: string;
        label: string;
    };
}

export interface WhyUsEvidenceModuleProps {
    enabled?: boolean;
    variant?: EvidenceVariant;
    eyebrow?: string;
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
            className="col-span-1 border-t-2 border-gold-200/80 pt-6 sm:pt-8 lg:col-span-12"
        >
            {eyebrow || heading ? (
                <div className="mb-6">
                    {eyebrow ? (
                        <p className="home-eyebrow text-gold-800">
                            {eyebrow}
                        </p>
                    ) : null}
                    {heading ? (
                        <h2 id={headingId} className="mt-4 max-w-3xl font-heading text-[1.75rem] font-semibold leading-[1.08] tracking-[-0.025em] text-brand-900 sm:text-[2rem]">
                            {heading}
                        </h2>
                    ) : null}
                </div>
            ) : null}

            <ol className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3 lg:gap-6">
                {visibleItems.map((item, index) => {
                    const stepNumber = String(index + 1).padStart(2, "0");
                    return (
                        <li
                            key={item.id}
                            className="flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-4.5 sm:p-5 shadow-[0_4px_12px_-8px_rgba(24,24,27,0.08)]"
                        >
                            <div>
                                <div className="flex items-center gap-2.5">
                                    <span
                                        aria-hidden="true"
                                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-100 text-[11px] font-bold text-gold-900"
                                    >
                                        {stepNumber}
                                    </span>
                                    <h3 className="font-heading text-sm font-bold text-brand-950">
                                        {item.label}
                                    </h3>
                                </div>
                                <p className="mt-2.5 break-words text-xs leading-relaxed text-slate-600 sm:text-sm">
                                    {item.body}
                                </p>
                            </div>

                            {item.optionalApprovedLink ? (
                                <div className="mt-3.5 pt-2">
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
                <p className="mt-4 break-words text-[11px] leading-normal text-slate-600">
                    {legalDisclaimer}
                </p>
            ) : null}
        </section>
    );
};

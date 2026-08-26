"use client";

import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export interface WhyUsConversionAreaProps {
    conclusion: string;
    primaryCtaText: string;
    secondaryCtaText?: string;
    primaryHref?: string;
    secondaryHref?: string;
}

interface DataLayerWindow extends Window {
    dataLayer?: Record<string, unknown>[];
}

export const WhyUsConversionArea = ({
    conclusion,
    primaryCtaText,
    secondaryCtaText,
    primaryHref = "/tax-planning",
    secondaryHref = "/scorp-estimator",
}: WhyUsConversionAreaProps): React.JSX.Element => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const viewTrackedRef = useRef(false);

    const pushDataLayerEvent = (payload: Record<string, unknown>) => {
        if (typeof window === "undefined") return;
        const win = window as unknown as DataLayerWindow;
        win.dataLayer ??= [];
        win.dataLayer.push(payload);
    };

    useEffect(() => {
        const node = containerRef.current;
        if (!node || viewTrackedRef.current) return;

        if (typeof IntersectionObserver === "undefined") {
            viewTrackedRef.current = true;
            pushDataLayerEvent({
                event: "section_view",
                section_name: "why_us_section",
                placement: "homepage_why_us",
            });
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry?.isIntersecting && !viewTrackedRef.current) {
                    viewTrackedRef.current = true;
                    pushDataLayerEvent({
                        event: "section_view",
                        section_name: "why_us_section",
                        placement: "homepage_why_us",
                    });
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    const handlePrimaryClick = () => {
        pushDataLayerEvent({
            event: "primary_cta_click",
            cta_id: "why_us_primary_cta",
            placement: "why_us_section",
            destination: primaryHref,
        });
    };

    const handleSecondaryClick = () => {
        pushDataLayerEvent({
            event: "secondary_cta_click",
            cta_id: "why_us_secondary_cta",
            placement: "why_us_section",
            destination: secondaryHref,
        });
    };

    return (
        <div ref={containerRef} className="col-span-1 border-t border-slate-300 pt-10 lg:col-span-12">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-12 xl:gap-16">
                <div className="max-w-2xl">
                    <p className="font-heading text-xl font-bold leading-snug text-brand-900 sm:text-2xl">
                        {conclusion}
                    </p>
                </div>
                <div className="flex flex-col items-start gap-3.5 lg:items-end lg:justify-self-end">
                    <Link
                        href={primaryHref}
                        onClick={handlePrimaryClick}
                        data-analytics="why_us_primary_cta"
                        data-cta-placement="why_us_section"
                        className="inline-flex min-h-[48px] w-fit items-center justify-center gap-2 rounded-md bg-brand-900 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-800 active:bg-brand-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2"
                    >
                        <span>{primaryCtaText}</span>
                        <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </Link>
                    {secondaryCtaText ? (
                        <Link
                            href={secondaryHref}
                            onClick={handleSecondaryClick}
                            data-analytics="why_us_secondary_cta"
                            data-cta-placement="why_us_section"
                            className="inline-flex min-h-[44px] w-fit items-center text-sm font-semibold text-brand-900 underline decoration-gold-600 underline-offset-4 transition-colors hover:text-gold-800 active:text-gold-900 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2"
                        >
                            {secondaryCtaText}
                        </Link>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

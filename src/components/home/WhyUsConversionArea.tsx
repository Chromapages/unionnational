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
    eyebrow?: string;
    subtitle?: string;
    secondaryPreText?: string;
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
    eyebrow = "PLAN FURTHER AHEAD",
    subtitle = "Turn today's insight into tomorrow's opportunity with a proactive tax strategy built around your goals.",
    secondaryPreText = "Considering an S-Corp? ",
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
        <div
            ref={containerRef}
            className="col-span-1 mt-6 lg:col-span-12 relative overflow-hidden rounded-2xl bg-[#061512] border border-[#132c26] px-8 py-8 sm:px-12 sm:py-10 lg:mt-2 lg:rounded-xl lg:bg-brand-500 lg:px-10 lg:py-7 text-white shadow-2xl lg:shadow-lg"
        >
            {/* Background luxury curved wave lines matching design */}
            <svg
                className="pointer-events-none absolute right-0 top-0 h-full w-full max-w-3xl opacity-35 lg:hidden"
                viewBox="0 0 800 240"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                {/* Shallow sweep crossing bottom-center to right */}
                <path
                    d="M 60 240 C 240 210, 480 175, 800 115"
                    stroke="#D8AC44"
                    strokeWidth="1.2"
                />
                {/* Steep arch swooping upward past the divider */}
                <path
                    d="M 450 240 C 580 180, 640 80, 670 0"
                    stroke="#D8AC44"
                    strokeWidth="1.2"
                />
                {/* Parallel steep arch on the right of the divider */}
                <path
                    d="M 520 240 C 640 170, 700 70, 730 0"
                    stroke="#D8AC44"
                    strokeWidth="1.2"
                />
                {/* Subtle lower accent curve */}
                <path
                    d="M 240 240 C 420 225, 600 195, 800 155"
                    stroke="#D8AC44"
                    strokeWidth="0.8"
                    strokeOpacity="0.6"
                />
            </svg>

            <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-0">
                {/* Left zone: Eyebrow, Headline, Subtitle */}
                <div className="lg:col-span-8">
                    <div className="flex items-center gap-2.5">
                        <span className="h-[2px] w-5 bg-gold-500 shrink-0" aria-hidden="true" />
                        <p className="font-body text-xs font-bold uppercase tracking-[0.18em] text-gold-500">
                            {eyebrow}
                        </p>
                    </div>
                    <h2 className="font-heading text-2xl font-bold leading-[1.2] text-white sm:text-3xl lg:text-[1.75rem] tracking-tight mt-3 max-w-xl lg:max-w-[38rem] text-balance">
                        {conclusion}
                    </h2>
                    {subtitle ? (
                        <p className="mt-3.5 text-xs sm:text-sm lg:text-base text-slate-300 max-w-lg leading-relaxed lg:leading-snug">
                            {subtitle}
                        </p>
                    ) : null}
                </div>

                {/* Center / Action zone */}
                <div className="flex flex-col items-start gap-3.5 lg:col-span-4 lg:items-start lg:justify-center lg:border-l lg:border-white/20 lg:pl-9">
                    <Link
                        href={primaryHref}
                        onClick={handlePrimaryClick}
                        data-analytics="why_us_primary_cta"
                        data-cta-placement="why_us_section"
                        className="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 active:bg-gold-600 px-7 py-3.5 text-sm font-bold text-brand-950 transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 lg:whitespace-nowrap lg:rounded-lg lg:px-6 lg:py-3 lg:text-[15px]"
                    >
                        <span>{primaryCtaText}</span>
                        <ArrowRight className="h-4 w-4 shrink-0 stroke-[2.5]" aria-hidden="true" />
                    </Link>
                    {secondaryCtaText ? (
                        <div className="flex flex-wrap items-center gap-1 text-xs sm:text-sm text-slate-300 lg:block">
                            <span className="lg:block">{secondaryPreText}</span>
                            <Link
                                href={secondaryHref}
                                onClick={handleSecondaryClick}
                                data-analytics="why_us_secondary_cta"
                                data-cta-placement="why_us_section"
                                className="inline-flex min-h-[44px] items-center font-medium text-slate-100 underline decoration-gold-500 decoration-1 underline-offset-4 hover:text-gold-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 lg:min-h-8"
                            >
                                <span>{secondaryCtaText} &rarr;</span>
                            </Link>
                        </div>
                    ) : null}
                </div>

            </div>
        </div>
    );
};

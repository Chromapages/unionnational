"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export type ClientLogo = { alt?: string; asset?: { url?: string; _id?: string } };

export function ClientLogoStrip({ logos = [], className }: { logos?: ClientLogo[]; className?: string }) {
    const t = useTranslations("ConsumerHome.logos");
    const [paused, setPaused] = useState(false);
    const reduceMotion = useReducedMotion();
    const available = logos.filter(logo => logo.asset?.url && logo.alt?.trim());
    if (!available.length) return null;
    const repeated = Array.from({ length: Math.ceil(6 / available.length) }, () => available).flat();

    return <section id="home-client-logos" aria-label={t("label")} className={cn("client-logo-strip overflow-hidden border-b border-slate-200 bg-white py-10 lg:py-12", className)}>
        <div className="mx-auto w-full max-w-[94rem] px-4 sm:px-6 lg:px-8">
            <span id="home-client-logo-names" className="sr-only">{available.map(logo => logo.alt).join(", ")}</span>
            <button type="button" onClick={() => setPaused(value => !value)} disabled={!!reduceMotion} aria-pressed={reduceMotion ? undefined : paused} aria-label={reduceMotion ? t("label") : paused ? t("resume") : t("pause")} aria-describedby="home-client-logo-names" title={reduceMotion ? undefined : paused ? t("resume") : t("pause")} className="relative block min-h-12 w-full cursor-pointer overflow-hidden border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-700 motion-reduce:cursor-default motion-reduce:overflow-visible">
                <span data-logo-track data-paused={paused} className="client-logo-strip-track flex w-max animate-scroll motion-reduce:w-full motion-reduce:animate-none">
                    {[0, 1].map(group => <span key={group} aria-hidden={group === 1 || undefined} className={cn("flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16", group === 1 ? "motion-reduce:hidden" : "motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pr-0")}>
                        {repeated.map((logo, index) => {
                            const duplicate = group === 1 || index >= available.length;
                            return <span key={index} aria-hidden={duplicate || undefined} className={cn("flex h-12 w-32 shrink-0 items-center justify-center sm:h-14 sm:w-48", index >= available.length && "motion-reduce:hidden")}><Image src={logo.asset!.url!} alt={duplicate ? "" : logo.alt!} width={192} height={56} sizes="(min-width: 640px) 192px, 128px" loading="eager" className="h-full w-full object-contain opacity-50 grayscale" /></span>;
                        })}
                    </span>)}
                </span>
                <span className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent sm:w-16 motion-reduce:hidden" aria-hidden="true" />
                <span className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent sm:w-16 motion-reduce:hidden" aria-hidden="true" />
            </button>
        </div>
    </section>;
}

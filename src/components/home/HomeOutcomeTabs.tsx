"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, ChartNoAxesColumnIncreasing, Check, Coins, FileText, Target } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const services = [
    { key: 1, href: "/tax-planning", tabIcon: Coins, serviceIcon: FileText },
    { key: 2, href: "/strategic-bookkeeping", tabIcon: ChartNoAxesColumnIncreasing, serviceIcon: ChartNoAxesColumnIncreasing },
    { key: 3, href: "/fractional-cfo", tabIcon: Target, serviceIcon: Target },
] as const;

export function HomeOutcomeTabs(): React.JSX.Element {
    const t = useTranslations("ConsumerHome.outcomes");
    const [selected, setSelected] = useState(0);
    const tabs = useRef<(HTMLButtonElement | null)[]>([]);

    function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
        let next: number;
        switch (event.key) {
            case "ArrowRight": next = (index + 1) % services.length; break;
            case "ArrowLeft": next = (index + services.length - 1) % services.length; break;
            case "Home": next = 0; break;
            case "End": next = services.length - 1; break;
            default: return;
        }
        event.preventDefault();
        tabs.current[next]?.focus();
    }

    return (
        <div className="mt-6 lg:mt-8">
            <div role="tablist" aria-labelledby="outcomes-heading" className="grid max-w-[64rem] grid-cols-3 gap-2 sm:gap-3">
                {services.map(({ key, tabIcon: Icon }, index) => (
                    <button
                        key={key}
                        ref={(node) => { tabs.current[index] = node; }}
                        type="button"
                        role="tab"
                        id={`home-outcome-tab-${key}`}
                        aria-controls={`home-outcome-panel-${key}`}
                        aria-selected={selected === index}
                        tabIndex={selected === index ? 0 : -1}
                        onFocus={() => setSelected(index)}
                        onClick={() => setSelected(index)}
                        onKeyDown={(event) => handleKeyDown(event, index)}
                        className={`relative flex min-h-16 min-w-0 flex-col items-center justify-center gap-2 rounded-xl border px-2 py-3 text-center font-heading text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-700 sm:min-h-20 sm:flex-row sm:gap-4 sm:px-6 sm:text-xl lg:text-2xl ${selected === index ? "border-brand-500 bg-brand-500 text-white after:absolute after:-bottom-1 after:h-1 after:w-1/3 after:rounded-full after:bg-[#c49b45]" : "border-[#e4e0d8] bg-white/40 text-brand-500 hover:bg-[#f5f1e8]"}`}
                    >
                        <Icon className={`size-6 shrink-0 sm:size-7 ${selected === index ? "text-gold-300" : "text-[#65725f]"}`} strokeWidth={1.6} aria-hidden="true" />
                        <span>{t(`items.${key}.tabLabel`)}</span>
                    </button>
                ))}
            </div>

            <div data-outcome-panels className="@container relative isolate mt-6 overflow-hidden rounded-xl border border-[#e4e0d8] bg-white/65">
                <div className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden @min-[56rem]:block" aria-hidden="true">
                    <div className="absolute top-10 -right-[22rem] size-[34rem] rounded-full bg-[#f7f3eb]" />
                    <div className="absolute -right-[20rem] -bottom-[20rem] size-[36rem] rounded-full bg-[radial-gradient(ellipse_at_35%_25%,#31584b,#173d32_75%)]" />
                    <div className="absolute top-28 -right-[23rem] size-[29rem] rounded-full border border-[#b99443]" />
                </div>
                <div className="grid">
                    {services.map(({ key, href, serviceIcon: Icon }, index) => (
                        <div
                            key={key}
                            role="tabpanel"
                            id={`home-outcome-panel-${key}`}
                            aria-labelledby={`home-outcome-tab-${key}`}
                            aria-hidden={selected !== index || undefined}
                            inert={selected !== index}
                            tabIndex={selected === index ? 0 : -1}
                            className={`relative grid min-w-0 gap-8 p-6 [grid-area:1/1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-gold-700 sm:p-8 @min-[56rem]:grid-cols-[minmax(0,1fr)_minmax(0,1.85fr)] @min-[56rem]:gap-0 @min-[56rem]:p-10 ${selected !== index ? "pointer-events-none invisible" : ""}`}
                        >
                            <div className="flex min-w-0 flex-col border-b border-[#e6e1d8] pb-6 @min-[56rem]:border-r @min-[56rem]:border-b-0 @min-[56rem]:pr-10 @min-[56rem]:pb-0">
                                <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#806325] sm:text-sm">{t("outcomeLabel")}</p>
                                <h3 className="mt-5 max-w-[18ch] font-heading text-[2rem] font-semibold leading-[1.15] tracking-[-0.025em] text-balance text-brand-500 lg:text-[2.5rem]">{t(`items.${key}.title`)}</h3>
                                <p className="mt-4 max-w-[30ch] font-body text-lg leading-[1.5] text-[#596d77] lg:text-xl">{t(`items.${key}.description`)}</p>
                                <div className="mt-auto pt-8">
                                    <span className="block h-px w-16 bg-[#b6a07a]" aria-hidden="true" />
                                    <p className="mt-4 max-w-[30ch] font-body text-base leading-[1.5] italic text-[#596d77] lg:text-lg">{t(`items.${key}.motto`)}</p>
                                </div>
                            </div>

                            <div className="min-w-0 @min-[56rem]:pl-10 @min-[56rem]:pr-24 @min-[76rem]:pr-32">
                                <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#806325] sm:text-sm">{t("serviceLabel")}</p>
                                <div className="mt-4 flex items-start gap-4">
                                    <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#faf4e8] text-[#8a6b30] sm:size-20" aria-hidden="true"><Icon className="size-8 sm:size-10" strokeWidth={1.5} /></span>
                                    <div className="min-w-0">
                                        <h4 className="font-heading text-2xl font-semibold leading-[1.2] tracking-[-0.015em] text-brand-500 sm:text-[1.75rem] lg:text-[2rem]">{t(`items.${key}.service`)}</h4>
                                        <p className="mt-2 max-w-[45ch] font-body text-base leading-[1.5] text-[#596d77] sm:text-lg">{t(`items.${key}.serviceDescription`)}</p>
                                    </div>
                                </div>
                                <ul className="mt-5 space-y-2 @min-[56rem]:ml-24">
                                    {([1, 2, 3, 4] as const).map((feature) => (
                                        <li key={feature} className="flex items-start gap-3 font-body text-base leading-[1.5] text-[#596d77] sm:text-lg">
                                            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#b99443] text-white" aria-hidden="true"><Check className="size-3.5" strokeWidth={2.5} /></span>
                                            <span>{t(`items.${key}.features.${feature}`)}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link data-outcome-primary href={href} className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-[8px] bg-brand-500 px-6 py-3 text-center font-heading text-lg font-semibold text-white transition-colors hover:bg-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-700 sm:w-fit @min-[56rem]:ml-24">
                                    <span className="min-w-0">{t(`items.${key}.link`)}</span><ArrowRight className="size-5 shrink-0" aria-hidden="true" />
                                </Link>
                                <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-[#e6e1d8] pt-4 font-body text-sm leading-[1.5] text-[#596d77] @min-[56rem]:ml-24">
                                    <span>{t("relatedLabel")}</span>
                                    {services.filter((service) => service.key !== key).map((service, relatedIndex) => (
                                        <span key={service.key} className="inline-flex items-center gap-3">
                                            {relatedIndex > 0 ? <span aria-hidden="true">·</span> : null}
                                            <Link href={service.href} className="inline-flex min-h-6 items-center text-brand-500 underline underline-offset-4 hover:text-gold-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-700">{t(`items.${service.key}.service`)}</Link>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

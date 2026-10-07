import { ArrowRight, Coins, FileText, LockKeyhole } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ServicePageContainer } from "@/components/services/ServicePageContainer";

export async function HomeTaxResolutionSection() {
    const t = await getTranslations("ConsumerHome.taxResolution");

    return (
        <section id="back-taxes-irs-tax-resolution" aria-label={t("serviceTitle")} className="relative isolate overflow-hidden bg-slate-50 py-12 lg:py-16">
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-64 -left-72 -z-10 size-[32rem] rounded-full bg-brand-50/40" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-96 -left-48 -z-10 size-[36rem] rounded-full bg-brand-50/30" />
            <ServicePageContainer>
                <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] xl:gap-16">
                    <div className="min-w-0">
                        <p className="flex items-center gap-4 font-body text-xs font-semibold uppercase tracking-[0.15em] text-brand-400 sm:text-sm"><span aria-hidden="true" className="h-px w-10 shrink-0 bg-brand-400" />{t("eyebrow")}</p>
                        <h2 className="mt-5 font-heading text-3xl font-bold leading-[1.08] tracking-[-.025em] text-brand-950 sm:text-4xl xl:text-[2.75rem]">
                            <span className="block">{t("titleLead")}</span>{" "}<span className="block">{t("titleNext")}</span>
                        </h2>
                        <p className="mt-5 max-w-[58ch] font-body text-base leading-relaxed text-slate-700 sm:text-lg xl:text-xl">{t("intro")}</p>
                        <Link href="/back-taxes-irs-tax-resolution" className="mt-6 inline-flex min-h-14 max-w-full items-center justify-center gap-4 rounded-full bg-gold-500 px-6 py-3 text-center font-heading text-base font-bold text-brand-950 transition-colors hover:bg-gold-400 active:bg-gold-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-900 motion-reduce:transition-none sm:px-8 sm:text-lg">
                            <span>{t("cta")}</span><ArrowRight aria-hidden="true" className="size-5 shrink-0" />
                        </Link>
                        <p className="mt-6 flex max-w-2xl items-center gap-4 rounded-lg bg-brand-50/60 px-4 py-3 font-body text-sm leading-relaxed text-slate-700">
                            <LockKeyhole aria-hidden="true" className="size-5 shrink-0 text-brand-500" />
                            <span className="border-l border-brand-200 pl-4">{t("privacyNote")}</span>
                        </p>
                    </div>
                    <div className="min-w-0 rounded-xl border border-brand-200 bg-white p-5 sm:p-8">
                        <h3 className="font-body text-xs font-bold uppercase leading-relaxed tracking-[0.12em] text-brand-400 sm:text-sm">{t("relevanceTitle")}</h3>
                        <ol className="mt-6 space-y-7 sm:mt-7 sm:space-y-8">
                            {([{ key: "filings", icon: FileText }, { key: "balance", icon: Coins }] as const).map(({ key, icon: Icon }, index) => (
                                <li key={key} className="grid grid-cols-[2.75rem_1.5rem_minmax(0,1fr)] items-start gap-3 sm:grid-cols-[3.5rem_2rem_minmax(0,1fr)] sm:gap-4">
                                    <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-full bg-brand-50/60 font-heading text-lg font-semibold tabular-nums text-brand-400 sm:size-14">{String(index + 1).padStart(2, "0")}</span>
                                    <Icon aria-hidden="true" strokeWidth={1.6} className="mt-2 size-6 text-brand-400 sm:mt-3 sm:size-8" />
                                    <div className="min-w-0 pt-1 sm:pt-2">
                                        <h4 className="font-heading text-base font-bold uppercase leading-snug text-brand-900 sm:text-lg">{t(`${key}Title`)}</h4>
                                        <p className="mt-1 font-body text-base leading-relaxed text-slate-700">{t(`${key}Description`)}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                        <div className="mt-7 border-t border-brand-200 pt-6">
                            <h3 className="font-body text-xs font-bold uppercase tracking-[0.12em] text-brand-400 sm:text-sm">{t("nextTitle")}</h3>
                            <div className="mt-4 flex items-start gap-4">
                                <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-50/60 text-brand-400 sm:size-14"><ArrowRight className="size-6" /></span>
                                <p className="min-w-0 font-body text-base leading-relaxed text-slate-700 sm:pt-1">{t("nextDescription")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </ServicePageContainer>
        </section>
    );
}

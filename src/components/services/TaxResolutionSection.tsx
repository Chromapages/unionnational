import { ArrowRight, FileText, MessagesSquare } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ServicePageContainer } from "./ServicePageContainer";

export function TaxResolutionSection() {
    const t = useTranslations("TaxResolution");

    return (
        <section id="back-taxes-irs-tax-resolution" aria-labelledby="tax-resolution-heading" className="scroll-mt-28 border-y border-brand-100 bg-slate-50 py-10 lg:py-12">
            <ServicePageContainer>
                <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
                    <div className="min-w-0">
                        <h2 id="tax-resolution-heading" className="max-w-[25ch] font-heading text-3xl font-bold leading-[1.12] tracking-tight text-brand-950 sm:text-4xl lg:text-[2.75rem]">{t("title")}</h2>
                        <p className="mt-4 max-w-[55ch] font-body text-base leading-relaxed text-slate-700 sm:text-lg">{t("intro")}</p>
                        <Link href="/back-taxes-irs-tax-resolution" className="mt-6 inline-flex min-h-14 max-w-full items-center justify-center gap-3 rounded-full bg-gold-500 px-6 py-3 text-center font-heading text-base font-semibold text-brand-950 transition-colors hover:bg-gold-400 active:bg-gold-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-900 motion-reduce:transition-none">
                            <span>{t("detailLink")}</span><ArrowRight className="size-5 shrink-0" aria-hidden="true" />
                        </Link>
                        <p className="mt-3 max-w-[55ch] text-sm leading-relaxed text-slate-700">{t("privacyNote")}</p>
                    </div>
                    <div className="min-w-0 rounded-xl border border-brand-100 bg-white p-6 sm:p-8">
                        <ul className="space-y-6">
                            {([{ key: "filings", icon: FileText }, { key: "balance", icon: MessagesSquare }] as const).map(({ key, icon: Icon }) => (
                                <li key={key} className="flex items-start gap-4">
                                    <Icon className="mt-1 size-6 shrink-0 text-gold-700" strokeWidth={1.6} aria-hidden="true" />
                                    <div className="min-w-0">
                                        <h3 className="font-heading text-lg font-semibold text-brand-900">{t(`${key}.title`)}</h3>
                                        <p className="mt-1 text-base leading-relaxed text-slate-700">{t(`${key}.description`)}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-6 border-t border-brand-100 pt-5 text-sm leading-relaxed text-slate-700">{t("scopeNote")}</p>
                    </div>
                </div>
            </ServicePageContainer>
        </section>
    );
}

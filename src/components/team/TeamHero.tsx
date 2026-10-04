import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowRight, ChartNoAxesColumnIncreasing, FileText } from "lucide-react";

export async function TeamHero({ badge, title, subtitle }: { badge: string; title: string; subtitle: string }) {
    const t = await getTranslations("TeamPage.directory");
    return <section id="team-hero" aria-labelledby="team-page-heading" className="bg-white py-10 text-brand-950 lg:py-12">
        <div className="mx-auto grid w-full max-w-[94rem] gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:px-8 xl:gap-16">
            <div className="min-w-0">
                <p className="flex items-center gap-4 font-heading text-sm font-bold uppercase tracking-[.14em] text-gold-700"><span>{badge}</span><span className="h-px w-24 shrink-0 bg-gold-600" aria-hidden="true" /></p>
                <h1 id="team-page-heading" className="mt-5 max-w-full font-heading text-[clamp(2.25rem,4vw,3.75rem)] font-bold leading-[1.08] tracking-[-.04em]">{title}</h1>
                <p className="mt-5 max-w-[48ch] text-lg leading-[1.45] text-slate-700 sm:text-xl">{subtitle}</p>
                <Link href="#team-members" className="mt-7 inline-flex min-h-14 max-w-full items-center justify-center gap-5 rounded-lg bg-gold-400 px-6 py-3 font-heading text-base font-bold text-brand-950 transition-colors hover:bg-gold-300 active:bg-gold-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-700 motion-reduce:transition-none sm:px-8 sm:text-lg"><span>{t("meetTeam")}</span><ArrowRight className="size-6 shrink-0" strokeWidth={1.8} aria-hidden="true" /></Link>
            </div>
            <div className="min-w-0 border-t border-slate-200 pt-8 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0 xl:pl-16">
                <div className="flex items-center gap-4"><h2 id="team-practice-heading" className="font-heading text-sm font-bold uppercase leading-relaxed tracking-[.14em] text-gold-700">{t("practiceLabel")}</h2><span className="h-px w-16 shrink-0 bg-gold-600" aria-hidden="true" /></div>
                <ul aria-labelledby="team-practice-heading" className="mt-8 divide-y divide-slate-200">
                    {[FileText, ChartNoAxesColumnIncreasing].map((Icon, index) => <li key={index} className="flex min-w-0 items-center gap-5 py-6 first:pt-0 last:pb-0 sm:gap-7 lg:gap-8">
                        <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-brand-50/50 text-brand-500 sm:size-20 lg:size-28" aria-hidden="true"><Icon className="size-8 sm:size-10 lg:size-14" strokeWidth={1.5} /></span>
                        <div className="min-w-0"><h3 className="font-heading text-xl font-bold leading-tight tracking-tight sm:text-2xl lg:text-3xl">{t(`practiceItems.${index}.title`)}</h3><p className="mt-2 max-w-[23ch] text-base leading-relaxed text-slate-700 sm:text-lg lg:text-xl">{t(`practiceItems.${index}.detail`)}</p></div>
                    </li>)}
                </ul>
            </div>
        </div>
    </section>;
}

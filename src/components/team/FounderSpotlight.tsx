import { getTranslations } from "next-intl/server";
import { urlFor } from "@/sanity/lib/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ChartNoAxesColumnIncreasing, ShieldCheck, UsersRound } from "lucide-react";
import type { TeamMember } from "@/types/sanity";

export async function FounderSpotlight({ founder, approvedTitle }: { founder?: TeamMember; approvedTitle?: string }) {
    if (!founder) return null;
    const [t, directory] = await Promise.all([getTranslations("AboutPage.Simplified"), getTranslations("TeamPage.directory")]);
    const name = founder.name.trim().split(",")[0];
    const title = approvedTitle?.trim() || directory("founderRole");
    const credentials = [...new Set((founder.credentials || "").split(/,|\//).map(tag => tag.trim()).filter(Boolean))];
    const hasEA = credentials.some(tag => tag.toUpperCase() === "EA");
    const badges = credentials.filter(tag => tag.toUpperCase() !== "EA");
    const storyClass = "box-border inline-flex min-h-14 max-w-full cursor-pointer list-none items-center justify-center gap-4 rounded-lg bg-gold-400 px-6 py-3 font-heading text-base font-bold text-brand-950 transition-colors hover:bg-gold-300 active:bg-gold-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-700 motion-reduce:transition-none [&::-webkit-details-marker]:hidden sm:px-8 sm:text-lg";
    return <section id="founder" aria-labelledby="team-founder-heading" className="scroll-mt-28 py-10 lg:py-12">
        <div className="mx-auto w-full max-w-[94rem] px-4 sm:px-6 lg:px-8">
            <article data-directory-founder className="grid min-w-0 gap-8 rounded-2xl border border-slate-200 bg-brand-50/35 p-5 sm:p-6 md:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:p-8 xl:grid-cols-[minmax(0,.95fr)_minmax(0,1.2fr)_minmax(0,1fr)] xl:gap-10">
                <div className="mx-auto aspect-[4/5] w-full max-w-80 overflow-hidden rounded-xl bg-brand-50 md:max-w-none xl:self-start">
                    {founder.image ? <img src={urlFor(founder.image).width(1000).url()} alt={name} width={600} height={750} loading="lazy" decoding="async" className="h-full w-full object-cover object-top" /> : <span className="flex h-full items-center justify-center text-sm text-slate-700">{t("photoPending")}</span>}
                </div>
                <div className="min-w-0 self-center">
                    <p className="flex items-center gap-4 font-heading text-sm font-bold uppercase tracking-[.1em] text-gold-700"><span>{t("founderHeading")}</span><span className="h-px w-20 shrink-0 bg-gold-600" aria-hidden="true" /></p>
                    <h2 id="team-founder-heading" className="mt-4 font-heading text-3xl font-bold leading-[1.12] tracking-[-.025em] text-brand-950 sm:text-4xl lg:text-[2.75rem]">{name}{hasEA && ", EA"}</h2>
                    <p className="mt-2 text-lg leading-relaxed text-slate-700">{title}</p>
                    {badges.length > 0 && <div className="mt-5 flex flex-wrap gap-3">{badges.map(tag => <span key={tag} data-credential className="rounded-xl bg-brand-50 px-4 py-3 font-heading text-base font-bold text-brand-900">{tag}</span>)}</div>}
                    <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-slate-700 sm:text-lg">{founder.bioShort || t("mission")}</p>
                    {founder.description ? <details className="group mt-6 max-w-[65ch]">
                        <summary style={{ boxSizing: "border-box" }} className={storyClass}><span>{directory("founderStory")}</span><ArrowRight className="size-6 shrink-0 transition-transform group-open:rotate-90 motion-reduce:transition-none" aria-hidden="true" /></summary>
                        <p className="mt-5 whitespace-pre-line text-base leading-relaxed text-slate-700">{founder.description}</p>
                    </details> : <Link href="/about#about-founder" className={`${storyClass} mt-6`}><span>{directory("founderStory")}</span><ArrowRight className="size-6 shrink-0" aria-hidden="true" /></Link>}
                </div>
                <aside data-founder-perspective aria-labelledby="founder-perspective-heading" className="min-w-0 border-t border-brand-100 pt-8 md:col-span-2 xl:col-span-1 xl:border-t-0 xl:border-l xl:pl-8 xl:pt-0">
                    <h3 id="founder-perspective-heading" className="flex items-center gap-4 font-heading text-sm font-bold uppercase tracking-[.1em] text-gold-700"><span>{directory("founderPerspective.heading")}</span><span className="h-px w-16 shrink-0 bg-gold-600" aria-hidden="true" /></h3>
                    <figure className="mt-6">
                        <blockquote className="max-w-[28ch] pb-1 font-body text-2xl italic leading-relaxed tracking-tight text-brand-500 xl:text-3xl">&ldquo;{directory("founderPerspective.quote")}&rdquo;</blockquote>
                        <figcaption className="mt-6 flex items-start gap-4"><span className="mt-3 h-px w-8 shrink-0 bg-gold-600" aria-hidden="true" /><div className="min-w-0"><p className="font-heading text-sm font-semibold uppercase tracking-[.1em] text-slate-700">{name}</p><p className="mt-1 text-xs uppercase leading-relaxed tracking-[.1em] text-slate-700">{title}</p></div></figcaption>
                    </figure>
                    <ul data-founder-principles className="mt-8 grid grid-cols-3 divide-x divide-brand-100 border-t border-brand-100 pt-6">
                        {[ChartNoAxesColumnIncreasing, UsersRound, ShieldCheck].map((Icon, index) => <li key={index} className="flex min-w-0 flex-col items-center gap-3 px-2 text-center first:pl-0 last:pr-0"><Icon className="size-8 text-brand-500" strokeWidth={1.5} aria-hidden="true" /><span className="text-sm leading-relaxed text-brand-900">{directory(`founderPerspective.principles.${index}`)}</span></li>)}
                    </ul>
                </aside>
            </article>
        </div>
    </section>;
}

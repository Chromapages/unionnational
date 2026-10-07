import Image from "next/image";
import { ArrowRight, Calculator, ChartNoAxesCombined, ChartNoAxesColumnIncreasing, Coins, Settings, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ServicePageContainer } from "@/components/services/ServicePageContainer";

export async function ConstructionBookFeature() {
    const t = await getTranslations("ConsumerHome.constructionBook");

    return (
        <section id="construction-book" aria-labelledby="construction-book-heading" className="scroll-mt-28 bg-slate-50 py-10 lg:py-12">
            <ServicePageContainer>
                <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
                    <div className="relative isolate min-w-0 py-4">
                        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                            <Image src="/images/industries-construction-site.webp" alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" loading="lazy" className="object-cover object-left opacity-5 grayscale [mask-image:radial-gradient(ellipse_at_bottom_left,black,transparent_75%)]" />
                        </div>
                        <p className="absolute left-0 top-12 hidden max-w-[9ch] border-t-2 border-gold-700 pt-4 font-body text-xs font-medium uppercase leading-relaxed tracking-[.15em] text-gold-700 xl:block">{t("sideMotto")}</p>
                        <Image
                            src="https://cdn.sanity.io/images/p1x9y3wz/production/fa0de758c05a6ebc863e41bc185645feb27e3360-1620x1620.png"
                            alt={t("coverAlt")}
                            width={1620}
                            height={1620}
                            sizes="(min-width: 1536px) 640px, (min-width: 1024px) 43vw, (min-width: 640px) 400px, 280px"
                            loading="lazy"
                            className="mx-auto aspect-square h-auto w-full max-w-70 object-contain mix-blend-multiply sm:max-w-100 lg:max-w-160"
                        />
                        <p className="mx-auto mt-4 px-4 text-center font-body text-xs font-medium uppercase leading-relaxed tracking-[.18em] text-gold-700 before:mx-auto before:mb-4 before:block before:h-px before:w-10 before:bg-gold-700">{t("bottomMotto")}</p>
                    </div>
                    <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 xl:p-10">
                        <p className="font-body text-xs font-semibold uppercase leading-[1.4] tracking-[0.12em] text-gold-700 md:text-[0.8125rem] lg:text-sm">{t("eyebrow")}</p>
                        <h2 id="construction-book-heading" className="mt-4 max-w-[25ch] text-balance font-heading text-3xl font-bold leading-[1.12] tracking-[-.025em] text-brand-950 sm:text-4xl xl:text-5xl">{t("title")}</h2>
                        <p className="mt-4 max-w-[62ch] font-body text-base leading-relaxed text-slate-700 sm:text-lg xl:text-xl">{t("body")}</p>
                        <p className="mt-4 font-body text-sm font-semibold text-brand-900">{t("credit")}</p>
                        <ul aria-label={t("topicsLabel")} className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
                            {([{ key: "jobCosting", icon: Calculator }, { key: "estimating", icon: ChartNoAxesColumnIncreasing }, { key: "cashFlow", icon: Coins }, { key: "operations", icon: Settings }] as const).map(({ key, icon: Icon }) => (
                                <li key={key} className="flex min-w-0 items-center justify-center gap-2 rounded-full bg-brand-50/60 px-3 py-3 font-body text-sm font-medium text-brand-500"><Icon aria-hidden="true" className="size-5 shrink-0" /><span>{t(`topics.${key}`)}</span></li>
                            ))}
                        </ul>
                        <ul aria-label={t("benefitsLabel")} className="mt-5 grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-3 sm:gap-0 sm:p-5">
                            {([{ key: "visibility", icon: ChartNoAxesCombined }, { key: "cash", icon: Coins }, { key: "organization", icon: Users }] as const).map(({ key, icon: Icon }) => (
                                <li key={key} className="grid min-w-0 grid-cols-[2rem_minmax(0,1fr)] gap-x-3 border-t border-slate-200 pt-4 first:border-t-0 first:pt-0 sm:block sm:border-t-0 sm:border-l sm:px-4 sm:pt-0 sm:first:border-l-0 sm:first:pl-0 sm:last:pr-0">
                                    <span className="row-span-2 flex size-8 items-center justify-center rounded-full bg-gold-50 text-gold-700 sm:size-10"><Icon aria-hidden="true" className="size-5 sm:size-6" strokeWidth={1.8} /></span>
                                    <h3 className="font-heading text-base font-semibold leading-snug text-brand-900 sm:mt-3 sm:text-lg">{t(`benefits.${key}.title`)}</h3>
                                    <p className="col-start-2 mt-1 font-body text-sm leading-relaxed text-slate-700 sm:mt-2">{t(`benefits.${key}.body`)}</p>
                                </li>
                            ))}
                        </ul>
                        <Link href="/shop/the-money-making-blueprint-for-construction-companies" className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-6 rounded-full bg-brand-500 px-6 py-3 text-center font-heading text-base font-semibold text-white transition-colors hover:bg-brand-600 active:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-700 motion-reduce:transition-none sm:w-auto sm:min-w-72 sm:text-lg">
                            <span>{t("cta")}</span><ArrowRight className="size-5 shrink-0" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </ServicePageContainer>
        </section>
    );
}

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ServicePageContainer } from "@/components/services/ServicePageContainer";

export async function ConstructionBookFeature() {
    const t = await getTranslations("ConsumerHome.constructionBook");

    return (
        <section id="construction-book" aria-labelledby="construction-book-heading" className="scroll-mt-28 border-y border-brand-100 bg-slate-50 py-10 lg:py-12">
            <ServicePageContainer>
                <div className="grid items-center gap-8 md:grid-cols-[17.5rem_minmax(0,1fr)] lg:gap-12">
                    <Image
                        src="https://cdn.sanity.io/images/p1x9y3wz/production/fa0de758c05a6ebc863e41bc185645feb27e3360-1620x1620.png"
                        alt={t("coverAlt")}
                        width={1620}
                        height={1620}
                        sizes="(min-width: 640px) 280px, 240px"
                        loading="lazy"
                        className="aspect-square h-auto w-full max-w-60 justify-self-center object-contain sm:max-w-70"
                    />
                    <div className="min-w-0">
                        <p className="font-body text-xs font-semibold uppercase leading-[1.4] tracking-[0.12em] text-gold-700 md:text-[0.8125rem] lg:text-sm">{t("eyebrow")}</p>
                        <h2 id="construction-book-heading" className="mt-4 max-w-[25ch] text-balance font-heading text-3xl font-bold leading-[1.12] tracking-[-.025em] text-brand-950 sm:text-4xl lg:text-[2.75rem]">{t("title")}</h2>
                        <p className="mt-4 max-w-[62ch] font-body text-base leading-relaxed text-slate-700 sm:text-lg">{t("body")}</p>
                        <p className="mt-4 font-body text-sm font-semibold text-brand-900">{t("credit")}</p>
                        <Link href="/shop/the-money-making-blueprint-for-construction-companies" className="mt-6 inline-flex min-h-14 max-w-full items-center justify-center gap-3 rounded-full border border-brand-400 px-6 py-3 text-center font-heading text-base font-semibold text-brand-900 transition-colors hover:bg-gold-50 active:bg-gold-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-900 motion-reduce:transition-none">
                            <span>{t("cta")}</span><ArrowRight className="size-5 shrink-0" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </ServicePageContainer>
        </section>
    );
}

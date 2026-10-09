import Image from "next/image";
import { ArrowDown, ArrowRight, Check, CircleHelp, ClipboardList, Utensils, HardHat } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ServicePageContainer } from "@/components/services/ServicePageContainer";
import { MultiStepContactForm } from "@/components/contact/MultiStepContactForm";
import { getIndustryServiceContent, type IndustryKey } from "@/lib/industries/service-content";

const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-900";

export function IndustryServiceExperience({ industry, locale }: { industry: IndustryKey; locale: string }) {
    const copy = getIndustryServiceContent(industry, locale);
    const construction = industry === "construction";
    const Icon = construction ? HardHat : Utensils;
    const anchor = "#consultation-form";
    const inquiry = <Link href={anchor} className={`inline-flex min-h-14 max-w-full items-center justify-center gap-3 rounded-full bg-gold-500 px-6 py-3 text-center font-heading text-base font-semibold text-brand-950 transition-colors hover:bg-gold-400 active:bg-gold-300 motion-reduce:transition-none ${focus}`}><span>{copy.cta}</span><ArrowRight aria-hidden="true" className="size-5 shrink-0" /></Link>;

    return <>
        <section aria-labelledby="industry-heading" className="border-b border-brand-100 bg-white py-8 lg:py-12">
            <ServicePageContainer>
                <nav aria-label={locale === "es" ? "Ruta de navegación" : "Breadcrumb"} className="mb-6 flex flex-wrap items-center gap-3 text-sm text-slate-700">
                    <Link href="/industries" className={`inline-flex min-h-11 items-center rounded-sm underline underline-offset-4 ${focus}`}>{copy.directory}</Link><span aria-hidden="true">/</span><span aria-current="page">{copy.name}</span>
                </nav>
                <div className={`grid items-center gap-8 lg:gap-12 ${construction ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" : "lg:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)]"}`}>
                    <div className="min-w-0">
                        <p className="flex items-center gap-3 font-body text-xs font-semibold uppercase leading-relaxed tracking-[.12em] text-gold-700 sm:text-sm"><Icon aria-hidden="true" className="size-5 shrink-0" />{copy.eyebrow}</p>
                        <h1 id="industry-heading" className="mt-5 max-w-[21ch] text-balance font-heading text-4xl font-bold leading-[1.08] tracking-[-.03em] text-brand-950 sm:text-5xl xl:text-6xl">{copy.title}</h1>
                        <p className="mt-5 max-w-[56ch] font-body text-base leading-relaxed text-slate-700 sm:text-lg xl:text-xl">{copy.intro}</p>
                        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">{inquiry}<Link href="#industry-topics" className={`inline-flex min-h-11 items-center gap-2 rounded-sm font-heading text-sm font-semibold text-brand-900 underline decoration-gold-700 underline-offset-4 ${focus}`}>{copy.overviewLink}<ArrowDown aria-hidden="true" className="size-4 shrink-0" /></Link></div>
                    </div>
                    <div className={`relative min-w-0 overflow-hidden rounded-2xl border border-brand-100 ${construction ? "aspect-[4/3]" : "mx-auto aspect-square w-full max-w-[30rem] bg-gold-50"}`}>
                        <Image src={copy.image} alt={copy.imageAlt} fill loading="eager" fetchPriority="high" sizes={construction ? "(min-width: 1024px) 46vw, 100vw" : "(min-width: 1024px) 40vw, (min-width: 640px) 480px, 100vw"} className={construction ? "object-cover" : "object-contain"} />
                    </div>
                </div>
            </ServicePageContainer>
        </section>

        <section aria-labelledby="industry-problems-heading" className="bg-slate-50 py-10 lg:py-14">
            <ServicePageContainer>
                <div className="grid gap-8 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-12">
                    <div className="min-w-0"><h2 id="industry-problems-heading" className="max-w-[23ch] font-heading text-3xl font-bold leading-tight tracking-tight text-brand-900 sm:text-4xl">{copy.problemTitle}</h2><p className="mt-4 max-w-[54ch] text-base leading-relaxed text-slate-700 sm:text-lg">{copy.problemIntro}</p></div>
                    <ul className="grid gap-4 sm:grid-cols-2">{copy.problems.map(problem => <li key={problem} className="flex min-w-0 items-start gap-3 rounded-xl border border-brand-100 bg-white p-5"><CircleHelp aria-hidden="true" className="mt-1 size-5 shrink-0 text-gold-700" /><p className="text-base leading-relaxed text-brand-900">{problem}</p></li>)}</ul>
                </div>
            </ServicePageContainer>
        </section>

        <section aria-labelledby="industry-flow-heading" className="bg-white py-10 lg:py-14">
            <ServicePageContainer>
                <div className="max-w-3xl"><h2 id="industry-flow-heading" className="font-heading text-3xl font-bold leading-tight tracking-tight text-brand-900 sm:text-4xl">{copy.flowTitle}</h2><p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">{copy.flowIntro}</p></div>
                <ol className={`mt-7 grid gap-4 ${construction ? "md:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-4"}`}>{copy.flow.map((label, index) => <li key={label} className={`min-w-0 border-l-2 border-brand-400 pl-4 ${construction ? "border-t-2 border-t-gold-500 pt-4 md:border-l-0" : "rounded-r-lg bg-gold-50 p-5"}`}><p aria-hidden="true" className="font-heading text-sm font-semibold tabular-nums text-gold-700">{String(index + 1).padStart(2, "0")}</p><p className="mt-2 font-heading text-lg font-semibold leading-snug text-brand-900">{label}</p></li>)}</ol>
            </ServicePageContainer>
        </section>

        <section id="industry-topics" aria-labelledby="industry-topics-heading" className="scroll-mt-28 border-y border-brand-100 bg-slate-50 py-10 lg:py-14">
            <ServicePageContainer>
                <div className="max-w-3xl"><h2 id="industry-topics-heading" className="font-heading text-3xl font-bold leading-tight tracking-tight text-brand-900 sm:text-4xl">{copy.topicsTitle}</h2><p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">{copy.topicsIntro}</p></div>
                <div className="mt-7 grid gap-5 md:grid-cols-2">{copy.topics.map(topic => <article key={topic.title} className="min-w-0 rounded-xl border border-brand-100 bg-white p-6 sm:p-8"><h3 className="font-heading text-xl font-semibold text-brand-900">{topic.title}</h3><p className="mt-3 text-base leading-relaxed text-slate-700">{topic.description}</p></article>)}</div>
            </ServicePageContainer>
        </section>

        <section aria-labelledby="industry-process-heading" className="bg-white py-10 lg:py-14">
            <ServicePageContainer>
                <h2 id="industry-process-heading" className="max-w-[30ch] font-heading text-3xl font-bold leading-tight tracking-tight text-brand-900 sm:text-4xl">{copy.processTitle}</h2>
                <ol className="mt-7 grid gap-6 md:grid-cols-3">{copy.process.map((step, index) => <li key={step.title} className="min-w-0 border-t border-brand-200 pt-5"><p aria-hidden="true" className="font-heading text-lg font-semibold tabular-nums text-gold-700">{String(index + 1).padStart(2, "0")}</p><h3 className="mt-3 font-heading text-xl font-semibold text-brand-900">{step.title}</h3><p className="mt-3 text-base leading-relaxed text-slate-700">{step.description}</p></li>)}</ol>
            </ServicePageContainer>
        </section>

        <section aria-labelledby="industry-fit-heading" className="bg-brand-900 py-10 text-white lg:py-14">
            <ServicePageContainer>
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-12"><div className="min-w-0"><h2 id="industry-fit-heading" className="max-w-[25ch] font-heading text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{copy.fitTitle}</h2><p className="mt-4 max-w-[56ch] text-base leading-relaxed text-slate-100 sm:text-lg">{copy.fitIntro}</p></div><ul className="space-y-5">{copy.fit.map(item => <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-slate-100"><Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-gold-300" /><span>{item}</span></li>)}</ul></div>
            </ServicePageContainer>
        </section>

        <section aria-labelledby="industry-faq-heading" className="bg-white py-10 lg:py-14">
            <ServicePageContainer variant="narrow">
                <h2 id="industry-faq-heading" className="font-heading text-3xl font-bold leading-tight tracking-tight text-brand-900 sm:text-4xl">{copy.faqTitle}</h2>
                <div className="mt-7 divide-y divide-brand-100 border-y border-brand-100">{copy.faqs.map(faq => <details key={faq.question} className="group py-1"><summary className={`flex min-h-14 cursor-pointer items-center gap-4 rounded-sm py-4 font-heading text-lg font-semibold leading-snug text-brand-900 ${focus}`}><span className="min-w-0 flex-1">{faq.question}</span><ArrowDown aria-hidden="true" className="size-5 shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none" /></summary><p className="pb-5 pr-8 text-base leading-relaxed text-slate-700">{faq.answer}</p></details>)}</div>
            </ServicePageContainer>
        </section>

        <section id="consultation-form" aria-labelledby="industry-inquiry-heading" className="scroll-mt-28 border-t border-brand-100 bg-slate-50 py-10 lg:py-14">
            <ServicePageContainer>
                <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-12">
                    <div className="min-w-0"><ClipboardList aria-hidden="true" className="size-8 text-gold-700" /><h2 id="industry-inquiry-heading" className="mt-5 max-w-[25ch] font-heading text-3xl font-bold leading-tight tracking-tight text-brand-900 sm:text-4xl">{copy.formTitle}</h2><p className="mt-4 max-w-[54ch] text-base leading-relaxed text-slate-700 sm:text-lg">{copy.formIntro}</p><p className="mt-5 rounded-xl border border-brand-100 bg-white p-4 text-sm leading-relaxed text-slate-700">{copy.privacy}</p></div>
                    <div className="min-w-0"><MultiStepContactForm industry={industry} title={copy.cta} subtitle={copy.formIntro} /></div>
                </div>
            </ServicePageContainer>
        </section>
    </>;
}

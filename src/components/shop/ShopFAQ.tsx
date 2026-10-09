"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { FAQAccordion } from "@/components/home/FAQAccordion";
import { useTranslations } from "next-intl";
import { ArrowRight, BookOpen, FileText, Leaf, MessageCircle, UserRound } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface FAQItem {
    question: string;
    answer: string;
}

interface ShopFAQProps {
    items: FAQItem[];
    sectionId?: string;
    copy?: FAQSupportCopy;
    className?: string;
}

export interface FAQSupportCopy {
    eyebrow: string;
    title: string;
    body: string;
    items: { title: string; body: string }[];
    stillQuestions: string;
    cta: string;
    ctaHref?: string;
    faqLabel: string;
    answersTitle: string;
    answersBody: string;
}

export function ShopFAQ({ items, sectionId = "shop-faq", copy, className }: ShopFAQProps) {
    const t = useTranslations("Shop.Desktop.faq");
    if (!items || items.length === 0) return null;
    const support = copy || {
        eyebrow: t("support.eyebrow"), title: t("support.title"), body: t("support.body"),
        items: [0, 1, 2].map(index => ({ title: t(`support.items.${index}.title`), body: t(`support.items.${index}.body`) })),
        stillQuestions: t("stillQuestions"), cta: t("support.cta"), faqLabel: t("support.faqLabel"),
        answersTitle: t("support.answersTitle"), answersBody: t("support.answersBody"),
    };

    // Map shop items (simple objects) to the format expected by FAQAccordion
    const mappedItems = items.map((item, idx) => ({
        _id: `${sectionId}-${idx}`,
        question: item.question,
        answer: item.answer,
        category: support.faqLabel
    }));

    return (
        <section id={sectionId} className={cn("mx-auto mb-12 w-full max-w-[94rem] scroll-mt-[calc(var(--header-height)+1.5rem)] px-4 sm:px-6 lg:px-8", className)} aria-labelledby={`${sectionId}-heading`}>
            <RevealOnScroll>
                <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,.52fr)_minmax(0,1fr)] lg:gap-12">
                    <aside className="relative isolate overflow-hidden rounded-2xl bg-gold-50/50 p-6 sm:p-8 lg:min-h-[48rem] xl:p-10">
                        <div className="pointer-events-none absolute -bottom-16 -left-14 -z-10 text-brand-900/5" aria-hidden="true"><Leaf className="h-64 w-64 -rotate-45" strokeWidth={1} /></div>
                        <div className="pointer-events-none absolute -bottom-20 -right-12 -z-10 text-brand-900/5" aria-hidden="true"><Leaf className="h-64 w-64 rotate-45" strokeWidth={1} /></div>
                        <p className="text-sm font-bold uppercase tracking-[0.13em] text-brand-500">{support.eyebrow}</p>
                        <span className="mt-3 block h-px w-20 bg-gold-500" aria-hidden="true" />
                        <h2 data-faq-title id={`${sectionId}-heading`} className="mt-6 font-heading text-3xl font-bold leading-[1.08] tracking-tight text-brand-950 sm:text-4xl lg:max-w-[11ch] xl:text-5xl">{support.title}</h2>
                        <p className="mt-5 text-base leading-relaxed text-brand-500 sm:text-lg">{support.body}</p>
                        <ul className="mt-6 space-y-5">
                            {[BookOpen, UserRound, FileText].map((Icon, index) => support.items[index] ? <li key={index} className="flex items-center gap-4"><span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-500"><Icon className="h-7 w-7" aria-hidden="true" /></span><div><h3 className="font-heading text-lg font-semibold text-brand-950">{support.items[index].title}</h3><p className="mt-1 text-sm leading-relaxed text-brand-500">{support.items[index].body}</p></div></li> : null)}
                        </ul>
                        <span className="mt-7 block h-px w-16 bg-gold-500" aria-hidden="true" />
                        <Link href={support.ctaHref || "/contact"} className="mt-5 flex min-h-20 items-center gap-4 rounded-xl bg-brand-500 px-5 py-4 text-white hover:bg-brand-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-700">
                            <MessageCircle className="h-8 w-8 shrink-0" aria-hidden="true" /><span className="min-w-0 flex-1"><span className="block text-[11px] font-medium uppercase tracking-[0.12em]">{support.stillQuestions}</span><span className="mt-1 block font-heading text-base font-semibold sm:text-lg">{support.cta}</span></span><ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
                        </Link>
                    </aside>
                    <div className="min-w-0 pt-2 lg:pt-6">
                        <p className="text-sm font-bold uppercase tracking-[0.13em] text-brand-500">{support.faqLabel}</p>
                        <span className="mt-3 block h-px w-14 bg-gold-500" aria-hidden="true" />
                        <h3 data-faq-title className="mt-7 font-heading text-3xl font-bold leading-tight tracking-tight text-brand-950 sm:text-4xl xl:text-[2.5rem]">{support.answersTitle}</h3>
                        <p className="mt-3 text-base leading-relaxed text-brand-500 sm:text-lg">{support.answersBody}</p>
                        <div className="mt-7 sm:mt-9"><FAQAccordion items={mappedItems} variant="soft" initialOpenId={mappedItems[0]._id} /></div>
                    </div>
                </div>
            </RevealOnScroll>
        </section>
    );
}

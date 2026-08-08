import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2 } from "lucide-react";
import { ComparisonSection } from "@/components/services/ComparisonSection";
import { MobileStickyCta } from "@/components/services/MobileStickyCta";
import { QualificationCheckpoint } from "@/components/services/QualificationCheckpoint";
import { ServiceFAQ } from "@/components/services/ServiceFAQ";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServicePageContainer } from "@/components/services/ServicePageContainer";
import { StrategyVideoSection } from "@/components/services/StrategyVideoSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { urlFor } from "@/sanity/lib/image";
import type { ServicePage } from "@/types/sanity";

type ServicePageTemplateProps = {
    page: ServicePage;
};

export function renderHeroHeadline(headline: string, highlight?: string) {
    const highlightStart = highlight ? headline.indexOf(highlight) : -1;
    if (highlightStart < 0 || !highlight) return headline;

    return <>{headline.slice(0, highlightStart)}<span className="text-gold-400">{highlight}</span>{headline.slice(highlightStart + highlight.length)}</>;
}

function ServiceHeroVisual({ page }: { page: ServicePage }) {
    const visual = page.hero.visual;
    if (!visual || visual.type === "none") return null;

    if (visual.type === "image" && visual.image?.asset) {
        return (
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/15 bg-white/[0.05] shadow-2xl">
                <Image
                    src={urlFor(visual.image).width(960).height(720).url()}
                    alt={visual.imageAlt || page.title}
                    fill
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    className="object-cover"
                />
            </div>
        );
    }

    if (visual.type === "video" && visual.videoUrl) {
        const posterUrl = visual.videoPoster?.asset
            ? urlFor(visual.videoPoster).width(960).height(720).url()
            : undefined;

        return (
            <div className="aspect-video overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl">
                <video
                    controls
                    preload="metadata"
                    poster={posterUrl}
                    aria-label={visual.videoLabel || visual.videoPosterAlt || `${page.title} service overview`}
                    className="h-full w-full"
                >
                    <source src={visual.videoUrl} type={visual.videoMimeType || "video/mp4"} />
                    Your browser does not support embedded video.
                </video>
            </div>
        );
    }

    if (visual.type !== "dashboard-mockup") return null;

    return (
        <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                    {visual.dashboardEyebrow && <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">{visual.dashboardEyebrow}</p>}
                    {visual.dashboardTitle && <p className="mt-1 font-heading text-lg font-bold text-white">{visual.dashboardTitle}</p>}
                </div>
                {visual.dashboardStatus && <span className="rounded-full border border-gold-400 bg-white/5 px-3 py-1 text-xs font-bold text-gold-400">{visual.dashboardStatus}</span>}
            </div>
            <div className="space-y-4 pt-5 text-sm">
                {visual.dashboardMetrics?.map((metric) => (
                    <div key={`${metric.label}-${metric.value}`} className={`flex justify-between ${metric.emphasized ? "border-t border-white/10 pt-4" : "text-white/70"}`}>
                        <span className={metric.emphasized ? "font-semibold text-white" : undefined}>{metric.label}</span>
                        <strong className={metric.emphasized ? "text-gold-400" : "text-white"}>{metric.value}</strong>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function ServicePageTemplate({ page }: ServicePageTemplateProps) {
    const primaryLabel = page.hero.primaryCta.label;
    const primaryHref = page.hero.primaryCta.href;
    const includedId = page.hero.secondaryCta?.href?.replace(/^#/, "") || "included";
    const posterUrl = page.video?.poster?.asset
        ? urlFor(page.video.poster).width(1280).height(720).url()
        : undefined;

    return (
        <>
            <ServiceHero
                eyebrow={page.hero.eyebrow}
                headline={renderHeroHeadline(page.hero.headline, page.hero.highlight)}
                subheadline={page.hero.subheadline}
                trustItems={page.hero.trustItems || []}
                primaryCta={{ label: primaryLabel, href: primaryHref }}
                secondaryCta={page.hero.secondaryCta?.label ? { label: page.hero.secondaryCta.label, href: page.hero.secondaryCta.href || `#${includedId}` } : undefined}
                microcopy={page.hero.microcopy}
                visualAnchor={<ServiceHeroVisual page={page} />}
                mobileFirst
                primaryCtaId={`${page.slug.current}-hero-cta`}
                accentColor={page.accentColor}
            />

            <div id={`${page.slug.current}-decision-sequence`}>
                {page.eligibility ? <QualificationCheckpoint eligibility={page.eligibility} sectionId={`${page.slug.current}-eligibility`} /> : null}
                <ComparisonSection comparison={page.comparison} sectionId={`${page.slug.current}-comparison`} />
            </div>

            {page.video?.url && page.video.heading ? (
                <StrategyVideoSection
                    videoUrl={page.video.url}
                    posterUrl={posterUrl}
                    posterAlt={page.video.posterAlt}
                    eyebrow={page.video.eyebrow}
                    heading={page.video.heading}
                    description={page.video.description}
                    captionsUrl={page.video.captionsUrl}
                    caption={page.video.caption}
                />
            ) : null}

            {page.process.steps?.length && page.process.heading ? (
                <section id={`${page.slug.current}-process`} className="scroll-mt-[calc(var(--header-height)+1rem)] border-y border-zinc-200 bg-zinc-50 py-12 md:py-16">
                    <ServicePageContainer>
                        <SectionHeader label={page.process.eyebrow || ""} heading={page.process.heading} description={page.process.description} />
                        <ol className="mt-10 grid gap-6 md:grid-cols-4 md:gap-0">{page.process.steps.map((step, index) => <li key={step.title} className="relative rounded-2xl border border-zinc-200 bg-white p-5 text-center shadow-sm md:border-0 md:bg-transparent md:shadow-none">{index < page.process.steps.length - 1 && <span className="absolute left-[calc(50%+1.75rem)] right-[calc(-50%+1.75rem)] top-10 hidden h-px bg-gold-500/35 md:block" aria-hidden="true" />}<div className="relative z-10 mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gold-500 font-heading font-bold text-brand-900">{index + 1}</div><h3 className="mt-5 font-heading text-lg font-bold text-brand-900">{step.title}</h3>{step.duration && <p className="mt-1 text-xs font-bold uppercase tracking-wide text-gold-700">{step.duration}</p>}<p className="mx-auto mt-3 max-w-prose text-sm leading-relaxed text-zinc-600">{step.description}</p></li>)}</ol>
                    </ServicePageContainer>
                </section>
            ) : null}

            {page.included.items?.length && page.included.heading ? (
                <section id={includedId} className="scroll-mt-[calc(var(--header-height)+1.5rem)] bg-white py-12 md:py-16">
                    <ServicePageContainer>
                        <SectionHeader label={page.included.eyebrow || ""} heading={page.included.heading} description={page.included.description} />
                        <ul className="mt-10 grid gap-4 md:grid-cols-2">{page.included.items.map((item) => <li key={item} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 text-slate-700 shadow-sm"><CheckCircle2 size={19} className="shrink-0 text-gold-500" aria-hidden="true" />{item}</li>)}</ul>
                        {(page.included.pricing?.headline || page.included.pricing?.detail) && <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-gold-200 bg-gold-50 p-5 text-center">{page.included.pricing?.headline && <p className="text-lg font-semibold text-brand-900">{page.included.pricing.headline}</p>}{page.included.pricing?.detail && <p className="mt-2 text-sm leading-relaxed text-slate-600">{page.included.pricing.detail}</p>}</div>}
                    </ServicePageContainer>
                </section>
            ) : null}

            {page.proof?.quote ? (
                <section className="bg-white py-12 md:py-16"><ServicePageContainer><SectionHeader label={page.proof.eyebrow || ""} heading={page.proof.heading || page.title} /><article className="mx-auto mt-10 max-w-4xl rounded-3xl border border-gold-200 bg-gold-50 p-6 md:p-8"><Building2 className="h-8 w-8 text-gold-700" aria-hidden="true" /><blockquote className="mt-4 max-w-prose font-heading text-xl font-bold italic leading-snug text-brand-900">&ldquo;{page.proof.quote}&rdquo;</blockquote>{page.proof.attribution && <p className="mt-4 text-sm font-semibold text-gold-800">{page.proof.attribution}</p>}{page.proof.href && page.proof.linkLabel && <Link href={page.proof.href} className="mt-4 inline-flex min-h-11 items-center font-semibold text-gold-800 underline decoration-gold-500 underline-offset-4">{page.proof.linkLabel}<ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" /></Link>}</article></ServicePageContainer></section>
            ) : null}

            {page.faqSection.items.length ? <section className="bg-white py-12 md:py-16"><ServicePageContainer><SectionHeader label={page.faqSection.eyebrow || ""} heading={page.faqSection.heading} className="mb-10" /><div className="mx-auto max-w-4xl"><ServiceFAQ items={page.faqSection.items} /></div></ServicePageContainer></section> : null}

            {page.closing.heading ? <section className="bg-brand-900 px-5 py-12 text-center md:px-6 md:py-20"><div className="mx-auto max-w-2xl"><h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">{page.closing.heading}</h2>{page.closing.description && <p className="mt-4 text-base leading-relaxed text-white/70 md:text-lg">{page.closing.description}</p>}<Link href={page.closing.href} className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-gold-500 px-6 py-3 font-heading font-bold text-brand-900">{page.closing.label}<ArrowRight className="h-5 w-5" aria-hidden="true" /></Link></div></section> : null}

            <MobileStickyCta anchorId={`${page.slug.current}-hero-cta`} avoidId={`${page.slug.current}-decision-sequence`} href={primaryHref} label={primaryLabel} />
        </>
    );
}

import { getTranslations } from "next-intl/server";
import { MobileStickyCta } from "@/components/services/MobileStickyCta";
import { QualificationCheckpoint } from "@/components/services/QualificationCheckpoint";
import { ShopFAQ, type FAQSupportCopy } from "@/components/shop/ShopFAQ";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceIncludedSection, type IncludedPresentation } from "@/components/services/ServiceIncludedSection";
import { ServiceProcessSection, type ProcessDetail } from "@/components/services/ServiceProcessSection";
import { ServicePageContainer } from "@/components/services/ServicePageContainer";
import { FinalBookingCTA } from "@/components/home/FinalBookingCTA";
import type { ServicePage } from "@/types/sanity";

type ServicePageTemplateProps = {
    page: ServicePage;
    locale: string;
};

export function renderHeroHeadline(headline: string, highlight?: string, separateHighlight = false, highlightClass = "text-gold-400") {
    const highlightStart = highlight ? headline.indexOf(highlight) : -1;
    if (highlightStart < 0 || !highlight) return headline;

    const before = headline.slice(0, highlightStart);
    const after = headline.slice(highlightStart + highlight.length);
    return separateHighlight
        ? <>{before}<span className="lg:block"><span className={highlightClass}>{highlight}</span>{after}</span></>
        : <>{before}<span className={highlightClass}>{highlight}</span>{after}</>;
}

export function bookingHref(label: string | undefined, href: string | undefined) {
    return href === "/contact" && /^(book|schedule|reserve|reservar|agendar)\b/i.test(label || "") ? "/book" : href;
}

export async function ServicePageTemplate({ page, locale }: ServicePageTemplateProps) {
    const presentationT = await getTranslations({ locale, namespace: "ServiceDetailPresentation" });
    const isScorp = page.slug.current === "s-corp-tax-advantage";
    const reviewItems = isScorp
        ? presentationT.raw("scorp.items") as { title: string; detail: string }[]
        : (page.process.steps || []).slice(0, 3).map(step => ({ title: step.title, detail: step.description }));
    const reviewSummary = isScorp
        ? { title: presentationT("scorp.summaryTitle"), detail: presentationT("scorp.summaryDetail") }
        : { title: page.comparison.conclusion || page.comparison.heading, detail: page.comparison.description };
    const primaryLabel = page.hero.primaryCta.label;
    const primaryHref = bookingHref(primaryLabel, page.hero.primaryCta.href)!;
    const includedId = page.hero.secondaryCta?.href?.replace(/^#/, "") || "included";
    const fitCards = isScorp ? presentationT.raw("scorp.fitItems") as { title: string; detail: string }[] : undefined;
    const eligibility = page.eligibility ? {
        ...page.eligibility,
        cta: page.process.steps?.length && page.process.heading
            ? { label: presentationT(isScorp ? "scorp.fitLink" : "processLink"), href: "#" + page.slug.current + "-process" }
            : page.eligibility.cta ? { ...page.eligibility.cta, href: bookingHref(page.eligibility.cta.label, page.eligibility.cta.href) } : undefined,
    } : undefined;

    return (
        <>
            <ServiceHero
                id={page.slug.current + "-hero"}
                eyebrow={page.hero.eyebrow}
                headline={renderHeroHeadline(page.hero.headline, page.hero.highlight, isScorp)}
                subheadline={page.hero.subheadline}
                primaryCta={{ label: primaryLabel, href: primaryHref }}
                secondaryCta={page.hero.secondaryCta?.label ? { label: page.hero.secondaryCta.label, href: page.hero.secondaryCta.href || `#${includedId}` } : undefined}
                primaryCtaId={`${page.slug.current}-hero-cta`}
                reviewItems={reviewItems}
                reviewSummary={reviewSummary}
                compactHeadline={!isScorp && page.hero.headline.length > 48}
            />

            <div id={`${page.slug.current}-decision-sequence`}>
                {eligibility ? <QualificationCheckpoint eligibility={eligibility} sectionId={`${page.slug.current}-eligibility`} heading={isScorp ? renderHeroHeadline(eligibility.heading || "", presentationT("scorp.fitHighlight"), true, "text-gold-600") : undefined} cards={fitCards} /> : null}
            </div>

            {page.process.steps?.length && page.process.heading ? (
                <ServiceProcessSection id={`${page.slug.current}-process`} process={page.process} details={isScorp ? presentationT.raw("scorp.processDetails") as ProcessDetail[] : undefined} outputLabel={presentationT("processOutput")} primaryCta={{ label: primaryLabel, href: primaryHref }} ctaHelp={presentationT("processCtaHelp")} />
            ) : null}

            {page.included.items?.length && page.included.heading ? (
                <ServiceIncludedSection id={includedId} included={page.included} scopeLabel={presentationT("includedScope")} presentation={isScorp ? presentationT.raw("scorp.included") as IncludedPresentation : undefined} />
            ) : null}

            {page.faqSection.items.length ? <div className="bg-white py-10 lg:py-12"><ShopFAQ items={page.faqSection.items} sectionId={`${page.slug.current}-faq`} className="mb-0 [&_aside]:min-h-0 lg:[&_[data-faq-title]]:text-[2.75rem]" copy={{ ...presentationT.raw("faqSupport") as FAQSupportCopy, answersTitle: page.faqSection.heading }} /></div> : null}

            <div className="homepage-rhythm">
                <FinalBookingCTA id="service-next-step" placement={`${page.slug.current}_final_cta`} label={primaryLabel} />
                {page.closing?.disclaimer && <ServicePageContainer><p className="mx-auto mb-6 max-w-2xl text-center text-sm leading-relaxed text-zinc-600">{page.closing.disclaimer}</p></ServicePageContainer>}
            </div>

            <MobileStickyCta anchorId={`${page.slug.current}-hero-cta`} avoidId={`${page.slug.current}-decision-sequence`} endId="service-next-step" href={primaryHref} label={primaryLabel} />
        </>
    );
}

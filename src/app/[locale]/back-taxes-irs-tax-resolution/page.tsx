import { CmsServicePage, getCmsServiceMetadata } from "@/components/services/CmsServicePage";
import { getTaxResolutionContent } from "@/lib/services/tax-resolution-content";
import { getServicePricingOffers } from "@/lib/pricing/data";

const cmsSlug = "back-taxes-irs-tax-resolution";
const canonicalPath = "/back-taxes-irs-tax-resolution";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const { page } = getTaxResolutionContent(locale);
    const metadata = await getCmsServiceMetadata({ cmsSlug, locale, canonicalPath, content: page });
    return { ...metadata, twitter: { card: "summary" as const, title: page.title, description: page.hero.subheadline } };
}

export default async function TaxResolutionPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const { page, presentation } = getTaxResolutionContent(locale);
    // This route keeps its reviewed local narrative; only review pricing comes from selected shared offers.
    const pricingOffers = await getServicePricingOffers(cmsSlug, locale);
    return <CmsServicePage cmsSlug={cmsSlug} locale={locale} canonicalPath={canonicalPath} content={{ ...page, included: { ...page.included, pricingOffers } }} presentation={presentation} />;
}

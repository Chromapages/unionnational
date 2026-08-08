import { CmsServicePage, getCmsServiceMetadata } from "@/components/services/CmsServicePage";

const cmsSlug = "s-corp-tax-advantage";
const canonicalPath = "/s-corp-tax-advantage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return getCmsServiceMetadata({ cmsSlug, locale, canonicalPath });
}

export default async function SCorpTaxAdvantagePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <CmsServicePage cmsSlug={cmsSlug} locale={locale} canonicalPath={canonicalPath} />;
}

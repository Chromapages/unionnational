import { CmsServicePage, getCmsServiceMetadata } from "@/components/services/CmsServicePage";

const cmsSlug = "tax-planning";
const canonicalPath = "/tax-planning";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return getCmsServiceMetadata({ cmsSlug, locale, canonicalPath });
}

export default async function TaxPlanningPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <CmsServicePage cmsSlug={cmsSlug} locale={locale} canonicalPath={canonicalPath} />;
}

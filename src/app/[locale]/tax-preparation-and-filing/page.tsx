import { CmsServicePage, getCmsServiceMetadata } from "@/components/services/CmsServicePage";

const cmsSlug = "tax-preparation-and-filing";
const canonicalPath = "/tax-preparation-and-filing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return getCmsServiceMetadata({ cmsSlug, locale, canonicalPath });
}

export default async function TaxPreparationPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <CmsServicePage cmsSlug={cmsSlug} locale={locale} canonicalPath={canonicalPath} />;
}

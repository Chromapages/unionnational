import { CmsServicePage, getCmsServiceMetadata } from "@/components/services/CmsServicePage";

const cmsSlug = "new-business-formation";
const canonicalPath = "/new-business-formation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return getCmsServiceMetadata({ cmsSlug, locale, canonicalPath });
}

export default async function NewBusinessFormationPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <CmsServicePage cmsSlug={cmsSlug} locale={locale} canonicalPath={canonicalPath} />;
}

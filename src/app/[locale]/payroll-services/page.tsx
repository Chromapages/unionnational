import { CmsServicePage, getCmsServiceMetadata } from "@/components/services/CmsServicePage";

const cmsSlug = "payroll-services";
const canonicalPath = "/payroll-services";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return getCmsServiceMetadata({ cmsSlug, locale, canonicalPath });
}

export default async function PayrollServicesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <CmsServicePage cmsSlug={cmsSlug} locale={locale} canonicalPath={canonicalPath} />;
}

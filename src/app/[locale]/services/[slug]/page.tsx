import { redirect } from "next/navigation";
import { CmsServicePage, getCmsServiceMetadata } from "@/components/services/CmsServicePage";
import { SERVICE_PAGE_SLUGS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import type { ServicePage } from "@/types/sanity";

export const revalidate = 60;

const canonicalRedirects: Record<string, string> = {
    "fractional-cfo": "/fractional-cfo",
    "new-business-formation": "/new-business-formation",
    "payroll-services": "/payroll-services",
    "s-corp-tax-advantage": "/s-corp-tax-advantage",
    "s-corp-tax-advantage-program": "/s-corp-tax-advantage",
    "strategic-bookkeeping": "/strategic-bookkeeping",
    "tax-planning": "/tax-planning",
    "tax-planning-consulting": "/tax-planning",
    "tax-planning-consulting-services": "/tax-planning",
    "tax-filing": "/tax-preparation-and-filing",
    "tax-filing-preparation": "/tax-preparation-and-filing",
    "tax-filing-and-preparation-services": "/tax-preparation-and-filing",
    "tax-preparation-filing": "/tax-preparation-and-filing",
    "tax-preparation-and-filing": "/tax-preparation-and-filing",
    "tax-preparation-and-filing-services": "/tax-preparation-and-filing",
};

export async function generateStaticParams() {
    const services = await client.fetch<Pick<ServicePage, "slug">[]>(SERVICE_PAGE_SLUGS_QUERY);
    return services.flatMap((service) => ["en", "es"].map((locale) => ({ locale, slug: service.slug.current })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params;
    const canonicalPath = canonicalRedirects[slug] || `/services/${slug}`;
    const cmsSlug = canonicalRedirects[slug]?.replace(/^\//, "") || slug;
    return getCmsServiceMetadata({ cmsSlug, locale, canonicalPath });
}

export default async function ServicePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params;
    const canonicalPath = canonicalRedirects[slug];
    if (canonicalPath) redirect(canonicalPath);

    return <CmsServicePage cmsSlug={slug} locale={locale} canonicalPath={`/services/${slug}`} />;
}

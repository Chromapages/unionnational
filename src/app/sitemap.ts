import type { MetadataRoute } from "next";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { publicEnv } from "@/lib/config/env";
import { hasPublishedProductDescription } from "@/lib/shop/commerce";

export const baseUrl = publicEnv.baseUrl.replace(/\/$/, "");
export const revalidate = 3600;

type SitemapLocale = "en" | "es";
type CmsRoute = {
    slug: string;
    _updatedAt?: string;
    noIndex?: boolean;
    hasPublicContent?: boolean;
    shopDescriptions?: Partial<Record<SitemapLocale, unknown>>;
    chapters?: Array<(CmsRoute & { isGated?: boolean }) | null>;
};
type CmsRoutes = Record<"services" | "posts" | "products" | "legals" | "industries" | "playbooks", CmsRoute[]> & {
    globalNoIndex?: boolean;
    singletons?: Array<{ path: string; noIndex?: boolean }>;
};

const publicPaths = [
    "", "/about", "/services", "/industries", "/industries/construction",
    "/industries/e-commerce", "/industries/real-estate", "/industries/restaurants",
    "/contact", "/book", "/pricing", "/faq", "/team", "/resources", "/shop",
    "/blog", "/hub", "/hub/industries", "/client-results",
    "/s-corp-tax-advantage", "/tax-planning", "/strategic-bookkeeping",
    "/fractional-cfo", "/new-business-formation", "/payroll-services",
    "/back-taxes-irs-tax-resolution",
    "/tax-preparation-and-filing", "/construction-profitability-assessment",
    "/proactive-cfo-assessment", "/restaurants/profit-leak-assessment",
    "/tax-savings-analysis", "/construction/profit-blueprint",
    "/construction/profitability-assessment", "/health-check",
    "/tax-savings-analysis/contractors", "/tax-savings-analysis/hospitality",
    "/tax-savings-analysis/real-estate", "/vsl/construction", "/vsl/real-estate",
    "/vsl/restaurants", "/vsl/tax-resolution",
    "/construction/apply", "/construction/booking", "/restaurants/apply", "/restaurants/booking",
];

const redirectedServiceSlugs = new Set([
    "back-taxes-irs-tax-resolution",
    "fractional-cfo", "new-business-formation", "payroll-services", "s-corp-tax-advantage",
    "s-corp-tax-advantage-program", "strategic-bookkeeping", "tax-planning",
    "tax-planning-consulting", "tax-planning-consulting-services", "tax-filing",
    "tax-filing-preparation", "tax-filing-and-preparation-services", "tax-preparation-filing",
    "tax-preparation-and-filing", "tax-preparation-and-filing-services",
]);

function entries(path: string, lastModified?: string, availableLocales: SitemapLocale[] = ["en", "es"]): MetadataRoute.Sitemap {
    const languages = Object.fromEntries(availableLocales.map((locale) => [locale, `${baseUrl}/${locale}${path}`]));
    return availableLocales.map((locale) => ({
        url: `${baseUrl}/${locale}${path}`,
        ...(lastModified ? { lastModified: new Date(lastModified) } : {}),
        alternates: {
            languages,
        },
    }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const query = groq`{
        "globalNoIndex": *[_type == "siteSettings"][0].seo.noIndex,
        "singletons": [
            { "path": "", "noIndex": *[_type == "homePage"][0].seo.noIndex },
            { "path": "/about", "noIndex": *[_type == "aboutPage"][0].seo.noIndex },
            { "path": "/resources", "noIndex": *[_type == "resourcesPage"][0].seo.noIndex },
            { "path": "/contact", "noIndex": *[_type == "contactSettings"][0].seo.noIndex },
            { "path": "/shop", "noIndex": *[_type == "shopSettings"][0].seo.noIndex }
        ],
        "services": *[_type == "servicePage" && defined(slug.current)] { "slug": slug.current, _updatedAt, "noIndex": seo.noIndex },
        "posts": *[_type == "blogPost" && defined(slug.current) && seo.noIndex != true] { "slug": slug.current, _updatedAt, "noIndex": seo.noIndex },
        "products": *[_type == "product" && defined(slug.current) && seo.noIndex != true] {
            "slug": slug.current, _updatedAt, "noIndex": seo.noIndex,
            "shopDescriptions": {
                "en": coalesce(shortDescription.en, shortDescription),
                "es": coalesce(shortDescription.es, shortDescription.en, shortDescription)
            }
        },
        "legals": *[_type == "legalPage" && isPublished == true && defined(slug.current)] { "slug": slug.current, _updatedAt, "noIndex": seo.noIndex },
        "industries": *[_type == "industryVertical" && isActive == true && defined(slug.current) && seo.noIndex != true] { "slug": slug.current, _updatedAt, "noIndex": seo.noIndex },
        "playbooks": *[_type == "playbook" && isPublished != false && defined(slug.current)] {
            "slug": slug.current, _updatedAt, "noIndex": seo.noIndex,
            "chapters": chapters[defined(@->_id) && @->isPublished != false]->{
                "slug": slug.current, _updatedAt, "noIndex": seo.noIndex,
                "hasPublicContent": coalesce(length(pt::text(coalesce(content.en, content))) > 0 || length(pt::text(content.es)) > 0 || count(coalesce(content.en, content)[_type != "block"]) > 0 || count(content.es[_type != "block"]) > 0 || count(keyTakeaways) > 0 || count(tools) > 0 || (defined(videoEmbed) && videoEmbed != ""), false)
            }
        }
    }`;
    const content = await client.fetch<CmsRoutes>(query);
    if (content.globalNoIndex === true) return [];
    const noIndexPaths = new Set([
        ...(content.singletons || []).filter((record) => record.noIndex === true).map((record) => record.path),
        ...(content.services || []).filter((record) => record.noIndex === true
            && redirectedServiceSlugs.has(record.slug) && publicPaths.includes(`/${record.slug}`))
            .map((record) => `/${record.slug}`),
    ]);
    const routes = publicPaths.filter((path) => !noIndexPaths.has(path)).flatMap((path) => entries(path));

    const dynamicPaths: Array<[string, CmsRoute, SitemapLocale[]?]> = [
        ...(content.services || []).filter((route) => !redirectedServiceSlugs.has(route.slug)).map((route): [string, CmsRoute] => [`/services/${route.slug}`, route]),
        ...(content.posts || []).map((route): [string, CmsRoute] => [`/blog/${route.slug}`, route]),
        ...(content.products || []).flatMap((route): Array<[string, CmsRoute, SitemapLocale[]?]> => [
            [`/shop/${route.slug}`, route, (["en", "es"] as SitemapLocale[]).filter((locale) => hasPublishedProductDescription(route.shopDescriptions?.[locale]))],
            [`/books/${route.slug}`, route],
        ]),
        ...(content.legals || []).map((route): [string, CmsRoute] => [`/legal/${route.slug}`, route]),
        ...(content.industries || []).map((route): [string, CmsRoute] => [`/hub/industries/${route.slug}`, route]),
        ...(content.playbooks || []).map((route): [string, CmsRoute] => [route.slug === "s-corp-playbook" ? "/hub/s-corp-playbook" : `/hub/playbooks/${route.slug}`, route]),
        ...(content.playbooks || []).flatMap((route): Array<[string, CmsRoute]> => {
            const basePath = route.slug === "s-corp-playbook" ? "/hub/s-corp-playbook" : `/hub/playbooks/${encodeURIComponent(route.slug)}`;
            return (route.chapters || []).flatMap((chapter): Array<[string, CmsRoute]> =>
                chapter && chapter.hasPublicContent !== false && typeof chapter.slug === "string" && chapter.slug.trim() && chapter.slug !== "undefined"
                    ? [[`${basePath}/${encodeURIComponent(chapter.slug)}`, chapter]]
                    : [],
            );
        }),
        ...((content.legals || []).some((route) => route.slug === "privacy-policy") ? [] : [["/legal/privacy-policy", { slug: "privacy-policy" }] as [string, CmsRoute]]),
    ];
    const seen = new Set(publicPaths);
    for (const [path, record, availableLocales] of dynamicPaths) {
        if (record.noIndex || seen.has(path)) continue;
        seen.add(path);
        routes.push(...entries(path, record._updatedAt, availableLocales));
    }
    return routes;
}

import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

// Base URL - ensure this is updated with your production URL
export const baseUrl = "https://unionnationaltax.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const locales = ["en", "es"];

    // Static Routes
    const staticBaseRoutes = [
        { path: "", priority: 1, changeFrequency: "monthly" as const },
        { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
        { path: "/services", priority: 0.8, changeFrequency: "weekly" as const },
        { path: "/contact", priority: 0.8, changeFrequency: "yearly" as const },
        { path: "/pricing", priority: 0.8, changeFrequency: "monthly" as const },
        { path: "/faq", priority: 0.5, changeFrequency: "monthly" as const },
    ];

    const routes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
        staticBaseRoutes.map((route) => ({
            url: `${baseUrl}${locale === "en" ? "" : `/${locale}`}${route.path}`,
            lastModified: new Date(),
            changeFrequency: route.changeFrequency,
            priority: route.priority,
        }))
    );

    // Fetch dynamic routes from Sanity
    const query = groq`{
        "services": *[_type == "service" && defined(slug.current)] { "slug": slug.current, _updatedAt },
        "posts": *[_type == "post" && defined(slug.current)] { "slug": slug.current, _updatedAt },
        "legals": *[_type == "legalPage" && defined(slug.current)] { "slug": slug.current, _updatedAt }
    }`;

    const { services, posts, legals } = await client.fetch(query);

    const serviceRoutes = locales.flatMap((locale) =>
        services.map((service: any) => ({
            url: `${baseUrl}${locale === "en" ? "" : `/${locale}`}/services/${service.slug}`,
            lastModified: new Date(service._updatedAt),
            changeFrequency: "weekly" as const,
            priority: 0.7,
        }))
    );

    const postRoutes = locales.flatMap((locale) =>
        posts.map((post: any) => ({
            url: `${baseUrl}${locale === "en" ? "" : `/${locale}`}/blog/${post.slug}`,
            lastModified: new Date(post._updatedAt),
            changeFrequency: "weekly" as const,
            priority: 0.6,
        }))
    );

    const legalRoutes = locales.flatMap((locale) =>
        legals.map((page: any) => ({
            url: `${baseUrl}${locale === "en" ? "" : `/${locale}`}/legal/${page.slug}`,
            lastModified: new Date(page._updatedAt),
            changeFrequency: "yearly" as const,
            priority: 0.3,
        }))
    );

    return [...routes, ...serviceRoutes, ...postRoutes, ...legalRoutes];
}

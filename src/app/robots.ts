import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://unionnationaltax.com";

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/hq/", "/api/"],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}

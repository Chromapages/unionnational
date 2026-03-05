import { urlFor } from "@/sanity/lib/image";

type SocialLinks = {
    linkedin?: string;
    facebook?: string;
    youtube?: string;
    instagram?: string;
    twitter?: string;
};

type SiteSettings = {
    companyName?: string;
    tagline?: string;
    phone?: string;
    logo?: unknown;
    address?: {
        street?: string;
        city?: string;
        state?: string;
        zip?: string;
    };
    socialLinks?: SocialLinks;
};

type HomePageData = {
    heroSubtitle?: string;
    seo?: {
        metaDescription?: string;
    };
};

type ContactSettings = {
    heroSubtitle?: string;
    contactPhone?: string;
    officeAddress?: {
        street?: string;
        city?: string;
        state?: string;
        zip?: string;
    };
    seo?: {
        metaDescription?: string;
    };
};

type TeamPageData = {
    heroSubtitle?: string;
    seo?: {
        metaDescription?: string;
    };
};

type ShopPageData = {
    heroSubtitle?: string;
    seo?: {
        metaDescription?: string;
    };
};

interface JsonLdProps {
    siteSettings?: SiteSettings;
    homePageData?: HomePageData;
    contactSettings?: ContactSettings;
    teamPageData?: TeamPageData;
    shopPageData?: ShopPageData;
}

export function JsonLd({
    siteSettings,
    homePageData,
    contactSettings,
    teamPageData,
    shopPageData,
}: JsonLdProps) {
    if (!siteSettings) return null;

    const description =
        contactSettings?.seo?.metaDescription ||
        teamPageData?.seo?.metaDescription ||
        shopPageData?.seo?.metaDescription ||
        homePageData?.seo?.metaDescription ||
        contactSettings?.heroSubtitle ||
        teamPageData?.heroSubtitle ||
        shopPageData?.heroSubtitle ||
        homePageData?.heroSubtitle ||
        siteSettings?.tagline;

    const socialLinks = siteSettings.socialLinks || {};
    const sameAs = [
        socialLinks.linkedin,
        socialLinks.facebook,
        socialLinks.youtube,
        socialLinks.instagram,
        socialLinks.twitter,
    ].filter(Boolean);

    const logoUrl = siteSettings.logo ? urlFor(siteSettings.logo).width(400).height(400).url() : undefined;
    const address = contactSettings?.officeAddress || siteSettings.address;
    const hasAddress =
        address && (address.street || address.city || address.state || address.zip);

    const schema = {
        "@context": "https://schema.org",
        "@type": "FinancialService",
        name: siteSettings.companyName || "Union National Tax",
        description,
        url: "https://unionnationaltax.com",
        telephone: contactSettings?.contactPhone || siteSettings.phone,
        image: logoUrl,
        address: hasAddress
            ? {
                  "@type": "PostalAddress",
                  streetAddress: address?.street,
                  addressLocality: address?.city,
                  addressRegion: address?.state,
                  postalCode: address?.zip,
                  addressCountry: "US",
              }
            : undefined,
        sameAs: sameAs.length > 0 ? sameAs : undefined,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

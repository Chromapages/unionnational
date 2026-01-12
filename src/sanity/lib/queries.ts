import { defineQuery } from 'next-sanity'

export const TEAM_PAGE_QUERY = defineQuery(`
  *[_type == "teamPage"][0] {
    ...,
    hiringImage {
      asset->
    }
  }
`)

export const TEAM_MEMBERS_QUERY = defineQuery(`
  *[_type == "teamMember" && isFounder != true] | order(displayOrder asc) {
    _id,
    name,
    role,
    credentials,
    description,
    image {
      asset->
    },
    linkedinUrl
  }
`)

export const FOUNDER_QUERY = defineQuery(`
  *[_type == "teamMember" && isFounder == true][0] {
    _id,
    name,
    role,
    credentials,
    description,
    image {
      asset->
    },
    linkedinUrl,
    tags
  }
`)

// BLOG QUERIES
export const BLOG_SETTINGS_QUERY = defineQuery(`
  *[_type == "blogSettings"][0] {
    heroTitle,
    heroSubtitle,
    postsPerPage,
    newsletterTitle,
    newsletterDescription
  }
`)

export const BLOG_POSTS_QUERY = defineQuery(`
  *[_type == "blogPost"] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readingTime,
    isFeatured,
    featuredImage {
      asset->,
      alt
    },
    categories[]->{
      title,
      slug
    },
    author->{
      name,
      image {
        asset->
      },
      role
    }
  }
`)

export const BLOG_POST_QUERY = defineQuery(`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    publishedAt,
    readingTime,
    featuredImage {
      asset->,
      alt
    },
    categories[]->{
      title,
      slug
    },
    author->{
      name,
      image {
        asset->
      },
      role,
      description,
      linkedinUrl
    }
  }
`)

export const FEATURED_POSTS_QUERY = defineQuery(`
  *[_type == "blogPost" && isFeatured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    featuredImage {
      asset->,
      alt
    },
    author->{
      name,
      image {
        asset->
      }
    }
  }
`)

export const BLOG_CATEGORIES_QUERY = defineQuery(`
  *[_type == "blogCategory"] | order(displayOrder asc) {
    _id,
    title,
    slug,
    description
  }
`)

export const RELATED_POSTS_QUERY = defineQuery(`
  *[_type == "blogPost" && _id != $currentId && count((categories[]->slug.current)[@ in $categorySlugs]) > 0] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    publishedAt,
    featuredImage {
      asset->,
      alt
    },
    author->{
      name
    }
  }
`)
export const SERVICES_QUERY = `*[_type == "service"] | order(isPopular desc) {
  _id,
  title,
  slug,
  shortDescription,
  icon,
  features,
  impactGoal,
  badge,
  isPopular,
  accentColor
}`;
export const SERVICE_QUERY = `*[_type == "service" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  shortDescription,
  fullDescription,
  icon,
  features,
  impactGoal,
  badge,
  isPopular,
  accentColor
}`;

export const SHOP_PAGE_QUERY = defineQuery(`
  *[_type == "shopSettings"][0] {
    heroTitle,
    heroSubtitle,
    heroVideo,
    featuredProduct->{
      _id,
      title,
      "imageUrl": coverImage.asset->url,
      price,
      compareAtPrice,
      shortDescription,
      "slug": slug.current,
      features,
      buyLink,
      format
    },
    faq
  }
`);

export const ALL_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product" && !(_id in path("drafts.**"))] | order(isFeatured desc, title asc) {
    _id,
    title,
    slug,
    "imageUrl": coverImage.asset->url,
    price,
    compareAtPrice,
    shortDescription,
    format,
    buyLink,
    isFeatured,
    badge
  }
`);

export const PRODUCT_DETAIL_QUERY = defineQuery(`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    "imageUrl": coverImage.asset->url,
    price,
    compareAtPrice,
    shortDescription,
    fullDescription,
    format,
    buyLink,
    features,
    badge
  }
`);

export const PRODUCT_SLUGS_QUERY = defineQuery(`
  *[_type == "product" && defined(slug.current)] {
    "slug": slug.current
  }
`);

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    companyName,
    tagline,
    logo {
      asset->,
      alt
    },
    logoAlt {
      asset->,
      alt
    },
    phone,
    email,
    address,
    businessHours,
    socialLinks,
    ctaButtonText,
    ctaButtonUrl,
    copyrightText
  }
`);

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage"][0] {
    heroTitle,
    heroSubtitle,
    heroVideoUrl,
    heroCtaText,
    heroCtaUrl,
    trustLogos[] {
      asset->,
      alt
    },
    stats[] {
      value,
      label
    },
    ctaTitle,
    ctaSubtitle,
    ctaButtonText,
    ctaButtonUrl
  }
`);

export const TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonial" && isPublished == true] | order(displayOrder asc) {
    _id,
    clientName,
    clientTitle,
    clientCompany,
    quote,
    rating,
    isFeatured,
    image {
      asset->
    },
    serviceUsed->{
      title
    }
  }
`);

export const FAQ_QUERY = defineQuery(`
  *[_type == "faq"]|order(displayOrder asc){
    _id,
    question,
    answer,
    category
  }
`);

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "aboutPage"][0]{
    heroTitle,
    heroSubtitle,
    heroBadge,
    missionStatement,
    storyContent,
    values[]{
      title,
      description,
      iconName
    },
    certifications[]{
      name,
      logo
    }
  }
`);

export const CONTACT_SETTINGS_QUERY = defineQuery(`
  *[_type == "contactSettings"][0]{
    heroTitle,
    heroSubtitle,
    contactEmail,
    contactPhone,
    officeAddress,
    officeHours,
    formTitle,
    formSubtitle,
    mapEmbedUrl
  }
`);

export const SERVICES_PAGE_QUERY = defineQuery(`
  *[_type == "servicesPage"][0]{
    heroTitle,
    heroSubtitle,
    heroBadge,
    ctaTitle,
    ctaSubtitle,
    ctaButtonText,
    ctaButtonUrl
  }
`);

export const PRICING_TIERS_QUERY = defineQuery(`
  *[_type == "pricingTier"]|order(displayOrder asc){
    _id,
    name,
    slug,
    tagline,
    price,
    billingPeriod,
    features,
    isFeatured,
    ctaText,
    ctaUrl,
    relatedService->{
      title,
      slug
    }
  }
`);

export const LEGAL_PAGE_QUERY = defineQuery(`
  *[_type == "legalPage" && slug.current == $slug][0]{
    title,
    lastUpdated,
    body
  }
`);

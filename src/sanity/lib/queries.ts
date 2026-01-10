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

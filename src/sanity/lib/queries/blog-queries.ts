import { defineQuery } from 'next-sanity'

export const BLOG_SETTINGS_QUERY = defineQuery(`
  *[_type == "blogSettings"][0] {
    "heroTitle": coalesce(heroTitle[$locale], heroTitle.en, heroTitle),
    "heroSubtitle": coalesce(heroSubtitle[$locale], heroSubtitle.en, heroSubtitle),
    postsPerPage,
    "newsletterTitle": coalesce(newsletterTitle[$locale], newsletterTitle.en, newsletterTitle),
    "newsletterDescription": coalesce(newsletterDescription[$locale], newsletterDescription.en, newsletterDescription)
  }
`)

export const BLOG_POSTS_QUERY = defineQuery(`
  *[_type == "blogPost"] | order(publishedAt desc) [0...$limit] {
    _id,
    "title": coalesce(title[$locale], title.en, title),
    "slug": slug.current,
    "excerpt": coalesce(excerpt[$locale], excerpt.en, excerpt),
    publishedAt,
    readingTime,
    isFeatured,
    featuredImage {
      asset->,
      "alt": coalesce(alt[$locale], alt.en, alt)
    },
    categories[]->{
      "title": coalesce(title[$locale], title.en, title),
      "slug": slug.current
    },
    author->{
      name,
      image {
        asset->
      },
      "role": coalesce(role[$locale], role.en, role)
    }
  }
`)

export const BLOG_RECENT_POSTS_QUERY = defineQuery(`
  *[_type == "blogPost" && isFeatured != true] | order(publishedAt desc) [0...$limit] {
    _id,
    "title": coalesce(title[$locale], title.en, title),
    "slug": slug.current,
    "excerpt": coalesce(excerpt[$locale], excerpt.en, excerpt),
    publishedAt,
    readingTime,
    isFeatured,
    featuredImage {
      asset->,
      "alt": coalesce(alt[$locale], alt.en, alt)
    },
    categories[]->{
      "title": coalesce(title[$locale], title.en, title),
      "slug": slug.current
    },
    author->{
      name,
      image {
        asset->
      },
      "role": coalesce(role[$locale], role.en, role)
    }
  }
`)

export const BLOG_POST_QUERY = defineQuery(`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    "title": coalesce(title[$locale], title.en, title),
    "slug": slug.current,
    "excerpt": coalesce(excerpt[$locale], excerpt.en, excerpt),
    "body": coalesce(body[$locale], body.en, body),
    publishedAt,
    readingTime,
    featuredImage {
      asset->,
      "alt": coalesce(alt[$locale], alt.en, alt)
    },
    categories[]->{
      "title": coalesce(title[$locale], title.en, title),
      "slug": slug.current
    },
    author->{
      name,
      image {
        asset->
      },
      "role": coalesce(role[$locale], role.en, role),
      "description": coalesce(description[$locale], description.en, description),
      linkedinUrl
    }
  }
`)

export const FEATURED_POSTS_QUERY = defineQuery(`
  *[_type == "blogPost" && isFeatured == true] | order(publishedAt desc) [0...3] {
    _id,
    "title": coalesce(title[$locale], title.en, title),
    "slug": slug.current,
    "excerpt": coalesce(excerpt[$locale], excerpt.en, excerpt),
    publishedAt,
    readingTime,
    isFeatured,
    featuredImage {
      asset->,
      "alt": coalesce(alt[$locale], alt.en, alt)
    },
    categories[]->{
      "title": coalesce(title[$locale], title.en, title),
      "slug": slug.current
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
    "title": coalesce(title[$locale], title.en, title),
    "slug": slug.current,
    "description": coalesce(description[$locale], description.en, description)
  }
`)

export const RELATED_POSTS_QUERY = defineQuery(`
  *[_type == "blogPost" && _id != $currentId && count((categories[]->slug.current)[@ in $categorySlugs]) > 0] | order(publishedAt desc) [0...3] {
    _id,
    "title": coalesce(title[$locale], title.en, title),
    "slug": slug.current,
    publishedAt,
    featuredImage {
      asset->,
      "alt": coalesce(alt[$locale], alt.en, alt)
    },
    author->{
      name
    }
  }
`)
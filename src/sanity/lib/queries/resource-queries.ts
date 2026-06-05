import { defineQuery } from 'next-sanity'

// INDUSTRY VERTICAL QUERIES
export const INDUSTRY_VERTICALS_QUERY = defineQuery(`
  *[_type == "industryVertical" && isActive == true] | order(displayOrder asc) {
    _id,
    "title": coalesce(title[$locale], title.en, title),
    "slug": slug.current,
    "description": coalesce(description[$locale], description.en, description),
    heroImage {
      asset->,
      "alt": coalesce(alt[$locale], alt.en, alt)
    },
    "painPoints": painPoints[]{ "text": coalesce(@[$locale], @.en, @) }.text,
    "testimonialCount": count(clientTestimonials)
  }
`)

export const INDUSTRY_VERTICAL_QUERY = defineQuery(`
  *[_type == "industryVertical" && slug.current == $slug][0] {
    _id,
    "title": coalesce(title[$locale], title.en, title),
    "slug": slug.current,
    "description": coalesce(description[$locale], description.en, description),
    heroImage {
      asset->,
      "alt": coalesce(alt[$locale], alt.en, alt)
    },
    heroVideo,
    "painPoints": painPoints[]{ "text": coalesce(@[$locale], @.en, @) }.text,
    featuredPlaybookChapters[]->{
      _id,
      "title": coalesce(title[$locale], title.en, title),
      "slug": slug.current,
      chapterNumber
    },
    relatedPlaybooks[]->{
      _id,
      "title": coalesce(title[$locale], title.en, title),
      "slug": slug.current,
      coverImage {
        asset->,
        "alt": coalesce(alt[$locale], alt.en, alt)
      }
    },
    clientTestimonials[]->{
      _id,
      clientName,
      "clientTitle": coalesce(clientTitle[$locale], clientTitle.en, clientTitle),
      "quote": coalesce(quote[$locale], quote.en, quote),
      rating,
      clientCompany
    },
    stats[]{
      value,
      "label": coalesce(label[$locale], label.en, label)
    },
    seo {
      "metaTitle": coalesce(metaTitle[$locale], metaTitle.en, metaTitle),
      "metaDescription": coalesce(metaDescription[$locale], metaDescription.en, metaDescription),
      openGraphImage,
      "keywords": keywords[]{ "value": coalesce(@[$locale], @.en, @) }.value,
      canonicalUrl,
      noIndex,
      structuredDataType
    }
  }
`)

export const INDUSTRY_VERTICAL_SLUGS_QUERY = defineQuery(`
  *[_type == "industryVertical" && isActive == true && defined(slug.current)] {
    "slug": slug.current
  }
`)

// PLAYBOOK QUERIES
export const PLAYBOOKS_QUERY = defineQuery(`
  *[_type == "playbook"] | order(displayOrder asc, isFeatured desc) {
    _id,
    "title": coalesce(title[$locale], title.en, title),
    "slug": slug.current,
    "description": coalesce(description[$locale], description.en, description),
    coverImage {
      asset->,
      "alt": coalesce(alt[$locale], alt.en, alt)
    },
    isFeatured,
    "chapterCount": count(chapters)
  }
`)

export const PLAYBOOK_QUERY = defineQuery(`
  *[_type == "playbook" && slug.current == $slug][0] {
    _id,
    "title": coalesce(title[$locale], title.en, title),
    "slug": slug.current,
    "description": coalesce(description[$locale], description.en, description),
    coverImage {
      asset->,
      "alt": coalesce(alt[$locale], alt.en, alt)
    },
    isFeatured,
    "gatedPdfUrl": gatedPdf.asset->url,
    chapters[]->{
      _id,
      "title": coalesce(title[$locale], title.en, title),
      "slug": slug.current,
      chapterNumber,
      isGated
    },
    seo {
      "metaTitle": coalesce(metaTitle[$locale], metaTitle.en, metaTitle),
      "metaDescription": coalesce(metaDescription[$locale], metaDescription.en, metaDescription),
      openGraphImage,
      "keywords": keywords[]{ "value": coalesce(@[$locale], @.en, @) }.value,
      canonicalUrl,
      noIndex,
      structuredDataType
    }
  }
`)

export const PLAYBOOK_CHAPTERS_QUERY = defineQuery(`
  *[_type == "playbookChapter"] | order(displayOrder asc, chapterNumber asc) {
    _id,
    "title": coalesce(title[$locale], title.en, title),
    "slug": slug.current,
    chapterNumber,
    isGated,
    "keyTakeaways": keyTakeaways[]{ "text": coalesce(@[$locale], @.en, @) }.text,
    "tools": tools[]{ "text": coalesce(@[$locale], @.en, @) }.text
  }
`)

export const PLAYBOOK_CHAPTER_QUERY = defineQuery(`
  *[_type == "playbookChapter" && slug.current == $slug][0] {
    _id,
    "title": coalesce(title[$locale], title.en, title),
    "slug": slug.current,
    chapterNumber,
    videoEmbed,
    videoThumbnail {
      asset->,
      "alt": coalesce(alt[$locale], alt.en, alt)
    },
    "content": coalesce(content[$locale], content.en, content),
    "keyTakeaways": keyTakeaways[]{ "text": coalesce(@[$locale], @.en, @) }.text,
    "tools": tools[]{ "text": coalesce(@[$locale], @.en, @) }.text,
    isGated,
    "gatedContent": coalesce(gatedContent[$locale], gatedContent.en, gatedContent)
  }
`)

export const FEATURED_PLAYBOOK_QUERY = defineQuery(`
  *[_type == "playbook" && isFeatured == true][0] {
    _id,
    "title": coalesce(title[$locale], title.en, title),
    "slug": slug.current,
    "description": coalesce(description[$locale], description.en, description),
    coverImage {
      asset->,
      "alt": coalesce(alt[$locale], alt.en, alt)
    },
    "chapterCount": count(chapters)
  }
`)

export const RESOURCES_PAGE_QUERY = defineQuery(`
  *[_type == "resourcesPage"][0] {
    "heroTitle": coalesce(heroTitle[$locale], heroTitle.en, heroTitle),
    "heroSubtitle": coalesce(heroSubtitle[$locale], heroSubtitle.en, heroSubtitle),
    featuredResource->{
      _type,
      _id,
      "title": coalesce(title[$locale], title.en, title),
      "slug": slug.current,
      "description": coalesce(description[$locale], description.en, description),
      coverImage {
        asset->,
        "alt": coalesce(alt[$locale], alt.en, alt)
      },
      featuredImage {
        asset->,
        "alt": coalesce(alt[$locale], alt.en, alt)
      },
      isFeatured,
      "chapterCount": count(chapters)
    },
    "categories": categories[]->{
      _id,
      "title": coalesce(title[$locale], title.en, title),
      "slug": slug.current
    },
    showPlaybooks,
    showBlogPosts,
    showTools,
    seo {
      "metaTitle": coalesce(metaTitle[$locale], metaTitle.en, metaTitle),
      "metaDescription": coalesce(metaDescription[$locale], metaDescription.en, metaDescription),
      openGraphImage,
      "keywords": keywords[]{ "value": coalesce(@[$locale], @.en, @) }.value,
      canonicalUrl,
      noIndex,
      structuredDataType
    }
  }
`)

export const RESOURCES_PLAYBOOKS_QUERY = defineQuery(`
  *[_type == "playbook"] | order(displayOrder asc, isFeatured desc) {
    _id,
    "title": coalesce(title[$locale], title.en, title),
    "slug": slug.current,
    "description": coalesce(description[$locale], description.en, description),
    coverImage {
      asset->,
      "alt": coalesce(alt[$locale], alt.en, alt)
    },
    isFeatured,
    displayOrder,
    "chapterCount": count(chapters)
  }
`)

export const RESOURCES_BLOG_POSTS_QUERY = defineQuery(`
  *[_type == "blogPost"] | order(publishedAt desc) {
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
    }
  }
`)
import { defineQuery } from 'next-sanity'

// Book landing page query — fetches product data optimized for lead-gen landing pages
export const BOOK_LANDING_QUERY = defineQuery(`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    "title": coalesce(title[$locale], title.en, title),
    "slug": slug.current,
    "imageUrl": coverImage.asset->url,
    "imageMetadata": coverImage.asset->metadata { lqip },
    price,
    compareAtPrice,
    "shortDescription": coalesce(shortDescription[$locale], shortDescription.en, shortDescription),
    "fullDescription": coalesce(fullDescription[$locale], fullDescription.en, fullDescription),
    format,
    "features": features[]{ "text": coalesce(@[$locale], @.en, @) }.text,
    "badge": coalesce(badge[$locale], badge.en, badge),
    "leadMagnetTag": leadMagnetTag,
    "serviceLane": serviceLane,
    pageCount,
    publisher,
    publishDate,
    isbn,
    "learningObjectives": learningObjectives[]{
      "title": coalesce(title[$locale], title.en, title),
      "description": coalesce(description[$locale], description.en, description)
    },
    author-> {
      name,
      "role": coalesce(role[$locale], role.en, role),
      "credentials": credentials[]{ "text": coalesce(@[$locale], @.en, @) }.text,
      "imageUrl": image.asset->url,
      "bioShort": coalesce(bioShort[$locale], bioShort.en, bioShort)
    },
    "featuredTestimonials": featuredTestimonials[]-> {
        _id,
        clientName,
        "clientTitle": coalesce(clientTitle[$locale], clientTitle.en, clientTitle),
        clientCompany,
        "quote": coalesce(quote[$locale], quote.en, quote),
        rating,
        "imageUrl": image.asset->url
    },
    seo {
      "metaTitle": coalesce(metaTitle[$locale], metaTitle.en, metaTitle),
      "metaDescription": coalesce(metaDescription[$locale], metaDescription.en, metaDescription),
      openGraphImage,
      "keywords": keywords[]{ "value": coalesce(@[$locale], @.en, @) }.value,
      canonicalUrl,
      noIndex,
      structuredDataType
    },
    "relatedServices": select(
      count(relatedServices) > 0 => relatedServices[]-> {
        _id,
        "title": coalesce(title[$locale], title.en, title),
        "slug": slug.current,
        "shortDescription": coalesce(shortDescription[$locale], shortDescription.en, shortDescription),
        icon
      }
    ),
    "relatedProducts": select(
      count(relatedProducts) > 0 => relatedProducts[]-> {
        _id,
        "title": coalesce(title[$locale], title.en, title),
        "slug": slug.current,
        "imageUrl": coverImage.asset->url,
        price,
        "shortDescription": coalesce(shortDescription[$locale], shortDescription.en, shortDescription),
        format,
        "badge": coalesce(badge[$locale], badge.en, badge),
        category
      }
    )
  }
`)

export const BOOK_SLUGS_QUERY = defineQuery(`
  *[_type == "product" && defined(slug.current)] {
    "slug": slug.current
  }
`)

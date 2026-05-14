import { defineQuery } from 'next-sanity'

// Shop page content/settings (hero, featured product, faq)
export const SHOP_PAGE_QUERY = defineQuery(`
  *[_type == "shopSettings"][0] {
    "heroTitle": coalesce(heroTitle[$locale], heroTitle.en, heroTitle),
    "heroSubtitle": coalesce(heroSubtitle[$locale], heroSubtitle.en, heroSubtitle),
    heroVideo,
    featuredProduct-> {
      _id,
      "title": coalesce(title[$locale], title.en, title),
      "slug": slug.current,
      "imageUrl": coverImage.asset->url,
      price,
      compareAtPrice,
      "shortDescription": coalesce(shortDescription[$locale], shortDescription.en, shortDescription),
      format,
      stripeProductId,
      stripePriceId,
      buyLink,
      editions[] {
        _key,
        name,
        price,
        format,
        stripePriceId,
        description
      },
      "features": features[]{ "text": coalesce(@[$locale], @.en, @) }.text,
      "badge": coalesce(badge[$locale], badge.en, badge),
      category,
      rating
    },
    "faq": faq[]{
      "question": coalesce(question[$locale], question.en, question),
      "answer": coalesce(answer[$locale], answer.en, answer)
    },
    "recoveryCTA": {
      "title": coalesce(recoveryCTA.title[$locale], recoveryCTA.title.en, recoveryCTA.title),
      "subtitle": coalesce(recoveryCTA.subtitle[$locale], recoveryCTA.subtitle.en, recoveryCTA.subtitle),
      "buttonText": coalesce(recoveryCTA.buttonText[$locale], recoveryCTA.buttonText.en, recoveryCTA.buttonText),
      "buttonUrl": recoveryCTA.buttonUrl
    },
    seo {
      metaTitle,
      metaDescription,
      openGraphImage
    }
  }
`)

// Product listing for the shop grid
export const ALL_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product" && !(_id in path("drafts.**"))] | order(isFeatured desc, title asc) {
    _id,
    "title": coalesce(title[$locale], title.en, title),
    "slug": slug.current,
    "imageUrl": coverImage.asset->url,
    "imageMetadata": coverImage.asset->metadata { lqip },
    price,
    compareAtPrice,
    "shortDescription": coalesce(shortDescription[$locale], shortDescription.en, shortDescription),
    format,
    buyLink,
    isFeatured,
    "badge": coalesce(badge[$locale], badge.en, badge),
    category,
    rating
  }
`)

export const PRODUCT_DETAIL_QUERY = defineQuery(`
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
    stripeProductId,
    stripePriceId,
    buyLink,
    "features": features[]{ "text": coalesce(@[$locale], @.en, @) }.text,
    "badge": coalesce(badge[$locale], badge.en, badge),
    category,
    rating,
    editions[] {
      _key,
      name,
      price,
      format,
      stripePriceId,
      description
    },
    "samplePages": samplePages[] {
      "url": asset->url,
      "metadata": asset->metadata { lqip }
    },
    "learningObjectives": learningObjectives[]{
      "title": coalesce(title[$locale], title.en, title),
      "description": coalesce(description[$locale], description.en, description)
    },
    author-> {
      name,
      "role": coalesce(role[$locale], role.en, role),
      "credentials": credentials[]{ "text": coalesce(@[$locale], @.en, @) }.text,
      "imageUrl": image.asset->url,
      bioShort
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
    pageCount,
    publisher,
    publishDate,
    isbn,
    videoUrl,
    "videoFileUrl": videoFile.asset->url,
    videoThumbnail {
      asset->,
      alt
    },
    stripeProductId,
    stripePriceId,
    editions[] {
      name,
      price,
      format,
      stripePriceId,
      stripeProductId,
      description
    },
    seo {
      metaTitle,
      metaDescription,
      openGraphImage
    },
    "relatedProducts": select(
      count(relatedProducts) > 0 => relatedProducts[]-> {
        _id,
        "title": coalesce(title[$locale], title.en, title),
        "slug": slug.current,
        "imageUrl": coverImage.asset->url,
        "imageMetadata": coverImage.asset->metadata { lqip },
        price,
        compareAtPrice,
        "shortDescription": coalesce(shortDescription[$locale], shortDescription.en, shortDescription),
        format,
        buyLink,
        "badge": coalesce(badge[$locale], badge.en, badge),
        category,
        rating
      },
      *[_type == "product" && slug.current != $slug && !(_id in path("drafts.**"))] | order(rating desc, isFeatured desc)[0...3] {
        _id,
        "title": coalesce(title[$locale], title.en, title),
        "slug": slug.current,
        "imageUrl": coverImage.asset->url,
        "imageMetadata": coverImage.asset->metadata { lqip },
        price,
        compareAtPrice,
        "shortDescription": coalesce(shortDescription[$locale], shortDescription.en, shortDescription),
        format,
        buyLink,
        "badge": coalesce(badge[$locale], badge.en, badge),
        category,
        rating
      }
    ),
    "relatedServices": select(
      count(relatedServices) > 0 => relatedServices[]-> {
        _id,
        "title": coalesce(title[$locale], title.en, title),
        "slug": slug.current,
        "shortDescription": coalesce(shortDescription[$locale], shortDescription.en, shortDescription),
        icon
      },
      *[_type == "service" && !(_id in path("drafts.**"))] | order(isPopular desc)[0...3] {
        _id,
        "title": coalesce(title[$locale], title.en, title),
        "slug": slug.current,
        "shortDescription": coalesce(shortDescription[$locale], shortDescription.en, shortDescription),
        icon
      }
    )
  }
`)

export const PRODUCT_SLUGS_QUERY = defineQuery(`
  *[_type == "product" && defined(slug.current)] {
    "slug": slug.current
  }
`)
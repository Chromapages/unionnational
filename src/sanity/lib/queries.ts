import { defineQuery } from 'next-sanity'

export const TEAM_PAGE_QUERY = defineQuery(`
  *[_type == "teamPage"][0] {
    ...,
    "heroBadge": coalesce(heroBadge[$locale], heroBadge.en, heroBadge),
    "heroTitle": coalesce(heroTitle[$locale], heroTitle.en, heroTitle),
    "heroSubtitle": coalesce(heroSubtitle[$locale], heroSubtitle.en, heroSubtitle),
    "founderSectionTitle": coalesce(founderSectionTitle[$locale], founderSectionTitle.en, founderSectionTitle),
    "teamSectionTitle": coalesce(teamSectionTitle[$locale], teamSectionTitle.en, teamSectionTitle),
    "teamSectionSubtitle": coalesce(teamSectionSubtitle[$locale], teamSectionSubtitle.en, teamSectionSubtitle),
    "values": values[]{
      "title": coalesce(title[$locale], title.en, title),
      "description": coalesce(description[$locale], description.en, description),
      iconName
    },
    "hiringBadge": coalesce(hiringBadge[$locale], hiringBadge.en, hiringBadge),
    "hiringTitle": coalesce(hiringTitle[$locale], hiringTitle.en, hiringTitle),
    "hiringDescription": coalesce(hiringDescription[$locale], hiringDescription.en, hiringDescription),
    "hiringBenefits": hiringBenefits[]{ "text": coalesce(@[$locale], @.en, @) }.text,
    "hiringCtaText": coalesce(hiringCtaText[$locale], hiringCtaText.en, hiringCtaText),
    "ctaTitle": coalesce(ctaTitle[$locale], ctaTitle.en, ctaTitle),
    "ctaSubtitle": coalesce(ctaSubtitle[$locale], ctaSubtitle.en, ctaSubtitle),
    "ctaButtonText": coalesce(ctaButtonText[$locale], ctaButtonText.en, ctaButtonText),
    hiringImage {
      asset->
    },
    ctaBackgroundImage {
      asset->,
      alt
    }
  }
`);

export const TEAM_MEMBERS_QUERY = defineQuery(`
  *[_type == "teamMember" && isFounder != true] | order(displayOrder asc) {
    _id,
    name,
    "role": coalesce(role[$locale], role.en, role),
    "credentials": coalesce(credentials[$locale], credentials.en, credentials),
    "description": coalesce(description[$locale], description.en, description),
    image {
      asset->
    },
    linkedinUrl
  }
`);

export const FOUNDER_QUERY = defineQuery(`
  *[_type == "teamMember" && isFounder == true][0] {
    _id,
    name,
    "role": coalesce(role[$locale], role.en, role),
    "credentials": coalesce(credentials[$locale], credentials.en, credentials),
    "description": coalesce(description[$locale], description.en, description),
    image {
      asset->
    },
    linkedinUrl,
    "tags": tags[]{ "text": coalesce(@[$locale], @.en, @) }.text
  }
`);

// BLOG QUERIES
export const BLOG_SETTINGS_QUERY = defineQuery(`
  *[_type == "blogSettings"][0] {
    "heroTitle": coalesce(heroTitle[$locale], heroTitle.en, heroTitle),
    "heroSubtitle": coalesce(heroSubtitle[$locale], heroSubtitle.en, heroSubtitle),
    postsPerPage,
    "newsletterTitle": coalesce(newsletterTitle[$locale], newsletterTitle.en, newsletterTitle),
    "newsletterDescription": coalesce(newsletterDescription[$locale], newsletterDescription.en, newsletterDescription)
  }
`);

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
      alt
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
`);

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
      alt
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
`);

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
      alt
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
`);

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
      alt
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
`);

export const BLOG_CATEGORIES_QUERY = defineQuery(`
  *[_type == "blogCategory"] | order(displayOrder asc) {
    _id,
    "title": coalesce(title[$locale], title.en, title),
    "slug": slug.current,
    "description": coalesce(description[$locale], description.en, description)
  }
`);

export const RELATED_POSTS_QUERY = defineQuery(`
  *[_type == "blogPost" && _id != $currentId && count((categories[]->slug.current)[@ in $categorySlugs]) > 0] | order(publishedAt desc) [0...3] {
    _id,
    "title": coalesce(title[$locale], title.en, title),
    "slug": slug.current,
    publishedAt,
    featuredImage {
      asset->,
      alt
    },
    author->{
      name
    }
  }
`);
export const SERVICES_QUERY = `*[_type == "service"] | order(isPopular desc) {
  _id,
  "title": coalesce(title[$locale], title.en, title),
  slug,
  "shortDescription": coalesce(shortDescription[$locale], shortDescription.en, shortDescription),
  icon,
  "features": features[]{ "text": coalesce(@[$locale], @.en, @) }.text,
  "impactGoal": coalesce(impactGoal[$locale], impactGoal.en, impactGoal),
  "badge": coalesce(badge[$locale], badge.en, badge),
  category,
  "startingPrice": coalesce(startingPrice[$locale], startingPrice.en, startingPrice),
  isPopular,
  accentColor,
  "faq": faq[]{
    "question": coalesce(question[$locale], question.en, question),
    "answer": coalesce(answer[$locale], answer.en, answer)
  },
  "comparisonPoints": comparisonPoints[]{
    "feature": coalesce(feature[$locale], feature.en, feature),
    diy,
    bigFirm,
    unionNational
  }
}`;

export const SERVICE_QUERY = `*[_type == "service" && slug.current == $slug][0] {
  _id,
  "title": coalesce(title[$locale], title.en, title),
  slug,
  "shortDescription": coalesce(shortDescription[$locale], shortDescription.en, shortDescription),
  "fullDescription": coalesce(fullDescription[$locale], fullDescription.en, fullDescription),
  icon,
  "features": features[]{ "text": coalesce(@[$locale], @.en, @) }.text,
  "impactGoal": coalesce(impactGoal[$locale], impactGoal.en, impactGoal),
  "badge": coalesce(badge[$locale], badge.en, badge),
  category,
  "startingPrice": coalesce(startingPrice[$locale], startingPrice.en, startingPrice),
  isPopular,
  accentColor,
  "faq": faq[]{
    "question": coalesce(question[$locale], question.en, question),
    "answer": coalesce(answer[$locale], answer.en, answer)
  },
  "comparisonPoints": comparisonPoints[]{
    "feature": coalesce(feature[$locale], feature.en, feature),
    diy,
    bigFirm,
    unionNational
  },
  "videoFileUrl": videoFile.asset->url,
  videoThumbnail {
    asset->,
    alt
  }
}`;

// SHOP QUERIES
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
      buyLink,
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
`);

// Product listing for the shop grid
export const ALL_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product" && !(_id in path("drafts.**"))] | order(isFeatured desc, title asc) {
    _id,
    "title": coalesce(title[$locale], title.en, title),
    "slug": slug.current,
    "imageUrl": coverImage.asset->url,
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
`);

export const PRODUCT_DETAIL_QUERY = defineQuery(`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    "title": coalesce(title[$locale], title.en, title),
    "slug": slug.current,
    "imageUrl": coverImage.asset->url,
    price,
    compareAtPrice,
    "shortDescription": coalesce(shortDescription[$locale], shortDescription.en, shortDescription),
    "fullDescription": coalesce(fullDescription[$locale], fullDescription.en, fullDescription),
    format,
    buyLink,
    "features": features[]{ "text": coalesce(@[$locale], @.en, @) }.text,
    "badge": coalesce(badge[$locale], badge.en, badge),
    category,
    rating,
    seo {
      metaTitle,
      metaDescription,
      openGraphImage
    },
    relatedProducts[]-> {
      _id,
      "title": coalesce(title[$locale], title.en, title),
      "slug": slug.current,
      "imageUrl": coverImage.asset->url,
      price,
      compareAtPrice,
      "shortDescription": coalesce(shortDescription[$locale], shortDescription.en, shortDescription),
      format,
      buyLink,
      "badge": coalesce(badge[$locale], badge.en, badge),
      category,
      rating
    }
  }
`);

export const PRODUCT_SLUGS_QUERY = defineQuery(`
  *[_type == "product" && defined(slug.current)] {
    "slug": slug.current
  }
`);

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    ...,
    "tagline": coalesce(tagline[$locale], tagline.en, tagline),
    "ctaButtonText": coalesce(ctaButtonText[$locale], ctaButtonText.en, ctaButtonText),
    "copyrightText": coalesce(copyrightText[$locale], copyrightText.en, copyrightText),
    logo {
      asset->,
      alt
    },
    logoAlt {
      asset->,
      alt
    }
  }
`);

export const HOME_PAGE_QUERY = defineQuery(`
  * [_type == "homePage"][0] {
    "heroTitle": coalesce(heroTitle[$locale], heroTitle.en, heroTitle),
    "heroSubtitle": coalesce(heroSubtitle[$locale], heroSubtitle.en, heroSubtitle),
    heroVideoUrl,
    "heroCtaText": coalesce(heroCtaText[$locale], heroCtaText.en, heroCtaText),
    heroCtaUrl,
    trustLogos[] {
      asset ->,
      alt
    },
    stats[] {
      value,
      "label": coalesce(label[$locale], label.en, label)
    },
    bentoGridBackgroundImage {
      asset->,
      alt
    },
    "ctaTitle": coalesce(ctaTitle[$locale], ctaTitle.en, ctaTitle),
    "ctaSubtitle": coalesce(ctaSubtitle[$locale], ctaSubtitle.en, ctaSubtitle),
    "ctaButtonText": coalesce(ctaButtonText[$locale], ctaButtonText.en, ctaButtonText),
    ctaButtonUrl,
    ctaBackgroundImage {
      asset->,
      alt
    },
    seo {
      metaTitle,
      metaDescription,
      openGraphImage
    }
  }
`);

export const TESTIMONIALS_QUERY = defineQuery(`
  * [_type == "testimonial" && isPublished == true] | order(displayOrder asc) {
  _id,
    clientName,
    "clientTitle": coalesce(clientTitle[$locale], clientTitle.en, clientTitle),
    "quote": coalesce(quote[$locale], quote.en, quote),
    clientCompany,
    rating,
    isFeatured,
    image {
    asset ->
    },
  serviceUsed -> {
    "title": coalesce(title[$locale], title.en, title)
  }
}
`);

export const FAQ_QUERY = defineQuery(`
  * [_type == "faq"] | order(displayOrder asc){
  _id,
    "question": coalesce(question[$locale], question.en, question),
    "answer": coalesce(answer[$locale], answer.en, answer),
    category
}
`);

export const ABOUT_PAGE_QUERY = defineQuery(`
  * [_type == "aboutPage"][0]{
    "valuesEyebrow": coalesce(valuesEyebrow[$locale], valuesEyebrow.en, valuesEyebrow),
    "valuesTitle": coalesce(valuesTitle[$locale], valuesTitle.en, valuesTitle),
    "values": values[]{
      "title": coalesce(title[$locale], title.en, title),
      "description": coalesce(description[$locale], description.en, description),
      iconName
    },
    "primaryValue": {
      "badge": coalesce(primaryValue.badge[$locale], primaryValue.badge.en, primaryValue.badge),
      "title": coalesce(primaryValue.title[$locale], primaryValue.title.en, primaryValue.title),
      "description": coalesce(primaryValue.description[$locale], primaryValue.description.en, primaryValue.description),
      "imageUrl": primaryValue.image.asset->url,
      "videoUrl": primaryValue.videoUrl,
      "videoFileUrl": primaryValue.videoFile.asset->url
    },
    certifications[]{
      name,
      logo
    },
    "timeline": timeline[]{
      year,
      "title": coalesce(title[$locale], title.en, title),
      "description": coalesce(description[$locale], description.en, description)
    },
    clientLogos[]{
      asset->,
      alt
    },
    founderVideoUrl,
    "founderVideoFileUrl": founderVideoFile.asset->url,
    "ctaTitle": coalesce(ctaTitle[$locale], ctaTitle.en, ctaTitle),
    "ctaSubtitle": coalesce(ctaSubtitle[$locale], ctaSubtitle.en, ctaSubtitle),
    "ctaButtonText": coalesce(ctaButtonText[$locale], ctaButtonText.en, ctaButtonText),
    ctaButtonUrl,
    ctaBackgroundImage {
      asset->,
      alt
    }
  }
`);

export const CONTACT_SETTINGS_QUERY = defineQuery(`
  *[_type == "contactSettings"][0]{
    "heroTitle": coalesce(heroTitle[$locale], heroTitle.en, heroTitle),
    "heroSubtitle": coalesce(heroSubtitle[$locale], heroSubtitle.en, heroSubtitle),
    heroStats,
    founder {
      name,
      "title": coalesce(title[$locale], title.en, title),
      "imageUrl": image.asset->url,
      "quote": coalesce(quote[$locale], quote.en, quote),
      "credentials": credentials[]{ "text": coalesce(@[$locale], @.en, @) }.text
    },
    contactEmail,
    contactPhone,
    officeAddress,
    officeHours,
    ghlCalendarUrl,
    "alternativeCTA": {
      "title": coalesce(alternativeCTA.title[$locale], alternativeCTA.title.en, alternativeCTA.title),
      "subtitle": coalesce(alternativeCTA.subtitle[$locale], alternativeCTA.subtitle.en, alternativeCTA.subtitle),
      "phone": alternativeCTA.phone
    },
    "formTitle": coalesce(formTitle[$locale], formTitle.en, formTitle),
    "formSubtitle": coalesce(formSubtitle[$locale], formSubtitle.en, formSubtitle),
    seo {
      metaTitle,
      metaDescription,
      openGraphImage
    }
  }
`);

export const SERVICES_PAGE_QUERY = defineQuery(`
  * [_type == "servicesPage"][0]{
    "heroTitle": coalesce(heroTitle[$locale], heroTitle.en, heroTitle),
    "heroSubtitle": coalesce(heroSubtitle[$locale], heroSubtitle.en, heroSubtitle),
    "heroBadge": coalesce(heroBadge[$locale], heroBadge.en, heroBadge),
    "ctaTitle": coalesce(ctaTitle[$locale], ctaTitle.en, ctaTitle),
    "ctaSubtitle": coalesce(ctaSubtitle[$locale], ctaSubtitle.en, ctaSubtitle),
    "ctaButtonText": coalesce(ctaButtonText[$locale], ctaButtonText.en, ctaButtonText),
    ctaButtonUrl,
    ctaBackgroundImage {
      asset->,
      alt
    }
}
`);

export const PRICING_TIERS_QUERY = defineQuery(`
  * [_type == "pricingTier"] | order(displayOrder asc){
    _id,
    "name": coalesce(name[$locale], name.en, name),
    slug,
    "tagline": coalesce(tagline[$locale], tagline.en, tagline),
    "price": coalesce(price[$locale], price.en, price),
    billingPeriod,
    "features": features[]{ "text": coalesce(@[$locale], @.en, @) }.text,
    category,
    "bestFor": coalesce(bestFor[$locale], bestFor.en, bestFor),
    "includes": coalesce(includes[$locale], includes.en, includes),
    isFeatured,
    "ctaText": coalesce(ctaText[$locale], ctaText.en, ctaText),
    ctaUrl,
    relatedService -> {
      "title": coalesce(title[$locale], title.en, title),
      slug,
      "shortDescription": coalesce(shortDescription[$locale], shortDescription.en, shortDescription),
      icon
    }
  }
`);

export const LEGAL_PAGE_QUERY = defineQuery(`
  * [_type == "legalPage" && slug.current == $slug][0]{
    "title": coalesce(title[$locale], title.en, title),
    lastUpdated,
    "body": coalesce(body[$locale], body.en, body)
}
`);

export const VSL_PAGE_QUERY = defineQuery(`
    *[_type == "vslPage" && slug.current == $slug][0] {
      ...,
      videoFile {
        asset-> {
          url
        }
      },
      videoPoster {
        asset-> {
          url
        }
      },
      testimonial {
        ...,
        authorImage {
          asset-> {
            url
          }
        }
      }
    }
  `)

export const FOOTER_LEGAL_PAGES_QUERY = defineQuery(`
    *[_type == "legalPage" && isPublished == true] | order(title asc) {
      "title": coalesce(title[$locale], title.en, title),
      "slug": slug.current,
      pageType
    }
  `);

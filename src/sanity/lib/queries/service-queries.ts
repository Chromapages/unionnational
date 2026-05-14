import { defineQuery } from 'next-sanity'

export const SERVICES_QUERY = defineQuery(`*[_type == "service"] | order(isPopular desc) {
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
  targetKeyword,
  targetAudience,
  "keyBenefit": coalesce(keyBenefit[$locale], keyBenefit.en, keyBenefit),
  "eligibility": coalesce(eligibility[$locale], eligibility.en, eligibility),
  "faq": faq[]{
    "question": coalesce(question[$locale], question.en, question),
    "answer": coalesce(answer[$locale], answer.en, answer)
  },
  schema_faq
}`)

export const SERVICE_QUERY = defineQuery(`*[_type == "service" && slug.current == $slug][0] {
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
  targetKeyword,
  targetAudience,
  "keyBenefit": coalesce(keyBenefit[$locale], keyBenefit.en, keyBenefit),
  "eligibility": coalesce(eligibility[$locale], eligibility.en, eligibility),
  "faq": faq[]{
    "question": coalesce(question[$locale], question.en, question),
    "answer": coalesce(answer[$locale], answer.en, answer)
  },
  "whyChooseUsTitle": coalesce(whyChooseUsTitle[$locale], whyChooseUsTitle.en, whyChooseUsTitle),
  "whyChooseUsDescription": coalesce(whyChooseUsDescription[$locale], whyChooseUsDescription.en, whyChooseUsDescription),
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
  },
  schema_faq,
  seo {
    metaTitle,
    metaDescription,
    openGraphImage {
      asset->
    },
    keywords
  }
}`)

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
`)

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
`)
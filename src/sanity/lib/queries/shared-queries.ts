import { defineQuery } from 'next-sanity'

export const COMPARISON_TABLES_QUERY = defineQuery(`
  *[_type == "comparisonTable" && isActive == true] | order(displayOrder asc) {
    _id,
    "title": coalesce(title[$locale], title.en, title),
    "subtitle": coalesce(subtitle[$locale], subtitle.en, subtitle),
    comparisonType,
    industry,
    showUnionNational,
    unionNationalLabel,
    competitors,
    "features": features[]{
      "featureName": coalesce(featureName[$locale], featureName.en, featureName),
      "unionValue": coalesce(unionValue[$locale], unionValue.en, unionValue),
      unionHighlight,
      competitorValues,
      isCheckmark,
      icon
    },
    "cta": cta{
      "text": coalesce(text[$locale], text.en, text),
      url
    },
    badge
  }
`)

export const COMPARISON_TABLE_QUERY = defineQuery(`
  *[_type == "comparisonTable" && _id == $id][0] {
    _id,
    "title": coalesce(title[$locale], title.en, title),
    "subtitle": coalesce(subtitle[$locale], subtitle.en, subtitle),
    comparisonType,
    industry,
    showUnionNational,
    unionNationalLabel,
    competitors,
    "features": features[]{
      "featureName": coalesce(featureName[$locale], featureName.en, featureName),
      "unionValue": coalesce(unionValue[$locale], unionValue.en, unionValue),
      unionHighlight,
      competitorValues,
      isCheckmark,
      icon
    },
    "cta": cta{
      "text": coalesce(text[$locale], text.en, text),
      url
    },
    badge
  }
`)

export const DEFAULT_COMPARISON_QUERY = defineQuery(`
  *[_type == "comparisonTable" && isActive == true && (comparisonType == "general" || comparisonType == "taxRelief")][0] {
    _id,
    "title": coalesce(title[$locale], title.en, title),
    "subtitle": coalesce(subtitle[$locale], subtitle.en, subtitle),
    comparisonType,
    industry,
    showUnionNational,
    unionNationalLabel,
    competitors,
    "features": features[]{
      "featureName": coalesce(featureName[$locale], featureName.en, featureName),
      "unionValue": coalesce(unionValue[$locale], unionValue.en, unionValue),
      unionHighlight,
      competitorValues,
      isCheckmark,
      icon
    },
    "cta": cta{
      "text": coalesce(text[$locale], text.en, text),
      url
    },
    badge
  }
`)

export const FAQ_QUERY = defineQuery(`
  * [_type == "faq"] | order(displayOrder asc){
  _id,
    "question": coalesce(question[$locale], question.en, question),
    "answer": coalesce(answer[$locale], answer.en, answer),
    category
}
`)

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
`)

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
`)

export const LEGAL_PAGE_QUERY = defineQuery(`
  * [_type == "legalPage" && slug.current == $slug][0]{
    "title": coalesce(title[$locale], title.en, title),
    lastUpdated,
    "body": coalesce(body[$locale], body.en, body)
}
`)

export const FOOTER_LEGAL_PAGES_QUERY = defineQuery(`
    *[_type == "legalPage" && isPublished == true] | order(title asc) {
      "title": coalesce(title[$locale], title.en, title),
      "slug": slug.current,
      pageType
    }
  `)

export const HOME_PAGE_QUERY = defineQuery(`
  * [_type == "homePage"][0] {
    "heroTitle": coalesce(heroTitle[$locale], heroTitle.en, heroTitle),
    "heroSubtitle": coalesce(heroSubtitle[$locale], heroSubtitle.en, heroSubtitle),
    heroVideoUrl,
    "heroCtaText": coalesce(heroCtaText[$locale], heroCtaText.en, heroCtaText),
    heroCtaUrl,
    "heroSecondaryCtaText": coalesce(heroSecondaryCtaText[$locale], heroSecondaryCtaText.en, heroSecondaryCtaText),
    heroSecondaryCtaUrl,
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
    "differentiationEyebrow": coalesce(differentiationEyebrow[$locale], differentiationEyebrow.en, differentiationEyebrow),
    "differentiationTitle": coalesce(differentiationTitle[$locale], differentiationTitle.en, differentiationTitle),
    "differentiationSubtitle": coalesce(differentiationSubtitle[$locale], differentiationSubtitle.en, differentiationSubtitle),
    competitorFeatures,
    unionFeatures,
    "differentiationCtaText": coalesce(differentiationCtaText[$locale], differentiationCtaText.en, differentiationCtaText),
    differentiationCtaUrl,
    "nationwideBadge": coalesce(nationwideBadge[$locale], nationwideBadge.en, nationwideBadge),
    "nationwideTitle": coalesce(nationwideTitle[$locale], nationwideTitle.en, nationwideTitle),
    "nationwideSubtitle": coalesce(nationwideSubtitle[$locale], nationwideSubtitle.en, nationwideSubtitle),
    nationwideFeatures[]{
      icon,
      "title": coalesce(title[$locale], title.en, title),
      "description": coalesce(description[$locale], description.en, description)
    },
    "servicesEyebrow": coalesce(servicesEyebrow[$locale], servicesEyebrow.en, servicesEyebrow),
    "servicesTitle": coalesce(servicesTitle[$locale], servicesTitle.en, servicesTitle),
    "servicesSubtitle": coalesce(servicesSubtitle[$locale], servicesSubtitle.en, servicesSubtitle),
    "servicesButtonText": coalesce(servicesButtonText[$locale], servicesButtonText.en, servicesButtonText),
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
`)

export const VSL_PAGE_QUERY = defineQuery(`
    *[_type == "vslPage" && slug.current == $slug][0] {
      ...,
      "announcementText": coalesce(announcementText[$locale], announcementText.en, announcementText),
      "trustStats": trustStats[]{
        "value": coalesce(value[$locale], value.en, value),
        "label": coalesce(label[$locale], label.en, label)
      },
      "painPoints": painPoints[]{
        "text": coalesce(text[$locale], text.en, text)
      },
      "howItWorks": howItWorks[]{
        "title": coalesce(title[$locale], title.en, title),
        "description": coalesce(description[$locale], description.en, description),
        icon
      },
      "results": results[]{
        "value": coalesce(value[$locale], value.en, value),
        "label": coalesce(label[$locale], label.en, label)
      },
      "faqs": faqs[]{
        "question": coalesce(question[$locale], question.en, question),
        "answer": coalesce(answer[$locale], answer.en, answer)
      },
      "finalCtaHeadline": coalesce(finalCtaHeadline[$locale], finalCtaHeadline.en, finalCtaHeadline),
      "finalCtaSubtext": coalesce(finalCtaSubtext[$locale], finalCtaSubtext.en, finalCtaSubtext),
      "benefitsTitle": coalesce(benefitsTitle[$locale], benefitsTitle.en, benefitsTitle),
      "benefitsList": benefitsList[]{ "text": coalesce(@[$locale], @.en, @) }.text,
      "resultsTitle": coalesce(resultsTitle[$locale], resultsTitle.en, resultsTitle),
      "resultsList": resultsList[]{ "text": coalesce(@[$locale], @.en, @) }.text,
      "heroBadge": coalesce(heroBadge[$locale], heroBadge.en, heroBadge),
      "heroHeadline": coalesce(heroHeadline[$locale], heroHeadline.en, heroHeadline),
      "heroSubheadline": coalesce(heroSubheadline[$locale], heroSubheadline.en, heroSubheadline),
      "heroCtaText": coalesce(heroCtaText[$locale], heroCtaText.en, heroCtaText),
      "valuePropositions": valuePropositions[]{
        icon,
        "title": coalesce(title[$locale], title.en, title),
        "description": coalesce(description[$locale], description.en, description)
      },
      "testimonial": {
        "quote": coalesce(testimonial.quote[$locale], testimonial.quote.en, testimonial.quote),
        "name": coalesce(testimonial.name[$locale], testimonial.name.en, testimonial.name),
        "author": coalesce(testimonial.author[$locale], testimonial.author.en, testimonial.author),
        "role": coalesce(testimonial.role[$locale], testimonial.role.en, testimonial.role),
        "company": coalesce(testimonial.company[$locale], testimonial.company.en, testimonial.company),
        "rating": testimonial.rating,
        "industryBadge": coalesce(testimonial.industryBadge[$locale], testimonial.industryBadge.en, testimonial.industryBadge),
        "beforeAfterMetric": coalesce(testimonial.beforeAfterMetric[$locale], testimonial.beforeAfterMetric.en, testimonial.beforeAfterMetric),
        authorImage {
          asset-> {
            url
          }
        }
      },
      "ctaHeadline": coalesce(ctaHeadline[$locale], ctaHeadline.en, ctaHeadline),
      "ctaSubheadline": coalesce(ctaSubheadline[$locale], ctaSubheadline.en, ctaSubheadline),
      "ctaButtonText": coalesce(ctaButtonText[$locale], ctaButtonText.en, ctaButtonText),
      "urgencyText": coalesce(urgencyText[$locale], urgencyText.en, urgencyText),
      videoFile {
        asset-> {
          url
        }
      },
      videoPoster {
        asset-> {
          url
        }
      }
    }
  `)
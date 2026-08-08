import { defineQuery } from 'next-sanity'

export const SERVICES_QUERY = defineQuery(`*[_type == "service"] | order(isPopular desc) {
  _id,
  "title": coalesce(title[$locale], title.en, title),
  slug,
  "shortDescription": coalesce(shortDescription[$locale], shortDescription.en, shortDescription),
  icon,
  "features": features[]{ "text": coalesce(@[$locale], @.en, @) }.text,
  "trustSignals": trustSignals[]{ "text": coalesce(@[$locale], @.en, @) }.text,
  "impactGoal": coalesce(impactGoal[$locale], impactGoal.en, impactGoal),
  category,
  "startingPrice": coalesce(startingPrice[$locale], startingPrice.en, startingPrice),
  isPopular,
  accentColor,
  "targetKeyword": coalesce(targetKeyword[$locale], targetKeyword.en, targetKeyword),
  "targetAudience": coalesce(targetAudience[$locale], targetAudience.en, targetAudience),
  "keyBenefit": coalesce(keyBenefit[$locale], keyBenefit.en, keyBenefit),
  "eligibilityPros": eligibilityPros[]{ "text": coalesce(@[$locale], @.en, @) }.text,
  "faq": faq[]{
    "question": coalesce(question[$locale], question.en, question),
    "answer": coalesce(answer[$locale], answer.en, answer)
  },
  "schema_faq": schema_faq[]{
    "question": coalesce(question[$locale], question.en, question),
    "answer": coalesce(answer[$locale], answer.en, answer)
  }
}`)

export const SERVICE_QUERY = defineQuery(`*[_type == "service" && slug.current == $slug][0] {
  _id,
  "title": coalesce(title[$locale], title.en, title),
  slug,
  "shortDescription": coalesce(shortDescription[$locale], shortDescription.en, shortDescription),
  "fullDescription": coalesce(fullDescription[$locale], fullDescription.en, fullDescription),
  "heroHeadline": coalesce(heroHeadline[$locale], heroHeadline.en, heroHeadline),
  "heroHighlight": coalesce(heroHighlight[$locale], heroHighlight.en, heroHighlight),
  heroCta {
    "label": coalesce(label[$locale], label.en, label),
    href
  },
  heroSecondaryCta {
    "label": coalesce(label[$locale], label.en, label),
    anchorTarget
  },
  "heroTrustStats": heroTrustStats[]{
    "value": coalesce(value[$locale], value.en, value),
    "label": coalesce(label[$locale], label.en, label)
  },
  "heroMicrocopy": coalesce(heroMicrocopy[$locale], heroMicrocopy.en, heroMicrocopy),
  heroVisual {
    type,
    image,
    "dashboardEyebrow": coalesce(dashboardEyebrow[$locale], dashboardEyebrow.en, dashboardEyebrow),
    "dashboardTitle": coalesce(dashboardTitle[$locale], dashboardTitle.en, dashboardTitle),
    "dashboardStatus": coalesce(dashboardStatus[$locale], dashboardStatus.en, dashboardStatus),
    "dashboardMetrics": dashboardMetrics[]{
      "label": coalesce(label[$locale], label.en, label),
      "value": coalesce(value[$locale], value.en, value),
      emphasized
    }
  },
  icon,
  "features": features[]{ "text": coalesce(@[$locale], @.en, @) }.text,
  "roadmap": roadmap[]{
    "title": coalesce(title[$locale], title.en, title),
    "duration": coalesce(duration[$locale], duration.en, duration),
    "description": coalesce(description[$locale], description.en, description)
  },
  pageSections {
    eligibility {
      "eyebrow": coalesce(eyebrow[$locale], eyebrow.en, eyebrow),
      "heading": coalesce(heading[$locale], heading.en, heading),
      "description": coalesce(description[$locale], description.en, description)
    },
    comparison {
      "eyebrow": coalesce(eyebrow[$locale], eyebrow.en, eyebrow),
      "heading": coalesce(heading[$locale], heading.en, heading),
      "description": coalesce(description[$locale], description.en, description),
      "withoutLabel": coalesce(withoutLabel[$locale], withoutLabel.en, withoutLabel),
      "withLabel": coalesce(withLabel[$locale], withLabel.en, withLabel),
      "pairs": pairs[]{
        "problem": coalesce(problem[$locale], problem.en, problem),
        "solution": coalesce(solution[$locale], solution.en, solution)
      }
    },
    process {
      "eyebrow": coalesce(eyebrow[$locale], eyebrow.en, eyebrow),
      "heading": coalesce(heading[$locale], heading.en, heading),
      "description": coalesce(description[$locale], description.en, description)
    },
    included {
      "eyebrow": coalesce(eyebrow[$locale], eyebrow.en, eyebrow),
      "heading": coalesce(heading[$locale], heading.en, heading),
      "description": coalesce(description[$locale], description.en, description)
    },
    pricing {
      "headline": coalesce(headline[$locale], headline.en, headline),
      "detail": coalesce(detail[$locale], detail.en, detail)
    },
    video {
      "eyebrow": coalesce(eyebrow[$locale], eyebrow.en, eyebrow),
      "heading": coalesce(heading[$locale], heading.en, heading)
    },
    proof {
      "eyebrow": coalesce(eyebrow[$locale], eyebrow.en, eyebrow),
      "heading": coalesce(heading[$locale], heading.en, heading),
      "quote": coalesce(quote[$locale], quote.en, quote),
      "attribution": coalesce(attribution[$locale], attribution.en, attribution),
      "linkLabel": coalesce(linkLabel[$locale], linkLabel.en, linkLabel),
      href
    },
    faq {
      "eyebrow": coalesce(eyebrow[$locale], eyebrow.en, eyebrow),
      "heading": coalesce(heading[$locale], heading.en, heading)
    },
    closing {
      "heading": coalesce(heading[$locale], heading.en, heading),
      "description": coalesce(description[$locale], description.en, description),
      "label": coalesce(label[$locale], label.en, label),
      href
    }
  },
  "trustSignals": trustSignals[]{ "text": coalesce(@[$locale], @.en, @) }.text,
  "impactGoal": coalesce(impactGoal[$locale], impactGoal.en, impactGoal),
  category,
  "startingPrice": coalesce(startingPrice[$locale], startingPrice.en, startingPrice),
  isPopular,
  accentColor,
  "targetKeyword": coalesce(targetKeyword[$locale], targetKeyword.en, targetKeyword),
  "targetAudience": coalesce(targetAudience[$locale], targetAudience.en, targetAudience),
  "keyBenefit": coalesce(keyBenefit[$locale], keyBenefit.en, keyBenefit),
  "eligibilityPros": eligibilityPros[]{ "text": coalesce(@[$locale], @.en, @) }.text,
  "faq": faq[]{
    "question": coalesce(question[$locale], question.en, question),
    "answer": coalesce(answer[$locale], answer.en, answer)
  },
  strategyVideoUrl,
  "videoFileUrl": videoFile.asset->url,
  videoThumbnail {
    asset->,
    "alt": coalesce(alt[$locale], alt.en, alt)
  },
  "schema_faq": schema_faq[]{
    "question": coalesce(question[$locale], question.en, question),
    "answer": coalesce(answer[$locale], answer.en, answer)
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
}`)

export const SERVICE_PAGE_QUERY = defineQuery(`*[_type == "servicePage" && slug.current == $slug][0] {
  _id,
  "title": coalesce(title[$locale], title.en, title),
  slug,
  canonicalPath,
  accentColor,
  "service": service->{_id, "catalogSlug": slug.current},
  hero {
    "eyebrow": coalesce(eyebrow[$locale], eyebrow.en, eyebrow),
    "headline": coalesce(headline[$locale], headline.en, headline),
    "highlight": coalesce(highlight[$locale], highlight.en, highlight),
    "subheadline": coalesce(subheadline[$locale], subheadline.en, subheadline),
    primaryCta { "label": coalesce(label[$locale], label.en, label), href },
    secondaryCta { "label": coalesce(label[$locale], label.en, label), href },
    "trustItems": trustItems[]{
      "value": coalesce(value[$locale], value.en, value),
      "label": coalesce(label[$locale], label.en, label)
    },
    "microcopy": coalesce(microcopy[$locale], microcopy.en, microcopy),
    visual {
      type,
      image,
      "imageAlt": coalesce(image.alt[$locale], image.alt.en, image.alt),
      "videoUrl": videoFile.asset->url,
      "videoMimeType": videoFile.asset->mimeType,
      videoPoster,
      "videoPosterAlt": coalesce(videoPoster.alt[$locale], videoPoster.alt.en, videoPoster.alt),
      "videoLabel": coalesce(videoLabel[$locale], videoLabel.en, videoLabel),
      "dashboardEyebrow": coalesce(dashboardEyebrow[$locale], dashboardEyebrow.en, dashboardEyebrow),
      "dashboardTitle": coalesce(dashboardTitle[$locale], dashboardTitle.en, dashboardTitle),
      "dashboardStatus": coalesce(dashboardStatus[$locale], dashboardStatus.en, dashboardStatus),
      "dashboardMetrics": dashboardMetrics[]{
        "label": coalesce(label[$locale], label.en, label),
        "value": coalesce(value[$locale], value.en, value),
        emphasized
      }
    }
  },
  eligibility {
    "eyebrow": coalesce(eyebrow[$locale], eyebrow.en, eyebrow),
    "heading": coalesce(heading[$locale], heading.en, heading),
    "description": coalesce(description[$locale], description.en, description),
    "badge": coalesce(badge[$locale], badge.en, badge),
    "items": items[]{"value": coalesce(@[$locale], @.en, @)}.value,
    primaryGroup {
      "heading": coalesce(heading[$locale], heading.en, heading),
      "items": items[]{"value": coalesce(@[$locale], @.en, @)}.value
    },
    secondaryGroup {
      "heading": coalesce(heading[$locale], heading.en, heading),
      "items": items[]{"value": coalesce(@[$locale], @.en, @)}.value
    },
    "disqualifierHeading": coalesce(disqualifierHeading[$locale], disqualifierHeading.en, disqualifierHeading),
    "disqualifier": coalesce(disqualifier[$locale], disqualifier.en, disqualifier),
    cta {
      "label": coalesce(label[$locale], label.en, label),
      href,
      "microcopy": coalesce(microcopy[$locale], microcopy.en, microcopy)
    }
  },
  comparison {
    "eyebrow": coalesce(eyebrow[$locale], eyebrow.en, eyebrow),
    "heading": coalesce(heading[$locale], heading.en, heading),
    "description": coalesce(description[$locale], description.en, description),
    "withoutLabel": coalesce(withoutLabel[$locale], withoutLabel.en, withoutLabel),
    "withLabel": coalesce(withLabel[$locale], withLabel.en, withLabel),
    "pairs": pairs[]{
      "category": coalesce(category[$locale], category.en, category),
      "problem": coalesce(problem[$locale], problem.en, problem),
      "solution": coalesce(solution[$locale], solution.en, solution),
      "outcome": coalesce(outcome[$locale], outcome.en, outcome)
    },
    "conclusion": coalesce(conclusion[$locale], conclusion.en, conclusion),
    "linkLabel": coalesce(linkLabel[$locale], linkLabel.en, linkLabel),
    href
  },
  process {
    "eyebrow": coalesce(eyebrow[$locale], eyebrow.en, eyebrow),
    "heading": coalesce(heading[$locale], heading.en, heading),
    "description": coalesce(description[$locale], description.en, description),
    "steps": steps[]{
      "title": coalesce(title[$locale], title.en, title),
      "duration": coalesce(duration[$locale], duration.en, duration),
      "description": coalesce(description[$locale], description.en, description)
    }
  },
  included {
    "eyebrow": coalesce(eyebrow[$locale], eyebrow.en, eyebrow),
    "heading": coalesce(heading[$locale], heading.en, heading),
    "description": coalesce(description[$locale], description.en, description),
    "items": items[]{"value": coalesce(@[$locale], @.en, @)}.value,
    pricing {
      "headline": coalesce(headline[$locale], headline.en, headline),
      "detail": coalesce(detail[$locale], detail.en, detail)
    }
  },
  video {
    "eyebrow": coalesce(eyebrow[$locale], eyebrow.en, eyebrow),
    "heading": coalesce(heading[$locale], heading.en, heading),
    "description": coalesce(description[$locale], description.en, description),
    url,
    poster,
    "posterAlt": coalesce(poster.alt[$locale], poster.alt.en, poster.alt),
    captionsUrl,
    "caption": coalesce(caption[$locale], caption.en, caption)
  },
  proof {
    "eyebrow": coalesce(eyebrow[$locale], eyebrow.en, eyebrow),
    "heading": coalesce(heading[$locale], heading.en, heading),
    "quote": coalesce(quote[$locale], quote.en, quote),
    "attribution": coalesce(attribution[$locale], attribution.en, attribution),
    "linkLabel": coalesce(linkLabel[$locale], linkLabel.en, linkLabel),
    href
  },
  faqSection {
    "eyebrow": coalesce(eyebrow[$locale], eyebrow.en, eyebrow),
    "heading": coalesce(heading[$locale], heading.en, heading),
    "items": items[]{
      "question": coalesce(question[$locale], question.en, question),
      "answer": coalesce(answer[$locale], answer.en, answer)
    }
  },
  closing {
    "heading": coalesce(heading[$locale], heading.en, heading),
    "description": coalesce(description[$locale], description.en, description),
    "label": coalesce(label[$locale], label.en, label),
    href
  },
  seo {
    "metaTitle": coalesce(metaTitle[$locale], metaTitle.en, metaTitle),
    "metaDescription": coalesce(metaDescription[$locale], metaDescription.en, metaDescription),
    openGraphImage,
    "keywords": keywords[]{"value": coalesce(@[$locale], @.en, @)}.value,
    canonicalUrl,
    noIndex,
    structuredDataType
  }
}`)

export const SERVICE_PAGE_SLUGS_QUERY = defineQuery(`*[_type == "servicePage" && defined(slug.current)]{slug}`)

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
      "alt": coalesce(alt[$locale], alt.en, alt)
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

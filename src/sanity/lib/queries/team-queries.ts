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
`)

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
`)

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
`)

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
    founderImage {
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
    }
  }
`)

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
`)
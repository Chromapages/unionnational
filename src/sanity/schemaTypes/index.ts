import { type SchemaTypeDefinition } from 'sanity'
import { teamMember } from './teamMember'
import { teamPage } from './teamPage'
import { blogPost } from './blogPost'
import { blogCategory } from './blogCategory'
import { blogSettings } from './blogSettings'
import { service } from './service'
import { product } from './product'
import { shopSettings } from './shopSettings'
import { siteSettings } from './siteSettings'
import { testimonial } from './testimonial'
import { faq } from './faq'
import { homePage } from './homePage'
import { aboutPage } from './aboutPage'
import { contactSettings } from './contactSettings'
import { servicesPage } from './servicesPage'
import { caseStudy } from './caseStudy'
import { pricingTier } from './pricingTier'
import { legalPage } from './legalPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    teamMember,
    teamPage,
    blogPost,
    blogCategory,
    blogSettings,
    service,
    product,
    shopSettings,
    siteSettings,
    testimonial,
    faq,
    homePage,
    aboutPage,
    contactSettings,
    servicesPage,
    caseStudy,
    pricingTier,
    legalPage
  ],
}

import { evaluate, parse } from 'groq-js'
import { describe, expect, it, vi } from 'vitest'

vi.mock('next-sanity', () => ({ defineQuery: (query: string) => query }))
import { PRICING_PAGE_QUERY, PRICING_TIERS_QUERY, SERVICES_QUERY, SERVICE_QUERY, SERVICE_PAGE_QUERY } from './service-queries'

const reference = (_ref: string) => ({ _type: 'reference', _ref })
const dataset = [
    { _id: 'service-fixture', _type: 'service', title: { en: 'Payroll', es: 'Nómina' }, slug: { current: 'payroll-services' }, pricingOffers: [reference('offer-fixture')] },
    { _id: 'offer-fixture', _type: 'pricingTier', name: { en: 'Payroll', es: 'Nómina' }, slug: { current: 'payroll' }, price: { en: 'From $250', es: 'Desde $250' }, priceNote: { en: 'Up to 10 employees; setup fee applies.' }, billingPeriod: 'monthly', category: 'optional', displayOrder: 2, features: [{ en: 'Payroll filings', es: 'Declaraciones de nómina' }], relatedService: reference('service-fixture') },
    { _id: 'legacy-fixture', _type: 'pricingTier', name: 'Legacy', price: 'Custom quote', priceNote: 'Quoted before work', category: 'optional', displayOrder: 1 },
    { _id: 'pricing-page-fixture', _type: 'pricingPage', hero: { heading: { en: 'Services', es: 'Servicios' }, description: { en: 'Find your service' } }, offers: [reference('offer-fixture'), reference('legacy-fixture'), reference('missing-fixture')], faq: { heading: { en: 'Questions' }, items: [{ question: { en: 'Setup?', es: '¿Configuración?' }, answer: { en: 'Fee quoted separately.' } }] }, closing: { heading: 'Talk with us', label: { en: 'Book a call' }, href: '/book' }, seo: { metaTitle: { en: 'Pricing', es: 'Precios' } } },
    { _id: 'service-page-fixture', _type: 'servicePage', slug: { current: 'payroll-services' }, included: { pricingOffers: [reference('offer-fixture')] } },
]

async function query(queryText: string, locale = 'es') {
    const params = { locale, slug: 'payroll-services' }
    return (await evaluate(parse(queryText, { params }), { dataset, params })).get()
}

describe('shared CMS pricing projections', () => {
    it('preserves the pricing page reference order, FAQ meaning and requested-locale to English to legacy fallbacks', async () => {
        const page = await query(PRICING_PAGE_QUERY)
        expect(page._id).toBe('pricing-page-fixture')
        expect(page.hero).toEqual({ heading: 'Servicios', description: 'Find your service' })
        expect(page.offers.map((offer: { _id: string } | null) => offer?._id)).toEqual(['offer-fixture', 'legacy-fixture', undefined])
        expect(page.offers[0]).toMatchObject({ name: 'Nómina', price: 'Desde $250', priceNote: 'Up to 10 employees; setup fee applies.', billingPeriod: 'monthly', displayOrder: 2, features: ['Declaraciones de nómina'], relatedService: { _id: 'service-fixture', title: 'Nómina' } })
        expect(page.offers[1]).toMatchObject({ price: 'Custom quote', priceNote: 'Quoted before work' })
        expect(page.faq.items[0]).toEqual({ question: '¿Configuración?', answer: 'Fee quoted separately.' })
        expect(page.closing).toMatchObject({ heading: 'Talk with us', label: 'Book a call', href: '/book' })
        expect(page.seo.metaTitle).toBe('Precios')
    })

    it('projects display order and notes when selecting all offers', async () => {
        const offers = await query(PRICING_TIERS_QUERY, 'en')
        expect(offers.map((offer: { _id: string }) => offer._id)).toEqual(['legacy-fixture', 'offer-fixture'])
        expect(offers[1]).toMatchObject({ price: 'From $250', priceNote: 'Up to 10 employees; setup fee applies.', displayOrder: 2 })
    })

    it('dereferences an explicitly selected IRS review without requiring a nonexistent catalog service', async () => {
        const params = { locale: 'es' }
        const irsReview = { _id: 'irs-review-fixture', _type: 'pricingTier', name: { en: 'IRS case review', es: 'Revisión del IRS' }, price: { en: '$750', es: '$750' }, priceNote: { en: 'Credited toward resolution.' }, category: 'optional', billingPeriod: 'one-time' }
        const withSelection = [...dataset.map(document => document._type === 'pricingPage' ? { ...document, offers: [reference(irsReview._id)], irsReviewOffer: reference(irsReview._id) } : document), irsReview]
        const page = await (await evaluate(parse(PRICING_PAGE_QUERY, { params }), { dataset: withSelection, params })).get()
        expect(page.irsReviewOffer).toMatchObject({ _id: irsReview._id, name: 'Revisión del IRS', price: '$750', priceNote: 'Credited toward resolution.', relatedService: null })
        expect(page.offers[0]._id).toBe(page.irsReviewOffer._id)
    })

    it.each([SERVICE_QUERY, SERVICE_PAGE_QUERY, SERVICES_QUERY])('shares the same dereferenced offer projection on service consumers', async queryText => {
        const result = await query(queryText)
        const service = Array.isArray(result) ? result[0] : result
        const offers = service.included?.pricingOffers ?? service.pricingOffers
        expect(offers[0]).toMatchObject({ _id: 'offer-fixture', price: 'Desde $250', priceNote: 'Up to 10 employees; setup fee applies.', relatedService: { _id: 'service-fixture' } })
    })

    it('returns no page when the type is absent instead of inventing a CMS identity', async () => {
        const params = { locale: 'en' }
        const page = await (await evaluate(parse(PRICING_PAGE_QUERY, { params }), { dataset: [], params })).get()
        expect(page).toBeNull()
    })

    it('returns no page when multiple records would make singleton selection ambiguous', async () => {
        const params = { locale: 'en' }
        const duplicate = { ...dataset.find(document => document._type === 'pricingPage'), _id: 'duplicate-page-fixture' }
        const page = await (await evaluate(parse(PRICING_PAGE_QUERY, { params }), { dataset: [...dataset, duplicate], params })).get()
        expect(page).toBeNull()
    })
})

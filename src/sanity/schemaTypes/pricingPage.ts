import { defineField, defineType } from 'sanity'

export const pricingPage = defineType({
    name: 'pricingPage',
    title: 'Pricing Page',
    type: 'document',
    description: 'Maintain one pricing page. Offer references select and order existing pricing records without duplicating their prices.',
    validation: (Rule) => Rule.custom(async (document, context) => {
        if (!document?._id) return true
        const id = document._id.replace(/^drafts\./, '')
        try {
            const duplicates = await context.getClient({ apiVersion: '2026-01-09' }).withConfig({ useCdn: false, perspective: 'raw' }).fetch<number>(
                'count(*[_type == "pricingPage" && !(_id in [$id, $draftId]) && !(_id in path("versions.**"))])',
                { id, draftId: `drafts.${id}` },
            )
            return duplicates === 0 || 'A pricing page already exists. Edit that record instead of publishing a duplicate.'
        } catch {
            return 'Cannot verify that this is the only pricing page. Retry before publishing.'
        }
    }),
    fields: [
        defineField({
            name: 'hero', title: 'Hero', type: 'object',
            fields: [
                defineField({ name: 'heading', title: 'Heading', type: 'localizedString' }),
                defineField({ name: 'description', title: 'Description', type: 'localizedText' }),
            ],
        }),
        defineField({
            name: 'offers', title: 'Ordered Offers', type: 'array',
            of: [{ type: 'reference', to: [{ type: 'pricingTier' }] }],
            validation: (Rule) => Rule.unique(),
        }),
        defineField({
            name: 'irsReviewOffer', title: 'IRS Case Review Offer', type: 'reference',
            to: [{ type: 'pricingTier' }],
            description: 'Select the same IRS case review offer included in Ordered Offers. The IRS route has no catalog service record; this reference connects its existing local content to shared pricing.',
        }),
        defineField({
            name: 'faq', title: 'FAQs', type: 'object',
            fields: [
                defineField({ name: 'heading', title: 'Heading', type: 'localizedString' }),
                defineField({
                    name: 'items', title: 'Questions', type: 'array',
                    of: [{ type: 'object', fields: [
                        defineField({ name: 'question', title: 'Question', type: 'localizedString' }),
                        defineField({ name: 'answer', title: 'Answer', type: 'localizedText' }),
                    ], preview: { select: { title: 'question.en' } } }],
                }),
            ],
        }),
        defineField({
            name: 'closing', title: 'Closing CTA', type: 'object',
            fields: [
                defineField({ name: 'heading', title: 'Heading', type: 'localizedString' }),
                defineField({ name: 'description', title: 'Description', type: 'localizedText' }),
                defineField({ name: 'label', title: 'Button Label', type: 'localizedString' }),
                defineField({ name: 'href', title: 'Button Destination', type: 'string' }),
            ],
        }),
        defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
    ],
    preview: { select: { title: 'hero.heading.en' }, prepare: ({ title }) => ({ title: title || 'Pricing Page' }) },
})

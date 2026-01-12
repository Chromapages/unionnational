import { defineField, defineType } from 'sanity'

export const pricingTier = defineType({
    name: 'pricingTier',
    title: 'Pricing Tier',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Plan Name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'tagline',
            title: 'Tagline/Subtitle',
            type: 'string',
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'string',
        }),
        defineField({
            name: 'billingPeriod',
            title: 'Billing Period',
            type: 'string',
            options: {
                list: ['monthly', 'quarterly', 'annually', 'one-time'],
            },
        }),
        defineField({
            name: 'features',
            title: 'Features List',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'isFeatured',
            title: 'Featured (Best Value)',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'displayOrder',
            title: 'Display Order',
            type: 'number',
        }),
        defineField({
            name: 'ctaText',
            title: 'CTA Text',
            type: 'string',
            initialValue: 'Get Started',
        }),
        defineField({
            name: 'ctaUrl',
            title: 'CTA URL',
            type: 'string',
        }),
        defineField({
            name: 'relatedService',
            title: 'Related Service',
            type: 'reference',
            to: [{ type: 'service' }],
        }),
    ],
})

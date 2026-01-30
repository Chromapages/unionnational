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
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Advisory Level (Cards)', value: 'advisory' },
                    { title: 'Individual Tax (Table)', value: 'individual' },
                    { title: 'Business Tax (Table)', value: 'business' },
                    { title: 'Optional Services', value: 'optional' },
                ],
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'bestFor',
            title: 'Best For (Table Column)',
            type: 'string',
            description: 'Short description of who this plan is for (e.g., "W-2 / 1099 Filers")',
        }),
        defineField({
            name: 'includes',
            title: 'Included Items (Table Column)',
            type: 'text',
            rows: 3,
            description: 'List of specific items included (used for the comparison table)',
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

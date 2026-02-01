import { defineField, defineType } from 'sanity'

export const pricingTier = defineType({
    name: 'pricingTier',
    title: 'Pricing Tier',
    type: 'document',
    groups: [
        { name: 'content', title: 'Content' },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        defineField({
            name: 'name',
            title: 'Plan Name',
            type: 'string',
            group: 'content',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            group: 'content',
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
            group: 'content',
            description: 'Short description of who this plan is for (e.g., "W-2 / 1099 Filers")',
        }),
        defineField({
            name: 'includes',
            title: 'Included Items (Table Column)',
            type: 'text',
            rows: 3,
            group: 'content',
            description: 'List of specific items included (used for the comparison table)',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            group: 'content',
            options: {
                source: 'name',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'tagline',
            title: 'Tagline/Subtitle',
            type: 'string',
            group: 'content',
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'string',
            group: 'content',
        }),
        defineField({
            name: 'billingPeriod',
            title: 'Billing Period',
            type: 'string',
            group: 'content',
            options: {
                list: ['monthly', 'quarterly', 'annually', 'one-time'],
            },
        }),
        defineField({
            name: 'features',
            title: 'Features List',
            type: 'array',
            of: [{ type: 'string' }],
            group: 'content',
        }),
        defineField({
            name: 'isFeatured',
            title: 'Featured (Best Value)',
            type: 'boolean',
            group: 'content',
            initialValue: false,
        }),
        defineField({
            name: 'displayOrder',
            title: 'Display Order',
            type: 'number',
            group: 'content',
        }),
        defineField({
            name: 'ctaText',
            title: 'CTA Text',
            type: 'string',
            group: 'content',
            initialValue: 'Get Started',
        }),
        defineField({
            name: 'ctaUrl',
            title: 'CTA URL',
            type: 'string',
            group: 'content',
        }),
        defineField({
            name: 'relatedService',
            title: 'Related Service',
            type: 'reference',
            group: 'content',
            to: [{ type: 'service' }],
        }),
        defineField({
            name: "seo",
            title: "SEO Overrides",
            type: "seo",
            group: "seo",
        }),
    ],
})

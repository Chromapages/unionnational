import { defineType, defineField } from 'sanity'
import { GitCompare } from 'lucide-react'

export const comparisonTable = defineType({
    name: 'comparisonTable',
    title: 'Comparison Table',
    type: 'document',
    icon: GitCompare,
    groups: [
        { name: 'content', title: 'Content' },
        { name: 'design', title: 'Design' },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'localizedString',
            group: 'content',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'localizedText',
            group: 'content',
            description: 'Optional subtitle below the title',
        }),
        defineField({
            name: 'comparisonType',
            title: 'Comparison Type',
            type: 'string',
            group: 'content',
            options: {
                list: [
                    { title: 'General', value: 'general' },
                    { title: 'vs Tax Relief Giants', value: 'taxRelief' },
                    { title: 'vs Local Generalist CPA', value: 'generalist' },
                    { title: 'Industry Specific', value: 'industry' },
                ],
            },
            initialValue: 'general',
        }),
        defineField({
            name: 'industry',
            title: 'Industry (if industry-specific)',
            type: 'string',
            group: 'content',
            description: 'e.g., HVAC, Restaurant, Construction',
        }),
        defineField({
            name: 'showUnionNational',
            title: 'Show Union National Column',
            type: 'boolean',
            group: 'content',
            initialValue: true,
        }),
        defineField({
            name: 'unionNationalLabel',
            title: 'Union National Label',
            type: 'string',
            group: 'content',
            initialValue: 'Union National Tax',
        }),
        defineField({
            name: 'competitors',
            title: 'Competitors',
            type: 'array',
            group: 'content',
            of: [{ type: 'string' }],
            description: 'List of competitor names to compare against',
            validation: (Rule) => Rule.min(1).max(3),
        }),
        defineField({
            name: 'features',
            title: 'Comparison Features',
            type: 'array',
            group: 'content',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'featureName',
                            title: 'Feature Name',
                            type: 'localizedString',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'unionValue',
                            title: 'Union National Value',
                            type: 'localizedString',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'unionHighlight',
                            title: 'Highlight Union Value',
                            type: 'boolean',
                            initialValue: false,
                        }),
                        defineField({
                            name: 'competitorValues',
                            title: 'Competitor Values',
                            type: 'array',
                            of: [{ type: 'string' }],
                            description: 'Values for each competitor (in same order as competitors list)',
                        }),
                        defineField({
                            name: 'isCheckmark',
                            title: 'Use Checkmarks/X instead of text',
                            type: 'boolean',
                            initialValue: false,
                        }),
                        defineField({
                            name: 'icon',
                            title: 'Icon',
                            type: 'string',
                            description: 'Optional icon name (e.g., check, x, star)',
                        }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'cta',
            title: 'Call to Action',
            type: 'object',
            group: 'content',
            fields: [
                { name: 'text', title: 'Button Text', type: 'localizedString' },
                { name: 'url', title: 'Button URL', type: 'string' },
            ],
        }),
        defineField({
            name: 'badge',
            title: 'Badge Text',
            type: 'string',
            group: 'design',
            description: 'e.g., "Recommended", "Most Popular"',
        }),
        defineField({
            name: 'isActive',
            title: 'Active',
            type: 'boolean',
            group: 'content',
            initialValue: true,
        }),
        defineField({
            name: 'displayOrder',
            title: 'Display Order',
            type: 'number',
            group: 'content',
            initialValue: 0,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'comparisonType',
        },
        prepare(selection) {
            const { title, subtitle } = selection
            return {
                ...selection,
                title: title?.en || 'Untitled Comparison',
                subtitle: subtitle ? `Type: ${subtitle}` : '',
            }
        },
    },
    orderings: [
        {
            title: 'Display Order',
            name: 'displayOrderAsc',
            by: [{ field: 'displayOrder', direction: 'asc' }],
        },
    ],
})

import { defineField, defineType } from 'sanity'
import { FileText } from 'lucide-react'

export const teamPage = defineType({
    name: 'teamPage',
    title: 'Team Page Settings',
    type: 'document',
    // @ts-ignore
    icon: FileText,
    fields: [
        defineField({
            name: 'heroBadge',
            title: 'Hero Badge Text',
            type: 'string',
            initialValue: 'Our People',
            group: 'hero',
        }),
        defineField({
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'string',
            initialValue: 'The experts behind your strategy.',
            group: 'hero',
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'text',
            rows: 3,
            group: 'hero',
        }),
        defineField({
            name: 'founderSectionTitle',
            title: 'Founder Section Title',
            type: 'string',
            initialValue: 'Founder & Director',
            group: 'founder',
        }),
        defineField({
            name: 'teamSectionTitle',
            title: 'Team Section Title',
            type: 'string',
            initialValue: 'Our Team',
            group: 'team',
        }),
        defineField({
            name: 'teamSectionSubtitle',
            title: 'Team Section Subtitle',
            type: 'string',
            initialValue: 'Dedicated professionals managing your accounts.',
            group: 'team',
        }),
        defineField({
            name: 'hiringBadge',
            title: 'Hiring Badge Text',
            type: 'string',
            initialValue: 'Join the team',
            group: 'hiring',
        }),
        defineField({
            name: 'hiringTitle',
            title: 'Hiring Title',
            type: 'string',
            initialValue: "Obsessed with details? We're hiring.",
            group: 'hiring',
        }),
        defineField({
            name: 'hiringDescription',
            title: 'Hiring Description',
            type: 'text',
            rows: 4,
            group: 'hiring',
        }),
        defineField({
            name: 'hiringBenefits',
            title: 'Hiring Benefits',
            type: 'array',
            of: [{ type: 'string' }],
            group: 'hiring',
        }),
        defineField({
            name: 'hiringCtaText',
            title: 'Hiring CTA Text',
            type: 'string',
            initialValue: 'View Open Positions',
            group: 'hiring',
        }),
        defineField({
            name: 'hiringCtaUrl',
            title: 'Hiring CTA URL',
            type: 'url',
            group: 'hiring',
        }),
        defineField({
            name: 'hiringImage',
            title: 'Hiring Section Image',
            type: 'image',
            options: { hotspot: true },
            group: 'hiring',
        }),
    ],
    groups: [
        { name: 'hero', title: 'Hero Section' },
        { name: 'founder', title: 'Founder Section' },
        { name: 'team', title: 'Team Grid' },
        { name: 'hiring', title: 'Hiring / Culture' },
    ],
    preview: {
        select: {
            title: 'heroTitle',
        },
        prepare({ title }) {
            return {
                title: 'Team Page Settings',
                subtitle: title,
            }
        },
    },
})

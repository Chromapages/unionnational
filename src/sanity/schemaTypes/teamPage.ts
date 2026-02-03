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
            type: 'localizedString',
            initialValue: { en: 'Our People' },
            group: 'hero',
        }),
        defineField({
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'localizedString',
            initialValue: { en: 'The experts behind your strategy.' },
            group: 'hero',
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'localizedText',
            group: 'hero',
        }),
        defineField({
            name: 'founderSectionTitle',
            title: 'Founder Section Title',
            type: 'localizedString',
            initialValue: { en: 'Founder & Director' },
            group: 'founder',
        }),
        defineField({
            name: 'teamSectionTitle',
            title: 'Team Section Title',
            type: 'localizedString',
            initialValue: { en: 'Our Team' },
            group: 'team',
        }),
        defineField({
            name: 'teamSectionSubtitle',
            title: 'Team Section Subtitle',
            type: 'localizedString',
            initialValue: { en: 'Dedicated professionals managing your accounts.' },
            group: 'team',
        }),
        defineField({
            name: 'values',
            title: 'Values',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'title', type: 'localizedString', title: 'Title' }),
                        defineField({ name: 'description', type: 'localizedText', title: 'Description' }),
                        defineField({ name: 'iconName', type: 'string', title: 'Lucide Icon Name' }),
                    ],
                },
            ],
            group: 'values',
        }),
        defineField({
            name: 'hiringBadge',
            title: 'Hiring Badge Text',
            type: 'localizedString',
            initialValue: { en: 'Join the team' },
            group: 'hiring',
        }),
        defineField({
            name: 'hiringTitle',
            title: 'Hiring Title',
            type: 'localizedString',
            initialValue: { en: "Obsessed with details? We're hiring." },
            group: 'hiring',
        }),
        defineField({
            name: 'hiringDescription',
            title: 'Hiring Description',
            type: 'localizedText',
            group: 'hiring',
        }),
        defineField({
            name: 'hiringBenefits',
            title: 'Hiring Benefits',
            type: 'array',
            of: [{ type: 'localizedString' }],
            group: 'hiring',
        }),
        defineField({
            name: 'hiringCtaText',
            title: 'Hiring CTA Text',
            type: 'localizedString',
            initialValue: { en: 'View Open Positions' },
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
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'seo',
            group: 'seo',
        }),
        defineField({
            name: "ctaTitle",
            title: "Bottom CTA Title",
            type: "localizedString",
            group: "hiring",
            initialValue: { en: "Ready to join the standard of excellence?" },
        }),
        defineField({
            name: "ctaSubtitle",
            title: "Bottom CTA Subtitle",
            type: "localizedText",
            group: "hiring",
        }),
        defineField({
            name: "ctaButtonText",
            title: "Button Text",
            type: "localizedString",
            group: "hiring",
            initialValue: { en: "Contact Us" },
        }),
        defineField({
            name: "ctaButtonUrl",
            title: "Button URL",
            type: "url",
            validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ["https", "http", "mailto", "tel"] }),
            group: "hiring",
        }),
        defineField({
            name: "ctaBackgroundImage",
            title: "CTA Section Background",
            type: "image",
            group: "hiring",
            options: { hotspot: true },
            fields: [
                {
                    name: "alt",
                    title: "Alternative Text",
                    type: "string",
                },
            ],
        }),
    ],
    groups: [
        { name: 'hero', title: 'Hero Section' },
        { name: 'founder', title: 'Founder Section' },
        { name: 'team', title: 'Team Grid' },
        { name: 'values', title: 'Values' },
        { name: 'hiring', title: 'Hiring / Culture' },
        { name: 'seo', title: 'SEO' },
    ],
    preview: {
        select: {
            title: 'heroTitle',
        },
        prepare({ title }) {
            return {
                title: 'Team Page Settings',
                subtitle: title?.en || 'No title set',
            }
        },
    },
})

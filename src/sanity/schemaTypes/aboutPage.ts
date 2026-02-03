import { defineField, defineType } from 'sanity'
import { Store, User, Award, List } from 'lucide-react'

export const aboutPage = defineType({
    name: 'aboutPage',
    title: 'About Page',
    type: 'document',
    // icon: Store, 
    groups: [
        { name: 'content', title: 'Content' },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        defineField({
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'localizedString',
            group: 'content',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'localizedText',
            group: 'content',
        }),
        defineField({
            name: 'heroBadge',
            title: 'Hero Badge Text',
            type: 'localizedString',
            group: 'content',
            initialValue: { en: 'About Us' },
        }),
        defineField({
            name: 'missionStatement',
            title: 'Mission Statement',
            type: 'localizedText',
            group: 'content',
        }),
        defineField({
            name: 'storyContent',
            title: 'Our Story',
            type: 'localizedBlock',
            group: 'content',
        }),
        defineField({
            name: 'values',
            title: 'Core Values',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'title', type: 'localizedString' }),
                        defineField({ name: 'description', type: 'localizedText' }),
                        defineField({ name: 'iconName', title: 'Icon Name (Lucide)', type: 'string' }),
                    ],
                },
            ],
            group: 'content',
        }),
        defineField({
            name: 'certifications',
            title: 'Certifications & Accreditations',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'name', type: 'string' }),
                        defineField({ name: 'logo', type: 'image', options: { hotspot: true } }),
                    ],
                },
            ],
            group: 'content',
        }),
        defineField({
            name: 'timeline',
            title: 'Company Timeline',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'year', type: 'string', title: 'Year' }),
                        defineField({ name: 'title', type: 'localizedString', title: 'Milestone Title' }),
                        defineField({ name: 'description', type: 'localizedText', title: 'Description' }),
                    ],
                },
            ],
            group: 'content',
        }),
        defineField({
            name: 'clientLogos',
            title: 'Client Logos',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
            group: 'content',
        }),
        defineField({
            name: 'founderVideoUrl',
            title: 'Founder Video URL',
            type: 'url',
            group: 'content',
        }),
        defineField({
            name: "ctaTitle",
            title: "Bottom CTA Title",
            type: "localizedString",
            group: 'content',
            initialValue: { en: "Ready to keep more of what you earn?" },
        }),
        defineField({
            name: "ctaSubtitle",
            title: "Bottom CTA Subtitle",
            type: "localizedText",
            group: 'content',
        }),
        defineField({
            name: "ctaButtonText",
            title: "Button Text",
            type: "localizedString",
            group: 'content',
            initialValue: { en: "Book a Discovery Call" },
        }),
        defineField({
            name: "ctaButtonUrl",
            title: "Button URL",
            type: "url",
            group: 'content',
            validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ["https", "http", "mailto", "tel"] }),
        }),
        defineField({
            name: "ctaBackgroundImage",
            title: "CTA Section Background",
            type: "image",
            group: 'content',
            options: { hotspot: true },
            fields: [
                {
                    name: "alt",
                    title: "Alternative Text",
                    type: "string",
                },
            ],
        }),
        defineField({
            name: 'seo',
            title: 'SEO Overrides',
            type: 'seo',
            group: 'seo',
        }),
    ],
})

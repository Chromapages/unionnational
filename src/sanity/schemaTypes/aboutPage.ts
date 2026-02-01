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
            type: 'string',
            group: 'content',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'text',
            rows: 3,
            group: 'content',
        }),
        defineField({
            name: 'heroBadge',
            title: 'Hero Badge Text',
            type: 'string',
            group: 'content',
            initialValue: 'About Us',
        }),
        defineField({
            name: 'missionStatement',
            title: 'Mission Statement',
            type: 'text',
            rows: 4,
            group: 'content',
        }),
        defineField({
            name: 'storyContent',
            title: 'Our Story',
            type: 'array',
            of: [{ type: 'block' }],
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
                        defineField({ name: 'title', type: 'string' }),
                        defineField({ name: 'description', type: 'text' }),
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
                        defineField({ name: 'title', type: 'string', title: 'Milestone Title' }),
                        defineField({ name: 'description', type: 'text', title: 'Description' }),
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
            type: "string",
            group: 'content',
            initialValue: "Ready to keep more of what you earn?",
        }),
        defineField({
            name: "ctaSubtitle",
            title: "Bottom CTA Subtitle",
            type: "text",
            rows: 2,
            group: 'content',
        }),
        defineField({
            name: "ctaButtonText",
            title: "Button Text",
            type: "string",
            group: 'content',
            initialValue: "Book a Discovery Call",
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

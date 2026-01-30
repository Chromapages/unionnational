import { defineField, defineType } from 'sanity'
import { Store, User, Award, List } from 'lucide-react'

export const aboutPage = defineType({
    name: 'aboutPage',
    title: 'About Page',
    type: 'document',
    // icon: Store, 
    fields: [
        defineField({
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'heroBadge',
            title: 'Hero Badge Text',
            type: 'string',
            initialValue: 'About Us',
        }),
        defineField({
            name: 'missionStatement',
            title: 'Mission Statement',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'storyContent',
            title: 'Our Story',
            type: 'array',
            of: [{ type: 'block' }],
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
        }),
        defineField({
            name: 'clientLogos',
            title: 'Client Logos',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
        }),
        defineField({
            name: 'founderVideoUrl',
            title: 'Founder Video URL',
            type: 'url',
        }),
        defineField({
            name: "ctaTitle",
            title: "Bottom CTA Title",
            type: "string",
            initialValue: "Ready to keep more of what you earn?",
        }),
        defineField({
            name: "ctaSubtitle",
            title: "Bottom CTA Subtitle",
            type: "text",
            rows: 2,
        }),
        defineField({
            name: "ctaButtonText",
            title: "Button Text",
            type: "string",
            initialValue: "Book a Discovery Call",
        }),
        defineField({
            name: "ctaButtonUrl",
            title: "Button URL",
            type: "url",
            validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ["https", "http", "mailto", "tel"] }),
        }),
        defineField({
            name: "ctaBackgroundImage",
            title: "CTA Section Background",
            type: "image",
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
})

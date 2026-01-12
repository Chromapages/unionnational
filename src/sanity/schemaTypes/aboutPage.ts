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
    ],
})

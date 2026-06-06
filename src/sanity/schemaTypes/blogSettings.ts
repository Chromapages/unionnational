import { defineType, defineField } from 'sanity'
import { Settings } from 'lucide-react'

export const blogSettings = defineType({
    name: 'blogSettings',
    title: 'Blog Settings',
    type: 'document',
    icon: Settings,
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
            initialValue: 'Union National Blog',
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'localizedText',
            group: 'content',
            initialValue: 'Insights and strategies for tax optimization and wealth building.',
        }),
        defineField({
            name: 'postsPerPage',
            title: 'Posts Per Page',
            type: 'number',
            group: 'content',
            initialValue: 9,
            validation: (Rule) => Rule.min(3).max(24),
        }),
        defineField({
            name: 'seo',
            title: 'SEO Overrides',
            type: 'seo',
            group: 'seo',
        }),
    ],
})

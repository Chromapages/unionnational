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
            type: 'string',
            group: 'content',
            initialValue: 'Union National Blog',
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'text',
            rows: 3,
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
            name: 'newsletterTitle',
            title: 'Newsletter Title',
            type: 'string',
            group: 'content',
            initialValue: 'Join the Inner Circle',
        }),
        defineField({
            name: 'newsletterDescription',
            title: 'Newsletter Description',
            type: 'text',
            group: 'content',
            rows: 3,
        }),
        defineField({
            name: 'seo',
            title: 'SEO Overrides',
            type: 'seo',
            group: 'seo',
        }),
    ],
})

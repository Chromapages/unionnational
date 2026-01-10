import { defineType, defineField } from 'sanity'
import { Tag } from 'lucide-react'

export const blogCategory = defineType({
    name: 'blogCategory',
    title: 'Blog Categories',
    type: 'document',
    icon: Tag,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'displayOrder',
            title: 'Display Order',
            type: 'number',
            initialValue: 0,
        }),
    ],
})

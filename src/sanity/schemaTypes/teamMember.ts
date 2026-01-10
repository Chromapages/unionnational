import { defineField, defineType } from 'sanity'
import { Users } from 'lucide-react'

export const teamMember = defineType({
    name: 'teamMember',
    title: 'Team Member',
    type: 'document',
    // @ts-ignore - The icon property expects a component but type definitions might be strict
    icon: Users,
    fields: [
        defineField({
            name: 'name',
            title: 'Full Name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'role',
            title: 'Role / Job Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'credentials',
            title: 'Credentials',
            description: 'e.g. CPA, EA, MBA',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Bio / Description',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'image',
            title: 'Profile Photo',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Alternative Text',
                    type: 'string',
                    initialValue: (doc: any) => doc.name || 'Team member photo',
                }),
            ],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'isFounder',
            title: 'Is Founder?',
            description: 'Show this person in the featured Founder section',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'linkedinUrl',
            title: 'LinkedIn URL',
            type: 'url',
        }),
        defineField({
            name: 'email',
            title: 'Email Address',
            type: 'string',
        }),
        defineField({
            name: 'displayOrder',
            title: 'Display Order',
            type: 'number',
            initialValue: 0,
        }),
        defineField({
            name: 'tags',
            title: 'Specialty Tags',
            description: 'e.g. Tax Strategy, S-Corp (Only shown for founder currently)',
            type: 'array',
            of: [{ type: 'string' }],
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'role',
            media: 'image',
        },
    },
})

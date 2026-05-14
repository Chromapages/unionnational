import { defineField, defineType, type SanityDocument } from 'sanity'
import { Users } from 'lucide-react'

export const teamMember = defineType({
    name: 'teamMember',
    title: 'Team Member',
    type: 'document',
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
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Bio / Description',
            type: 'text',
            rows: 4,
            validation: (rule) => rule.required(),
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
                    initialValue: 'Team member photo',
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
        defineField({
            name: 'bioShort',
            title: 'Short Bio',
            type: 'text',
            rows: 3,
            description: 'Short biography for E-E-A-T authorship signals (160 chars recommended)',
        }),
        defineField({
            name: 'socialHandles',
            title: 'Social Media Handles',
            type: 'object',
            fields: [
                { name: 'linkedin', title: 'LinkedIn', type: 'url' },
                { name: 'twitter', title: 'Twitter/X', type: 'string' },
                { name: 'youtube', title: 'YouTube', type: 'url' },
            ],
        }),
        defineField({
            name: "certifications",
            title: "Professional Certifications",
            type: "array",
            of: [{ type: "string" }],
            description: "List of formal licenses and certifications (e.g. IRS Enrolled Agent, CPA, EA).",
        }),
        defineField({
            name: "irsLicenseNumber",
            title: "IRS License / PTIN",
            type: "string",
            description: "Internal trust signal (not always displayed, but useful for Person schema).",
        }),
        defineField({
            name: "yearsExperience",
            title: "Years of Experience",
            type: "number",
            description: "Total years in the tax/financial industry.",
        }),
        defineField({
            name: "speakingEngagements",
            title: "Expert Appearances / Bio",
            type: "text",
            rows: 4,
            description: "Mention any conferences, webinars, or publications to boost topical authority.",
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

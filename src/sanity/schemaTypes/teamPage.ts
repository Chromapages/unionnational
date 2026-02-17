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
            initialValue: { en: 'Construction-Exclusive Experts' },
            group: 'hero',
        }),
        defineField({
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'localizedString',
            initialValue: { en: 'The Architects of Your Financial Infrastructure' },
            group: 'hero',
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'localizedText',
            initialValue: { en: "Most accountants have never set foot on a job site. Our team specializes exclusively in construction accounting, meaning we don't just understand the numbers—we understand the trade." },
            group: 'hero',
        }),
        defineField({
            name: 'founderSectionTitle',
            title: 'Founder Section Title',
            type: 'localizedString',
            initialValue: { en: 'Built From The Ground Up' },
            group: 'founder',
        }),
        defineField({
            name: 'teamSectionTitle',
            title: 'Team Section Title',
            type: 'localizedString',
            initialValue: { en: 'Your Dedicated Crew' },
            group: 'team',
        }),
        defineField({
            name: 'teamSectionSubtitle',
            title: 'Team Section Subtitle',
            type: 'localizedString',
            initialValue: { en: 'No call centers. No junior generalists. Just seasoned Enrolled Agents who know the difference between a sub-contractor and an employee.' },
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
            initialValue: [
                {
                    title: { en: "On-Site Speed" },
                    description: { en: "We answer fast. Payroll and deadlines don't wait, and neither do we." },
                    iconName: "Zap"
                },
                {
                    title: { en: "Laser-Level Accuracy" },
                    description: { en: "Precision matters. We build tax returns with the same care you build houses." },
                    iconName: "Crosshair"
                },
                {
                    title: { en: "Audit Armor" },
                    description: { en: "We don't just file; we defend. We stand between you and the IRS." },
                    iconName: "Shield"
                },
                {
                    title: { en: "Proactive Communication" },
                    description: { en: "We call you with ideas before you call us with problems." },
                    iconName: "MessageSquare"
                }
            ]
        }),
        defineField({
            name: 'hiringBadge',
            title: 'Hiring Badge Text',
            type: 'localizedString',
            initialValue: { en: 'Join the Elite' },
            group: 'hiring',
        }),
        defineField({
            name: 'hiringTitle',
            title: 'Hiring Title',
            type: 'localizedString',
            initialValue: { en: "We Don't Hire Generalists." },
            group: 'hiring',
        }),
        defineField({
            name: 'hiringDescription',
            title: 'Hiring Description',
            type: 'localizedText',
            initialValue: { en: "We are building the premier financial team for the construction industry. If you want to specialize, stop grinding through 1040s and start building wealth for clients." },
            group: 'hiring',
        }),
        defineField({
            name: 'hiringBenefits',
            title: 'Hiring Benefits',
            type: 'array',
            of: [{ type: 'localizedString' }],
            group: 'hiring',
            initialValue: [
                { en: "100% Remote Context" },
                { en: "Above-Market Compensation" },
                { en: "Specialized Training" },
                { en: "Zero 'Busy Season' Burnout" }
            ]
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
            initialValue: { en: "Ready to Upgrade Your Crew?" },
        }),
        defineField({
            name: "ctaSubtitle",
            title: "Bottom CTA Subtitle",
            type: "localizedText",
            group: "hiring",
            initialValue: { en: "Your business deserves a financial team that works as hard as you do." },
        }),
        defineField({
            name: "ctaButtonText",
            title: "Button Text",
            type: "localizedString",
            group: "hiring",
            initialValue: { en: "Book a Strategy Call" },
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

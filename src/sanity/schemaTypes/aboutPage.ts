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
            initialValue: { en: "We Don't Just File Taxes. We Engineer Wealth for Contractors." },
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'localizedText',
            group: 'content',
            initialValue: { en: "The only nationwide tax firm dedicated 100% to the construction industry. Combining aggressive S-Corp strategies with bulletproof IRS defense." },
        }),
        defineField({
            name: 'heroBadge',
            title: 'Hero Badge Text',
            type: 'localizedString',
            group: 'content',
            initialValue: { en: 'Specialized for Builders' },
        }),
        defineField({
            name: 'missionStatement',
            title: 'Mission Statement',
            type: 'localizedText',
            group: 'content',
            initialValue: { en: "The tax code is 70,000 pages long. For most, it's a liability. For us, it's a blueprint. Our mission is to arm American contractors with the same high-level tax strategies used by Fortune 500 construction firms." },
        }),
        defineField({
            name: 'storyContent',
            title: 'Our Story',
            type: 'localizedBlock',
            group: 'content',
        }),
        defineField({
            name: 'valuesEyebrow',
            title: 'Values Section Eyebrow',
            type: 'localizedString',
            group: 'content',
            initialValue: { en: 'Our Code' },
        }),
        defineField({
            name: 'valuesTitle',
            title: 'Values Section Title',
            type: 'localizedString',
            group: 'content',
            initialValue: { en: 'The Foundation We Build On' },
        }),
        defineField({
            name: 'values',
            title: 'Core Values (Small Cards)',
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
            initialValue: [
                {
                    title: { en: "Blue-Collar Work Ethic" },
                    description: { en: "We work as hard as you do. No energetic disconnects. We answer the phone, hit deadlines, and get the job done." },
                    iconName: "Hammer"
                },
                {
                    title: { en: "Structural Integrity" },
                    description: { en: "Aggressive savings, zero shortcuts. Our strategies are built to withstand the weight of an IRS audit." },
                    iconName: "ShieldCheck"
                },
                {
                    title: { en: "Proactive Blueprinting" },
                    description: { en: "We plan your tax year in January, not December. Anticipation is better than reaction." },
                    iconName: "ScanEye"
                },
                {
                    title: { en: "Maximum Yield" },
                    description: { en: "If there is a credit, we find it. If there is a deduction, we take it. We leave nothing on the table." },
                    iconName: "TrendingUp"
                }
            ]
        }),
        defineField({
            name: 'primaryValue',
            title: 'Primary Value (Integrity Card)',
            type: 'object',
            fields: [
                defineField({ name: 'badge', title: 'Badge Text', type: 'localizedString' }),
                defineField({ name: 'title', title: 'Title', type: 'localizedString' }),
                defineField({ name: 'description', title: 'Description', type: 'localizedText' }),
                defineField({ name: 'image', title: 'Background Image', type: 'image', options: { hotspot: true } }),
                defineField({ name: 'videoUrl', title: 'Video URL (YouTube/Vimeo)', type: 'url' }),
                defineField({ name: 'videoFile', title: 'Video File (Sanity Hosted)', type: 'file', options: { accept: 'video/*' } }),
            ],
            group: 'content',
            initialValue: {
                badge: { en: "Our Philosophy" },
                title: { en: "Aggressive Savings. Conservative Compliance." },
                description: { en: "We believe you shouldn't have to choose between saving money and staying out of jail. Our Enrolled Agents specialize in the 'grey areas' of the tax code—navigating them with precision to maximize your S-Corp benefits without triggering red flags." }
            }
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
            initialValue: [
                {
                    year: "2018",
                    title: { en: "The Broken Ground" },
                    description: { en: "Founded by tax experts who saw hardworking contractors being underserved by generalist CPAs." }
                },
                {
                    year: "2020",
                    title: { en: "Nationwide Licensing" },
                    description: { en: "Achieved Enrolled Agent status across all 50 states, allowing us to defend clients anywhere." }
                },
                {
                    year: "2022",
                    title: { en: "The $10M Milestone" },
                    description: { en: "Surpassed $10 Million in tax savings generated for our construction clients." }
                },
                {
                    year: "2024",
                    title: { en: "Union National 2.0" },
                    description: { en: "Launched the Virtual Executive Office for seamless, cloud-first compliance." }
                }
            ]
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
            title: 'Founder Video URL (YouTube/Vimeo)',
            type: 'url',
            group: 'content',
        }),
        defineField({
            name: 'founderVideoFile',
            title: 'Founder Video File (Sanity Hosted)',
            type: 'file',
            group: 'content',
            options: {
                accept: 'video/*'
            }
        }),
        defineField({
            name: "ctaTitle",
            title: "Bottom CTA Title",
            type: "localizedString",
            group: 'content',
            initialValue: { en: "Is Your Current CPA 'Just Filing'?" },
        }),
        defineField({
            name: "ctaSubtitle",
            title: "Bottom CTA Subtitle",
            type: "localizedText",
            group: 'content',
            initialValue: { en: "Switch to a strategic partner who builds wealth. Get a free analysis of your last 2 tax returns." },
        }),
        defineField({
            name: "ctaButtonText",
            title: "Button Text",
            type: "localizedString",
            group: 'content',
            initialValue: { en: "Get My Free Retro-Analysis" },
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
    preview: {
        select: {
            title: 'heroTitle',
            subtitle: 'heroSubtitle',
        },
        prepare({ title, subtitle }) {
            return {
                title: title?.en || 'About Page',
                subtitle: subtitle?.en || '',
            }
        },
    },
})

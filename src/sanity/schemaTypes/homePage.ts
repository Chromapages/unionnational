import { defineField, defineType } from "sanity";
import { Home } from "lucide-react";

export const homePage = defineType({
    name: "homePage",
    title: "Home Page",
    type: "document",
    icon: Home,
    groups: [
        { name: "hero", title: "Hero Section" },
        { name: "trust", title: "Trust Bar" },
        { name: "stats", title: "Statistics" },
        { name: "differentiation", title: "Differentiation Section" },
        { name: "nationwide", title: "Nationwide Services" },
        { name: "services", title: "Services Section" },
        { name: "cta", title: "CTA Section" },
        { name: "seo", title: "SEO" },
    ],
    fields: [
        // Hero Section
        defineField({
            name: "heroTitle",
            title: "Hero Title",
            type: "localizedString",
            group: "hero",
            validation: (Rule) => Rule.required(),
            initialValue: { en: "Contractors: Stop Overpaying Taxes with S Corp Strategies" },
        }),
        defineField({
            name: "heroSubtitle",
            title: "Hero Subtitle",
            type: "localizedText",
            group: "hero",
            initialValue: { en: "IRS Enrolled Agents helping contractors save an average of $23,420 annually through strategic S Corp tax planning." },
        }),
        defineField({
            name: "heroVideoUrl",
            title: "Hero Background Video URL",
            type: "url",
            group: "hero",
            description: "URL to the HLS stream or mp4 file.",
        }),
        defineField({
            name: "heroCtaText",
            title: "Hero Primary CTA Text",
            type: "localizedString",
            group: "hero",
            initialValue: { en: "See How S Corps Save $20k+" },
        }),
        defineField({
            name: "heroCtaUrl",
            title: "Hero Primary CTA Video URL",
            type: "url",
            validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ["https", "http"] }),
            group: "hero",
            description: "Video to open in modal when clicked.",
        }),
        defineField({
            name: "heroSecondaryCtaText",
            title: "Hero Secondary CTA Text",
            type: "localizedString",
            group: "hero",
            initialValue: { en: "Get My Free S Corp Analysis" },
        }),
        defineField({
            name: "heroSecondaryCtaUrl",
            title: "Hero Secondary CTA URL",
            type: "url",
            validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ["https", "http", "mailto", "tel"] }),
            group: "hero",
        }),

        // Trust Bar
        defineField({
            name: "trustLogos",
            title: "Trust / Client Logos",
            type: "array",
            group: "trust",
            of: [
                {
                    type: "image",
                    fields: [
                        { name: "alt", type: "string", title: "Company Name" },
                    ],
                },
            ],
        }),

        // Stats Section
        defineField({
            name: "stats",
            title: "Key Statistics",
            type: "array",
            group: "stats",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "value", type: "string", title: "Value (e.g. $10M+)" },
                        { name: "label", type: "localizedString", title: "Label (e.g. Tax Saved)" },
                    ],
                },
            ],
        }),
        defineField({
            name: "bentoGridBackgroundImage",
            title: "Bento Grid: Expert Card Background",
            type: "image",
            group: "stats",
            options: { hotspot: true },
            fields: [
                {
                    name: "alt",
                    title: "Alternative Text",
                    type: "string",
                },
            ],
        }),

        // Differentiation Section
        defineField({
            name: "differentiationEyebrow",
            title: "Differentiation Eyebrow",
            type: "localizedString",
            group: "differentiation",
            initialValue: { en: "Stop Losing Money to the IRS" },
        }),
        defineField({
            name: "differentiationTitle",
            title: "Differentiation Title",
            type: "localizedString",
            group: "differentiation",
            initialValue: { en: "Why Contractors Overpay (And How We Fix It)" },
        }),
        defineField({
            name: "differentiationSubtitle",
            title: "Differentiation Subtitle",
            type: "localizedText",
            group: "differentiation",
            initialValue: { en: "Most CPAs exemplify 'reactive filing'. We practice 'proactive tax reduction'." },
        }),
        defineField({
            name: "competitorFeatures",
            title: "Competitor Features (What They Lack)",
            type: "array",
            group: "differentiation",
            of: [{ type: "string" }],
            initialValue: [
                "Limited S-Corp Expertise",
                "Reactive Annual Filing",
                "Hidden Hourly Fees",
                "No CFO Access",
                "One-Size-Fits-All Approach",
            ],
        }),
        defineField({
            name: "unionFeatures",
            title: "Union National Features (What We Offer)",
            type: "array",
            group: "differentiation",
            of: [{ type: "string" }],
            initialValue: [
                "S-Corp Tax Specialists",
                "Proactive Quarterly Strategy",
                "Transparent Flat Pricing",
                "Dedicated CFO Team",
                "Industry-Specific Deductions",
            ],
        }),
        defineField({
            name: "differentiationCtaText",
            title: "Differentiation CTA Text",
            type: "localizedString",
            group: "differentiation",
            initialValue: { en: "See How We Compare" },
        }),
        defineField({
            name: "differentiationCtaUrl",
            title: "Differentiation CTA URL",
            type: "url",
            validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ["https", "http"] }),
            group: "differentiation",
        }),

        // Nationwide Services Section
        defineField({
            name: "nationwideBadge",
            title: "Nationwide Badge",
            type: "localizedString",
            group: "nationwide",
            initialValue: { en: "Licensed in All 50 States" },
        }),
        defineField({
            name: "nationwideTitle",
            title: "Nationwide Title",
            type: "localizedString",
            group: "nationwide",
            initialValue: { en: "Tax Strategy for Contractors, Wherever You Build" },
        }),
        defineField({
            name: "nationwideSubtitle",
            title: "Nationwide Subtitle",
            type: "localizedText",
            group: "nationwide",
            initialValue: { en: "Whether you're in California or New York, our IRS-licensed team handles your multi-state compliance." },
        }),
        defineField({
            name: "nationwideFeatures",
            title: "Nationwide Features",
            type: "array",
            group: "nationwide",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "icon", type: "string", title: "Icon Name" },
                        { name: "title", type: "localizedString", title: "Title" },
                        { name: "description", type: "localizedText", title: "Description" },
                    ],
                },
            ],
            initialValue: [
                {
                    icon: "Globe",
                    title: { en: "Multi-State Nexus Strategy" },
                    description: { en: "Avoid the 'nexus trap'. We proactively manage your state-to-state tax triggers to eliminate double taxation across all 50 states." },
                },
                {
                    icon: "ShieldCheck",
                    title: { en: "Enrolled Agent Audit Defense" },
                    description: { en: "Direct representation before the IRS and state authorities. We defend your contractor-specific deductions with federally authorized power." },
                },
                {
                    icon: "HardHat",
                    title: { en: "State-Specific Deduction Harvesting" },
                    description: { en: "Maximize local tax credits, construction tax breaks, and Section 199A mastery unique to each jurisdiction you build in." },
                },
                {
                    icon: "Zap",
                    title: { en: "Proactive Compliance Radar" },
                    description: { en: "Most accounting is reactive. We use forward-looking planning to identify tax savings month-by-month, keeping you ahead of state deadlines." },
                },
                {
                    icon: "Cloud",
                    title: { en: "Virtual Executive Office" },
                    description: { en: "Manage your complex multi-state records securely from the field. Our cloud-first workflow is built for contractors on the move." },
                },
            ],
        }),

        // Services Section
        defineField({
            name: "servicesEyebrow",
            title: "Services Eyebrow",
            type: "localizedString",
            group: "services",
            initialValue: { en: "Comprehensive S Corp Solutions" },
        }),
        defineField({
            name: "servicesTitle",
            title: "Services Title",
            type: "localizedString",
            group: "services",
            initialValue: { en: "Everything You Need to Lower Your Tax Bill" },
        }),
        defineField({
            name: "servicesSubtitle",
            title: "Services Subtitle",
            type: "localizedText",
            group: "services",
            initialValue: { en: "From S Corp election to reasonable compensation, we handle the complex IRS requirements so you don't have to." },
        }),
        defineField({
            name: "servicesButtonText",
            title: "Services Button Text",
            type: "localizedString",
            group: "services",
            initialValue: { en: "View All Tax Services" },
        }),

        // CTA Section (Pricing/Bottom)
        defineField({
            name: "ctaTitle",
            title: "Bottom CTA Title",
            type: "localizedString",
            group: "cta",
            initialValue: { en: "Ready to Save $20k+ Per Year?" },
        }),
        defineField({
            name: "ctaSubtitle",
            title: "Bottom CTA Subtitle",
            type: "localizedText",
            group: "cta",
        }),
        defineField({
            name: "ctaButtonText",
            title: "Button Text",
            type: "localizedString",
            group: "cta",
            initialValue: { en: "Get My Free S Corp Analysis" },
        }),
        defineField({
            name: "ctaButtonUrl",
            title: "Button URL",
            type: "url",
            validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ["https", "http", "mailto", "tel"] }),
            group: "cta",
        }),
        defineField({
            name: "ctaBackgroundImage",
            title: "CTA Section Background",
            type: "image",
            group: "cta",
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
            name: "seo",
            title: "SEO Overrides",
            type: "seo",
            group: "seo",
        }),
    ],
    preview: {
        select: {
            title: "heroTitle",
        },
        prepare({ title }) {
            return {
                title: "Home Page Settings",
                subtitle: title?.en || "No Title",
            };
        },
    },
});

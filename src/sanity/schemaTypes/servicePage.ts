import { FileText } from "lucide-react";
import { defineField, defineType } from "sanity";
import { ACCENT_COLORS, AccentColorInput } from "../components/AccentColorInput";

const localizedStringField = (name: string, title: string, options = {}) => defineField({ name, title, type: "localizedString", ...options });
const localizedTextField = (name: string, title: string) => defineField({ name, title, type: "localizedText" });

export const servicePage = defineType({
    name: "servicePage",
    title: "Service Page",
    type: "document",
    icon: FileText,
    groups: [
        { name: "content", title: "Page Content", default: true },
        { name: "seo", title: "SEO" },
    ],
    fields: [
        defineField({
            name: "service",
            title: "Catalog Service",
            type: "reference",
            to: [{ type: "service" }],
            group: "content",
            description: "Connects this landing page to the matching service card in the services directory.",
            validation: (Rule) => Rule.required(),
        }),
        defineField({ name: "title", title: "Page Title", type: "localizedString", group: "content", validation: (Rule) => Rule.required() }),
        defineField({ name: "slug", title: "Public Slug", type: "slug", group: "content", options: { source: "title", maxLength: 96 }, validation: (Rule) => Rule.required() }),
        defineField({
            name: "canonicalPath",
            title: "Canonical Path",
            type: "string",
            group: "content",
            description: "Root-relative public URL, for example /strategic-bookkeeping.",
            validation: (Rule) => Rule.required().regex(/^\/[a-z0-9][a-z0-9-/]*$/, { name: "root-relative URL path" }),
        }),
        defineField({
            name: "accentColor",
            title: "Accent Color",
            type: "string",
            group: "content",
            options: { list: [...ACCENT_COLORS] },
            components: { input: AccentColorInput },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "hero",
            title: "Hero",
            type: "object",
            group: "content",
            validation: (Rule) => Rule.required(),
            options: { collapsible: true, collapsed: false },
            fields: [
                localizedStringField("eyebrow", "Eyebrow"),
                localizedStringField("headline", "Headline"),
                localizedStringField("highlight", "Highlighted Headline Text"),
                localizedTextField("subheadline", "Subheadline"),
                defineField({
                    name: "primaryCta", title: "Primary CTA", type: "object",
                    fields: [localizedStringField("label", "Label"), defineField({ name: "href", title: "Destination", type: "string" })],
                }),
                defineField({
                    name: "secondaryCta", title: "Secondary CTA", type: "object",
                    fields: [localizedStringField("label", "Label"), defineField({ name: "href", title: "Destination or Anchor", type: "string" })],
                }),
                defineField({
                    name: "trustItems", title: "Trust Statistics", type: "array",
                    of: [{ type: "object", fields: [localizedStringField("value", "Value"), localizedStringField("label", "Label")] }],
                    validation: (Rule) => Rule.min(3).max(4),
                }),
                localizedStringField("microcopy", "CTA Reassurance"),
                defineField({
                    name: "visual", title: "Visual", type: "object",
                    fields: [
                        defineField({
                            name: "type", title: "Type", type: "string",
                            options: {
                                list: [
                                    { title: "Dashboard Mockup", value: "dashboard-mockup" },
                                    { title: "Image", value: "image" },
                                    { title: "Uploaded Video Player", value: "video" },
                                    { title: "None", value: "none" },
                                ],
                            },
                        }),
                        defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true }, fields: [localizedStringField("alt", "Alternative Text")], hidden: ({ parent }) => parent?.type !== "image" }),
                        defineField({
                            name: "videoFile", title: "Video File", type: "file",
                            description: "Upload an MP4 or WebM file for the hero player.",
                            options: { accept: "video/mp4,video/webm" },
                            hidden: ({ parent }) => parent?.type !== "video",
                            validation: (Rule) => Rule.custom((value, context) => context.parent?.type === "video" && !value?.asset ? "Upload a video file when Video Player is selected." : true),
                        }),
                        defineField({ name: "videoPoster", title: "Video Poster Image", type: "image", options: { hotspot: true }, fields: [localizedStringField("alt", "Alternative Text")], hidden: ({ parent }) => parent?.type !== "video" }),
                        defineField({ name: "videoLabel", title: "Video Player Label", type: "localizedString", description: "Optional accessible label for the player.", hidden: ({ parent }) => parent?.type !== "video" }),
                        localizedStringField("dashboardEyebrow", "Dashboard Eyebrow", { hidden: ({ parent }: { parent?: { type?: string } }) => parent?.type !== "dashboard-mockup" }),
                        localizedStringField("dashboardTitle", "Dashboard Title", { hidden: ({ parent }: { parent?: { type?: string } }) => parent?.type !== "dashboard-mockup" }),
                        localizedStringField("dashboardStatus", "Dashboard Status", { hidden: ({ parent }: { parent?: { type?: string } }) => parent?.type !== "dashboard-mockup" }),
                        defineField({
                            name: "dashboardMetrics", title: "Dashboard Metrics", type: "array",
                            of: [{ type: "object", fields: [localizedStringField("label", "Label"), localizedStringField("value", "Value"), defineField({ name: "emphasized", title: "Emphasized", type: "boolean", initialValue: false })] }],
                            validation: (Rule) => Rule.max(4),
                            hidden: ({ parent }) => parent?.type !== "dashboard-mockup",
                        }),
                    ],
                }),
            ],
        }),
        defineField({
            name: "eligibility", title: "Eligibility", type: "object", group: "content", options: { collapsible: true, collapsed: true },
            fields: [
                localizedStringField("eyebrow", "Eyebrow"),
                localizedStringField("heading", "Heading"),
                localizedTextField("description", "Description"),
                localizedStringField("badge", "Qualification Badge"),
                defineField({ name: "items", title: "Legacy Fit Criteria", description: "Used by the simple checklist when grouped criteria are not provided.", type: "array", of: [{ type: "localizedString" }], validation: (Rule) => Rule.min(3).max(6) }),
                defineField({
                    name: "primaryGroup", title: "Primary Qualification Group", type: "object",
                    fields: [localizedStringField("heading", "Heading"), defineField({ name: "items", title: "Criteria", type: "array", of: [{ type: "localizedString" }], validation: (Rule) => Rule.min(1).max(5) })],
                }),
                defineField({
                    name: "secondaryGroup", title: "Supporting Signs Group", type: "object",
                    fields: [localizedStringField("heading", "Heading"), defineField({ name: "items", title: "Signs", type: "array", of: [{ type: "localizedString" }], validation: (Rule) => Rule.min(1).max(5) })],
                }),
                localizedStringField("disqualifierHeading", "Disqualification Heading"),
                localizedTextField("disqualifier", "Disqualification Guidance"),
                defineField({
                    name: "cta", title: "Qualification CTA", type: "object",
                    fields: [localizedStringField("label", "Label"), defineField({ name: "href", title: "Destination", type: "string" }), localizedTextField("microcopy", "Microcopy")],
                }),
            ],
        }),
        defineField({
            name: "comparison", title: "Comparison", type: "object", group: "content", validation: (Rule) => Rule.required(), options: { collapsible: true, collapsed: true },
            fields: [
                localizedStringField("eyebrow", "Eyebrow"), localizedStringField("heading", "Heading"), localizedTextField("description", "Description"), localizedStringField("withoutLabel", "Left Column Label"), localizedStringField("withLabel", "Right Column Label"),
                defineField({ name: "pairs", title: "Transformation Cards", type: "array", of: [{ type: "object", fields: [localizedStringField("category", "Transformation Category"), localizedStringField("problem", "Before State"), localizedStringField("solution", "After State"), localizedTextField("outcome", "Business Outcome")], preview: { select: { title: "category.en", subtitle: "solution.en" } } }], validation: (Rule) => Rule.min(2).max(6) }),
                localizedTextField("conclusion", "Conclusion"),
                localizedStringField("linkLabel", "Handoff Link Label"),
                defineField({ name: "href", title: "Handoff Destination", type: "string" }),
            ],
        }),
        defineField({
            name: "process", title: "Process", type: "object", group: "content", validation: (Rule) => Rule.required(), options: { collapsible: true, collapsed: true },
            fields: [localizedStringField("eyebrow", "Eyebrow"), localizedStringField("heading", "Heading"), localizedTextField("description", "Description"), defineField({ name: "steps", title: "Steps", type: "array", of: [{ type: "object", fields: [localizedStringField("title", "Title"), localizedStringField("duration", "Label or Timing"), localizedTextField("description", "Description")], preview: { select: { title: "title.en", subtitle: "duration.en" } } }], validation: (Rule) => Rule.min(3).max(6) })],
        }),
        defineField({
            name: "included", title: "What's Included", type: "object", group: "content", validation: (Rule) => Rule.required(), options: { collapsible: true, collapsed: true },
            fields: [localizedStringField("eyebrow", "Eyebrow"), localizedStringField("heading", "Heading"), localizedTextField("description", "Description"), defineField({ name: "items", title: "Included Items", type: "array", of: [{ type: "localizedString" }], validation: (Rule) => Rule.min(3).max(12) }), defineField({ name: "pricing", title: "Pricing Explanation", type: "object", fields: [localizedStringField("headline", "Headline"), localizedTextField("detail", "Detail")] })],
        }),
        defineField({
            name: "video", title: "Video Section", type: "object", group: "content",
            description: "Optional service overview video. The section appears on the website only after a video URL is added.",
            options: { collapsible: true, collapsed: true },
            fields: [
                localizedStringField("eyebrow", "Eyebrow"),
                localizedStringField("heading", "Heading"),
                localizedTextField("description", "Description"),
                defineField({
                    name: "url", title: "Video URL", type: "url",
                    description: "Direct HTTPS URL for an MP4 or WebM video.",
                    validation: (Rule) => Rule.uri({ scheme: ["https"] }),
                }),
                defineField({
                    name: "poster", title: "Poster Image", type: "image", options: { hotspot: true },
                    fields: [localizedStringField("alt", "Alternative Text")],
                }),
                defineField({
                    name: "captionsUrl", title: "Captions URL", type: "url",
                    description: "Optional HTTPS URL for an English WebVTT captions file.",
                    validation: (Rule) => Rule.uri({ scheme: ["https"] }),
                }),
                localizedTextField("caption", "Visible Caption"),
            ],
        }),
        defineField({
            name: "proof", title: "Proof", type: "object", group: "content", options: { collapsible: true, collapsed: true },
            fields: [localizedStringField("eyebrow", "Eyebrow"), localizedStringField("heading", "Heading"), localizedTextField("quote", "Quote"), localizedStringField("attribution", "Attribution"), localizedStringField("linkLabel", "Link Label"), defineField({ name: "href", title: "Link Destination", type: "string" })],
        }),
        defineField({
            name: "faqSection", title: "FAQs", type: "object", group: "content", validation: (Rule) => Rule.required(), options: { collapsible: true, collapsed: true },
            fields: [localizedStringField("eyebrow", "Eyebrow"), localizedStringField("heading", "Heading"), defineField({ name: "items", title: "Questions", type: "array", of: [{ type: "object", fields: [localizedStringField("question", "Question"), localizedTextField("answer", "Answer")], preview: { select: { title: "question.en" } } }], validation: (Rule) => Rule.min(3).max(8) })],
        }),
        defineField({
            name: "closing", title: "Closing CTA", type: "object", group: "content", validation: (Rule) => Rule.required(), options: { collapsible: true, collapsed: true },
            fields: [localizedStringField("heading", "Heading"), localizedTextField("description", "Description"), localizedStringField("label", "Button Label"), defineField({ name: "href", title: "Button Destination", type: "string" })],
        }),
        defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
    ],
    preview: {
        select: { title: "title.en", subtitle: "canonicalPath" },
    },
});

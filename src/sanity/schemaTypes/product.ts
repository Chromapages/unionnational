import { defineField, defineType } from "sanity";
import { Book, Tag } from "lucide-react";

export const product = defineType({
    name: "product",
    title: "Product",
    type: "document",
    icon: Book,
    groups: [
        { name: "content", title: "Content" },
        { name: "seo", title: "SEO" },
    ],
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "localizedString",
            group: "content",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            group: "content",
            options: {
                source: "title.en",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "coverImage",
            title: "Cover Image",
            type: "image",
            group: "content",
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "price",
            title: "Price",
            type: "number",
            group: "content",
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: "compareAtPrice",
            title: "Compare At Price (Original Price)",
            type: "number",
            group: "content",
            description: "Optional. Show this to indicate a discount.",
        }),
        defineField({
            name: "shortDescription",
            title: "Short Description",
            type: "localizedText",
            group: "content",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "fullDescription",
            title: "Full Description",
            type: "localizedBlock",
            group: "content",
        }),
        defineField({
            name: "format",
            title: "Format",
            type: "string",
            group: "content",
            options: {
                list: [
                    { title: "Digital (PDF/ePub)", value: "digital" },
                    { title: "Hardcover", value: "hardcover" },
                    { title: "Bundle (Digital + Print)", value: "bundle" },
                    { title: "Course / Video", value: "course" },
                ],
            },
            initialValue: "digital",
        }),
        defineField({
            name: "buyLink",
            title: "Buy Link",
            type: "url",
            group: "content",
            description: "Link to Amazon, Gumroad, Stripe checkout, etc.",
        }),
        defineField({
            name: "features",
            title: "Key Features",
            type: "array",
            group: "content",
            of: [{ type: "localizedString" }],
        }),
        defineField({
            name: "isFeatured",
            title: "Featured Product?",
            type: "boolean",
            group: "content",
            initialValue: false,
            description: "If checked, this product will be highlighted at the top of the shop.",
        }),
        defineField({
            name: "badge",
            title: "Badge Text",
            type: "localizedString",
            group: "content",
            description: "Optional badge like 'Best Seller' or 'New'.",
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "string",
            group: "content",
            options: {
                list: [
                    { title: "Ebook", value: "ebook" },
                    { title: "Template", value: "template" },
                    { title: "Course", value: "course" },
                ],
            },
            initialValue: "ebook",
        }),
        defineField({
            name: "rating",
            title: "Rating (1-5)",
            type: "number",
            group: "content",
            validation: (Rule) => Rule.min(1).max(5).precision(1),
            initialValue: 5,
        }),
        defineField({
            name: "relatedProducts",
            title: "Related Products",
            type: "array",
            group: "content",
            of: [{ type: "reference", to: [{ type: "product" }] }],
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
            title: "title",
            subtitle: "price",
            media: "coverImage",
        },
        prepare({ title, subtitle, media }) {
            return {
                title: title?.en || "Untitled",
                subtitle: subtitle ? `$${subtitle}` : "No price",
                media,
            };
        },
    },
});

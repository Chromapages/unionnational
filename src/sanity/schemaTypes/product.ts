import { defineField, defineType } from "sanity";
import { Book, Tag } from "lucide-react";

export const product = defineType({
    name: "product",
    title: "Product",
    type: "document",
    icon: Book,
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "coverImage",
            title: "Cover Image",
            type: "image",
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "price",
            title: "Price",
            type: "number",
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: "compareAtPrice",
            title: "Compare At Price (Original Price)",
            type: "number",
            description: "Optional. Show this to indicate a discount.",
        }),
        defineField({
            name: "shortDescription",
            title: "Short Description",
            type: "text",
            rows: 3,
            validation: (Rule) => Rule.required().max(200),
        }),
        defineField({
            name: "fullDescription",
            title: "Full Description",
            type: "array",
            of: [{ type: "block" }],
        }),
        defineField({
            name: "format",
            title: "Format",
            type: "string",
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
            description: "Link to Amazon, Gumroad, Stripe checkout, etc.",
        }),
        defineField({
            name: "features",
            title: "Key Features",
            type: "array",
            of: [{ type: "string" }],
        }),
        defineField({
            name: "isFeatured",
            title: "Featured Product?",
            type: "boolean",
            initialValue: false,
            description: "If checked, this product will be highlighted at the top of the shop.",
        }),
        defineField({
            name: "badge",
            title: "Badge Text",
            type: "string",
            description: "Optional badge like 'Best Seller' or 'New'.",
            options: {
                list: [
                    { title: "Best Seller", value: "bestseller" },
                    { title: "New", value: "new" },
                    { title: "Limited", value: "limited" },
                ],
                layout: "radio",
            },
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "string",
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
            validation: (Rule) => Rule.min(1).max(5).precision(1),
            initialValue: 5,
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
                title,
                subtitle: subtitle ? `$${subtitle}` : "No price",
                media,
            };
        },
    },
});

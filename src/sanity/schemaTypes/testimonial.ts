import { defineField, defineType } from "sanity";
import { MessageSquareQuote } from "lucide-react";

export const testimonial = defineType({
    name: "testimonial",
    title: "Testimonial",
    type: "document",
    icon: MessageSquareQuote,
    fields: [
        defineField({
            name: "clientName",
            title: "Client Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "clientTitle",
            title: "Client Job Title",
            type: "localizedString",
        }),
        defineField({
            name: "clientCompany",
            title: "Client Company",
            type: "string",
        }),
        defineField({
            name: "quote",
            title: "Quote",
            type: "localizedText",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "rating",
            title: "Rating (1-5)",
            type: "number",
            validation: (Rule) => Rule.min(1).max(5),
            initialValue: 5,
        }),
        defineField({
            name: "serviceUsed",
            title: "Service Used",
            type: "reference",
            to: [{ type: "service" }],
        }),
        defineField({
            name: "image",
            title: "Client Photo",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "isFeatured",
            title: "Featured on Homepage?",
            type: "boolean",
            initialValue: false,
        }),
        defineField({
            name: "isPublished",
            title: "Published?",
            type: "boolean",
            initialValue: true,
        }),
        defineField({
            name: "savingsAmount",
            title: "Tax Savings (if applicable)",
            type: "string",
            description: "ej. '$12,400' - poderosa métrica de prueba social.",
        }),
        defineField({
            name: "industry",
            title: "Client Industry",
            type: "string",
            description: "Se utiliza para agrupar testimonios en páginas de destino específicas por segmento.",
            options: {
                list: [
                    { title: "Construction", value: "Construction" },
                    { title: "Real Estate", value: "Real Estate" },
                    { title: "E-commerce", value: "E-commerce" },
                    { title: "Professional Services", value: "Professional Services" },
                    { title: "Other", value: "Other" },
                ],
            },
        }),
        defineField({
            name: "verifiedClient",
            title: "Verified Client?",
            type: "boolean",
            description: "Active para mostrar el distintivo de 'Cliente Verificado' y generar confianza.",
            initialValue: true,
        }),
        defineField({
            name: "outcome",
            title: "Succinct Outcome",
            type: "localizedString",
            description: "ej. 'Ahorró $23k con elección de S-Corp'. Breve y fácil de leer.",
        }),
        defineField({
            name: "displayOrder",
            title: "Display Order",
            type: "number",
            initialValue: 0,
        }),
    ],
    preview: {
        select: {
            title: "clientName",
            subtitle: "clientCompany",
            media: "image",
        },
    },
});

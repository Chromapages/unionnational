import { defineField, defineType } from "sanity";

export const stripeWebhookIdempotency = defineType({
    name: "stripeWebhookIdempotency",
    title: "Shop Fulfillment Recovery",
    type: "document",
    fields: [
        defineField({
            name: "status", title: "Status", type: "string", readOnly: true,
            description: "pending_review means delivery may already have happened. Look up the Stripe event, then reconcile with GHL before any replay.",
        }),
        defineField({ name: "stripeEventId", title: "Latest Stripe Event ID", type: "string", readOnly: true }),
        defineField({ name: "attempt", title: "Delivery Attempts", type: "number", readOnly: true }),
        defineField({ name: "lastError", title: "Last Error Code", type: "string", readOnly: true }),
        defineField({ name: "lastErrorAt", title: "Last Error At", type: "datetime", readOnly: true }),
        defineField({ name: "updatedAt", title: "Updated At", type: "datetime", readOnly: true }),
        defineField({ name: "processedAt", title: "Delivered At", type: "datetime", readOnly: true }),
    ],
    preview: {
        select: { title: "status", subtitle: "stripeEventId" },
        prepare: ({ title, subtitle }) => ({ title: title || "unknown", subtitle: subtitle || "Legacy event record" }),
    },
});

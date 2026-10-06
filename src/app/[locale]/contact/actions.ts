"use server"

import { z } from "zod"
import { logger } from "@/lib/observability/logger"
import { normalizePhone, forwardToGhl } from "@/lib/intake/shared"
import { checkLeadIngress, checkLeadContact } from "@/lib/security/lead-ingress"
import { headers } from "next/headers"
import { getEnv } from "@/lib/config/env"

const ContactFormSchema = z.object({
    _hpt: z.string().max(200).optional(),
    goal: z.enum(["tax-reduction", "audit-defense", "restructure", "partnership"]),
    clientType: z.enum(["business", "individual"]),
    firstName: z.string().trim().min(1, "First name is required").max(100),
    lastName: z.string().trim().min(1, "Last name is required").max(100),
    email: z.string().trim().email("Invalid email address").max(254),
    phone: z.string().trim().max(30).optional(),
    message: z.string().trim().max(2_000).optional(),
    locale: z.enum(["en", "es"]).default("en"),
    submissionId: z.string().uuid().optional(),
    privacy: z.literal(true, { message: "You must agree to the privacy policy" }),
})

export type ContactFormState = { status: "idle" } | { status: "success" } | { status: "error"; message: string }

export async function submitContactForm(
    _prevState: ContactFormState | null,
    formData: FormData
): Promise<ContactFormState> {
    const requestHeaders = await headers()
    const ingress = await checkLeadIngress(new Request(getEnv("NEXT_PUBLIC_BASE_URL") || "http://localhost", { headers: requestHeaders }))
    if (!ingress.ok) return { status: "error", message: ingress.error }
    const raw = {
        _hpt: formData.get("_hpt") ?? undefined,
        goal: formData.get("goal"),
        clientType: formData.get("clientType"),
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        phone: formData.get("phone") ?? undefined,
        message: formData.get("message") ?? undefined,
        locale: formData.get("locale") || "en",
        submissionId: formData.get("submissionId") || undefined,
        privacy: formData.get("privacy"),
    }

    // Honeypot — silent success to avoid tipping off bots
    if (typeof raw._hpt === "string" && raw._hpt.trim().length > 0) {
        logger.info("Contact form honeypot triggered")
        return { status: "success" }
    }

    // Validate
    const parsed = ContactFormSchema.safeParse({
        ...raw,
        privacy: raw.privacy === "true" ? true : undefined,
    })
    if (!parsed.success) {
        logger.warn("Contact form validation failed")
        return { status: "error", message: "Invalid form data." }
    }

    const d = parsed.data
    // ponytail: email-keyed quotas avoid spoofable proxy headers; add an edge challenge if rotating addresses becomes material.
    const rateLimit = await checkLeadContact(d.email)
    if (!rateLimit.ok) {
        logger.warn("Contact form rate limited")
        return { status: "error", message: rateLimit.error }
    }

    const goalToService: Record<string, string> = {
        "tax-reduction": "TAX_PLANNING",
        "audit-defense": "TAX_PREPARATION",
        "restructure": "NEW_BUSINESS_FORMATION",
        "partnership": "FRACTIONAL_CFO",
    }

    const payload = {
        version: "1.0",
        eventType: "CONTACT_FORM_SUBMITTED",
        sourcePage: `/${d.locale}/contact`,
        leadMagnetType: "GENERAL",
        submittedAt: new Date().toISOString(),
        submissionId: d.submissionId,
        contact: {
            firstName: d.firstName,
            lastName: d.lastName,
            email: d.email.toLowerCase(),
            phone: normalizePhone(d.phone),
        },
        intent: {
            primaryServiceInterest: goalToService[d.goal] ?? "TAX_PLANNING",
            consultationType: "INITIAL_CONSULTATION",
            urgencyLevel: "MEDIUM",
            clientType: d.clientType,
            message: d.message,
        },
        tracking: {},
        meta: {
            locale: d.locale,
            userAgent: undefined,
        },
    }

    try {
        const ghl = await forwardToGhl(payload, undefined, d.submissionId)
        if (!ghl.ok) {
            logger.error("GHL forward failed for contact form", null, { status: ghl.status })
            return { status: "error", message: "Submission failed. Please try again." }
        }
        logger.info("Contact form submitted", { goal: d.goal })
        return { status: "success" }
    } catch (err) {
        logger.error("Contact form error", err)
        return { status: "error", message: "An unexpected error occurred." }
    }
}

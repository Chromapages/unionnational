"use server"

import { z } from "zod"
import { logger } from "@/lib/observability/logger"
import { checkRateLimit } from "@/lib/security/rate-limiter"
import { normalizePhone, forwardToGhl } from "@/lib/intake/shared"

const ContactFormSchema = z.object({
    _hpt: z.string().optional(),
    goal: z.enum(["tax-reduction", "audit-defense", "restructure", "partnership"]),
    clientType: z.enum(["business", "individual"]),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    message: z.string().optional(),
    privacy: z.literal(true, { message: "You must agree to the privacy policy" }),
})

export type ContactFormState = { status: "idle" } | { status: "success" } | { status: "error"; message: string }

export async function submitContactForm(
    _prevState: ContactFormState | null,
    formData: FormData
): Promise<ContactFormState> {
    const raw = {
        _hpt: formData.get("_hpt"),
        goal: formData.get("goal"),
        clientType: formData.get("clientType"),
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        message: formData.get("message"),
        privacy: formData.get("privacy"),
    }

    // Honeypot — silent success to avoid tipping off bots
    if (typeof raw._hpt === "string" && raw._hpt.trim().length > 0) {
        logger.info("Contact form honeypot triggered")
        return { status: "success" }
    }

    // Rate limit — static identifier since Server Actions lack an incoming Request
    const rateLimit = await checkRateLimit("contact-form")
    if (!rateLimit.success) {
        logger.warn("Contact form rate limited")
        return { status: "error", message: "Too many requests. Please try again later." }
    }

    // Validate
    const parsed = ContactFormSchema.safeParse({
        ...raw,
        privacy: raw.privacy === "true" ? true : undefined,
    })
    if (!parsed.success) {
        logger.warn("Contact form validation failed", { issues: parsed.error.issues })
        return { status: "error", message: "Invalid form data." }
    }

    const d = parsed.data

    const goalToService: Record<string, string> = {
        "tax-reduction": "TAX_PLANNING",
        "audit-defense": "TAX_PREPARATION",
        "restructure": "NEW_BUSINESS_FORMATION",
        "partnership": "FRACTIONAL_CFO",
    }

    const payload = {
        version: "1.0",
        eventType: "CONTACT_FORM_SUBMITTED",
        sourcePage: "contact-page",
        leadMagnetType: "GENERAL",
        submittedAt: new Date().toISOString(),
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
        },
        tracking: {},
        meta: {
            locale: "en",
            userAgent: undefined,
        },
    }

    try {
        const ghl = await forwardToGhl(payload)
        if (!ghl.ok) {
            logger.error("GHL forward failed for contact form", null, { status: ghl.status })
            return { status: "error", message: "Submission failed. Please try again." }
        }
        logger.info("Contact form submitted", { email: d.email, goal: d.goal })
        return { status: "success" }
    } catch (err) {
        logger.error("Contact form error", err)
        return { status: "error", message: "An unexpected error occurred." }
    }
}

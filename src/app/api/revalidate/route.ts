import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { z } from "zod";
import { getEnv } from "@/lib/config/env";
import { getTraceId, logger } from "@/lib/observability/logger";
import { checkRateLimit } from "@/lib/security/rate-limiter";
import { readWebhookBody } from "@/lib/shop/payment-security";
import { claimRevalidation, revalidationReplayKey } from "@/sanity/lib/revalidation-replay";

export const runtime = "nodejs";
const MAX_SIGNATURE_AGE_MS = 5 * 60 * 1000;
const MAX_FUTURE_SKEW_MS = 30_000;
const PUBLIC_TYPES = ["siteSettings", "homePage", "aboutPage", "contactSettings", "servicesPage", "service", "servicePage", "teamMember", "teamPage", "blogPost", "blogCategory", "blogSettings", "testimonial", "faq", "caseStudy", "pricingTier", "legalPage", "vslPage", "playbook", "playbookChapter", "industryVertical", "comparisonTable", "resourcesPage", "product", "shopSettings", "sanity.imageAsset", "sanity.fileAsset"] as const;
const PayloadSchema = z.object({
    _type: z.enum(PUBLIC_TYPES),
    _id: z.string().regex(/^[A-Za-z0-9_.-]{1,128}$/).optional(),
    _rev: z.string().regex(/^[A-Za-z0-9_-]{1,128}$/).optional(),
    slug: z.object({ current: z.string().regex(/^[\p{L}\p{N}][\p{L}\p{N}._-]{0,199}$/u) }).optional(),
});

function invalidatePublicContent(type: typeof PUBLIC_TYPES[number]) {
    const sections = type === "blogPost" || type === "blogCategory" || type === "blogSettings"
        ? ["blog", "hub"]
        : type === "product" || type === "shopSettings"
            ? ["shop", "books"]
            : type === "playbook" || type === "playbookChapter" || type === "resourcesPage"
                ? ["hub"]
                : type === "industryVertical" ? ["industries", "hub"] : null;
    for (const locale of ["en", "es"]) {
        if (sections) {
            for (const section of sections) revalidatePath(`/${locale}/${section}`, "layout");
            revalidatePath(`/${locale}`, "page");
        } else {
            // Shared navigation, quotes, FAQs and global settings are referenced across routes.
            revalidatePath(`/${locale}`, "layout");
        }
    }
    revalidatePath("/sitemap.xml");
    if (type === "siteSettings" || type === "legalPage") revalidateTag("site-settings", { expire: 0 });
}

export async function POST(req: NextRequest) {
    const traceId = getTraceId(req.headers);
    const secret = getEnv("SANITY_REVALIDATE_SECRET");
    const signature = req.headers.get("sanity-webhook-signature");
    const timestamp = Number(signature?.match(/^t=(\d{13})[, ]+v1=[A-Za-z0-9_-]{43}$/)?.[1]);
    const age = Date.now() - timestamp;
    if (!secret || !Number.isSafeInteger(timestamp) || age > MAX_SIGNATURE_AGE_MS || age < -MAX_FUTURE_SKEW_MS) {
        return new Response("Invalid Signature", { status: 401 });
    }
    if (req.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
        return new Response("Unsupported Media Type", { status: 415 });
    }

    try {
        const quota = await checkRateLimit("sanity:revalidation-ingress", 60, 60_000);
        if (!quota.success) return NextResponse.json({ error: "Too many requests" }, { status: 429, headers: { "Retry-After": "30" } });
    } catch {
        logger.warn("Sanity revalidation quota unavailable", { traceId });
        return NextResponse.json({ error: "Revalidation unavailable", traceId }, { status: 503 });
    }

    let rawBody: string;
    try {
        rawBody = (await readWebhookBody(req, 256 * 1024, 5000)).toString("utf8");
    } catch (error) {
        const status = error instanceof Error && error.message === "REQUEST_TOO_LARGE" ? 413
            : error instanceof Error && error.message === "BODY_TIMEOUT" ? 503 : 400;
        return NextResponse.json({ error: "Invalid request body" }, { status });
    }

    let body: z.infer<typeof PayloadSchema>;
    try {
        const bounded = new NextRequest(req.url, { method: "POST", headers: req.headers, body: rawBody });
        const parsed = await parseBody<unknown>(bounded, secret);
        if (parsed.isValidSignature !== true) return new Response("Invalid Signature", { status: 401 });
        const result = PayloadSchema.safeParse(parsed.body);
        if (!result.success) return new Response("Bad Request", { status: 400 });
        body = result.data;
    } catch {
        return new Response("Bad Request", { status: 400 });
    }
    if (body._id?.startsWith("drafts.") || body._id?.startsWith("versions.")) {
        return NextResponse.json({ revalidated: false, ignored: true });
    }

    try {
        const claim = await claimRevalidation(revalidationReplayKey(signature!, rawBody, body));
        if (claim.state === "duplicate") return NextResponse.json({ revalidated: false, duplicate: true });
        if (claim.state === "busy") return NextResponse.json({ error: "Revalidation pending" }, { status: 503 });
        try {
            invalidatePublicContent(body._type);
            await claim.complete();
        } catch (error) {
            await claim.release().catch(() => {});
            throw error;
        }
        return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
    } catch {
        logger.warn("Sanity revalidation failed; provider retry required", { traceId });
        return NextResponse.json({ error: "Revalidation failed", traceId }, { status: 503 });
    }
}

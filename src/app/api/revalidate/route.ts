
import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { getEnv } from "@/lib/config/env";
import { getTraceId, logger } from "@/lib/observability/logger";

export const runtime = "edge";

export async function POST(req: NextRequest) {
    const traceId = getTraceId(req.headers);

    try {
        const { isValidSignature, body } = await parseBody<{
            _type: string;
            slug?: { current: string };
        }>(req, getEnv("SANITY_REVALIDATE_SECRET"));

        if (!isValidSignature) {
            return new Response("Invalid Signature", { status: 401 });
        }

        if (!body?._type) {
            return new Response("Bad Request", { status: 400 });
        }

        // ponytail: invalidate both locale trees; narrow by document type if webhook volume makes this costly.
        revalidatePath("/en", "layout");
        revalidatePath("/es", "layout");
        revalidatePath("/sitemap.xml");
        revalidateTag("site-settings", { expire: 0 });

        return NextResponse.json({
            status: 200,
            revalidated: true,
            now: Date.now(),
            body,
        });
    } catch (error: unknown) {
        logger.error("Sanity revalidation failed", error, { traceId });
        return NextResponse.json(
            { error: "Revalidation failed", traceId },
            { status: 500 }
        );
    }
}

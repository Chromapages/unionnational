
import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export const runtime = "edge";

export async function POST(req: NextRequest) {
    try {
        const { isValidSignature, body } = await parseBody<{
            _type: string;
            slug?: { current: string };
        }>(req, process.env.SANITY_REVALIDATE_SECRET);

        if (!isValidSignature) {
            return new Response("Invalid Signature", { status: 401 });
        }

        if (!body?._type) {
            return new Response("Bad Request", { status: 400 });
        }

        // Revalidate the home page
        revalidatePath("/");

        // Revalidate specific tags if you are using them (optional)
        // revalidateTag(body._type)

        return NextResponse.json({
            status: 200,
            revalidated: true,
            now: Date.now(),
            body,
        });
    } catch (err: any) {
        console.error(err);
        return new Response(err.message, { status: 500 });
    }
}

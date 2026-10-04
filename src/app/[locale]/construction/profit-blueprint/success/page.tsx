import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function BlueprintSuccessPage({
    params,
    searchParams,
}: {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ session_id?: string | string[] }>;
}) {
    const [{ locale }, { session_id }] = await Promise.all([params, searchParams]);
    const id = typeof session_id === "string" && /^cs_(?:test|live)_[A-Za-z0-9_]+$/.test(session_id)
        ? session_id
        : null;
    redirect(`/${locale}/shop/success${id ? `?session_id=${encodeURIComponent(id)}` : ""}`);
}

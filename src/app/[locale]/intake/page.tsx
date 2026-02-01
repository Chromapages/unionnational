import { notFound } from "next/navigation";

export default async function IntakePage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const locale = params.locale;
    notFound();
}

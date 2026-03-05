import { redirect } from "next/navigation";

export default async function VSLRedirect(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const locale = params.locale;
    redirect("/vsl/construction");
}

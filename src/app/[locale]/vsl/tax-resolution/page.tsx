import TaxResolutionClient from "./TaxResolutionClient";

// Static params for SSG
export async function generateStaticParams() {
    return [
        { locale: 'en' },
        { locale: 'es' },
    ];
}

export const revalidate = 60;

export const metadata = {
    title: "Tax Resolution Program | Union National Tax",
    description: "Get help with IRS tax problems. We negotiate settlements, reduce penalties, and resolve tax debt.",
};

export default async function TaxResolutionPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    return <TaxResolutionClient locale={params.locale} />;
}

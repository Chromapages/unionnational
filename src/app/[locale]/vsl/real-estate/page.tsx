import RealEstateVSLClient from "./RealEstateVSLClient";

// Static params for SSG
export async function generateStaticParams() {
    return [
        { locale: 'en' },
        { locale: 'es' },
    ];
}

export const revalidate = 60;

export const metadata = {
    title: "Real Estate Investor Tax Program | Union National Tax",
    description: "Strategic tax planning for real estate investors. Optimize your rental property investments and maximize deductions.",
};

export default async function RealEstateVSLPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    return <RealEstateVSLClient locale={params.locale} />;
}

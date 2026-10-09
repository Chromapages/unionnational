import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { IndustryServiceExperience } from "@/components/industries/IndustryServiceExperience";
import { getIndustryServiceContent } from "@/lib/industries/service-content";
import { Metadata } from "next";
import { localizedAlternates } from "@/lib/seo/localizedAlternates";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await props.params;
    const copy = getIndustryServiceContent("construction", locale);
    return {
        title: copy.metadataTitle,
        description: copy.metadataDescription,
        openGraph: {
            title: copy.metadataTitle, description: copy.metadataDescription,
            images: [{ url: `https://unionnationaltax.com${copy.image}`, alt: copy.imageAlt }],
        },
        alternates: localizedAlternates(locale, "/industries/construction"),
    };
}

export default async function ConstructionIndustryPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const locale = params.locale;

    return (
        <div className="min-h-dvh bg-white font-body text-brand-900 selection:bg-gold-500 selection:text-brand-950">
            <HeaderWrapper />
            <main id="main-content">
                <IndustryServiceExperience industry="construction" locale={locale} />
            </main>
            <Footer />
        </div>
    );
}

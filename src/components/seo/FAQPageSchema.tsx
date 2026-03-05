import { sanityFetch } from "@/sanity/lib/live";
import { FAQ_QUERY } from "@/sanity/lib/queries";
import { getLocale } from "next-intl/server";

export async function FAQPageSchema() {
    const locale = await getLocale();
    const { data: faqs } = await sanityFetch({ query: FAQ_QUERY, params: { locale } });

    if (!faqs || faqs.length === 0) {
        return null;
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq: any) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

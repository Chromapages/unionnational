import { sanityFetch } from "@/sanity/lib/live";
import { FAQ_QUERY } from "@/sanity/lib/queries";

export async function FAQPageSchema() {
    const { data: faqs } = await sanityFetch({ query: FAQ_QUERY });

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

export function LocalBusinessSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "AccountingService",
        "name": "Union National Tax",
        "image": "https://unionnationaltax.com/logo.png",
        "description": "Specialized tax strategy and S-Corp management for contractors and small business owners.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "2950 E Harmony Rd",
            "addressLocality": "Orem",
            "addressRegion": "UT",
            "postalCode": "84097",
            "addressCountry": "US"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 40.2969,
            "longitude": -111.6946
        },
        "url": "https://unionnationaltax.com",
        "telephone": "+18015550123",
        "priceRange": "$$",
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday"
                ],
                "opens": "09:00",
                "closes": "17:00"
            }
        ],
        "sameAs": [
            "https://www.linkedin.com/company/union-national-tax",
            "https://www.facebook.com/unionnationaltax"
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

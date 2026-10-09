"use client";

import { UnifiedVSLTemplate, type VSLTemplateData } from "@/components/vsl/UnifiedVSLTemplate";

interface RestaurantVSLClientProps {
  data?: (VSLTemplateData & {
    ctaHeadline?: string;
    ctaSubheadline?: string;
    urgencyText?: string;
  }) | null;
  locale?: string;
}

export default function RestaurantVSLClient({ data, locale }: RestaurantVSLClientProps) {
  // Map legacy fields if new fields are not populated
  const mappedData = {
    ...data,
    finalCtaHeadline: data?.finalCtaHeadline || data?.ctaHeadline,
    finalCtaSubtext: data?.finalCtaSubtext || data?.ctaSubheadline || data?.urgencyText,
  };

  return (
    <UnifiedVSLTemplate
      data={mappedData}
      industry="restaurants"
      primaryAction={{
        href: `/${locale === "es" ? "es" : "en"}/industries/restaurants#consultation-form`,
        label: locale === "es" ? "Hablemos de su restaurante" : "Discuss restaurant support",
      }}
    />
  );
}

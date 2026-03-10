"use client";

import { UnifiedVSLTemplate } from "@/components/vsl/UnifiedVSLTemplate";

interface RestaurantVSLClientProps {
  data?: any;
  locale?: string;
}

export default function RestaurantVSLClient({ data, locale }: RestaurantVSLClientProps) {
  // Map legacy fields if new fields are not populated
  const mappedData = {
    ...data,
    finalCtaHeadline: data?.finalCtaHeadline || data?.ctaHeadline,
    finalCtaSubtext: data?.finalCtaSubtext || data?.ctaSubheadline || data?.urgencyText,
  };

  return <UnifiedVSLTemplate data={mappedData} industry="restaurants" />;
}

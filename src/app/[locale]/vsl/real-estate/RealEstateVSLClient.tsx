"use client";

import { UnifiedVSLTemplate } from "@/components/vsl/UnifiedVSLTemplate";

interface RealEstateVSLClientProps {
  data?: any;
  locale?: string;
}

export default function RealEstateVSLClient({ data, locale }: RealEstateVSLClientProps) {
  // Map legacy fields if new fields are not populated
  const mappedData = {
    ...data,
    finalCtaHeadline: data?.finalCtaHeadline || data?.ctaHeadline,
    finalCtaSubtext: data?.finalCtaSubtext || data?.ctaSubheadline || data?.urgencyText,
  };

  return <UnifiedVSLTemplate data={mappedData} industry="real-estate" />;
}

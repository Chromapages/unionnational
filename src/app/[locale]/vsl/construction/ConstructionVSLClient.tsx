"use client";

import { UnifiedVSLTemplate } from "@/components/vsl/UnifiedVSLTemplate";

interface ConstructionVSLClientProps {
  data?: any;
  locale?: string;
}

export default function ConstructionVSLClient({ data, locale }: ConstructionVSLClientProps) {
  // Map legacy fields if new fields are not populated
  const mappedData = {
    ...data,
    finalCtaHeadline: data?.finalCtaHeadline || data?.ctaHeadline,
    finalCtaSubtext: data?.finalCtaSubtext || data?.ctaSubheadline || data?.urgencyText,
  };

  return <UnifiedVSLTemplate data={mappedData} industry="construction" />;
}

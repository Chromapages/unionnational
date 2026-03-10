"use client";

import { UnifiedVSLTemplate } from "@/components/vsl/UnifiedVSLTemplate";

interface TaxResolutionClientProps {
  data?: any;
  locale?: string;
}

export default function TaxResolutionClient({ data, locale }: TaxResolutionClientProps) {
  // Map legacy fields if new fields are not populated
  const mappedData = {
    ...data,
    finalCtaHeadline: data?.finalCtaHeadline || data?.ctaHeadline,
    finalCtaSubtext: data?.finalCtaSubtext || data?.ctaSubheadline || data?.urgencyText,
  };

  return <UnifiedVSLTemplate data={mappedData} industry="tax-resolution" />;
}

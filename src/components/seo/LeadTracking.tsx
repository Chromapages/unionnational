"use client";

import { useEffect } from "react";
import { trackMetaEvent } from "@/components/seo/MetaPixel";

interface LeadTrackingProps {
  source?: string;
}

export function LeadTracking({ source = "website" }: LeadTrackingProps) {
  useEffect(() => {
    trackMetaEvent("Lead", {
      source: source,
    });
  }, [source]);

  return null;
}

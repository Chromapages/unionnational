"use client";

import { useEffect } from "react";
import { trackMetaEvent } from "@/components/seo/MetaPixel";

interface ServiceViewContentProps {
  serviceName: string;
  serviceId: string;
}

export function ServiceViewContent({ serviceName, serviceId }: ServiceViewContentProps) {
  useEffect(() => {
    trackMetaEvent("ViewContent", {
      content_name: serviceName,
      content_ids: serviceId,
      content_type: "service",
    });
  }, [serviceName, serviceId]);

  return null;
}

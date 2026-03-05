"use client";

import { useEffect } from "react";
import { MetaPixel, trackMetaEvent } from "@/components/seo/MetaPixel";

interface ShopViewContentProps {
  productName: string;
  productId: string;
  price?: number;
  currency?: string;
}

export function ShopViewContent({ productName, productId, price, currency = "USD" }: ShopViewContentProps) {
  useEffect(() => {
    // Track ViewContent event when product page loads
    trackMetaEvent("ViewContent", {
      content_name: productName,
      content_ids: productId,
      content_type: "product",
      value: price || 0,
      currency: currency,
    });
  }, [productName, productId, price, currency]);

  return null;
}

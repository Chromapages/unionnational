"use client";

import Script from "next/script";
import { useEffect } from "react";
import { useOptionalTracking } from "@/components/privacy/TrackingPreferences";
import { useCspNonce } from "@/components/security/CspNonceProvider";
import { markOptionalToolsLoaded } from "@/lib/analytics/privacy";

const GHL_TRACKING_ID = "tk_34d847b194af40c086c4125cb0852173";

export function GhlExternalTracking() {
  const enabled = useOptionalTracking();
  const nonce = useCspNonce();
  useEffect(() => { if (enabled) markOptionalToolsLoaded(); }, [enabled]);
  if (!enabled) return null;
  return (
    <Script
      id="ghl-external-tracking"
      src="https://link.agent-crm.com/js/external-tracking.js"
      data-tracking-id={GHL_TRACKING_ID}
      strategy="lazyOnload"
      nonce={nonce}
      onLoad={markOptionalToolsLoaded}
    />
  );
}

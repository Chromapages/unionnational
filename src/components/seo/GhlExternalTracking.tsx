"use client";

import Script from "next/script";

const GHL_TRACKING_ID = "tk_34d847b194af40c086c4125cb0852173";

export function GhlExternalTracking() {
  return (
    <Script
      id="ghl-external-tracking"
      src="https://link.agent-crm.com/js/external-tracking.js"
      data-tracking-id={GHL_TRACKING_ID}
      strategy="afterInteractive"
    />
  );
}

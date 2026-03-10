"use client";

import Script from "next/script";

// TODO: Replace with your actual Meta Pixel ID from Facebook Events Manager
// Go to https://www.facebook.com/events_manager to get your pixel ID
const META_PIXEL_ID = "1320632069943065";

interface MetaPixelProps {
  event?: string;
  customData?: Record<string, string | number>;
}

export function MetaPixel({ event, customData }: MetaPixelProps) {
  return (
    <>
      {/* Base Meta Pixel Code */}
      <Script
        id="meta-pixel-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />

      {/* Noscript fallback for Meta Pixel */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>

      {/* Custom Event - ViewContent */}
      {event === "ViewContent" && (
        <Script
          id="meta-pixel-view-content"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              fbq('track', 'ViewContent', ${customData ? JSON.stringify(customData) : "{}"});
            `,
          }}
        />
      )}

      {/* Lead Event */}
      {event === "Lead" && (
        <Script
          id="meta-pixel-lead"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              fbq('track', 'Lead', ${customData ? JSON.stringify(customData) : "{}"});
            `,
          }}
        />
      )}

      {/* CompleteRegistration Event */}
      {event === "CompleteRegistration" && (
        <Script
          id="meta-pixel-complete-registration"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              fbq('track', 'CompleteRegistration', ${customData ? JSON.stringify(customData) : "{}"});
            `,
          }}
        />
      )}

      {/* Contact Event */}
      {event === "Contact" && (
        <Script
          id="meta-pixel-contact"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              fbq('track', 'Contact', ${customData ? JSON.stringify(customData) : "{}"});
            `,
          }}
        />
      )}

      {/* Schedule Event */}
      {event === "Schedule" && (
        <Script
          id="meta-pixel-schedule"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              fbq('track', 'Schedule', ${customData ? JSON.stringify(customData) : "{}"});
            `,
          }}
        />
      )}
    </>
  );
}

// Helper function to track custom events
export function trackMetaEvent(eventName: string, data?: Record<string, string | number>) {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", eventName, data || {});
  }
}

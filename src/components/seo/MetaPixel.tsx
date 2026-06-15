"use client";

import Script from "next/script";

const META_PIXEL_ID = "1320632069943065";

interface MetaPixelProps {
  event?: string;
  customData?: Record<string, string | number | string[] | number[]>;
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
            (function(f,b,e,v,n,t,s){
              if(f.fbq)return;
              var q=f.fbq=function(){
                if(f.fbq.replay)return;
                if(arguments.callee)return arguments.callee;
                q.push(arguments);
              };
              q.push=q;
              q.loaded=!0;
              q.version='2.0';
              q.queue=[];
              t=b.createElement(e);
              t.async=!0;
              t.src=v;
              s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s);
            })(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
            if (window._fbqevq) {
              window._fbqevq.forEach(function(e) { window.fbq('track', e[0], e[1]); });
              window._fbqevq = [];
            }
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
export function trackMetaEvent(eventName: string, data?: Record<string, string | number | string[] | number[]>) {
  if (typeof window === "undefined") return;
  const win = window as any;

  // If pixel already loaded, fire immediately
  if (win.fbq) {
    win.fbq("track", eventName, data || {});
    return;
  }

  // Queue and schedule flush — use rAF to give pixel script time to load
  win._fbqevq = win._fbqevq || [];
  win._fbqevq.push([eventName, data || {}]);

  if (win._fbqevq._flushScheduled) return;
  win._fbqevq._flushScheduled = true;

  requestAnimationFrame(function() {
    if (win.fbq) {
      win._fbqevq.forEach(function(e: [string, Record<string, string | number | string[] | number[]>][]) {
        win.fbq("track", e[0], e[1]);
      });
      win._fbqevq = [];
    }
    win._fbqevq._flushScheduled = false;
  });
}

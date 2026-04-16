"use client";

import Script from "next/script";

export const BookingCalendar = () => {
  return (
    <div className="w-full h-full min-h-[600px] flex flex-col">
      <iframe
        src="https://link.agent-crm.com/widget/booking/sBGopjvf9OdyrfgWqOJx"
        style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "600px" }}
        scrolling="no"
        id="msgsndr-calendar"
        title="Scheduling Calendar"
      />
      <Script
        src="https://link.agent-crm.com/js/embed.js"
        type="text/javascript"
        strategy="afterInteractive"
      />
    </div>
  );
};

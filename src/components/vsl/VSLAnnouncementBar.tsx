"use client";

import React from "react";
import { Zap } from "lucide-react";

interface VSLAnnouncementBarProps {
  text?: string;
  month: string;
}

export function VSLAnnouncementBar({ text, month }: VSLAnnouncementBarProps) {
  const content = text || `⚡ ${month} Partner Cohort — Only 3 Spots Available`;

  return (
    <div className="w-full bg-red-600 text-white py-2 px-4 flex items-center justify-center text-sm font-semibold tracking-wide shadow-sm z-50">
      <p className="flex items-center gap-2 text-center">
        {content}
      </p>
    </div>
  );
}

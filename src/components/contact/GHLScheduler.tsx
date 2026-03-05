"use client";

import { cn } from "@/lib/utils";

interface GHLSchedulerProps {
    calendarUrl: string;
    height?: number;
    className?: string;
}

export const GHLScheduler = ({
    calendarUrl,
    height = 700,
    className
}: GHLSchedulerProps) => {
    if (!calendarUrl) return null;

    return (
        <div className={cn("w-full bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl", className)}>
            <iframe
                src={calendarUrl}
                width="100%"
                height={height}
                frameBorder="0"
                scrolling="no"
                style={{ border: 'none', overflow: 'hidden' }}
                title="Schedule a Consultation"
                loading="lazy"
                className="w-full"
            />
        </div>
    );
};

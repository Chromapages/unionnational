"use client";

import * as Icons from "lucide-react";

interface DynamicIconProps {
    name: string;
    className?: string;
}

/**
 * A utility component to render Lucide icons dynamically by their string name.
 */
export const DynamicIcon = ({ name, className }: DynamicIconProps) => {
    const Icon = (Icons as Record<string, any>)[name] || Icons.Briefcase;

    return <Icon className={className} />;
};

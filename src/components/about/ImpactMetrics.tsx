"use client";

import { AnimatedStat } from "./AnimatedStat";
import { Building2, Users, Wallet } from "lucide-react";

export function ImpactMetrics() {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <AnimatedStat
                icon={<Wallet className="h-6 w-6" />}
                value={25000000}
                prefix="$"
                label="Client Tax Savings"
                delay={0.2}
            />
            <AnimatedStat
                icon={<Users className="h-6 w-6" />}
                value={1000}
                suffix="+"
                label="Active Clients"
                delay={0.4}
            />
            <AnimatedStat
                icon={<Building2 className="h-6 w-6" />}
                value={10}
                suffix="+"
                label="Years of Service"
                delay={0.6}
            />
        </div>
    );
}

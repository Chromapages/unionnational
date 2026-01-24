"use client";

import { motion } from "framer-motion";
import { Download, Users, Star, ShieldCheck } from "lucide-react";
import { AnimatedStat } from "@/components/ui/AnimatedStat";

const stats = [
    { label: "Downloads", value: 5000, suffix: "+", icon: Download },
    { label: "Happy Customers", value: 1200, suffix: "+", icon: Users },
    { label: "5-Star Ratings", value: 450, suffix: "+", icon: Star },
    { label: "Secure Payments", value: 100, suffix: "%", icon: ShieldCheck },
];

export function ShopStatsBar() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mx-auto">
            {stats.map((stat, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/[0.06] backdrop-blur-md border border-white/10 p-4 rounded-xl flex flex-col items-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
                >
                    <stat.icon className="w-5 h-5 text-gold-400 mb-2" />
                    <div className="text-xl font-bold text-white font-heading">
                        <AnimatedStat value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-[10px] text-brand-200 uppercase tracking-wider font-bold">
                        {stat.label}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

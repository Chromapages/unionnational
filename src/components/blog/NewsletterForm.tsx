"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

export const NewsletterForm = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const response = await fetch("/api/ghl-intake", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-ghl-intake-secret": process.env.NEXT_PUBLIC_GHL_INTAKE_SECRET || "",
                },
                body: JSON.stringify({
                    event_type: "BLOG_NEWSLETTER_SUBSCRIBED",
                    contact: {
                        first_name: "Subscriber", // Fallback since we only collect email
                        email: email,
                    },
                    intent: {
                        lead_magnet_type: "BLOG_NEWSLETTER",
                    },
                }),
            });

            if (!response.ok) throw new Error("Subscription failed");

            setStatus("success");
            setEmail("");
        } catch (error) {
            console.error("Newsletter error:", error);
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="flex flex-col items-center gap-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-brand-900 text-gold-500 flex items-center justify-center shadow-xl">
                    <CheckCircle2 size={32} />
                </div>
                <p className="text-brand-900 font-bold text-xl">You're in!</p>
                <p className="text-brand-900/60 font-medium italic">Check your inbox for your first strategic insight.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 rounded-xl border-none focus:ring-2 focus:ring-brand-900 shadow-lg text-brand-900 font-sans"
                required
                disabled={status === "loading"}
            />
            <button 
                type="submit"
                disabled={status === "loading"}
                className="px-8 py-4 bg-brand-900 text-white font-bold rounded-xl hover:bg-brand-800 transition-all shadow-xl shadow-brand-900/20 font-heading flex items-center justify-center min-w-[140px]"
            >
                {status === "loading" ? <Loader2 className="animate-spin" size={20} /> : "Subscribe"}
            </button>
            {status === "error" && (
                <p className="text-red-700 text-sm font-bold absolute -bottom-8 left-0 right-0 text-center">
                    Something went wrong. Please try again.
                </p>
            )}
        </form>
    );
};

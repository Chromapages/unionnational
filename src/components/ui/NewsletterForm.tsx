"use client";

import { useState } from "react";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    // TODO: Integrate with email service (Mailchimp, ConvertKit, etc.)
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStatus("success");
    setEmail("");
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-emerald-400 text-sm">
        <CheckCircle2 className="w-4 h-4" />
        <span>Thanks! Check your inbox.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label htmlFor="footer-email" className="text-sm font-medium text-zinc-300">
        Get Tax Tips & Updates
      </label>
      <div className="flex">
        <input
          id="footer-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className={cn(
            "flex-1 px-3 py-2 text-sm bg-brand-800 border border-brand-700 rounded-l-lg",
            "text-white placeholder:text-zinc-500 focus:outline-none focus:border-gold-500",
            "transition-colors"
          )}
          required
        />
        <button
          type="submit"
          disabled={status === "loading"}
          aria-label="Subscribe to newsletter"
          className={cn(
            "px-4 py-2 bg-gold-500 text-brand-900 rounded-r-lg font-semibold text-sm",
            "hover:bg-gold-400 disabled:opacity-50 transition-colors cursor-pointer",
            "flex items-center justify-center"
          )}
        >
          {status === "loading" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
        </button>
      </div>
    </form>
  );
};

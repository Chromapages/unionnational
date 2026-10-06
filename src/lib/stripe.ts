import Stripe from "stripe";
import { requireEnv } from "@/lib/config/env";

export function getStripe() {
  return new Stripe(requireEnv("STRIPE_SECRET_KEY"), {
    apiVersion: "2026-03-25.dahlia",
    timeout: 8000,
    maxNetworkRetries: 0,
  });
}

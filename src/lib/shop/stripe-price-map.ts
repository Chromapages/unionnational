/**
 * Source of truth: "Stripe Product Id for UNT Books - Sheet1.csv"
 * Maps edition IDs or product+format combinations to Stripe Price IDs.
 * This acts as a robust fallback if Sanity isn't fully updated yet.
 */
export const STRIPE_PRICE_MAP: Record<string, string> = {
  // The S-Corp Playbook
  "S-Corp Playbook Bundles + Shipping & Handling": "price_1T2eUuBBqB7ETKuVwVpzqIjj",
  "The S-Corp Playbook + Shipping & Handling": "price_1TOlUKBBqB7ETKuVbUqYYNhT",
  "S-Corp Playbook - Digital PDF Copy": "price_1TOlaABBqB7ETKuVEsvwS7ce",
  "S-Corp Playbook - Audio": "price_1T2eTHBBqB7ETKuVe8Q9fuyw",

  // Why the Rich Don’t Pay Taxes
  "Why the Rich Don’t Pay Taxes And Why Real Estate Is the Reason + Shipping & Handling": "price_1TOl9gBBqB7ETKuVLq7ehU51",
  "Why the Rich Don’t Pay Taxes And Why Real Estate Is the Reason Bundles + Shipping & Handling": "price_1T2dlZBBqB7ETKuV8vKizDIQ",
  "Why the Rich Don’t Pay Taxes And Why Real Estate Is the Reason - Digital PDF": "price_1TOlCYBBqB7ETKuVVclSsUaO",
  "Why the Rich Don’t Pay Taxes And Why Real Estate Is the Reason - Audio": "price_1T2deuBBqB7ETKuV0nU8wjzq",

  // The Restaurant Profit Blueprint
  "The Restaurant Profit Blueprint - Digital PDF": "price_1TOlFJBBqB7ETKuVLxMO1ZR4",
  "The Restaurant Profit Blueprint - Audio": "price_1T2do1BBqB7ETKuVhTdLQSQX",
  "The Restaurant Profit Blueprint Bundles + Shipping & Handling": "price_1TOlHqBBqB7ETKuVh943I21w",
  "The Restaurant Profit Blueprint + Shipping & Handling": "price_1T2dpkBBqB7ETKuVPue0kV6m",

  // The 3 M's to Freedom
  "The 3 M's to Freedom Bundles + Shipping & Handling": "price_1TOlKJBBqB7ETKuVlo3eefBK",
  "The 3 M's to Freedom + Shipping & Handling": "price_1T2e5lBBqB7ETKuVIuDEEQAN",
  "The 3 M's to Freedom - Audio": "price_1T2dt6BBqB7ETKuVTGALpDEc",
  "The 3 M's to Freedom - Digital PDF": "price_1TOlRkBBqB7ETKuVW6m7Nc30",

  // THE PROACTIVE CFO SOLUTION
  "THE PROACTIVE CFO SOLUTION BUNDLES + Shipping & Handling": "price_1TOlMfBBqB7ETKuVLnrLGW1F",
  "THE PROACTIVE CFO SOLUTION + Shipping & Handling": "price_1T2dsBBBqB7ETKuVAr3xFdJQ",
  "THE PROACTIVE CFO SOLUTION - Digital PDF": "price_1TOlPkBBqB7ETKuV28aBachq",
  "THE PROACTIVE CFO SOLUTION - Audio": "price_1T2dqbBBqB7ETKuVqvYCiuoB",

  // Construction Blueprint
  "The Money-Making Blueprint for Construction Companies Bundles + Shipping & Handling": "price_1TOlSoBBqB7ETKuVtDfASqwk",
  "The Money-Making Blueprint for Construction Companies + Shipping & Handling": "price_1T2cpuBBqB7ETKuVPA63LBVd",
  "The Money-Making Blueprint for Construction Companies - Digital PDF Copy": "price_1TOlYSBBqB7ETKuVhVlOdPk8",
  "The Money-Making Blueprint for Construction Companies - Audio": "price_1T2dAkBBqB7ETKuVZCP3OsnA",
};

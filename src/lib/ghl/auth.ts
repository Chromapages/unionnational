// GHL AUTH UTILITY
import { getEnv } from "@/lib/config/env";
import { logger } from "@/lib/observability/logger";

const GHL_API_BASE = "https://services.leadconnectorhq.com";

interface GhlTokenResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    user_type: string;
    locationId: string;
}

/**
 * GHL AUTH UTILITY
 * Handles GHL API 2.0 OAuth handshake and token refresh.
 * 
 * NOTE: For production, tokens MUST be stored in a persistent database 
 * (e.g. Supabase, Upstash Redis, or a secure KV store).
 */
export const getGhlAccessToken = async () => {
    const clientId = getEnv("GHL_CLIENT_ID");
    const clientSecret = getEnv("GHL_CLIENT_SECRET");
    const refreshToken = getEnv("GHL_REFRESH_TOKEN");

    if (!clientId || !clientSecret || !refreshToken) {
        logger.error("GHL Authorization missing credentials in env vars");
        return null;
    }

    try {
        const response = await fetch(`${GHL_API_BASE}/oauth/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: "refresh_token",
                refresh_token: refreshToken,
            }),
        });

        const data: GhlTokenResponse = await response.json();

        if (!response.ok) {
            logger.error("GHL token refresh failed", data, { status: response.status });
            return null;
        }

        // IMPORTANT: In a real app, you would save data.refresh_token 
        // back to your database here for the next refresh cycle.
        
        return data.access_token;
    } catch (error) {
        logger.error("GHL auth error", error);
        return null;
    }
};

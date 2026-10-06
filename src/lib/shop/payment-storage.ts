import { createClient } from "next-sanity";
import { publicEnv } from "@/lib/config/env";
import { paymentStorageGaps } from "./payment-configuration";

export function getPaymentStorage() {
    const dataset = process.env.SANITY_PAYMENT_DATASET;
    const token = process.env.SANITY_PAYMENT_AUTH_TOKEN;
    if (paymentStorageGaps({ ...process.env, NEXT_PUBLIC_SANITY_DATASET: publicEnv.sanityDataset }).length) {
        throw new Error("Private payment storage requires verified privacy, least privilege and migrated recovery records");
    }
    return createClient({ projectId: publicEnv.sanityProjectId, dataset, apiVersion: publicEnv.sanityApiVersion, token, useCdn: false, timeout: 8000, maxRetries: 0 });
}

import { createClient } from 'next-sanity'

import { publicEnv, getEnv } from '@/lib/config/env'

export type SanityLocale = "en" | "es";
type QueryParams = Record<string, unknown>;

export const client = createClient({
  projectId: publicEnv.sanityProjectId,
  dataset: publicEnv.sanityDataset,
  apiVersion: publicEnv.sanityApiVersion,
  useCdn: true,
})

export const writeClient = createClient({
  projectId: publicEnv.sanityProjectId,
  dataset: publicEnv.sanityDataset,
  apiVersion: publicEnv.sanityApiVersion,
  useCdn: false,
  token: getEnv("SANITY_AUTH_TOKEN"),
})

export async function fetchWithLocale<T>(
  query: string,
  locale: SanityLocale,
  params: QueryParams = {},
) {
  return client.fetch<T>(query, { ...params, locale });
}

import { createClient } from 'next-sanity'

import { publicEnv } from '@/lib/config/env'

export type SanityLocale = "en" | "es";
type QueryParams = Record<string, unknown>;

export const client = createClient({
  projectId: publicEnv.sanityProjectId,
  dataset: publicEnv.sanityDataset,
  apiVersion: publicEnv.sanityApiVersion,
  useCdn: true,
})

export async function fetchWithLocale<T>(
  query: string,
  locale: SanityLocale,
  params: QueryParams = {},
) {
  return client.fetch<T>(query, { ...params, locale });
}

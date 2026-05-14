import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'
import { getEnv } from '@/lib/config/env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: getEnv("SANITY_AUTH_TOKEN"),
})

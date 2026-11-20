/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * It is isolated in the root level /app/hq to prevent prop bleeding from the localized layout.
 */

import { notFound } from 'next/navigation'
import { getEnv } from '@/lib/config/env'
import Studio from '../../../components/studio/Studio'

export const dynamic = 'force-dynamic'

export default async function StudioPage() {
  // Authoring must not inherit the legacy public-read fallback.
  if (!getEnv('NEXT_PUBLIC_SANITY_PROJECT_ID') || !getEnv('NEXT_PUBLIC_SANITY_DATASET')) notFound()

  return (
    <div className="min-h-screen bg-[#050B18]">
      <Studio />
    </div>
  )
}

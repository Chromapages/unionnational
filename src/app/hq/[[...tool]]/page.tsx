/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * It is isolated in the root level /app/hq to prevent prop bleeding from the localized layout.
 */

import Studio from '../../../components/studio/Studio'

export const dynamic = 'force-dynamic'

export default async function StudioPage() {
  return (
    <div className="min-h-screen bg-[#050B18]">
      <Studio />
    </div>
  )
}

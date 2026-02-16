/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import Studio from '../../../../components/studio/Studio'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Sanity Studio',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default async function StudioPage(props: { params: Promise<{ locale: string }> }) {
  // We await params even if we don't use it to satisfy Next.js 15 requirements for sync/async params
  await props.params;

  return (
    <div className="min-h-screen bg-[#050B18]">
      <Studio />
    </div>
  )
}

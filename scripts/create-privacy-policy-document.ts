import { createClient } from '@sanity/client'
import { backupForMutation, mutationOptions, reportMutationFailure } from './lib/sanity-mutation.mjs'

async function createPrivacyPolicyDocument() {
  const { PRIVACY_POLICY_DATA } = await import(new URL('../src/data/privacy-policy-content.ts', import.meta.url).href)
  const client = createClient({
    projectId: 'p1x9y3wz',
    dataset: 'production',
    apiVersion: '2026-01-09',
    useCdn: false,
    token: process.env.SANITY_AUTH_TOKEN,
  })
  const mutation = mutationOptions(process.argv.slice(2), client.config())

  // Check if document already exists
  const existing = await client.fetch(
    `*[_type == "legalPage" && slug.current == "privacy-policy"][0]`,
  )

  const doc = {
    _type: 'legalPage',
    title: {
      en: 'Privacy Policy',
      es: 'Politica de Privacidad',
    },
    slug: { current: 'privacy-policy' },
    pageType: 'privacy',
    jurisdiction: ['us-federal'],
    effectiveDate: '2026-03-10',
    lastUpdated: new Date().toISOString(),
    version: '2.0',
    isPublished: true,
    body: PRIVACY_POLICY_DATA.body,
    intro: PRIVACY_POLICY_DATA.intro,
  }

  console.log(JSON.stringify({ mode: mutation.apply ? 'apply' : 'dry-run', projectId: mutation.projectId, dataset: mutation.dataset,
    document: existing?._id || 'privacy-policy', fields: Object.keys(doc) }))
  if (!mutation.apply) return
  await backupForMutation(client, mutation, [existing || { _id: 'privacy-policy' }])

  let result
  if (existing) {
    console.log(`Document already exists with _id: ${existing._id}. Updating...`)
    const { _type, ...content } = doc
    result = await client.patch(existing._id).ifRevisionId(existing._rev).set(content).commit()
  } else {
    console.log('Creating new Privacy Policy document...')
    result = await client.create({ ...doc, _id: 'privacy-policy' })
  }

  console.log(`Done! Document _id: ${result._id}`)
}

createPrivacyPolicyDocument().catch(reportMutationFailure)

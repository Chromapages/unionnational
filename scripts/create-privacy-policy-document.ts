import { createClient } from 'next-sanity'
import { PRIVACY_POLICY_DATA } from '../src/data/privacy-policy-content'

async function createPrivacyPolicyDocument() {
  const client = createClient({
    projectId: 'p1x9y3wz',
    dataset: 'production',
    apiVersion: '2026-01-09',
    useCdn: false,
    token: process.env.SANITY_AUTH_TOKEN,
  })

  // Check if document already exists
  const existing = await client.fetch(
    `*[_type == "legalPage" && slug.current == "privacy-policy"][0]{_id, _rev}`,
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

  let result
  if (existing) {
    console.log(`Document already exists with _id: ${existing._id}. Updating...`)
    result = await client.createOrReplace({ ...doc, _id: existing._id })
  } else {
    console.log('Creating new Privacy Policy document...')
    result = await client.create(doc)
  }

  console.log(`Done! Document _id: ${result._id}`)
}

createPrivacyPolicyDocument().catch(console.error)